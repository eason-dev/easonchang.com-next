import type { NextRequest } from 'next/server';

import { allPostsNewToOld } from '@/lib/content';
import { localizedUrl } from '@/lib/seo';

// Serves the raw markdown of a post. Reached via /posts/<slug>.md
// (and /zh-TW/posts/<slug>.md), rewritten here by src/proxy.ts so agents
// and LLMs can skip HTML parsing entirely.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // The locale arrives as a query param on direct calls, or as a request
  // header when src/proxy.ts rewrites /posts/<slug>.md here (query params
  // added during a middleware rewrite don't survive into request.nextUrl).
  const locale =
    request.nextUrl.searchParams.get('locale') ??
    request.headers.get('x-markdown-locale') ??
    'en';

  const candidates = allPostsNewToOld.filter((post) => post.slug === slug);
  if (candidates.length === 0) {
    return new Response('Not found', { status: 404 });
  }
  const post =
    candidates.find((candidate) => candidate.language === locale) ??
    candidates[0];
  const original = candidates.find(
    (candidate) => candidate.language !== post.language
  );

  const body = `# ${post.title}

- Canonical: ${localizedUrl(post.language, post.path)}
- Date: ${post.date}
- Language: ${post.language}
${post.description ? `- Description: ${post.description}\n` : ''}${
  post.written === 'ai' ? '- Written: AI-assisted\n' : ''
}${
  post.translation === 'ai'
    ? `- Translation: AI-assisted${original ? `, from the ${original.language} original` : ''}\n`
    : ''
}
${post.raw.trim()}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
