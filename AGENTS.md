# AGENTS.md — guide for AI coding agents

Personal bilingual blog of Eason Chang, deployed on Vercel at https://easonchang.com.

## Commands

- `pnpm install` — install deps (pnpm only; `preinstall` blocks npm/yarn)
- `pnpm dev` — dev server at http://localhost:3000
- `pnpm build` — production build (statically generates all pages, sitemap, robots, and RSS/Atom/JSON feed routes; gates on TypeScript strict)
- `pnpm lint` / `pnpm lint:fix` — Biome lint + format check (also runs on pre-commit via lint-staged)
- `pnpm test` — Vitest unit tests
- `pnpm test:e2e` — Playwright smoke tests (builds required first; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/opt/pw-browsers/chromium` in sandboxed envs instead of downloading browsers)
- `pnpm storybook` / `pnpm build-storybook` — component workshop (Storybook 10, Vite builder)

## Architecture

- **Next.js App Router** (`src/app/[locale]/…`) with React Server Components; content in `content/` as MDX, loaded via **Content Collections** (`content-collections.ts`).
- **i18n via next-intl**: routing in `src/i18n/routing.ts`, locale middleware in `src/proxy.ts`, UI strings in `messages/{en,zh-TW}.json`. Server components use `getTranslations`, client components `useTranslations`. Internal links must use `@/i18n/navigation`'s `Link` (wrapped by `CustomLink`) so locale prefixes stay correct. Social profiles differ per locale (Eason keeps separate Chinese-audience accounts) — always resolve them with `getSocialLinks(locale)` from `src/data/socialLinks.ts`, never hardcode a profile URL; the two About pages are the source of truth and a unit test holds them in sync.
- **SEO**: Metadata API (`generateMetadata` + helpers in `src/lib/seo.ts`), `src/app/sitemap.ts`, `src/app/robots.ts`, feeds as route handlers (`src/app/feed.xml` etc. via `src/lib/feeds.ts`), OG images at `/api/og` (`next/og`, Noto Sans TC).
- **Content model** (see `content-collections.ts`):
  - `Post` (`content/posts/**/*.mdx`): frontmatter `title`, `slug`, `date`, `description`, `socialImage` (required); `isDraft`, `language` (`en` | `zh-TW`, default `zh-TW`), `redirect_from` (list of legacy URLs, served as 301 redirects — never break these); `translation` (`ai` on the machine-translated half of a language pair — renders a disclosure notice linking to the original and is surfaced on the AI-readable endpoints); `written` (`ai` when the post was drafted with AI assistance — same disclosure treatment; set deliberately at writing time, never retroactively).
  - `Page` (`content/pages/**/*.mdx`): `name`, `path`, `redirect_from`.
  - A post exists once per language; the same `slug` may appear in both `en` and `zh-TW` files. Posts pair up across locales by slug.
- **i18n**: locales `en` (default, unprefixed URLs) and `zh-TW` (`/zh-TW/...` prefix). URL structure is load-bearing SEO — preserve `/posts/[slug]`, locale prefixes, and all `redirect_from` 301s.
- **URL contract**: `docs/url-baseline.txt` snapshots the published sitemap — any routing change must keep every URL there resolving (200, intentional redirect, or the two legacy `/404` artifacts which correctly return 404).
- Comments via Giscus, dynamic OG images, dark mode via next-themes, ⌘K command palette (cmdk).
- **AI-readable endpoints**: `/llms.txt`, `/llms-full.txt`, and `/posts/<slug>.md` raw-markdown routes (rewritten in `src/proxy.ts`). Keep these in sync with any content-model change.

## Conventions

- TypeScript (strict) + Tailwind CSS. Lint/format via Biome (`biome.json`); pre-commit hook runs lint-staged.
- Never commit generated output: `.next/`, `.contentlayer/`, `public/sitemap*.xml`, `public/robots.txt`, `public/feed.*`, `public/atom.xml`.
- Modernization roadmap lives in `docs/MODERNIZATION_PLAN.md`; keep it updated as phases land.
- Agent skills live in `.claude/skills/`: `write-post` (blog posts in Eason's voice — always use it when drafting post content) and `translate-post` (paired-language versions). `CLAUDE.md` carries Claude-specific rules and the definition-of-done command list.
