import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { POSTS_PER_PAGE } from '@/constants/siteMeta';
import ListLayout from '@/layouts/ListLayout';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return buildPageMetadata({
    locale,
    path: '/posts',
    title: t('all-posts'),
    description: t('about-me-description'),
  });
}

export default async function PostsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = allPostsOfLocaleNewToOld(locale).map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    slug: post.slug,
    path: post.path,
    socialImage: post.socialImage,
  }));

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts.slice(0, POSTS_PER_PAGE)}
      pagination={pagination}
    />
  );
}
