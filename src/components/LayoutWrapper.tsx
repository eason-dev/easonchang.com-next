'use client';

import { useTranslations } from 'next-intl';

import CommandBarToggle from '@/components/atoms/CommandBarToggle';
import CustomLink from '@/components/CustomLink';
import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
import { usePathname } from '@/i18n/navigation';

import Footer from './Footer';
import LanguageSwitch from './LanguageSwitch';
import MobileNav from './MobileNav';
import SectionContainer from './SectionContainer';
import ThemeSwitch from './ThemeSwitch';

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const t = useTranslations('common');
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <div>
        <header className="glass sticky top-0 z-10 border-b border-gray-900/5 py-3 transition-colors dark:border-white/5">
          <SectionContainer>
            <div className="flex items-center justify-between">
              <div>
                <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600" />
                    <span className="text-xl font-semibold tracking-tight">
                      {siteMetadata.headerTitle}
                    </span>
                  </div>
                </CustomLink>
              </div>
              <div className="flex items-center gap-1 text-base leading-5">
                <nav className="hidden gap-1 sm:flex">
                  {headerNavLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <CustomLink
                        key={link.title}
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-500/10 text-primary-700 dark:text-primary-300'
                            : 'text-gray-600 hover:bg-gray-900/5 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                        }`}
                      >
                        {t(link.title)}
                      </CustomLink>
                    );
                  })}
                </nav>
                <CommandBarToggle />
                <LanguageSwitch />
                <ThemeSwitch />
                <MobileNav />
              </div>
            </div>
          </SectionContainer>
        </header>

        <SectionContainer>
          <main className="mb-auto">{children}</main>
        </SectionContainer>
      </div>

      <Footer />
    </div>
  );
};

export default LayoutWrapper;
