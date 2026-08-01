'use client';

import Giscus from '@giscus/react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import PostBody from '@/components/organisms/PostBody';
import siteMetadata from '@/data/siteMetadata';

type Props = {
  children: React.ReactNode;
};

export default function AuthorLayout({ children }: Props) {
  const t = useTranslations('common');
  const locale = useLocale();
  const { resolvedTheme } = useTheme();

  return (
    <div className="mx-auto max-w-prose">
      <div className="space-y-2 pt-12 pb-6 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:leading-10 md:text-6xl md:leading-14">
          {t('about-me')}
        </h1>
      </div>
      <div className="space-y-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="py-8">
          <PostBody>{children}</PostBody>
        </div>

        <div className="py-8">
          <Giscus
            repo={siteMetadata.giscusConfig.repo}
            repoId={siteMetadata.giscusConfig.repoId}
            category={siteMetadata.giscusConfig.category}
            categoryId={siteMetadata.giscusConfig.categoryId}
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={resolvedTheme === 'dark' ? 'transparent_dark' : 'light'}
            lang={locale}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
