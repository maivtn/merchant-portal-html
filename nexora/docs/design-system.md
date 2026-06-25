# NEXORA TOUCH Design System

**Version:** 1.1  
**Status:** Production-ready guideline  
**Scope:** Landing page, simulator UI, marketing CTA, pricing, forms, modal, FAQ, responsive interaction layer  
**Source:** `index(4).html` / `nexora-touch-enhanced.html`

---

## 0. Design System Goals

NEXORA TOUCH cần giữ cảm giác **premium, rõ ràng, tin cậy và dễ thao tác**. Giao diện phục vụ cả merchant/chủ salon, nhân viên và khách hàng, nên design system phải cân bằng giữa hình ảnh công nghệ và khả năng đọc dễ hiểu.

### Nguyên tắc chính

1. **Button chỉ dùng nền đơn sắc hoặc outline.** Không dùng gradient cho button.
2. **Gradient chỉ dùng cho background, brand highlight, icon surface, glow hoặc text accent.**
3. **Tương phản phải rõ.** Text trên button phải đạt cảm giác đọc tốt ngay cả trên nền tối/phức tạp.
4. **Interaction phải trực quan.** Hover có lift, shadow, border hoặc sweep effect rõ ràng nhưng không gây rối.
5. **Motion phải mượt và có kiểm soát.** Không dùng fade in/out liên tục cho CTA vì làm chữ nhấp nháy.
6. **Mobile-first.** Tối ưu từ màn hình 360px, sau đó mở rộng tablet và desktop.
7. **Icon dùng Lucide.** Không dùng emoji làm icon chính trong feature section.
8. **Lazy reveal toàn trang.** Dùng AOS hoặc fallback IntersectionObserver.

---

## 1. Brand Direction

| Item | Guideline |
|---|---|
| Product | NEXORA TOUCH |
| Category | Smart QR, tip, loyalty, review, B2B local reward platform |
| Visual tone | Premium fintech, salon-tech, modern SaaS |
| UI mood | Clean, confident, high contrast, soft luxury |
| Shape language | Large radius, pill CTA, rounded card, soft shadow |
| Motion language | Smooth lift, light sweep, slow reveal, subtle floating |

### Visual keywords

- Premium
- Smart QR
- Trustworthy
- Futuristic but friendly
- High-contrast CTA
- Soft-glass card surface
- Smooth interaction

---

## 2. Foundation Tokens

### 2.1 Color Tokens

#### Brand Colors

| Token | Value | Usage |
|---|---:|---|
| `--nx-purple-600` | `#6c4df6` | Primary brand, main CTA, active state |
| `--nx-purple-700` | `#5a3ee0` | Primary hover |
| `--nx-purple-800` | `#4930c7` | Primary pressed |
| `--nx-blue-500` | `#16b7ff` | Accent, link highlight, glow |
| `--nx-cyan-400` | `#22d3ee` | Light sweep accent, icon accent |
| `--nx-green-500` | `#05b86a` | Success, live, positive metric |
| `--nx-gold-500` | `#ffb547` | Reward, star, premium badge |

#### Neutral Colors

| Token | Value | Usage |
|---|---:|---|
| `--nx-navy-900` | `#0f1638` | Heading, dark section, dark CTA |
| `--nx-ink-900` | `#101322` | Main text |
| `--nx-slate-700` | `#344054` | Secondary strong text |
| `--nx-muted-600` | `#667085` | Body secondary, helper text |
| `--nx-muted-400` | `#98a2b3` | Placeholder, muted meta |
| `--nx-line-200` | `#e9ecf4` | Border, divider |
| `--nx-bg-50` | `#f7f8fc` | Page background |
| `--nx-surface` | `#ffffff` | Card, modal, dropdown |

#### Semantic Colors

| Token | Value | Usage |
|---|---:|---|
| `--nx-success` | `#05b86a` | Success status |
| `--nx-warning` | `#f59e0b` | Warning badge |
| `--nx-danger` | `#ef4444` | Error state |
| `--nx-info` | `#16b7ff` | Info state |

