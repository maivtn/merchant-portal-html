# Acceptance Criteria: Membership Report

## 1. Overview

**Feature Name:** Membership Report  
**Module:** Dashboard / Reporting  
**Description:** Màn hình báo cáo membership với 2 loại report: Member Card Report (báo cáo từng thẻ membership) và Membership Package Report (báo cáo tổng hợp theo gói membership). Hỗ trợ tìm kiếm, lọc theo ngày, sắp xếp và xuất dữ liệu.

---

## 2. Functional Requirements

### FR-1: Tab Navigation
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn chuyển đổi giữa 2 loại báo cáo để xem thông tin chi tiết theo thẻ hoặc theo gói membership.

**Acceptance Criteria:**
- [ ] Hiển thị 2 tabs:
  - **Member Card Report** (icon: CreditCard)
  - **Membership Package Report** (icon: Package)
- [ ] Active tab có:
  - Border bottom: 2px solid #212b36
  - Font weight: 600
  - Text color: #212b36
- [ ] Inactive tab có:
  - Font weight: 400
  - Text color: #637381
  - Hover: text color chuyển sang #212b36
- [ ] Font size: 12px (mobile) / 14px (desktop)
- [ ] Tab switching không reload data mà chỉ toggle view
- [ ] Minimal underline design (không có background fill)

---

### FR-2: Member Card Report - Data Display
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn xem danh sách tất cả các thẻ membership đã phát hành với thông tin chi tiết.

