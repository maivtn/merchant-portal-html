# BRD / BA - Mobile ATM Flow

## Document Info

| Field | Value |
|---|---|
| Module | `atm` |
| Epic | Mobile ATM Flow |
| Audience | BA, PO, QA, Dev |
| Basis | Current frontend implementation |

## 1. Business Objective

Epic này xử lý nhánh mobile ATM:
- dashboard
- transaction request
- decline reason
- transaction progress

Mục tiêu là giúp mobile ATM user nhận request mới, phản hồi trong thời gian quy định và hoàn tất xử lý.

## 2. Scope

| Scope Type | Items |
|---|---|
| In Scope | Dashboard, request accept/decline, countdown, progress, auto navigation |
| Out of Scope | Rewrite transaction engine hoặc backend service |

## 3. Core Business Rules

| Rule ID | Rule | Description |
|---|---|---|
| BR-MATM-01 | Auto route on new request | Có request pending mới thì dashboard chuyển sang request screen |
| BR-MATM-02 | Request timeout | Request screen có countdown 5 phút và auto decline khi hết giờ |
| BR-MATM-03 | Accept/decline split | Accept đi sang progress, decline đi sang màn nhập lý do |
| BR-MATM-04 | Return to dashboard | Progress hoàn tất quay lại dashboard |

## 4. Functional Requirements

### 4.1 Dashboard

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-MATM-01 | Detect new pending request | Dashboard phải tự chuyển sang request screen khi có transaction pending | Transaction service/store |

### 4.2 Transaction Request

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-MATM-02 | Show current request | Màn request hiển thị transaction hiện tại | Transaction state |
| FR-MATM-03 | Countdown timer | Có countdown 5 phút | Timer logic |
| FR-MATM-04 | Auto decline | Hết giờ thì auto decline request | Transaction service |
| FR-MATM-05 | Accept | Accept chuyển sang progress | Mobile ATM route |
| FR-MATM-06 | Decline | Decline chuyển sang màn nhập lý do | Mobile ATM route |

### 4.3 Transaction Progress

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-MATM-07 | Show in-progress transaction | Màn progress hiển thị request hiện tại | Transaction state |
| FR-MATM-08 | Complete flow | Hoàn tất thì quay về dashboard | Transaction service |
| FR-MATM-09 | Fallback | Nếu không còn active transaction thì quay về dashboard | Transaction state |

## 5. Process Flow

| Step | Action |
|---|---|
| 1 | Dashboard nhận request mới |
| 2 | User vào transaction request screen |
| 3 | User accept hoặc decline |
| 4 | Nếu accept thì sang progress |
| 5 | Nếu complete thì quay lại dashboard |

## 6. Dependencies

| Dependency | Usage |
|---|---|
| Transaction service | State của transaction pending/accepted/declined/completed |
| Mobile ATM routes | Điều hướng giữa dashboard, request, progress |

## 7. Risks / Constraints

| Risk | Impact |
|---|---|
| Demo-like behavior | Luồng có thể cần xác nhận lại nếu dùng production |
| Timer cleanup | Timer/subscription phải được clear khi component destroy |

