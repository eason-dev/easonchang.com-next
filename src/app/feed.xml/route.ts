import { buildFeed } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildFeed().rss2(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
