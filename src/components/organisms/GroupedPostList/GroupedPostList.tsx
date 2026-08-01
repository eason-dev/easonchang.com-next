'use client';

import { useLocale, useTranslations } from 'next-intl';

import CustomLink from '@/components/CustomLink';
import PostCard from '@/components/organisms/PostList/PostCard';
import type { ListEntry, YearGroup } from '@/lib/postGroups';
import formatDate from '@/lib/utils/formatDate';

type Props = {
  groups: YearGroup[];
};

type SeriesEntry = Extract<ListEntry, { kind: 'series' }>;

function seriesYearRange(entry: SeriesEntry): string {
  const from = entry.oldestDate.slice(0, 4);
  const to = entry.newestDate.slice(0, 4);
  return from === to ? from : `${from} – ${to}`;
}

function SeriesCard({ entry }: { entry: SeriesEntry }) {
  const locale = useLocale();
  const t = useTranslations('common');

  return (
    <details className="bento-card series-card group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden sm:p-7">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {t('series')} ·{' '}
            {t('series-post-count', { count: entry.items.length })}
          </p>
          <h3 className="mt-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl">
            {entry.name}
          </h3>
          <p className="mt-1 text-sm text-gray-400">{seriesYearRange(entry)}</p>
        </div>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </summary>
      <ol className="mx-6 border-t border-gray-900/5 py-3 dark:border-white/5 sm:mx-7">
        {entry.items.map((item) => (
          <li key={item.post.slug}>
            <CustomLink
              href={item.post.path}
              className="group/item flex items-baseline gap-3 py-2"
            >
              <span className="w-8 shrink-0 text-sm font-medium tabular-nums text-gray-400">
                {String(item.order).padStart(2, '0')}
              </span>
              <span className="font-medium text-gray-700 transition-colors group-hover/item:text-primary-600 dark:text-gray-300 dark:group-hover/item:text-primary-400">
                {item.shortTitle}
              </span>
              <time
                dateTime={item.post.date}
                className="ml-auto hidden shrink-0 text-sm text-gray-400 sm:block"
              >
                {formatDate(item.post.date, locale)}
              </time>
            </CustomLink>
          </li>
        ))}
      </ol>
    </details>
  );
}

/**
 * Year-sectioned post listing: a sticky year marker in the left rail and
 * post cards on the right, with series runs collapsed into expandable
 * series cards.
 */
export default function GroupedPostList({ groups }: Props) {
  return (
    <div className="space-y-12 py-6">
      {groups.map((group) => (
        <section
          key={group.year}
          className="md:grid md:grid-cols-[5.5rem_1fr] md:gap-4"
        >
          <h2 className="top-20 self-start text-3xl font-bold tabular-nums tracking-tight text-gray-300 transition-colors md:sticky dark:text-gray-700">
            {group.year}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 md:mt-0">
            {group.entries.map((entry) =>
              entry.kind === 'post' ? (
                <li key={entry.post.slug}>
                  <PostCard post={entry.post} />
                </li>
              ) : (
                <li key={entry.id}>
                  <SeriesCard entry={entry} />
                </li>
              )
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}
