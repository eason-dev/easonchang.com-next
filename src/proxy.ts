import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

// Locale negotiation (Accept-Language + NEXT_LOCALE cookie), matching the
// behavior of the old Pages Router built-in i18n.
const handleI18nRouting = createMiddleware(routing);

const POST_MARKDOWN_PATTERN = /^\/(?:zh-TW\/)?posts\/([^/]+)\.md$/;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /posts/<slug>.md → raw markdown for agents/LLMs (see /llms.txt).
  const markdownMatch = pathname.match(POST_MARKDOWN_PATTERN);
  if (markdownMatch) {
    const locale = pathname.startsWith('/zh-TW/') ? 'zh-TW' : 'en';
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown/${markdownMatch[1]}`;
    url.searchParams.set('locale', locale);
    // Query params added during a middleware rewrite don't survive into the
    // route handler's request.nextUrl, so pass the locale as a request header
    // too (the handler prefers the query param when called directly).
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-markdown-locale', locale);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  return handleI18nRouting(request);
}

export const config = {
  // Skip Next.js internals, API routes, and all static files (but let
  // .md post URLs through — they are rewritten above).
  matcher:
    '/((?!api|_next|_vercel|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|txt|xml|json|pdf|webmanifest|js|css|map)).*)',
};
