# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OneTabTools is a static, client-side web app suite of browser-based utility tools. No build step, no package manager, no framework. All tool processing happens locally in the browser.

## Architecture

```
browsertools/
├── index.html          # Landing page with tool cards
├── style.css           # Shared stylesheet for all pages
├── text/index.html     # Text tools (JSON/YAML/TOML, Base64, URL encode, timestamps, CSV, etc.)
├── pdf/index.html      # PDF merge and split tools
├── qr/index.html       # QR code generator
└── src/favicon.svg
```

All dependencies are loaded via CDN (no npm/package.json). Current dependencies:
- `js-yaml@4.1.0`, `marked@9.1.6`, `smol-toml@1.3.4` — text/index.html
- `pdf-lib@1.17.1`, `jszip@3.10.1` — pdf/index.html
- `qrcodejs@1.0.0` — qr/index.html

## Code Patterns

**Tool pages** follow a consistent pattern:
- A `<select id="tool-select">` dropdown shows/hides `<section class="tool-section">` blocks
- Each section has an input textarea/area, a trigger button, and a readonly output area
- Errors are shown via `showErr(id, msg)` / hidden via `hideErr(id)`
- Copy buttons temporarily show "Copied!" then revert

**Adding a new tool** to `text/index.html`:
1. Add an `<option>` to `#tool-select`
2. Add a `<section id="your-tool" class="tool-section">` with the UI
3. Wire up event listeners at the bottom of the `<script>` block
4. Follow the dual-panel layout (input left, output right) used by existing tools

**State management**: Minimal — most state lives in the DOM. PDF tools use small IIFE-scoped arrays for file lists. No shared state between tools.

## Style Guidelines

- Clean, minimal aesthetic. No flashy animations or gradients unless requested.
- Mobile-responsive. Test any layout change mentally for narrow viewports (`@media (max-width: 720px)`).
- Consistent link styling across all sections.
- Semantic HTML (`<section>`, `<table>`, `<header>`, `<footer>`).
- Dark theme; CSS custom properties are defined in `:root` in `style.css` — use them, don't hardcode colors.

## Verification

- After any edit, confirm the markup is valid and the tool works end-to-end in the browser.
- Check that all external links are correct (don't fabricate URLs).

## Things Claude Gets Wrong Here

- Tends to over-engineer this into a React/Next.js app. Don't. It's intentionally kept as a client-side static site.
- Sometimes rewrites the entire file when only one section needs a change. Use targeted edits.
- May invent placeholder links or fake URLs. Never guess a URL — ask if unsure.
- The `style.css` file is large (~1200 lines); read only the relevant section before editing it.
