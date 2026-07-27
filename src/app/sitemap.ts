import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { allPosts } from '@/lib/content';
import { languageAlternates, localizedUrl } from '@/lib/seo';

const STATIC_PATHS = ['/', '/posts', '/posts/page/1', '/about', '/projects'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const uniquePostPaths = [...new Set(allPosts.map((post) => post.path))];
  const paths = [...STATIC_PATHS, ...uniquePostPaths];

  // One entry per locale variant (en unprefixed, zh-TW prefixed), each
  // carrying hreflang alternates, mirroring the URL set the site has always
  // published.
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.7,
      alternates: {
        languages: languageAlternates(path),
      },
    }))
  );
}
