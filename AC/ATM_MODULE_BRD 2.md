# BRD / BA - ATM Module

## Document Info

| Field | Value |
|---|---|
| Module | `atm` |
| Document Type | BRD / BA |
| Basis | Current frontend implementation |
| Audience | BA, PO, QA, Dev |
| Source of truth | Frontend flow currently present in code |

## 1. Business Overview

Module ATM là cụm chức năng cho phép người dùng:
- đăng ký trở thành ATM partner
- thực hiện giao dịch buy/sell theo mô hình ATM/P2P
- chọn vị trí giao dịch hoặc merchant gần nhất
- theo dõi trạng thái giao dịch theo thời gian thực
- xác nhận, hủy, hoàn tất, đánh giá và xử lý tranh chấp
- quản lý một nhánh mobile ATM riêng để tiếp nhận request giao dịch

## 2. Business Goals

| Goal | Description |
|---|---|
| Conversion | Tăng tỷ lệ chuyển đổi từ nhu cầu giao dịch sang request thực tế |
| Matching | Cho phép customer tìm merchant/ATM phù hợp theo vị trí và phí |
| Control | Cho phép ATM partner nhận, xử lý, hoàn tất request rõ ràng theo trạng thái |
| Persistence | Giảm ma sát bằng cách lưu tạm dữ liệu giữa các màn |
| Trust | Hỗ trợ rating, history, dispute sau giao dịch |

## 3. Scope

| Scope Type | Items |
|---|---|
| In Scope | ATM partner registration, buy/sell gift cash flow, select/confirm location, review details, waiting confirmation, QR tracking, transaction completion, history, detail, rating, dispute, mobile ATM flow |
| Out of Scope | Logic backend mới, thay đổi business rules server-side, thay đổi Google Maps SDK, viết lại kiến trúc mobile ATM |

## 4. Stakeholders

| Stakeholder | Responsibility |
|---|---|
| Customer | Tạo và theo dõi giao dịch |
| ATM partner / merchant | Nhận và xử lý request |
| Mobile ATM user | Xử lý request trên nhánh mobile |
| BA / PO | Chốt nghiệp vụ và acceptance |
| QA | Test end-to-end flow và trạng thái |
| Backend owner | Cung cấp API và status transitions |

## 5. High-Level Journey

| Step | Description |
|---|---|
| 1 | Customer vào luồng buy/sell |
| 2 | Customer chọn vị trí hoặc merchant |
| 3 | Customer xác nhận địa điểm, xem phí, tạo request |
| 4 | Hệ thống chờ merchant xác nhận |
| 5 | Nếu merchant chấp nhận, hệ thống hiển thị QR |
| 6 | Giao dịch hoàn tất, user có thể rating |
| 7 | User xem history và detail |
| 8 | Nếu phát sinh vấn đề, user vào dispute |
| 9 | Nhánh mobile ATM nhận request, accept/decline/complete |

## 6. Functional Requirements

### 6.1 ATM Partner Registration

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-01 | Cho phép user đăng ký trở thành ATM partner | Màn registration load ATM settings trước khi submit; form có role, period, agree term | ATM settings API |
| FR-ATM-02 | Tự điều chỉnh deposit theo role | Số tiền cọc thay đổi khi đổi role, default role/term được fill theo settings | Settings response |
| FR-ATM-03 | Ràng buộc KYC/KYB | Nếu chưa đủ điều kiện thì hiển thị modal yêu cầu xác minh | KYC/KYB flow |
| FR-ATM-04 | Điều hướng sau đăng ký | Nếu đủ điều kiện thì đi sang USDV Saving trong Lending Hub | Lending Hub route |
| FR-ATM-05 | Localized terms | Điều khoản hiển thị theo ngôn ngữ hiện tại | Transloco |

### 6.2 Buy/Sell Flow

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-06 | Hỗ trợ Buy và Sell | Hai luồng được xử lý riêng nhưng dùng chung state model | Route flow |
| FR-ATM-07 | Lưu state tạm | Dữ liệu giữa các màn không bị mất khi chuyển bước | AtmSettingsStore |
| FR-ATM-08 | Cash flow enforcement | Nếu payment method là cash thì phải có location rõ ràng | Geolocation / confirm location |
| FR-ATM-09 | Non-cash flow | Nếu không phải cash có thể đi thẳng sang merchant list | Nearby merchant API |

