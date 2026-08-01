// @ts-check
import { withContentCollections } from '@content-collections/next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // TypeScript 7 dropped the programmatic compiler API Next.js links
    // against, so Next has to shell out to the tsc CLI instead.
    useTypeScriptCli: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next 16 restricts the optimizer to these quality values (default [75]).
    // ProjectCard requests quality 30 for its cover thumbnails.
    qualities: [30, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.creativecommons.org',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default withContentCollections(withNextIntl(nextConfig));
