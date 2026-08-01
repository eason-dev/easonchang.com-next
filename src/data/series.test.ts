import { describe, expect, it } from 'vitest';

import { matchSeries } from '@/data/series';

describe('matchSeries', () => {
  it('matches Modern Next.js Blog posts by English title suffix', () => {
    const result = matchSeries({
      slug: 'nextjs-to-vercel',
      title:
        'Deploying a Next.js Project on Vercel Platform - Modern Next.js Blog Series #03',
    });
    expect(result?.def.id).toBe('modern-nextjs-blog');
    expect(result?.order).toBe(3);
    expect(result?.shortTitle).toBe(
      'Deploying a Next.js Project on Vercel Platform'
    );
  });

  it('matches Modern Next.js Blog posts by Chinese title suffix', () => {
    const result = matchSeries({
      slug: 'modern-nextjs-blog-intro',
      title:
        '「從零開始打造炫砲個人部落格」系列簡介 - Modern Next.js Blog 系列 #01',
    });
    expect(result?.def.id).toBe('modern-nextjs-blog');
    expect(result?.order).toBe(1);
    expect(result?.shortTitle).toBe('「從零開始打造炫砲個人部落格」系列簡介');
  });

  it('matches 2021 Ironman posts by slug and strips the Day prefix', () => {
    const result = matchSeries({
      slug: '2021-ironman-day10-apollo-graphql-post-list',
      title:
        'Day10 在 Next.js 安裝 apollo-graphql，串接 WordPress GraphQL API（下）',
    });
    expect(result?.def.id).toBe('ironman-2021-nextjs-wordpress');
    expect(result?.order).toBe(10);
    expect(result?.shortTitle).toBe(
      '在 Next.js 安裝 apollo-graphql，串接 WordPress GraphQL API（下）'
    );
  });

  it('matches 100sites posts, including the #000 intro with slug 100sites', () => {
    const result = matchSeries({
      slug: '100sites',
      title: '【100sites #000】My Journey to Becoming a Full Stack Developer',
    });
    expect(result?.def.id).toBe('100sites');
    expect(result?.order).toBe(0);
    expect(result?.shortTitle).toBe(
      'My Journey to Becoming a Full Stack Developer'
    );
  });

  it('matches Daily UI posts', () => {
    const result = matchSeries({
      slug: 'dailyui-001-sign-up',
      title: '【DailyUI #001】Sign Up',
    });
    expect(result?.def.id).toBe('dailyui');
    expect(result?.order).toBe(1);
    expect(result?.shortTitle).toBe('Sign Up');
  });

  it('returns null for posts outside any series', () => {
    expect(
      matchSeries({ slug: 'less-but-better', title: '少，但是更好' })
    ).toBeNull();
  });
});
