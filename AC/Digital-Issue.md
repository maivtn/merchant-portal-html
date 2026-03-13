# Acceptance Criteria — Issue Digital Card Screen

**Component:** `issue-digital.component`  
**Files:** `issue-digital.component.html` · `issue-digital.component.scss` · `issue-digital.component.ts` · `issue-digital.constant.ts`  
**Route:** `/merchant-portal/issue-digital`  
**Last updated:** 2026-03-12

---

## Layout tổng thể

- **2 cột** trên desktop (lg+): Left Panel (32%) + Right Form (flex-1), gap `36px`
- **1 cột** trên mobile: Left Panel lên trên, Right Form xuống dưới (order đảo)
- Wrapper `.create-card`: `border-radius: xl`, `padding: 0 12px` trên desktop, `0` trên mobile
- Font toàn trang: **Poppins**, size tối thiểu `14px` trên desktop
- Primary color: `#00AB55` (xanh lá)
- Design token: `--c-primary`, `--c-border`, `--c-surface`, `--c-text-1/2/3`

---

## Header Actions (góc phải trên cùng)

| Element | Mô tả |
|---------|-------|
| Button **Save for Update Later** | `zType="outline"`, `zSize="lg"`, `min-w-[160px]` trên sm+, hidden text trên mobile. Click → `confirmIssuance('DRAFT')`. Disabled khi `isLoading()` |

---

## LEFT PANEL

### Card 1 — Card Preview

- **Title:** icon `bi-credit-card-2-front` + tên loại card đang chọn + button **TAP TO FLIP**
- **TAP TO FLIP button:** pill style (`rounded-full`), border `#e2e8f0`, hover green. Click → `flipCard()`
- **Preview:** Canvas 3D flip (`.card-inner`), click vào preview cũng flip
  - Front: `#cardCanvas` (2000×1261)
  - Back: `#cardBackCanvas` (2000×1261)
- Section KHÔNG collapsible (luôn hiển thị)

### Card 2 — Design Collection

- **Collapsible:** click title → toggle `design-collection`; mặc định **đóng** trên mobile
- **Preset Colors** (12 màu):

  | Hex | Màu |
  |-----|-----|
  | `#1E293B` | Slate dark |
  | `#064E3B` | Emerald dark |
  | `#7F1D1D` | Red dark |
  | `#4C1D95` | Violet dark |
  | `#3B82F6` | Blue |
  | `#10B981` | Green |
  | `#F59E0B` | Amber |
  | `#EC4899` | Pink |
  | `#06B6D4` | Cyan |
  | `#8B5CF6` | Purple |
  | `#FFD84D` | Yellow |
  | `#DBCD43` | Gold |

- **Custom Color picker:** button icon palette + `<input type="color">` ẩn
- **Advanced Text Colors (Accordion):**
  - Trigger: label "CUSTOM TEXT COLOR (ADVANCED)" + info tooltip
  - Mặc định **đóng** (collapsible single)
  - Preset text colors: `#3B82F6` (Blue) · `#CA8A04` (Gold) · `#FFFFFF` (White) · `#000000` (Black)
  - Các nhóm:
    - **Brand Name & Slogan** — auto + 4 preset + custom picker
    - **Card Holder** — auto + 4 preset + custom picker
    - **Amount/Value** — auto + 4 preset + custom picker

### Card 3 — Brand Identity

- **Collapsible:** click title → toggle `brand-identity`; mặc định **đóng** trên mobile
- **Title buttons** (nằm bên phải title):
  - Button **Library** (`bi-collection`): `openLogoLibrary()` — ⚠️ TODO
  - Button **Upload Logo** (`bi-upload`): trigger `<input type="file">`, accept `image/*`, `onLogoUpload()`
  - Desktop: cùng hàng title (`ml-auto`); Mobile: wrap xuống hàng mới (`order-last w-full`), mỗi button `flex-1`
  - Click buttons KHÔNG trigger toggle collapse (`stopPropagation`)

- **Style Tags** (8 tags):
  > `Luxury Gold` · `Minimalist` · `Vintage Badge` · `Playful` · `Modern – Tech` · `Pastel` · `Neon` · `Vibrant`
  - Click toggle active → tự động cập nhật `aiLogoDescription`

- **AI Description Textarea:** `rows=3`, placeholder mô tả logo ý tưởng

