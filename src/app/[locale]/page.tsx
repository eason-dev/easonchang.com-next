import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import SocialIcon from '@/components/atoms/SocialIcon';
import CustomLink from '@/components/CustomLink';
import FadeIn from '@/components/FadeIn';
import PostCoverThumb from '@/components/PostCoverThumb';
import PromoCard from '@/components/PromoCard';
import { PROJECTS_EN, PROJECTS_ZH } from '@/data/projects';
import siteMetadata from '@/data/siteMetadata';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import formatDate from '@/lib/utils/formatDate';

const MAX_DISPLAY = 6;
const FEATURED_PROJECTS = 3;
const ABURI_PRODUCTS = ['CoreHour', 'FireFree', 'DailyWage'];

/* Some project descriptions carry rich HTML for the projects page; the
 * homepage tile only needs a plain-text teaser line. */
const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

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
    image: post.socialImage,
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
            <p>
              {t.rich('intro-3', {
                neo: externalLink('https://www.neofinancial.com/'),
                aburi: externalLink('https://aburistudio.com/'),
              })}
            </p>
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

      {/* Contact */}
      <FadeIn delay={0.05}>
        <section className="bento-card flex h-full flex-col gap-5 p-8">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
            {t('contact-title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('contact-detail')}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${siteMetadata.email}`}
              className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-500"
            >
              {t('email-me')}
            </a>
            <a
              href="https://fantastical.app/easonchang/chat"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gray-900/10 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-primary-500/40 hover:text-primary-600 dark:border-white/10 dark:text-gray-200 dark:hover:text-primary-400"
            >
              {t('book-time')}
            </a>
          </div>
          <div className="mt-auto flex gap-4 pt-2">
            <SocialIcon kind="github" href={siteMetadata.github} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} />
            <SocialIcon
              kind="rss"
              href={siteMetadata.siteUrl + siteMetadata.rss}
            />
          </div>
        </section>
      </FadeIn>

      {/* Aburi Studio build-in-public card */}
      <FadeIn delay={0.1}>
        <PromoCard
          title={t('build-in-public')}
          detail={t('build-in-public-detail')}
          cta={t('build-in-public-cta')}
          href="https://aburistudio.com/"
          chips={ABURI_PRODUCTS}
        />
      </FadeIn>

      {/* Featured projects */}
      <FadeIn delay={0.15} className="md:col-span-2 lg:col-span-3">
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
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-900/5 bg-gray-100 dark:border-white/5 dark:bg-gray-800">
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
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {stripHtml(project.description)}
                  </p>
                </CustomLink>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Latest posts */}
      <FadeIn delay={0.2} className="md:col-span-2 lg:col-span-3">
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
          <ul className="mt-2 divide-y divide-gray-900/5 dark:divide-white/5">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <CustomLink
                  href={post.path}
                  className="group flex items-center gap-5 py-4 sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <time
                      dateTime={post.date}
                      className="block text-xs font-medium uppercase tracking-wider text-gray-400"
                    >
                      {formatDate(post.date, locale)}
                    </time>
                    <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                        {post.description}
                      </p>
                    )}
                  </div>
                  <div className="relative aspect-[1200/630] w-28 shrink-0 overflow-hidden rounded-xl border border-gray-900/5 bg-gray-100 dark:border-white/5 dark:bg-gray-800 sm:w-44">
                    <PostCoverThumb
                      slug={post.slug}
                      title={post.title}
                      image={post.image}
                      sizes="176px"
                    />
                  </div>
                </CustomLink>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>
    </div>
  );
}
