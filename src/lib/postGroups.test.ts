import { describe, expect, it } from 'vitest';

import type { GroupablePost } from '@/lib/postGroups';
import { groupPostsByYearAndSeries } from '@/lib/postGroups';

const post = (
  slug: string,
  title: string,
  date: string,
  overrides: Partial<GroupablePost> = {}
): GroupablePost => ({
  slug,
  title,
  date,
  description: '',
  path: `/posts/${slug}`,
  socialImage: '',
  ...overrides,
});

describe('groupPostsByYearAndSeries', () => {
  it('groups standalone posts by year, newest year first', () => {
    const groups = groupPostsByYearAndSeries(
      [
        post('a', 'A', '2023-02-04T00:00:00.000Z'),
        post('b', 'B', '2022-07-24T00:00:00.000Z'),
        post('c', 'C', '2022-04-11T00:00:00.000Z'),
      ],
      'en'
    );
    expect(groups.map((g) => g.year)).toEqual([2023, 2022]);
    expect(groups[1].entries).toHaveLength(2);
    expect(groups[1].entries[0]).toMatchObject({
      kind: 'post',
      post: { slug: 'b' },
    });
  });

  it('collapses series members into one entry with items in reading order', () => {
    const groups = groupPostsByYearAndSeries(
      [
        post(
          'summary',
          'Summary - Modern Next.js Blog Series #30',
          '2022-10-15T00:00:00.000Z'
        ),
        post('standalone', 'Standalone', '2022-10-01T00:00:00.000Z'),
        post(
          'intro',
          'Intro - Modern Next.js Blog Series #01',
          '2022-09-16T00:00:00.000Z'
        ),
      ],
      'en'
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].entries).toHaveLength(2);

    const [series, standalone] = groups[0].entries;
    expect(series.kind).toBe('series');
    if (series.kind === 'series') {
      expect(series.name).toBe('Modern Next.js Blog Series');
      expect(series.items.map((i) => i.order)).toEqual([1, 30]);
      expect(series.items.map((i) => i.shortTitle)).toEqual([
        'Intro',
        'Summary',
      ]);
      expect(series.newestDate).toBe('2022-10-15T00:00:00.000Z');
      expect(series.oldestDate).toBe('2022-09-16T00:00:00.000Z');
    }
    expect(standalone).toMatchObject({
      kind: 'post',
      post: { slug: 'standalone' },
    });
  });

  it('places a cross-year series under the year of its newest post', () => {
    const groups = groupPostsByYearAndSeries(
      [
        post(
          '2021-ironman-day2-personal-blog-requirement',
          'Day2 部落格需求',
          '2022-03-20T00:00:00.000Z'
        ),
        post(
          '2021-ironman-day1-nextjs-wordpress-intro',
          'Day1 系列簡介',
          '2021-10-17T00:00:00.000Z'
        ),
        post('old', 'Old standalone', '2021-02-13T00:00:00.000Z'),
      ],
      'zh-TW'
    );
    expect(groups.map((g) => g.year)).toEqual([2022, 2021]);
    expect(groups[0].entries[0].kind).toBe('series');
    expect(groups[1].entries).toHaveLength(1);
    expect(groups[1].entries[0]).toMatchObject({
      kind: 'post',
      post: { slug: 'old' },
    });
  });

  it('renders a single-member series as a plain post', () => {
    const groups = groupPostsByYearAndSeries(
      [
        post(
          'dailyui-001-sign-up',
          '【DailyUI #001】Sign Up',
          '2016-05-09T00:00:00.000Z'
        ),
      ],
      'en'
    );
    expect(groups[0].entries[0].kind).toBe('post');
  });

  it('resolves series names per locale', () => {
    const posts = [
      post('2021-ironman-day2-x', 'Day2 X', '2022-03-20T00:00:00.000Z'),
      post('2021-ironman-day1-x', 'Day1 X', '2021-10-17T00:00:00.000Z'),
    ];
    const zh = groupPostsByYearAndSeries(posts, 'zh-TW');
    const en = groupPostsByYearAndSeries(posts, 'en');
    const zhEntry = zh[0].entries[0];
    const enEntry = en[0].entries[0];
    if (zhEntry.kind === 'series' && enEntry.kind === 'series') {
      expect(zhEntry.name).toContain('鐵人賽');
      expect(enEntry.name).toContain('Ironman');
    } else {
      throw new Error('expected series entries');
    }
  });
});
