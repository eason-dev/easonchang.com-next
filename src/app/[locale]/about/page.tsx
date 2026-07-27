import { MDXContent } from '@content-collections/mdx/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import AuthorLayout from '@/layouts/AuthorLayout';
import { allPages } from '@/lib/content';
import mdxComponents from '@/lib/mdxComponents';
import { buildPageMetadata } from '@/lib/seo';

const LOCALE_TO_PAGE_NAME: Record<string, string> = {
  en: 'about-en',
  'zh-TW': 'about-zh',
};

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
    path: '/about',
    title: t('about-me'),
    description: t('about-me-description'),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const aboutPage = allPages.find(
    (page) => page.name === LOCALE_TO_PAGE_NAME[locale]
  );
  if (!aboutPage) {
    notFound();
  }

  return (
    <AuthorLayout>
      <MDXContent code={aboutPage.mdx} components={mdxComponents} />
    </AuthorLayout>
  );
}
