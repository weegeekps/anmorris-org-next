<!--
SPDX-FileCopyrightText: 2026 Adam N. Morris
SPDX-FileContributor: Adam N. Morris

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# anmorris-org-next

This repo contains the Zola site-generator and content for [anmorris.org](https://anmorris.org).

> [!IMPORTANT]
> Before using any content in this repository, please read the [License](#license) section at the end of this document.

## Project Structure

| Path                    | Purpose                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `content/`              | Site pages and blog posts. Never AI-generated.                                                  |
| `themes/anmorris-2026/` | Active custom Zola theme. Contains all Tera templates. Update `theme` in `zola.toml` to switch. |
| `src/`                  | TypeScript and CSS entry points, compiled by Vite.                                              |
| `static/`               | Fonts, images, and other static assets.                                                         |
| `public/`               | Auto-generated build output. Never edit by hand.                                                |

> [!IMPORTANT]
> Files in `content/` are never AI-generated or AI-edited. All site and blog content is written by hand.

## Dependencies

### Runtime

- [Zola](https://www.getzola.org) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS framework

### Dev Only

- [Vite](https://vite.dev) — frontend build tool
- [TypeScript](https://www.typescriptlang.org) — typed JavaScript
- [djLint](https://www.djlint.com/) — Tera template formatter, installed through pnpm
- [Biome](https://biomejs.dev/) — JavaScript, TypeScript, JSON, and GraphQL formatter
- [ESLint](https://eslint.org) — linter

## Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/)
- [pnpm](https://pnpm.io/installation)
- Node.js 24+

## Development Instructions

### Formatting

Run `pnpm format:djlint` for Tera templates, `pnpm format:biome` for JavaScript, TypeScript, JSON, and GraphQL, or `pnpm format` for both. Run `pnpm check:format` to check without writing changes. ESLint still handles linting via `pnpm check:lint`.

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
> Run `vite:build` before `zola:build`. Vite outputs the bundle and a manifest into `static/bundle/`, which `zola build` reads at render time.

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

# License

Content in this repository is covered under several different licenses. This repository uses [REUSE](https://reuse.software/) to help manage this and add clarity. All source code and text content within this repository has a copyright string and a SPDX license annotation at the top of the file. Copyrights and license indications for other media, such as images, 3D models, fonts, and other non-text content is located within the [REUSE.toml](./REUSE.toml) file.

Below are a few _guidelines_ about how various content is typically licensed. You are still responsible for checking the included copyright and license information.

- All code for the site itself is covered under the [GPL 3.0](./LICENSES/GPL-3.0-only.txt) license.
- Articles, original images, and other media located in the `./content` directory tree is licensed under [CC BY-SA 4.0](./LICENSES/CC-BY-SA-4.0.txt).
- Code samples used in blog articles located in the `./content` directory are typically licensed under the [MIT](./LICENSES/MIT.txt) license.
- The logo, favicon, and related assets are licensed under [CC BY-ND 4.0](./LICENSES/CC-BY-ND-4.0.txt).
