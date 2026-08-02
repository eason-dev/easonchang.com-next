import siteMetadata from './siteMetadata';

/**
 * Eason posts to a separate set of accounts for his Chinese-language audience,
 * so a zh-TW page must not send readers to the English profiles. The two
 * About pages (`content/pages/about-{en,zh}.mdx`) are the source of truth for
 * these handles — keep them in sync.
 *
 * Only the platforms that actually split live here; email, GitHub, and
 * LinkedIn are single accounts shared by both audiences and stay in
 * siteMetadata.
 */
const localizedAccounts = {
  en: {
    twitter: 'https://x.com/easondev',
    twitterID: '@easondev',
    threads: 'https://www.threads.com/@easondev',
    facebook: 'https://www.facebook.com/easondev',
    instagram: 'https://www.instagram.com/easondev',
    bluesky: 'https://bsky.app/profile/easondev.bsky.social',
  },
  'zh-TW': {
    twitter: 'https://x.com/easondev_tw',
    twitterID: '@easondev_tw',
    threads: 'https://www.threads.com/@easondev.tw',
    facebook: 'https://www.facebook.com/easondev.tw',
    instagram: 'https://www.instagram.com/easondev.tw',
    bluesky: 'https://bsky.app/profile/easondev-tw.bsky.social',
  },
} as const;

export type SocialLinks =
  (typeof localizedAccounts)[keyof typeof localizedAccounts] & {
    email: string;
    github: string;
    linkedin: string;
  };

/**
 * Every profile to link to from a given locale's pages. Unknown locales fall
 * back to the English accounts, matching the default locale.
 */
export const getSocialLinks = (locale: string): SocialLinks => ({
  email: siteMetadata.email,
  github: siteMetadata.github,
  linkedin: siteMetadata.linkedin,
  ...(locale === 'zh-TW' ? localizedAccounts['zh-TW'] : localizedAccounts.en),
});

/**
 * Every profile URL Eason owns, both audiences' accounts together, for the
 * Person JSON-LD's `sameAs`.
 *
 * Deliberately not localized: `sameAs` is an identity graph rather than a link
 * for readers, and both locales publish the same Person `@id`. Emitting a
 * different half of the set per page would have the two pages disagree about
 * one entity and show any given crawl only part of it.
 */
export const allProfileUrls: string[] = [
  siteMetadata.github,
  siteMetadata.linkedin,
  ...Object.values(localizedAccounts).flatMap(({ twitterID, ...urls }) =>
    Object.values(urls)
  ),
];
