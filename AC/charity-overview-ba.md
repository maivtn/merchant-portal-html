# Charity Project Overview

## 1. Tổng quan

`Charity` là dự án được xây dựng để hỗ trợ các hoạt động thiện nguyện theo cách rõ ràng, dễ theo dõi và có thể kiểm soát được dòng tiền.

Hệ thống không chỉ dừng ở việc cho phép người dùng đóng góp, mà còn cần hỗ trợ toàn bộ hành trình sau giao dịch như:
- ghi nhận giao dịch,
- gom vào batch,
- theo dõi phân bổ,
- lưu proof,
- hỗ trợ tax receipt,
- tra cứu lịch sử.

Nói ngắn gọn, đây không chỉ là tính năng donate, mà là một hệ thống charity có thể vận hành được.

---

## 2. Mục tiêu dự án

Dự án Charity có 4 mục tiêu chính:

### 2.1. Giúp người dùng đóng góp dễ dàng
Người dùng có thể chọn đúng hình thức charity phù hợp với nhu cầu:
- quyên góp trực tiếp,
- hoặc mua charity gift card để tặng người khác.

### 2.2. Giúp dòng tiền minh bạch
Sau khi thanh toán, hệ thống cần cho phép theo dõi:
- tiền đã vào batch nào,
- batch đã phân bổ chưa,
- đã giải ngân cho ai,
- có proof hay chưa,
- có tax receipt hay chưa.

### 2.3. Giúp hệ thống vận hành được thật
Ngoài user flow, hệ thống còn cần phần admin để:
- quản lý quỹ,
- quản lý batch,
- theo dõi settlement,
- xử lý refund,
- kiểm tra audit,
- phân quyền.

### 2.4. Tạo niềm tin cho người dùng
Charity là mảng nhạy cảm, nên hệ thống phải tạo được cảm giác:
- rõ ràng,
- minh bạch,
- có bằng chứng,
- có thể tra cứu lại.

---

## 3. Phạm vi dự án

Dự án Charity gồm 2 phần lớn:

### 3.1. Charity phía người dùng
Bao gồm:
- Buy Gift Charity
- Charity E-Voucher
- Charity E-Gift Card
- Batch Detail
- Distribution Detail
- QR Gift
- Proof View
- Transaction History

### 3.2. Charity Admin
Bao gồm:
- Dashboard
- Pool Management
- Batch Distribution
- Merchant Settlement
- Transactions
- Refund
- Audit Trail
- RBAC & Security
- và các màn hình vận hành nâng cao khác

---

## 4. Nhóm người dùng chính

### 4.1. Donor
Người thực hiện đóng góp hoặc mua charity gift card.

### 4.2. Recipient
Người nhận charity gift card hoặc đối tượng hưởng lợi từ charity flow.

### 4.3. Admin / Operations
Người vận hành quỹ, batch, payout, settlement, refund và proof.

### 4.4. Finance / Auditor / Manager
Người theo dõi đối soát, phê duyệt, audit và compliance.

---

## 5. Charity user side dùng để làm gì?

Phần Charity phía người dùng là nơi người dùng trực tiếp tạo giao dịch charity.

Người dùng có thể đi theo 2 luồng chính:

### 5.1. Charity E-Voucher
Người dùng chọn mục đích thiện nguyện, nhập số tiền, chọn thanh toán và hoàn tất quyên góp.

### 5.2. Charity E-Gift Card
Người dùng mua thẻ quà tặng thiện nguyện, có thể giữ lại hoặc gửi trực tiếp cho người nhận.

Sau đó người dùng có thể:
- xem trạng thái card,
- xem QR gift,
- xem proof redeem nếu có,
- xem transaction history.

---

## 6. Business rules chính

### 6.1. Với Charity E-Voucher
- Bắt buộc chọn mục đích quyên góp.
- Số tiền phải lớn hơn 0.
- Platform fee = 1.5% của donation amount.
- Total = donation amount + platform fee.

### 6.2. Với Charity E-Gift Card
- Card value phải lớn hơn 0.
- Quantity tối thiểu là 1.
- Nếu bật gửi trực tiếp thì recipient email là bắt buộc.
- Total = card value x quantity.

### 6.3. Quy tắc hiển thị
- QR chỉ hiển thị khi card ở trạng thái `Available`.
- Proof chỉ hiển thị khi record có proof.
- Confirm Payment chỉ bật khi dữ liệu hợp lệ.

---

## 7. Chi tiết từng màn hình Charity

## 7.1. Buy Gift Charity

### Mục đích
Đây là màn hình bắt đầu của user flow.

### Vai trò
Cho phép người dùng chọn loại charity và nhập dữ liệu để thanh toán.

