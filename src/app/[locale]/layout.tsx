import '@/styles/index.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_TC } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import LayoutWrapper from '@/components/LayoutWrapper';
import CommandPalette from '@/components/organisms/CommandPalette';
import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from '@/constants/envValues';
import siteMetadata from '@/data/siteMetadata';
import { routing } from '@/i18n/routing';
import { allPostsOfLocaleNewToOld } from '@/lib/content';
import { languageAlternates, localizedUrl } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// CJK fonts ship as unicode-range slices; browsers fetch only what a page
// uses, so preloading every slice would be counterproductive.
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: siteMetadata.title,
      template: `%s - ${siteMetadata.title}`,
    },
    description: siteMetadata.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: localizedUrl(locale, '/'),
      languages: languageAlternates('/'),
      types: {
        'application/rss+xml': '/feed.xml',
        'application/atom+xml': '/atom.xml',
      },
    },
    openGraph: {
      siteName: siteMetadata.title,
      title: siteMetadata.title,
      description: siteMetadata.description,
      url: localizedUrl(locale, '/'),
      type: 'website',
      images: [siteMetadata.siteUrl + siteMetadata.socialBanner],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteMetadata.twitterID,
      creator: siteMetadata.twitterID,
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [siteMetadata.siteUrl + siteMetadata.socialBanner],
    },
    icons: {
      icon: [
        {
          url: '/favicons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
      ],
      apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '76x76' }],
      other: [
        {
          rel: 'mask-icon',
          url: '/favicons/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
      ],
    },
    manifest: '/favicons/site.webmanifest',
    other: {
      'msapplication-TileColor': '#000000',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  const commandPalettePosts = allPostsOfLocaleNewToOld(locale).map((post) => ({
    slug: post.slug,
    title: post.title,
    path: post.path,
  }));

  const identityData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteMetadata.siteUrl}/#website`,
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        description: siteMetadata.description,
        inLanguage: ['en', 'zh-TW'],
        publisher: { '@id': `${siteMetadata.siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteMetadata.siteUrl}/#person`,
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        image: siteMetadata.siteUrl + siteMetadata.siteLogo,
        email: siteMetadata.email,
        sameAs: [
          siteMetadata.github,
          siteMetadata.linkedin,
          siteMetadata.twitter,
          siteMetadata.facebook,
          siteMetadata.instagram,
          siteMetadata.threads,
          siteMetadata.bluesky,
        ],
      },
    ],
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansTC.variable}`}
    >
      <body className="overflow-x-hidden bg-white text-gray-950 antialiased transition-colors dark:bg-gray-950 dark:text-white">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from trusted site metadata
          dangerouslySetInnerHTML={{ __html: JSON.stringify(identityData) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
            <CommandPalette posts={commandPalettePosts}>
              <LayoutWrapper>{children}</LayoutWrapper>
            </CommandPalette>
          </ThemeProvider>
        </NextIntlClientProvider>

        <Analytics />

        {NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
