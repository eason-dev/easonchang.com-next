'use client';

import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

const LanguageSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'zh-TW' : 'en';

  return (
    <Link
      locale={nextLocale}
      href={pathname}
      aria-label="Toggle Language"
      className="rounded-full p-2 text-2xl leading-6 transition-colors hover:bg-gray-900/5 dark:hover:bg-white/5 sm:p-3"
    >
      {locale === 'en' ? '🇺🇸' : '🇹🇼'}
    </Link>
  );
};

export default LanguageSwitch;
