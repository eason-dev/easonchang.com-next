import { MDXContent } from '@content-collections/mdx/react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import PageTitle from '@/components/PageTitle';
import PostLayout from '@/layouts/PostLayout';
import {
  allPosts,
  allPostsOfLocaleNewToOld,
  findRedirect,
  type Post,
} from '@/lib/content';
import mdxComponents from '@/lib/mdxComponents';
import {
  buildPageMetadata,
  getPostOGImage,
  localizedUrl,
} from '@/lib/seo';
import siteMetadata from '@/data/siteMetadata';

type PageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export function generateStaticParams() {
  const uniqueSlugs = [...new Set(allPosts.map((post) => post.slug))];
  return uniqueSlugs.map((slug) => ({ slug: [slug] }));
}

const resolvePost = (locale: string, fullSlug: string) => {
  const postsOfLocale = allPostsOfLocaleNewToOld(locale);
  const postIndex = postsOfLocale.findIndex((post) => post.slug === fullSlug);

  let post: Post | undefined =
    postIndex !== -1 ? postsOfLocale[postIndex] : undefined;
  let onlyHavePostInAnotherLocale = false;
  if (!post) {
    post = allPosts.find((candidate) => candidate.slug === fullSlug);
    onlyHavePostInAnotherLocale = !!post;
  }

  const prevFull = postIndex !== -1 ? postsOfLocale[postIndex + 1] : undefined;
  const nextFull = postIndex !== -1 ? postsOfLocale[postIndex - 1] : undefined;

  return {
    post,
    onlyHavePostInAnotherLocale,
    prev: prevFull ? { title: prevFull.title, path: prevFull.path } : null,
    next: nextFull ? { title: nextFull.title, path: nextFull.path } : null,
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const fullSlug = slug.join('/');
  const { post } = resolvePost(locale, fullSlug);
  if (!post) return {};

  const metadata = buildPageMetadata({
    locale,
    path: post.path,
    title: post.title,
    description: post.description,
    ogImage: getPostOGImage(post.socialImage, post.title, post.description),
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const fullSlug = slug.join('/');

  // Legacy URLs (frontmatter redirect_from and old filename-based slugs).
  const matchedRedirectRule = findRedirect('/posts/' + fullSlug);
  if (matchedRedirectRule) {
    redirect(matchedRedirectRule.destination);
  }

  const { post, onlyHavePostInAnotherLocale, prev, next } = resolvePost(
    locale,
    fullSlug
  );
  if (!post) {
    notFound();
  }

  if (post.isDraft) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
      </div>
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': localizedUrl(locale, post.path),
    },
    headline: `${post.title} - ${siteMetadata.title}`,
    image: [{ '@type': 'ImageObject', url: getPostOGImage(post.socialImage, post.title, post.description) }],
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: siteMetadata.author },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: post.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PostLayout
        post={{
          title: post.title,
          date: post.date,
          description: post.description,
          socialImage: post.socialImage,
          raw: post.raw,
        }}
        prev={prev}
        next={next}
        onlyHavePostInAnotherLocale={onlyHavePostInAnotherLocale}
      >
        <MDXContent code={post.mdx} components={mdxComponents} />
      </PostLayout>
    </>
  );
}
