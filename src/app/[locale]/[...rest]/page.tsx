import { notFound, redirect } from 'next/navigation';

import { findRedirect } from '@/lib/content';

type PageProps = {
  params: Promise<{ locale: string; rest: string[] }>;
};

// Serves legacy URLs declared in frontmatter `redirect_from`; everything else 404s.
export default async function CatchAllPage({ params }: PageProps) {
  const { rest } = await params;
  const path = `/${rest.join('/')}`;

  const matchedRedirectRule = findRedirect(path);
  if (matchedRedirectRule) {
    redirect(matchedRedirectRule.destination);
  }

  notFound();
}
