# BA Specification - Charity Gift

## 1. Thông tin tài liệu

- Tên tính năng: `Charity Gift`
- Phạm vi: UI/UX và nghiệp vụ người dùng cho luồng charity
- Nguồn tham chiếu:
  - [`charity/charity-gift.html`](../charity/charity-gift.html)
  - [`charity/charity-gift.js`](../charity/charity-gift.js)
- Mục tiêu: mô tả nghiệp vụ chuẩn BA cho 2 loại chính:
  - `Charity E-Voucher`
  - `Charity E-Gift Card`

## 2. Mục tiêu nghiệp vụ

Tính năng `Charity Gift` cho phép người dùng:

- Thực hiện quyên góp theo mục đích cụ thể.
- Mua charity gift card để tặng người nhận.
- Theo dõi trạng thái batch donation, phân bổ, gift card và proof.
- Tra cứu lịch sử giao dịch.

## 3. Phạm vi chức năng

### 3.1. In scope

- Tạo giao dịch donation theo `E-Voucher`.
- Tạo giao dịch mua `E-Gift Card`.
- Thanh toán theo nhiều payment method.
- Xem danh sách và chi tiết batch donation.
- Xem danh sách và chi tiết gift card.
- Xem QR gift.
- Xem proof.
- Xem transaction history.

### 3.2. Out of scope

- Không bao gồm tích hợp thanh toán thật.
- Không bao gồm API backend thật trong file hiện tại.
- Không bao gồm logic lưu trữ hoặc đồng bộ dữ liệu thật.
- Không bao gồm xử lý pháp lý/thuế ngoài phần hiển thị tax receipt mock.

## 4. Đối tượng sử dụng

- Donor: người quyên góp hoặc mua gift card.
- Recipient: người nhận gift card.
- Operation/Admin: người theo dõi batch, distribution, proof và receipt.

## 5. Giả định và ràng buộc

- Dữ liệu hiện tại là mock data trên frontend.
- Currency hỗ trợ trong UI hiện tại là `USD` và `VND`.
- Payment methods hiển thị trong UI hiện tại gồm:
  - `USDV`
  - `USDT`
  - `USD`
  - `BTC`
  - `VND`
- Amount/value được nhập dạng số.
- Email recipient được xem là hợp lệ khi có ký tự `@`.
- QR và proof hiện tại là ảnh tĩnh minh họa.

## 6. Luồng nghiệp vụ tổng thể

### 6.1. Luồng Charity E-Voucher

1. Người dùng chọn tab `Charity E-Voucher` hoặc bắt đầu từ `Buy Gift Charity`.
2. Người dùng chọn loại `Voucher`.
3. Người dùng chọn mục đích quyên góp.
4. Người dùng nhập amount và chọn currency.
5. Người dùng chọn payment method.
6. Hệ thống tính platform fee `1.5%`.
7. Người dùng xác nhận thanh toán.
8. Hệ thống hiển thị success modal.
9. Người dùng được đưa về danh sách batch donation.
10. Người dùng có thể xem batch details, distribution details, tax receipt và proof.

### 6.2. Luồng Charity E-Gift Card

1. Người dùng chọn tab `Charity E-Gift Card` hoặc bắt đầu từ `Buy Gift Charity`.
2. Người dùng chọn loại `Card`.
3. Người dùng nhập card value, quantity và currency.
4. Người dùng có thể bật tùy chọn gửi trực tiếp cho người nhận.
5. Người dùng chọn payment method.
6. Hệ thống tính tổng tiền theo `value x quantity`.
7. Người dùng xác nhận thanh toán.
8. Hệ thống hiển thị success modal.
9. Người dùng được đưa về danh sách gift card.
10. Người dùng có thể xem card details, QR gift, proof và redeem history.

## 7. Business rules

### 7.1. Quy tắc chung

- Người dùng phải chọn đúng loại giao dịch trước khi thanh toán.
- Nút `Confirm Payment` chỉ được enable khi dữ liệu đầu vào hợp lệ.
- Sau khi thanh toán thành công, hệ thống hiển thị modal success.

