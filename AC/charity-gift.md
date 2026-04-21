# Charity Gift Feature Specification

## 1. Mô tả tính năng

`Charity` là một tính năng cho phép người dùng thực hiện quyên góp hoặc mua quà tặng thiện nguyện theo 2 luồng chính:

- `Charity E-Voucher`: quyên góp trực tiếp cho một mục đích thiện nguyện cụ thể.
- `Charity E-Gift Card`: mua thẻ quà tặng thiện nguyện để tặng người nhận, người nhận có thể sử dụng hoặc redeem sau.

Tính năng không chỉ hỗ trợ tạo giao dịch mà còn cung cấp các màn hình theo dõi sau giao dịch như:

- danh sách batch quyên góp,
- chi tiết batch,
- chi tiết phân bổ,
- danh sách gift card,
- chi tiết gift card,
- màn hình QR gift,
- màn hình proof,
- transaction history.

Tài liệu này được tổng hợp từ:

- [`charity/charity-gift.html`](./charity-gift.html)
- [`charity/charity-gift.js`](./charity-gift.js)

## 2. Business tổng thể

Luồng nghiệp vụ tổng thể của tính năng:

1. Người dùng vào tab `Buy Gift Charity`, `Charity E-Voucher`, `Charity E-Gift Card`, hoặc `Transaction History`.
2. Nếu mua mới, người dùng chọn loại giao dịch:
   - `Voucher`
   - `Card`
3. Người dùng nhập thông tin theo loại đã chọn:
   - Voucher: chọn mục đích quyên góp, chọn currency, nhập amount.
   - Card: chọn currency, nhập value, chọn quantity, có thể bật `Send directly to a recipient`.
4. Người dùng chọn phương thức thanh toán.
5. Hệ thống hiển thị invoice summary:
   - Voucher có phí platform `1.5%`.
   - Card tính theo `value x quantity`.
6. Khi dữ liệu hợp lệ, người dùng bấm `Confirm Payment`.
7. Hệ thống hiển thị modal thanh toán thành công.
8. Sau thành công, flow quay về danh sách tương ứng:
   - Voucher quay về danh sách batch quyên góp.
   - Card quay về danh sách gift card.
9. Người dùng có thể xem sâu các màn hình liên quan:
   - Batch details
   - Distribution details
   - Tax receipt
   - Card details
   - QR gift
   - Proof view
   - Redeem history

## 3. Quy tắc nghiệp vụ chính

- Voucher chỉ có thể thanh toán khi đã chọn `purpose` và `amount > 0`.
- Card chỉ có thể thanh toán khi `value > 0`, `quantity >= 1`, và nếu bật gửi trực tiếp thì email người nhận phải có ký tự `@`.
- QR chỉ xuất hiện với card có trạng thái `Available`.
- Proof chỉ hiển thị khi bản ghi có `hasProof = true`.

## 4. Chi tiết theo từng loại

### 4.1. Charity E-Voucher

#### Mục tiêu

- Quyên góp trực tiếp cho một chương trình hoặc mục đích cụ thể.
- Tạo batch donation để theo dõi phân bổ sau này.

#### Màn hình và business

##### 1) Buy Gift Charity

- Người dùng chọn `Charity E-Voucher`.
- Màn hình gồm 3 bước:
  - Gift Type
  - Donation Details
  - Payment

##### 2) Donation Details

- Chọn mục đích quyên góp từ danh sách:
  - Food Support
  - Children Education
  - Healthcare & Medicine
  - Elderly Care
  - Disaster Relief
  - Scholarship Programs
- Chọn currency: `USD` hoặc `VND`.
- Nhập amount.

##### 3) Payment

- Chọn một trong các payment methods:
  - USDV
  - USDT
  - USD
  - BTC
  - VND
- Invoice summary hiển thị:
  - Donation Amount
  - Platform Fee (1.5%)
  - Total
- Nút confirm chỉ enable khi dữ liệu hợp lệ.

##### 4) Charity E-Voucher List

- Hiển thị danh sách batch donation.
- Có filter theo status:
  - All Statuses
  - In Distribution
  - Distributed
  - Completed
- Mỗi dòng hiển thị:
  - Batch ID
  - Purpose
  - Donated date
  - Amount
  - Status
  - View Details

##### 5) Batch Details

- Có 3 tab con:
  - Overview
  - Distributed
  - Tax Receipt
- Overview hiển thị:
  - Batch ID
  - Purpose
  - Donated on
  - Total Donation Amount
  - Distribution Progress
  - Distributed amount
  - Remaining amount
- Distributed hiển thị danh sách các đợt phân bổ.
- Tax Receipt hiển thị hóa đơn thuế của foundation.

##### 6) Distribution Details

