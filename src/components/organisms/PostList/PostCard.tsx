'use client';

import { useLocale } from 'next-intl';
import type { MouseEvent } from 'react';

import CustomLink from '@/components/CustomLink';
import PostCoverThumb from '@/components/PostCoverThumb';
import formatDate from '@/lib/utils/formatDate';

export interface PostForPostList {
  slug: string;
  date: string;
  title: string;
  description: string;
  path: string;
  socialImage: string;
}

type Props = {
  post: PostForPostList;
};

const trackSpotlight = (event: MouseEvent<HTMLElement>) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
  card.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
};

export default function PostCard({ post }: Props) {
  const locale = useLocale();
  const { slug, date, title, description, path, socialImage } = post;

  return (
    <CustomLink href={path} className="block">
      <article
        onMouseMove={trackSpotlight}
        className="bento-card spotlight-card group flex items-center gap-5 p-6 sm:gap-6 sm:p-7"
      >
        <div className="min-w-0 flex-1">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-sm font-medium text-gray-400 dark:text-gray-500">
              <time dateTime={date}>{formatDate(date, locale)}</time>
            </dd>
          </dl>
          <h3 className="mt-2 text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 line-clamp-2 text-gray-500 transition-colors dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        <div className="relative hidden aspect-[1200/630] w-36 shrink-0 overflow-hidden rounded-xl border border-gray-900/5 bg-gray-100 sm:block dark:border-white/5 dark:bg-gray-800">
          <PostCoverThumb
            slug={slug}
            title={title}
            image={socialImage}
            sizes="144px"
          />
        </div>
      </article>
    </CustomLink>
  );
}