### 7.2. Quy tắc với E-Voucher

- Bắt buộc chọn `purpose`.
- Bắt buộc nhập `amount > 0`.
- Platform fee = `1.5%` của amount.
- Total = `amount + platform fee`.

### 7.3. Quy tắc với E-Gift Card

- Bắt buộc nhập `card value > 0`.
- Bắt buộc quantity `>= 1`.
- Nếu bật `Send directly to a recipient`, thì `recipientEmail` phải chứa ký tự `@`.
- Total = `card value x quantity`.
- QR chỉ hiển thị với card có status `Available`.

### 7.4. Quy tắc proof

- Proof chỉ hiển thị khi record có `hasProof = true`.
- Voucher proof và gift card proof dùng nội dung hiển thị khác nhau.

## 8. Mô tả màn hình

### 8.1. Màn hình Buy Gift Charity

#### Mục đích

- Là entry point để người dùng chọn loại charity gift cần thực hiện.

#### Thành phần

- Step 01: Gift Type
- Step 02: Donation Details hoặc Gift Card Details
- Step 03: Payment

#### Hành vi

- Người dùng chọn `Charity E-Voucher` hoặc `Charity E-Gift Card`.
- UI chuyển nội dung step 02 theo loại đã chọn.
- UI tự cập nhật invoice summary theo dữ liệu nhập.

### 8.2. Màn hình Charity E-Voucher

#### Mục đích

- Hiển thị danh sách batch donation và trạng thái phân bổ.

#### Thành phần

- Filter trạng thái:
  - All Statuses
  - In Distribution
  - Distributed
  - Completed
- Danh sách batch donation:
  - Batch ID
  - Purpose
  - Donated date
  - Amount
  - Status
  - View Details
- Nút `Donate Now`

#### Hành vi

- Người dùng lọc theo status.
- Người dùng mở chi tiết một batch.
- Người dùng có thể bắt đầu donation mới từ danh sách này.

### 8.3. Màn hình Batch Details

#### Mục đích

- Xem thông tin chi tiết của một batch donation.

#### Tabs con

- Overview
- Distributed
- Tax Receipt

#### Dữ liệu hiển thị

- Batch ID
- Purpose
- Donated on
- Total Donation Amount
- Distribution Progress
- Distributed amount
- Remaining amount

#### Hành vi

- Overview hiển thị tổng quan tiến độ.
- Distributed hiển thị các đợt phân bổ.
- Tax Receipt hiển thị hóa đơn thuế của foundation.

### 8.4. Màn hình Distribution Details

#### Mục đích

- Xem chi tiết một lần phân bổ.

#### Dữ liệu hiển thị

- Recipient
- Address
- Amount
- Date
- Status
- Proof

#### Hành vi

- Nếu có proof, hiển thị link xem proof.
- Nếu không có proof, hiển thị `Not available`.

### 8.5. Màn hình Charity E-Gift Card

#### Mục đích

- Hiển thị danh sách gift card và trạng thái sử dụng.

#### Sub-tab

- E-Gift Card
- Redeem History

#### Filter

- All
- Available
- Gifted

#### Dữ liệu hiển thị

- Masked card number
- Recipient hoặc Redeemed by
- Created date
- Value
- Status
- View Details

#### Hành vi

- Người dùng đổi giữa danh sách thẻ và lịch sử redeem.
- Người dùng lọc theo status.
- Người dùng mở chi tiết từng card.

### 8.6. Màn hình E-Gift Card Details

#### Mục đích

- Xem thông tin chi tiết của một gift card.

#### Dữ liệu hiển thị

- Status
- Card Number
- Card Value
- Created Date

#### Dữ liệu mở rộng theo trạng thái

- Nếu status là `Gifted` hoặc `Redeemed`, hiển thị phần Recipient.
- Nếu status là `Redeemed`, hiển thị thêm:
  - Redeemer
  - Merchant
  - Date
  - Proof of Redemption