- Hiển thị thông tin phân bổ cụ thể:
  - Recipient
  - Address
  - Amount
  - Date
  - Status
  - Proof
- Nếu có proof thì hiển thị link `[View]`, nếu không có thì hiển thị `Not available`.

##### 7) Uploaded Proof

- Màn hình xem minh chứng đã upload.
- Với voucher, proof là ảnh minh họa riêng.

### 4.2. Charity E-Gift Card

#### Mục tiêu

- Mua gift card thiện nguyện để tặng người khác.
- Có thể tặng trực tiếp qua email hoặc qua QR.
- Người nhận có thể redeem sau đó.

#### Màn hình và business

##### 1) Buy Gift Charity

- Người dùng chọn `Charity E-Gift Card`.
- Màn hình gồm:
  - Gift Type
  - Gift Card Details
  - Payment

##### 2) Gift Card Details

- Chọn currency: `USD` hoặc `VND`.
- Nhập `card value`.
- Chọn `quantity`.
- Có checkbox `Send directly to a recipient`.
- Nếu bật checkbox này:
  - hiện `Recipient Name (Optional)`
  - hiện `Recipient Email *`

##### 3) Payment

- Chọn payment method giống voucher.
- Invoice summary hiển thị:
  - Gift Card Value
  - Quantity
  - Total
- Total = `cardValue x quantity`.

##### 4) Charity Gift Cards List

- Có 2 sub-tab:
  - E-Gift Card
  - Redeem History
- Có filter trạng thái:
  - All
  - Available
  - Gifted
- Mỗi card hiển thị:
  - Masked card number
  - Recipient hoặc Redeemed by nếu có
  - Created date
  - Value
  - Status
  - View Details

##### 5) E-Gift Card Details

- Hiển thị:
  - Status
  - Card Number
  - Card Value
  - Created Date
- Nếu status là `Gifted` hoặc `Redeemed` thì hiển thị thêm phần Recipient.
- Nếu status là `Redeemed` thì hiển thị thêm Redemption Details:
  - Redeemer
  - Merchant
  - Date
  - Proof of Redemption
- Nếu status là `Available` thì có nút `Gift via QR`.

##### 6) Gift via QR

- Chỉ dùng cho card `Available`.
- Màn hình hiển thị:
  - Amount
  - Currency
  - QR image
  - Redeem Code
  - Nút `DOWNLOAD QR`
- Redeem code được sinh từ card id hoặc masked number.

##### 7) Uploaded Proof

- Với gift card, proof là ảnh proof of redemption.
- Màn hình dùng chung route `proof`, nhưng nội dung đổi theo `proofKind = gift-card`.

## 5. Chi tiết từng màn hình

### 5.1. Màn hình dùng chung

- Header:
  - Đổi tiêu đề theo `viewMode`.
  - Có nút Back ở các màn hình con.
- Tabs:
  - `Buy Gift Charity`
  - `Charity E-Voucher`
  - `Charity E-Gift Card`
  - `Transaction History`
- Success modal:
  - Hiển thị sau khi confirm payment thành công.
  - Có 2 nút:
    - Close
    - View Voucher hoặc View Cards

### 5.2. Màn hình theo loại Voucher

- Voucher buy form: chọn purpose, amount, currency, payment.
- Voucher list: batch list + filter status + donate now.
- Batch details: xem tiến độ quyên góp và lịch sử phân bổ.
- Distribution details: xem thông tin giao nhận.
- Tax receipt: xem chứng từ tax của foundation.
- Proof view: xem bằng chứng hỗ trợ.

### 5.3. Màn hình theo loại Gift Card

- Card buy form: chọn value, quantity, gửi trực tiếp nếu cần.
- Gift card list: xem trạng thái `Available`, `Gifted`, `Redeemed`.
- Card detail: xem thông tin thẻ và lịch sử redeem.
- QR view: tặng qua QR.
- Proof view: xem proof redeem.

## 6. Ghi chú triển khai

- Toàn bộ data hiện tại là mock trong JS, phù hợp cho demo UI/UX hơn là nghiệp vụ production.
- Một số hành vi là placeholder:
  - `download-receipt` chỉ `alert('Downloading Receipt...')`
  - proof hiển thị bằng ảnh tĩnh
  - QR cũng là ảnh tĩnh
  - Transaction history là mock list

## 7. Tham chiếu code

- Templates UI: [`charity/charity-gift.html`](./charity-gift.html)
- State, routing, business logic: [`charity/charity-gift.js`](./charity-gift.js)
- Voucher list & batch detail: [`charity/charity-gift.js`](./charity-gift.js#L308)
- Card list & card detail: [`charity/charity-gift.js`](./charity-gift.js#L315)
- Payment validation: [`charity/charity-gift.js`](./charity-gift.js#L145)