- **Suggested Descriptions** (`*ngIf="aiPrompts && aiPrompts.length > 0"`):
  - Label "SUGGESTED DESCRIPTIONS for [category]"
  - **Category Dropdown** — 10 categories:

    | ID | Category |
    |----|----------|
    | 1 | Nail Spa & Nail Salon |
    | 2 | Beauty, Fashion & Lifestyle |
    | 3 | Retail & Consumer Services |
    | 4 | Hospitality & Food Services |
    | 5 | Financial & Fintech Services |
    | 6 | Technology & Digital Products |
    | 7 | Health, Wellness & Medical |
    | 8 | Real Estate & Property Services |
    | 9 | Travel, Tourism & Experiences |
    | 10 | Entertainment, Media & Creative |

  - Mỗi category có **6 prompt mẫu** (ví dụ category 1 — Nail Spa):
    > 1. "Design a luxury nail spa logo for a professional and high-end nail salon..."
    > 2. "Create a premium nail salon brand logo with a modern and professional identity..."
    > 3. "Develop a high-class nail spa logo that reflects relaxation, beauty, and professionalism..."
    > 4. "Design a modern luxury nail salon logo that balances femininity and professionalism..."
    > 5. "Create an exclusive nail spa logo that communicates quality, hygiene, and premium care..."
    > 6. "Design a premium nail salon logo suitable for storefront signage, appointment apps..."

  - **Prompt list** (`.ai-prompts-list`): grid 2 cột, `max-height: 200px`, scroll, text ellipsis; click → fill vào textarea
  - Button **Generate AI**: gọi `eGiftHubService.generateAiLogo()` với description + style tags

### Card 4 — Business Information

- **Collapsible:** click title → toggle `business-info`; mặc định **đóng** trên mobile
- **5 fields:** Brand Name · Slogan · Phone · Email · Website
  - Layout: 2 cột md+, 1 cột mobile
- **Button Save** — hiện khi expanded; ⚠️ TODO: chưa có action handler

---

## RIGHT PANEL — Form Steps

- Label `* required` (đỏ) phía trên cùng — i18n key: `required-fields-note`
- Tất cả steps collapsible; chevron icon rotate khi mở/đóng
- Step mặc định: đóng trên mobile, mở trên desktop

---

### Step 1 — Select Product Line *(Required \*)*

**Card Type Grid** (`.card-type-grid`):
- Layout: `flex flex-wrap`, `width: auto` theo nội dung, gap `16px` desktop / `6px` (≤768px)
- Mobile (≤639px): 3 item/hàng — `width: calc(33.333% - 4px)`, gap `5px`
- Mỗi item: icon trên, label dưới (`.card-type-item`), `padding: 8px 14px`
- `disabled` item: opacity 45%, `cursor: not-allowed`, grayscale nhẹ

| Value | Label | Icon | Disabled |
|-------|-------|------|----------|
| `0` | E-Gift Card | `gift-card.svg` | ❌ |
| `2` | Membership | `membership.svg` | ❌ |
| `5` | **Crypto Card** | `PrepaidCard.svg` | ✅ (tạm disabled) |
| `4` | Prepaid Card | `PrepaidCard.svg` | ❌ |
| `3` | Discount | `discount.svg` | ❌ |
| `1` | Promotion | `discount.svg` | ❌ |


**Rank Grid** (`.rank-grid`): ẩn khi `cardType = PrepaidCard`; cách card type `mt-5` (20px)
- Layout: `flex flex-wrap`, `width: auto`, gap `16px` desktop / `6px` (≤768px)
- Ranks là dynamic từ API theo từng card type
- Click rank → `toggleRank(r)` (click lại = deselect)
- **Custom Rank Input** (`.rank-pill--custom`):
  - Input text `width: 120px`, placeholder i18n `custom-rank` = "Custom"
  - Focus → deselect rank đang chọn
  - Gõ → set `form.rank` = giá trị nhập; class `active` khi rank không thuộc preset list
  - Mobile: `padding: 6px 12px`

---

### Step 2 — Customer Details

**Fields chung (tất cả card type):**
- **Holder Name** (`holderName`) — input text, full width

**Khi `cardType !== Membership`:**
- **Holder Email** (`holderEmail`) — required + email format validation

**Khi `cardType === Membership`:**
- **Member Email** (`memberEmail`) — optional, email format validation; i18n key: `member-email`
- **Birthday** (`holderBirthday`) — `z-date-picker`, optional, format `MMM d, yyyy`; i18n key: `member-birthday`

Layout: `flex flex-wrap gap-2`, mỗi field `flex-1 min-w-[200px]` — tự wrap responsive

