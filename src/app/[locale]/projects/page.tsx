import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PROJECTS_EN, PROJECTS_ZH } from '@/data/projects';
import ProjectLayout from '@/layouts/ProjectLayout';
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
    path: '/projects',
    title: t('projects'),
    description: t('about-me-description'),
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = locale === 'en' ? PROJECTS_EN : PROJECTS_ZH;

  return <ProjectLayout projects={projects} />;
}
