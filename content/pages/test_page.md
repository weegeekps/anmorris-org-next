---
title: "Zola Markdown Test Page"
date: 2026-06-20
description: "A comprehensive test of all Zola-supported Markdown features"
tags: [markdown, test, zola]
draft: false
weight: 10
extra:
  author: "Site Author"
---

# Zola Markdown Feature Test Page

This page tests all Markdown features supported by Zola (via the **pulldown-cmark**/CommonMark parser and **syntect**/Highlight.js for code blocks). Use it to verify rendering after moving to `content/`.

---

## Headings

```
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Text Formatting

**Bold text** and ***bold italic*** and ~~strikethrough~~.

*Italic text* and __underline is not standard Markdown but ___triple underscore___ tests edge cases__.*

- [x] task list completed
- [ ] task list pending

Superscript: X[^1] and subscripts: H~2~O.

[^1]: Footnote definition.

Here is `inline code` within a sentence with a [hyperlink](https://en.wikipedia.org/wiki/Markdown) and an [anchor link](#Headings).

Auto-link: <https://www.example.com> (angle-bracket URLs).

---

## Code Blocks

### Fenced Code Block (with syntax highlighting)

```python
def hello(name: str) -> str:
    """Greet someone."""
    print(f"Hello, {name}!")
    return f"Hi, {name}"

if __name__ == "__main__":
    hello("World")
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>
<body>
    <h1 id="top">Hello</h1>
</body>
</html>
```

```css
body {
    font-family: sans-serif;
    background: #fafafa;
}
h1 {
    color: #333;
}
```

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("top")!;
    el.textContent = "Loaded!";
    console.log(el);
});
```

```bash
#!/bin/bash
echo "Hello from Bash!"
ls -la /tmp
```

### Indented Code Block (4-space indent, no language hint)

    This is a plain indented code block.
    It does not receive language-specific syntax highlighting
    unless your theme adds its own rules.

---

## Block Elements: Quotes, Lists, Tables

### Blockquote

> This is a blockquote.
>
> > Nested blockquote levels are supported.

**Blockquote with code:**

> ```rust
> fn main() {
>     println!("Hello from inside a blockquote!");
> }
> ```

### Unordered List

- Item A
- Item B
  - Sub-item B1
  - Sub-item B2
    - Deeply nested
- Item C
  1. Ordered sub-item 1
  2. Ordered sub-item 2
- Item D

### Ordered List

1. First
2. Second
   1. Nested A
   2. Nested B
3. Third

### Table

| Feature | Supported | Notes |
| --- | :--: | --- |
| Headings | ✅ | H1–H6 |
| Bold / Italic | ✅ | |
| Strikethrough | ✅ | via `~~text~~` |
| Task Lists | ✅ | via `- [x]` |
| Footnotes | ⚠️ | CommonMark footnote syntax |
| Fenced Code | ✅ | With language hints |
| Blockquotes | ✅ | Nested |
| Tables | ✅ | GFM-style |
| Auto-links | ✅ | `<https://...>` |
| HTML inline | ✅ | Raw HTML passes through |
| HTML blocks | ✅ | Raw HTML blocks pass through |

---

## Advanced / Edge-case Markdown

### Horizontal Rules

```
---

***

___
```

---

***

___

### HTML Passthrough (raw HTML allowed in Zola)

<details>
<summary>Click to expand this HTML details element</summary>

This content is inside a native HTML `<details>/<summary>` tag. Zola does not strip it.

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

<mark>Marked text</mark> using the HTML `<mark>` tag.

<div style="border: 2px dashed #007acc; padding: 12px; border-radius: 6px; margin: 12px 0; background: #f0f7ff;">
    This is a styled div — inline HTML with attributes renders unmodified in Zola.
</div>

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
<figcaption style="text-align:center; font-style:italic; font-size:0.85em;">Embedded YouTube video</figcaption>

### Definition List (GFM / Extended syntax)

Term 1
: Definition 1
: Another definition for Term 1

Term 2
: Definition 2

