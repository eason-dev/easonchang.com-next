import { buildFeed } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildFeed().atom1(), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
