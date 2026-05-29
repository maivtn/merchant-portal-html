# Acceptance Criteria: Benefits Setup

## 1. Overview

**Feature Name:** Benefits Setup  
**Module:** Settings / Configuration  
**Description:** Màn hình quản lý benefits và membership packages trong hệ thống VLINKPAY. Cho phép xem danh sách, tìm kiếm, lọc, sắp xếp, tạo mới và quản lý status của benefits cũng như các gói membership. Màn hình có 2 tabs chính: Benefit List (quản lý benefits đơn lẻ) và Membership Package (quản lý gói membership).

---

## 2. Functional Requirements

### FR-1: Page Layout & Navigation
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn có giao diện rõ ràng để quản lý benefits và packages một cách dễ dàng.

**Acceptance Criteria:**
- [ ] Page Header:
  - Title: "Benefits Setup" (font size 22px, bold, color #161c24)
  - Breadcrumb: "Dashboard > Benefits Setup" (chỉ hiển thị trên desktop)
  - Create button (green #00a76f) với icon plus
    - Desktop: Hiển thị text "Create Benefit" hoặc "Create Membership Package" tùy active tab
    - Mobile: Chỉ hiển thị icon
  - Box shadow button: `0 8px 16px 0 rgba(0,167,111,0.24)`
  - Hover: Background darker (#007b55), shadow lớn hơn

- [ ] Tab Navigation:
  - 2 tabs: "Benefit List" và "Membership Package"
  - Minimal underline design (không có background fill)
  - Active tab:
    - Border bottom: 2px solid #212b36
    - Font weight: 600
    - Text color: #212b36
  - Inactive tab:
    - Font weight: 400
    - Text color: #637381
    - Hover: color #212b36
  - Font size: 12px (mobile) / 14px (desktop)
  - Tab spacing: margin-right 16px (mobile) / 28px (desktop)

- [ ] White card container:
  - Border radius: 16px
  - Box shadow: `0 0 2px 0 rgb(145 158 171 / 0.2),0 12px 24px -4px rgb(145 158 171 / 0.12)`
  - Overflow: hidden

---

### FR-2: Benefit List Tab - Data Display
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn xem danh sách tất cả các benefits với thông tin chi tiết.

**Acceptance Criteria:**
- [ ] Desktop Table View:
  - **Columns:**
    1. **Icon** (width 64px): Custom benefit icon
    2. **Benefit ID** (width 120px, sortable): Format "BEN001", "BEN002"
    3. **Benefit Name** (sortable): Tên benefit
    4. **Benefit Unit** (sortable): USD ($), Percentage (%), Points
    5. **Status** (width 160px, sortable): ACTIVE/INACTIVE badge
    6. **Created By** (sortable): Email người tạo
    7. **Created Date** (width 130px, sortable): Format "MMM DD, YYYY"
    8. **Actions** (width 80px): View detail button (Eye icon)

- [ ] Status Badge:
  - **ACTIVE**:
    - Background: #d8fbde
    - Text color: #007b55
    - Font size: 11px, font weight: 700, uppercase
    - Padding: 4px 8px
    - Border radius: 6px
  - **INACTIVE**:
    - Background: #ffe4de
    - Text color: #b71d18
    - Same styling as ACTIVE

- [ ] Table Styling:
  - Header background: #f9fafb
  - Header font: 14px, weight 600, color #637381
  - Cell font: 14px, color #212b36
  - Cell padding: 14px 16px
  - Row hover: background #f9fafb
  - Border: Dashed border giữa các rows (rgb(145 158 171 / 0.24))

- [ ] Mobile Card View:
  - Card với border radius 12px
  - Border: 1px solid #f4f6f8
  - Box shadow: `0 1px 2px 0 rgba(145, 158, 171, 0.08)`
  - Padding: 16px
  - Layout:
    - **Header**: Icon + Name (bold 15px) + ID (13px gray)
    - **Dashed divider**
    - **Details Grid**:
      - Unit
      - Created By
      - Created Date
    - **Dashed divider**
    - **Actions**: Status toggle switch + badge + View button

- [ ] Status Toggle Switch (Mobile):
  - Width: 36px, Height: 20px
  - Border radius: 10px
  - Background: #00a76f (ACTIVE) / #ff5630 (INACTIVE)
  - White circle: 16x16px với box shadow
  - Smooth transition animation 0.2s

- [ ] Empty State:
  - Message: "No benefits found"
  - Text align: center
  - Color: #919eab
  - Font size: 14px
  - Padding: 40px 16px

---

### FR-3: Membership Package Tab - Data Display
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn xem danh sách các gói membership với thông tin pricing và status.

**Acceptance Criteria:**
- [ ] Desktop Table View:
  - **Columns:**
    1. **Package ID** (sortable): Format "PKG001"
    2. **Package Name** (sortable): Tên gói (SILVER, GOLD, PLATINUM)
    3. **Price** (sortable): Số tiền
    4. **Currency** (sortable): USD, VND, etc.
    5. **Billing Cycle** (sortable): Yearly, Monthly
    6. **Benefit Count** (sortable): Số lượng benefits trong gói
    7. **Status** (sortable): APPROVED/PENDING/REJECTED/DRAFT badge
    8. **Sale Status** (sortable): ACTIVE/INACTIVE badge
    9. **Created By** (sortable): Tên người tạo
    10. **Created Date** (sortable): Format "MMM DD, YYYY"
    11. **Last Updated Date** (sortable): Format "MMM DD, YYYY"
    12. **Actions**: View detail button (Eye icon)

- [ ] Status Badges:
  - **APPROVED**:
    - Background: #d8fbde
    - Text color: #007b55
  - **PENDING**:
    - Background: #fff3cc
    - Text color: #b8860b
  - **REJECTED**:
    - Background: #ffe4de
    - Text color: #b71d18
  - **DRAFT**:
    - Background: #f4f6f8
    - Text color: #637381
  - All badges: Font 11px, weight 400, padding 4px 10px, border radius 6px

- [ ] Sale Status Badges:
  - **ACTIVE**: Same as Benefit List ACTIVE
  - **INACTIVE**: Same as Benefit List INACTIVE

- [ ] Mobile Card View:
  - Layout:
    - **Header**: Package Name (bold 15px) + Price (bold 18px green #00a76f)
    - **Subheader**: Package ID (13px gray)
    - **Dashed divider**
    - **Details Grid**:
      - Currency
      - Billing Cycle
      - Benefits count
      - Status badge
      - Sale Status badge
      - Created By
      - Created Date
      - Last Updated Date
    - **Dashed divider**
    - **Actions**: View button

- [ ] Empty State:
  - Message: "No membership packages found"
  - Same styling as Benefit List empty state

---

### FR-4: Search & Filter (Benefit List)
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn tìm kiếm và lọc benefits để nhanh chóng tìm được benefit cần quản lý.

**Acceptance Criteria:**
- [ ] Search Box:
  - Width: Full (mobile) / 240px (desktop)
  - Height: 40px
  - Placeholder: "Benefit ID, Name"
  - Icon: Search (lucide-react, size 16px)
  - Icon position: left 11px
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Font size: 13px
  - Padding left: 34px (để space cho icon)
  - Focus border: #212b36

- [ ] Search Functionality:
  - Search real-time (không cần nhấn Enter)
  - Search trong fields: `id`, `name`, `unit`
  - Case-insensitive
  - Reset về page 1 khi search

- [ ] Status Filter:
  - Width: 128px (mobile) / 160px (desktop)
  - Height: 40px
  - Label floating: "Status" (font 11px, weight 600, color #637381)
  - Label position: top -8px, left 10px, background white
  - Dropdown options:
    - All Statuses
    - ACTIVE
    - INACTIVE
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Font size: 13px
  - Custom dropdown arrow (SVG embedded)
  - Focus border: #212b36

- [ ] Toolbar Layout:
  - Border bottom: 1px dashed rgb(145 158 171 / 0.3)
  - Padding: 12px (mobile) / 20px (desktop)
  - Flex row với gap 8px (mobile) / 12px (desktop)
  - Search box flex-1 (mobile), fixed width (desktop)

---

### FR-5: Search & Filter (Membership Package)
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn tìm kiếm và lọc membership packages theo nhiều tiêu chí.

**Acceptance Criteria:**
- [ ] Search Box:
  - Placeholder: "Search by Package ID or Name"
  - Width: Full (mobile) / 288px (desktop) với class `w-full md:w-72`
  - Search trong fields: `id`, `name`
  - Tất cả các specs khác giống Benefit List

- [ ] Status Filter:
  - Dropdown options:
    - All
    - APPROVED
    - PENDING
    - REJECTED
    - DRAFT
  - Tất cả các specs khác giống Benefit List

- [ ] Responsive Behavior:
  - Mobile: Search full width, Status filter fixed width
  - Desktop: Search 288px, Status filter 160px
  - Both có responsive padding và gap

---

### FR-6: Column Sorting
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn sắp xếp dữ liệu theo các cột để dễ dàng phân tích.

**Acceptance Criteria:**
- [ ] Sortable Columns:
  - Benefit List: Benefit ID, Name, Unit, Status, Created By, Created Date
  - Membership Package: Package ID, Name, Price, Currency, Billing Cycle, Benefit Count, Status, Sale Status, Created By, Created Date, Last Updated Date
  - Icon column (Benefit List) và Actions column: KHÔNG sortable

- [ ] Sorting Behavior:
  - First click: Sort ascending
  - Second click: Sort descending
  - Third click: Remove sort (về default order)
  - Chỉ sort 1 column tại một thời điểm

- [ ] Sort Indicators:
  - Ascending: ChevronUp icon (size 14px, color #00a76f)
  - Descending: ChevronDown icon (size 14px, color #00a76f)
  - Icon hiển thị cạnh column label
  - No icon khi column không được sort

- [ ] Sort Logic:
  - String columns: Alphabetical, case-insensitive
  - Number columns: Numeric comparison
  - Date columns: Chronological
  - Status columns: Alphabetical
  - Use `localeCompare` for string sorting

- [ ] Header Styling:
  - Cursor: pointer
  - User select: none (không cho select text)
  - Hover: Có thể thêm subtle background change

---

### FR-7: Pagination
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn điều hướng qua nhiều trang dữ liệu một cách dễ dàng.

**Acceptance Criteria:**
- [ ] Rows Per Page Selector:
  - Label: "Rows per page:"
  - Options: 5, 10, 25
  - Default: 5
  - Font size: 13px
  - Color: #637381
  - Dropdown height: 32px
  - Border: 1px solid #dfe3e8
  - Border radius: 6px

- [ ] Pagination Info:
  - Format: "X–Y of Z" (e.g., "1–5 of 23")
  - Empty state: "0–0 of 0"
  - Font size: 13px
  - Color: #637381
  - Position: Right side với margin-left auto

- [ ] Navigation Buttons:
  - Previous: ChevronLeft icon
  - Next: ChevronRight icon
  - Size: 32x32px
  - Border: 1px solid #dfe3e8
  - Border radius: 6px
  - Background: white
  - Icon size: 18px
  - Disabled state:
    - Cursor: not-allowed
    - Color: #c4cdd5
    - Cannot click

- [ ] Pagination Footer:
  - Border top: 1px dashed rgb(145 158 171 / 0.24)
  - Padding: 12px 16px (mobile) / 16px 20px (desktop)
  - Flex layout với gap
  - Align items: center

- [ ] Auto-adjustment:
  - Reset về page 1 khi:
    - Change search query
    - Change status filter
    - Change rows per page
  - Nếu current page > total pages sau filter: Auto về last available page

---

### FR-8: Create Benefit Modal
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn tạo benefit mới với các thông tin cần thiết thông qua modal form.

**Acceptance Criteria:**

#### Modal Layout & Behavior:
- [ ] Modal Trigger:
  - Click "Create Benefit" button ở page header khi đang ở Benefit List tab
  - Modal overlay: Fixed full screen với background black opacity 50%
  - Click overlay để đóng modal

- [ ] Modal Container:
  - Width: Full (mobile) / Max 600px (desktop)
  - Max height: 95vh
  - Overflow-y: auto
  - Background: White
  - Border radius: 16px top corners (mobile) / 16px all corners (desktop)
  - Position: Bottom (mobile) / Center (desktop)
  - Smooth slide-up animation (mobile)

- [ ] Modal Header:
  - Title: "Create New Benefit" (20px mobile / 24px desktop, bold)
  - Description: "Fill in the required information to create a new benefit" (12px mobile / 14px desktop, gray)
  - Close button: X icon (size 20px, color #637381)
    - Size: 32x32px
    - Border radius: 8px
    - Transparent background
    - Hover: Light gray background
  - Border bottom: 1px solid #f4f6f8
  - Padding: 16px mobile / 24px desktop

#### Benefit Icon Selection:
- [ ] Section Header:
  - Title: "Benefit Icon" (font 14px, weight 600)
  - Description: "Select an icon for the benefit" (font 13px, color #637381)

- [ ] Icon Grid:
  - Layout: Grid 5 columns với gap 8px (mobile) / 12px (desktop)
  - 9 predefined icons + 1 upload button = 10 items total

- [ ] Icon Options:
  1. **DollarSign**: bg #c8fae5, color #00a76f
  2. **RefreshCw**: bg #c8fae5, color #00a76f
  3. **Percent**: bg #ffe4cc, color #cc5500
  4. **Cake**: bg #e0d4ff, color #7c3aed
  5. **Users**: bg #fff9cc, color #b8860b
  6. **Sofa**: bg #ffd4d4, color #d32f2f
  7. **Tag**: bg #fff9cc, color #b8860b
  8. **Gift** (variant 1): bg #ffd4d4, color #d32f2f
  9. **Gift** (variant 2): bg #e0d4ff, color #7c3aed

- [ ] Icon Button Styling:
  - Aspect ratio: 1:1 (square)
  - Border radius: 12px
  - Border: 2px solid transparent (default)
  - Selected state: 2px solid #00a76f
  - Icon size: 28px
  - Cursor: pointer
  - Hover (desktop): scale(1.05) + box shadow
  - Touch (mobile): scale(0.95)
  - Smooth transition: all 0.2s

- [ ] Upload Button:
  - Background: #f9fafb
  - Border: 2px solid #dfe3e8 (dashed style optional)
  - Icon: Upload (size 20px, color #637381)
  - Text: "Upload" (font 11px, color #637381, weight 500)
  - Flex column layout, centered
  - Gap: 4px
  - Same hover/touch effects as icon buttons

#### Benefit Name Field:
- [ ] Field Requirements:
  - Label: "Benefit Name" với red asterisk (*) - Required field
  - Input type: text
  - Placeholder: "Enter benefit name"
  - Height: 44px
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Font size: 14px
  - Padding: 0 14px
  - Focus state:
    - Border: #212b36
    - Box shadow: `0 0 0 3px rgba(33,43,54,0.08)`
  - Transition: all 0.2s

- [ ] Suggestions Section:
  - Label: "Suggestions" (font 12px, weight 500, color #637381)
  - Margin top: 8px from input field
  - Margin bottom: 6px from chips

- [ ] Quick Select Chips:
  - Options: "Discount", "Cashback", "Gift", "Birthday"
  - Layout: Flex row wrap với gap 8px
  - Chip styling:
    - Padding: 6px 12px
    - Border radius: 6px
    - Border: 1px solid #dfe3e8
    - Background: white
    - Font size: 13px, weight 500
    - Color: #637381
    - Cursor: pointer
  - Hover state:
    - Border color: #00a76f
    - Background: #f0fdf7
    - Text color: #00a76f
  - Click behavior: Auto-fill input field với chip value
  - Touch feedback (mobile): scale(0.95)

#### Benefit Unit Field:
- [ ] Field Requirements:
  - Label: "Benefit Unit" với red asterisk (*) - Required field
  - Input type: select dropdown
  - Placeholder: "Select benefit unit" (color #919eab khi chưa chọn)
  - Height: 44px
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Font size: 14px
  - Padding: 0 40px 0 14px (right padding cho icon)
  - Cursor: pointer
  - Appearance: none (custom dropdown)
  - ChevronDown icon:
    - Size: 16px
    - Color: #637381
    - Position: absolute right 14px, top 50%
    - Pointer events: none

- [ ] Dropdown Options:
  - "Select benefit unit" (disabled placeholder option)
  - "USD ($)"
  - "Percentage (%)"
  - "Points"

- [ ] Focus state: Same as Benefit Name field

#### Rollover Type Field (Optional):
- [ ] Field Requirements:
  - Label: "Rollover Type" (NO asterisk - Optional field)
  - Same styling as Benefit Unit dropdown
  - Placeholder: "Select rollover type"

- [ ] Dropdown Options:
  - "Select rollover type" (placeholder)
  - "Monthly"
  - "Yearly"
  - "Never"

#### Cycle Field (Optional):
- [ ] Field Requirements:
  - Label: "Cycle" (NO asterisk - Optional field)
  - Same styling as other dropdowns

- [ ] Dropdown Options:
  - "Select cycle" (placeholder)
  - "Daily"
  - "Weekly"
  - "Monthly"
  - "Yearly"

- [ ] Layout:
  - Grid 2 columns với gap 8px (mobile) / 12px (desktop)
  - Rollover Type ở cột trái, Cycle ở cột phải
  - Equal width columns

#### Modal Footer:
- [ ] Layout:
  - Border top: 1px solid #f4f6f8
  - Padding: 16px mobile / 24px desktop
  - Flex row với gap 8px (mobile) / 12px (desktop)
  - Both buttons flex: 1 (equal width)

- [ ] Cancel Button:
  - Text: "Cancel"
  - Height: 44px
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Background: white
  - Font size: 14px, weight 600
  - Color: #212b36
  - Cursor: pointer
  - Hover:
    - Background: #f9fafb
    - Border color: #919eab
  - Touch: scale(0.98)
  - Transition: all 0.2s

- [ ] Create Button:
  - Text: "Create"
  - Height: 44px
  - Border: none
  - Border radius: 8px
  - Background: #00a76f
  - Font size: 14px, weight 600
  - Color: white
  - Cursor: pointer
  - Hover:
    - Background: #007b55
    - Box shadow: `0 4px 12px rgba(0,167,111,0.24)`
  - Touch: scale(0.98)
  - Transition: all 0.2s

#### Modal Behavior:
- [ ] Cancel button click:
  - Close modal
  - Clear all form fields
  - Reset selected icon

- [ ] Create button click:
  - Validate required fields (Icon, Name, Unit)
  - If valid: Submit data, show success message, close modal, refresh list
  - If invalid: Show error validation messages
  - Clear form after successful creation

- [ ] Close (X) button: Same behavior as Cancel

- [ ] Click overlay: Same behavior as Cancel

- [ ] Form Reset:
  - All fields về empty/default state
  - Selected icon reset về null
  - No validation errors showing

---

### FR-9: View Detail Action
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn xem chi tiết một benefit hoặc package khi click vào action button.

**Acceptance Criteria:**
- [ ] View Button (Desktop):
  - Icon: Eye (lucide-react, size 18px)
  - Background: transparent
  - Border: 1px solid #dfe3e8
  - Color: #00a76f
  - Padding: 4px
  - Border radius: 6px
  - Cursor: pointer
  - Tooltip: "View detail"
  - Hover: Background #f0fdf7, border #00a76f

- [ ] View Button (Mobile):
  - Same icon và color
  - Padding: 6px 12px
  - Display flex với gap 6px
  - Font size: 13px, weight 500
  - Text: "View" (hiển thị kèm icon)

- [ ] Click Behavior:
  - Navigate to detail page của benefit/package tương ứng
  - Hoặc open detail modal (tùy design)
  - Pass benefit ID/package ID as parameter

---

### FR-10: Status Toggle (Benefit List Only)
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn nhanh chóng bật/tắt status của một benefit.

**Acceptance Criteria:**
- [ ] Desktop Table:
  - Status hiển thị dưới dạng badge (ACTIVE/INACTIVE)
  - Không có toggle switch trên desktop
  - Có thể toggle thông qua Edit/Detail view

- [ ] Mobile Card:
  - Toggle switch + Status badge cùng hiển thị
  - Switch specifications:
    - Width: 36px
    - Height: 20px
    - Border radius: 10px
    - Background: #00a76f (ON/ACTIVE) / #ff5630 (OFF/INACTIVE)
    - White circle indicator:
      - Size: 16x16px
      - Border radius: 50%
      - Box shadow: `0 1px 3px rgba(0,0,0,0.2)`
      - Position: left 2px (OFF) / left 18px (ON)
      - Smooth transition: 0.2s

- [ ] Toggle Behavior:
  - Click switch: Toggle status ACTIVE ↔ INACTIVE
  - Immediate visual feedback
  - API call to update status
  - On success: Update badge text/color
  - On error: Revert toggle, show error message
  - Tooltip: "Switch to [opposite status]"

---

## 3. UI/UX Specifications

### 3.1 Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Page Header                                             │
│ - Title: "Benefits Setup"                              │
│ - Breadcrumb: Dashboard > Benefits Setup (desktop)     │
│ - [Create Button] (green, right aligned)               │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ White Card Container                                    │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Tab Bar                                          │  │
│ │ [Benefit List] [Membership Package]             │  │
│ └───────────────────────────────────────────────────┘  │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Toolbar (Search + Filter)                        │  │
│ │ [Search Box] [Status Filter]                     │  │
│ └───────────────────────────────────────────────────┘  │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Data Table (Desktop) / Card List (Mobile)        │  │
│ │                                                  │  │
│ │                                                  │  │
│ └───────────────────────────────────────────────────┘  │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Pagination                                       │  │
│ │ [Rows/page] ... [Info] [<] [>]                  │  │
│ └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Create Benefit Modal Layout
```
┌──────────────────────────────────────────┐
│ Create New Benefit                   [X] │ ← Header
├──────────────────────────────────────────┤
│ Benefit Icon                             │
│ Select an icon for the benefit           │
│ ┌───┬───┬───┬───┬───┐                    │
│ │ $ │ ↻ │ % │ 🎂│ 👥│                    │
│ ├───┼───┼───┼───┼───┤                    │
│ │ 🛋️│ 🏷️│ 🎁│ 🎁│ ↑ │                    │
│ └───┴───┴───┴───┴───┘                    │
│                                          │
│ Benefit Name *                           │
│ [Enter benefit name..................]   │
│ Suggestions                              │
│ [Discount] [Cashback] [Gift] [Birthday]  │
│                                          │
│ Benefit Unit *                           │
│ [Select benefit unit................ ▼]  │
│                                          │
│ Rollover Type     Cycle                  │
│ [Select........ ▼] [Select........ ▼]   │
├──────────────────────────────────────────┤
│              [Cancel]  [Create]          │ ← Footer
└──────────────────────────────────────────┘
```

### 3.3 Color Palette
- **Primary Green:** #00a76f
- **Dark Green (Hover):** #007b55
- **Text Primary:** #212b36
- **Text Secondary:** #637381
- **Text Tertiary:** #919eab
- **Border:** #dfe3e8
- **Border Dark:** #919eab
- **Background Page:** #f9fafb
- **Background Card:** #ffffff
- **Background Header:** #f9fafb
- **Success Green (Badge):** bg #d8fbde, text #007b55
- **Error Red (Badge):** bg #ffe4de, text #b71d18
- **Warning Yellow (Badge):** bg #fff3cc, text #b8860b
- **Draft Gray (Badge):** bg #f4f6f8, text #637381
- **Inactive Red:** #ff5630

### 3.4 Typography
- **Font Family:** Poppins, sans-serif
- **Page Title:** 22px, bold
- **Modal Title:** 20px mobile / 24px desktop, bold
- **Section Title:** 14px, weight 600
- **Tab Label:** 12px mobile / 14px desktop
- **Table Header:** 14px, weight 600
- **Table Cell:** 14px, weight 400
- **Badge:** 11px, weight 700 (ACTIVE/INACTIVE) / 400 (Status)
- **Button:** 14px, weight 600
- **Input:** 14px
- **Label:** 14px, weight 600
- **Helper Text:** 13px / 12px
- **Pagination:** 13px

### 3.5 Spacing & Sizing
- **Page Padding:** 12px mobile / 40px desktop
- **Card Border Radius:** 16px
- **Modal Border Radius:** 16px top (mobile) / 16px all (desktop)
- **Input/Button Border Radius:** 8px
- **Badge Border Radius:** 6px
- **Icon Button Border Radius:** 6px / 12px (icon selection)
- **Input Height:** 44px
- **Button Height:** 44px
- **Search Height:** 40px
- **Filter Height:** 40px
- **Input Border:** 1px solid #dfe3e8
- **Focus Border:** 1px solid #212b36
- **Focus Box Shadow:** `0 0 0 3px rgba(33,43,54,0.08)`
- **Table Cell Padding:** 14px 16px
- **Card Padding:** 16px
- **Modal Header/Footer Padding:** 16px mobile / 24px desktop
- **Modal Body Padding:** 16px mobile / 24px desktop
- **Toolbar Padding:** 12px mobile / 20px desktop

### 3.6 Responsive Breakpoints
- **Mobile:** < 768px
  - Card view for data
  - Full width search
  - Stacked toolbar
  - Bottom sheet modal
  - Icon-only create button
- **Desktop:** ≥ 768px
  - Table view for data
  - Fixed width search (240px / 288px)
  - Horizontal toolbar
  - Centered modal
  - Text + icon create button

### 3.7 Icon Library
- **Package:** lucide-react
- **Icons used:**
  - Search (search box)
  - Eye (view action)
  - ChevronUp, ChevronDown (sort indicators)
  - ChevronLeft, ChevronRight (pagination)
  - X (close modal)
  - DollarSign, RefreshCw, Percent, Cake, Users, Sofa, Tag, Gift, Upload (benefit icons)

---

## 4. Data Requirements

### 4.1 Benefit Data Model
```typescript
interface Benefit {
  id: string;              // Format: "BEN001", "BEN002"
  name: string;            // Benefit name
  unit: string;            // "USD ($)" | "Percentage (%)" | "Points"
  icon?: string;           // Icon identifier
  status: "ACTIVE" | "INACTIVE";
  createdBy: string;       // Email hoặc username
  createdDate: string;     // Format: "MMM DD, YYYY"
  updatedDate?: string;    // Format: "MMM DD, YYYY"
  rolloverType?: string;   // "monthly" | "yearly" | "never" (optional)
  cycle?: string;          // "daily" | "weekly" | "monthly" | "yearly" (optional)
}
```

### 4.2 Membership Package Data Model
```typescript
interface MembershipPackage {
  id: string;              // Format: "PKG001", "PKG002"
  name: string;            // Package name (SILVER, GOLD, etc.)
  price: number;           // Package price
  currency: string;        // "USD", "VND", etc.
  billingCycle: string;    // "Yearly" | "Monthly"
  benefitCount: number;    // Number of benefits in package
  status: "APPROVED" | "PENDING" | "REJECTED" | "DRAFT";
  saleStatus: "ACTIVE" | "INACTIVE";
  createdBy: string;       // User name or email
  createdDate: string;     // Format: "MMM DD, YYYY"
  updatedDate: string;     // Format: "MMM DD, YYYY"
  benefits?: Benefit[];    // Array of benefits (for detail view)
}
```

### 4.3 Create Benefit Request Model
```typescript
interface CreateBenefitRequest {
  icon: string;            // Selected icon ID (required)
  name: string;            // Benefit name (required)
  unit: string;            // Benefit unit (required)
  rolloverType?: string;   // Optional
  cycle?: string;          // Optional
}
```

### 4.4 API Endpoints

#### Get Benefits List
- **Endpoint:** `GET /api/benefits`
- **Query Parameters:**
  - `search`: string (optional)
  - `status`: "ACTIVE" | "INACTIVE" | "All Statuses" (optional)
  - `sortBy`: column key (optional)
  - `sortDirection`: "asc" | "desc" (optional)
  - `page`: number (default: 1)
  - `limit`: number (default: 5)
- **Response:**
  ```json
  {
    "data": [...],
    "total": 50,
    "page": 1,
    "limit": 5
  }
  ```

#### Get Membership Packages List
- **Endpoint:** `GET /api/membership-packages`
- **Query Parameters:** Same as benefits với thêm status filter options
- **Response:** Same structure

#### Create Benefit
- **Endpoint:** `POST /api/benefits`
- **Request Body:** CreateBenefitRequest
- **Response:**
  ```json
  {
    "success": true,
    "data": { ...benefit object },
    "message": "Benefit created successfully"
  }
  ```

#### Update Benefit Status
- **Endpoint:** `PATCH /api/benefits/:id/status`
- **Request Body:**
  ```json
  {
    "status": "ACTIVE" | "INACTIVE"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Status updated successfully"
  }
  ```

#### Get Benefit Detail
- **Endpoint:** `GET /api/benefits/:id`
- **Response:** Full benefit object

---

## 5. Business Rules

### BR-1: Benefit Naming
- Benefit name phải unique trong hệ thống
- Minimum length: 3 characters
- Maximum length: 100 characters
- Cho phép chữ cái, số, khoảng trắng và các ký tự đặc biệt thông dụng

### BR-2: Icon Selection
- Mỗi benefit phải có icon
- Icon có thể chọn từ predefined set hoặc upload custom
- Upload icon: Accept PNG/JPG/SVG, max size 2MB
- Recommended icon size: 512x512px

### BR-3: Status Management
- Benefit mới tạo mặc định là ACTIVE
- Chỉ admin và manager có quyền toggle status
- INACTIVE benefits không thể assign vào packages mới
- Benefits đã được assign không thể delete, chỉ có thể set INACTIVE

### BR-4: Unit Constraints
- Benefit unit phải được chọn và không thể để trống
- Unit xác định cách calculate value cho benefit
- USD ($): Giá trị tính bằng số tiền
- Percentage (%): Giá trị tính theo phần trăm
- Points: Giá trị tính theo điểm thưởng

### BR-5: Package Status Workflow
- **DRAFT** → **PENDING** (Submit for approval)
- **PENDING** → **APPROVED** (Admin approval)
- **PENDING** → **REJECTED** (Admin rejection)
- **APPROVED** → **ACTIVE** (Enable for sale)
- **ACTIVE** → **INACTIVE** (Disable sale)
- Cannot skip workflow steps

### BR-6: Sorting Priority
- NULL/empty values luôn sort cuối cùng
- Date sorting: Newest to oldest (default)
- String sorting: A-Z (ascending)
- Number sorting: Low to high (ascending)

---

## 6. Edge Cases & Error Handling

### EC-1: Empty States
- **No data:** "No benefits found" / "No membership packages found"
- **No search results:** Same message với hint "Try different keywords"
- **No filter results:** Same message với "Clear filters" button option

### EC-2: Form Validation Errors
- **Missing icon:** "Please select an icon"
- **Empty name:** "Benefit name is required"
- **Empty unit:** "Benefit unit is required"
- **Name too short:** "Name must be at least 3 characters"
- **Name too long:** "Name must not exceed 100 characters"
- **Duplicate name:** "A benefit with this name already exists"

### EC-3: API Errors
- **Network error:** "Unable to connect. Please check your connection."
- **Server error:** "Something went wrong. Please try again."
- **Timeout:** "Request timed out. Please try again."
- **Unauthorized:** "You don't have permission to perform this action."
- Display error toast/notification với auto-dismiss sau 5s

### EC-4: Large Datasets
- **> 100 records:** Pagination works normally
- **> 1000 records:** Consider virtual scrolling (future enhancement)
- **Slow API:** Show loading skeleton/spinner
- **Failed load:** Show retry button

### EC-5: Long Text Overflow
- **Long benefit names:** Truncate với ellipsis sau 2 lines (mobile) / 1 line (desktop)
- **Long emails:** Truncate middle part "john...@example.com"
- **Tooltip:** Show full text on hover (desktop)

### EC-6: Modal on Small Screens
- **Very small mobile (<320px):** Modal still usable với minimal padding
- **Landscape mode:** Modal height responsive với max-height constraint
- **Keyboard open:** Modal scrollable, form fields accessible

### EC-7: Duplicate Icon Selection
- Multiple benefits có thể dùng cùng icon (no restriction)
- Icon chỉ dùng để visual identification, không phải unique identifier

---

## 7. Testing Scenarios

### TS-1: Tab Switching
**Steps:**
1. Load Benefits Setup page (default: Benefit List tab)
2. Click "Membership Package" tab
3. Verify data change
4. Click back to "Benefit List" tab

**Expected:**
- Active tab có underline style
- Data table switch tương ứng
- Search và filter reset
- Pagination reset về page 1
- Create button text change tương ứng

---

### TS-2: Search Functionality (Benefit List)
**Steps:**
1. Go to Benefit List tab
2. Type "Cash" vào search box
3. Verify results
4. Clear search box
5. Type "BEN002"

**Expected:**
- Step 2: Chỉ show benefits có "Cash" trong name/ID/unit
- Step 2: Pagination reset về page 1
- Step 4: All benefits hiển thị lại
- Step 5: Show exact benefit with ID "BEN002"

---

### TS-3: Status Filter (Membership Package)
**Steps:**
1. Go to Membership Package tab
2. Select "APPROVED" trong status filter
3. Verify only approved packages shown
4. Select "DRAFT"
5. Select "All"

**Expected:**
- Each selection filters data correctly
- Pagination adjusts to filtered count
- Empty state if no results
- "All" shows everything

---

### TS-4: Column Sorting
**Steps:**
1. Click "Benefit Name" header
2. Observe ascending sort
3. Click "Benefit Name" again
4. Observe descending sort
5. Click "Created Date" header

**Expected:**
- Step 2: Names A→Z, ChevronUp icon
- Step 4: Names Z→A, ChevronDown icon
- Step 5: Sort by date, icon moved to new column

---

### TS-5: Pagination
**Steps:**
1. Load page with 12 benefits, rows per page = 5
2. Verify showing "1–5 of 12"
3. Click Next button
4. Click Next again
5. Click Previous
6. Change rows per page to 10

**Expected:**
- Step 2: Page 1, prev disabled
- Step 3: Page 2 (6–10 of 12)
- Step 4: Page 3 (11–12 of 12), next disabled
- Step 5: Back to page 2
- Step 6: Reset to page 1, show 1–10 of 12

---

### TS-6: Create Benefit Modal - Success Flow
**Steps:**
1. Click "Create Benefit" button
2. Modal opens
3. Select DollarSign icon
4. Type "Monthly Reward" in name field
5. Select "USD ($)" as unit
6. Select "Monthly" rollover type
7. Select "Monthly" cycle
8. Click "Create" button

**Expected:**
- Step 2: Modal appears with animation
- Step 3: Icon has green border
- Step 4-7: Fields populated
- Step 8: Validation passes, API call made, success message, modal closes, list refreshes with new benefit

---

### TS-7: Create Benefit Modal - Validation Errors
**Steps:**
1. Open Create Benefit modal
2. Click "Create" without filling anything
3. Fill only name, click "Create"
4. Fill name + unit, but no icon

**Expected:**
- Step 2: Error messages for missing icon, name, unit
- Step 3: Error only for missing icon and unit
- Step 4: Error only for missing icon
- Errors clear when fields filled
- Cannot submit until all required fields valid

---

### TS-8: Quick Suggestions
**Steps:**
1. Open Create Benefit modal
2. Click "Cashback" chip
3. Verify name field
4. Click "Gift" chip

**Expected:**
- Step 2: Name field auto-filled with "Cashback"
- Step 4: Name field updated to "Gift"
- Can still edit manually after chip click

---

### TS-9: Modal Close Behaviors
**Steps:**
1. Open modal, select icon, fill name
2. Click X button
3. Re-open modal
4. Fill form partially
5. Click overlay to close
6. Re-open modal

**Expected:**
- Step 2: Modal closes, form cleared
- Step 3: Form is empty/reset
- Step 5: Modal closes, form cleared
- Step 6: Form is empty again
- All close methods reset form state

---

### TS-10: Status Toggle (Mobile)
**Steps:**
1. Open page on mobile
2. Find ACTIVE benefit
3. Click toggle switch
4. Observe changes
5. Click toggle again

**Expected:**
- Step 3: Switch animates to INACTIVE position, API called, badge updates to INACTIVE (red)
- Step 5: Switch back to ACTIVE position, badge green
- Smooth animation 0.2s
- If API fails: Switch reverts, error message shown

---

### TS-11: View Detail Action
**Steps:**
1. Click Eye icon on a benefit row (desktop)
2. Click "View" button on a card (mobile)

**Expected:**
- Navigate to benefit detail page
- Or open detail modal
- Correct benefit ID passed
- Detail page/modal shows full benefit info

---

### TS-12: Responsive Layout
**Steps:**
1. Load page on desktop (1920x1080)
2. Resize to tablet (768px)
3. Resize to mobile (375px)
4. Check all components

**Expected:**
- Desktop: Table view, inline filters, fixed width search
- Tablet: Similar to desktop
- Mobile: Card view, full width search, status toggle visible
- All breakpoints: Readable text, accessible buttons, proper spacing

---

### TS-13: Combined Filters & Sort
**Steps:**
1. Type "Discount" in search
2. Select "ACTIVE" status filter
3. Sort by Created Date descending
4. Verify results

**Expected:**
- Only ACTIVE benefits with "Discount" in name
- Sorted newest first
- Pagination shows correct count
- All filters work together

---

## 8. Performance Requirements

### PR-1: Page Load Time
- Initial load: < 2 seconds
- Tab switch: < 300ms
- Search/filter apply: < 500ms
- Sort operation: < 300ms
- Modal open: < 200ms

### PR-2: API Response Time
- GET benefits list: < 1 second
- POST create benefit: < 2 seconds
- PATCH update status: < 1 second
- GET benefit detail: < 800ms

### PR-3: Rendering Performance
- Table render 50 rows: < 500ms
- Mobile cards render 50 items: Smooth scroll 60fps
- Search debounce: 300ms
- Form validation: Real-time, < 100ms

### PR-4: Asset Optimization
- Icons: Use SVG (scalable, small size)
- Images: Lazy load, WebP format preferred
- Code splitting: Lazy load modal component
- Bundle size: Modal < 50KB gzipped

---

## 9. Accessibility Requirements

### A-1: Keyboard Navigation
- [ ] Tab order: Logical flow (header → tabs → search → filter → table/cards → pagination → modal)
- [ ] Enter key: Submit search, submit form, click buttons
- [ ] Escape key: Close modal
- [ ] Arrow keys: Navigate pagination
- [ ] Focus visible: Clear outline with high contrast

### A-2: Screen Reader Support
- [ ] Page title announced
- [ ] Tab labels with aria-label
- [ ] Table headers proper `<th>` tags
- [ ] Status badges with aria-label
- [ ] Sort state announced ("sorted ascending/descending")
- [ ] Pagination info announced
- [ ] Form labels associated with inputs
- [ ] Error messages announced
- [ ] Modal role="dialog", aria-labelledby, aria-describedby
- [ ] Loading states announced

### A-3: Color Contrast
- [ ] All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Green #00a76f on white: Pass
- [ ] Status badges: Pass (checked all combinations)
- [ ] Focus indicators: High contrast blue/green
- [ ] Disabled states: Still visible (not too faint)

### A-4: Touch Targets (Mobile)
- [ ] Minimum size: 44x44px (iOS) / 48x48px (Android)
- [ ] Spacing between targets: ≥ 8px
- [ ] Toggle switch: Large enough for thumb
- [ ] Icon buttons: Adequate padding
- [ ] Chips: Easy to tap

---

## 10. Implementation Notes

### 10.1 Component Structure
```
BenefitsSetup/
├── index.tsx                    # Main page component
├── components/
│   ├── BenefitListTab.tsx      # Benefit list table/cards
│   ├── PackageTab.tsx          # Package list table/cards
│   ├── SearchFilter.tsx        # Reusable search + filter toolbar
│   ├── DataTable.tsx           # Generic table component
│   ├── MobileCard.tsx          # Mobile card view
│   ├── StatusBadge.tsx         # Status badge component
│   ├── StatusToggle.tsx        # Status toggle switch (mobile)
│   ├── Pagination.tsx          # Pagination controls
│   ├── CreateBenefitModal.tsx  # Create benefit modal
│   ├── IconSelector.tsx        # Icon grid selector
│   └── BenefitIcon.tsx         # Benefit icon component
├── hooks/
│   ├── useBenefits.ts          # Fetch benefits data
│   ├── usePackages.ts          # Fetch packages data
│   ├── useFilters.ts           # Filter state management
│   ├── useSorting.ts           # Sorting logic
│   └── usePagination.ts        # Pagination logic
└── utils/
    ├── validators.ts            # Form validation
    └── formatters.ts            # Date, text formatters
```

### 10.2 State Management
- **Local State:** Search, filters, sorting, pagination, modal open/close
- **Form State:** Benefit creation form fields
- **Server State:** Benefits list, packages list (consider React Query/SWR)
- **URL Params:** Sync filters, sort, page to URL for shareability

### 10.3 Performance Optimizations
- **Memoization:** Memo table rows, filter/sort functions
- **Debounce:** Search input (300ms)
- **Lazy Load:** Modal component, detail pages
- **Virtual Scroll:** Consider for very large lists (future)
- **Code Splitting:** Route-based splitting

### 10.4 Form Validation
- **Client-side:** Real-time validation on blur/change
- **Server-side:** Validation on submit (duplicate check, etc.)
- **Error Display:** Inline errors under fields
- **Success Feedback:** Toast notification + modal close

### 10.5 Dependencies
- `lucide-react`: Icons
- `react-hook-form` (optional): Form management
- `zod` (optional): Schema validation
- `react-query` or `swr` (recommended): Server state management
- `react-hot-toast` or `sonner`: Toast notifications

---

## 11. Future Enhancements

### FE-1: Bulk Actions
- Select multiple benefits/packages
- Bulk status update
- Bulk delete (soft delete)
- Bulk export

### FE-2: Advanced Filters
- Filter by date range (created date)
- Filter by creator
- Multi-select status filter
- Save filter presets

### FE-3: Benefit Templates
- Save benefit configuration as template
- Quick create from template
- Template library

### FE-4: Drag & Drop Icon Upload
- Drag zone for icon upload
- Image crop/resize tool
- Multiple file upload at once

### FE-5: Benefit Usage Analytics
- Track benefit usage in packages
- View which packages include a benefit
- Usage statistics dashboard

### FE-6: Import/Export
- CSV import benefits
- Excel export with formatting
- Bulk create via import

### FE-7: Audit Log
- Track all changes to benefits
- View history timeline
- Revert changes functionality

### FE-8: Rich Text Description
- Add WYSIWYG editor for benefit description
- Support markdown/HTML
- Image embed in description

---

## 12. Definition of Done

- [ ] All functional requirements implemented
- [ ] UI matches design specifications
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] All test scenarios pass
- [ ] Search và filter working correctly
- [ ] Sorting working on all columns
- [ ] Pagination working correctly
- [ ] Create benefit modal fully functional
- [ ] Form validation working (client + server)
- [ ] Status toggle working (mobile)
- [ ] Empty states handled
- [ ] Error states handled gracefully
- [ ] Loading states implemented (skeleton/spinner)
- [ ] Accessibility requirements met (WCAG AA)
- [ ] Keyboard navigation working
- [ ] Screen reader compatible
- [ ] Performance benchmarks met
- [ ] API integration complete
- [ ] Code reviewed và approved
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
