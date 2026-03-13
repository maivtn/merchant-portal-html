# Acceptance Criteria: Membership Package Preview Card

## 1. Overview

**Component Name:** Preview Card  
**Context:** Create Benefit Package screen  
**Description:** Card hiển thị preview trực quan của membership package đang được tạo/chỉnh sửa. Design theo phong cách premium với gradient background, hiển thị tên gói, giá, discount, số lượng benefits và danh sách benefits chi tiết. Hỗ trợ dynamic theming với brand color và accent color có thể customize.

---

## 2. Functional Requirements

### FR-1: Card Container Layout
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn thấy preview card với design premium để visualize package đang tạo.

**Acceptance Criteria:**
- [ ] Card Container:
  - Border radius: 16px (rounded-2xl)
  - Padding: 24px all sides
  - Min height: 376px
  - Overflow: hidden (clip content vượt border radius)
  - Position: relative (cho absolute positioned children)

- [ ] Background Gradient:
  - Type: Linear gradient
  - Angle: 109.907deg
  - Color stops:
    - 8.4861%: `{brandColor}` (dynamic)
    - 50%: `#1f2937` (dark gray center)
    - 91.514%: `{brandColor}` (dynamic)
  - Creates a dark center với brand color ở 2 đầu

- [ ] Card Border:
  - Width: 1px solid
  - Color: `rgba(255, 255, 255, 0.07)` (subtle white overlay)
  - Tạo hiệu ứng frosted glass subtle

---

### FR-2: Save Discount Badge (Top-Left)
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn thấy rõ phần trăm discount được save để đánh giá giá trị package.

**Acceptance Criteria:**
- [ ] Badge Position:
  - Position: absolute top-left corner
  - Top: 0, Left: 0

- [ ] Badge Shape:
  - Border radius:
    - Top-left: 16px (rounded-tl-2xl, matching card corner)
    - Bottom-right: 24px (rounded-br-3xl, smooth curve)
    - Top-right: 0 (sharp)
    - Bottom-left: 0 (sharp)
  - Creates a curved "flag" effect từ góc top-left