**Acceptance Criteria:**
- [ ] Hiển thị bảng với các cột:
  1. **Card number** (align left): Format `8888 **** **** [4 số cuối]`
  2. **Package Name** (align left): Tên gói membership
  3. **Start Date** (align left): Format `MMM DD, YYYY`
  4. **End Date** (align left): Format `MMM DD, YYYY`
  5. **Membership period** (align left): Số ngày (e.g., "365 days", "90 days")
  6. **Purchase Price** (align right): Format currency với $
  7. **Platform fee ratio** (align right): % phí nền tảng
  8. **Platform fee** (align right): Số tiền phí nền tảng
  9. **% Discount** (align right): % giảm giá (text color: #ff5630, font weight: 600)
  10. **Discount Amount** (align right): Số tiền giảm (text color: #ff5630, font weight: 600)
  11. **Total Revenue** (align right): Tổng doanh thu (font weight: 700)

- [ ] Desktop view: Table layout với horizontal scroll nếu cần
- [ ] Mobile view: Card layout với thông tin key-value pairs
- [ ] Empty state: "No records found" (text align center, color: #919eab)
- [ ] Row hover effect (desktop): background #f9fafb

---

### FR-3: Membership Package Report - Data Display
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn xem báo cáo tổng hợp theo từng gói membership để đánh giá hiệu suất.

**Acceptance Criteria:**
- [ ] Hiển thị bảng với các cột:
  1. **Package Name** (align left): Tên gói
  2. **Membership period** (align left): Loại chu kỳ (Monthly/Yearly)
  3. **Purchase Price** (align right): Giá gói
  4. **Total members** (align right): Tổng số thành viên
  5. **Active members** (align right): Số thành viên đang active
  6. **Expired member** (align right): Số thành viên hết hạn (text color: #ff5630)
  7. **Platform fee ratio** (align right): % phí nền tảng
  8. **Platform fee** (align right): Số tiền phí
  9. **% Discount** (align right): % giảm giá (text color: #ff5630, font weight: 600)
  10. **Discount Amount** (align right): Số tiền giảm (text color: #ff5630, font weight: 600)
  11. **Total Revenue** (align right): Tổng doanh thu (font weight: 700)

- [ ] Desktop: Table layout
- [ ] Mobile: Card layout hiển thị:
  - Header: Package name + Purchase price
  - Subheader: Period
  - Grid: Platform fee, Discount, Total/Active/Expired members, Total revenue
- [ ] Empty state: "No records found"

---

### FR-4: Search Functionality
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn tìm kiếm nhanh các record theo card number hoặc package name.

**Acceptance Criteria:**
- [ ] Search box có:
  - Icon: Search (lucide-react)
  - Placeholder cho Member Card Report: "Search by Card number or Package Name"
  - Placeholder cho Membership Package Report: "Search by Package Name"
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Height: 48px
  - Font size: 14px
  - Focus border color: #212b36
- [ ] Mobile: Search box full width
- [ ] Desktop: Search box width 280px
- [ ] Search real-time (không cần nhấn enter)
- [ ] Search không case-sensitive
- [ ] Member Card Report: Tìm trong fields `cardNumber` và `packageName`
- [ ] Membership Package Report: Tìm trong field `packageName`
- [ ] Reset về page 1 khi search

---

### FR-5: Date Range Filter
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn lọc dữ liệu theo khoảng thời gian để phân tích theo period cụ thể.

**Acceptance Criteria:**
- [ ] Desktop: Hiển thị 2 date pickers inline
  - **Start date** (label: "Start date")
  - **End date** (label: "End date")
  - Width: 180px mỗi picker
  - Height: 48px
  - Placeholder: "Pick a date" (color: #919eab)
  - Border: 1px solid #dfe3e8
  - Border radius: 8px
  - Focus border: #212b36
  - Label floating (top: -8px, left: 12px, bg: white, font size: 12px, color: #637381)

- [ ] Mobile: Filter button
  - Icon: Filter (lucide-react)
  - Text: "Filter"
  - Click mở bottom sheet modal
  - Modal có:
    - Header: "Filter" + Close button (X icon)
    - 2 date pickers (full width)
    - Footer: "Reset" button + "Apply" button (green #00a76f)
  - Apply button: Áp dụng filter và đóng modal
  - Reset button: Clear cả 2 date fields

- [ ] Date filtering logic:
  - Filter theo `startDate` và `endDate` của record
  - Nếu chỉ chọn Start date: Lọc records có date >= start date
  - Nếu chỉ chọn End date: Lọc records có date <= end date
  - Nếu chọn cả 2: Lọc records trong khoảng [start, end]

- [ ] Reset về page 1 khi apply filter

---

### FR-6: Column Sorting
**Priority:** MEDIUM  
**User Story:** Là người dùng, tôi muốn sắp xếp dữ liệu theo các cột để dễ dàng phân tích.

**Acceptance Criteria:**
- [ ] Click vào bất kỳ column header nào để sort
- [ ] First click: Sort ascending (icon ChevronUp, color #00a76f)
- [ ] Second click: Sort descending (icon ChevronDown, color #00a76f)
- [ ] Sort indicator chỉ hiển thị ở cột đang active
- [ ] Sorting logic:
  - String columns: Alphabetical sort
  - Number columns: Numeric sort (parse currency values, percentages)
  - Date columns: Chronological sort
- [ ] Sort algorithm: `localeCompare` with `numeric: true` option
- [ ] Header cursor: pointer
- [ ] Header user-select: none

---

### FR-7: Pagination
**Priority:** HIGH  
**User Story:** Là người dùng, tôi muốn điều hướng qua nhiều trang dữ liệu và tùy chỉnh số rows hiển thị.

**Acceptance Criteria:**
- [ ] Rows per page selector:
  - Options: 10, 25, 50
  - Default: 10
  - Label: "Rows per page:"
  - Font size: 13px
  - Dropdown height: 32px
  - Border: 1px solid #dfe3e8

- [ ] Pagination info:
  - Format: "X–Y of Z" (e.g., "1–10 of 45")
  - Nếu empty: "0–0 of 0"
  - Font size: 13px
  - Color: #637381
  - Position: Right side (margin-left: auto)

- [ ] Navigation buttons:
  - Previous button: ChevronLeft icon
  - Next button: ChevronRight icon
  - Size: 32x32px
  - Border: 1px solid #dfe3e8
  - Border radius: 6px
  - Disabled state:
    - Cursor: not-allowed
    - Color: #c4cdd5
    - Disabled when: First page (prev) / Last page (next)

- [ ] Reset về page 1 khi:
  - Thay đổi search query
  - Thay đổi filter
  - Thay đổi rows per page

- [ ] Page auto-adjust: Nếu current page > total pages sau khi filter, tự động về page gần nhất

---

### FR-8: Export Functionality
**Priority:** LOW  
**User Story:** Là người dùng, tôi muốn xuất dữ liệu báo cáo ra file để sử dụng offline hoặc báo cáo.

**Acceptance Criteria:**
- [ ] Export button trong page header (nếu có design)
- [ ] Icon: Download (lucide-react)
- [ ] Export format: CSV hoặc Excel
- [ ] Export bao gồm:
  - All filtered records (không chỉ current page)
  - All columns
  - Formatted values (currency, dates, percentages)
- [ ] File name format: `membership-report-[type]-[date].csv`
  - Ví dụ: `membership-report-card-2025-03-12.csv`

---

## 3. UI/UX Specifications

### 3.1 Layout Structure
```
┌─────────────────────────────────────────────────────┐
│ Page Header                                         │
│ - Title: "Membership Report" (22px bold #161c24)   │
│ - Breadcrumb: Dashboard > Membership Report        │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│ White Card Container (rounded-2xl, shadow)         │
│ ┌───────────────────────────────────────────────┐  │
│ │ Tab Bar (border-bottom: #f4f6f8)             │  │
│ │ [Member Card Report] [Membership Package]    │  │
│ └───────────────────────────────────────────────┘  │
│ ┌───────────────────────────────────────────────┐  │
│ │ Toolbar (border-bottom: dashed #919eab30)    │  │
│ │ [Search] [Start Date] [End Date]             │  │
│ └───────────────────────────────────────────────┘  │
│ ┌───────────────────────────────────────────────┐  │
│ │ Data Table / Card List                       │  │
│ │                                              │  │
│ └───────────────────────────────────────────────┘  │
│ ┌───────────────────────────────────────────────┐  │
│ │ Pagination (border-top: dashed #919eab30)    │  │
│ │ [Rows/page] ... [Info] [Prev] [Next]        │  │
│ └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 3.2 Color Palette
- **Primary Green:** #00a76f
- **Text Primary:** #212b36
- **Text Secondary:** #637381
- **Text Tertiary:** #919eab
- **Border:** #dfe3e8
- **Background:** #f9fafb
- **Card Background:** #ffffff
- **Header Background:** #f9fafb
- **Discount/Error:** #ff5630
- **Disabled:** #c4cdd5
- **Hover Background:** #f9fafb

### 3.3 Typography
- **Font Family:** Poppins, sans-serif
- **Page Title:** 22px, bold (mobile: 18px)
- **Tab Label:** 14px (mobile: 12px)
- **Table Header:** 13px, weight 600
- **Table Cell:** 14px, weight 400 (revenue: 700, discount: 600)
- **Search Placeholder:** 14px
- **Filter Label:** 12px, weight 600
- **Pagination:** 13px

### 3.4 Spacing & Sizing
- **Page Padding:** Desktop: 40px horizontal, Mobile: 12px
- **Card Border Radius:** 16px
- **Input Border Radius:** 8px
- **Button Border Radius:** 8px / 6px (pagination)
- **Search Height:** 48px
- **Date Picker Height:** 48px
- **Input Border:** 1px solid #dfe3e8
- **Tab Padding:** 14px vertical, 4px horizontal
- **Table Cell Padding:** 15px vertical, 16px horizontal
- **Toolbar Padding:** 20px vertical, 24px horizontal (desktop)

### 3.5 Mobile Card Layout (Member Card Report)
```
┌──────────────────────────────────────┐
│ 8888 **** **** 5678        $500     │ ← Header (bold)
│ Gold                                │ ← Subheader
├──────────────────────────────────────┤ ← Dashed border
│ Start Date:           Jan 01, 2025  │
│ End Date:             Jan 01, 2026  │
│ Purchase Price:              $500   │
│ Platform Fee (7%):            $35   │
│ Discount (10%):               $50   │ ← Red text
│ Total Revenue:               $450   │ ← Bold
└──────────────────────────────────────┘
```

### 3.6 Mobile Card Layout (Membership Package Report)
```
┌──────────────────────────────────────┐
│ Gold                         $500    │ ← Header (bold)
│ Yearly                              │ ← Subheader
├──────────────────────────────────────┤ ← Dashed border
│ Purchase Price:              $500   │
│ Platform Fee (7%):            $35   │
│ Discount (10%):               $50   │ ← Red text
│ Total Members:                180   │
│ Active Members:               155   │
│ Expired Members:               25   │ ← Red text
│ Total Revenue:            $81,000   │ ← Bold
└──────────────────────────────────────┘
```

### 3.7 Responsive Breakpoints
- **Mobile:** < 768px
  - Card view
  - Filter button với bottom sheet modal
  - Full width search
  - Stacked layout
- **Desktop:** ≥ 768px
  - Table view
  - Inline date pickers
  - Fixed width search (280px)
  - Horizontal layout

---

## 4. Data Requirements

### 4.1 Member Card Report Data Model
```typescript
interface MemberCardReport {
  cardNumber: string;          // Format: "**** XXXX"
  packageName: string;         // Package name
  startDate: string;           // Format: "MMM DD, YYYY"
  endDate: string;             // Format: "MMM DD, YYYY"
  period: string;              // Format: "X days"
  purchasePrice: string;       // Format: "$X,XXX"
  platformFeeRatio: string;    // Format: "X%"
  platformFee: string;         // Format: "$XXX"
  discountPercent: string;     // Format: "X%"
  discountAmount: string;      // Format: "$XXX"
  totalRevenue: string;        // Format: "$X,XXX"
}
```

### 4.2 Membership Package Report Data Model
```typescript
interface MembershipPackageReport {
  packageName: string;         // Package name
  startDate: string;           // Format: "MMM DD, YYYY"
  endDate: string;             // Format: "MMM DD, YYYY"
  period: string;              // "Monthly" | "Yearly"
  purchasePrice: string;       // Format: "$X,XXX"
  totalMembers: number;        // Total count
  activeMembers: number;       // Active count
  expiredMembers: number;      // Expired count
  platformFeeRatio: string;    // Format: "X%"
  platformFee: string;         // Format: "$XXX"
  discountPercent: string;     // Format: "X%"
  discountAmount: string;      // Format: "$XXX"
  totalRevenue: string;        // Format: "$X,XXX"
}
```

### 4.3 API Requirements
- **Endpoint:** `GET /api/membership-reports`
- **Query Parameters:**
  - `type`: "card" | "package"
  - `search`: string (optional)
  - `startDate`: ISO date string (optional)
  - `endDate`: ISO date string (optional)
  - `sortBy`: column key (optional)
  - `sortDirection`: "asc" | "desc" (optional)
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
- **Response:**
  ```json
  {
    "data": [...],
    "total": 123,
    "page": 1,
    "limit": 10
  }
  ```

---

## 5. Business Rules

### BR-1: Revenue Calculation
- **Formula:** `Total Revenue = Purchase Price - Platform Fee - Discount Amount`
- Platform Fee tính từ Purchase Price × Platform Fee Ratio
- Discount Amount tính từ Purchase Price × Discount Percent

### BR-2: Member Status
- **Active Member:** End date > Current date
- **Expired Member:** End date ≤ Current date
- Active + Expired = Total Members

### BR-3: Period Calculation
- Tính từ Start Date đến End Date
- Format: "X days" (e.g., "30 days", "365 days")
- Monthly ≈ 30 days
- Yearly = 365 days

### BR-4: Card Number Display
- Luôn hiển thị prefix "8888" cho card bank
- Mask middle digits: "****"
- Hiển thị 4 số cuối
- Full format: "8888 **** **** XXXX"

### BR-5: Sorting Priority
- NULL values luôn ở cuối danh sách
- String sort: Case-insensitive
- Number sort: Parse currency và percentage symbols

---

## 6. Edge Cases & Error Handling

### EC-1: Empty State
- **Scenario:** Không có data hoặc search/filter không trả về kết quả
- **Expected:** Hiển thị "No records found" ở center của table/card area
- **Style:** Text color #919eab, font size 14px, padding 40px (desktop) / 48px (mobile)

### EC-2: Invalid Date Range
- **Scenario:** End date < Start date
- **Expected:** Không validate, vẫn cho phép filter (backend sẽ trả về empty)
- **Alternative:** Show warning toast "End date must be after start date"

### EC-3: Large Dataset
- **Scenario:** > 1000 records
- **Expected:** 
  - Pagination hoạt động bình thường
  - Có loading indicator khi fetch data
  - Consider virtual scrolling cho performance

### EC-4: Mobile Landscape Mode
- **Scenario:** Mobile device xoay ngang
- **Expected:** Vẫn giữ card layout, không chuyển sang table

### EC-5: Long Package Names
- **Scenario:** Package name > 50 characters
- **Expected:** 
  - Desktop: Text truncate với ellipsis
  - Mobile: Wrap text (2 lines max)

### EC-6: Zero Revenue
- **Scenario:** Total Revenue = $0
- **Expected:** Hiển thị "$0" (không phải "—" hoặc empty)

### EC-7: Null/Missing Values
- **Scenario:** Một field bị null/undefined
- **Expected:** Hiển thị "—" với color #c4cdd5

---

## 7. Testing Scenarios

### TS-1: Tab Switching
**Steps:**
1. Load Membership Report page
2. Click "Membership Package Report" tab
3. Click back "Member Card Report" tab

**Expected:**
- Active tab có underline #212b36
- Data table switch tương ứng
- Search/filter state reset
- No data re-fetch (use cached data)

---

### TS-2: Search Functionality
**Steps:**
1. Go to Member Card Report
2. Type "Gold" vào search box
3. Clear search box

**Expected:**
- Step 2: Chỉ hiển thị cards có package name = "Gold"
- Step 2: Pagination reset về page 1
- Step 3: Hiển thị lại all records

---

### TS-3: Date Range Filter (Desktop)
**Steps:**
1. Select Start Date: Jan 01, 2025
2. Select End Date: Dec 31, 2025
3. Observe filtered data

**Expected:**
- Chỉ hiển thị records có start date hoặc end date trong range
- Pagination reset về page 1
- Filter values persist khi switch tabs

---

### TS-4: Date Range Filter (Mobile)
**Steps:**
1. Click Filter button
2. Select Start Date và End Date trong modal
3. Click "Apply"
4. Click Filter button lại
5. Click "Reset"

**Expected:**
- Step 3: Modal close, data filtered
- Step 4: Modal hiển thị values đã chọn trước đó
- Step 5: Date fields cleared, data reset

---

### TS-5: Column Sorting
**Steps:**
1. Click "Total Revenue" header
2. Click "Total Revenue" header lại
3. Click "Package Name" header

**Expected:**
- Step 1: Sort ascending, ChevronUp icon
- Step 2: Sort descending, ChevronDown icon
- Step 3: Sort by name ascending, icon chuyển sang column mới

---

### TS-6: Pagination Navigation
**Steps:**
1. Load page with 25 records, rows per page = 10
2. Click Next button
3. Click Next button
4. Click Previous button
5. Change rows per page to 25

**Expected:**
- Step 1: Show page 1 (records 1-10)
- Step 2: Show page 2 (records 11-20)
- Step 3: Show page 3 (records 21-25), Next button disabled
- Step 4: Show page 2
- Step 5: Reset to page 1, show all 25 records

---

### TS-7: Combined Filters
**Steps:**
1. Type "Silver" vào search
2. Set Start Date = Jan 01, 2025
3. Sort by Total Revenue descending

**Expected:**
- Hiển thị chỉ Silver packages trong date range
- Sorted by revenue cao nhất trước
- Pagination cập nhật theo filtered count

---

### TS-8: Mobile Card View
**Steps:**
1. Resize browser to mobile width (< 768px)
2. Scroll through card list
3. Switch to Package Report tab

**Expected:**
- Cards hiển thị đúng layout
- All key info visible (không bị truncate)
- Tab switch smooth, card layout persist

---

### TS-9: Empty State
**Steps:**
1. Search for "NonExistentPackage"
2. Clear search

**Expected:**
- Step 1: "No records found" message
- Pagination shows "0–0 of 0"
- Step 2: Data returns

---

### TS-10: Export Functionality
**Steps:**
1. Apply filters (search + date range)
2. Click Export button
3. Open downloaded file

**Expected:**
- File downloads successfully
- Contains all filtered records (not just current page)
- Format correct (CSV/Excel)
- Filename includes report type và date

---

## 8. Performance Requirements

### PR-1: Page Load Time
- Initial page load: < 2 seconds
- Tab switch: < 200ms (instant)
- Search/filter apply: < 500ms
- Sort operation: < 300ms

### PR-2: Data Rendering
- Desktop table: Render 50 rows without lag
- Mobile cards: Smooth scrolling với 100+ items
- Virtual scrolling nếu > 500 records

### PR-3: Responsive Design
- Breakpoint transition: Smooth, no flicker
- Touch targets (mobile): Minimum 44x44px
- Horizontal scroll (desktop table): Smooth với trackpad

---

## 9. Accessibility Requirements

### A-1: Keyboard Navigation
- [ ] Tab key: Navigate through search, filters, tabs, pagination
- [ ] Enter key: Submit search, apply filter
- [ ] Arrow keys: Navigate pagination buttons
- [ ] Focus visible: Outline với high contrast color

### A-2: Screen Reader Support
- [ ] Tab labels có aria-label
- [ ] Table headers có proper `<th>` tags
- [ ] Pagination info announced
- [ ] Sort direction announced
- [ ] Loading states announced

### A-3: Color Contrast
- [ ] All text meets WCAG AA (4.5:1 for normal text)
- [ ] Discount red (#ff5630) on white: Pass
- [ ] Primary green (#00a76f) on white: Pass
- [ ] Disabled state (#c4cdd5) clearly visible

---

## 10. Implementation Notes

### 10.1 Component Structure
```
MembershipReport/
├── index.tsx                 # Main page component
├── components/
│   ├── TabBar.tsx           # Tab switcher
│   ├── ReportTable.tsx      # Reusable table component
│   ├── ReportToolbar.tsx    # Search + filters
│   ├── MemberCardTable.tsx  # Card report specific
│   ├── PackageTable.tsx     # Package report specific
│   ├── MobileCardView.tsx   # Mobile card layout
│   ├── FilterModal.tsx      # Mobile filter modal
│   └── Pagination.tsx       # Pagination controls
├── hooks/
│   ├── useReportData.ts     # Data fetching logic
│   ├── useReportFilters.ts  # Filter state management
│   └── useReportSort.ts     # Sorting logic
└── utils/
    ├── formatters.ts         # Date, currency formatters
    └── exportData.ts         # CSV/Excel export logic
```

### 10.2 State Management
- **Local State:** Search, filters, sorting, pagination
- **Consider:** Zustand/Context nếu cần share state với components khác
- **URL Params:** Sync filters vào URL để có thể share/bookmark filtered views

### 10.3 Performance Optimizations
- **Memoization:** Memo table rows, sort/filter logic
- **Debounce:** Search input (300ms)
- **Lazy Load:** Load data on demand (pagination)
- **Virtual Scroll:** Nếu cần handle large datasets

### 10.4 Dependencies
- `lucide-react`: Icons (Search, Download, Filter, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, CreditCard, Package, X)
- `date-fns` (optional): Date formatting và manipulation
- `react-table` (optional): Advanced table features
- `papaparse` (optional): CSV export

---

## 11. Future Enhancements

### FE-1: Advanced Filters
- Filter by specific package names (multi-select)
- Filter by revenue range
- Filter by member count range
- Custom date presets (This Month, Last Quarter, etc.)

### FE-2: Charts & Visualizations
- Revenue trend chart (line chart)
- Package distribution pie chart
- Member growth chart
- Top performing packages bar chart

### FE-3: Export Options
- PDF export với branded template
- Excel export với formatting
- Scheduled reports (email delivery)

### FE-4: Bulk Actions
- Select multiple records
- Bulk export selected items
- Bulk status update

### FE-5: Comparison Mode
- Compare 2 time periods side-by-side
- Year-over-year comparison
- Package performance comparison

---

## 12. Definition of Done

- [ ] All functional requirements implemented
- [ ] UI matches design specifications
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] All test scenarios pass
- [ ] Search, filter, sort working correctly
- [ ] Pagination working correctly
- [ ] Empty states handled
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Accessibility requirements met
- [ ] Performance benchmarks met
- [ ] Code reviewed và approved
- [ ] Unit tests written (coverage > 80%)
- [ ] Integration tests written
- [ ] Documentation updated
- [ ] QA testing completed
- [ ] Product owner approval

---

**Document Version:** 1.0  
**Last Updated:** 2025-03-12  
**Author:** VLINKPAY Development Team
