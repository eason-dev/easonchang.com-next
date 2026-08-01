import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import CustomLink from '@/components/CustomLink';
import PostList from '@/components/organisms/PostList';
import siteMetadata from '@/data/siteMetadata';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

const MAX_DISPLAY = 10;

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

  const posts = allPostsOfLocaleNewToOld(locale)
    .slice(0, MAX_DISPLAY)
    .map((post) => ({
      slug: post.slug,
      date: post.date,
      title: post.title,
      description: post.description,
      path: post.path,
    }));

  const externalLink = (href: string) => {
    const ExternalLink = (chunks: React.ReactNode) => (
      <a href={href} target="_blank" rel="noreferrer">
        {chunks}
      </a>
    );
    return ExternalLink;
  };

  return (
    <>
      <div className="prose my-12 max-w-none space-y-2 transition-colors dark:prose-dark md:space-y-5 md:prose-lg">
        <h1 className="text-center sm:text-left">{t('intro-title')}</h1>
        <p>
          {t.rich('intro-1', {
            projects: (chunks) => <CustomLink href="/projects">{chunks}</CustomLink>,
          })}
        </p>
        <p>
          {t.rich('intro-2', {
            posts: (chunks) => <CustomLink href="/posts">{chunks}</CustomLink>,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p>{t('intro-3')}</p>
        <p>
          {t.rich('intro-4', {
            resume: externalLink(
              'https://drive.google.com/file/d/1-RdgOpRQxKpwLDSpFHWX0rzkCdnquDZG/view'
            ),
            linkedin: externalLink('https://www.linkedin.com/in/easonchang101/'),
            github: externalLink('https://github.com/eason-dev'),
            twitter: externalLink('https://x.com/easondev'),
            booking: externalLink('https://fantastical.app/easonchang/chat'),
          })}
        </p>
      </div>

      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>{t('latest-posts')}</h2>
        </div>

        <PostList posts={posts} />
      </div>

      <div className="flex justify-end text-base font-medium leading-6 md:text-lg">
        <CustomLink
          href="/posts"
          className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="all posts"
        >
          {tCommon('view-all')} &rarr;
        </CustomLink>
      </div>
    </>
  );
}
