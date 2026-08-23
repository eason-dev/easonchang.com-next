'use client';

import {
  CodeBracketIcon,
  ComputerDesktopIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PencilSquareIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Command } from 'cmdk';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';

export type PostForCommandPalette = {
  slug: string;
  title: string;
  path: string;
};

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue>({
  open: false,
  setOpen: () => undefined,
});

export const useCommandPalette = () => useContext(CommandPaletteContext);

type Props = {
  posts: PostForCommandPalette[];
  children: React.ReactNode;
};

const itemClass =
  'flex cursor-pointer select-none items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 data-[selected=true]:bg-primary-500/15 data-[selected=true]:text-primary-700 dark:data-[selected=true]:text-primary-300 transition-colors';

export default function CommandPalette({ posts, children }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const pages = [
    { key: 'home', label: t('home'), href: '/', Icon: HomeIcon },
    {
      key: 'posts',
      label: t('all-posts'),
      href: '/posts',
      Icon: PencilSquareIcon,
    },
    {
      key: 'projects',
      label: t('projects'),
      href: '/projects',
      Icon: CodeBracketIcon,
    },
    { key: 'about', label: t('about'), href: '/about', Icon: UserIcon },
  ];

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t('search')}
        overlayClassName="fixed inset-0 z-40 bg-gray-950/40 backdrop-blur-sm"
        contentClassName="fixed inset-x-4 top-24 z-50 mx-auto max-w-xl overflow-hidden rounded-2xl border border-gray-900/10 shadow-2xl glass dark:border-white/10"
      >
        <Command.Input
          placeholder={t('post-search-placeholder')}
          className="w-full border-b border-gray-900/10 bg-transparent px-5 py-4 text-base text-gray-900 outline-hidden placeholder:text-gray-500 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-400"
        />
        <Command.List className="max-h-96 overflow-y-auto overscroll-contain p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-gray-500 dark:[&_[cmdk-group-heading]]:text-gray-400">
          <Command.Empty className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {t('search')}: 0
          </Command.Empty>

          <Command.Group heading={t('page')}>
            {pages.map(({ key, label, href, Icon }) => (
              <Command.Item
                key={key}
                value={`${label} ${key}`}
                className={itemClass}
                onSelect={() => runCommand(() => router.push(href))}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                {label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading={t('operation')}>
            <Command.Item
              value={`${t('light-mode')} light theme`}
              className={itemClass}
              onSelect={() => runCommand(() => setTheme('light'))}
            >
              <SunIcon aria-hidden="true" className="h-5 w-5" />
              {t('light-mode')}
            </Command.Item>
            <Command.Item
              value={`${t('dark-mode')} dark theme`}
              className={itemClass}
              onSelect={() => runCommand(() => setTheme('dark'))}
            >
              <MoonIcon aria-hidden="true" className="h-5 w-5" />
              {t('dark-mode')}
            </Command.Item>
            <Command.Item
              value={`${t('toggle-theme')} system theme`}
              className={itemClass}
              onSelect={() => runCommand(() => setTheme('system'))}
            >
              <ComputerDesktopIcon aria-hidden="true" className="h-5 w-5" />
              {t('toggle-theme')}
            </Command.Item>
            <Command.Item
              value={`${t('toggle-language')} ${t('english')} ${t('chinese')} language locale 語言`}
              className={itemClass}
              onSelect={() =>
                runCommand(() =>
                  router.replace(pathname, {
                    locale: locale === 'en' ? 'zh-TW' : 'en',
                  })
                )
              }
            >
              <span aria-hidden="true" className="text-base leading-none">
                {locale === 'en' ? '🇹🇼' : '🇺🇸'}
              </span>
              {t('toggle-language')}
            </Command.Item>
          </Command.Group>

          <Command.Group heading={t('search-posts')}>
            {posts.map((post) => (
              <Command.Item
                key={post.slug}
                value={`${post.title} ${post.slug}`}
                className={itemClass}
                onSelect={() => runCommand(() => router.push(post.path))}
              >
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                />
                <span className="line-clamp-1">{post.title}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </CommandPaletteContext.Provider>
  );
}
