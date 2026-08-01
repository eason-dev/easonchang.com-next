# easonchang.com Modernization Plan (2026)

A phased plan to bring the blog from its 2023-era stack (Next.js 14 Pages Router + Contentlayer + Tailwind 3) to a modern, AI-era architecture with a refreshed UI. Each phase is independently shippable; checkboxes are action items to review and approve.

---

## Current state (assessment)

| Area | Today | Problem |
| --- | --- | --- |
| Framework | Next.js 14, **Pages Router**, React 18.3 | Two major versions behind; no Server Components, no streaming, no built-in metadata/OG/sitemap routes |
| Content | Contentlayer 0.3 | **Abandoned project** — incompatible with Next 15+, blocks all framework upgrades |
| i18n | next-i18next 13 (`en`, `zh-TW`) | Pages-Router-only; incompatible with App Router |
| Styling | Tailwind CSS 3.2 + deprecated `@tailwindcss/line-clamp` plugin | Tailwind 4 is CSS-first, faster, supports oklch/container queries natively |
| TypeScript | 4.9, `strict: false`, `target: es5`, **build errors ignored** (`ignoreBuildErrors`, `ignoreDuringBuilds` in next.config) | Type safety is effectively off |
| Lint/format | ESLint 8 (legacy `.eslintrc.js`), Prettier 2 | ESLint 8 is EOL; legacy config format |
| Components | Storybook 6.5 + Chromatic 6, Atomic Design, Hygen scaffolding | Storybook 6 doesn't run on modern toolchains; heavy for a 2-person blog |
| Git hooks | husky 8 installed, but configured via `package.json > husky.hooks` (husky 4 syntax) | **Hooks silently never run** |
| CI / tests | None (no `.github/`, no test runner) | Nothing catches regressions before deploy |
| Misc deps | `@vercel/og` 0.0.27, `kbar` beta, `nprogress`, `plaiceholder` 2, `date-fns` 2, `sharp` 0.32 | All superseded (next/og, cmdk, App Router loading UI, date-fns 4) |
| AI readiness | None | No `llms.txt`, no markdown endpoints, no structured data for answer engines, no AI features |

Assets worth preserving: 116 bilingual MDX posts, URL structure (`/posts/[slug]`, `zh-TW` locale prefix), Giscus comments, RSS feed, dynamic OG images, command palette UX, dark mode.

---

## Target architecture

- **Next.js 16 (App Router) + React 19** — Server Components, Turbopack builds, Cache Components/PPR, View Transitions, `proxy.ts` for redirects
- **Content Collections** (successor to Contentlayer) — type-safe MDX collections with Zod schemas
- **next-intl** for App Router i18n, preserving existing URLs and adding proper `hreflang`
- **Tailwind CSS 4** (CSS-first config, oklch palette) + **shadcn/ui-style primitives** + **Motion** for micro-interactions
- **TypeScript 5.9 strict**, **Biome 2** (single fast lint+format tool), **Vitest + Playwright**, GitHub Actions CI
- **AI-native layer**: `llms.txt`, raw-markdown endpoints per post, JSON-LD, RAG-powered "Ask my blog" chat, embedding-based related posts, optional MCP server

---

## Phase 0 — Safety net (do first, ~half a day)

Goal: make every later phase verifiable. No user-visible changes.

- [ ] Add GitHub Actions CI: `pnpm install → typecheck → lint → build` on every PR
- [ ] Fix pre-commit hooks: replace broken husky-4-style config with husky 9 (or drop husky for `simple-git-hooks`) + current `lint-staged`
- [ ] Capture a visual/URL baseline: export the sitemap URL list and spot-check screenshots (used to verify the App Router migration preserves every route)
- [ ] Add `CLAUDE.md` / `AGENTS.md` documenting build commands, content model, and conventions so AI coding agents work effectively in this repo
- [ ] Enable Dependabot or Renovate to prevent drifting out of date again

## Phase 1 — Core platform upgrade (~2–3 days)

Goal: modern foundation everything else builds on. This is the big one.

- [ ] **Replace Contentlayer with Content Collections** (`@content-collections/core` + `@content-collections/mdx`): port document schemas (posts + pages, en/zh-TW variants) to Zod; keep computed fields (slug, locale, reading time, TOC)
  - Alternative if minimal diff preferred: `contentlayer2` fork or Velite — decision below
- [ ] **Upgrade to Next.js 16 + React 19**, migrate Pages Router → **App Router**:
  - `_app`/`_document` → root `layout.tsx`; per-page `getStaticProps` → async Server Components + `generateStaticParams`
  - SEO tags → Metadata API; `next-sitemap` → native `sitemap.ts` + `robots.ts`; RSS/Atom `feed` generation → route handler (`/feed.xml`)
  - `/api/og` (`@vercel/og` 0.0.27) → `ImageResponse` from built-in `next/og` in `opengraph-image.tsx`
  - `[...pathToRedirectFrom]` legacy-URL redirects → `proxy.ts`/middleware redirects (keep 301s — years of SEO equity)
  - `nprogress` → App Router `loading.tsx` + Suspense streaming
- [ ] **Migrate i18n to next-intl**: keep `en` unprefixed + `/zh-TW` prefix (`localePrefix: 'as-needed'`), add `hreflang` alternates via Metadata API
- [ ] **TypeScript 5.9**: `strict: true`, modern `target`/`moduleResolution: bundler`, then **delete `ignoreBuildErrors` and `ignoreDuringBuilds`** so builds actually gate on errors
- [ ] Upgrade `sharp`, `plaiceholder`→v3 (or replace with a build-time blur util), `date-fns`→v4, `@fontsource/inter`→`next/font`
- [ ] Verify: every URL from the Phase 0 baseline resolves identically (including locale variants and legacy redirects)

