import siteMetadata from '@/data/siteMetadata';
import { allPostsNewToOld } from '@/lib/content';
import { localizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';

// https://llmstxt.org — full-content companion to /llms.txt.
export function GET() {
  const sections = allPostsNewToOld.map((post) => {
    const url = localizedUrl(post.language, post.path);
    return `# ${post.title}

- URL: ${url}
- Date: ${post.date}
- Language: ${post.language}
${post.description ? `- Description: ${post.description}\n` : ''}
${post.raw.trim()}`;
  });

  const body = `<!-- ${siteMetadata.title} — full content of all posts, newest first -->

${sections.join('\n\n---\n\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