---

### 2.2 Color Usage Rules

#### Button color rules

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--nx-purple-600` | White | Same as bg | `--nx-purple-700` |
| Secondary | `--nx-navy-900` | White | Same as bg | Slightly lighter navy |
| Outline Light | Transparent / White | `--nx-navy-900` or `--nx-purple-600` | `--nx-line-200` | Purple border + soft bg |
| Outline On Dark | Transparent | White | `rgba(255,255,255,.72)` | White border + glow, no filled bg |
| Ghost | Transparent | Slate/Navy | Transparent | Soft slate bg |

**Không dùng gradient cho button.**  
Button gradient dễ làm text thiếu ổn định, khó giữ đồng bộ hover và không tốt khi đặt trên background phức tạp.

#### Gradient usage rules

Gradient được phép dùng cho:

- Hero background accent
- Decorative glow
- Text gradient highlight
- Logo/brand mark
- Icon background trong card
- Ambient blur
- Border accent đặc biệt

Gradient không dùng cho:

- Button
- Input background
- Long text block
- Dense simulator controls

---

### 2.3 Typography Tokens

**Primary font:** `Plus Jakarta Sans`  
**Fallback:** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

| Token | Desktop | Mobile | Weight | Usage |
|---|---:|---:|---:|---|
| `display-xl` | 60px / 1.05 | 40px / 1.1 | 800 | Hero title |
| `display-lg` | 48px / 1.1 | 32px / 1.15 | 800 | Major section title |
| `heading-xl` | 36px / 1.15 | 28px / 1.2 | 800 | Section heading |
| `heading-lg` | 28px / 1.2 | 24px / 1.25 | 800 | Subsection heading |
| `heading-md` | 20px / 1.3 | 18px / 1.35 | 700 | Card title |
| `body-lg` | 18px / 1.65 | 16px / 1.6 | 400–600 | Hero/body intro |
| `body-md` | 16px / 1.6 | 14px / 1.55 | 400–600 | Paragraph |
| `body-sm` | 14px / 1.5 | 13px / 1.45 | 400–600 | Card body |
| `caption` | 12px / 1.4 | 12px / 1.4 | 700 | Label, badge |
| `micro` | 8–10px | 8–10px | 700–900 | Simulator compact UI |

### Typography rules

- Heading dùng `font-extrabold` hoặc `font-black`, không dùng weight nhẹ.
- Body text không dùng quá nhạt; ưu tiên `text-slate-600` trở lên.
- Caption/badge dùng uppercase khi là category label.
- Không đặt text dài bằng màu gradient. Gradient chỉ dùng cho 1–5 từ nhấn mạnh.

---

### 2.4 Spacing Tokens

Áp dụng hệ 4px/8px để dễ đồng bộ với Tailwind.

| Token | Value | Tailwind | Usage |
|---|---:|---|---|
| `space-1` | 4px | `1` | Micro gap |
| `space-2` | 8px | `2` | Icon + label gap |
| `space-3` | 12px | `3` | Compact padding |
| `space-4` | 16px | `4` | Default card padding |
| `space-5` | 20px | `5` | Medium padding |
| `space-6` | 24px | `6` | Large card padding |
| `space-8` | 32px | `8` | Section inner gap |
| `space-10` | 40px | `10` | Large block gap |
| `space-12` | 48px | `12` | Grid gap |
| `section-sm` | 64px | `py-16` | Mobile section |
| `section-md` | 80px | `py-20` | Tablet section |
| `section-lg` | 96px | `py-24` | Desktop section |

### Spacing rules

- Section desktop: `py-20` hoặc `py-24`.
- Section mobile: `py-12` đến `py-16`.
- Card padding desktop: `p-6` đến `p-8`.
- Card padding mobile: `p-4` đến `p-5`.
- Button horizontal padding: `px-5` mobile, `px-7/8` desktop.

---

### 2.5 Radius Tokens

| Token | Value | Tailwind | Usage |
|---|---:|---|---|
| `radius-sm` | 10px | `rounded-lg` | Small chip |
| `radius-md` | 14px | `rounded-xl` | Input, compact button |
| `radius-lg` | 18px | `rounded-2xl` | Small card |
| `radius-xl` | 24px | `rounded-[24px]` | Default card |
| `radius-2xl` | 32px | `rounded-[32px]` | Pricing, modal |
| `radius-pill` | 9999px | `rounded-full` | CTA, badges |

### Radius rules

- Marketing CTA dùng pill.
- Feature card dùng 24px.
- Simulator inner card dùng 16–20px để tiết kiệm không gian.
- Modal dùng 28–32px.

---

### 2.6 Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(16,19,34,.06)` | Tiny control |
| `shadow-sm` | `0 6px 18px rgba(16,19,34,.08)` | Card default |
| `shadow-md` | `0 14px 34px rgba(16,19,34,.12)` | Card hover |
| `shadow-lg` | `0 24px 56px rgba(16,19,34,.16)` | Pricing/modal hover |
| `shadow-brand` | `0 22px 50px rgba(108,77,246,.24)` | Hero device / brand object |
| `shadow-focus` | `0 0 0 4px rgba(108,77,246,.18)` | Focus state |
| `shadow-dark-outline` | `0 0 0 1px rgba(255,255,255,.78), 0 14px 34px rgba(0,0,0,.22)` | Outline button on dark bg |

