import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

import imageMetadata from './src/plugins/image-metadata';
import remarkCodeTitleShim from './src/plugins/remark-code-title-shim';

const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkCodeTitleShim],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: {
          light: 'github-light',
          dark: 'one-dark-pro',
        },
        defaultColor: false,
        defaultLang: 'txt',
      },
    ],
    imageMetadata,
  ],
  // Pluggable typings across unified versions disagree; the plugins themselves are compatible.
} as NonNullable<Parameters<typeof compileMDX>[2]>;

// Frontmatter dates appear both quoted and unquoted ("2016-03-17 08:20"),
// so YAML may hand us a string or a Date.
const dateField = z
  .union([z.string(), z.date()])
  .transform((value) => new Date(value).toISOString());

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: z.object({
    content: z.string(),
    title: z.string(),
    slug: z.string(),
    date: dateField,
    description: z.string(),
    socialImage: z.string(),
    isDraft: z.boolean().default(false),
    language: z.enum(['en', 'zh-TW']).default('zh-TW'),
    // Set on the translated half of a language pair: who produced the
    // translation. Absent on originals.
    translation: z.enum(['ai']).optional(),
    // Set when the post itself was drafted with AI assistance. Only ever
    // set deliberately at writing time — never retroactively guessed.
    written: z.enum(['ai']).optional(),
    redirect_from: z.array(z.string()).optional(),
  }),
  transform: async (post, context) => {
    const mdx = await compileMDX(context, post, mdxOptions);
    return {
      ...post,
      path: `/posts/${post.slug}`,
      sourceFileName: post._meta.fileName,
      raw: post.content,
      mdx,
    };
  },
});

const pages = defineCollection({
  name: 'pages',
  directory: 'content/pages',
  include: '**/*.mdx',
  schema: z.object({
    content: z.string(),
    name: z.string(),
    path: z.string(),
    redirect_from: z.array(z.string()).optional(),
  }),
  transform: async (page, context) => {
    const mdx = await compileMDX(context, page, mdxOptions);
    return {
      ...page,
      raw: page.content,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts, pages],
});
