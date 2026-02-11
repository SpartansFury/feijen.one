# CLAUDE.md

## Project Overview

Personal branding website for Sam Feijen — cybersecurity and ERP consultant. Hosted on GitHub Pages at [feijen.one](https://feijen.one).

## Tech Stack

- **HTML5** — semantic markup with accessibility features
- **CSS3** — vanilla CSS with custom properties, gradients, animations, flexbox, grid
- **Vanilla JavaScript** — no frameworks or libraries
- **No build system** — pure static site served directly by GitHub Pages
- **No package manager** — zero dependencies

## Repository Structure

```
/
├── CNAME          # GitHub Pages custom domain (feijen.one)
├── README.md      # Project readme
├── index.html     # Single-page site markup
├── styles.css     # All styling (when present)
└── script.js      # Minimal vanilla JS (when present)
```

There are no subdirectories, build configs, or dependency files. The site is a single HTML page with one CSS file and one JS file.

## Current State

The repository is in a transitional state. The last functional commit with full source code is `bc9fa1b` ("Enhance gold textures and interactions"). Subsequent commits removed `styles.css`, `script.js`, and the HTML content, leaving `index.html` as a placeholder reading "In Progress".

To view the last working version:
```bash
git show bc9fa1b:index.html
git show bc9fa1b:styles.css
git show bc9fa1b:script.js
```

## Development Workflow

### Running Locally

Open `index.html` directly in a browser, or use any static file server:
```bash
python3 -m http.server 8000
```

### Deployment

Push to `master` branch. GitHub Pages auto-deploys from there with the custom domain configured via the `CNAME` file.

### No Build Step

There is no compilation, bundling, minification, or preprocessing. Edit files and push.

### No Tests or Linting

There are no test suites, linters, or formatters configured. Verify changes visually in a browser.

## Code Conventions

### HTML

- Semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Accessibility: `aria-label`, `aria-hidden`, skip-link pattern
- Data attributes for JS hooks: `data-animate-kintsugi`

### CSS

- Extensive use of CSS custom properties (variables) for theming
- Design: dark background (`#04040a`) with metallic gold accents and kintsugi (gold-repair) motif
- Responsive breakpoints at 980px and 640px
- `prefers-reduced-motion: reduce` support throughout
- Component-based class naming (BEM-adjacent): `.hero`, `.hero-inner`, `.hero-text`, `.hero-photo-frame`
- Utility classes: `.btn`, `.btn-primary`, `.pill`, `.card`

### JavaScript

- IIFE pattern to scope code
- IntersectionObserver for scroll-based reveal animations
- Feature detection before using APIs
- `prefers-reduced-motion` checked and respected
- No external dependencies

## Design Language

- Dark theme with metallic gold palette
- Kintsugi aesthetic (Japanese art of repairing with gold) as design metaphor
- Subtle scroll-reactive animations
- High accessibility standards

## Branch Conventions

Feature branches follow the pattern `codex/<description>` and are merged to `main`/`master` via pull requests. Commit messages are short imperative phrases describing the change (e.g., "Enhance gold textures and interactions", "Add scroll-reactive gold crack overlays").