---

### Step 3 — Expiration Date *(Required \*, ẩn với GiftCard & PrepaidCard)*

- **Select:** None · 30 Days · 60 Days · Custom Date
- **Date Picker** (`z-date-picker`): hiện khi CustomDate, `minDate = today`, format `MMM d, yyyy`

---

### Step 4 — Value / Discount / Benefits *(Required \*)*

| Card Type | Nội dung |
|-----------|----------|
| **GiftCard / PrepaidCard** | Preset: `$50 · $100 · $250 · $500` + custom input ($) |
| **Discount** | Preset %: `5% · 10% · 15% · 20%` + custom input (%) |
| **Promotion** | Toggle Amount/Discount → preset tương ứng + custom |
| **Membership** | Grid: Monthly Credit · Cashback · Discount · Birthday Gift · Group Discount · Free Lounge; cần ≥1 field |
| **Crypto Card** | ⚠️ Planned |

---

### Step 5 — Purchase Price / Amount *(Required \*)*

- **Membership:** Preset `$50 · $100 · $250 · $500` + custom ($), `Validators.min(1)`
- **Discount:** Preset amounts + custom input ($)

---

### Step 6 — Terms & Conditions

- Ẩn Load/Save buttons khi `cardType === Membership`
- **Title buttons** (desktop: cùng hàng; mobile: hàng mới full width):
  - **Load Terms** → `openLoadTermsDialog()` (LoadTermsDialogComponent, 520px)
  - **Save Terms** → `openSaveTermsDialog()`, disabled khi terms rỗng
- **Textarea:** `rows=5`, multiline
- **Suggested Terms** (`.suggested-terms-grid`): `flex flex-wrap gap-6px`
  - Desktop: badges `width: auto`, `max-width: 100%`
  - Mobile (≤639px): mỗi badge `max-width: calc(50% - 3px)` — 2 item/hàng

  Dữ liệu mẫu (`VOUCHER_CONDITIONS`):
  > 1. "Valid for services only. Not applicable to products."
  > 2. "No cash value."
  > 3. "Valid for one-time use per invoice."
  > 4. "Please present this card before payment."

  - Click badge → `addTag(cond.label)` — append vào textarea (newline separator)
  - Hover: green theme (`--c-primary`)

---

### Step 7 — Payment Method *(Required \*)*

**Payment Methods** (`.payment-methods-grid`): 3 item/hàng mobile

| Method | Label | Icon |
|--------|-------|------|
| `Gift` | Gift | `gift.png` |
| `Cash` | Cash | `cash.png` |
| `Credit` | Credit Card | `credit.png` |
| `Zelle` | Zelle | `zelle.png` |
| `Venmo` | Venmo | `venmo.png` |
| `VlinkPay` | VlinkPay | `vlinkpay.png` |

- **Platform Fee:** hiển thị % + giá trị tính toán (Free nếu ≤ 0)
- **Confirm Issuance** (desktop): `min-w-[280px]`, `h-12`, `text-base`, `font-semibold`

---

## Mobile Fixed Bottom Bar (`.confirm-bar`)

- `position: fixed; bottom: 0`, `z-index: 100`, `sm:hidden`
- `padding-bottom: calc(16px + env(safe-area-inset-bottom, 16px))`
- Background: `rgba(255,255,255,0.96)` + `backdrop-filter: blur`

---

## Payout Preview Popup

| Element | Điều kiện hiển thị |
|---------|-------------------|
| Account name | Luôn hiển thị |
| Edit icon | Luôn hiển thị → mở lại setup dialog |
| QR Code image (160×160) | Chỉ khi `selectedPayoutQrCode` có giá trị |
| "Scan QR Code for payment" | Chỉ khi có QR code |
| "Use account info above" | Khi KHÔNG có QR code |

**SweetAlert2:** `padding: 28px 28px 24px`, `border-radius: 16px`, `width: 360px`

---

## Click Actions

### Header
| Button | Flow |
|--------|------|
| Save for Update Later | Swal loading → API `issueCard(status=Draft)` → Swal success |

### Card Preview
| Button | Flow |
|--------|------|
| TAP TO FLIP / click canvas | Toggle `isFlipped` signal → CSS 3D flip |

### Design Collection
| Element | Flow |
|---------|------|
| Preset color dot | `form.themeColor = c` → re-render canvas |
| Custom color picker | `onColorChange` → `form.themeColor` |
| Text color: Auto | Reset field về `'auto'` |
| Text color: Preset/Custom | Patch field tương ứng |

