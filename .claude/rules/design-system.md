---
description: Design tokens, color palette, and CSS variable conventions — apply when editing global.css or any page stylesheet
globs: ["*.css", "*.html"]
alwaysApply: false
---

# Design System

All design tokens live in `global.css` as CSS custom properties on `:root`.

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--primary-main` | `#00a76f` | Primary brand color (teal/green) |
| `--primary-lighter` | — | Tints for backgrounds and hover states |
| `--primary-dark` | — | Pressed/active state |
| `--primary-darker` | — | Strong emphasis |
| `--grey-0` → `--grey-900` | — | Full greyscale ramp |

The **personal card** style variant uses secondary blue `#3b82f6` and is activated by adding the `.style-personal` class.

## Typography & Layout

- Font: **Poppins** (Google Fonts)
- Layout engine: CSS Grid + Flexbox
- Breakpoints defined in `global.css`

## Rules

- Never hardcode color hex values in page-level CSS — always reference a `--token`.
- New tokens go in the `:root {}` block at the top of `global.css`, not inline.
