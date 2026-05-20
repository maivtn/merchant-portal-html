---
description: Directory structure, file organization, and feature module conventions
alwaysApply: true
---

# Architecture

## File Organization

| Path | Purpose |
|------|---------|
| Root-level HTML | ~57 pages — dashboard, gift cards, transactions, crypto, membership, etc. |
| `atm-qr/` | ATM QR and location services module (self-contained) |
| `charity/` | Charity gift management module (self-contained) |
| `assets/` | Shared icons and images |
| `AC/` | Acceptance criteria documents describing intended feature behavior |
| `ai-annual/` | AI annual report content (large static files) |

## Module Pattern

Feature modules (`atm-qr/`, `charity/`) are **self-contained directories** — each has its own HTML, JS, CSS, and module-specific utilities (e.g. `merchant-atm-common.js`, `merchant-atm-common.css`).

All modules still import `global.css` and `global.js` from the root.

When adding a new feature module: create a subdirectory, keep all module-specific files inside it, and link back to root globals only.
