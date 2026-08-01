import { describe, expect, it } from 'vitest';

import { getPostOGImage, languageAlternates, localizedUrl } from '@/lib/seo';

describe('localizedUrl', () => {
  it('leaves English unprefixed', () => {
    expect(localizedUrl('en', '/posts')).toBe('https://easonchang.com/posts');
  });

  it('prefixes zh-TW', () => {
    expect(localizedUrl('zh-TW', '/posts')).toBe(
      'https://easonchang.com/zh-TW/posts'
    );
  });

  it('handles the root path without a trailing slash', () => {
    expect(localizedUrl('en', '/')).toBe('https://easonchang.com');
    expect(localizedUrl('zh-TW', '/')).toBe('https://easonchang.com/zh-TW');
  });
});

describe('languageAlternates', () => {
  it('produces hreflang entries with an x-default', () => {
    expect(languageAlternates('/about')).toEqual({
      en: 'https://easonchang.com/about',
      'zh-TW': 'https://easonchang.com/zh-TW/about',
      'x-default': 'https://easonchang.com/about',
    });
  });
});

describe('getPostOGImage', () => {
  it('passes through absolute social images', () => {
    expect(getPostOGImage('https://i.imgur.com/x.jpg', 't', 'd')).toBe(
      'https://i.imgur.com/x.jpg'
    );
  });

  it('prefixes site-relative social images', () => {
    expect(getPostOGImage('/images/cover.png', 't', 'd')).toBe(
      'https://easonchang.com/images/cover.png'
    );
  });

  it('falls back to the generated OG endpoint', () => {
    expect(getPostOGImage('', 'My Title', 'My description')).toBe(
      'https://easonchang.com/api/og?title=My%20Title&desc=My%20description'
    );
  });
});
