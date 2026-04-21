# Charity Gift - Mô tả Nghiệp vụ Dễ Hiểu

## 1. Tính năng này dùng để làm gì?

`Charity Gift` là tính năng cho phép người dùng đóng góp cho các hoạt động thiện nguyện hoặc mua quà tặng thiện nguyện để gửi cho người khác.

Nói đơn giản, tính năng này có 2 cách sử dụng chính:

- **Quyên góp trực tiếp** cho một mục đích cụ thể, ví dụ như giáo dục, y tế, cứu trợ thiên tai.
- **Mua gift card thiện nguyện** để tặng người nhận, sau đó người nhận có thể sử dụng hoặc redeem.

Tính năng này không chỉ dừng ở việc thanh toán. Sau khi giao dịch thành công, người dùng còn có thể theo dõi:

- tiền đã được đưa vào batch nào,
- tiền đã được phân bổ đến đâu,
- gift card đang ở trạng thái nào,
- có proof hay chưa,
- lịch sử giao dịch ra sao.

---

## 2. Tại sao hệ thống cần tính năng này?

Tính năng này giúp hệ thống charity làm được 3 việc quan trọng:

1. **Thu tiền minh bạch**
   - Người dùng biết mình đang quyên góp cho đúng mục đích.
   - Hệ thống ghi nhận rõ từng giao dịch.

2. **Quản lý phân bổ dễ dàng**
   - Không chỉ nhận tiền, hệ thống còn cần biết tiền đã được chuyển đến đâu.
   - Điều này đặc biệt quan trọng với các batch donation và tax receipt.

3. **Tặng quà linh hoạt**
   - Với gift card, người tặng có thể gửi trực tiếp cho người nhận.
   - Người nhận có thể redeem sau, phù hợp cho nhiều kịch bản tặng quà.

---

## 3. Người dùng sẽ làm gì trong tính năng này?

Người dùng thường đi qua 1 trong 2 hành trình:

### 3.1. Hành trình quyên góp

1. Chọn loại `Charity E-Voucher`.
2. Chọn mục đích quyên góp.
3. Nhập số tiền và chọn currency.
4. Chọn phương thức thanh toán.
5. Xác nhận giao dịch.
6. Xem batch donation sau khi thanh toán thành công.
7. Theo dõi phân bổ, proof và tax receipt.

### 3.2. Hành trình mua gift card

1. Chọn loại `Charity E-Gift Card`.
2. Nhập giá trị thẻ, số lượng và currency.
3. Nếu muốn, bật gửi trực tiếp cho người nhận.
4. Chọn phương thức thanh toán.
5. Xác nhận giao dịch.
6. Xem danh sách gift card.
7. Theo dõi chi tiết card, QR hoặc proof redeem.

---

## 4. Hai loại chính trong tính năng

### 4.1. Charity E-Voucher

Đây là luồng dành cho người muốn **quyên góp trực tiếp**.

Người dùng sẽ:

- chọn một mục đích cụ thể,
- nhập số tiền,
- thanh toán,
- sau đó hệ thống ghi nhận thành một batch donation.

Sau này, admin hoặc bộ phận vận hành có thể:

- phân bổ tiền theo batch,
- xem trạng thái đã giải ngân hay chưa,
- lưu proof,
- xuất tax receipt.

### 4.2. Charity E-Gift Card

Đây là luồng dành cho người muốn **mua thẻ quà tặng thiện nguyện**.

Người dùng sẽ:

- chọn giá trị thẻ,
- chọn số lượng,
- có thể gửi trực tiếp cho một email người nhận,
- hoặc giữ lại để dùng sau.

Gift card có vòng đời riêng:

- `Available`: card còn dùng được
- `Gifted`: card đã được gửi cho người nhận
- `Redeemed`: card đã được sử dụng

---

## 5. Luồng nghiệp vụ tổng thể

### 5.1. Luồng voucher

1. Người dùng vào màn hình charity.
2. Chọn `Charity E-Voucher`.
3. Chọn mục đích quyên góp.
4. Nhập số tiền.
5. Chọn currency và payment method.
6. Hệ thống tính phí nền tảng.
7. Người dùng xác nhận thanh toán.
8. Hệ thống báo thành công.
9. Giao dịch xuất hiện trong danh sách batch.
10. Người dùng có thể xem chi tiết và proof sau đó.

