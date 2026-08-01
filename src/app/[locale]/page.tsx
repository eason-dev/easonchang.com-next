import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import SocialIcon from '@/components/atoms/SocialIcon';
import CustomLink from '@/components/CustomLink';
import FadeIn from '@/components/FadeIn';
import { PROJECTS_EN, PROJECTS_ZH } from '@/data/projects';
import siteMetadata from '@/data/siteMetadata';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import formatDate from '@/lib/utils/formatDate';

const MAX_DISPLAY = 5;
const WRITING_SINCE = 2015;

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
    path: post.path,
  }));
  const featuredProject = (locale === 'en' ? PROJECTS_EN : PROJECTS_ZH)[0];

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
      <FadeIn className="md:col-span-2 lg:row-span-2">
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

      {/* Stats */}
      <FadeIn delay={0.05}>
        <section className="bento-card flex h-full flex-col justify-between gap-6 p-8">
          <div>
            <p className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent dark:to-primary-300">
              {posts.length}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t('stats-posts')}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('stats-writing-since')}{' '}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {WRITING_SINCE}
            </span>
          </p>
        </section>
      </FadeIn>

      {/* Command palette hint */}
      <FadeIn delay={0.1}>
        <section className="bento-card h-full p-8">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
            {t('command-hint')}
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t.rich('command-hint-detail', {
              kbd: (chunks) => (
                <kbd className="rounded-md border border-gray-900/10 bg-gray-900/5 px-1.5 py-0.5 font-sans text-sm dark:border-white/10 dark:bg-white/5">
                  {chunks}
                </kbd>
              ),
            })}
          </p>
        </section>
      </FadeIn>

      {/* Latest posts */}
      <FadeIn delay={0.1} className="md:col-span-2">
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
              {tCommon('view-all')} &rarr;
            </CustomLink>
          </div>
          <ul className="mt-4 divide-y divide-gray-900/5 dark:divide-white/5">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <CustomLink
                  href={post.path}
                  className="group flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="font-medium text-gray-800 transition-colors group-hover:text-primary-600 dark:text-gray-200 dark:group-hover:text-primary-400">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-sm text-gray-400"
                  >
                    {formatDate(post.date, locale)}
                  </time>
                </CustomLink>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Featured project */}
      <FadeIn delay={0.15}>
        <section className="bento-card h-full">
          <CustomLink
            href={
              featuredProject.links.post ||
              featuredProject.links.site ||
              featuredProject.links.github
            }
            className="block h-full"
            aria-label={featuredProject.title}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={featuredProject.image.src}
                alt={featuredProject.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                placeholder={featuredProject.image.placeholder}
              />
            </div>
            <div className="p-6">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                {t('featured-project')}
              </h2>
              <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">
                {featuredProject.title}
              </p>
            </div>
          </CustomLink>
        </section>
      </FadeIn>

      {/* Connect */}
      <FadeIn delay={0.2} className="md:col-span-2 lg:col-span-3">
        <section className="bento-card flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
            {t('connect')}
          </h2>
          <div className="flex gap-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
            <SocialIcon kind="github" href={siteMetadata.github} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} />
            <SocialIcon kind="facebook" href={siteMetadata.facebook} />
            <SocialIcon
              kind="rss"
              href={siteMetadata.siteUrl + siteMetadata.rss}
            />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
