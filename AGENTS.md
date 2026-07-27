# AGENTS.md — guide for AI coding agents

Personal bilingual blog of Eason Chang, deployed on Vercel at https://easonchang.com.

## Commands

- `pnpm install` — install deps (pnpm only; `preinstall` blocks npm/yarn)
- `pnpm dev` — dev server at http://localhost:3000
- `pnpm build` — production build (statically generates all pages, sitemap, robots, and RSS/Atom/JSON feed routes)
- `pnpm lint` / `pnpm lint:fix` — lint
- `pnpm new-post` — scaffold a new MDX post

## Architecture

- **Next.js App Router** (`src/app/[locale]/…`) with React Server Components; content in `content/` as MDX, loaded via **Content Collections** (`content-collections.ts`).
- **i18n via next-intl**: routing in `src/i18n/routing.ts`, locale middleware in `src/proxy.ts`, UI strings in `messages/{en,zh-TW}.json`. Server components use `getTranslations`, client components `useTranslations`. Internal links must use `@/i18n/navigation`'s `Link` (wrapped by `CustomLink`) so locale prefixes stay correct.
- **SEO**: Metadata API (`generateMetadata` + helpers in `src/lib/seo.ts`), `src/app/sitemap.ts`, `src/app/robots.ts`, feeds as route handlers (`src/app/feed.xml` etc. via `src/lib/feeds.ts`), OG images at `/api/og` (`next/og`, Noto Sans TC).
- **Content model** (see `content-collections.ts`):
  - `Post` (`content/posts/**/*.mdx`): frontmatter `title`, `slug`, `date`, `description`, `socialImage` (required); `isDraft`, `language` (`en` | `zh-TW`, default `zh-TW`), `redirect_from` (list of legacy URLs, served as 301 redirects — never break these).
  - `Page` (`content/pages/**/*.mdx`): `name`, `path`, `redirect_from`.
  - A post exists once per language; the same `slug` may appear in both `en` and `zh-TW` files. Posts pair up across locales by slug.
- **i18n**: locales `en` (default, unprefixed URLs) and `zh-TW` (`/zh-TW/...` prefix). URL structure is load-bearing SEO — preserve `/posts/[slug]`, locale prefixes, and all `redirect_from` 301s.
- **URL contract**: `docs/url-baseline.txt` snapshots the published sitemap — any routing change must keep every URL there resolving (200, intentional redirect, or the two legacy `/404` artifacts which correctly return 404).
- Comments via Giscus, dynamic OG images, dark mode via next-themes, ⌘K command palette.

## Conventions

- TypeScript + Tailwind CSS. Formatting via the repo's configured formatter; pre-commit hook runs lint-staged.
- Never commit generated output: `.next/`, `.contentlayer/`, `public/sitemap*.xml`, `public/robots.txt`, `public/feed.*`, `public/atom.xml`.
- Modernization roadmap lives in `docs/MODERNIZATION_PLAN.md`; keep it updated as phases land.
