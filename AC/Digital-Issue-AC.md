# Acceptance Criteria — Issue Digital Card (HTML)

**File:** `issue-digital.html`  
**Route / Page:** Issue Digital Card screen  
**Last updated:** 2026-03-12

---

## 1. Layout tổng thể

- **Desktop (lg):** 2 cột — `.create-card-layout`: `grid-template-columns: 420px 1fr`, `gap: 28px`, `align-items: start`
- **Left panel:** 420px — Card Preview, Design Collection, Brand Identity, Business Information
- **Right panel:** flex-1 — Form steps (7 steps), required note trên cùng
- **Mobile:** 1 cột, left panel trước, right panel sau
- Font: **Poppins** (400, 500, 600, 700, 800)
- Design tokens: `--c-primary`, `--c-border`, `--c-surface`, `--c-text-1/2/3`, `--radius-*`, `--transition-base`

---

## 2. Header (top of page)

| Element                   | Mô tả                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Save for Update Later** | Button góc phải; click → `confirmIssuance('DRAFT')` (hoặc tương đương). Có thể disabled khi loading. |

---

## 3. LEFT PANEL

### 3.1 Card 1 — Card Preview

- **Container:** `.panel-card`, `.panel-card-header.no-collapse` (không đóng/mở)
- **Title:** icon card + `.header-title` (#previewCardHeaderTitle — tên loại card đang chọn) + button **TAP TO FLIP**
- **TAP TO FLIP:** `.flip-btn`, click → `flipCard(event)`; click vào `.card-inner` (#cardInner) cũng flip
- **Preview:** 3D flip (`.card-flip-container`, `.card-inner`, `.card-face.card-front`, `.card-face.card-back`)
  - **Front:** logo (#cardLogoBox), brand (#previewCardTitle, #previewSlogan), value badge (#cfValueBadge, ẩn mặc định), card number (●●●●), VALID THRU (#cfExpiryRow, #cfExpiryDate — ẩn mặc định), holder (#previewHolderName, #previewRank), type badge (#cardTypeBadge), VLinkPay pill
  - **Back:** PIN stripe, Terms text (#cbMerchantTC), QR box, contact (merchant name #cbMerchantName, phone #cbPhone, email #cbEmail, website #cbWebsite)
- Section **không** collapsible.

### 3.2 Card 2 — Design Collection

- **Collapsible:** click `.panel-card-header` (#hdr-design) → `toggleSection('design-collection','hdr-design')`; body `#design-collection` (.collapse-wrap)
- **Preset Colors:** `.color-dots` — 12 màu cố định + 1 custom:
  - #1E293B, #064E3B, #7F1D1D, #4C1D95, #3B82F6, #10B981, #F59E0B, #EC4899, #06B6D4, #8B5CF6, #FFD84D, #DBCD43
  - **Custom:** `.color-dot.color-picker-btn` — icon pipette (`.pick-color-icon`, mdi:eyedropper), `<input type="color">` full overlay; `onchange` → `selectColor(this.parentElement, this.value)` và set background dot
- **CUSTOM TEXT COLOR (ADVANCED):** button `.adv-accordion-trigger` → `toggleSection('adv-text-colors','hdr-adv')`; body `#adv-text-colors` (.collapse-wrap), mặc định đóng
  - **Brand Name & Slogan** — `.text-color-dots`: auto-dot + Blue #3B82F6, Gold #CA8A04, White, Black + `.text-color-picker-btn` (icon + input color)
  - **Card Holder** — cùng cấu trúc
  - **Amount / Value** — cùng cấu trúc
  - Mỗi nhóm: `selectTextColor(this, 'brand'|'holder'|'amount', value)`

### 3.3 Card 3 — Brand Identity

- **Collapsible:** header #hdr-brand → `toggleSection('brand-identity','hdr-brand')`; body `#brand-identity`
- **Header actions:** Library, Upload Logo (trong `.header-actions`), `onclick="event.stopPropagation()"` để không đóng panel
- **Style Tags:** 8 tags (Luxury Gold, Minimalist, Vintage Badge, …); click → toggle active, cập nhật mô tả AI
- **AI Description:** textarea (rows=3) cho mô tả logo
- **Suggested Descriptions:** category dropdown + list prompt; click prompt → fill textarea
- **Generate AI:** button gọi logic generate logo (API / mock)

### 3.4 Card 4 — Business Information

- **Collapsible:** #hdr-bizinfo → `toggleSection('business-info','hdr-bizinfo')`; body `#business-info`
- **Fields:** Brand Name, Slogan, Phone, Email, Website (layout 2 cột desktop)
- **Save** button trong panel (có thể chưa nối backend)

---

## 4. RIGHT PANEL — Form Steps

- **Required note:** `* required fields` (`.required-note`) ở trên cùng
- **Steps:** `.step-card` × 7; mỗi step có `.step-header` (id shdr-1 … shdr-7), `.step-badge`, `.step-title-text`, `.step-chevron`; body `.collapse-wrap` (id scollapse-1 … scollapse-7)
- **Toggle step:** `toggleStep(1..7)` — đóng/mở body tương ứng, xoay chevron

### Step 1 — Select Product _(Required _)\*

- **Card Type Grid:** `.card-type-grid` (#cardTypeGrid)
  - Items: E-Gift Card (0), Membership (2), Crypto Card (disabled, “Coming soon”), Prepaid Card (4), Discount (3), Promotion (1)
  - Click → `selectCardType(this, label, value)`; item có class `.active`, disabled có `.disabled`
- **Rank Grid:** #rankSection, #rankGrid — ẩn khi Prepaid Card
  - Pills: STARTER, BRONZE, SILVER, GOLD, PLATINUM, ELITE + custom input (placeholder "Custom")
  - Click pill → `toggleRank(this)`; custom input `oninput="setCustomRank(this.value)"`, `onfocus="clearRankSelection()"`

### Step 2 — Customer Details

- **Holder Name:** #holderName, placeholder "Enter full name (optional)", `oninput="updateCardHolder(this.value)"`
- **Email:** #holderEmail, placeholder "Enter email address" (đổi khi Membership)
- **Birthday:** #birthdayField (ẩn mặc định), chỉ hiện khi card type = Membership; #holderBirthday dùng **Flatpickr**, format ngày, `maxDate: 'today'`, placeholder "Birthday (optional)"

### Step 3 — Expiration Date _(Required _)\*

- **Select:** #expirationSelect — None (No expiry), 30 Days, 60 Days, Custom Date; `onchange="onExpirationChange()"`
- **Custom Date:** #customDateWrap ẩn mặc định; khi chọn Custom Date thì hiện; #customDate dùng **Flatpickr**, `minDate: 'today'`, format phù hợp

### Step 4 — Value / Discount / Benefits _(Required _)\*

- **Gift/Prepaid (default):** #valueGroup — preset $50, $100, $250, $500 + custom input ($); `selectPreset(this,'amount')`, `clearPresets('amount')`
- **Discount:** #discountGroup (ẩn mặc định) — 5%, 10%, 15%, 20% + custom (%)
- **Promotion:** #promotionGroup (ẩn mặc định) — toggle "By Amount" / "By Discount"; preset amount hoặc discount tương ứng + custom
- **Membership:** #membershipBenefits (ẩn mặc định) — **Tom Select** #mbBenefitSelect (multiple, placeholder "Select Benefit"); #mbSelectedArea, #mbCardsRow, #mbEmptyHint "No benefits selected yet"; cần ≥1 benefit khi type = Membership

### Step 5 — Purchase Price _(Required _)\*

- Preset $50, $100, $250, $500 + custom (#customPrice); `selectPreset(this,'price')`, `clearPresets('price')`

### Step 6 — Terms & Conditions

- **Actions (header):** Load Terms, Save Terms — `loadTerms()`, `saveTerms()` (có thể mở modal / chưa implement)
- **Textarea:** #termsTextarea, rows=5, placeholder "Enter terms and conditions...", `oninput="syncTermsToCard()"` (đồng bộ lên mặt sau card)
- **Suggested Terms:** `.term-chip` — click → `addTerm('...')` append vào textarea (ví dụ: "Valid for services only...", "No cash value", "One-time use only", "Present before payment")

### Step 7 — Payment Method _(Required _)\*

- **Payment grid:** `.payment-method` — Gift, Cash, Credit Card, Zelle, Venmo, VlinkPay; click → `selectPayment(this, method)`; class `.active` khi được chọn
- **Platform Service Fee:** #feeDisplay (ví dụ "1.5%", giá trị $)
- **Confirm (desktop):** `.btn-confirm-desktop` → `confirmIssuance()`

---

## 5. Mobile

- **Confirm bar:** fixed bottom (`.confirm-bar` hoặc tương đương), padding có safe-area; button Confirm cho mobile
- Steps / panels có thể đóng mặc định trên mobile (tùy thiết kế)

---

## 6. Click Actions & Logic (tóm tắt)

| Khu vực               | Hành động                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Card Preview**      | TAP TO FLIP / click card → flipCard(event)                                                                                       |
| **Design Collection** | Preset color → selectColor(el, hex); custom → input color onchange; text color → selectTextColor(el, brand/holder/amount, value) |
| **Step 1**            | selectCardType(el, label, value); toggleRank(el); setCustomRank(val); clearRankSelection()                                       |
| **Step 2**            | updateCardHolder(val); (email/birthday theo card type)                                                                           |
| **Step 3**            | onExpirationChange(); Flatpickr cho #customDate                                                                                  |
| **Step 4**            | selectPreset(el, type); clearPresets(type); setPromoMode(el, amount/discount); Tom Select benefits                               |
| **Step 5**            | selectPreset(el, 'price'); clearPresets('price')                                                                                 |
| **Step 6**            | addTerm(text); syncTermsToCard(); loadTerms(); saveTerms()                                                                       |
| **Step 7**            | selectPayment(el, method); confirmIssuance()                                                                                     |
| **Header**            | Save for Update Later → confirmIssuance('DRAFT') (hoặc tương đương)                                                              |

---

## 7. Validation (logic cần có)

- Step 1: Card type required (trừ khi cho phép mặc định)
- Step 2: Email required (khi không phải Membership); format email
- Step 3: Expiration required khi áp dụng (không ẩn); Custom Date required khi chọn Custom
- Step 4: Value/Amount/Discount/Benefits theo card type; Membership ≥1 benefit
- Step 5: Purchase price required, min (ví dụ 1)
- Step 7: Payment method required
- Confirm: form valid + (có thể kiểm tra logo/terms) → gọi API / success flow

---

## 8. Thư viện / Assets

- **Flatpickr:** CDN (css + js); dùng cho #customDate, #holderBirthday
- **Tom Select:** CDN; dùng cho #mbBenefitSelect (multi-select benefits)
- **Icons:** Lucide (data-lucide), Iconify (iconify-icon); Solar, mdi (eyedropper cho color picker)
- **Images:** payment icons (gift, cash, credit, zelle, venmo, vlinkpay), VLinkPay pill — URL staging-merchant.vlinkpay.com

---

## 9. CSS Design Tokens (issue-digital.html)

```css
--c-primary: #00a76f --c-primary-low: rgba(0, 167, 111, 0.08)
  --c-border: #e2e8f0 --c-surface: #ffffff --c-surface-subtle: #f8fafc
  --c-text-1: #212b36 --c-text-2: #454f5b --c-text-3: #637381 --radius-xs: 6px
  --radius-sm: 8px --radius-md: 12px --radius-lg: 16px --radius-xl: 20px
  --transition-base: 0.2s ease;
```

---

## 10. Responsive

- Layout 2 cột → 1 cột khi màn nhỏ (grid / media query)
- Step headers: chevron rotate khi open/close
- Payment grid: 3 cột trên mobile (nếu có định nghĩa)
- Confirm button: desktop trong step 7; mobile trong bar cố định dưới

---

## 11. Pending / TODO

- [ ] Load Terms / Save Terms — modal hoặc API chưa nối
- [ ] Brand Identity: Library, Upload Logo, Generate AI — logic đầy đủ
- [ ] Business Info Save — action handler
- [ ] Crypto Card — đang disabled; khi bật cần Step 3/4/5/6 và payment phù hợp
- [ ] confirmIssuance() — tích hợp API issue card, upload ảnh, redirect success
