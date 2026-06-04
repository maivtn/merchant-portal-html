# AI Ads Portal Design System Toolkit

> Bộ design system này được rút ra từ file `ai-ads.html` và đã được chuẩn hóa thành 3 phần: design tokens, component specification và usage rules. File HTML chính đã được refactor để dùng `style.css` qua `<link rel="stylesheet" href="style.css">`.

---

## 1. Design Principles

### Visual direction
- **Premium SaaS / Merchant Portal**: giao diện sáng, bo góc lớn, shadow mềm, màu chủ đạo indigo/violet.
- **Clear action-first layout**: mỗi màn hình có heading, mô tả ngắn, CTA chính và vùng dữ liệu rõ ràng.
- **Merchant-friendly**: ưu tiên label dễ hiểu, trạng thái rõ, action ngắn gọn.
- **Responsive-first**: desktop sidebar cố định, mobile dùng drawer và giảm spacing/font size.

### UI tone
- Gọn, rõ, hiện đại.
- CTA chính nổi bật bằng gradient indigo → violet.
- Trạng thái dùng màu semantic: success, warning, danger, info, neutral.

---

## 2. Design Tokens

### 2.1 Colors

#### Brand
| Token | Value | Usage |
|---|---:|---|
| `--color-primary-50` | `#eef2ff` | Active nav background, info badge bg |
| `--color-primary-100` | `#e0e7ff` | Soft border, icon bg |
| `--color-primary-500` | `#6366f1` | Focus border, progress |
| `--color-primary-600` | `#4f46e5` | Primary button, active text |
| `--color-primary-700` | `#4338ca` | Hover / strong text |
| `--color-secondary-500` | `#8b5cf6` | Gradient end, AI accent |
| `--color-secondary-600` | `#7c3aed` | Secondary hover |

#### Neutral / Slate
| Token | Value | Usage |
|---|---:|---|
| `--color-slate-50` | `#f8fafc` | Page bg, input bg, table header |
| `--color-slate-100` | `#f1f5f9` | Soft border |
| `--color-slate-200` | `#e2e8f0` | Default border |
| `--color-slate-300` | `#cbd5e1` | Scrollbar thumb |
| `--color-slate-400` | `#94a3b8` | Muted text |
| `--color-slate-500` | `#64748b` | Secondary text |
| `--color-slate-600` | `#475569` | Body text |
| `--color-slate-700` | `#334155` | Strong secondary text |
| `--color-slate-800` | `#1e293b` | Main body text |
| `--color-slate-900` | `#0f172a` | Heading |
| `--color-slate-950` | `#020617` | Strong heading / dark surface |

#### Semantic
| Token | Value | Usage |
|---|---:|---|
| `--color-success-50` | `#ecfdf5` | Success badge bg |
| `--color-success-500` | `#10b981` | Success dot/icon |
| `--color-success-600` | `#059669` | Success text |
| `--color-warning-50` | `#fffbeb` | Warning bg |
| `--color-warning-500` | `#f59e0b` | Pending/warning text |
| `--color-danger-50` | `#fef2f2` | Error/rejected bg |
| `--color-danger-500` | `#ef4444` | Error/rejected text |

---

### 2.2 Typography

| Token | Value | Usage |
|---|---:|---|
| `--font-family-base` | `Inter` | Toàn bộ portal |
| `--font-size-xs` | `0.75rem / 12px` | Badge, helper text, table metadata |
| `--font-size-sm` | `0.875rem / 14px` | Body, input, button |
| `--font-size-base` | `1rem / 16px` | Default text |
| `--font-size-lg` | `1.125rem / 18px` | Section title nhỏ |
| `--font-size-xl` | `1.25rem / 20px` | Card heading |
| `--font-size-2xl` | `1.5rem / 24px` | Page heading |
| `--font-size-3xl` | `1.875rem / 30px` | Metric number |

#### Typography rules
- Page title: `24px`, `font-weight: 800`, tight letter spacing.
- Card title: `18–20px`, `font-weight: 700–800`.
- Table heading: uppercase, `10–12px`, tracking rộng.
- Helper text: `12–14px`, slate-400/500.

---

