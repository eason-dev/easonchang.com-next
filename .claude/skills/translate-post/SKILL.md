---
name: translate-post
description: Translate an existing easonchang.com blog post between Traditional Chinese and English, creating the paired-language MDX file. Use when asked to translate a post, add an English/Chinese version of a post, or fill in a missing language version.
---

# Translating a post to its paired language

Posts pair across languages by sharing a `slug`. This skill creates the missing half of a pair.

## Process

1. Read the source MDX in `content/posts/` fully — frontmatter and body.
2. Create the target file next to it:
   - zh-TW file `YYYY-MM-DD-<slug>.mdx` ↔ en file `YYYY-MM-DD-<slug>-en.mdx`
3. Copy the frontmatter, then:
   - Translate `title` and `description` naturally (see below)
   - Set `language` to the target locale
   - Keep `slug`, `date`, `socialImage`, `tags`, `category` identical
   - Do NOT copy `redirect_from` unless those legacy URLs genuinely apply to the target locale
4. Translate the body **section by section, preserving structure exactly**: same headings hierarchy, same lists, same images, same links, same code blocks (code and code-fence titles stay untouched).

## Translation style — read `.claude/skills/write-post/SKILL.md` first

This is a rewrite in Eason's voice, not a literal translation:

- Reorder sentences where the target language flows better; keep meaning identical
- zh-TW: 「」quotes, full-width punctuation, spaces between CJK and Latin, keep tech terms in English, reader is 你
- en: simple friendly sentences; drop Chinese-only asides (e.g. 「（Maker）」 gloss) when redundant
- Emoji and tone markers carry over where natural, not mechanically
- Internal links (`/posts/...`) stay as-is — the site localizes them automatically. External links stay identical unless a locale-specific account exists (e.g. X: `easondev` for en, `easondev_tw` for zh)

## Before finishing

1. `pnpm build` must pass
2. Verify the pair: both files share the `slug`, each declares its own `language`, and neither file was renamed
