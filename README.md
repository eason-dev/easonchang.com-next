# easonchang.com-next

![Blog homepage](./docs/readme-cover.jpg)

Eason Chang's brand new personal blog

Visit: [https://easonchang.com/](https://easonchang.com/)

## Features

- Next.js 14
- ContentLayer (loading local MDX files)
- TailwindCSS
- Atomic design project structure
- Storybook
- Absolute import
- Hygen as code generator
- Eslint, Prettier
- Husky, lint-staged pre-commit hook
- `pnpm` as package manager

## Commands

### Start local dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Start Storybook component dev environment

```bash
pnpm storybook
```

This command will open [http://localhost:6006](http://localhost:6006) for you, this is where you can see storybook

### Generate new component scaffold

```bash
pnpm new-component
```

This calls hygen to generate new component with basic file structures, including its JS file and stories.js file

You will be prompted to select component type (atoms, molecules, organisms, templates), and then input component name

### Generate new post

```bash
pnpm new-post
```

## Post frontmatter

Posts live in `content/posts/*.mdx` and are parsed by ContentLayer (see `contentlayer.config.js`).

| Field           | Required | Default | Notes                                              |
| --------------- | -------- | ------- | -------------------------------------------------- |
| `title`         | ✅       | –       |                                                     |
| `slug`          | ✅       | –       | The post is served at `/posts/<slug>`               |
| `date`          | ✅       | –       |                                                     |
| `description`   | ✅       | –       |                                                     |
| `socialImage`   | ✅       | –       |                                                     |
| `language`      | –        | `zh-TW` | One of `en` / `zh-TW`, see below                     |
| `isDraft`       | –        | `false` |                                                     |
| `redirect_from` | –        | –       | List of old paths that should redirect to this post |

### About `language`

This site is bilingual (`en` and `zh-TW`, see `next-i18next.config.js`), and the post lists —
`/posts`, `/posts/page/[page]`, the homepage and the command palette — only show posts whose
`language` matches the current locale. (The RSS feed is not filtered and includes every post.)

Because `language` defaults to `zh-TW`, a post **without** an explicit `language` field will not
appear in the English (default locale) post list at `/posts`, even though its own page at
`/posts/<slug>` is still generated and reachable. If a post renders but is missing from the list,
add the matching language to its frontmatter:

```yaml
---
title: 'My post'
slug: 'my-post'
language: en
---
```

Posts created with `pnpm new-post` already include this field.