### Shadow rules

- Default card shadow nhẹ hoặc không shadow.
- Hover mới tăng shadow để tạo cảm giác tương tác.
- Không dùng shadow đen quá đậm trên nền sáng.
- Trên nền tối, outline button cần glow/border để nổi bật.

---

### 2.7 Border Tokens

| Token | Value | Usage |
|---|---|---|
| `border-default` | `1px solid #e9ecf4` | Card/input/section divider |
| `border-soft` | `1px solid rgba(226,232,240,.8)` | Inner card |
| `border-active` | `1px solid rgba(108,77,246,.75)` | Selected/focus |
| `border-on-dark` | `1px solid rgba(255,255,255,.72)` | Outline CTA on dark |
| `border-error` | `1px solid #ef4444` | Error input |

---

## 3. Motion & Interaction System

### 3.1 Motion Tokens

| Token | Value | Usage |
|---|---:|---|
| `duration-fast` | `140ms` | Active press |
| `duration-base` | `220ms` | Button hover |
| `duration-smooth` | `320ms` | Card hover |
| `duration-reveal` | `600ms` | Lazy reveal |
| `duration-sweep` | `950ms – 1100ms` | Button light sweep |
| `ease-standard` | `cubic-bezier(.2,0,0,1)` | General transition |
| `ease-out` | `cubic-bezier(.16,1,.3,1)` | Enter/reveal |

### 3.2 Global interaction rules

| Element | Hover | Active | Focus |
|---|---|---|---|
| Button | lift `-2px`, stronger shadow, sweep | scale `.97–.98` | visible ring |
| Card | lift `-4px`, border tint, shadow | lift `-1px` | visible ring if clickable |
| Input | border purple, soft bg | none | border + ring |
| Select | border purple, arrow spacing | none | border + ring |
| Nav link | color purple, underline/indicator optional | none | ring/outline |
| Tab | bg active, color contrast | scale `.98` | ring |

### 3.3 Button light sweep effect

Button hover dùng hiệu ứng ánh sáng lướt ngang qua button. Hiệu ứng này thay cho `animate-pulse` fade in/out.