### 6.3 Select Location

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-10 | Tìm merchant gần nhất | Danh sách merchant được lấy theo amount, exchangeType, lat/lng, atmType, radius, fee max, symbol, paymentMethod | Nearby merchant API |
| FR-ATM-11 | Filter merchant | Có filter theo radius và fee | UI filter + API params |
| FR-ATM-12 | Group merchant theo fee | Merchant được chia theo fee <2%, 2-5%, >5% | Client grouping |
| FR-ATM-13 | Chọn merchant | Merchant và dữ liệu giao dịch được lưu vào store | AtmSettingsStore |

### 6.4 Confirm Location

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-14 | Search địa chỉ | User có thể search địa chỉ bằng text | Google geocoding |
| FR-ATM-15 | Chọn trên map | User có thể click map để chọn điểm | Google Maps SDK |
| FR-ATM-16 | Lấy current location | User có thể dùng GPS hiện tại | Browser geolocation |
| FR-ATM-17 | Lưu location | Khi confirm, hệ thống lưu lat/lng/address/note vào store | AtmSettingsStore |
| FR-ATM-18 | Validate input | Nếu địa chỉ không hợp lệ hoặc amount = 0 thì không cho đi tiếp | Client validation |

### 6.5 Review Details

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-19 | Hiển thị chi tiết | Màn review hiển thị amount, symbol, merchant/location, distance, fees, insurance, total | Store data |
| FR-ATM-20 | Tính phí đúng rule | Buy: amount + fees; Sell: amount - fees | Settings + merchant fee |
| FR-ATM-21 | Insurance toggle | Bật/tắt insurance cập nhật ngay vào total và store | Reactive form + store |
| FR-ATM-22 | Tạo request | Buy gọi createBuyRequest, Sell gọi createSellRequest | Buy/Sell API |
| FR-ATM-23 | Điều hướng sau submit | Thành công đi sang detail theo requestId | Route detail |

### 6.6 Waiting Confirmation

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-24 | Countdown và polling | Màn waiting có countdown và polling status định kỳ | Request status API |
| FR-ATM-25 | Accepted handling | Nếu status Accepted, chuyển sang QR screen | Status transitions |
| FR-ATM-26 | Declined handling | Nếu Declined, hiển thị cảnh báo và cho chọn lại flow | Decline modal / navigation |
| FR-ATM-27 | Final states | Nếu Cancelled/Completed, quay về màn gốc | Status handling |
| FR-ATM-28 | Timeout | Hết giờ chờ thì hiển thị warning | Timer logic |
| FR-ATM-29 | Cancel request | User có thể hủy request từ màn này | Cancel API |

### 6.7 QR Code / Scan Tracking

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-30 | Hiển thị QR | Khi request accepted, hệ thống hiển thị QR code | QR component |
| FR-ATM-31 | Auto refresh | Màn QR phải refresh để kiểm tra scan/status | Check-scan API |
| FR-ATM-32 | Completed handling | Nếu Completed, chuyển sang transaction complete | Status transitions |
| FR-ATM-33 | Cancel/decline handling | Nếu Cancelled/Declined, quay về màn gốc | Status transitions |
| FR-ATM-34 | PIN confirm | Xác nhận hoàn tất phải yêu cầu PIN | PIN modal |
| FR-ATM-35 | Directions | User có thể mở directions từ màn QR | Tracking map route |

### 6.8 Transaction Complete

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-36 | Hiển thị kết quả | Màn complete hiển thị thông tin giao dịch đã hoàn tất | Request detail API |
| FR-ATM-37 | Auto-refresh sell flow | Sell flow có thể tự refresh đến khi completed | Status polling |
| FR-ATM-38 | Đi sang rating | User có thể chuyển sang rating sau khi hoàn tất | Rating submit route |

### 6.9 History

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-39 | Xem lịch sử | History có phân trang | History API |
| FR-ATM-40 | Filter | Lọc theo buy/sell và status | Query params / API params |
| FR-ATM-41 | Group by month | Danh sách được group theo tháng/năm | Client grouping |
| FR-ATM-42 | Open detail | Click item mở transaction detail | Detail route |

