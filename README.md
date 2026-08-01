# easonchang.com

![Blog homepage](./docs/readme-cover.jpg)

Eason Chang's personal blog — bilingual (English / 繁體中文), statically generated.

Visit: [https://easonchang.com/](https://easonchang.com/)

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **React 19** + **TypeScript** (strict)
- **Content Collections** — type-safe MDX content with zod schemas
- **next-intl** — `en` (unprefixed) + `zh-TW` locales with hreflang alternates
- **Tailwind CSS**
- SEO from code: Metadata API, native `sitemap.ts` / `robots.ts`, RSS/Atom/JSON feed route handlers, OG images at `/api/og` (with Traditional Chinese font)
- Giscus comments, dark mode (next-themes), ⌘K command palette
- `pnpm` as package manager, husky + lint-staged pre-commit hook

> The toolchain (linting, tests, Storybook) and visual design are being modernized in the follow-up PRs of this stack — see `docs/MODERNIZATION_PLAN.md`.

## Commands

```bash
pnpm install        # pnpm only (preinstall blocks npm/yarn)
pnpm dev            # dev server at http://localhost:3000
pnpm build          # production build (all pages statically generated)
pnpm lint           # lint
```

## Writing

Posts live in `content/posts/*.mdx` with frontmatter (`title`, `slug`, `date`, `description`, `socialImage`, `language`, optional `redirect_from`). A post can exist in one or both languages; versions pair up by `slug`.

See [AGENTS.md](./AGENTS.md) for the full content model and architecture notes.