### 2.3 Spacing

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | `4px` | Tiny gap |
| `--space-2` | `8px` | Icon/text gap |
| `--space-3` | `12px` | Form gap |
| `--space-4` | `16px` | Base padding |
| `--space-5` | `20px` | Card compact padding |
| `--space-6` | `24px` | Card default padding |
| `--space-8` | `32px` | Section spacing |
| `--space-10` | `40px` | Empty state padding |
| `--space-12` | `48px` | Large vertical rhythm |

#### Spacing rules
- Main content: `24–32px` desktop, `16px` mobile.
- Card padding: `24px`, package card: `32px`.
- Grid gap: `24px`.
- Table cell: `16px 24px`.

---

### 2.4 Radius

| Token | Value | Usage |
|---|---:|---|
| `--radius-sm` | `8px` | Small control |
| `--radius-md` | `12px` | Button/input |
| `--radius-lg` | `16px` | Navigation item |
| `--radius-xl` | `20px` | Icon wrapper |
| `--radius-2xl` | `24px` | Modal/card small |
| `--radius-3xl` | `28px` | Main card |
| `--radius-full` | `9999px` | Avatar/badge/pill |

---

### 2.5 Shadow

| Token | Value | Usage |
|---|---|---|
| `--shadow-premium` | Soft indigo shadow | Default card |
| `--shadow-card-hover` | Stronger lifted shadow | Hoverable card |
| `--shadow-btn-primary` | Indigo glow | Primary CTA hover |
| `--shadow-btn-secondary` | Violet glow | AI/secondary CTA hover |
| `--shadow-input-focus` | Focus ring | Input/select focus |

---

### 2.6 Border

| Token | Value | Usage |
|---|---:|---|
| `--border-width-default` | `1px` | Card/input/table |
| `--border-width-strong` | `2px` | Selected/recommended card |
| `--color-border-soft` | `#f1f5f9` | Card border |
| `--color-border-default` | `#e2e8f0` | Input/table border |

---

### 2.7 Breakpoints

| Token | Value | Usage |
|---|---:|---|
| `--breakpoint-sm` | `640px` | Mobile typography/spacing reduction |
| `--breakpoint-md` | `768px` | Sidebar hidden → drawer |
| `--breakpoint-lg` | `1024px` | 3-column layouts |
| `--breakpoint-xl` | `1280px` | Max content width |
| `--breakpoint-2xl` | `1536px` | Large desktop |

---

## 3. Reusable Components

## 3.1 Button

### Component name
`Button`

### Anatomy
- Container
- Optional leading icon
- Label
- Optional trailing icon

### Variants
- `Primary`: gradient indigo → violet, dùng cho CTA chính.
- `Secondary`: nền slate-50, dùng cho action phụ.
- `Ghost`: nền trong suốt, dùng cho nav/action nhẹ.
- `Danger`: dùng cho delete/reject/cancel.

### States
- Default
- Hover: tăng shadow / đổi nền
- Active: scale `0.96`
- Disabled: opacity thấp, không hover
- Loading: spinner hoặc disabled + text “Processing...”

### Sizes
- Small: `32px height`, `12px text`
- Medium: `40px height`, `14px text`
- Large: `48px height`, `14–16px text`

### Properties
- `variant`: primary / secondary / ghost / danger
- `size`: sm / md / lg
- `iconLeading`: true / false
- `iconTrailing`: true / false
- `state`: default / hover / active / disabled / loading

### Auto Layout setup
- Direction: horizontal
- Align: center
- Gap: `8px`
- Padding: `10px 20px`
- Radius: `12px`

### Responsive behavior
- Mobile: button full width khi nằm trong form/action stack.
- Desktop: button theo content width.

### Usage rule
- Mỗi màn hình chỉ nên có 1 primary CTA chính.
- Không dùng gradient cho action phụ.

---

## 3.2 Input

### Component name
`Input`

### Anatomy
- Label
- Input container
- Optional leading icon
- Placeholder/value
- Helper/error text

### Variants
- Text input
- Search input
- URL input
- Date input

### States
- Default
- Focus
- Filled
- Error
- Disabled

### Sizes
- Medium: `40px`
- Large: `48px`

### Properties
- `type`: text / search / url / date
- `hasIcon`: true / false
- `state`: default / focus / error / disabled
- `helperText`: string