### 6.10 Request Detail

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-43 | Load by requestId | Màn detail tải đúng theo `requestId` | Detail API |
| FR-ATM-44 | Role-based display | Hiển thị đúng vai trò user | Profile/store |
| FR-ATM-45 | Back navigation | Back quay về đúng history tương ứng | History routes |

### 6.11 Rating

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-46 | Submit rating | Bắt buộc chọn số sao trước khi submit | Rating API |
| FR-ATM-47 | Tag comments | User có thể chọn tag để ghép feedback | UI tags |
| FR-ATM-48 | Post-submit routing | Submit xong quay về history phù hợp role | History routes |

### 6.12 Dispute / Confirm Paid / Help Deposit

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-49 | Dispute flow | Các màn dispute dựa trên request detail hiện tại | Dispute APIs |
| FR-ATM-50 | Upload proof | User có thể upload proof / receipt / explanation | Upload components |
| FR-ATM-51 | Reflect backend status | UI phản ánh đúng status từ backend | Request status API |

### 6.13 Mobile ATM Flow

| ID | Requirement | Acceptance Criteria | Dependency |
|---|---|---|---|
| FR-ATM-52 | Dashboard auto navigation | Có request pending mới thì dashboard chuyển sang request screen | Transaction service/store |
| FR-ATM-53 | Request timeout | Request screen có countdown 5 phút và auto decline khi hết giờ | Timer logic |
| FR-ATM-54 | Accept / decline | Accept đi sang progress, decline đi sang màn nhập lý do | Mobile ATM routes |
| FR-ATM-55 | Complete flow | Progress hoàn tất quay về dashboard | Transaction state |

## 7. Business Rules

| Rule ID | Rule | Description |
|---|---|---|
| BR-01 | Buy/Sell separation | Buy và Sell là hai luồng tách biệt nhưng dùng chung data model |
| BR-02 | ExchangeType-driven | `exchangeType` quyết định flow và API được gọi |
| BR-03 | ATM type-driven | `atmType` quyết định logic chọn vị trí và màn quay lại |
| BR-04 | Payment method-driven | `paymentMethod` quyết định có cần cash location hay không |
| BR-05 | Temporary state | `paramBuySell` là state tạm sống xuyên suốt flow |
| BR-06 | Final state cleanup | Khi request đạt trạng thái final thì dữ liệu tạm phải được xóa |
| BR-07 | Validation before forward | Chỉ request hợp lệ mới được phép đi tiếp sang màn sau |
| BR-08 | i18n requirement | Tất cả text hiển thị cho user phải đi qua Transloco |

## 8. Data and State Design

### 8.1 Temporary State

| Field | Purpose |
|---|---|
| amount | Amount chính của giao dịch |
| amountUsd | Amount quy đổi sang USD |
| atmType | Loại ATM tham gia flow |
| exchangeType | Buy hoặc Sell |
| latitude | Tọa độ người dùng hoặc meeting point |
| longitude | Tọa độ người dùng hoặc meeting point |
| meetingLocation | Thông tin địa điểm hẹn |
| noteForMobileAtm | Ghi chú cho mobile ATM |
| hasTransactionInsurance | Cờ bảo hiểm giao dịch |
| merchant | Merchant được chọn |
| isUseDollarAmount | Cờ dùng USD amount hay crypto amount |
| symbol | Symbol của tài sản |
| rate | Tỷ giá |
| quantity | Số lượng crypto |
| paymentMethod | Phương thức thanh toán |

### 8.2 ATM Settings

| Requirement | Description |
|---|---|
| Cache settings | ATM settings từ backend phải được cache |
| Reload settings | Có cơ chế reload để lấy trạng thái mới như `hasActiveExchangeRequest` |

### 8.3 Request State

| Status | Meaning |
|---|---|
| Pending | Đang chờ xác nhận |
| Accepted | Đã được chấp nhận |
| Completed | Đã hoàn tất |
| Declined | Bị từ chối |
| Cancelled | Đã hủy |
| Expired | Hết hạn |
| Dispute | Đang tranh chấp |

