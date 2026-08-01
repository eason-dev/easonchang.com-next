import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

// Locale negotiation (Accept-Language + NEXT_LOCALE cookie), matching the
// behavior of the old Pages Router built-in i18n.
export default createMiddleware(routing);

export const config = {
  // Skip Next.js internals, API routes, and all static files.
  matcher:
    '/((?!api|_next|_vercel|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|txt|xml|json|pdf|webmanifest|js|css|map)).*)',
};