### Nội dung chính
Màn hình gồm 3 bước:

#### Bước 1: Gift Type
Người dùng chọn:
- Charity E-Voucher
- Charity E-Gift Card

#### Bước 2: Details
Nếu là Voucher:
- chọn purpose,
- chọn currency,
- nhập donation amount.

Nếu là Gift Card:
- chọn currency,
- nhập card value,
- chọn quantity,
- bật direct send nếu cần,
- nhập recipient name và recipient email nếu cần.

#### Bước 3: Payment
- chọn payment method,
- xem invoice summary,
- bấm Confirm Payment khi hợp lệ.

### Kết quả mong đợi
Người dùng hiểu rõ:
- đang ở luồng nào,
- phải nhập gì,
- cần thanh toán bao nhiêu.

---

## 7.2. Charity E-Voucher List

### Mục đích
Hiển thị danh sách batch donation.

### Vai trò
Giúp người dùng biết khoản donation của mình đã được ghi nhận thành batch cụ thể.

### Nội dung chính
- batch ID,
- purpose,
- donated date,
- amount,
- status,
- filter theo trạng thái.

### Kết quả mong đợi
Người dùng biết mình đã donate vào batch nào và batch đó đang ở trạng thái gì.

---

## 7.3. Batch Detail

### Mục đích
Hiển thị chi tiết một batch donation.

### Vai trò
Giúp giải thích batch đang được phân bổ như thế nào.

### Nội dung chính
Có 3 tab:

#### Overview
- Batch ID
- Purpose
- Donated on
- Total Donation Amount
- Distribution Progress
- Distributed amount
- Remaining amount

#### Distributed
Hiển thị danh sách các khoản đã phân bổ.

#### Tax Receipt
Hiển thị nội dung tax receipt và action download.

### Kết quả mong đợi
Người dùng hoặc admin thấy được batch này đã được xử lý đến đâu.

---

## 7.4. Distribution Detail

### Mục đích
Cho biết một phần tiền trong batch đã được gửi cho ai.

### Vai trò
Giúp chứng minh tiền đã đi đến đúng nơi nhận.

### Nội dung chính
- recipient,
- address,
- amount,
- date,
- status,
- proof.

### Kết quả mong đợi
Người xem có thể đối chiếu chi tiết từng distribution record.

---

## 7.5. Charity E-Gift Card List

### Mục đích
Hiển thị danh sách charity gift card của người dùng.

### Vai trò
Giúp theo dõi vòng đời của card đã mua.

### Nội dung chính
- sub-tab E-Gift Card,
- sub-tab Redeem History,
- filter trạng thái,
- masked card number,
- recipient hoặc redeemed by,
- created date,
- value,
- status.

### Kết quả mong đợi
Người dùng biết card nào còn dùng được, đã gifted hay đã redeemed.

---

## 7.6. Gift Card Detail

### Mục đích
Hiển thị đầy đủ thông tin của một charity gift card.

### Vai trò
Cho người dùng xem sâu trạng thái hiện tại của card.

### Nội dung chính
- status,
- card number,
- card value,
- created date.

Tùy trạng thái có thể hiển thị thêm:
- recipient,
- redeemer,
- merchant,
- redemption date,
- proof of redemption,
- Gift via QR.

### Kết quả mong đợi
Người dùng hiểu được vòng đời cụ thể của từng card.

---

## 7.7. QR Gift View

### Mục đích
Hỗ trợ tặng card qua QR.

### Vai trò
Phục vụ tình huống người dùng muốn tặng thẻ linh hoạt.

### Nội dung chính
- card value,
- currency,
- QR image,
- redeem code,
- download QR button.

### Kết quả mong đợi
Người dùng có thể chia sẻ card qua QR khi card vẫn available.

---

## 7.8. Proof View

### Mục đích
Hiển thị bằng chứng liên quan đến voucher distribution hoặc gift card redemption.

### Vai trò
Tạo thêm lớp tin cậy cho giao dịch charity.

### Nội dung chính
- proof preview,
- proof context,
- loại proof theo voucher hoặc gift card.

### Kết quả mong đợi
Người xem có thể kiểm tra bằng chứng hỗ trợ của giao dịch.

---

## 7.9. Transaction History

### Mục đích
Hiển thị lịch sử giao dịch charity.

### Vai trò
Giúp người dùng tra cứu lại toàn bộ hoạt động charity đã phát sinh.

### Nội dung chính
- transaction ID,
- amount,
- date,
- status,
- filter theo loại.

### Kết quả mong đợi
Người dùng có một nơi để xem lại lịch sử charity của mình.

 