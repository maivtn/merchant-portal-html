# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **VLINKPAY Merchant Portal** — a static multi-page web application for managing gift cards, crypto payments, ATM networks, charity gifts, and merchant settings. There is no build step; files are served directly as static HTML/CSS/JS.

## Development

No build tools, package manager, or test suite. Open HTML files directly in a browser or serve with any static file server:

```bash
# Serve locally (Python)
python3 -m http.server 8080

# Or with npx
npx serve .
```

No linting, no CI, no automated tests.

## Architecture

### File Organization

- **Root-level HTML files** — ~57 pages covering the main portal (dashboard, gift cards, transactions, crypto, membership, etc.)
- **`atm-qr/`** — ATM QR and location services module (self-contained with its own HTML, JS, CSS)
- **`charity/`** — Charity gift management module (self-contained)
- **`assets/`** — Shared icons and images
- **`AC/`** — Acceptance criteria documents describing intended feature behavior
- **`ai-annual/`** — AI annual report content (large static files)

### Shared Layout System

Every page loads two shared files that drive the global layout:

- **`global.css`** — Design token system (CSS variables), global component styles, responsive breakpoints
- **`global.js`** — Sidebar menu rendering, responsive layout logic, shared UI behaviors

Pages opt into the alternative personal card menu by setting `window.SIDEBAR_USE_CARDS_MENU = true` before loading `global.js`.

### Design Tokens (`global.css`)

Primary color: `--primary-main: #00a76f` (teal/green). Full palette via CSS variables: `--primary-lighter`, `--primary-dark`, `--primary-darker`, plus a grey scale (`--grey-0` through `--grey-900`) and secondary blue (`#3b82f6`) for the "personal" style variant (`.style-personal` class).

### Sidebar Menu (`global.js`)

`global.js` defines two menu configurations:
- `SIDEBAR_MENU` — Main merchant portal menu (sections: OVERVIEW, GIFT CARD CENTER, REPORT, APPS, ACCOUNT)
- `SIDEBAR_MENU_CARDS` — Personal card management menu (activated via `window.SIDEBAR_USE_CARDS_MENU`)

Both render into a collapsible 280px sidebar with mobile-responsive behavior.

### Module Pattern

Feature modules (`atm-qr/`, `charity/`) are self-contained directories with their own HTML, JS, and CSS files alongside module-specific utilities (e.g., `merchant-atm-common.js`, `merchant-atm-common.css`). They still import `global.css` and `global.js` from the root.

### Tech Stack

- Vanilla HTML5/CSS3/JavaScript (ES6+) — no frameworks
- Iconify for icons (loaded from CDN)
- Poppins font from Google Fonts
- CSS Grid and Flexbox for layout
