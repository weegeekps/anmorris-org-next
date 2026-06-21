---
name: zola
description: Build, structure, and edit Zola static sites. Use when working with Zola SSG projects — creating or editing content (Markdown + TOML front matter), Tera templates, sections/pages, shortcodes, internal links, zola.toml configuration, or running the Zola CLI (init, build, serve, check).
metadata:
  source: Official Zola documentation (https://www.getzola.org/documentation/), based on Zola 0.19.x+
---

# Zola

Zola is a Rust static site generator that uses the **Tera** template engine (Jinja2-like) and **CommonMark** Markdown. Content is plain Markdown with **TOML front matter**; configuration lives in `zola.toml`.

> Verify version-specific behavior against the official docs at https://www.getzola.org/documentation/ when in doubt. Always favor first-party documentation.

## CLI

Zola has only four commands. Run `zola --help` or `zola <cmd> --help` for details.

```bash
zola init <dir>        # Scaffold a new site (prompts for config). Omit dir to use cwd.
zola build             # Build whole site into public/ (dir is deleted/recreated)
zola serve             # Build + local dev server with live reload at 127.0.0.1:1111
zola check             # Build in-memory (no output) and validate internal + external links
```

Common flags:
- `zola build --base-url $URL` — override `base_url` (useful for deploy previews).
- `zola build --output-dir <dir>` / `--force` — change output dir; force overwrite.
- `zola --config config.staging.toml build` — alternate config (position matters: before the subcommand).
- `zola --root /path/to/project build` — build out-of-tree.
- `--drafts` — include draft pages/sections (excluded by default). Works on `build`, `serve`, `check`.
- `zola serve --port 2000 --interface 0.0.0.0 --base-url / --open` — expose on LAN / auto-open.
- `zola check --skip-external-links` — skip external link checks.

Logging: `RUST_LOG=zola=info,site=debug` for timing; `RUST_LOG=off` to silence.

## Directory structure

```
.
├── zola.toml      # Required config (TOML). Falls back to config.toml if zola.toml absent.
├── content/       # Markdown content. Each subdirectory with _index.md = a section.
├── sass/          # Sass files compiled to public/ (only if compile_sass = true).
├── static/        # Copied as-is to output. Use hard_link_static for large files.
├── templates/     # Tera templates.
├── themes/        # Optional themes.
└── public/        # Auto-generated output. NEVER edit by hand.
```

## Content: sections vs pages

**Section** = a directory containing `_index.md`. Defines metadata + listing behavior for its pages. The site root is always a section (add `content/_index.md` to give the homepage content/metadata).

**Page** = any `.md` file except `_index.md`. (File names must not contain `_index.` at all.)
- `content/about.md` → `[base_url]/about`
- `content/about/index.md` → `[base_url]/about` (enables asset co-location)
- Filenames starting with a date (`YYYY-MM-DD` or RFC3339) set the page date: `2019-11-27-hello.md` → `/hello` with date `2019-11-27`.

Non-Markdown files in a content directory become the section/page `assets` collection, referenceable via relative links.

### Front matter

Every content file needs `+++` delimiters (TOML), even if empty. (YAML with `---` is also supported for legacy porting, but TOML is encouraged.) No individual variable is mandatory.

Section `_index.md` (key variables, defaults shown):
```toml
+++
title = ""
sort_by = "none"        # date | update_date | title | title_bytes | weight | slug | permalink | none
template = "section.html"
page_template = ""       # applied to pages under this section (closest wins)
paginate_by = 0          # >0 enables pagination
weight = 0               # used to order subsections (assign distinct weights!)
render = true            # false = don't render the section page itself
transparent = false      # pass pages up to parent section
redirect_to = ""         # redirect visitors landing on this section
in_search_index = true
draft = false
aliases = []             # old paths to redirect from
generate_feeds = false
[extra]
+++
```

Page `.md` (key variables):
```toml
+++
title = ""
description = ""
date =                   # YYYY-MM-DD or RFC3339; no quotes. Required if section sort_by = "date".
updated =
weight = 0               # required if section sort_by = "weight"
slug = ""                # override URL slug (section path retained)
path = ""                # override full path (ignores section path; no leading /)
template = "page.html"
draft = false
aliases = []
authors = []
in_search_index = true
[taxonomies]             # keys must match taxonomies defined in zola.toml, e.g. tags = ["rust"]
[extra]
+++
```

**Summary:** insert `<!-- more -->` in body to split `page.summary` from full content.

## Tera templates

Templates live in `templates/`. Core patterns:

```jinja2
{% extends "base.html" %}
{% block content %} ... {% endblock content %}

{{ section.title }}            {# variable interpolation #}
{{ page.content | safe }}      {# | safe prevents HTML-escaping (use for content/permalinks) #}

{% for page in section.pages %}
  <a href="{{ page.permalink | safe }}">{{ page.title }}</a>
{% endfor %}

{{ get_url(path='@/blog/_index.md') }}   {# resolve internal URL in templates #}
```

If a section is paginated (`paginate_by > 0`), `section.pages` is empty — iterate the `paginator` object instead.

Sorting: pages missing the field required by their section's `sort_by` are skipped (and warned). Sorted pages expose `page.lower` / `page.higher` (and `page.earlier`/`page.later` for date). Use the Tera `reverse` filter to flip order (or `paginate_reversed = true` for paginated sections).

## Internal links & anchors

In **Markdown**, link to other content with `@/` paths starting from `content/`:
```markdown
[About](@/pages/about.md)
[Heading](@/pages/about.md#section-id)
```
Broken internal links are errors by default; set `internal_level = "warn"` under `[link_checker]` in `zola.toml` to downgrade.

Headings auto-get slug ids. Override manually: `# Title {#custom-id .class}`. Auto anchor links are controlled by `insert_anchor_links` ("left"/"right"/"heading"/"none"), globally in `[markdown]` or per-section front matter; override the template with `templates/anchor-link.html`.

## Shortcodes

Templates in `templates/shortcodes/` callable from Markdown. `.html` shortcodes inject HTML; `.md` shortcodes flow into the page body (and into the TOC). Name/args must match `^[A-Za-z_][0-9A-Za-z_]+$`.

Without body (Tera-function style, parentheses required even with no args):
```markdown
{{ youtube(id="dQw4w9WgXcQ", autoplay=true) }}
```
With body (`body` variable holds the inner content, must start on a new line):
```markdown
{% quote(author="Vincent") %}
A quote
{% end %}
```
Notes: all args are required and named; shortcodes can't reference Tera variables or use operators. Shortcodes render *before* Markdown parse, so `get_page`/`get_section`/`get_taxonomy` and the page TOC are unavailable. Context vars: `nth`, `lang`, `page`/`section`, `config`, `page.colocated_path`. Escape literals with `{{/* */}}` and `{%/* */%}`.

## Configuration (zola.toml)

Only `base_url` is mandatory; everything else is optional and off by default. Watch which TOML section a key belongs to (a `[section]` header runs until the next header/EOF). Sections: main (unnamed), `[markdown]`, `[link_checker]`, `[slugify]`, `[search]`, `[translations]`, `[languages]`, `[extra]`.

Frequently used keys:
```toml
base_url = "https://mywebsite.com"   # required
title = ""
description = ""
default_language = "en"
theme = ""
compile_sass = false
minify_html = false
generate_feeds = false
feed_filenames = ["atom.xml"]         # or ["rss.xml"]
build_search_index = false
taxonomies = []                        # e.g. [{name="tags", feed=true}]

[markdown]
highlight_code = true                  # see also [markdown.highlighting]
smart_punctuation = false
render_emoji = false
external_links_target_blank = false

[extra]                                # custom data → {{ config.extra.* }} in templates
```

**Slugify** strategies (`[slugify]` → `paths`/`taxonomies`/`anchors`): `"on"` (full ASCII slug, default), `"safe"` (only strip OS-illegal chars, keeps UTF-8), `"off"` (no change). Use `safe`/`off` for non-ASCII URLs.

## Workflow tips
- Iterate with `zola serve` (live reload); restart it if a change isn't picked up (some changes can't hot-reload).
- Run `zola check` before deploying to catch broken links.
- Treat `public/` as build output only — never hand-edit it.
