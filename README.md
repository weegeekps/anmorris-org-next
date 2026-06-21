# anmorris-org-next

This repo contains the Zola site-generator and content for [anmorris.org](https://anmorris.org).

## Project Structure

| Path | Purpose |
|---|---|
| `content/` | Site pages and blog posts. Never AI-generated. |
| `themes/anmorris-2026/` | Active custom Zola theme. Contains all Tera templates. Update `theme` in `zola.toml` to switch. |
| `src/` | TypeScript and CSS entry points, compiled by Vite. |
| `static/` | Fonts, images, and other static assets. |
| `public/` | Auto-generated build output. Never edit by hand. |

> [!IMPORTANT]
> Files in `content/` are never AI-generated or AI-edited. All site and blog content is written by hand.

## Dependencies

### Runtime

- [Zola](https://www.getzola.org) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS framework

### Dev Only

- [Vite](https://vite.dev) — frontend build tool
- [TypeScript](https://www.typescriptlang.org) — typed JavaScript
- [Prettier](https://prettier.io) — code formatter
- [ESLint](https://eslint.org) — linter

## Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/)
- [pnpm](https://pnpm.io/installation)
- Node.js 24+

## Development Instructions

### Dev Server

Runs both Zola (port 8080) and Vite (port 8081) concurrently:

```bash
pnpm start
```

> [!NOTE]
> **View the site at `http://localhost:8080`.** Vite (port 8081) is used only to compile and serve assets to Zola.

### Building

Build the frontend assets (TypeScript + Tailwind):

```bash
pnpm run vite:build
```

Build the static site:

```bash
pnpm run zola:build
```

Run both for a full production build.

> [!WARNING]
> Run `vite:build` before `zola:build`. Vite outputs a manifest into `public/`, which `zola build` will wipe if run first.

## Coding Agents

To handle scaffolding and some site management and coding, [pi.dev](https://pi.dev) is typically used.

Skills are stored in `.pi/skills/` — some are authored locally (e.g. `zola`) and others are pulled from the community via `npx skills add <skill>` (e.g. `pnpm`, `vite`, `xstate-v5`).

To install community skills locally to this project without checking them into Git (which are ignored via `.gitignore` rules):

```bash
# Add vitest, pnpm, vite, and xstate-v5 skills to the project
npx skills add antfu/skills --skill vitest --skill pnpm --skill vite -a pi
npx skills add statelyai/skills --skill xstate-v5 -a pi
```

## Deployment

<!-- TODO: Fill in the Deployment Section -->

Once automated, high-level details of the deployment process will be shared here.
