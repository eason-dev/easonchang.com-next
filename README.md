# easonchang.com

![Blog homepage](./docs/readme-cover.jpg)

Eason Chang's personal blog — bilingual (English / 繁體中文), statically generated, AI-readable.

Visit: [https://easonchang.com/](https://easonchang.com/)

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **React 19** + **TypeScript** (strict)
- **Content Collections** — type-safe MDX content with zod schemas
- **next-intl** — `en` (unprefixed) + `zh-TW` locales with hreflang alternates
- **Tailwind CSS 4** — CSS-first config, oklch design tokens, dark mode
- **Shiki** (rehype-pretty-code) — dual-theme syntax highlighting
- **cmdk** command palette (⌘K) + **Motion** micro-interactions
- **Biome** — lint + format, wired into pre-commit (husky + lint-staged)
- **Vitest** unit tests + **Playwright** smoke tests
- **Storybook 10** (Vite builder) component workshop
- Feeds (`/feed.xml`, `/atom.xml`, `/feed.json`), `sitemap.xml`, `robots.txt`, and OG images (`/api/og`, with Traditional Chinese font) generated from code
- AI-readable: [`/llms.txt`](https://easonchang.com/llms.txt), [`/llms-full.txt`](https://easonchang.com/llms-full.txt), and raw markdown for every post by appending `.md` to its URL

## Commands

```bash
pnpm install        # pnpm only (preinstall blocks npm/yarn)
pnpm dev            # dev server at http://localhost:3000
pnpm build          # production build (all pages statically generated)
pnpm lint           # Biome check (lint + format)
pnpm test           # Vitest unit tests
pnpm test:e2e       # Playwright smoke tests (needs a prior build)
pnpm storybook      # Storybook at http://localhost:6006
```

## Writing

Posts live in `content/posts/*.mdx` with frontmatter (`title`, `slug`, `date`, `description`, `socialImage`, `language`, optional `redirect_from`). A post can exist in one or both languages; versions pair up by `slug`.

See [AGENTS.md](./AGENTS.md) for the full content model and architecture notes, and [docs/MODERNIZATION_PLAN.md](./docs/MODERNIZATION_PLAN.md) for how this stack came to be.
