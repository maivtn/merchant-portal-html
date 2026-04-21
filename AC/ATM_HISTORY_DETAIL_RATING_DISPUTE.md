# BRD / BA - History, Detail, Rating, Dispute

## Document Info

| Field | Value |
|---|---|
| Module | `atm` |
| Epic | History, Detail, Rating, Dispute |
| Audience | BA, PO, QA, Dev |
| Basis | Current frontend implementation |

## 1. Business Objective

Epic này xử lý hậu giao dịch:
- xem lịch sử giao dịch
- mở chi tiết giao dịch
- gửi rating sau khi completed
- xử lý dispute và các nhánh liên quan như confirm paid / help deposit

Mục tiêu là cho user tra soát, đánh giá và giải quyết vấn đề sau giao dịch một cách có kiểm soát.

## 2. Scope

| Scope Type | Items |
|---|---|
| In Scope | History, detail, rating, dispute, confirm paid, help deposit |
| Out of Scope | Thay đổi backend status machine, redesign review/QR flow |

## 3. Core Business Rules

| Rule ID | Rule | Description |
|---|---|---|
| BR-HDR-01 | History is filterable | History phải lọc được theo type và status |
| BR-HDR-02 | Detail follows role | Detail và back navigation phụ thuộc vai trò user |
| BR-HDR-03 | Rating after completion | Chỉ rating sau completed |
| BR-HDR-04 | Dispute based on request state | Dispute dùng request detail hiện tại |
| BR-HDR-05 | i18n required | Tất cả text hiển thị phải localized |

## 4. Functional Requirements

### 4.1 History

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-HDR-01 | Xem lịch sử giao dịch | History có phân trang | History API |
| FR-HDR-02 | Filter giao dịch | Lọc theo buy/sell và status | Query params + API |
| FR-HDR-03 | Group theo tháng | Danh sách được group theo tháng/năm | Client grouping |
| FR-HDR-04 | Open detail | Click vào item phải mở detail | Detail route |
| FR-HDR-05 | Auto-open by requestId | Nếu có requestId trên query params thì tự mở đúng item | Detail API |

### 4.2 Detail

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-HDR-06 | Load by requestId | Màn detail phải tải đúng theo requestId | Detail API |
| FR-HDR-07 | Role-aware display | Hiển thị đúng vai trò customer/partner | Profile/store |
| FR-HDR-08 | Back to correct history | Back phải quay về đúng history tương ứng | History routes |

### 4.3 Rating

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-HDR-09 | Submit rating | Bắt buộc chọn số sao trước khi submit | Rating API |
| FR-HDR-10 | Tag comments | User có thể chọn tag để ghép feedback | UI tags |
| FR-HDR-11 | Route after submit | Submit xong phải quay về history phù hợp role | History routes |
| FR-HDR-12 | Rating overview | Có thể lọc theo rating và sort theo newest/highest/lowest | Rating list API |

### 4.4 Dispute / Confirm Paid / Help Deposit

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-HDR-13 | Dispute flow | Dispute dựa trên request detail hiện tại | Dispute APIs |
| FR-HDR-14 | Upload evidence | Có thể upload proof / receipt / explanation | Upload components |
| FR-HDR-15 | Status reflection | UI phản ánh đúng status từ backend | Request status API |
| FR-HDR-16 | Confirm paid | Màn confirm paid nhận đúng requestId và flag liên quan | Confirm paid route |

## 5. Process Flow

| Step | Action |
|---|---|
| 1 | User vào history |
| 2 | Lọc hoặc mở một giao dịch |
| 3 | Xem detail |
| 4 | Sau completed, gửi rating nếu cần |
| 5 | Nếu phát sinh vấn đề, mở dispute / confirm paid / help deposit |

## 6. Dependencies

| Dependency | Usage |
|---|---|
| History API | Lấy danh sách giao dịch |
| Detail API | Lấy chi tiết giao dịch |
| Rating API | Gửi feedback sau completed |
| Dispute APIs | Xử lý tranh chấp |
| Transloco | Localized strings |
| Profile store | Xác định role và history target |

## 7. Risks / Constraints

| Risk | Impact |
|---|---|
| Status mismatch | Màn detail / rating / dispute hiển thị sai trạng thái |
| Role mismatch | Back navigation hoặc history target sai |
| Empty state handling | API lỗi hoặc data rỗng cần xử lý mềm |

