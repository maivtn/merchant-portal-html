# ACCEPTANCE CRITERIA - PRODUCT MANAGEMENT

## 📋 Tổng quan
Màn hình **Product Management** cho phép quản lý các sản phẩm Gift & Voucher trong hệ thống VLINKPAY, bao gồm E-Gift Card, E-Voucher, Gift Card, Membership, Crypto Card, và các loại khác.

---

## 🎯 User Stories

### US-01: Xem danh sách sản phẩm
**Là một** quản trị viên  
**Tôi muốn** xem danh sách tất cả các sản phẩm Gift & Voucher  
**Để** có thể quản lý và theo dõi trạng thái của chúng

### US-02: Lọc và tìm kiếm sản phẩm
**Là một** quản trị viên  
**Tôi muốn** lọc và tìm kiếm sản phẩm theo nhiều tiêu chí  
**Để** nhanh chóng tìm được sản phẩm cần xem hoặc chỉnh sửa

### US-03: Phát hành card mới
**Là một** quản trị viên  
**Tôi muốn** phát hành card mới (Issue Card)  
**Để** tạo thêm sản phẩm Gift & Voucher cho khách hàng

### US-04: Hủy card chờ duyệt
**Là một** quản trị viên  
**Tôi muốn** hủy các card đang ở trạng thái chờ duyệt  
**Để** loại bỏ card không cần thiết hoặc tạo nhầm

---

## ✅ Functional Requirements