### Auto Layout setup
- Field wrapper vertical
- Gap label-input: `8px`
- Input padding: `10px 16px`
- Radius: `12px`

### Responsive behavior
- Mobile: stack full width.
- Desktop: có thể nằm ngang trong filter toolbar.

### Usage rule
- Search input dùng icon search bên trái.
- Error text đặt ngay dưới input, màu danger.

---

## 3.3 Select

### Component name
`Select`

### Anatomy
- Label optional
- Select container
- Selected value
- Dropdown indicator

### Variants
- Default
- Filter select

### States
- Default
- Focus
- Disabled
- Error

### Sizes
- Medium: `40px`
- Large: `48px`

### Properties
- `placeholder`
- `selectedValue`
- `state`

### Auto Layout setup
- Radius: `12px`
- Padding: `10px 16px`
- Border: `1px solid slate-200`

### Responsive behavior
- Mobile: full width dưới search input.
- Desktop: inline trong filter toolbar.

### Usage rule
- Label option phải rõ nghĩa, tránh viết tắt kỹ thuật.

---

## 3.4 Card

### Component name
`Card`

### Anatomy
- Container
- Header/title
- Supporting text
- Main content
- Optional icon/action/footer

### Variants
- Default card
- Interactive card
- Dark upgrade card
- Pricing card
- Stat card

### States
- Default
- Hover/lifted
- Selected/recommended
- Disabled/current plan

### Sizes
- Compact: `20px padding`
- Default: `24px padding`
- Large/pricing: `32px padding`

### Properties
- `variant`: default / interactive / dark / pricing / stat
- `isSelected`: true / false
- `hasIcon`: true / false
- `hasFooter`: true / false

### Auto Layout setup
- Direction: vertical
- Gap: `16–24px`
- Padding: `24px`
- Radius: `28px`
- Border: slate-100
- Shadow: premium

### Responsive behavior
- Mobile: 1 column.
- Tablet/Desktop: 2–3 columns tùy content.

### Usage rule
- Card click được phải có hover state rõ.
- Pricing card recommended dùng border `2px primary-600`.

---

## 3.5 Badge

### Component name
`Badge`

### Anatomy
- Optional status dot/icon
- Label

### Variants
- Success
- Warning
- Danger
- Info
- Neutral

### States
- Default
- With dot
- With icon

### Sizes
- Small: `10–11px text`
- Medium: `12px text`

### Properties
- `variant`
- `hasDot`
- `hasIcon`

### Auto Layout setup
- Horizontal
- Gap: `6px`
- Padding: `2px 10px`
- Radius: full

### Responsive behavior
- Badge không nên wrap chữ quá dài; dùng label ngắn.

### Usage rule
- Status banner: Active = success, Pending = warning, Rejected = danger, Draft = neutral, Approved = info.

---

## 3.6 Tabs

### Component name
`Tabs`

### Anatomy
- Tab list container
- Tab item
- Label
- Active indicator via background/shadow

### Variants
- Pill tabs
- Page tabs

### States
- Default
- Hover
- Active
- Disabled

### Sizes
- Small: `32px height`
- Medium: `40px height`

### Properties
- `activeTab`
- `items[]`
- `size`

### Auto Layout setup
- Horizontal
- Container padding: `4px`
- Gap: `4px`
- Radius: `16px`

### Responsive behavior
- Mobile: horizontal scroll nếu nhiều tab.

### Usage rule
- Dùng tabs cho view cùng cấp, không dùng thay cho menu chính.

---

## 3.7 Modal

### Component name
`Modal`

### Anatomy
- Overlay
- Modal container
- Header
- Close button
- Body
- Footer actions

### Variants
- Info modal
- Confirm modal
- Rejection reason modal
- Banner preview modal

### States
- Closed
- Opening
- Open
- Closing

### Sizes
- Small: `384px`
- Medium: `512px`
- Large: `720px`

### Properties
- `title`
- `content`
- `primaryAction`
- `secondaryAction`
- `size`

### Auto Layout setup
- Vertical
- Padding: `24px`
- Radius: `28px`
- Overlay: slate-900/60 + blur

### Responsive behavior
- Mobile: width `calc(100vw - 32px)`.

