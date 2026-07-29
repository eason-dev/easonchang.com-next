See @AGENTS.md for repo architecture, commands, and conventions.

## Claude-specific guidance

### Skills

Prefer these skills over improvising:

- **write-post** (`.claude/skills/write-post/`) — writing any blog post. It encodes Eason's voice, the zh-TW/en language conventions, post structures, and frontmatter mechanics. Always load it before drafting post content.
- **translate-post** (`.claude/skills/translate-post/`) — creating the paired-language version of an existing post.

### Hard rules

- **URLs are load-bearing.** Every URL in `docs/url-baseline.txt` must keep resolving. Routing changes need re-verification against that file. Never change a published post's `slug`; never remove a `redirect_from`.
- **Bilingual integrity.** Posts pair by `slug` across `en`/`zh-TW`. UI strings live in `messages/{en,zh-TW}.json` — when adding a key, add it to BOTH files in the same change.
- **Internal links** in components must go through `@/i18n/navigation`'s `Link` (usually via `CustomLink`), never `next/link` directly, or locale prefixes break.
- Never commit generated output (`.next/`, `.content-collections/`, `public/sitemap*.xml`, `public/feed.*`, `storybook-static/`).

### Definition of done

Run before declaring any change complete:

```bash
pnpm lint        # Biome — must be clean
pnpm test        # Vitest unit tests
pnpm build       # compiles all MDX, gates on TypeScript strict
pnpm test:e2e    # Playwright smoke tests (needs the build; in sandboxes set
                 # PLAYWRIGHT_CHROMIUM_EXECUTABLE=/opt/pw-browsers/chromium)
```

New AI-facing surface areas to keep in sync with content-model changes: `/llms.txt`, `/llms-full.txt`, `/posts/<slug>.md` (see `src/proxy.ts` and `src/app/llms*`).
