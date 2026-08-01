# AGENTS.md — guide for AI coding agents

Personal bilingual blog of Eason Chang, deployed on Vercel at https://easonchang.com.

## Commands

- `pnpm install` — install deps (pnpm only; `preinstall` blocks npm/yarn)
- `pnpm dev` — dev server at http://localhost:3000
- `pnpm build` — production build (also generates sitemap and RSS/Atom/JSON feeds)
- `pnpm lint` / `pnpm lint:fix` — lint
- `pnpm new-post` — scaffold a new MDX post

## Architecture

- **Next.js** app in `src/`, content in `content/` as MDX.
- **Content model** (see `contentlayer.config.js`):
  - `Post` (`content/posts/**/*.mdx`): frontmatter `title`, `slug`, `date`, `description`, `socialImage` (required); `isDraft`, `language` (`en` | `zh-TW`, default `zh-TW`), `redirect_from` (list of legacy URLs, served as 301 redirects — never break these).
  - `Page` (`content/pages/**/*.mdx`): `name`, `path`, `redirect_from`.
  - A post exists once per language; the same `slug` may appear in both `en` and `zh-TW` files. Posts pair up across locales by slug.
- **i18n**: locales `en` (default, unprefixed URLs) and `zh-TW` (`/zh-TW/...` prefix). URL structure is load-bearing SEO — preserve `/posts/[slug]`, locale prefixes, and all `redirect_from` 301s.
- **Feeds**: RSS/Atom/JSON written to `public/` during build (`src/lib/utils/generateRSS.ts`). Sitemap URLs snapshot: `docs/url-baseline.txt` — any routing change must keep every URL there resolving (200 or intentional 301).
- Comments via Giscus, dynamic OG images, dark mode via next-themes, ⌘K command palette.

## Conventions

- TypeScript + Tailwind CSS. Formatting via the repo's configured formatter; pre-commit hook runs lint-staged.
- Never commit generated output: `.next/`, `.contentlayer/`, `public/sitemap*.xml`, `public/robots.txt`, `public/feed.*`, `public/atom.xml`.
- Modernization roadmap lives in `docs/MODERNIZATION_PLAN.md`; keep it updated as phases land.
