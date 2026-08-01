import type { Metadata } from 'next';

import siteMetadata from '@/data/siteMetadata';

export const getPostOGImage = (
  socialImage: string,
  title: string,
  description: string
): string => {
  if (socialImage) {
    if (socialImage.startsWith('http')) {
      return socialImage;
    }
    return siteMetadata.siteUrl + socialImage;
  }
  return `${siteMetadata.siteUrl}/api/og?title=${encodeURIComponent(
    title
  )}&desc=${encodeURIComponent(description)}`;
};

/**
 * Absolute URL for a localized path: English is unprefixed, zh-TW is prefixed.
 */
export const localizedUrl = (locale: string, path: string): string => {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const normalizedPath = path === '/' ? '' : path;
  const url = `${siteMetadata.siteUrl}${prefix}${normalizedPath}`;
  return url || siteMetadata.siteUrl;
};

/**
 * hreflang alternates for a path, for the Metadata API.
 */
export const languageAlternates = (path: string) => ({
  en: localizedUrl('en', path),
  'zh-TW': localizedUrl('zh-TW', path),
  'x-default': localizedUrl('en', path),
});

type PageMetadataInput = {
  locale: string;
  path: string;
  /** Page title without the site-name suffix; the layout template appends it. */
  title?: string;
  description: string;
  ogImage?: string;
};

export const buildPageMetadata = ({
  locale,
  path,
  title,
  description,
  ogImage = siteMetadata.siteUrl + siteMetadata.socialBanner,
}: PageMetadataInput): Metadata => {
  const url = localizedUrl(locale, path);
  const fullTitle = title
    ? `${title} - ${siteMetadata.title}`
    : siteMetadata.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      siteName: siteMetadata.title,
      title: fullTitle,
      description,
      url,
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteMetadata.twitterID,
      creator: siteMetadata.twitterID,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
};
