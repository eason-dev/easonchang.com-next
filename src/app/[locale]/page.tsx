import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import CustomLink from '@/components/CustomLink';
import FadeIn from '@/components/FadeIn';
import TiltCard from '@/components/TiltCard';
import { PROJECTS_EN, PROJECTS_ZH } from '@/data/projects';
import siteMetadata from '@/data/siteMetadata';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import formatDate from '@/lib/utils/formatDate';

const MAX_DISPLAY = 6;
const FEATURED_PROJECTS = 3;
const ABURI_PRODUCTS = ['CoreHour', 'FireFree', 'DailyWage'];

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: '/',
    description: siteMetadata.description,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('indexPage');
  const tCommon = await getTranslations('common');

  const posts = allPostsOfLocaleNewToOld(locale);
  const latestPosts = posts.slice(0, MAX_DISPLAY).map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
  }));
  const projects = locale === 'en' ? PROJECTS_EN : PROJECTS_ZH;
  const featuredProjects = projects.slice(0, FEATURED_PROJECTS);

  const externalLink = (href: string) => {
    const ExternalLink = (chunks: React.ReactNode) => (
      <a href={href} target="_blank" rel="noreferrer">
        {chunks}
      </a>
    );
    return ExternalLink;
  };

  return (
    <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {/* Hero */}
      <FadeIn className="md:col-span-2">
        <section className="bento-card h-full p-8 md:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-primary-400/40 via-primary-500/20 to-transparent blur-3xl motion-safe:animate-aurora"
          />
          <div className="prose relative max-w-none dark:prose-invert md:prose-lg">
            <h1 className="tracking-tight">{t('intro-title')}</h1>
            <p>
              {t.rich('intro-1', {
                projects: (chunks) => (
                  <CustomLink href="/projects">{chunks}</CustomLink>
                ),
              })}
            </p>
            <p>
              {t.rich('intro-2', {
                posts: (chunks) => (
                  <CustomLink href="/posts">{chunks}</CustomLink>
                ),
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p>{t('intro-3')}</p>
            <p>
              {t.rich('intro-4', {
                resume: externalLink(
                  'https://drive.google.com/file/d/1-RdgOpRQxKpwLDSpFHWX0rzkCdnquDZG/view'
                ),
                linkedin: externalLink(
                  'https://www.linkedin.com/in/easonchang101/'
                ),
                github: externalLink('https://github.com/eason-dev'),
                twitter: externalLink('https://x.com/easondev'),
                booking: externalLink(
                  'https://fantastical.app/easonchang/chat'
                ),
              })}
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Aburi Studio build-in-public card */}
      <FadeIn delay={0.05} className="md:col-span-2 lg:col-span-1">
        <TiltCard
          title={t('build-in-public')}
          detail={t('build-in-public-detail')}
          cta={t('build-in-public-cta')}
          href="https://aburistudio.com/"
          chips={ABURI_PRODUCTS}
        />
      </FadeIn>

      {/* Featured projects */}
      <FadeIn delay={0.1} className="md:col-span-2 lg:col-span-3">
        <section className="bento-card h-full p-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
              {t('featured-projects')}
            </h2>
            <CustomLink
              href="/projects"
              aria-label="all projects"
              className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400"
            >
              {tCommon('view-all-projects', { count: projects.length })} &rarr;
            </CustomLink>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <li key={project.title}>
                <CustomLink
                  href={
                    project.links.post ||
                    project.links.site ||
                    project.links.github
                  }
                  aria-label={project.title}
                  className="group block"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-900/5 dark:border-white/5">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                      placeholder={project.image.placeholder}
                    />
                  </div>
                  <p className="mt-3 font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                    {project.title.split(' - ')[0]}
                  </p>
                </CustomLink>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Latest posts */}
      <FadeIn delay={0.15} className="md:col-span-2 lg:col-span-3">
        <section className="bento-card h-full p-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
              {t('latest-posts')}
            </h2>
            <CustomLink
              href="/posts"
              aria-label="all posts"
              className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400"
            >
              {tCommon('view-all-posts', { count: posts.length })} &rarr;
            </CustomLink>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 divide-y divide-gray-900/5 md:grid-cols-2 md:divide-y-0 dark:divide-white/5">
            {latestPosts.map((post) => (
              <li
                key={post.slug}
                className="md:border-b md:border-gray-900/5 dark:md:border-white/5"
              >
                <CustomLink
                  href={post.path}
                  className="group flex flex-col gap-1 py-3"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-gray-800 transition-colors group-hover:text-primary-600 dark:text-gray-200 dark:group-hover:text-primary-400">
                      {post.title}
                    </span>
                    <time
                      dateTime={post.date}
                      className="shrink-0 text-sm text-gray-400"
                    >
                      {formatDate(post.date, locale)}
                    </time>
                  </span>
                  {post.description && (
                    <span className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                      {post.description}
                    </span>
                  )}
                </CustomLink>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>
    </div>
  );
}