### FR-01: Header & Navigation
**GIVEN** người dùng truy cập màn hình Product Management  
**WHEN** trang được tải  
**THEN** hiển thị:
- ✓ Title: "Product Management" (font size 22px desktop, 18px mobile, font weight 700, color #161c24)
- ✓ Breadcrumb: "Gift & Voucher • Product Management" (chỉ hiển thị trên desktop)
- ✓ Button "Issue Card" màu primary (#00a76f) ở góc phải
  - Desktop: hiển thị icon + text "Issue Card"
  - Mobile: chỉ hiển thị icon dạng hình tròn 40x40px

**WHEN** click "Issue Card"  
**THEN** mở dialog "Create Gift & Voucher" để chọn mode tạo card

---

### FR-02: Platform Tabs
**GIVEN** người dùng xem danh sách sản phẩm  
**WHEN** tương tác với Platform Tabs  
**THEN**:
- ✓ Hiển thị 3 tabs: "All", "VLINKPAY Platform", "Store"
- ✓ Tab active có border-bottom 2px màu #161c24, font weight 700
- ✓ Tab inactive có màu text #637381, font weight 500
- ✓ Click tab sẽ lọc sản phẩm theo Issue Mode tương ứng
- ✓ Reset về trang 1 khi chuyển tab

---

### FR-03: Category Chip Tabs
**GIVEN** người dùng muốn lọc theo danh mục  
**WHEN** tương tác với Category Tabs  
**THEN**:
- ✓ Hiển thị 9 category chips: "All", "Gift card", "Promotion", "Discount", "Membership", "Prepaid card", "E-Gift card", "E-Voucher", "Crypto Card"
- ✓ Chip active có background #00a76f, text màu white, font weight 700
- ✓ Chip inactive có border 1px solid #dfe3e8, text màu #637381, font weight 500
- ✓ Các chips wrap xuống dòng mới nếu không đủ chỗ
- ✓ Click chip sẽ lọc sản phẩm theo category
- ✓ Reset về trang 1 khi chuyển category

---

### FR-04: Search Functionality
**GIVEN** người dùng muốn tìm kiếm sản phẩm  
**WHEN** nhập text vào ô search  
**THEN**:
- ✓ Placeholder: "Product ID, Name, Card Number"
- ✓ Search icon hiển thị bên phải input
- ✓ Tìm kiếm theo Product ID, Product Name, và Card Number (case-insensitive)
- ✓ Kết quả tìm kiếm cập nhật real-time khi nhập
- ✓ Reset về trang 1 khi search
- ✓ Input có label "Search" phía trên
- ✓ Border màu #dfe3e8, khi focus đổi thành #212b36

**Desktop**: Search box có min-width  
**Mobile**: Search box chiếm full width trừ nút Filter

---

### FR-05: Filter System (Desktop)
**GIVEN** người dùng muốn lọc sản phẩm (desktop)  
**WHEN** sử dụng bộ lọc  
**THEN** hiển thị 4 filter controls trong filter bar:

#### Product Status Dropdown
- ✓ Label: "Product Status"
- ✓ Options: All Statuses, AWAITING APPROVAL, APPROVED, CANCELLED, EXPIRED
- ✓ Default: "All Statuses"
- ✓ Reset về trang 1 khi thay đổi

#### Card Locked Dropdown
- ✓ Label: "Card Locked"
- ✓ Options: All Statuses, LOCKED, UNLOCKED
- ✓ Default: "All Statuses"
- ✓ Reset về trang 1 khi thay đổi

#### Created From Date
- ✓ Label: "Created From"
- ✓ Placeholder: "Pick a date" (màu #919eab)
- ✓ Calendar icon bên phải
- ✓ Date picker native browser
- ✓ Reset về trang 1 khi chọn ngày

#### To Date
- ✓ Label: "To"
- ✓ Placeholder: "Pick a date" (màu #919eab)
- ✓ Calendar icon bên phải
- ✓ Date picker native browser
- ✓ Reset về trang 1 khi chọn ngày

**Filter Logic**:
- ✓ Filters kết hợp với nhau (AND logic)
- ✓ Filter hoạt động cùng với search và tabs

---

### FR-06: Mobile Filter Modal
**GIVEN** người dùng truy cập từ mobile  
**WHEN** click nút "Filter"  
**THEN**:
- ✓ Hiển thị modal bottom sheet với background overlay đen 30% opacity
- ✓ Modal có header "Filter" với nút close (X)
- ✓ Hiển thị 4 filter controls giống desktop nhưng layout dọc
- ✓ Date range (Created From, To) nằm cùng 1 hàng

**WHEN** thay đổi filter trong modal  
**THEN**:
- ✓ Lưu vào temporary state, chưa apply ngay lập tức
- ✓ Hiển thị 2 buttons: "Reset" và "Apply"

**WHEN** click "Reset"  
**THEN**:
- ✓ Reset tất cả filter về "All" / empty trong modal (chưa đóng modal)

**WHEN** click "Apply"  
**THEN**:
- ✓ Apply filters từ temporary state sang main state
- ✓ Đóng modal
- ✓ Cập nhật danh sách sản phẩm
- ✓ Reset về trang 1

**WHEN** click overlay hoặc nút close  
**THEN**:
- ✓ Đóng modal không apply changes
- ✓ Giữ nguyên filter hiện tại

---

### FR-07: Data Table (Desktop)
**GIVEN** người dùng xem danh sách trên desktop  
**WHEN** trang hiển thị kết quả  
**THEN** hiển thị bảng với các cột:

| Column | Width | Sortable | Notes |
|--------|-------|----------|-------|
| Issue Mode | 160px | ✓ | Hidden (display: none) |
| Product ID | 120px | ✓ | Color #637381, font 13px |
| Product Name | 160px | ✓ | Color #212b36, font 14px, weight 600 |
| Product Status | 170px | ✓ | Badge component |
| Sales Status | 110px | ✓ | Badge component (or "—") |
| Card Number | 170px | ✓ | Monospace font nếu khác "—" |
| Card Locked | 110px | ✓ | Badge component (or "—") |
| Amount | 100px | ✓ | Color #007b55, weight 700 |
| Sold | 70px | ✓ | Color #637381 (or "—") |
| Available | 80px | ✓ | Color #637381 (or "—") |
| Expiry Time | 120px | ✓ | Color #637381 (or "—") |
| Campaign Name | 150px | ✓ | Color #212b36 (or "—") |
| Redeem By | 190px | ✓ | Email color #637381 (or "—") |
| Last Redeem | 175px | ✓ | Date+time color #637381 (or "—") |
| Created Date | 120px | ✓ | Color #637381 |
| Last Updated | 120px | ✓ | Color #637381 |
| Actions | 90px | ✗ | Action buttons |

**Table Features**:
- ✓ Header: background #f4f6f8, text #637381, font 12px, weight 600, uppercase
- ✓ Row hover: background #f9fafb
- ✓ Row borders: dashed 1px rgba(145,158,171,0.24)
- ✓ Horizontal scroll khi cần thiết

---

### FR-08: Sorting
**GIVEN** người dùng xem bảng data  
**WHEN** click vào header có thể sort  
**THEN**:
- ✓ Lần 1: sort ascending, hiển thị icon ChevronUp màu #00a76f
- ✓ Lần 2: sort descending, hiển thị icon ChevronDown màu #00a76f
- ✓ Data được sắp xếp theo column đã chọn
- ✓ Chỉ sort được 1 column tại 1 thời điểm

**Sort Logic**:
- ✓ String comparison (locale compare)
- ✓ Sorting chỉ áp dụng cho data đã filtered

---

### FR-09: Mobile Cards View
**GIVEN** người dùng truy cập từ mobile  
**WHEN** xem danh sách sản phẩm  
**THEN** hiển thị card layout thay vì table:

**Card Structure**:
- ✓ White background, border radius 12px
- ✓ Border 1px #f4f6f8, shadow subtle
- ✓ Padding 16px
- ✓ Gap 12px giữa các cards

**Card Content**:
- ✓ **Header**: Product Name (font 15px, weight 700) + Amount (màu #007b55, weight 700)
- ✓ Product ID dưới name (font 12px, màu #637381)
- ✓ Product Status badge ở góc phải header
- ✓ **Info Grid**: các field quan trọng hiển thị dạng key-value pairs
  - Sales Status (nếu có)
  - Card Number (nếu khác "—")
  - Card Locked (nếu có)
  - Category
  - Campaign Name (nếu khác "—")
  - Sold / Available (nếu khác "—")
  - Created Date
- ✓ **Actions**: nút View và/hoặc Delete tùy status

---

### FR-10: Product Status Badges
**GIVEN** sản phẩm có status  
**WHEN** hiển thị trong bảng/card  
**THEN** render badge với màu sắc:

| Status | Background | Text Color |
|--------|-----------|-----------|
| AWAITING APPROVAL | #fff8e2 | #7a4f01 |
| APPROVED | #d8fbde | #007b55 |
| CANCELLED | #ffe4de | #b71d18 |
| EXPIRED | #f4f6f8 | #637381 |

**Badge Style**:
- ✓ Padding: 3px 10px
- ✓ Border radius: 6px
- ✓ Font size: 11px
- ✓ Font weight: 400
- ✓ Letter spacing: 0.4px

---

### FR-11: Sales Status Badges
**GIVEN** sản phẩm có Sales Status  
**WHEN** hiển thị trong bảng/card  
**THEN**:

| Status | Background | Text Color |
|--------|-----------|-----------|
| ACTIVE | #d8fbde | #007b55 |
| IN-ACTIVE | #f4f6f8 | #637381 |
| — | N/A | Hiển thị "—" màu #919eab |

---

### FR-12: Card Locked Badges
**GIVEN** sản phẩm có Card Locked status  
**WHEN** hiển thị trong bảng/card  
**THEN**:

| Status | Background | Text Color |
|--------|-----------|-----------|
| LOCKED | #fff0e6 | #b76e00 |
| UNLOCKED | #d8fbde | #007b55 |
| — | N/A | Hiển thị "—" màu #919eab |

---

### FR-13: Actions by Product Status
**GIVEN** người dùng xem action buttons  
**WHEN** status là "AWAITING APPROVAL"  
**THEN** hiển thị:
- ✓ **Delete button** (Trash icon):
  - Background: rgba(255,86,48,0.08)
  - Color: #ff5630
  - Size: 28x28px, border-radius 6px
  - Hover: background rgba(255,86,48,0.18)
  - Click: mở Cancel Card Modal
- ✓ **View button** (Eye icon):
  - Background: rgba(0,167,111,0.08)
  - Color: #00a76f
  - Size: 28x28px, border-radius 6px
  - Hover: background rgba(0,167,111,0.18)

**WHEN** status là "APPROVED"  
**THEN** hiển thị:
- ✓ **Copy Link button** (Link2 icon):
  - Background: rgba(145,158,171,0.08)
  - Color: #637381
  - Size: 28x28px, border-radius 6px
  - Hover: background rgba(0,167,111,0.08), color #00a76f
- ✓ **View button** (Eye icon) - tương tự trên

**WHEN** status là "CANCELLED" hoặc "EXPIRED"  
**THEN** chỉ hiển thị:
- ✓ **View button** (Eye icon) - tương tự trên

---

### FR-14: Cancel Card Modal
**GIVEN** người dùng click Delete button  
**WHEN** modal mở ra  
**THEN**:
- ✓ Overlay màu đen 30% opacity
- ✓ Modal centered, max-width 28rem (448px)
- ✓ Background white, border-radius 16px
- ✓ Shadow elevation standard

**Modal Header**:
- ✓ Title: "Cancel Card" (font 18px, weight 700, color #161c24)
- ✓ Close button (X icon) ở góc phải

**Modal Content**:
- ✓ Text hỏi xác nhận: "Are you sure you want to cancel this card?"
- ✓ Card info box với background #f9fafb:
  - Card Number (monospace nếu khác "—")
  - Package Name
- ✓ Textarea "Reason for Cancellation":
  - Label: "Reason for Cancellation" (font 13px, weight 600)
  - Placeholder: "Please provide a reason for cancelling this card..."
  - Rows: 4
  - Border #dfe3e8, focus border #212b36
  - Resize: vertical

**Modal Footer**:
- ✓ 2 buttons: "Cancel" và "Confirm Cancel"
- ✓ **Cancel button**:
  - Border 1px #dfe3e8, background white
  - Text color #212b36, weight 600
  - Height 44px
- ✓ **Confirm Cancel button**:
  - Background #ff5630, text white
  - Weight 600, height 44px
  - Hover: background darker

**Behavior**:
- ✓ Click overlay hoặc Cancel button: đóng modal, clear reason
- ✓ Click Confirm Cancel: thực hiện cancel card action, đóng modal
- ✓ ESC key: đóng modal

---

### FR-15: Pagination
**GIVEN** có nhiều sản phẩm  
**WHEN** xem danh sách  
**THEN** hiển thị pagination controls:

**Rows Per Page Selector**:
- ✓ Label: "Rows per page:"
- ✓ Options: 5, 10, 25
- ✓ Default: 10
- ✓ Dropdown với chevron icon
- ✓ Thay đổi sẽ update số items hiển thị

**Page Info**:
- ✓ Hiển thị: "{start}–{end} of {total}"
- ✓ Font 13px, color #637381
- ✓ Ví dụ: "1–10 of 45"

**Navigation Buttons**:
- ✓ Previous button (ChevronLeft icon):
  - Disabled khi ở trang 1
  - Color #c4cdd5 khi disabled, #637381 khi enabled
  - Cursor not-allowed khi disabled
- ✓ Next button (ChevronRight icon):
  - Disabled khi ở trang cuối
  - Color #c4cdd5 khi disabled, #637381 khi enabled
  - Cursor not-allowed khi disabled

**Pagination Logic**:
- ✓ Auto adjust về trang cuối nếu current page > total pages
- ✓ Reset về trang 1 khi filter/search/tab thay đổi

---

### FR-16: Empty State
**GIVEN** không có sản phẩm nào match filters  
**WHEN** danh sách rỗng  
**THEN**:
- ✓ Hiển thị text "No products found"
- ✓ Center aligned
- ✓ Padding 48px vertical, 24px horizontal
- ✓ Color #919eab, font 14px

---

## 🎨 UI/UX Requirements

### UX-01: White Card Container
- ✓ Background: white
- ✓ Border radius: 16px
- ✓ Shadow: `0 0 2px 0 rgb(145 158 171 / 0.2), 0 12px 24px -4px rgb(145 158 171 / 0.12)`
- ✓ Overflow: hidden
- ✓ Chứa tất cả tabs, filters, table/cards, pagination

### UX-02: Filter Bar Borders
- ✓ Platform tabs: bottom border 1px solid #f4f6f8
- ✓ Category chips: bottom border 1px dashed rgba(145,158,171,0.24)
- ✓ Filter bar: bottom border 1px dashed rgba(145,158,171,0.24)

### UX-03: Hover Effects
- ✓ Table rows: hover background #f9fafb với transition
- ✓ Action buttons: hover background intensity tăng
- ✓ Platform tabs: smooth color transition
- ✓ Issue Card button: hover background #007a56

### UX-04: Focus States
- ✓ Search input: border #212b36 + box shadow subtle
- ✓ Textarea: border #212b36
- ✓ Inputs: clear focus indicators

### UX-05: Typography
- ✓ Font family: Poppins, sans-serif (ngoại trừ card number dùng monospace)
- ✓ Minimum font size: 14px cho text chính
- ✓ Desktop tabs/subtabs: minimum 14px
- ✓ Primary color: #00a76f
- ✓ Text hierarchy rõ ràng

### UX-06: Spacing
- ✓ Consistent padding/margin theo design system
- ✓ Desktop: px-10 pt-[104px]
- ✓ Mobile: px-3 pt-16
- ✓ Gap consistent giữa elements (2px, 3px, 4px theo context)

---

## 📱 Responsive Requirements

### RWD-01: Layout Breakpoints
- ✓ Mobile: < 768px
- ✓ Desktop: ≥ 768px
- ✓ Sử dụng Tailwind breakpoint `md:`

### RWD-02: Mobile-specific Changes
- ✓ Header title: font size 18px (vs 22px desktop)
- ✓ Issue Card button: chỉ icon, 40x40px circle
- ✓ Breadcrumb: hidden
- ✓ Search: full width
- ✓ Filter button: hiển thị thay vì inline filters
- ✓ Table → Cards layout
- ✓ Platform tabs: font 12px (vs 14px desktop)
- ✓ Category chips: font 12px (vs 14px desktop)
- ✓ Pagination controls: compact hơn

### RWD-03: Touch-friendly
- ✓ Minimum touch target: 40px (Issue Card button mobile)
- ✓ Adequate spacing giữa buttons
- ✓ Modal bottom sheet cho mobile filters

### RWD-04: Content Priority (Mobile)
- ✓ Hiển thị thông tin quan trọng nhất trong cards
- ✓ Ẩn columns ít quan trọng
- ✓ Actions dễ tiếp cận

---

## 🔒 Validation Rules

### VAL-01: Search
- ✓ Không giới hạn ký tự
- ✓ Case-insensitive
- ✓ Trim whitespace
- ✓ Search realtime (không cần submit)

### VAL-02: Date Range
- ✓ "Created From" có thể lớn hơn "To" (không validate)
- ✓ Date format: native browser date input
- ✓ Có thể để trống

### VAL-03: Cancel Reason
- ✓ Không bắt buộc nhập (có thể submit trống)
- ✓ Nếu nhập: không giới hạn ký tự
- ✓ Resize vertical cho textarea

---

## ⚠️ Edge Cases

### EDGE-01: No Data
- ✓ Hiển thị "No products found" khi filtered list rỗng
- ✓ Pagination hiển thị "0–0 of 0"
- ✓ Previous/Next buttons disabled

### EDGE-02: Page Out of Range
- ✓ Nếu current page > total pages sau filter: auto adjust về trang cuối
- ✓ Không hiển thị lỗi

### EDGE-03: Long Text
- ✓ Product Name: truncate hoặc wrap tùy layout
- ✓ Campaign Name: truncate với ellipsis
- ✓ Card Number: monospace, no wrap

### EDGE-04: Missing Data
- ✓ Hiển thị "—" cho các field optional/null
- ✓ Badge không hiển thị nếu value là "—"
- ✓ Màu #919eab cho "—"

### EDGE-05: Multiple Filters
- ✓ Tất cả filters combine với AND logic
- ✓ Có thể không có kết quả nào match
- ✓ Reset về trang 1 mỗi khi filter thay đổi

### EDGE-06: Modal Interactions
- ✓ Click overlay: đóng modal không save
- ✓ ESC key: đóng modal
- ✓ Scroll body: bị block khi modal open (nếu có overflow)

### EDGE-07: Tablet Size
- ✓ Tablet (768px-1024px): sử dụng desktop layout
- ✓ Table có horizontal scroll nếu cần

---

## 🧪 Testing Scenarios

### TEST-01: Filter Combinations
```
SCENARIO: Apply multiple filters cùng lúc
GIVEN user đã chọn:
  - Platform: "VLINKPAY Platform"
  - Category: "E-Gift card"
  - Product Status: "APPROVED"
  - Card Locked: "UNLOCKED"
  - Created From: "2024-01-01"
  - To: "2024-12-31"
WHEN filters được apply
THEN chỉ hiển thị products match TẤT CẢ điều kiện
```

### TEST-02: Search + Filters
```
SCENARIO: Search trong kết quả đã filtered
GIVEN user đã filter Platform = "Store"
WHEN user search "Crypto"
THEN chỉ hiển thị Crypto Cards từ Store
```

### TEST-03: Pagination After Filter
```
SCENARIO: Thay đổi filter khi đang ở trang 3
GIVEN user đang ở trang 3 (có 5 trang)
WHEN user thay đổi filter → chỉ còn 1 trang kết quả
THEN tự động chuyển về trang 1
```

### TEST-04: Mobile Filter Modal Reset
```
SCENARIO: Reset filters trong modal
GIVEN user mở mobile filter modal
AND đã chọn nhiều filters
WHEN click "Reset"
THEN tất cả filters trong modal về "All"/empty
BUT modal vẫn mở
AND main filters chưa thay đổi
```

### TEST-05: Delete Card Flow
```
SCENARIO: Cancel card với reason
GIVEN user click Delete button trên card "AWAITING APPROVAL"
WHEN modal mở
AND user nhập reason
AND click "Confirm Cancel"
THEN card được cancel
AND modal đóng
AND danh sách cập nhật
```

### TEST-06: Responsive Switch
```
SCENARIO: Resize browser từ desktop → mobile
GIVEN user đang xem table view
WHEN resize window < 768px
THEN chuyển sang card view
AND filter buttons ẩn → hiển thị Filter button
AND breadcrumb ẩn
```

---

## 📊 Performance Requirements

### PERF-01: Rendering
- ✓ Initial load: < 1s
- ✓ Filter/search update: < 100ms (realtime)
- ✓ Sort: instant (< 50ms)
- ✓ Pagination: instant

### PERF-02: Data
- ✓ Mock data: 9 products
- ✓ Scalable lên 1000+ products
- ✓ Client-side filtering/sorting

---

## 🔄 State Management

### STATE-01: Local States
```typescript
- platformTab: PlatformTab
- categoryTab: CategoryTab
- search: string
- statusFilter: ProductStatus | "All"
- lockedFilter: CardLocked | "All"
- fromDate: string
- toDate: string
- sortKey: SortKey
- sortDir: "asc" | "desc"
- currentPage: number
- rowsPerPage: number
- showCreateDialog: boolean
- showMobileFilter: boolean
- showCancelModal: boolean
- selectedCard: { cardNumber, packageName } | null
- cancelReason: string
- tempStatusFilter: ProductStatus | "All" (mobile)
- tempLockedFilter: CardLocked | "All" (mobile)
- tempFromDate: string (mobile)
- tempToDate: string (mobile)
```

### STATE-02: Computed Values
```typescript
- filtered: Product[] (sau khi apply filters)
- sorted: Product[] (sau khi sort)
- paginated: Product[] (data hiển thị trang hiện tại)
- totalPages: number
- start: number (item index đầu trang)
- end: number (item index cuối trang)
```

---

## 🎯 Acceptance Checklist

### Must Have (P0)
- [x] Hiển thị danh sách products với tất cả columns
- [x] Platform tabs hoạt động
- [x] Category chips hoạt động
- [x] Search functionality
- [x] Desktop filters (Status, Locked, Date range)
- [x] Mobile filter modal
- [x] Sorting columns
- [x] Pagination
- [x] Status badges với đúng màu sắc
- [x] Action buttons theo status
- [x] Cancel Card modal
- [x] Issue Card button
- [x] Responsive: Desktop table / Mobile cards
- [x] Empty state

### Nice to Have (P1)
- [ ] Copy Link functionality (hiện chỉ có UI)
- [ ] View detail functionality (hiện chỉ có UI)
- [ ] Actual API integration
- [ ] Loading states
- [ ] Error handling
- [ ] Success/Error notifications
- [ ] Export data
- [ ] Bulk actions

### Future Enhancements (P2)
- [ ] Advanced filters (amount range, sold range)
- [ ] Column customization
- [ ] Save filter presets
- [ ] Infinite scroll option
- [ ] Dark mode
- [ ] Keyboard shortcuts

---

## 📝 Notes

1. **Mock Data**: Hiện tại sử dụng 9 products hardcoded trong component
2. **Dialog Integration**: CreateGiftVoucherDialog được import và sử dụng
3. **Icons**: Sử dụng lucide-react icons
4. **Styling**: Inline styles + Tailwind classes
5. **Font**: Poppins primary, monospace cho card numbers
6. **Color System**: Consistent với VLINKPAY brand (#00a76f primary)
7. **Transitions**: 0.15s-0.2s cho hover effects

---

**Document Version**: 1.0  
**Last Updated**: March 12, 2026  
**Author**: VLINKPAY Team