### Usage rule
- Không mở modal lồng modal.
- Footer action phải rõ: Cancel/Close bên trái, Confirm bên phải.

---

## 3.8 Table

### Component name
`Table`

### Anatomy
- Table container
- Header row
- Body rows
- Cell content
- Optional action column
- Optional pagination

### Variants
- Simple table
- Banner management table
- Comparison table
- Transaction table

### States
- Default
- Hover row
- Empty
- Loading

### Sizes
- Default cell: `16px 24px`
- Mobile cell: `8px 12px`

### Properties
- `columns[]`
- `rows[]`
- `hasActions`
- `hasPagination`
- `state`

### Auto Layout setup
- Container radius: `28px`
- Border: slate-100
- Overflow-x: auto

### Responsive behavior
- Mobile: horizontal scroll.
- Không ép quá nhiều cột vào màn hình nhỏ.

### Usage rule
- Action column đặt cuối, align right.
- Header dùng label ngắn và nhất quán.

---

## 3.9 Navigation

### Component name
`Sidebar Navigation`

### Anatomy
- Brand/logo area
- Section label
- Nav item list
- Bottom plan summary

### Variants
- Desktop sidebar
- Mobile drawer
- Active item

### States
- Default
- Hover
- Active
- Collapsed/mobile hidden

### Properties
- `items[]`
- `activeScreen`
- `hasPlanSummary`

### Auto Layout setup
- Width: `288px`
- Vertical layout
- Item radius: `16px`
- Item gap: `14px`

### Responsive behavior
- Desktop: sidebar fixed left.
- Under `768px`: sidebar hidden, hamburger opens drawer.

### Usage rule
- Menu label nên dùng cùng ngôn ngữ trong một nhóm. Với portal này, giữ các mục sản phẩm chính bằng English là ổn: AI Ads Hub, Manage Banner, Create Ad, Transaction History, Buy Package.

---

## 3.10 Empty State

### Component name
`Empty State`

### Anatomy
- Icon/illustration
- Title
- Description
- Optional CTA

### Variants
- No banner
- No transaction
- No AI result

### States
- Default

### Properties
- `icon`
- `title`
- `description`
- `actionLabel`

### Auto Layout setup
- Vertical
- Align center
- Padding: `40px 24px`
- Radius: `24px`
- Border: dashed slate-200

### Responsive behavior
- Mobile: reduce icon and padding.

### Usage rule
- Empty state phải hướng user tới bước tiếp theo, không chỉ báo “không có dữ liệu”.

---

## 3.11 Toast / Alert

### Component name
`Toast` / `Alert`

### Anatomy
- Icon/status dot
- Title/message
- Optional close button

### Variants
- Success
- Info
- Warning
- Danger

### States
- Entering
- Visible
- Exiting

### Properties
- `variant`
- `message`
- `duration`

### Auto Layout setup
- Toast position: top-right desktop, full width with margin mobile.
- Alert inline: horizontal layout, padding `16px`.

### Responsive behavior
- Mobile toast: left/right `12px`, max width 100%.

### Usage rule
- Toast dùng cho feedback sau action.
- Alert dùng cho thông tin cần user đọc trước khi thao tác.

---

## 3.12 Loading

### Component name
`Loading`

### Anatomy
- Skeleton block / spinner
- Optional loading text

### Variants
- Button loading
- Card skeleton
- Table skeleton
- AI generating state

### States
- Loading
- Loaded
- Error

### Properties
- `type`: spinner / skeleton
- `size`

### Auto Layout setup
- Skeleton radius theo component thật.
- Animation shimmer `1.2s`.

### Responsive behavior
- Skeleton width theo container.

### Usage rule
- AI generation nên hiển thị loading rõ vì user có thể chờ kết quả.

---

## 4. Standardized Component Classes in `style.css`

