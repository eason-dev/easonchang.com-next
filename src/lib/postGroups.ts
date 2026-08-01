import { getSeriesName, matchSeries } from '@/data/series';

export type GroupablePost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  path: string;
  socialImage: string;
};

export type SeriesItem = {
  post: GroupablePost;
  order: number;
  shortTitle: string;
};

export type ListEntry =
  | { kind: 'post'; post: GroupablePost }
  | {
      kind: 'series';
      id: string;
      name: string;
      /** Members in reading order (series order ascending). */
      items: SeriesItem[];
      newestDate: string;
      oldestDate: string;
    };

export type YearGroup = { year: number; entries: ListEntry[] };

/** A lone matched post reads better as a plain card than a 1-item series. */
const MIN_SERIES_SIZE = 2;

/** Dates are ISO strings; the year prefix avoids timezone drift. */
const yearOf = (date: string) => Number(date.slice(0, 4));

/**
 * Groups posts (sorted new → old) into year sections, collapsing series
 * members into a single entry placed under the year of the series' newest
 * post. Entries within a year stay in reverse-chronological order.
 */
export function groupPostsByYearAndSeries(
  posts: GroupablePost[],
  locale: string
): YearGroup[] {
  const seriesBuckets = new Map<
    string,
    { name: string; items: SeriesItem[] }
  >();
  const dated: { sortDate: string; entry: ListEntry }[] = [];

  for (const post of posts) {
    const matched = matchSeries(post);
    if (!matched) {
      dated.push({ sortDate: post.date, entry: { kind: 'post', post } });
      continue;
    }
    let bucket = seriesBuckets.get(matched.def.id);
    if (!bucket) {
      bucket = { name: getSeriesName(matched.def, locale), items: [] };
      seriesBuckets.set(matched.def.id, bucket);
    }
    bucket.items.push({
      post,
      order: matched.order,
      shortTitle: matched.shortTitle,
    });
  }

  for (const [id, { name, items }] of seriesBuckets) {
    if (items.length < MIN_SERIES_SIZE) {
      for (const item of items) {
        dated.push({
          sortDate: item.post.date,
          entry: { kind: 'post', post: item.post },
        });
      }
      continue;
    }
    // Input was new → old, so the first collected member is the newest.
    const newestDate = items[0].post.date;
    const oldestDate = items[items.length - 1].post.date;
    dated.push({
      sortDate: newestDate,
      entry: {
        kind: 'series',
        id,
        name,
        items: [...items].sort((a, b) => a.order - b.order),
        newestDate,
        oldestDate,
      },
    });
  }

  dated.sort((a, b) => (a.sortDate < b.sortDate ? 1 : -1));

  const groups: YearGroup[] = [];
  for (const { sortDate, entry } of dated) {
    const year = yearOf(sortDate);
    const current = groups[groups.length - 1];
    if (current && current.year === year) {
      current.entries.push(entry);
    } else {
      groups.push({ year, entries: [entry] });
    }
  }
  return groups;
}