### Brand Identity
| Button | Flow |
|--------|------|
| Library | `openLogoLibrary()` ⚠️ TODO |
| Upload Logo | Trigger file input → `onLogoUpload()` → FileReader → `renderCanvas()` |
| Style tag | `toggleStyleTag(tag)` → cập nhật `aiLogoDescription` |
| Category dropdown | `onCategorySelect(id)` → đổi prompt list |
| Prompt badge | `useAiPrompt(prompt)` → fill textarea |
| Generate AI | Validate desc → `isGeneratingAiLogo=true` → API → base64 → `renderCanvas()` |

### Step 1
| Element | Flow |
|---------|------|
| Card Type item | `form.cardType` → reset rank/amount/slogan defaults → re-render |
| Rank pill | `toggleRank(r)` — click lại = deselect, extract amount từ rank config |
| Custom Rank input | Focus → deselect; input → `form.rank = value` → `renderCanvas()` |

### Step 6 — Terms
| Button | Flow |
|--------|------|
| Load Terms | Mở `LoadTermsDialogComponent` → chọn template → fill `form.terms` |
| Save Terms | Mở `SaveTermsDialogComponent` → đặt tên → lưu |
| Suggested term badge | `addTag()` → append xuống cuối textarea |

### Step 7 — Payment
| Method + Lần click | Flow |
|--------------------|------|
| Bất kỳ (lần 1) | Chọn radio, không mở popup |
| Zelle/Venmo (lần 2, chưa có account) | Mở `SetUpZelleAccountComponent` (390px) |
| Zelle/Venmo (lần 2, đã có account) | Hiện Swal Payout Preview |
| VlinkPay (lần 2) | Mở `CryptoPaymentComponent`; `result.success` → auto `confirmIssuance()` |
| Edit icon trong Payout popup | Đóng Swal → mở lại setup dialog |

### Confirm Issuance
| Điều kiện | Flow |
|-----------|------|
| `form.invalid` | `markAllAsTouched()` → Swal error validation |
| Valid nhưng `!logoUrl` | Swal warning logo required |
| Valid + có logo | Swal loading → API `issueCard` → generate canvas images (full+masked) → upload → `IssueDigitalSuccessComponent` |

---

## Validation Summary

| Field | Rule |
|-------|------|
| Holder Email | Required (non-Membership) + email format |
| Expiration Type | Required khi applicable |
| Custom Date | Required khi chọn CustomDate |
| Amount / Custom Amount | Min/Max theo card type |
| Discount Percent | 1–100 |
| Purchase Price | Min = 1 |
| Benefits (Membership) | At least one required |
| Payment Method | Required |

---

## CSS Design Tokens

```scss
--c-primary: #00AB55
--c-primary-low: rgba(0,171,85,0.08)
--c-border: #e2e8f0
--c-surface: #ffffff
--c-surface-subtle: #f8fafc
--c-text-1: #212B36
--c-text-2: #454F5B
--c-text-3: #637381
--radius-xs: 6px  --radius-sm: 8px  --radius-md: 12px
--radius-lg: 16px  --radius-xl: 20px
--shadow-sm / --shadow-md
--transition-base: 0.2s ease
```

---

## Responsive Breakpoints

| Breakpoint | prefix | px |
|------------|--------|----|
| Mobile | (default) | < 640px |
| SM | `sm:` | ≥ 640px |
| MD | `md:` | ≥ 768px |
| LG | `lg:` | ≥ 1024px |
| XL | `xl:` | ≥ 1200px |

---

## Pending / TODO

- [ ] `openLogoLibrary()` — chưa implement, tạm hiện button
- [ ] Save business info — button hiển thị nhưng chưa có action handler
- [ ] Category dropdown (Step 1) — ẩn `*ngIf="false"`, chưa enable
- [x] **Crypto Card** (`CardType.CryptoCard = 5`) — đã thêm vào `CARD_TYPES` sau Membership với `disabled: true`
  - [x] Enum value thêm vào `issue-digital.constant.ts`
  - [x] Icon dùng `PrepaidCard.svg`
  - [x] Translation key `card-types.crypto-card` = "Crypto Card"
  - [ ] Xác định Step 3/4/5/6 hiển thị gì khi chọn Crypto Card
  - [ ] Xác định payment method hợp lệ cho Crypto Card
  - [ ] Bỏ `disabled: true` khi implement xong