| Class | Purpose |
|---|---|
| `.ds-card` | Card base |
| `.ds-card-interactive` | Card hover/lift |
| `.ds-button` | Button base |
| `.ds-button-primary` | Primary CTA |
| `.ds-button-secondary` | Secondary CTA |
| `.ds-button-ghost` | Low emphasis action |
| `.ds-input` | Text input |
| `.ds-select` | Select input |
| `.ds-textarea` | Textarea |
| `.ds-label` | Field label |
| `.ds-badge` | Badge base |
| `.ds-badge-success` | Success status |
| `.ds-badge-warning` | Warning/pending status |
| `.ds-badge-danger` | Error/rejected status |
| `.ds-badge-info` | Info/approved status |
| `.ds-badge-neutral` | Draft/neutral status |
| `.ds-table` | Table base |
| `.ds-nav-item` | Navigation item |
| `.ds-empty-state` | Empty state |
| `.ds-alert` | Alert base |
| `.ds-tabs` | Tabs container |
| `.ds-tab` | Tab item |
| `.ds-skeleton` | Loading skeleton |

---

## 5. HTML Refactor Notes

### Updated files
- `style.css`: chứa tokens, reusable component classes, scrollbar, animation, responsive rules.
- `ai-ads-refactored.html`: HTML chính đã link `style.css` và bỏ inline `<style>`.
- `component-overview.html`: trang overview hiển thị toàn bộ component chính.

### What was standardized
- Tách inline CSS ra file riêng.
- Thêm token CSS variables cho color, typography, spacing, radius, shadow, border, breakpoint.
- Thêm component classes `.ds-*` để dùng lại cho các component mới.
- Giữ Tailwind CDN để tránh phá layout hiện tại.
- Chuẩn hóa naming một số text: `AI credit`, `banner`, `Nguồn`, `Manage Banner`.

### Implementation rule for dev
- Với màn hình hiện tại: vẫn có thể dùng Tailwind class để không phá giao diện.
- Với component mới: ưu tiên dùng `.ds-*` từ `style.css` để đồng bộ nhanh.
- Khi cần refactor sâu hơn: thay dần các cụm Tailwind lặp lại bằng `.ds-card`, `.ds-button`, `.ds-input`, `.ds-badge`, `.ds-table`.

---

## 6. Usage Rules

### Button
- Primary CTA chỉ dùng cho hành động chính: Create, Submit, Upgrade, Confirm.
- Secondary CTA dùng cho Save Draft, Upload, View Detail.
- Ghost CTA dùng cho Close, Back, Cancel nhẹ.

### Status
- `Active`: success.
- `Pending Review`: warning.
- `Rejected`: danger.
- `Approved`: info.
- `Draft`: neutral.

### Forms
- Form field phải có label khi dùng trong flow quan trọng.
- Placeholder không thay thế label.
- Error đặt ngay dưới field.

### Tables
- Cột action luôn align right.
- Tránh quá 4–5 cột trên portal merchant.
- Mobile cho table scroll ngang.

### Cards
- Card có click phải có hover/lift.
- Card thông tin chỉ đọc không cần hover mạnh.
- Pricing recommended dùng border primary 2px + badge.

### Responsive
- Mobile giảm padding/card spacing.
- Sidebar desktop chuyển thành drawer dưới `768px`.
- CTA trong form nên full width trên mobile.

---

## 7. Suggested Figma Structure

```text
AI Ads Design System
├── 00. Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   ├── Shadow
│   └── Breakpoints
├── 01. Components
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── Card
│   ├── Badge
│   ├── Tabs
│   ├── Modal
│   ├── Table
│   ├── Navigation
│   ├── Empty State
│   ├── Toast / Alert
│   └── Loading
├── 02. Patterns
│   ├── Dashboard Stats
│   ├── Pricing Plans
│   ├── Banner Management
│   ├── AI Generation Panel
│   └── Submission Review Flow
└── 03. Screens
    ├── AI Ads Hub
    ├── Manage Banner
    ├── Buy Package
    ├── Upgrade Package
    ├── Create Ad
    ├── Upload Banner
    └── Create Banner with AI
```

---

## 8. Next cleanup recommendation

Nên refactor thêm một vòng để giảm bớt class Tailwind dài trong HTML:
- Button → `.ds-button ds-button-primary`.
- Card → `.ds-card ds-card-interactive`.
- Input/select → `.ds-input`, `.ds-select`.
- Badge status → `.ds-badge ds-badge-*`.
- Table → `.ds-table`.

Cách làm này giúp HTML ngắn hơn, dễ maintain hơn và đồng bộ tốt hơn khi mở rộng AI Ads Portal.
