<!--
SPDX-FileCopyrightText: 2026 Adam N. Morris
SPDX-FileContributor: Adam N. Morris

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Build Process

Two independent toolchains produce one site.

## Toolchains

- **Vite** compiles the frontend bundle.
- **Zola** renders templates and content into static HTML.

They do not know about each other. A Vite manifest is the bridge.

## Frontend (Vite)

Entry: `themes/anmorris-2026/src/main.ts` (imports `style.css`).

Vite emits to `static/bundle/`:

- `main.js` — ES module, no hashing (`fileName: "main"`).
- `main.css` — extracted Tailwind output.
- `.vite/manifest.json` — chunk-to-file map.

Tailwind runs via `@tailwindcss/vite`. `publicDir: false`, `appType: "custom"`, `emptyOutDir: false` — Vite never touches unrelated `static/` contents.

```bash
pnpm run vite:build   # tsc (typecheck) && vite build
```

## Site (Zola)

`zola build` renders `content/` through `themes/anmorris-2026/templates/` into `public/`.

`base.html` loads the Vite manifest at render time:

```jinja
{% set manifest = load_data(path='bundle/.vite/manifest.json') %}
{% set main_entry = manifest["themes/anmorris-2026/src/main.ts"] %}
{% set style_entry = manifest["style.css"] %}
```

Asset URLs resolve via `get_url(path='bundle/' ~ entry.file)`. Zola copies `static/` verbatim into `public/`.

```bash
pnpm run zola:build
```

## Ordering

Run Vite first. Zola needs the manifest and bundle present in `static/` at render time. `zola build` wipes `public/`, not `static/`, so a stale bundle persists if Vite is skipped.

## Full Production Build

```bash
pnpm build    # runs vite:build && zola:build in parallel via regex script filter
```

Note: the `build` script fans out to all `*:build` scripts concurrently. Ordering is not guaranteed. For deterministic output, run them sequentially:

```bash
pnpm run vite:build && pnpm run zola:build
```

## Dev

```bash
pnpm dev      # zola serve :8080 + vite dev :8081, concurrent
```

View at `http://localhost:8080`. Vite serves assets to Zola on `:8081`.