## 9. Process Flows

### 9.1 Buy/Sell Basic Flow

| Step | Action |
|---|---|
| 1 | Chọn loại giao dịch |
| 2 | Chọn vị trí hoặc merchant |
| 3 | Xác nhận vị trí nếu cần |
| 4 | Review phí và tổng tiền |
| 5 | Tạo request |
| 6 | Chờ xác nhận |
| 7 | Nhận QR |
| 8 | Hoàn tất |
| 9 | Rating |
| 10 | History |

### 9.2 Failure / Rollback Flow

| Situation | Expected behavior |
|---|---|
| Thiếu dữ liệu | Quay về màn gốc |
| Declined | Quay về bước chọn lại merchant/location |
| Cancelled/Completed sớm | Quay về buy/sell gốc |
| API lỗi | Giữ state hiện tại hoặc reset loading tùy màn |

### 9.3 Mobile ATM Flow

| Step | Action |
|---|---|
| 1 | Dashboard nhận request mới |
| 2 | Request screen hiển thị timer |
| 3 | Accept / decline |
| 4 | Progress |
| 5 | Back to dashboard |

## 10. Acceptance Criteria Summary

| Summary Item | Expected Outcome |
|---|---|
| Partner registration | User có thể đăng ký ATM partner theo cấu hình hệ thống |
| Buy/Sell | User có thể thực hiện buy/sell với merchant hoặc location phù hợp |
| Pricing | Hệ thống tính phí và tổng tiền đúng theo rule nghiệp vụ |
| Status tracking | Hệ thống theo dõi trạng thái request bằng polling |
| Final handling | Hệ thống phản ứng đúng với accepted/declined/cancelled/completed |
| Post transaction | User có thể xem QR, hoàn tất, rating, history, detail |
| Mobile ATM | Mobile ATM có thể nhận và xử lý request độc lập |
| Persistence | Dữ liệu tạm được lưu và xóa đúng thời điểm |
| i18n | Toàn bộ UI text phải localized |

## 11. Dependencies

| Dependency | Usage |
|---|---|
| `/wallets/merchant-atm` APIs | Request, detail, status, settings, rating, cancellation |
| Google Maps SDK | Confirm location và geocoding |
| Transloco | Localized UI strings |
| NgRx / store hiện có | Profile, user, wallet, settings |
| PIN confirm modal | Xác nhận hoàn tất giao dịch |
| QR code and scan tracking | Hiển thị và kiểm tra QR |
| KYC/KYB flow | Điều kiện đăng ký ATM partner |
| Lending Hub | Điều hướng sau khi đăng ký partner |

## 12. Assumptions

| Assumption | Description |
|---|---|
| Backend ready | Backend đã hỗ trợ đầy đủ các endpoint hiện được gọi |
| Status source of truth | Request status do backend quyết định, frontend chỉ hiển thị và polling |
| Logged in user | User đã đăng nhập trước khi đi vào phần lớn flow |
| Maps availability | Google Maps và geolocation khả dụng trên thiết bị |
| Translation coverage | Translation keys đã có hoặc sẽ được bổ sung |

## 13. Risks / Constraints

| Risk | Impact |
|---|---|
| State persistence dependency | Refresh hoặc mất localStorage sẽ gián đoạn trải nghiệm |
| Polling overhead | Nhiều màn dùng polling cần cleanup subscription kỹ |
| Status mapping | Mapping status sai sẽ dẫn đến điều hướng sai |
| Cash vs non-cash divergence | Dễ lệch nghiệp vụ nếu test không đủ |
| External dependencies | KYC/KYB và Lending Hub có thể ảnh hưởng end-to-end flow |
| Demo-like mobile flow | Mobile ATM hiện có tính demo nội bộ khá cao, cần xác nhận nếu đưa vào production |

## 14. Suggested BA Breakdown

| Epic | Description |
|---|---|
| Epic 1 | ATM Partner Registration |
| Epic 2 | Buy/Sell Gift Cash Flow |
| Epic 3 | History, Detail, Rating, Dispute |
| Epic 4 | Mobile ATM Flow |