```css
.btn-action,
.btn-action-secondary,
.btn-action-outline,
.btn-outline-on-dark,
.btn-cta-premium {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transition:
    transform .25s cubic-bezier(.2,0,0,1),
    box-shadow .25s cubic-bezier(.2,0,0,1),
    background-color .25s cubic-bezier(.2,0,0,1),
    border-color .25s cubic-bezier(.2,0,0,1),
    color .25s cubic-bezier(.2,0,0,1);
}

.btn-action::after,
.btn-action-secondary::after,
.btn-action-outline::after,
.btn-outline-on-dark::after,
.btn-cta-premium::after {
  content: "";
  position: absolute;
  top: -18%;
  left: -155%;
  width: 92%;
  height: 136%;
  transform: skewX(-22deg);
  pointer-events: none;
  z-index: -1;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,.08) 22%,
    rgba(255,255,255,.52) 48%,
    rgba(255,255,255,.16) 70%,
    transparent 100%
  );
  filter: blur(.2px);
  transition: left 1.05s cubic-bezier(.16,1,.3,1);
}

.btn-action:hover::after,
.btn-action-secondary:hover::after,
.btn-action-outline:hover::after,
.btn-outline-on-dark:hover::after,
.btn-cta-premium:hover::after,
.btn-action:focus-visible::after,
.btn-action-secondary:focus-visible::after,
.btn-action-outline:focus-visible::after,
.btn-outline-on-dark:focus-visible::after,
.btn-cta-premium:focus-visible::after {
  left: 155%;
}
```

### 3.4 CTA idle animation rule

Không dùng:

```html
animate-pulse
```

Lý do: `animate-pulse` làm button mờ/rõ liên tục, khiến chữ thiếu ổn định và nhìn không premium.

Dùng thay thế:

```css
.btn-cta-premium {
  animation: ctaBreath 3.2s ease-in-out infinite;
}

@keyframes ctaBreath {
  0%, 100% {
    box-shadow: 0 12px 30px rgba(108,77,246,.18);
  }
  50% {
    box-shadow: 0 18px 42px rgba(108,77,246,.28);
  }
}
```

Hiệu ứng này chỉ làm shadow thở nhẹ, không thay đổi opacity của text.

### 3.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .001ms !important;
  }
}
```

---

## 4. Component System

## 4.1 Buttons

### Button anatomy

1. Container
2. Label
3. Optional icon
4. Optional badge
5. Hover sweep overlay

### Button variants

#### Primary Button

Dùng cho CTA chính.

```css
.btn-action {
  color: #fff !important;
  background: var(--nx-purple-600) !important;
  border: 1px solid var(--nx-purple-600) !important;
  box-shadow: 0 10px 24px rgba(108,77,246,.24);
}

.btn-action:hover {
  background: var(--nx-purple-700) !important;
  border-color: var(--nx-purple-700) !important;
  color: #fff !important;
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(108,77,246,.32);
}
```

#### Secondary Button

Dùng cho CTA phụ nhưng vẫn mạnh.

```css
.btn-action-secondary {
  color: #fff !important;
  background: var(--nx-navy-900) !important;
  border: 1px solid var(--nx-navy-900) !important;
  box-shadow: 0 10px 24px rgba(15,22,56,.22);
}

.btn-action-secondary:hover {
  background: #182251 !important;
  border-color: #182251 !important;
  color: #fff !important;
  transform: translateY(-2px);
}
```

#### Outline Button on Light

```css
.btn-action-outline {
  color: var(--nx-navy-900) !important;
  background: transparent !important;
  border: 1px solid rgba(15,22,56,.22) !important;
}

.btn-action-outline:hover {
  color: var(--nx-purple-600) !important;
  background: rgba(108,77,246,.06) !important;
  border-color: rgba(108,77,246,.55) !important;
  transform: translateY(-2px);
}
```

#### Outline Button on Dark

Dùng cho button như **Dùng Thử Bản Giả Lập** nằm trên background tối/phức tạp.

```css
.btn-outline-on-dark {
  color: #fff !important;
  background: transparent !important;
  border: 1px solid rgba(255,255,255,.72) !important;
  text-shadow: 0 1px 2px rgba(0,0,0,.28);
}