- [ ] Badge Background:
  - Color: `{accentColor}` (dynamic, typically orange #F7931A)
  - Solid fill, no gradient

- [ ] Badge Content:
  - Text format: "SAVE {discount}%"
  - Example: "SAVE 15%", "SAVE 20%"
  - Font size: 10px
  - Font weight: 700 (bold)
  - Text color: white
  - Letter spacing: 0.5px
  - Text transform: uppercase
  - Padding: 4px vertical, 12px horizontal

- [ ] Dynamic Value:
  - `{discount}` variable từ form input
  - Display integer only (no decimals)
  - Always visible (not conditional)

---

### FR-3: Most Popular Badge (Top-Right)
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn đánh dấu package là "Most Popular" để highlight nó với customers.

**Acceptance Criteria:**
- [ ] Conditional Rendering:
  - Only show khi `isPopular === true`
  - Checkbox/toggle trong form để control visibility

- [ ] Badge Position:
  - Position: absolute top-right corner
  - Top: 0, Right: 0

- [ ] Badge Shape:
  - Border radius:
    - Bottom-left: 24px (rounded-bl-3xl)
    - Bottom-right: 24px (rounded-br-3xl)
    - Top corners: 0 (sharp, flush với card edge)
  - Creates a curved tab hanging từ top edge

- [ ] Badge Background:
  - Color: white (solid)
  - No gradient, high contrast với dark card background

- [ ] Badge Content:
  - Text: "Most Popular" (fixed text, không dynamic)
  - Font size: 10px
  - Font weight: 700 (bold)
  - Text color: black
  - No letter spacing (default)
  - No text transform (normal case)
  - Padding: 4px vertical, 12px horizontal

- [ ] Badge Priority:
  - Z-index higher than card content (ensure visible)
  - Không overlap với Save badge

---

### FR-4: Package Icon
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn có icon đại diện cho package để tạo visual identity.

**Acceptance Criteria:**
- [ ] Icon Container:
  - Position: Center horizontally
  - Margin top: 40px (mt-10, space từ top badges)
  - Width: 56px (w-14)
  - Height: 56px (h-14)
  - Display: flex, items và justify center
  - Border radius: 50% (fully circular)

- [ ] Icon Border:
  - Width: 2px solid
  - Color: `{accentColor}` (dynamic)
  - Creates a glowing ring effect

- [ ] Icon Glow Effect:
  - Box shadow: `0 0 15px 0 {accentColor}80`
  - Blur radius: 15px
  - Spread: 0
  - Color: accentColor với 50% opacity (80 in hex = 128/255)
  - Creates a soft glowing aura

- [ ] Icon Symbol:
  - Character: "₿" (Bitcoin symbol, Unicode U+20BF)
  - Font size: 24px (text-2xl)
  - Color: Inherited from parent (likely white or accentColor)
  - Center aligned trong container

- [ ] Future Enhancement:
  - Support custom icon upload
  - Icon library selection
  - Different cryptocurrency symbols
  - Brand logo option

---

### FR-5: Package Name Display
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn thấy package name được hiển thị prominent để identify package.

**Acceptance Criteria:**
- [ ] Text Content:
  - Dynamic value: `{displayPackageName}`
  - Fallback: "PACKAGE" (nếu chưa nhập name)
  - Text transform: Uppercase (automatic)

- [ ] Typography:
  - Font family: "Playfair Display", serif (elegant, high-end feel)
  - Font size: 22px
  - Font weight: 700 (bold)
  - Letter spacing: 2.2px (10% of font size, very expanded)
  - Creates luxury, premium appearance

- [ ] Color:
  - Text color: `{accentColor}` (dynamic)
  - Creates visual hierarchy với accent color

- [ ] Spacing:
  - Text align: center
  - Margin top: 16px (mt-4)
  - Margin bottom: 16px (mb-4)
  - Clear separation từ icon và price

- [ ] Responsive Considerations:
  - Text không wrap (single line preferred)
  - Long names có thể shrink font size (future enhancement)
  - Truncate với ellipsis nếu quá dài (max-width constraint)

---

### FR-6: Price Display
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn thấy giá package rõ ràng và prominent.

**Acceptance Criteria:**
- [ ] Layout:
  - Text align: center
  - Margin bottom: 4px (mb-1)
  - Flex row inline (price + period together)

- [ ] Price Value:
  - Prefix: "$" (dollar sign)
  - Dynamic value: `{finalPrice}` (calculated price)
  - Font size: 32px (large, prominent)
  - Font weight: 700 (bold)
  - Color: white (high contrast trên dark background)
  - Format: No decimals nếu whole number, 2 decimals nếu có cents
  - Examples: "$99", "$149.99"

- [ ] Billing Period:
  - Text: "/yr" (per year)
  - Font size: 13px (much smaller than price)
  - Color: #99a1af (muted gray)
  - Position: Inline, right after price value
  - Vertical align: baseline (aligned với bottom của price number)

- [ ] Pricing Logic:
  - `finalPrice` = original price - discount
  - Discount calculated từ discount % input
  - Always display positive value
  - Round to 2 decimal places

---

### FR-7: Benefits Count Badge
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn biết có bao nhiêu benefits trong package để evaluate value.

**Acceptance Criteria:**
- [ ] Text Content:
  - Format: "{count} Benefits"
  - Dynamic count: `{selectedBenefits.length}`
  - Singular/plural handling:
    - If count === 1: "1 Benefit"
    - If count !== 1: "{count} Benefits"
  - Examples: "3 Benefits", "5 Benefits"

- [ ] Typography:
  - Font size: 12px (small, subtle)
  - Text color: #6a7282 (muted gray)
  - Letter spacing: 0.5px (slightly expanded)
  - Text transform: uppercase
  - Creates a subtle label appearance

- [ ] Spacing:
  - Text align: center
  - Margin bottom: 16px (mb-4)
  - Positioned between price và divider

---

### FR-8: Decorative Divider
**Priority:** LOW  
**User Story:** Là người dùng, tôi muốn có visual separator giữa package info và benefits list.

**Acceptance Criteria:**
- [ ] Divider Styling:
  - Height: 1px (thin line)
  - Width: 100% (full card width)
  - Margin: 0 horizontal, 16px bottom (mb-4)

- [ ] Gradient Background:
  - Type: Linear gradient
  - Direction: Horizontal (90deg, left to right)
  - Color stops:
    - 0%: transparent (fade in từ left edge)
    - 50%: `rgba(247, 147, 26, 0.25)` (orange accent color, 25% opacity)
    - 100%: transparent (fade out at right edge)
  - Creates a subtle glowing line effect

- [ ] Visual Purpose:
  - Separates header info (name, price, count) from benefits list
  - Adds subtle decorative element
  - Maintains brand color consistency

---

### FR-9: Benefits List Display
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn thấy danh sách tất cả benefits included trong package.

**Acceptance Criteria:**

#### Benefits Container:
- [ ] Layout:
  - Display: flex column
  - Gap between items: 16px (space-y-4)
  - Full width của card (accounting for card padding)

#### Individual Benefit Item:
- [ ] Item Layout:
  - Display: flex row
  - Align items: start (top alignment cho multi-line benefits)
  - Gap: 12px (gap-3 giữa icon và text)

- [ ] Checkmark Icon:
  - SVG size: 14x14px
  - Stroke color: #F7931A (orange, matches accent color)
  - Stroke width: 1.16667px
  - Stroke linecap: round
  - Stroke linejoin: round
  - Path: Checkmark shape "M2.33337 7.00004L5.83337 10.5L11.6667 3.5"
  - Margin top: 2px (mt-0.5, để align với first line của text)

- [ ] Benefit Text:
  - Format: "{benefit.name}: {benefit.value}"
  - Examples:
    - "Monthly Credit: $50"
    - "Cashback: 5%"
    - "Birthday Gift: $20"
  - Font size: 13.6px
  - Line height: 20.4px (1.5x font size)
  - Color: #d1d5dc (light gray, readable trên dark background)
  - Multi-line support: Text wrap nếu quá dài

#### Dynamic Data:
- [ ] Data Source:
  - Array: `selectedBenefits`
  - Each benefit object contains:
    - `id`: Unique identifier
    - `name`: Benefit name
    - `value`: Benefit value (with unit)

- [ ] Empty State:
  - Nếu `selectedBenefits.length === 0`: Không hiển thị gì
  - Hoặc show placeholder: "No benefits selected" (gray text)

#### Benefits Limit:
- [ ] Scrolling (if needed):
  - Max visible benefits: ~8-10 items (depends on card height)
  - If more benefits: Container scrollable
  - Scroll bar: Custom styled (thin, subtle)
  - Or: Truncate list with "+" indicator

---

## 3. UI/UX Specifications

### 3.1 Visual Hierarchy
```
┌─────────────────────────────────────────────┐
│ [SAVE 15%]              [Most Popular]     │ ← Badges (absolute)
│                                             │
│                  ( ₿ )                      │ ← Icon (center, glowing)
│                                             │
│               SILVER                        │ ← Package Name (accent color)
│                                             │
│               $99/yr                        │ ← Price (white, large)
│             3 BENEFITS                      │ ← Count (muted)
│                                             │
│         ─────────────────────                │ ← Divider (gradient)
│                                             │
│  ✓  Monthly Credit: $50                    │ ← Benefits
│  ✓  Cashback: 5%                           │
│  ✓  Birthday Gift: $20                     │
│                                             │
└─────────────────────────────────────────────┘
```

### 3.2 Color System

#### Dynamic Colors (Customizable):
- **Brand Color**: Used in gradient background (start/end)
  - Default: Could be blue, green, purple, etc.
  - Usage: Background gradient 8.49% and 91.51%
  
- **Accent Color**: Primary highlight color
  - Default: #F7931A (orange/bitcoin color)
  - Usage: Save badge, icon border/glow, package name, checkmarks, divider

#### Static Colors:
- **Dark Gray Center**: #1f2937 (gradient middle point)
- **White**: #ffffff (save badge text, price)
- **Black**: #000000 (most popular badge text)
- **Light Gray Text**: #d1d5dc (benefits text)
- **Muted Gray**: #99a1af (price period), #6a7282 (benefits count)
- **Border**: rgba(255,255,255,0.07) (subtle white overlay)

### 3.3 Typography System

| Element | Font Family | Size | Weight | Color | Transform |
|---------|------------|------|--------|-------|-----------|
| Save Badge | Inherited | 10px | 700 | white | uppercase |
| Popular Badge | Inherited | 10px | 700 | black | none |
| Package Name | Playfair Display | 22px | 700 | accent | uppercase |
| Price Value | Inherited | 32px | 700 | white | none |
| Price Period | Inherited | 13px | 400 | #99a1af | none |
| Benefits Count | Inherited | 12px | 400 | #6a7282 | uppercase |
| Benefit Text | Inherited | 13.6px | 400 | #d1d5dc | none |

### 3.4 Spacing System

- **Card Padding**: 24px all sides
- **Section Gaps**:
  - Top badges → Icon: 40px
  - Icon → Name: 16px
  - Name → Price: 16px
  - Price → Count: 4px
  - Count → Divider: 16px
  - Divider → Benefits: 16px
  - Between benefits: 16px
- **Badge Padding**: 4px vertical, 12px horizontal
- **Icon → Text Gap**: 12px

### 3.5 Border Radius System

- **Card**: 16px (rounded-2xl)
- **Save Badge**: 
  - TL: 16px (rounded-tl-2xl)
  - BR: 24px (rounded-br-3xl)
- **Popular Badge**:
  - BL: 24px (rounded-bl-3xl)
  - BR: 24px (rounded-br-3xl)
- **Icon Circle**: 50% (fully round)

### 3.6 Shadow & Effects

- **Icon Glow**: `0 0 15px 0 {accentColor}80`
  - Soft radial glow
  - 50% opacity
  - No offset, pure glow

- **Card Border**: `1px solid rgba(255,255,255,0.07)`
  - Subtle frosted glass effect
  - Enhances depth

---

## 4. Data Requirements

### 4.1 Input Props
```typescript
interface PreviewCardProps {
  // Package Info
  displayPackageName: string;      // Package name (e.g., "SILVER")
  brandColor: string;               // HEX color for gradient (e.g., "#3b82f6")
  accentColor: string;              // HEX color for accents (e.g., "#F7931A")
  finalPrice: number;               // Calculated price after discount
  finalDiscount: number;            // Discount percentage (e.g., 15)
  isPopular: boolean;               // Show "Most Popular" badge
  
  // Benefits
  selectedBenefits: Benefit[];      // Array of selected benefits
}

interface Benefit {
  id: string;                       // Unique ID
  name: string;                     // Benefit name (e.g., "Monthly Credit")
  value: string;                    // Benefit value với unit (e.g., "$50", "5%")
}
```

### 4.2 Computed Values
- `finalPrice`: Calculated from original price - (original price × discount%)
- `selectedBenefits.length`: Count of benefits to display
- Gradient stops: Fixed percentages (8.4861%, 50%, 91.514%)

---

## 5. Business Rules

### BR-1: Color Theming
- Brand color và accent color phải customizable
- Accent color used consistently across all highlight elements
- Color contrast must be readable (white text on dark bg, black on white bg)

### BR-2: Badge Visibility
- Save badge: Always visible (assumes there's always a discount)
- Most Popular badge: Conditional based on `isPopular` flag
- Both badges can show simultaneously (không mutual exclusive)

### BR-3: Benefits Display
- Maximum recommended benefits: 8-10 items (for readability)
- No minimum required (có thể 0 benefits)
- Text wrapping allowed cho long benefit descriptions
- Order: Display theo thứ tự trong `selectedBenefits` array

### BR-4: Price Formatting
- Always show dollar sign prefix
- Always show "/yr" suffix
- Round to 2 decimal places
- No thousand separators needed (assuming < $10,000)

### BR-5: Icon Constraints
- Currently hardcoded Bitcoin symbol "₿"
- Future: Support custom icons/symbols
- Icon size fixed at 56x56px
- Border và glow color always match accent color

---

## 6. Edge Cases & Error Handling

### EC-1: Missing/Empty Data
- **No package name**: Show fallback "PACKAGE"
- **Price = 0**: Show "$0/yr" (valid free package)
- **Discount = 0**: Show "SAVE 0%" (not ideal, but functional)
- **No benefits**: Empty list, just header info visible

### EC-2: Very Long Text
- **Long package name**: 
  - Truncate with ellipsis
  - Or reduce font size (responsive scaling)
  - Max recommended: 15 characters
- **Long benefit text**: 
  - Allow multi-line wrap
  - Max 2-3 lines before truncate

### EC-3: Many Benefits
- **> 10 benefits**: 
  - Card grows vertically (min-height only)
  - Or add scroll within benefits section
  - Or show "View all X benefits" link

### EC-4: Color Accessibility
- **Low contrast accent color**: 
  - Validate contrast ratio
  - Suggest darker/lighter variation
  - Ensure readability on dark background

### EC-5: Invalid Colors
- **Invalid HEX format**: Fallback to default colors
- **Undefined colors**: Use sensible defaults (#3b82f6, #F7931A)

---

## 7. Testing Scenarios

### TS-1: Default Rendering
**Steps:**
1. Load preview card với default values
2. Verify all elements visible
3. Check gradient renders correctly

**Expected:**
- Card displays with smooth gradient
- Both badges visible (if data provided)
- Icon centered with glow effect
- All text properly formatted

---

### TS-2: Dynamic Color Changes
**Steps:**
1. Set brand color to blue (#3b82f6)
2. Set accent color to orange (#F7931A)
3. Observe all accent-colored elements

**Expected:**
- Gradient uses blue at start/end
- Save badge, icon border, name, checkmarks all orange
- Smooth color transition when values change

---

### TS-3: Popular Badge Toggle
**Steps:**
1. Set `isPopular = true`
2. Verify "Most Popular" badge appears
3. Set `isPopular = false`
4. Verify badge disappears

**Expected:**
- Badge appears/disappears without layout shift
- No overlap với other elements
- Smooth transition

---

### TS-4: Benefits List Variations
**Steps:**
1. Test with 0 benefits
2. Test with 1 benefit
3. Test with 5 benefits
4. Test with 15 benefits

**Expected:**
- 0: Empty space, count shows "0 Benefits"
- 1: Single item, count shows "1 Benefit"
- 5: List displays normally
- 15: Card grows or scrolls, all benefits visible

---

### TS-5: Long Text Handling
**Steps:**
1. Enter very long package name (30+ chars)
2. Enter long benefit description (100+ chars)
3. Observe text behavior

**Expected:**
- Package name truncates or shrinks
- Benefit text wraps to multiple lines
- No overflow outside card boundaries

---

### TS-6: Price Display Variations
**Steps:**
1. Test price: $0
2. Test price: $99
3. Test price: $149.99
4. Test price: $1234.56

**Expected:**
- All prices display correctly
- Proper decimal formatting
- "/yr" suffix always visible
- Large numbers don't break layout

---

## 8. Implementation Notes

### 8.1 Gradient Calculation
```css
background: linear-gradient(
  109.907deg,
  {brandColor} 8.4861%,
  #1f2937 50%,
  {brandColor} 91.514%
)
```
- Angle: 109.907deg (diagonal, top-left to bottom-right)
- Creates dark center with colored edges
- Symmetrical color placement

### 8.2 Glow Effect
```css
box-shadow: 0 0 15px 0 {accentColor}80;
```
- No offset (centered glow)
- 15px blur radius
- 50% opacity via hex alpha (80 = 128/255)
- Creates soft halo around icon

### 8.3 Dynamic Values
- All dynamic values should update in real-time
- Use React state/props for reactivity
- Preview updates as user types in form

### 8.4 Responsive Considerations
- Card width: Flexible (parent container controls)
- Height: Min 376px, grows with content
- Font sizes: Fixed (not responsive yet)
- Future: Scale down for mobile

---

## 9. Accessibility Requirements

### A-1: Color Contrast
- [ ] White text on dark gradient: ≥ 4.5:1 ratio
- [ ] Accent color text on dark: ≥ 4.5:1 ratio
- [ ] Badge text contrast: WCAG AA compliant

### A-2: Semantic HTML
- [ ] Use semantic tags where appropriate
- [ ] Package name: `<h3>` or `<h4>`
- [ ] Benefits list: `<ul>` with `<li>` items
- [ ] Icon: Proper SVG with title/aria-label

### A-3: Screen Reader Support
- [ ] Badges announced: "Save 15 percent" / "Most Popular"
- [ ] Price announced: "99 dollars per year"
- [ ] Benefits announced: "3 benefits included"
- [ ] List items announced properly

### A-4: Keyboard Navigation
- [ ] Card itself not interactive (display only)
- [ ] Future: If card clickable, ensure focus visible

---

## 10. Future Enhancements

### FE-1: Custom Icons
- Upload custom icon/logo
- Icon library selection
- Different crypto symbols
- Brand logo support

### FE-2: Animation
- Card entrance animation
- Badge fade in/out
- Icon glow pulse effect
- Benefits list slide-in

### FE-3: Interactive Elements
- Click card to expand details
- Hover to highlight benefits
- "Select this package" button
- Compare with other packages

### FE-4: Theming Presets
- Pre-defined color schemes
- Gold, Silver, Platinum themes
- Dark mode support
- Seasonal themes

### FE-5: Benefits Icons
- Show icon cho mỗi benefit
- Match benefit type (dollar, percent, gift)
- Consistent với benefit creation icons

### FE-6: Responsive Scaling
- Auto font-size adjustment
- Mobile-optimized layout
- Horizontal card variant
- Compact mode

---

## 11. Definition of Done

- [ ] Card renders với correct gradient background
- [ ] Both badges display correctly (conditional logic works)
- [ ] Icon renders với glow effect
- [ ] Package name displays với Playfair font
- [ ] Price formats correctly với period
- [ ] Benefits count accurate
- [ ] Divider gradient renders
- [ ] Benefits list displays all items
- [ ] Checkmark SVGs render correctly
- [ ] Dynamic colors apply throughout
- [ ] No layout overflow or clipping
- [ ] Accessible to screen readers
- [ ] Color contrast meets WCAG AA
- [ ] Real-time preview updates work
- [ ] Code reviewed and approved
- [ ] Visual QA approved by designer

---

**Document Version:** 1.0  
**Last Updated:** 2025-03-12  
**Component:** Preview Card  
**Parent Screen:** Create Benefit Package