### 5.2. Luồng gift card

1. Người dùng vào màn hình charity.
2. Chọn `Charity E-Gift Card`.
3. Nhập giá trị card và số lượng.
4. Nếu cần, nhập email người nhận.
5. Chọn payment method.
6. Hệ thống tính tổng tiền.
7. Người dùng xác nhận thanh toán.
8. Hệ thống báo thành công.
9. Gift card xuất hiện trong danh sách.
10. Người dùng có thể mở chi tiết, xem QR hoặc proof redeem.

---

## 6. Các màn hình chính và ý nghĩa của chúng

### 6.1. Màn hình Buy Gift Charity

Đây là màn hình bắt đầu.

Màn hình này giúp người dùng:

- chọn loại giao dịch,
- nhập thông tin cần thiết,
- xem tổng tiền cần thanh toán,
- hoàn tất giao dịch.

Nó được chia thành 3 bước để người dùng không bị rối:

- chọn loại,
- nhập thông tin,
- thanh toán.

### 6.2. Màn hình Charity E-Voucher

Đây là nơi hiển thị danh sách các batch donation.

Người dùng có thể:

- xem đã quyên góp cho những batch nào,
- lọc theo trạng thái,
- mở từng batch để xem chi tiết.

### 6.3. Màn hình Batch Details

Màn hình này trả lời câu hỏi:

- Batch này là gì?
- Đã phân bổ bao nhiêu?
- Còn lại bao nhiêu?
- Có biên nhận thuế không?

### 6.4. Màn hình Distribution Details

Màn hình này cho biết một khoản tiền đã được chuyển cho ai, vào ngày nào, số tiền bao nhiêu, và có proof hay chưa.

### 6.5. Màn hình Charity E-Gift Card

Đây là nơi xem danh sách các gift card đã mua.

Người dùng có thể:

- xem card còn available,
- xem card đã gifted,
- xem card đã redeemed.

### 6.6. Màn hình E-Gift Card Details

Màn hình này cho biết:

- card còn hay đã dùng,
- card số nào,
- trị giá bao nhiêu,
- ai đã nhận,
- ai đã redeem,
- có proof không.

### 6.7. Màn hình QR Gift

Đây là màn hình hỗ trợ tặng card bằng QR.

Màn hình này thường dùng khi card هنوز còn `Available`.

### 6.8. Màn hình Proof

Màn hình này dùng để xem ảnh proof liên quan đến:

- voucher distribution,
- gift card redemption.

### 6.9. Transaction History

Đây là màn hình lịch sử giao dịch.

Mục đích là để người dùng hoặc bộ phận liên quan tra cứu lại:

- đã phát sinh giao dịch nào,
- là voucher hay gift card,
- trạng thái ra sao.

---

## 7. Quy tắc nghiệp vụ dễ hiểu

- Nếu là voucher thì bắt buộc phải chọn mục đích quyên góp.
- Nếu là voucher thì phải nhập số tiền lớn hơn 0.
- Nếu là gift card thì phải nhập giá trị card lớn hơn 0.
- Số lượng gift card không được nhỏ hơn 1.
- Nếu muốn gửi trực tiếp cho người nhận thì email phải hợp lệ.
- QR chỉ có khi card còn dùng được.
- Proof chỉ hiện khi có dữ liệu proof.

---

## 8. Hệ thống cần đảm bảo điều gì?

Hệ thống cần giúp người dùng:

- hiểu rõ mình đang làm gì,
- biết chính xác số tiền cần thanh toán,
- biết giao dịch đã thành công hay chưa,
- tra cứu lại sau khi giao dịch,
- có bằng chứng hoặc biên nhận khi cần.

Nói ngắn gọn, tính năng này phải tạo được cảm giác:

- **dễ dùng**,
- **rõ ràng**,
- **minh bạch**,
- **có thể theo dõi được**.

---

## 9. Kết quả mong đợi

Sau khi dùng tính năng này, người dùng có thể:

- quyên góp đúng mục đích,
- mua charity gift card nhanh chóng,
- gửi quà cho người khác,
- xem lại lịch sử,
- kiểm tra proof và tax receipt khi cần.

 

