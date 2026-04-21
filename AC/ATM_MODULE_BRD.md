# BRD / BA - ATM Module

Tài liệu này mô tả module `atm` theo góc nhìn Business Requirement Document / Business Analysis, bám sát hành vi hiện có trong code.

## 1. Business Overview

Module ATM là cụm chức năng cho phép người dùng:
- đăng ký trở thành ATM partner
- thực hiện giao dịch buy/sell theo mô hình ATM/P2P
- chọn vị trí giao dịch hoặc merchant gần nhất
- theo dõi trạng thái giao dịch theo thời gian thực
- xác nhận, hủy, hoàn tất, đánh giá và xử lý tranh chấp
- quản lý một nhánh mobile ATM riêng để tiếp nhận request giao dịch

Mục tiêu của module:
- tăng khả năng thực hiện giao dịch tại điểm gặp thực tế
- chuẩn hóa quy trình tạo request, chờ xác nhận, hoàn tất và đánh giá
- hỗ trợ cả vai trò customer và ATM partner trong cùng một luồng nghiệp vụ

## 2. Business Goals

- Tăng tỷ lệ chuyển đổi từ nhu cầu giao dịch sang request thực tế
- Cho phép customer tìm merchant/ATM phù hợp theo vị trí và phí
- Cho phép ATM partner nhận, xử lý, hoàn tất request rõ ràng theo trạng thái
- Giảm ma sát trong giao dịch bằng cách lưu tạm dữ liệu giữa các màn
- Hỗ trợ hậu giao dịch như rating, history, dispute để tăng trust

## 3. Scope

### In Scope

- ATM partner registration
- Buy/sell gift cash flow
- Select location / confirm location
- Review fees and create request
- Waiting confirmation
- QR code display and scan tracking
- Transaction completion
- History and transaction detail
- Rating after completed transaction
- Dispute-related flows
- Mobile ATM request handling

### Out of Scope

- Xử lý thanh toán backend thực tế ngoài các API đã có
- Thay đổi business rules phía server
- Thay đổi logic Google Maps SDK hoặc hạ tầng geocoding
- Viết lại toàn bộ flow mobile ATM thành kiến trúc mới

## 4. Stakeholders / Personas

- Customer
- ATM partner / merchant
- Mobile ATM user
- QA
- BA / Product owner
- Backend service owner

## 5. High-Level User Journeys

1. Customer vào luồng buy/sell.
2. Customer chọn vị trí giao dịch hoặc merchant.
3. Customer xác nhận địa điểm, xem phí, tạo request.
4. Hệ thống chờ merchant xác nhận.
5. Nếu merchant chấp nhận, hệ thống hiển thị QR.
6. Giao dịch hoàn tất, user có thể rating.
7. User có thể xem lại history và detail.
8. Nếu phát sinh vấn đề, user vào dispute.
9. Với nhánh mobile ATM, user nhận request, accept/decline/complete.

## 6. Functional Requirements

### 6.1 ATM Partner Registration

- Hệ thống phải cho phép user đăng ký trở thành ATM partner.
- Màn đăng ký phải load ATM settings từ backend trước khi submit.
- Form phải có role, period, agree term.
- Giá trị đặt cọc phải thay đổi theo role.
- Nếu chưa đủ điều kiện KYC/KYB, hệ thống phải hiển thị modal yêu cầu xác minh.
- Nếu đủ điều kiện, hệ thống phải điều hướng sang USDV Saving trong Lending Hub.
- Điều khoản phải hiển thị theo ngôn ngữ hiện tại.

### 6.2 Buy/Sell Flow

- Hệ thống phải hỗ trợ cả Buy và Sell.
- Luồng phải có state tạm để giữ dữ liệu giữa các màn.
- Nếu payment method là cash, hệ thống phải yêu cầu vị trí giao dịch rõ ràng.
- Nếu payment method không phải cash, hệ thống có thể đi vào list merchant gần nhất trực tiếp.

### 6.3 Select Location

- Hệ thống phải cho phép lọc merchant theo radius và fee.
- Danh sách merchant phải được lấy từ API nearby merchant.
- Merchant phải được phân nhóm theo fee percent.
- Khi user chọn merchant, hệ thống phải lưu merchant và dữ liệu giao dịch vào store.