- Nếu status là `Available`, hiển thị nút `Gift via QR`.

### 8.7. Màn hình Gift via QR

#### Mục đích

- Hiển thị QR và redeem code để tặng gift card.

#### Dữ liệu hiển thị

- Amount
- Currency
- QR image
- Redeem Code
- Nút `DOWNLOAD QR`

#### Hành vi

- Chỉ truy cập từ card có status `Available`.
- Redeem code được sinh từ card id hoặc masked number.

### 8.8. Màn hình Uploaded Proof

#### Mục đích

- Hiển thị ảnh proof liên quan đến voucher hoặc gift card.

#### Hành vi

- Nội dung proof thay đổi theo `proofKind`.
- Hiện tại là ảnh tĩnh minh họa.

### 8.9. Màn hình Transaction History

#### Mục đích

- Cung cấp danh sách transaction history tổng hợp.

#### Dữ liệu hiển thị

- Tx ID
- Amount
- Date
- Status

#### Hành vi

- Có filter theo loại:
  - All
  - E-Voucher
  - E-Gift Card

## 9. Validation rules

### 9.1. Voucher

- `purpose` không được trống.
- `amount` phải là số hợp lệ lớn hơn 0.
- Chỉ khi hợp lệ mới cho phép confirm payment.

### 9.2. Gift Card

- `card value` không được trống.
- `quantity` phải từ 1 trở lên.
- Nếu chọn gửi trực tiếp:
  - `recipientEmail` là bắt buộc.
  - Email phải có định dạng hợp lệ tối thiểu theo rule hiện tại là chứa `@`.

### 9.3. Payment

- Payment method phải được chọn.
- Invoice summary phải cập nhật theo loại giao dịch hiện tại.

## 10. Exception handling

- Nếu chưa nhập đủ dữ liệu hợp lệ, nút confirm payment bị disable.
- Nếu proof không tồn tại, màn hình detail hiển thị `Not available`.
- Nếu card không phải `Available`, không hiển thị hành động `Gift via QR`.
- Nếu không có selected item khi vào detail, màn hình sẽ không có dữ liệu thực tế để render.

## 11. Trạng thái và điều hướng

### 11.1. View mode

- `buy`
- `list`
- `batch`
- `dist`
- `cardList`
- `cardDetail`
- `qr`
- `proof`
- `history`

### 11.2. Điều hướng chính

- `buy` -> `list` sau khi success với voucher
- `buy` -> `cardList` sau khi success với gift card
- `list` -> `batch`
- `batch` -> `dist`
- `cardList` -> `cardDetail`
- `cardDetail` -> `qr`
- `cardDetail` hoặc `dist` -> `proof`

## 12. Acceptance criteria

### 12.1. Voucher

- Người dùng chọn voucher, nhập purpose và amount thì hệ thống cho phép thanh toán.
- Platform fee hiển thị đúng `1.5%`.
- Sau khi thanh toán thành công, người dùng quay về danh sách batch.
- Batch detail hiển thị được overview, distributed và tax receipt.

### 12.2. Gift Card

- Người dùng chọn card, nhập value và quantity thì hệ thống cho phép thanh toán.
- Nếu bật gửi trực tiếp, email recipient phải hợp lệ theo rule hiện tại.
- Sau khi thanh toán thành công, người dùng quay về danh sách gift card.
- Card detail hiển thị đúng theo từng status.
- Card status `Available` có hành động `Gift via QR`.

### 12.3. Proof và receipt

- Nếu record có proof, người dùng xem được proof.
- Nếu không có proof, hệ thống hiển thị trạng thái không khả dụng.
- Tax receipt hiển thị ở batch detail tab `Tax Receipt`.

## 13. Tài liệu tham chiếu

- [`charity/charity-gift.html`](../charity/charity-gift.html)
- [`charity/charity-gift.js`](../charity/charity-gift.js)
- [`AC/Charity-Admin-Funding-Flow-AC.md`](./Charity-Admin-Funding-Flow-AC.md)

