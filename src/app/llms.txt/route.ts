import siteMetadata from '@/data/siteMetadata';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { localizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';

// https://llmstxt.org — a map of the site for LLMs and agents.
export function GET() {
  const enPosts = allPostsOfLocaleNewToOld('en');
  const zhPosts = allPostsOfLocaleNewToOld('zh-TW');

  const postLine = (locale: string) => (post: (typeof enPosts)[number]) => {
    const url = localizedUrl(locale, post.path);
    const description = post.description ? `: ${post.description}` : '';
    return `- [${post.title}](${url}.md)${description}`;
  };

  const body = `# ${siteMetadata.title}

> ${siteMetadata.description}

Personal blog of ${siteMetadata.author}, a fullstack developer from Taiwan living in Canada. Posts cover software engineering, web development, maker projects, and productivity, written in English and Traditional Chinese. Every post is also available as raw markdown by appending \`.md\` to its URL.

## Posts (English)

${enPosts.map(postLine('en')).join('\n')}

## Posts (繁體中文)

${zhPosts.map(postLine('zh-TW')).join('\n')}

## Pages

- [About](${localizedUrl('en', '/about')}): About ${siteMetadata.author}
- [Projects](${localizedUrl('en', '/projects')}): Side projects and works

## Optional

- [Full content dump](${siteMetadata.siteUrl}/llms-full.txt): every post in one markdown file
- [RSS feed](${siteMetadata.siteUrl}/feed.xml)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