.btn-outline-on-dark:hover {
  color: #fff !important;
  background: transparent !important;
  border-color: rgba(255,255,255,.95) !important;
  transform: translateY(-2px);
  box-shadow:
    0 0 0 1px rgba(255,255,255,.42),
    0 14px 34px rgba(0,0,0,.24);
}
```

### Button size tokens

| Size | Padding | Font | Radius | Usage |
|---|---|---|---|---|
| XS | `px-2 py-1` | 9–10px | 8px | Simulator micro action |
| SM | `px-3 py-2` | 12px | 12px | Header, compact UI |
| MD | `px-5 py-3` | 14px | 14–999px | Form action |
| LG | `px-7 py-4` | 16px | 999px | Landing CTA |
| XL | `px-8 py-4` | 16px | 999px | Hero/final CTA |

### Button usage rules

- Mỗi section chỉ có 1 primary button.
- Button cạnh nhau: primary + outline, không dùng 2 primary cùng cấp.
- CTA trên nền tối nên dùng primary solid hoặc outline-on-dark.
- Không dùng opacity animation cho button text.
- Disabled button không có sweep, không lift.

---

## 4.2 Links & Navigation

### Nav link states

| State | Rule |
|---|---|
| Default | Slate text, no underline |
| Hover | Purple text, optional underline indicator |
| Focus | Purple ring / visible outline |
| Active section | Purple text + small dot/underline |

### Mobile menu

- Tap target tối thiểu 44px height.
- Link mobile có border-bottom nhẹ.
- Menu mở bằng slide/fade nhẹ, không quá nhanh.

---

## 4.3 Input, Select, Textarea

### Field style

```css
.ds-field,
input,
select,
textarea {
  background: #fff;
  border: 1px solid var(--nx-line-200);
  border-radius: 14px;
  color: var(--nx-ink-900);
  transition: border-color .22s ease, box-shadow .22s ease, background-color .22s ease;
}

.ds-field:hover,
input:hover,
select:hover,
textarea:hover {
  border-color: rgba(108,77,246,.45);
  background-color: #fff;
}

.ds-field:focus,
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: rgba(108,77,246,.8);
  box-shadow: 0 0 0 4px rgba(108,77,246,.14);
}
```

### Select arrow rule

- `padding-right` tối thiểu `2rem`.
- Arrow cách mép phải tối thiểu `16px`.
- Không để text chạm icon arrow.

---

## 4.4 Cards

### Card variants

| Variant | Usage | Default | Hover |
|---|---|---|---|
| Feature Card | Feature section | White/soft bg, border | Lift + icon highlight |
| Metric Card | Dashboard metrics | White, compact | Slight lift |
| Pricing Card | Pricing | White, strong radius | Lift + shadow-lg |
| Simulator Card | Phone mock content | Compact white card | Minimal lift |
| Dark Card | B2B / premium block | Navy/dark bg | Border/glow |

### Card style

```css
.ds-card {
  border: 1px solid var(--nx-line-200);
  border-radius: 24px;
  background: #fff;
  transition: transform .32s cubic-bezier(.16,1,.3,1), border-color .32s ease, box-shadow .32s ease;
}

.ds-card:hover {
  transform: translateY(-4px);
  border-color: rgba(108,77,246,.38);
  box-shadow: 0 14px 34px rgba(16,19,34,.12);
}
```

---

## 4.5 Feature Icon System

Section **Tính Năng Đột Phá Hỗ Trợ Tăng Trưởng** dùng Lucide icon để đồng bộ, chuyên nghiệp hơn emoji.

### Library

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  lucide.createIcons();
</script>
```

### Recommended icons