## Image & Media Embeds

### Regular Image

```md
![Cat sitting on a keyboard](https://placedog.net/600/400 "Cat on keyboard")
```

![Cat sitting on a keyboard](https://placedog.net/600/400 "Cat on keyboard")

### Image with Caption (using figure/figcaption)

```html
<figure>
    <img src="https://placedog.net/600/400" alt="Another dog photo">
    <figcaption>Fig.1 — A different dog via HTML figure tag.</figcaption>
</figure>
```

<figure>
    <img src="https://placedog.net/600/400" alt="Another dog photo">
    <figcaption>Fig.1 — A different dog via HTML figure tag.</figcaption>
</figure>

---

## Link Reference Definitions

Reference-style link to [Wikipedia][wikipedia].
Another reference: [Colon][colon].

[wikipedia]: https://en.wikipedia.org "Wikipedia"
[colon]: https://en.wikipedia.org/wiki/Colon

---

## CommonMark Footnotes

Here is a footnote reference[^1] and another[^note2].

[^note2]: This is the second footnote definition.
It can span **multiple lines** with full Markdown formatting.

---

## Inline Math (via KaTeX — theme-dependent)

Inline formula: `$E = mc^2$` and `$\sum_{i=1}^{n} x_i$`.

Display (block) math:

$$
\int_{0}^{\infty} e^{-x^2} \, dx = \frac{\sqrt{\pi}}{2}
$$

> **Note:** Math rendering depends on your Zola theme including KaTeX CSS + JS.

---

## Callout / Admonition Blocks (via themes)

Some themes support custom callout blocks inspired by Docusaurus:

> [!NOTE]
> Useful information that users should know.

> [!TIP]
> Helpful advice.

> [!IMPORTANT]
> Key information users need to know.

> [!WARNING]
> Warning about potential pitfalls.

> [!CAUTION]
> Dangerous or risky behavior.

---

## Abbreviations

The HTML `<abbr>` tag can contain an abbreviation:

<abbr title="HyperText Markup Language">HTML</abbr> is the standard markup language.

---

## Zola Front-matter Variables

Your front matter (YAML) was parsed by Zola. Available in templates:

| Variable | Value | Source |
| --- | --- | --- |
| `title` | Zola Markdown Test Page | Front matter |
| `date` | 2024-01-15 | Front matter |
| `draft` | false | Front matter |
| `weight` | 10 | Front matter |
| `tags` | [markdown, test, zola] | Front matter |
| `extra.author` | Site Author | Front matter `extra` |
| `content` | This entire rendered document | Zola variable |
| `path` | test_page (derived) | Zola variable |

You can access `{{ page.extra.author }}`, `{{ page.date }}`, etc. in templates.

---

## Longform Paragraph Test

This long paragraph tests word-wrap, justification (if your theme applies it), and how flowing text interacts with the other elements on the page. It should contain enough content to demonstrate paragraph spacing and line-breaking behavior in your Zola theme.

Zola uses the [pulldown-cmark](https://github.com/pulldown-cmark/pulldown-cmark) crate as its underlying Markdown parser, which implements CommonMark 0.29+ and a subset of GFM (GitHub Flavored Markdown). This means you get:

- Proper heading ID generation for anchor links
- Automatic escaping of HTML entities in code contexts
- Consistent parsing across builds
- Table and strikethrough support via GFM extensions

The site's search index (enabled by `build_search_index = true` in `zola.toml`) will also index this content. Make sure your keywords and descriptions are well-written!

---

## Checkboxes Completion

- [x] Create the test page ✅
- [x] Test all heading levels ✅
- [x] Test code blocks with multiple languages ✅
- [x] Test tables ✅
- [x] Test footnotes ✅
- [x] Test HTML passthrough ✅
- [ ] Test images (requires moving to content/ to verify paths)
- [ ] Test links (requires full site build)
- [ ] Test callout blocks (theme-dependent)

---

*Last updated on 2026-06-20. This is a **Zola Markdown Test Page**.*
