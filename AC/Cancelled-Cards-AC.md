# Acceptance Criteria: Cancelled Cards

## 1. Overview

**Feature Name:** Cancelled Cards  
**Module:** Gift & Voucher Management  
**Description:** Màn hình hiển thị danh sách tất cả các thẻ/card đã bị hủy trong hệ thống VLINKPAY. Cho phép xem, tìm kiếm, lọc theo nhiều tiêu chí (platform, category, date range) và xem chi tiết thông tin về lý do hủy, người thực hiện và thời gian hủy. Hỗ trợ nhiều loại card: Gift card, Promotion, Discount, Membership, Prepaid, E-Gift, E-Voucher, Crypto Card.

---

## 2. Functional Requirements

### FR-1: Page Layout & Header
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn có giao diện rõ ràng để quản lý và theo dõi các card đã bị hủy.

**Acceptance Criteria:**
- [ ] Page Header:
  - Title: "Cancelled Cards" (font size 22px desktop / 18px mobile, bold, color #161c24)
  - Breadcrumb (desktop only): "Gift & Voucher > Cancelled Cards"
    - "Gift & Voucher": Color #637381, weight 400
    - Separator: Dot (4x4px, color #919eab)
    - "Cancelled Cards": Color #212b36, weight 500
    - Font size: 14px

- [ ] Page Background: #f9fafb
- [ ] Content Container:
  - White card với border radius 16px
  - Box shadow: `0 0 2px 0 rgb(145 158 171 / 0.2), 0 12px 24px -4px rgb(145 158 171 / 0.12)`
  - Overflow: hidden

- [ ] Responsive Padding:
  - Desktop: 40px horizontal, 104px top, 40px bottom
  - Mobile: 12px horizontal, 64px top, 32px bottom

---

### FR-2: Platform Tab Navigation
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn lọc cancelled cards theo platform để xem riêng các cards từ Store hoặc VLINKPAY Platform.

**Acceptance Criteria:**
- [ ] 3 Platform Tabs:
  1. **All** (default)
  2. **VLINKPAY Platform**
  3. **Store**

- [ ] Tab Styling:
  - Minimal underline design
  - Active tab:
    - Border bottom: 2px solid #161c24 (black)
    - Font weight: 700
    - Text color: #161c24
  - Inactive tab:
    - Border bottom: 2px solid transparent
    - Font weight: 500
    - Text color: #637381
  - Font size: 12px mobile / 14px desktop
  - Padding: 14px vertical, 4px horizontal
  - Margin right: 16px (mobile) / 28px (desktop)
  - Margin bottom: -1px (để overlap border)
  - Smooth transition: color 0.15s, border-color 0.15s

- [ ] Tab Behavior:
  - Click tab: Switch platform filter
  - Reset pagination về page 1
  - Data table update tương ứng
  - Column visibility change (xem FR-4)

- [ ] Border Separator:
  - Border bottom: 1px solid #f4f6f8
  - Full width

---

### FR-3: Category Chip Tabs
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn lọc nhanh cancelled cards theo category để tìm đúng loại card cần xem.

**Acceptance Criteria:**
- [ ] 9 Category Options:
  1. **All** (default)
  2. **Gift card**
  3. **Promotion**
  4. **Discount**
  5. **Membership**
  6. **Prepaid card**
  7. **E-Gift card**
  8. **E-Voucher**
  9. **Crypto Card**

- [ ] Chip Styling:
  - Border radius: 20px (fully rounded pill)
  - Active chip:
    - Background: #00a76f (green)
    - Text color: #ffffff
    - Font weight: 700
    - Border: none
  - Inactive chip:
    - Background: transparent
    - Text color: #637381
    - Font weight: 500
    - Border: 1px solid #dfe3e8
  - Padding: 4px 10px
  - Font size: 12px mobile / 14px desktop
  - Cursor: pointer
  - Smooth transition: all 0.15s

- [ ] Layout:
  - Flex wrap (multiple rows nếu cần)
  - Gap: 6px mobile / 8px desktop
  - Padding container: 8px mobile / 14px desktop
  - Border bottom: 1px dashed rgba(145, 158, 171, 0.24)

- [ ] Chip Behavior:
  - Click chip: Toggle category filter
  - Chỉ 1 chip active tại 1 thời điểm
  - Reset pagination về page 1
  - Update data table

---

### FR-4: Data Table Columns & Dynamic Visibility
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn xem đầy đủ thông tin về các card đã hủy, với columns hiển thị phù hợp theo từng platform.

**Acceptance Criteria:**

#### All Columns (Store Platform):
- [ ] **Product ID** (width 120px, sortable):
  - Format: "#PRD-20301", "#PRD-20302"
  - Font size: 13px
  - Color: #637381

- [ ] **Product Name** (width 150px, sortable):
  - Tên product (e.g., "Gift Card", "Promotion Card")
  - Font size: 14px
  - Font weight: 600
  - Color: #212b36

- [ ] **Product Status** (width 140px, sortable):
  - Badge với text "CANCELLED"
  - Background: #ffe4de
  - Text color: #b71d18
  - Font size: 11px
  - Font weight: 400
  - Letter spacing: 0.4px
  - Padding: 3px 10px
  - Border radius: 6px
  - Display: inline-block

- [ ] **Card Number** (width 150px, sortable):
  - Format: "0438 **** **** 7108"
  - Thêm 1 section **** ở giữa (4 sections total)
  - Font family: monospace
  - Font size: 13px
  - Color: #212b36
  - Nếu value = "-": Hiển thị "—"
  - **HIDDEN** khi platform = "VLINKPAY Platform"

- [ ] **Amount** (width 100px, sortable):
  - Format: "$200.00", "$150.00"
  - Font size: 14px
  - Font weight: 600
  - Color: #212b36
  - Nếu value = "-": Hiển thị "—"

- [ ] **Discount (%)** (width 110px, sortable):
  - Format: "15%", "20%"
  - Font size: 13px
  - Color: #212b36
  - Text align: center
  - Nếu value = "-": Hiển thị "—"
  - **HIDDEN** khi platform = "VLINKPAY Platform"

- [ ] **Cancel Reason** (sortable, flexible width):
  - Lý do hủy (e.g., "Customer request", "Fraud suspicion")
  - Font size: 13px
  - Color: #637381
  - No width constraint, can wrap if needed

- [ ] **Cancelled By** (width 140px, sortable):
  - Email người thực hiện cancel
  - Font size: 13px
  - Color: #212b36
  - Whitespace: nowrap

- [ ] **Cancelled Date** (width 180px, sortable):
  - Format: "Jan 15, 2028 09:20 AM"
  - Font size: 13px
  - Color: #637381
  - Whitespace: nowrap

#### Table Styling:
- [ ] Header Row:
  - Background: #f9fafb
  - Padding: 12px 16px (first column: 12px 16px 12px 24px)
  - Font size: 13px, weight 600
  - Color: #637381
  - Border bottom: 1px solid #f4f6f8
  - Text align: left
  - Cursor: pointer (sortable columns)
  - User select: none

- [ ] Data Rows:
  - Padding: 14px 16px (first column: 14px 16px 14px 24px)
  - Border top: 1px dashed rgba(145,158,171,0.24)
  - Group hover: background #f9fafb
  - Smooth transition: background-color

- [ ] Min Width Table: 1100px (horizontal scroll nếu cần)

- [ ] Empty State:
  - Message: "No cancelled cards found"
  - Colspan: All visible columns
  - Padding: 48px 24px
  - Text align: center
  - Color: #919eab
  - Font size: 14px

---

### FR-5: Mobile Card View
**Priority:** HIGH  
**User Story:** Là người dùng mobile, tôi muốn xem cancelled cards trong format card dễ đọc và tiện thao tác.

**Acceptance Criteria:**
- [ ] Card Container:
  - Background: white
  - Border: 1px solid #f4f6f8
  - Border radius: 12px
  - Box shadow: `0 0 2px 0 rgb(145 158 171 / 0.1)`
  - Padding: 16px
  - Gap giữa cards: 12px

- [ ] Card Header:
  - Layout: Flex row, space-between
  - Left side:
    - **Product Name**: Font 15px, weight 700, color #212b36
    - **Product ID**: Font 12px, color #637381, margin-top 4px
  - Right side (flex column, items-end):
    - **Amount** (if not "-"): Font 14px, weight 700, color #007b55
    - **Status Badge**: Same styling as desktop

- [ ] Dashed Divider:
  - Border top: 1px dashed rgba(145,158,171,0.24)
  - Margin: 12px vertical

- [ ] Info Grid:
  - Layout: Flex column, gap 8px
  - Each row: Flex space-between
  - Label (left):
    - Font size: 12px
    - Color: #637381
  - Value (right):
    - Font size: 13px
    - Color: #212b36 (hoặc #637381 cho date)

- [ ] Conditional Fields:
  - **Card Number**: Chỉ hiển thị nếu value ≠ "-"
    - Format: "0438 **** **** 7108"
    - Font family: monospace
  - **Discount**: Chỉ hiển thị nếu value ≠ "-"
  - **Cancel Reason**: Always show
  - **Cancelled By**: Always show
  - **Cancelled Date**: Always show (color #637381)

- [ ] Empty State:
  - Message: "No cancelled cards found"
  - Padding: 48px 24px
  - Text align: center
  - Color: #919eab
  - Font size: 14px

---

### FR-6: Search Functionality
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn tìm kiếm nhanh cancelled cards theo ID, name hoặc card number.

**Acceptance Criteria:**
- [ ] Search Input:
  - Label floating: "Search" (font 11px, weight 600, color #637381)
  - Label position: top -9px, left 10px, background white, padding 0 4px
  - Placeholder: "Product ID, Name, Card Number"
  - Height: 32px (mobile) / 40px (desktop)
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Padding: 0 40px 0 12px (right padding cho icon)
  - Font size: 13px
  - Color: #212b36
  - Focus border: #212b36

- [ ] Search Icon:
  - Icon: Search (lucide-react, size 15px)
  - Color: #919eab
  - Position: absolute right 10px, center vertical
  - Pointer events: none

- [ ] Search Behavior:
  - Real-time search (không cần nhấn Enter)
  - Search trong fields: `id`, `name`, `cardNumber`
  - Case-insensitive
  - Reset về page 1 khi search
  - Debounce: 300ms (optional, for performance)

- [ ] Layout (Mobile):
  - Flex row với Filter button
  - Search box: flex-1 (fill available space)
  - Gap: 8px

---

### FR-7: Date Range Filter
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn lọc cancelled cards theo khoảng thời gian để xem các cards bị hủy trong period cụ thể.

**Acceptance Criteria:**

#### Desktop View:
- [ ] 2 Date Pickers Inline:
  - **Cancelled From**:
    - Label floating: "Cancelled From" (font 11px, weight 600, color #637381)
    - Label position: top -9px, left 10px, background white
    - Min width: 160px
    - Height: 40px
    - Placeholder: "Pick a date" (color #919eab)
    - Calendar icon: Right side, size 15px, color #919eab
    - Border: 1px solid #dfe3e8
    - Border radius: 8px

  - **To**:
    - Label: "To"
    - Same styling as "Cancelled From"

- [ ] Layout:
  - Flex row với gap 8px
  - Inline với search box (same row on desktop)

#### Mobile View:
- [ ] Filter Button:
  - Text: "Filter"
  - Icon: Filter (lucide-react, size 16px)
  - Height: 32px
  - Padding: 0 14px
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Background: white
  - Font size: 13px, weight 500
  - Color: #212b36
  - Gap: 8px between icon and text
  - Whitespace: nowrap

- [ ] Filter Modal (Bottom Sheet):
  - Trigger: Click Filter button
  - Background overlay: black 30% opacity
  - Modal position: Bottom of screen
  - Modal background: white
  - Border radius: 16px top corners
  - Max height: 85vh
  - Overflow-y: auto

- [ ] Modal Header:
  - Title: "Filter" (font 16px, weight 700, color #161c24)
  - Close button: X icon (size 18px, color #637381)
    - Size: 32x32px
    - Border: 1px solid #dfe3e8
    - Border radius: 8px
    - Background: white
  - Padding: 16px
  - Border bottom: 1px solid #f4f6f8

- [ ] Modal Content:
  - 2 Date pickers trong 1 row
  - Flex row với gap 8px
  - Padding: 16px
  - Each picker full width (flex-1)

- [ ] Modal Footer:
  - 2 buttons: Reset + Apply
  - Flex row, equal width, gap 8px
  - Padding: 16px
  - Border top: 1px solid #f4f6f8

  - **Reset Button**:
    - Text: "Reset"
    - Height: 40px
    - Border: 1px solid #dfe3e8
    - Border radius: 8px
    - Background: white
    - Font size: 14px, weight 600
    - Color: #212b36
    - Click: Clear both date fields (temp state)

  - **Apply Button**:
    - Text: "Apply"
    - Height: 40px
    - Border: none
    - Border radius: 8px
    - Background: #00a76f
    - Font size: 14px, weight 600
    - Color: white
    - Click: Apply filters, close modal, reset pagination

#### Filter Logic:
- [ ] Cancelled From only: Show cards cancelled >= from date
- [ ] To only: Show cards cancelled <= to date (end of day 23:59:59)
- [ ] Both dates: Show cards trong range [from, to]
- [ ] Date comparison: Use Date objects
- [ ] Reset pagination về page 1 khi apply

---

### FR-8: Column Sorting
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn sắp xếp cancelled cards theo các cột để dễ dàng phân tích dữ liệu.

**Acceptance Criteria:**
- [ ] Sortable Columns:
  - Product ID
  - Product Name
  - Product Status
  - Card Number
  - Amount
  - Discount (%)
  - Cancel Reason
  - Cancelled By
  - Cancelled Date
  - All columns sortable

- [ ] Sorting Behavior:
  - First click: Sort ascending (A→Z, low→high)
  - Second click: Sort descending (Z→A, high→low)
  - Only 1 column sorted tại một thời điểm

- [ ] Sort Indicators:
  - Ascending: ChevronUp icon (size 12px, color #00a76f)
  - Descending: ChevronDown icon (size 12px, color #00a76f)
  - Icon hiển thị inline với column label
  - Gap: 4px
  - Only show icon ở sorted column

- [ ] Sort Logic:
  - String columns: `localeCompare` (case-insensitive)
  - Date columns: Date comparison
  - Amount columns: Numeric comparison (parse currency)
  - Handle "-" values: Treat as empty, sort to end

- [ ] Header Interaction:
  - Cursor: pointer
  - User select: none
  - No hover effect needed

---

### FR-9: Pagination
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn điều hướng qua nhiều trang cancelled cards và tùy chỉnh số rows hiển thị.

**Acceptance Criteria:**
- [ ] Rows Per Page Selector:
  - Label: "Rows per page:"
  - Options: 5, 10, 25
  - Default: 10
  - Font size: 13px
  - Color: #637381 (label), #212b36 (selected value)
  - Dropdown height: 30px
  - Border: 1px solid #dfe3e8
  - Border radius: 6px
  - Padding: 0 24px 0 8px (right padding cho chevron)
  - Custom chevron: ChevronDown size 12px, absolute right 6px

- [ ] Pagination Info:
  - Format: "X–Y of Z" (e.g., "1–10 of 45")
  - Empty state: "0–0 of 0"
  - Font size: 13px
  - Color: #637381
  - Position: Right side (margin-left auto)

- [ ] Navigation Buttons:
  - Previous: ChevronLeft icon (size 15px)
  - Next: ChevronRight icon (size 15px)
  - Size: 28x28px
  - Border: 1px solid #dfe3e8
  - Border radius: 6px
  - Background: white
  - Gap: 4px between buttons
  - Normal state:
    - Color: #637381
    - Cursor: pointer
  - Disabled state:
    - Color: #c4cdd5
    - Cursor: not-allowed
    - Cannot click

- [ ] Pagination Footer:
  - Border top: 1px dashed rgba(145, 158, 171, 0.24)
  - Padding: 12px 20px
  - Flex row với gap 16px
  - Align items: center

- [ ] Auto-adjustment:
  - Reset về page 1 khi:
    - Change search query
    - Change platform tab
    - Change category tab
    - Change date range
    - Change rows per page
  - If current page > total pages: Auto về last page

---

### FR-10: Responsive Behavior
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn Cancelled Cards hoạt động tốt trên mọi thiết bị.

**Acceptance Criteria:**
- [ ] Desktop (≥ 768px):
  - Table view
  - Inline date pickers
  - Full column labels
  - Horizontal scroll nếu table quá rộng

- [ ] Mobile (< 768px):
  - Card view
  - Filter button + modal
  - Compact font sizes
  - Stacked layouts

- [ ] Breakpoint Transition:
  - Smooth transition
  - No layout shift
  - Data persistence

- [ ] Touch Targets (Mobile):
  - Minimum 32px height (buttons, inputs)
  - Adequate spacing (8px+)
  - Easy to tap chips và tabs

---

## 3. UI/UX Specifications

### 3.1 Layout Structure
```
┌───────────────────────────────────────────────────────┐
│ Page Header                                           │
│ - Title: "Cancelled Cards"                           │
│ - Breadcrumb: Gift & Voucher > Cancelled Cards       │
└───────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────┐
│ White Card Container                                  │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Platform Tabs (Minimal Underline)              │  │
│ │ [All] [VLINKPAY Platform] [Store]              │  │
│ └─────────────────────────────────────────────────┘  │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Category Chips (Rounded Pills)                  │  │
│ │ [All] [Gift card] [Promotion] [Discount] ...   │  │
│ └─────────────────────────────────────────────────┘  │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Filter Bar                                      │  │
│ │ [Search................] [Filter] (mobile)      │  │
│ │ [Search] [From Date] [To Date] (desktop)       │  │
│ └─────────────────────────────────────────────────┘  │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Data Table (Desktop) / Card List (Mobile)       │  │
│ │                                                 │  │
│ └─────────────────────────────────────────────────┘  │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Pagination                                      │  │
│ │ [Rows/page] ... [Info] [<] [>]                 │  │
│ └─────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
```

### 3.2 Mobile Filter Modal Layout
```
┌──────────────────────────────────────┐
│ Filter                           [X] │ ← Header
├──────────────────────────────────────┤
│                                      │
│ ┌──────────────┬─────────────────┐  │
│ │ Cancelled    │      To         │  │
│ │ From         │                 │  │
│ │ [Pick date ▼]│  [Pick date ▼]  │  │
│ └──────────────┴─────────────────┘  │
│                                      │
├──────────────────────────────────────┤
│         [Reset]      [Apply]         │ ← Footer
└──────────────────────────────────────┘
```

### 3.3 Mobile Card Layout
```
┌──────────────────────────────────────┐
│ Gift Card                    $200.00 │ ← Header (bold)
│ #PRD-20301              [CANCELLED]  │ ← ID + Badge
├──────────────────────────────────────┤ ← Dashed border
│ Card Number:    0438 **** **** 7108  │
│ Discount:                       15%  │
│ Cancel Reason:    Customer request   │
│ Cancelled By:   admin@vlinkpay.com   │
│ Cancelled Date: Jan 15, 2028 09:20AM │
└──────────────────────────────────────┘
```

### 3.4 Color Palette
- **Primary Green:** #00a76f (active chips, sort icons)
- **Platform Tab Active:** #161c24 (black)
- **Text Primary:** #212b36
- **Text Secondary:** #637381
- **Text Tertiary:** #919eab
- **Border:** #dfe3e8
- **Border Light:** #f4f6f8
- **Background Page:** #f9fafb
- **Background Card:** #ffffff
- **Background Header:** #f9fafb
- **Status Badge (Cancelled):** bg #ffe4de, text #b71d18
- **Amount (Active cards):** #007b55 (green for mobile card)
- **Disabled:** #c4cdd5

### 3.5 Typography
- **Font Family:** Poppins, sans-serif (except card numbers: monospace)
- **Page Title:** 22px desktop / 18px mobile, bold
- **Platform Tab:** 14px desktop / 12px mobile
- **Category Chip:** 14px desktop / 12px mobile
- **Table Header:** 13px, weight 600
- **Table Cell:** 13-14px, weight varies
- **Status Badge:** 11px, weight 400
- **Mobile Card Header:** 15px, weight 700
- **Mobile Card Details:** 12-13px
- **Search/Filter Labels:** 11px, weight 600
- **Pagination:** 13px

### 3.6 Spacing & Sizing
- **Page Padding:** 12px mobile / 40px desktop
- **Card Border Radius:** 16px (main container), 12px (mobile cards)
- **Input Border Radius:** 8px
- **Chip Border Radius:** 20px (fully rounded)
- **Badge Border Radius:** 6px
- **Button Border Radius:** 6px (pagination) / 8px (modal)
- **Input Height:** 32px mobile / 40px desktop
- **Button Height:** 40px (modal footer), 28px (pagination)
- **Platform Tab Padding:** 14px vertical, 4px horizontal
- **Chip Padding:** 4px 10px
- **Table Cell Padding:** 14px 16px / 12px 16px (header)
- **Mobile Card Padding:** 16px
- **Modal Padding:** 16px
- **Border Widths:** 1px (solid), 1px (dashed)

### 3.7 Responsive Breakpoints
- **Mobile:** < 768px
  - Card view
  - Filter modal
  - Stacked layouts
  - Compact spacing
- **Desktop:** ≥ 768px
  - Table view
  - Inline filters
  - Horizontal layouts
  - Standard spacing

### 3.8 Icon Library
- **Package:** lucide-react
- **Icons:**
  - Search (search input)
  - Calendar (date pickers)
  - Filter (mobile filter button)
  - X (close modal)
  - ChevronDown (dropdowns, sort desc)
  - ChevronUp (sort asc)
  - ChevronLeft (prev page)
  - ChevronRight (next page)

---

## 4. Data Requirements

### 4.1 Cancelled Card Data Model
```typescript
interface CancelledCard {
  id: string;              // Format: "#PRD-20301"
  name: string;            // Product name
  category: string;        // "Gift card" | "Promotion" | "Discount" | ...
  platform: string;        // "VLINKPAY Platform" | "Store"
  status: "CANCELLED";     // Always CANCELLED
  cardNumber: string;      // "0438 **** 7108" hoặc "-"
  amount: string;          // "$200.00" hoặc "-"
  discount: string;        // "15%" hoặc "-"
  cancelReason: string;    // Lý do hủy
  cancelledBy: string;     // Email người hủy
  cancelledDate: string;   // Format: "Jan 15, 2028 09:20 AM"
}
```

### 4.2 Category Types
```typescript
type CategoryType = 
  | "All"
  | "Gift card"
  | "Promotion"
  | "Discount"
  | "Membership"
  | "Prepaid card"
  | "E-Gift card"
  | "E-Voucher"
  | "Crypto Card";
```

### 4.3 Platform Types
```typescript
type PlatformType = 
  | "All"
  | "VLINKPAY Platform"
  | "Store";
```

### 4.4 API Endpoints

#### Get Cancelled Cards List
- **Endpoint:** `GET /api/cancelled-cards`
- **Query Parameters:**
  - `platform`: "All" | "VLINKPAY Platform" | "Store" (optional)
  - `category`: CategoryType (optional)
  - `search`: string (optional)
  - `fromDate`: ISO date string (optional)
  - `toDate`: ISO date string (optional)
  - `sortBy`: column key (optional)
  - `sortDirection`: "asc" | "desc" (optional)
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
- **Response:**
  ```json
  {
    "data": [...],
    "total": 150,
    "page": 1,
    "limit": 10
  }
  ```

#### Get Cancelled Card Detail
- **Endpoint:** `GET /api/cancelled-cards/:id`
- **Response:** Full cancelled card object với additional details

#### Export Cancelled Cards
- **Endpoint:** `GET /api/cancelled-cards/export`
- **Query Parameters:** Same as list endpoint
- **Response:** CSV/Excel file download

---

## 5. Business Rules

### BR-1: Card Number Formatting
- **Store Platform cards**: Có card number physical
- **VLINKPAY Platform cards**: Không có card number (digital only)
- Card number format: "XXXX **** **** YYYY"
  - Original: "0438 **** 7108" (3 sections)
  - Display: "0438 **** **** 7108" (4 sections - add 1 more **** section)
- Nếu không có card number: Display "—" hoặc "-"

### BR-2: Column Visibility Rules
- **Platform = "Store"**: Show all columns
- **Platform = "VLINKPAY Platform"**: 
  - Hide "Card Number" column
  - Hide "Discount (%)" column
- **Platform = "All"**: Show all columns (contains mix of both platforms)

### BR-3: Status Logic
- All records trong màn hình này luôn có status = "CANCELLED"
- Status badge luôn có same styling (red)
- Không có status filter (vì all already cancelled)

### BR-4: Amount & Discount Handling
- Amount = "-": Membership cards, discount cards (no monetary value)
- Discount = "-": Gift cards, prepaid cards (no discount applied)
- Display "—" trong table cho null/empty values
- Mobile: Hide row nếu value = "-"

### BR-5: Cancel Reason Categories
- **User-initiated**: "Customer request", "Low balance usage"
- **System-initiated**: "Fraud suspicion", "Chargeback dispute", "Expired campaign", "Regulatory compliance"
- **Business-initiated**: "Promotion ended", "Membership expired", "Product discontinued"

### BR-6: Date Range Filter Logic
- **From date only**: `cancelledDate >= fromDate (00:00:00)`
- **To date only**: `cancelledDate <= toDate (23:59:59)`
- **Both dates**: `fromDate <= cancelledDate <= toDate`
- Invalid range (from > to): Still allow (backend handles or returns empty)

### BR-7: Search Priority
- Exact match: Highest priority
- Starts with: Medium priority
- Contains: Lowest priority
- Case-insensitive matching

---

## 6. Edge Cases & Error Handling

### EC-1: Empty States
- **No data at all**: "No cancelled cards found" (unlikely in production)
- **No search results**: Same message + hint "Try different keywords"
- **No filter results**: Same message + "Clear filters" option
- **Empty category**: "No [category] cards cancelled"

### EC-2: Long Text Overflow
- **Long product names**: Truncate với ellipsis (desktop), wrap (mobile)
- **Long cancel reasons**: No truncate, allow wrap/multi-line
- **Long emails**: Truncate middle "john...@vlinkpay.com"
- **Tooltip**: Show full text on hover (desktop)

### EC-3: Invalid Date Ranges
- **From > To**: Warning message "End date must be after start date"
- **Future dates**: Warning "Cannot filter future dates"
- **Far past dates (> 10 years)**: Performance warning

### EC-4: Large Datasets
- **> 1000 records**: Pagination works normally
- **Slow API**: Show loading spinner/skeleton
- **Failed load**: Error message + retry button
- **Timeout**: "Request timed out. Please try again."

### EC-5: Card Number Edge Cases
- **Missing card number**: Display "—"
- **Invalid format**: Display as-is (no formatting)
- **Non-standard format**: Try best-effort formatting
- **Mobile: Hidden if "-"**: Check value before rendering row

### EC-6: Platform Switch with Active Filters
- Switch platform → Keep search & date filters
- Switch platform → Reset category to "All" (nếu category không belong to new platform)
- Switch platform → Update visible columns
- Switch platform → Refresh data

### EC-7: Modal Interactions (Mobile)
- **Swipe down**: Close modal (optional enhancement)
- **Back button**: Close modal
- **Click overlay**: Close modal, discard temp changes
- **Keyboard open**: Modal scrollable, buttons visible

### EC-8: Sort with Mixed Data Types
- Amount có "-" values: Treat as 0 or sort to end
- Dates có invalid format: Sort as string fallback
- NULL values: Always sort to end

---

## 7. Testing Scenarios

### TS-1: Platform Tab Switching
**Steps:**
1. Load Cancelled Cards page (default: All)
2. Click "VLINKPAY Platform" tab
3. Observe table columns
4. Click "Store" tab
5. Click "All" tab

**Expected:**
- Step 2: Active tab underline, Card Number và Discount columns hidden
- Step 4: All columns visible
- Step 5: All columns visible
- Each switch: Data updates, pagination resets

---

### TS-2: Category Chip Filtering
**Steps:**
1. Click "Gift card" chip
2. Verify only Gift card products shown
3. Click "Promotion" chip
4. Click "All" chip

**Expected:**
- Step 1: Chip turns green, data filters
- Step 2: Only "Gift card" category shown
- Step 3: Switch to Promotion, previous chip inactive
- Step 4: All categories shown, chip green

---

### TS-3: Search Functionality
**Steps:**
1. Type "#PRD-20301" in search
2. Verify exact match shown
3. Clear search, type "Gift"
4. Verify all products with "Gift" in name shown
5. Type "0438" (card number search)

**Expected:**
- Step 2: Single result with ID #PRD-20301
- Step 4: Multiple results (Gift Card, E-Gift Card)
- Step 5: Results with matching card numbers
- Real-time filtering

---

### TS-4: Date Range Filter (Desktop)
**Steps:**
1. Select "Cancelled From": Jan 10, 2028
2. Observe filtered results
3. Select "To": Jan 15, 2028
4. Verify results in range
5. Clear both dates

**Expected:**
- Step 2: Only cards cancelled >= Jan 10
- Step 4: Cards between Jan 10-15 only
- Step 5: All cards shown
- Pagination resets each change

---

### TS-5: Date Range Filter (Mobile)
**Steps:**
1. Click "Filter" button
2. Modal opens from bottom
3. Select both dates in modal
4. Click "Apply"
5. Re-open modal
6. Click "Reset"
7. Click "Apply"

**Expected:**
- Step 2: Smooth slide-up animation
- Step 4: Modal closes, data filtered
- Step 5: Selected dates still shown (persistent)
- Step 6: Dates cleared in modal
- Step 7: Filters cleared, all data shown

---

### TS-6: Column Sorting
**Steps:**
1. Click "Cancelled Date" header
2. Observe ascending sort (oldest first)
3. Click again
4. Observe descending sort (newest first)
5. Click "Amount" header

**Expected:**
- Step 2: ChevronUp icon, dates sorted oldest→newest
- Step 4: ChevronDown icon, dates sorted newest→oldest
- Step 5: Icon moves, amounts sorted low→high

---

### TS-7: Pagination
**Steps:**
1. Load page with 25 cancelled cards, 10 rows/page
2. Verify "1–10 of 25" shown
3. Click Next
4. Click Next again
5. Click Previous
6. Change rows to 25

**Expected:**
- Step 2: Page 1, prev disabled
- Step 3: Page 2 (11–20 of 25)
- Step 4: Page 3 (21–25 of 25), next disabled
- Step 5: Back to page 2
- Step 6: Reset to page 1, show 1–25 of 25

---

### TS-8: Combined Filters
**Steps:**
1. Select Platform: "Store"
2. Select Category: "Gift card"
3. Search: "customer"
4. Set date range: Jan 10-20
5. Sort by Amount descending

**Expected:**
- Only Store Gift cards
- With "customer" in ID/name/reason
- Cancelled between Jan 10-20
- Sorted by amount highest first
- Pagination shows correct filtered count

---

### TS-9: Mobile Card View
**Steps:**
1. Resize to mobile (< 768px)
2. Scroll through cards
3. Observe card with no card number
4. Observe card with no amount

**Expected:**
- Cards display correctly
- Card number row hidden nếu value = "-"
- Amount hidden nếu value = "-"
- All other fields visible
- Smooth scrolling

---

### TS-10: Platform Switch Column Visibility
**Steps:**
1. Platform: "All" → All columns visible
2. Switch to "VLINKPAY Platform"
3. Verify Card Number và Discount columns hidden
4. Switch to "Store"
5. Verify all columns visible again

**Expected:**
- Smooth transition
- Data re-renders correctly
- Headers adjust
- No layout shift/flicker

---

### TS-11: Card Number Formatting
**Steps:**
1. Find card with number "0438 **** 7108"
2. Observe displayed format

**Expected:**
- Desktop table: "0438 **** **** 7108" (4 sections)
- Mobile card: "0438 **** **** 7108" (4 sections)
- Monospace font
- Consistent formatting

---

### TS-12: Responsive Breakpoint
**Steps:**
1. Load on desktop (1920px)
2. Resize to tablet (768px)
3. Resize to mobile (375px)
4. Resize back to desktop

**Expected:**
- Desktop: Table view, inline filters
- Tablet: Still table view (≥768px)
- Mobile: Card view, filter button
- Back to desktop: Table restored
- No data loss during transitions

---

## 8. Performance Requirements

### PR-1: Page Load Time
- Initial load: < 2 seconds
- Platform tab switch: < 300ms
- Category chip click: < 200ms
- Search/filter apply: < 500ms
- Sort operation: < 300ms

### PR-2: API Response Time
- GET cancelled cards: < 1 second
- With heavy filters: < 2 seconds
- Export CSV: < 5 seconds (for 1000 records)

### PR-3: Rendering Performance
- Table render 50 rows: < 500ms
- Mobile cards render 50 items: 60fps scroll
- Search debounce: 300ms
- Filter modal open: < 200ms

### PR-4: Data Optimization
- Pagination: Only fetch current page
- Search: Debounce input
- Sort: Client-side (if dataset small < 100 items)
- Large datasets: Server-side pagination + sorting

---

## 9. Accessibility Requirements

### A-1: Keyboard Navigation
- [ ] Tab order: Logical (tabs → chips → search → dates → table/cards → pagination)
- [ ] Enter: Submit search, apply filter
- [ ] Escape: Close modal
- [ ] Arrow keys: Navigate pagination
- [ ] Space: Toggle chips/tabs
- [ ] Focus visible: Clear outline

### A-2: Screen Reader Support
- [ ] Page title announced
- [ ] Tab labels with aria-label
- [ ] Chip labels announced
- [ ] Table headers proper `<th>`
- [ ] Sort state announced
- [ ] Pagination info announced
- [ ] Date picker accessible
- [ ] Modal role="dialog"
- [ ] Loading/empty states announced

### A-3: Color Contrast
- [ ] All text meets WCAG AA (4.5:1)
- [ ] Green #00a76f on white: Pass
- [ ] Status badge contrast: Pass
- [ ] Platform tab #161c24 on white: Pass
- [ ] Focus indicators: High contrast

### A-4: Touch Targets
- [ ] Minimum 32px height (mobile)
- [ ] Chips: Easy to tap (adequate padding)
- [ ] Date pickers: Large enough
- [ ] Pagination buttons: 28x28px minimum
- [ ] Spacing: ≥ 8px between targets

---

## 10. Implementation Notes

### 10.1 Component Structure
```
CancelledCards/
├── index.tsx                  # Main page component
├── components/
│   ├── PlatformTabs.tsx      # Platform tab navigation
│   ├── CategoryChips.tsx     # Category chip filters
│   ├── SearchFilter.tsx      # Search + date filter toolbar
│   ├── FilterModal.tsx       # Mobile filter modal
│   ├── CancelledTable.tsx    # Desktop table view
│   ├── CancelledCards.tsx    # Mobile card view
│   ├── DateInput.tsx         # Reusable date picker
│   ├── StatusBadge.tsx       # Cancelled status badge
│   └── Pagination.tsx        # Pagination controls
├── hooks/
│   ├── useCancelledCards.ts  # Fetch cancelled cards
│   ├── useFilters.ts         # Filter state management
│   ├── useSorting.ts         # Sorting logic
│   └── usePagination.ts      # Pagination logic
└── utils/
    ├── formatCardNumber.ts    # Card number formatter
    ├── formatDate.ts          # Date formatter
    └── columnVisibility.ts    # Dynamic column logic
```

### 10.2 State Management
- **Platform Tab:** Local state (active platform)
- **Category Tab:** Local state (active category)
- **Search:** Local state với debounce
- **Date Range:** Local state (desktop) + temp state (mobile modal)
- **Sorting:** Local state (column, direction)
- **Pagination:** Local state (page, rows per page)
- **Data:** Server state (React Query/SWR recommended)

### 10.3 Performance Optimizations
- **Memoization:** Memo table rows, filter functions
- **Debounce:** Search input (300ms)
- **Lazy Load:** Modal component
- **Virtual Scroll:** Consider for very large lists
- **Code Splitting:** Route-based splitting

### 10.4 Card Number Formatting Logic
```typescript
function formatCardNumber(cardNumber: string): string {
  if (cardNumber === "-") return "—";
  
  // Match pattern: XXXX **** YYYY
  const match = cardNumber.match(/(\d{4})\s\*{4}\s(\d{4})/);
  if (match) {
    const [, first, last] = match;
    return `${first} **** **** ${last}`;
  }
  
  return cardNumber; // Return as-is if no match
}
```

### 10.5 Dependencies
- `lucide-react`: Icons
- `date-fns` (optional): Date formatting and manipulation
- `react-query` or `swr`: Server state management
- `react-hot-toast` or `sonner`: Toast notifications (for errors)

---

## 11. Future Enhancements

### FE-1: Export Functionality
- Export to CSV/Excel
- Export current filters only
- Export all cancelled cards
- Scheduled export reports

### FE-2: Advanced Filters
- Filter by cancelled by (user selection)
- Filter by amount range
- Filter by cancel reason categories
- Save filter presets

### FE-3: Bulk Actions
- Select multiple cancelled cards
- Bulk restore (if business allows)
- Bulk export selected
- Bulk view details

### FE-4: Cancel Analytics
- Dashboard with cancel statistics
- Cancel reason distribution chart
- Cancel trends over time
- Platform/category breakdown

### FE-5: Restore Functionality
- Restore cancelled card (if within grace period)
- Restore approval workflow
- Restore history log

### FE-6: Detail View/Modal
- Click row → View full cancel details
- Modal with all information
- Cancel history timeline
- Related transactions

### FE-7: Auto-refresh
- Real-time updates (WebSocket)
- Auto-refresh every X seconds
- "New cancelled cards" notification

### FE-8: Print View
- Print-friendly layout
- Print selected records
- Print with filters applied

---

## 12. Definition of Done

- [ ] All functional requirements implemented
- [ ] UI matches design specifications
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] All test scenarios pass
- [ ] Platform tab switching works correctly
- [ ] Category filtering works correctly
- [ ] Search functionality works
- [ ] Date range filter works (desktop + mobile)
- [ ] Column sorting works on all columns
- [ ] Pagination works correctly
- [ ] Dynamic column visibility works (platform-based)
- [ ] Card number formatting correct
- [ ] Empty states handled
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Accessibility requirements met (WCAG AA)
- [ ] Keyboard navigation working
- [ ] Screen reader compatible
- [ ] Performance benchmarks met
- [ ] API integration complete
- [ ] Code reviewed and approved
- [ ] Unit tests written (coverage > 80%)
- [ ] Integration tests written
- [ ] E2E tests for critical flows
- [ ] Documentation updated
- [ ] QA testing completed
- [ ] Product owner approval

---

**Document Version:** 1.0  
**Last Updated:** 2025-03-12  
**Author:** VLINKPAY Development Team
