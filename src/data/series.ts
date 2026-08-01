/**
 * Post series definitions. A "series" is a run of posts published as one
 * body of work (e.g. the 30-post Modern Next.js Blog course). The posts
 * listing collapses each series into a single expandable card, so matchers
 * here identify membership from stable signals: the shared slug prefix or
 * the title suffix/prefix conventions used when the posts were published.
 */

export type SeriesLocale = 'en' | 'zh-TW';

export type SeriesDef = {
  id: string;
  name: Record<SeriesLocale, string>;
  /**
   * Returns the post's position in the series plus a title with the
   * series boilerplate stripped, or null when the post is not a member.
   */
  match: (post: { slug: string; title: string }) => {
    order: number;
    shortTitle: string;
  } | null;
};

const MODERN_NEXTJS_SUFFIX =
  /\s*[-–]\s*Modern Next\.js Blog (?:Series|系列) #(\d+)\s*$/;
const IRONMAN_SLUG = /^2021-ironman-day(\d+)-/;
const HUNDRED_SITES_PREFIX = /^【100sites #(\d+)】\s*/;
const DAILY_UI_PREFIX = /^【DailyUI #(\d+)】\s*/i;

export const SERIES: SeriesDef[] = [
  {
    id: 'modern-nextjs-blog',
    name: {
      en: 'Modern Next.js Blog Series',
      'zh-TW': 'Modern Next.js Blog 系列',
    },
    match: ({ title }) => {
      const matched = title.match(MODERN_NEXTJS_SUFFIX);
      if (!matched) return null;
      return {
        order: Number(matched[1]),
        shortTitle: title.slice(0, matched.index).trim(),
      };
    },
  },
  {
    id: 'ironman-2021-nextjs-wordpress',
    name: {
      en: 'Next.js × WordPress (iThome Ironman 2021)',
      'zh-TW': '用 Next.js 拆分 WordPress 前端（2021 iThome 鐵人賽）',
    },
    match: ({ slug, title }) => {
      const matched = slug.match(IRONMAN_SLUG);
      if (!matched) return null;
      return {
        order: Number(matched[1]),
        shortTitle: title.replace(/^Day\d+\s*/, ''),
      };
    },
  },
  {
    id: '100sites',
    name: {
      en: '100sites',
      'zh-TW': '100sites',
    },
    match: ({ title }) => {
      const matched = title.match(HUNDRED_SITES_PREFIX);
      if (!matched) return null;
      return {
        order: Number(matched[1]),
        shortTitle: title.slice(matched[0].length).trim(),
      };
    },
  },
  {
    id: 'dailyui',
    name: {
      en: 'Daily UI',
      'zh-TW': 'Daily UI',
    },
    match: ({ title }) => {
      const matched = title.match(DAILY_UI_PREFIX);
      if (!matched) return null;
      return {
        order: Number(matched[1]),
        shortTitle: title.slice(matched[0].length).trim(),
      };
    },
  },
];

export function getSeriesName(def: SeriesDef, locale: string): string {
  return locale === 'zh-TW' ? def.name['zh-TW'] : def.name.en;
}

export function matchSeries(post: { slug: string; title: string }): {
  def: SeriesDef;
  order: number;
  shortTitle: string;
} | null {
  for (const def of SERIES) {
    const matched = def.match(post);
    if (matched) return { def, ...matched };
  }
  return null;
}
