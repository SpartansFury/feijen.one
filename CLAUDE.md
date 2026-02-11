# feijen.one — Personal Brand Website

## Project Overview

A minimalist, dark-elegant personal brand website for a cybersecurity & IT strategy
consultant. Hosted on GitHub Pages as a static site.

## Tech Stack

- Pure HTML5, CSS3, vanilla JavaScript
- No frameworks, no build tools, no package managers
- Google Fonts for typography (Inter or similar clean sans-serif)
- No external JS dependencies

## Design Direction

- Dark elegant theme: deep charcoal backgrounds (#0d0d1a to #1a1a2e range)
- One muted accent color (brushed gold #c9a84c or similar)
- Luxurious but understated — think Aston Martin product page, not startup landing page
- Premium typography with generous whitespace
- Subtle animations (fade-in on scroll, smooth transitions) — never flashy
- Fully responsive (mobile-first approach)
- Smooth page transitions or navigation effects

## Site Structure

Multi-page static site with shared navigation:

- `index.html` — Home/hero page (atmospheric, high visual impact, minimal text)
- `about.html` — Professional bio and expertise domains
- `contact.html` — Email link and LinkedIn button
- `cv.html` — NOT linked in navigation (unlisted download page)

## File Structure

```
/
├── index.html
├── about.html
├── contact.html
├── cv.html
├── css/
│   └── styles.css          (shared stylesheet)
├── js/
│   └── main.js             (shared interactions)
├── assets/
│   ├── images/             (any images)
│   └── docs/               (CV PDF goes here)
├── CNAME                   (contains: feijen.one)
└── CLAUDE.md
```

## Code Conventions

- Semantic HTML5 elements (`nav`, `main`, `section`, `footer`)
- CSS custom properties (variables) for colors, fonts, spacing
- Mobile-first responsive design with media queries
- BEM-like class naming (`block__element--modifier`)
- No inline styles
- Comments for section separation in CSS

## Important Rules

- NEVER add cookie banners, analytics scripts, or tracking
- NEVER add social media icons beyond LinkedIn
- NEVER use stock photos or placeholder images from external URLs
- Keep the navigation consistent across all pages
- The `cv.html` page must NOT appear in navigation
- All internal links must work as relative paths (GitHub Pages compatible)
- CNAME file must contain exactly: `feijen.one`

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

## Git Conventions

Feature branches follow the pattern `codex/<description>` and are merged to `master` via pull requests. Commit messages are short imperative phrases describing the change.
