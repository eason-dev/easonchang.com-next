import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-TW'],
  defaultLocale: 'en',
  // Keep the historical URL structure: English unprefixed, /zh-TW/... prefixed.
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
