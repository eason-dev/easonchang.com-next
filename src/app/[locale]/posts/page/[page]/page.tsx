import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { POSTS_PER_PAGE } from '@/constants/siteMeta';
import { routing } from '@/i18n/routing';
import ListLayout from '@/layouts/ListLayout';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; page: string }>;
};

export function generateStaticParams() {
  const maxTotalPages = Math.max(
    ...routing.locales.map((locale) =>
      Math.ceil(allPostsOfLocaleNewToOld(locale).length / POSTS_PER_PAGE)
    )
  );
  return Array.from({ length: maxTotalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, page } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return buildPageMetadata({
    locale,
    path: `/posts/page/${page}`,
    title: t('all-posts'),
    description: t('about-me-description'),
  });
}

export default async function PostListPage({ params }: PageProps) {
  const { locale, page } = await params;
  setRequestLocale(locale);

  const posts = allPostsOfLocaleNewToOld(locale).map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    slug: post.slug,
    path: post.path,
  }));

  const pageNumber = parseInt(page, 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  if (
    !Number.isFinite(pageNumber) ||
    pageNumber < 1 ||
    pageNumber > totalPages
  ) {
    notFound();
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={{ currentPage: pageNumber, totalPages }}
    />
  );
}
