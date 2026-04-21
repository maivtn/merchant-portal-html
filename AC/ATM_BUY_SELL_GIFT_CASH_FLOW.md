# BRD / BA - Buy/Sell Gift Cash Flow

## Document Info

| Field | Value |
|---|---|
| Module | `atm` |
| Epic | Buy/Sell Gift Cash Flow |
| Audience | BA, PO, QA, Dev |
| Basis | Current frontend implementation |

## 1. Business Objective

Epic này quản lý toàn bộ flow giao dịch buy/sell gift cash:
- chọn location hoặc merchant phù hợp
- xác nhận địa điểm giao dịch
- review phí và tổng tiền
- tạo request
- chờ xác nhận
- xem QR
- hoàn tất giao dịch

Mục tiêu là biến nhu cầu giao dịch thành request hợp lệ, theo dõi được trạng thái và hoàn tất đúng quy trình.

## 2. Scope

| Scope Type | Items |
|---|---|
| In Scope | Select location, confirm location, review details, request creation, waiting confirmation, QR code display, transaction complete |
| Out of Scope | Backend business changes, redesign Google Maps flow, rewrite mobile ATM branch |

## 3. Core Business Rules

| Rule ID | Rule | Description |
|---|---|---|
| BR-BUYSELL-01 | Exchange type drives flow | `Buy` và `Sell` đi qua cùng một nhóm màn nhưng logic navigation/API khác nhau |
| BR-BUYSELL-02 | Payment method drives location logic | `cash` cần location rõ ràng, non-cash có thể đi thẳng merchant list |
| BR-BUYSELL-03 | Temporary state persistence | Dữ liệu phải được giữ giữa các màn bằng store/localStorage |
| BR-BUYSELL-04 | Final state cleanup | Khi request final thì clear dữ liệu tạm |
| BR-BUYSELL-05 | i18n required | User-facing text phải đi qua Transloco |

## 4. Functional Requirements

### 4.1 Select Location

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-BS-01 | Tìm merchant gần nhất | API nearby merchant phải nhận amount, exchangeType, lat/lng, atmType, radius, fee max, symbol, paymentMethod | Nearby merchant API |
| FR-BS-02 | Filter merchant | User có thể filter theo radius và fee | UI filter + API params |
| FR-BS-03 | Group merchant | Merchant được group theo fee percent | Client grouping |
| FR-BS-04 | Chọn merchant | Merchant được lưu vào store và điều hướng sang review | AtmSettingsStore |

### 4.2 Confirm Location

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-BS-05 | Search địa chỉ | User search bằng text và geocode được địa chỉ | Google geocoding |
| FR-BS-06 | Chọn trên map | User click map để chọn tọa độ | Google Maps SDK |
| FR-BS-07 | Current location | User có thể lấy vị trí hiện tại | Browser geolocation |
| FR-BS-08 | Lưu location | Khi confirm, lat/lng/address/note phải lưu vào store | AtmSettingsStore |

### 4.3 Review Details

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-BS-09 | Hiển thị fee breakdown | Màn review hiển thị amount, symbol, merchant/location, distance, system fee, merchant fee, insurance, total | Store data |
| FR-BS-10 | Tính total đúng rule | Buy cộng phí, Sell trừ phí | Settings + merchant fee |
| FR-BS-11 | Insurance toggle | Bật/tắt insurance phải cập nhật ngay tổng tiền và store | Reactive form + store |
| FR-BS-12 | Submit request | Buy gọi createBuyRequest, Sell gọi createSellRequest | Buy/Sell API |
| FR-BS-13 | Route after submit | Thành công đi sang detail theo requestId | Detail route |

### 4.4 Waiting Confirmation

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-BS-14 | Countdown | Màn waiting có timer đếm ngược theo wait interval | Timer logic |
| FR-BS-15 | Polling status | Hệ thống polling request status định kỳ | Request status API |
| FR-BS-16 | Accepted handling | Accepted chuyển sang QR code screen | Status transitions |
| FR-BS-17 | Declined handling | Declined hiển thị warning và cho chọn lại flow | Decline UI |
| FR-BS-18 | Final handling | Cancelled/Completed quay về màn gốc | Status transitions |
| FR-BS-19 | Timeout handling | Hết giờ chờ phải hiển thị warning | Timer logic |
| FR-BS-20 | Cancel request | User có thể hủy request | Cancel API |

### 4.5 QR Code / Completion

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-BS-21 | Hiển thị QR | Khi accepted, hệ thống hiển thị QR code theo requestId/secureCode | QR component |
| FR-BS-22 | Auto refresh | Màn QR refresh để kiểm tra scan/status | Check-scan API |
| FR-BS-23 | Completed handling | Completed chuyển sang transaction complete | Status transitions |
| FR-BS-24 | Cancel/decline handling | Cancelled/Declined quay về màn gốc | Status transitions |
| FR-BS-25 | PIN confirm | Xác nhận hoàn tất phải yêu cầu PIN | PIN modal |
| FR-BS-26 | Directions | User có thể mở directions từ màn QR | Tracking map route |

### 4.6 Transaction Complete

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-BS-27 | Show completed details | Màn complete hiển thị thông tin request hoàn tất | Request detail API |
| FR-BS-28 | Auto refresh sell | Sell flow có thể auto refresh đến khi completed | Status polling |
| FR-BS-29 | Next step | User có thể đi sang rating sau completed | Rating submit route |

## 5. Data and State Design

| Field | Purpose |
|---|---|
| amount | Amount giao dịch |
| amountUsd | Amount quy đổi USD |
| atmType | Loại ATM |
| exchangeType | Buy hoặc Sell |
| latitude / longitude | Vị trí giao dịch |
| meetingLocation | Thông tin địa điểm |
| noteForMobileAtm | Ghi chú |
| hasTransactionInsurance | Cờ bảo hiểm |
| merchant | Merchant được chọn |
| isUseDollarAmount | Có dùng USD amount hay không |
| symbol | Symbol tài sản |
| rate | Tỷ giá |
| quantity | Số lượng crypto |
| paymentMethod | Phương thức thanh toán |

## 6. Process Flow

| Step | Action |
|---|---|
| 1 | Chọn Buy hoặc Sell |
| 2 | Chọn merchant hoặc confirm location |
| 3 | Review phí và total |
| 4 | Submit request |
| 5 | Chờ merchant xác nhận |
| 6 | Nhận QR khi accepted |
| 7 | Hoàn tất giao dịch |

## 7. Dependencies

| Dependency | Usage |
|---|---|
| Nearby merchant API | Lấy danh sách merchant gần nhất |
| Google Maps SDK | Chọn và xác nhận location |
| Transloco | Localized labels/messages |
| PIN modal | Xác nhận hoàn tất |
| QR tracking APIs | Theo dõi scan và status |

## 8. Risks / Constraints

| Risk | Impact |
|---|---|
| State persistence | Refresh làm mất state nếu localStorage lỗi |
| Polling | Nhiều màn polling cần cleanup tốt |
| Status mapping | Mapping sai sẽ điều hướng sai |
| Cash vs non-cash | Dễ lệch nghiệp vụ nếu test thiếu |