### 6.4 Confirm Location

- User có thể search địa chỉ, chọn trên map, hoặc dùng current location.
- Khi confirm, hệ thống phải lưu latitude, longitude, address, note vào store.
- Sau confirm phải quay về màn chọn merchant/location phù hợp với flow.
- Nếu địa chỉ search không tìm thấy, hệ thống phải hiển thị thông báo lỗi.
- Nếu amount không hợp lệ, hệ thống không được cho đi tiếp.

### 6.5 Review Details

- Màn review phải hiển thị amount, symbol, merchant/location, distance, fees, insurance, total.
- Hệ thống phải tính tổng phí theo công thức buy/sell.
- User có thể bật/tắt insurance.
- Submit phải gọi API buy request hoặc sell request tương ứng.
- Thành công phải chuyển sang màn detail theo `requestId`.

### 6.6 Waiting Confirmation

- Sau khi tạo request, hệ thống phải chuyển sang màn chờ xác nhận.
- Màn này phải có countdown.
- Hệ thống phải polling request status định kỳ.
- Nếu accepted, chuyển sang QR.
- Nếu declined, hiển thị cảnh báo và cho user chọn lại flow.
- Nếu cancelled/completed, quay về màn gốc.
- Hết giờ chờ phải hiển thị warning.
- User có thể hủy request.

### 6.7 QR Code / Scan Tracking

- Khi request accepted, hệ thống phải hiển thị QR code.
- Màn này phải refresh định kỳ để kiểm tra scan/status.
- Nếu completed, chuyển sang transaction complete.
- Nếu cancelled/declined, quay về màn gốc.
- User có thể mở directions, hủy request, xác nhận hoàn tất bằng PIN.

### 6.8 Transaction Complete

- Hệ thống phải hiển thị thông tin request đã hoàn tất.
- Người dùng có thể đi sang rating sau khi hoàn tất.
- Với sell flow, hệ thống có thể auto-refresh status cho đến khi completed.

### 6.9 History

- Hệ thống phải hiển thị lịch sử giao dịch có phân trang.
- Hệ thống phải hỗ trợ filter theo buy/sell và status.
- History phải group theo tháng/năm.
- Click vào một item phải mở detail.

### 6.10 Request Detail

- Màn detail phải tải theo `requestId`.
- Màn detail phải hiển thị đúng vai trò của user.
- Back phải quay về đúng history tương ứng với role.

### 6.11 Rating

- Sau completed, user có thể rating giao dịch.
- Bắt buộc có số sao trước khi submit.
- Feedback có thể được ghép từ nhiều tag.
- Submit thành công phải quay về history phù hợp với role.

### 6.12 Dispute / Confirm Paid / Help Deposit

- Các màn này phải dựa trên request detail hiện tại.
- Hệ thống phải hỗ trợ upload proof, explain dispute, và các nhánh xử lý liên quan.
- Trạng thái phải phản ánh đúng theo backend.

### 6.13 Mobile ATM Flow

- Dashboard phải tự chuyển sang request screen khi có request pending.
- Request screen phải có countdown 5 phút.
- Hết giờ phải auto decline.
- Accept phải sang progress.
- Decline phải sang màn nhập lý do.
- Progress hoàn tất phải quay lại dashboard.

## 7. Business Rules

- Buy và Sell là hai luồng nghiệp vụ tách biệt nhưng dùng chung kiến trúc dữ liệu.
- `exchangeType` quyết định hướng đi của flow và API được gọi.
- `atmType` quyết định logic chọn vị trí và quay lại màn trước.
- `paymentMethod` quyết định có cần cash location hay không.
- `paramBuySell` là state tạm sống xuyên suốt flow.
- Khi request đạt trạng thái final, dữ liệu tạm phải được xóa.
- Chỉ request hợp lệ mới được phép đi tiếp sang màn sau.
- Tất cả text hiển thị cho user phải đi qua Transloco.

## 8. Data and State Design

### 8.1 Dữ liệu tạm