| Feature type | Lucide icon | Meaning |
|---|---|---|
| Smart QR | `qr-code` | QR scan / smart link |
| Direct Tip | `hand-coins` | Tip / earning |
| Google Review | `star` or `badge-check` | Rating / trust |
| Loyalty / Reward | `gift` | Reward / XP |
| Tax IQ | `file-check-2` | Compliance / report |
| Analytics | `chart-no-axes-combined` | Growth / insight |
| B2B Alliance | `handshake` | Partner network |
| Automation | `sparkles` | AI / automation |
| Customer Portal | `users-round` | Customer account |
| Security | `shield-check` | Safe / verified |

### Icon style

```html
<div class="nx-icon-surface">
  <i data-lucide="qr-code" class="w-6 h-6"></i>
</div>
```

```css
.nx-icon-surface {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--nx-purple-600);
  background: rgba(108,77,246,.10);
  border: 1px solid rgba(108,77,246,.14);
  transition: transform .28s ease, background-color .28s ease, color .28s ease;
}

.ds-card:hover .nx-icon-surface {
  transform: translateY(-2px) scale(1.04);
  background: var(--nx-purple-600);
  color: #fff;
}
```

---

## 4.6 Badges & Pills

### Badge variants

| Variant | Background | Text | Usage |
|---|---|---|---|
| Brand | Purple 10% | Purple | Eyebrow, active |
| Success | Green 10% | Green | Live, success |
| Warning | Amber 10% | Amber | Pending |
| Neutral | Slate 100 | Slate 700 | Meta |
| On Dark | White 12% | White | Dark section |

### Badge rule

- Badge text nên ngắn: 1–4 từ.
- Badge có thể uppercase khi là category.
- Không dùng emoji thay icon trong badge quan trọng.

---

## 4.7 Tabs

### Tab states

| State | Style |
|---|---|
| Default | Transparent, muted text |
| Hover | Soft bg, text white/dark depending context |
| Active | Solid purple or white surface, high contrast text |
| Focus | Visible ring |

### Rule

- Tab trong phone simulator có thể dùng nền tối và active purple.
- Tab ngoài landing nên dùng surface white + border hoặc underline.

---

## 4.8 Modal

### Modal anatomy

1. Overlay
2. Dialog surface
3. Header
4. Body
5. Footer actions
6. Close button

### Rules

- Overlay: dark alpha + blur nhẹ.
- Dialog radius: 28–32px.
- CTA trong modal vẫn dùng button system: solid hoặc outline.
- Focus trap nên có khi triển khai thật.

---

## 4.9 FAQ / Accordion

### States

| State | Rule |
|---|---|
| Closed | White card, title strong |
| Hover | Border purple alpha, slight bg |
| Open | Border purple alpha, icon rotate |
| Focus | Visible ring |

### Motion

- Open/close dùng `max-height` hoặc JS height transition.
- Duration 240–320ms.

---

## 5. Layout & Responsive System

### Breakpoints

| Token | Width | Usage |
|---|---:|---|
| `xs` | 400px | Small phone enhancement |
| `sm` | 640px | Large phone |
| `md` | 768px | Tablet / nav change |
| `lg` | 1024px | Desktop grid |
| `xl` | 1280px | Large desktop max width |

### Container

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Grid rules

| Screen | Layout |
|---|---|
| Mobile | 1 column, stacked CTA |
| Tablet | 2 columns where possible, CTA horizontal when enough width |
| Desktop | 12-column grid, hero 6/6 split |

### Responsive button rules

- Mobile CTA: full width when placed in hero/form stack.
- Tablet/Desktop CTA: inline-flex.
- Tap target minimum: 44px height.
- Do not rely on hover-only feedback on touch devices.

### Responsive simulator rules

- Phone mockup max width around `448px`.
- On mobile, reduce internal spacing and font size carefully.
- Avoid horizontal overflow from fixed width elements.
- Use `overflow-x-hidden` on body, but fix actual overflowing components.

---

## 6. Lazy Load & Reveal System

### 6.1 AOS setup

