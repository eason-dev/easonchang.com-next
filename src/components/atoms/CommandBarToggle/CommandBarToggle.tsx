'use client';

import { useCommandPalette } from '@/components/organisms/CommandPalette/CommandPalette';

export default function CommandBarToggle() {
  const { setOpen } = useCommandPalette();

  return (
    <button
      aria-label="Toggle Command Palette"
      type="button"
      className="hidden h-10 items-center gap-2 rounded-full border border-gray-900/10 px-3 text-sm text-gray-500 transition-colors hover:border-primary-500/40 hover:text-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:text-gray-100 sm:flex"
      onClick={() => setOpen(true)}
    >
      <svg
        aria-hidden="true"
        fill="none"
        className="h-4 w-4"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.333 1a2.667 2.667 0 0 0-2.666 2.667v10.666a2.667 2.667 0 1 0 2.666-2.666H3.667a2.667 2.667 0 1 0 2.666 2.666V3.667a2.667 2.667 0 1 0-2.666 2.666h10.666a2.667 2.667 0 0 0 0-5.333Z"
        />
      </svg>
      <kbd className="font-sans text-xs">⌘K</kbd>
    </button>
  );
}