`AtmSettingsStore` giữ dữ liệu buy/sell tạm. Dữ liệu này phải được lưu localStorage để không mất khi refresh.

Data gồm:
- amount
- amountUsd
- atmType
- exchangeType
- latitude
- longitude
- meetingLocation
- noteForMobileAtm
- hasTransactionInsurance
- merchant
- isUseDollarAmount
- symbol
- rate
- quantity
- paymentMethod

### 8.2 ATM settings

- ATM settings từ backend phải được cache.
- Có cơ chế reload để lấy trạng thái mới như `hasActiveExchangeRequest`.

### 8.3 Request state

- Request status phải được xem như nguồn sự thật cho luồng giao dịch.
- Các status chính:
  - Pending
  - Accepted
  - Completed
  - Declined
  - Cancelled
  - Expired
  - Dispute

## 9. Process Flows

### 9.1 Buy/Sell Basic Flow

1. Chọn loại giao dịch
2. Chọn vị trí hoặc merchant
3. Xác nhận vị trí nếu cần
4. Review phí và tổng tiền
5. Tạo request
6. Chờ xác nhận
7. Nhận QR
8. Hoàn tất
9. Rating
10. History

### 9.2 Failure / Rollback Flow

- Thiếu dữ liệu -> quay về màn gốc
- Declined -> quay về bước chọn lại merchant/location
- Cancelled/Completed sớm -> quay về buy/sell gốc
- API lỗi -> giữ state hiện tại hoặc reset loading tùy màn

### 9.3 Mobile ATM Flow

1. Dashboard nhận request mới
2. Request screen hiển thị timer
3. Accept / decline
4. Progress
5. Back to dashboard

## 10. Acceptance Criteria Summary

- User có thể đăng ký ATM partner theo cấu hình hệ thống.
- User có thể thực hiện buy/sell với merchant hoặc location phù hợp.
- Hệ thống tính phí và tổng tiền đúng theo rule nghiệp vụ.
- Hệ thống theo dõi trạng thái request bằng polling.
- Hệ thống phản ứng đúng với accepted/declined/cancelled/completed.
- User có thể xem QR, hoàn tất, rating, history, detail.
- Mobile ATM có thể nhận và xử lý request độc lập.
- Dữ liệu tạm được lưu và xóa đúng thời điểm.
- Toàn bộ UI text phải localized.

## 11. Dependencies

- Backend APIs trong nhóm `/wallets/merchant-atm`
- Google Maps SDK cho confirm location
- Transloco cho i18n
- NgRx / store hiện có cho profile, user, wallet, settings
- Pin confirm modal
- QR code generation / scan tracking
- KYC/KYB flow bên ngoài module ATM
- Lending Hub để điều hướng sau đăng ký partner

## 12. Assumptions

- Backend đã hỗ trợ đầy đủ các endpoint hiện được gọi từ service.
- Request status do backend quyết định, frontend chỉ hiển thị và polling.
- User đã đăng nhập trước khi đi vào phần lớn flow.
- Google Maps và geolocation khả dụng trên thiết bị của user.
- Các translation keys đã có hoặc sẽ được bổ sung tương ứng.

## 13. Risks / Constraints

- Flow phụ thuộc mạnh vào state tạm, nếu refresh hoặc mất localStorage sẽ làm gián đoạn trải nghiệm.
- Nhiều màn dùng polling, cần kiểm soát hiệu năng và cleanup subscription.
- Flow ATM có nhiều trạng thái final, nếu mapping status sai sẽ dẫn đến điều hướng sai.
- Các nhánh cash vs non-cash rất dễ lệch nghiệp vụ nếu không test kỹ.
- KYC/KYB và Lending Hub là dependency ngoài module, có thể ảnh hưởng end-to-end flow.
- Luồng mobile ATM hiện có tính demo nội bộ khá cao, cần xác nhận lại với product nếu muốn đưa vào production.

## 14. Suggested BA Breakdown

Nếu muốn đưa vào roadmap hoặc Jira, nên tách thành 4 epic:
1. ATM Partner Registration
2. Buy/Sell Gift Cash Flow
3. History, Detail, Rating, Dispute
4. Mobile ATM Flow
