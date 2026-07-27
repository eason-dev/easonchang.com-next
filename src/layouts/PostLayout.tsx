'use client';

import Giscus from '@giscus/react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Balancer from 'react-wrap-balancer';

import CustomLink from '@/components/CustomLink';
import PostBody from '@/components/organisms/PostBody';
import PageTitle from '@/components/PageTitle';
import ScrollTop from '@/components/ScrollTop';
import TableOfContents from '@/components/TableOfContents';
import siteMetadata from '@/data/siteMetadata';
import formatDate from '@/lib/utils/formatDate';

export interface PostForPostLayout {
  date: string;
  title: string;
  description: string;
  socialImage: string;
  raw: string;
}

export type RelatedPostForPostLayout = {
  title: string;
  path: string;
} | null;

type Props = {
  post: PostForPostLayout;
  next: RelatedPostForPostLayout;
  prev: RelatedPostForPostLayout;
  onlyHavePostInAnotherLocale: boolean;
  children: React.ReactNode;
};

export default function PostLayout({
  post,
  next,
  prev,
  onlyHavePostInAnotherLocale,
  children,
}: Props) {
  const { date, title, raw } = post;

  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const t = useTranslations('common');

  return (
    <>
      <ScrollTop />

      <article>
        <div className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
          <header className="py-6">
            <div className="space-y-1 text-center">
              <div className="mb-4">
                <PageTitle>{title}</PageTitle>
              </div>

              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <div
            className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 pt-10 pb-8 transition-colors dark:divide-gray-700 lg:col-span-3">
              <PostBody>
                {onlyHavePostInAnotherLocale && (
                  <div className="mb-8 rounded-lg border border-gray-300 bg-gray-100 py-2 px-4 text-center font-medium text-gray-500 transition-colors dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    <Balancer>{t('post-locale-not-available-notice')}</Balancer>
                  </div>
                )}
                {children}
              </PostBody>
            </div>

            {/* DESKTOP TABLE OF CONTENTS */}
            <aside>
              <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
                <TableOfContents source={raw} />
              </div>
            </aside>
          </div>

          <div
            className="divide-y divide-gray-200 pb-8 transition-colors dark:divide-gray-700"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            {(prev || next) && (
              <footer>
                <div className="flex flex-col gap-8 py-8 text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && (
                    <div className="basis-6/12">
                      <p className="mb-1 text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400">
                        {t('previous-article')}
                      </p>
                      <CustomLink
                        href={prev.path}
                        className="flex gap-1 text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        <span>&larr;</span>
                        <span className="grow">
                          <Balancer>{prev.title}</Balancer>
                        </span>
                      </CustomLink>
                    </div>
                  )}
                  {next && (
                    <div className="basis-6/12">
                      <p className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400 sm:text-right">
                        {t('next-article')}
                      </p>
                      <CustomLink
                        href={next.path}
                        className="flex gap-1 text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400 sm:flex-row-reverse sm:text-right"
                      >
                        <span>&rarr;</span>
                        <span className="grow">
                          <Balancer>{next.title}</Balancer>
                        </span>
                      </CustomLink>
                    </div>
                  )}
                </div>
              </footer>
            )}

            <div>
              <div id="comment" className="mx-auto max-w-prose py-6">
                <Giscus
                  repo={siteMetadata.giscusConfig.repo}
                  repoId={siteMetadata.giscusConfig.repoId}
                  category={siteMetadata.giscusConfig.category}
                  categoryId={siteMetadata.giscusConfig.categoryId}
                  mapping="pathname"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme={
                    resolvedTheme === 'dark' ? 'transparent_dark' : 'light'
                  }
                  lang={locale}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