Use AOS for scroll reveal.

```html
<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 650,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    delay: 0
  });
</script>
```

### 6.2 Reveal usage

```html
<section data-aos="fade-up"></section>
<div class="ds-card" data-aos="fade-up" data-aos-delay="80"></div>
```

Recommended reveal types:

| Element | AOS effect |
|---|---|
| Section header | `fade-up` |
| Card grid | `fade-up` with small delay |
| Hero visual | `zoom-in` or `fade-left` |
| Pricing card | `fade-up` |
| Final CTA | `zoom-in` |

### 6.3 Image lazy loading

```html
<img src="..." alt="..." loading="lazy" decoding="async">
```

### 6.4 Fallback without AOS

```js
const revealItems = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .65s ease, transform .65s ease;
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. Infinite / Ambient Effects

Infinite animation chỉ dùng cho decorative elements, không dùng cho text chính.

### Allowed infinite effects

| Effect | Usage | Rule |
|---|---|---|
| Soft float | Hero phone/device | Slow, 4–6s |
| Ambient glow | Background blur | Low opacity |
| CTA shadow breath | Primary CTA only | Shadow only, no text opacity |
| Small live dot pulse | Status/live indicator | Acceptable |

### Not allowed

- Text opacity pulse on CTA.
- Fast flashing animation.
- Infinite scale trên card grid.
- Motion làm layout shift.

### Example

```css
.nx-float-soft {
  animation: nxFloatSoft 5.5s ease-in-out infinite;
}

@keyframes nxFloatSoft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

---

## 8. Accessibility Rules

### Contrast

- Solid button: white text on purple/navy.
- Outline-on-dark: white text, visible border, optional text shadow.
- Avoid `bg-white/10` with white text if background phía ngoài phức tạp hoặc quá sáng.
- Placeholder không được quá mờ.

### Focus

Every interactive element must have `:focus-visible`.

```css
.ds-control:focus-visible,
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(108,77,246,.18);
}
```

### Touch target

- Minimum 44px height/width for main controls.
- Icon-only button must have `aria-label`.

### Motion accessibility

- Respect `prefers-reduced-motion`.
- Do not use fast flash.
- Do not animate opacity of important text continuously.

---

## 9. Implementation Classes

### Required utility classes

| Class | Purpose |
|---|---|
| `.ds-control` | Common control transition/focus behavior |
| `.ds-button` | Button base |
| `.btn-action` | Solid primary button |
| `.btn-action-secondary` | Solid navy button |
| `.btn-action-outline` | Outline button on light bg |
| `.btn-outline-on-dark` | Outline button on dark bg |
| `.btn-cta-premium` | CTA with shadow breath + sweep |
| `.ds-card` | Card hover/focus system |
| `.nx-icon-surface` | Lucide icon container |
| `.nx-float-soft` | Slow ambient floating |
| `.text-grad` | Gradient text only |
| `.custom-gradient` | Decorative brand gradient only |

---

## 10. HTML Rules for Current Page

### Button cleanup

Replace gradient button classes such as:

```html
bg-gradient-to-r from-purple to-indigo-600
```

With:

```html
btn-action
```

Replace weak dark-background button:

```html
bg-white/10 hover:bg-white/20 text-white border border-white/10
```

With:

```html
btn-outline-on-dark
```

Replace `animate-pulse` on CTA:

```html
animate-pulse
```

With:

```html
btn-cta-premium
```

### Icon cleanup

Replace feature emoji blocks with Lucide:

```html
<div class="nx-icon-surface">
  <i data-lucide="qr-code" class="w-6 h-6"></i>
</div>
```

Then call:

```js
lucide.createIcons();
```

### Lazy load cleanup

Add AOS to sections/cards:

```html
<section data-aos="fade-up"></section>
```

Add image lazy attributes:

```html
<img loading="lazy" decoding="async" ...>
```

---

## 11. QA Checklist

### Visual consistency

