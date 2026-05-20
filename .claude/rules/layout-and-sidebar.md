---
description: Shared layout system, sidebar menu configuration, and responsive behavior — apply when editing global.js or page HTML structure
globs: ["*.js", "*.html"]
alwaysApply: false
---

# Shared Layout & Sidebar

## Global Files

Every page must load these two files to get the standard layout:

```html
<link rel="stylesheet" href="/global.css">
<script src="/global.js"></script>
```

(Adjust path depth for pages inside subdirectories.)

## Sidebar Menu Variants

`global.js` defines two menu configurations:

| Variable | Sections | When used |
|----------|---------|-----------|
| `SIDEBAR_MENU` | OVERVIEW, GIFT CARD CENTER, REPORT, APPS, ACCOUNT | Default merchant portal |
| `SIDEBAR_MENU_CARDS` | Personal card management sections | Pages that set `window.SIDEBAR_USE_CARDS_MENU = true` |

To activate the cards menu, set the flag **before** loading `global.js`:

```html
<script>window.SIDEBAR_USE_CARDS_MENU = true;</script>
<script src="/global.js"></script>
```

## Sidebar Specs

- Width: **280px** (collapsed on mobile)
- Behavior: collapsible, mobile-responsive (handled entirely by `global.js`)
- Do not re-implement sidebar logic inside page-level JS — extend `global.js` instead.

## Tech Stack Constraints

- Vanilla HTML5/CSS3/JavaScript (ES6+) — **no frameworks**
- Icons via **Iconify** (CDN): `<iconify-icon icon="..."></iconify-icon>`
- Font: **Poppins** via Google Fonts