## Phase 2 — Toolchain & DX reset (~1 day, parallelizable with Phase 3)

- [ ] Replace ESLint 8 + Prettier 2 + 10 plugins with **Biome 2** (one config, ~100× faster; keep `prettier-plugin-tailwindcss`-equivalent class sorting via Biome's `useSortedClasses`)
  - Conservative alternative: ESLint 9 flat config + Prettier 3 — decision below
- [ ] **Retire Storybook 6 + Chromatic + Hygen + Atomic Design folders** — for a personal blog this is heavy ceremony; flatten to `components/` + `components/ui/` (shadcn convention)
  - Alternative if component workshop still wanted: upgrade to Storybook 10 (ESM-only, much lighter)
- [ ] Add **Vitest** (unit: content pipeline, feed/sitemap generation, i18n helpers) and **Playwright** (smoke: home, post page in both locales, search, dark mode) — wire both into CI
- [ ] Node 24 LTS in `.nvmrc`, pnpm 10, `packageManager` field for corepack

## Phase 3 — UI refresh: trending layout & style (~2–4 days)

Goal: visual redesign on top of the new foundation. 2026 look: content-first typography, depth via glass + gradients, tasteful motion.

- [ ] **Design tokens in Tailwind 4 CSS-first config**: oklch wide-gamut palette, fluid type scale, dark mode as first-class (default to system, keep toggle)
- [ ] **Homepage as a bento grid**: hero card (name + animated gradient/aurora accent), interactive 3D tilt card promoting Aburi Studio (build in public), featured-projects row, latest posts with post-count link
- [ ] **Post list**: spotlight-hover cards (radial highlight following cursor), grouped by year with collapsible series cards, client-side search
- [ ] **Post page**: readable measure (~65ch), sticky scroll-spy TOC, reading-progress bar, `rehype-pretty-code`/Shiki code blocks with copy button (replacing Prism), footnote popovers, next/prev navigation
- [ ] **Micro-interactions with Motion** (`motion`, framer-motion's successor): page fade/slide via **View Transitions API** (Next 16 `viewTransition`), scroll-reveal sections, magnetic nav hover — all `prefers-reduced-motion`-safe
- [ ] **Glassmorphism sticky header** (backdrop-blur, border-hairline) + subtle grain/mesh-gradient page background
- [ ] Rebuild command palette on **cmdk** (shadcn `Command`) replacing beta `kbar`: navigation + theme switch + locale switch + post search in one `⌘K`
- [ ] Accessibility pass: focus-visible states, contrast (oklch makes this auditable), keyboard nav, `hreflang`/lang attributes

## Phase 4 — AI-era features (~2–3 days, incremental)

Goal: make the blog both *consumable by* AI (answer engines, agents) and *enhanced with* AI.

**AI-readable (cheap, high value — do all):**
- [ ] `llms.txt` + `llms-full.txt` route handlers generated from content collections
- [ ] Raw markdown endpoint per post (`/posts/[slug].md`) + `<link rel="alternate" type="text/markdown">` so agents skip HTML parsing
- [ ] JSON-LD structured data (`BlogPosting`, `Person`, `BreadcrumbList`) for answer-engine citation (AEO/GEO)
- [ ] Keep clean semantic HTML from Server Components (already a win from Phase 1)

**AI-powered (choose scope — decision below):**
- [ ] **"Ask my blog" RAG chat**: embed all 116 posts (both locales), store vectors (Upstash Vector or pgvector), stream answers with citations via **Vercel AI SDK** + a small model (e.g. Haiku 4.5); entry points: bento card + command palette
- [ ] **Semantic related posts**: nearest-neighbor by embeddings at build time (replaces tag-based matching; works across locales)
- [ ] Optional: build-time **TL;DR** summary per post (generated once, committed — zero runtime cost)
- [ ] Optional: **MCP server** (`/api/mcp`) exposing `search_posts` / `get_post` tools so Claude/ChatGPT users can connect the blog directly
- [ ] Optional: instant static search with **Pagefind** as the non-AI fallback in the command palette

## Phase 5 — Polish & ops (~1 day)

- [ ] Vercel Speed Insights + Web Vitals budget in CI (Lighthouse CI on key pages)
- [ ] Evaluate **Cache Components / PPR** for instant-static shell + streamed dynamic bits (view counts, chat)
- [ ] `manifest.ts`, favicons regenerated from new brand palette
- [ ] Update README (new stack, new commands), remove dead docs/templates
- [ ] Post the inevitable "How I modernized my blog for the AI era" post 🙂

---

## Suggested sequencing

```
Phase 0 (safety net)
  └─ Phase 1 (platform)  ──┬─ Phase 3 (UI refresh)
       Phase 2 (toolchain) ─┘      └─ Phase 4 (AI features) ─ Phase 5 (polish)
```

Phases 1 is the long pole; 2 can run alongside it. 3–5 are incremental and each independently deployable.

## Decisions needed before starting

1. **Content layer**: Content Collections (recommended, actively maintained, best Next 16 support) vs `contentlayer2` fork (smallest diff) vs Velite?
2. **Lint/format**: Biome 2 (recommended, one fast tool) vs ESLint 9 + Prettier 3 (keeps existing ecosystem)?
3. **Storybook**: retire (recommended for a personal blog) or upgrade to v10?
4. **AI chat scope**: full RAG chat (needs a vector store + API key + small runtime cost) vs build-time-only AI (related posts + TL;DR, zero runtime cost) vs skip for now?
5. **Redesign depth**: restyle existing layout with new tokens (faster) vs full bento-grid homepage rework (recommended, described in Phase 3)?