- [ ] Button không còn gradient.
- [ ] Button chỉ có solid hoặc outline.
- [ ] Button hover có light sweep nhìn rõ, không quá nhanh.
- [ ] Text button luôn tương phản tốt.
- [ ] Outline-on-dark không dùng nền mờ `bg-white/10` làm giảm tương phản.
- [ ] CTA không dùng `animate-pulse` opacity.
- [ ] Feature icon dùng Lucide, không dùng emoji chính.
- [ ] Card hover đồng bộ lift + shadow.
- [ ] Input/select focus rõ.

### Responsive

- [ ] Không tràn ngang ở 360px.
- [ ] Button mobile đủ cao tối thiểu 44px.
- [ ] CTA mobile stack hợp lý.
- [ ] Tablet layout không bị khoảng trắng xấu.
- [ ] Header mobile không vỡ khi đổi ngôn ngữ.
- [ ] Simulator phone fit màn hình nhỏ.

### Interaction

- [ ] Hover button thấy rõ sweep trong khoảng 1s.
- [ ] Active state scale nhẹ.
- [ ] Focus-visible rõ khi dùng keyboard.
- [ ] Disabled state không có hover/sweep.
- [ ] Lazy reveal chỉ chạy một lần, không giật.
- [ ] Infinite animation chỉ dùng cho decorative elements.

### Accessibility

- [ ] Icon-only button có `aria-label`.
- [ ] Modal có close button rõ.
- [ ] Text không bị mờ do animation.
- [ ] Reduced motion hoạt động.
- [ ] Link/CTA có label rõ nghĩa.

---

## 12. Handoff Notes for Developer / AI Agent

1. Treat this file as the source of truth for style decisions.
2. Do not add new gradient button variants.
3. Use Lucide for all key feature icons.
4. Keep CTA interaction premium: solid/outline + sweep + shadow, not opacity pulse.
5. Use AOS for lazy reveal, but keep a fallback if CDN fails.
6. Maintain mobile-first layout.
7. Any new component must define: default, hover, focus, active, disabled.
8. Any new section must follow spacing, radius, shadow and typography tokens above.

---

## 13. Recommended CSS Token Block

```css
:root {
  --nx-purple-600: #6c4df6;
  --nx-purple-700: #5a3ee0;
  --nx-purple-800: #4930c7;
  --nx-blue-500: #16b7ff;
  --nx-cyan-400: #22d3ee;
  --nx-green-500: #05b86a;
  --nx-gold-500: #ffb547;

  --nx-navy-900: #0f1638;
  --nx-ink-900: #101322;
  --nx-slate-700: #344054;
  --nx-muted-600: #667085;
  --nx-muted-400: #98a2b3;
  --nx-line-200: #e9ecf4;
  --nx-bg-50: #f7f8fc;
  --nx-surface: #ffffff;

  --nx-radius-sm: 10px;
  --nx-radius-md: 14px;
  --nx-radius-lg: 18px;
  --nx-radius-xl: 24px;
  --nx-radius-2xl: 32px;

  --nx-duration-fast: 140ms;
  --nx-duration-base: 220ms;
  --nx-duration-smooth: 320ms;
  --nx-duration-reveal: 650ms;
  --nx-duration-sweep: 1.05s;

  --nx-ease-standard: cubic-bezier(.2,0,0,1);
  --nx-ease-out: cubic-bezier(.16,1,.3,1);

  --nx-shadow-xs: 0 1px 2px rgba(16,19,34,.06);
  --nx-shadow-sm: 0 6px 18px rgba(16,19,34,.08);
  --nx-shadow-md: 0 14px 34px rgba(16,19,34,.12);
  --nx-shadow-lg: 0 24px 56px rgba(16,19,34,.16);
  --nx-shadow-brand: 0 22px 50px rgba(108,77,246,.24);
  --nx-focus-ring: 0 0 0 4px rgba(108,77,246,.18);
}
```
