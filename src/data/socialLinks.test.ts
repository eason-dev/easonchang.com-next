import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { allProfileUrls, getSocialLinks } from '@/data/socialLinks';

/**
 * Every markdown link target on a page, trailing slash normalized away.
 * Matched exactly rather than by substring: the English handles are prefixes
 * of the Chinese ones (`@easondev` vs `@easondev.tw`), so a substring check
 * would happily accept an English URL on the Chinese page.
 */
const linkTargets = (file: string) => {
  const md = readFileSync(`${process.cwd()}/content/pages/${file}`, 'utf8');
  return new Set(
    [...md.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1].replace(/\/$/, ''))
  );
};

describe('getSocialLinks', () => {
  it.each([
    ['en', 'about-en.mdx'],
    ['zh-TW', 'about-zh.mdx'],
  ])('links %s pages to the profiles the About page lists', (locale, file) => {
    const targets = linkTargets(file);
    const { twitterID, email, ...profiles } = getSocialLinks(locale);

    expect(targets, `${locale} email`).toContain(`mailto:${email}`);
    for (const [platform, url] of Object.entries(profiles)) {
      expect(targets, `${locale} ${platform}`).toContain(
        url.replace(/\/$/, '')
      );
    }
  });

  it('keeps the Chinese-audience accounts off English pages', () => {
    const en = Object.values(getSocialLinks('en')).join(' ');

    expect(en).not.toMatch(/easondev[._-]tw/);
  });

  it('falls back to the English accounts for an unknown locale', () => {
    expect(getSocialLinks('de')).toEqual(getSocialLinks('en'));
  });
});

describe('allProfileUrls', () => {
  it('covers both locales, so one sameAs list identifies the whole person', () => {
    for (const locale of ['en', 'zh-TW']) {
      const { twitterID, email, ...profiles } = getSocialLinks(locale);

      for (const [platform, url] of Object.entries(profiles)) {
        expect(allProfileUrls, `${locale} ${platform}`).toContain(url);
      }
    }
  });

  it('lists each profile once', () => {
    expect(allProfileUrls).toEqual([...new Set(allProfileUrls)]);
  });

  it('carries no @handles, which are not resolvable URLs', () => {
    for (const url of allProfileUrls) {
      expect(url).toMatch(/^https:\/\//);
    }
  });
});
