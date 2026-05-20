# Charity Gift — Business Specification

> **Phiên bản:** 1.0  
> **Ngày tạo:** 2026-05-19  
> **Trạng thái:** Draft — Tax Receipt chưa xác định, sẽ bổ sung sau  
> **Nguồn:** Business doc + UI prototype + Q&A với Product Owner

---

## 1. Tổng Quan

**Charity Gift** là tính năng cho phép người dùng (Donor) thực hiện một trong hai hành động:

1. **Quyên góp trực tiếp** thông qua `Charity E-Voucher` — tiền được gom vào batch và Admin phân bổ đến người thụ hưởng.
2. **Mua gift card thiện nguyện** thông qua `Charity E-Gift Card` — Donor nhận card và tặng cho người nhận (Recipient), Recipient dùng card tại Merchant.

---

## 2. Actors và Quyền Hạn

| Actor | Mô tả | Quyền chính |
|-------|--------|-------------|
| **Donor** | Người dùng VLinkPay thực hiện quyên góp hoặc mua gift card | Mua voucher/gift card, xem lịch sử, theo dõi batch, tặng card, gửi lại email |
| **Recipient** | Người nhận gift card qua email | Xem thông tin card, check balance, redeem tại Merchant |
| **Merchant** | Đơn vị thụ hưởng nhận redemption từ Recipient | Xử lý redemption, submit proof hóa đơn, xem lịch sử giải ngân |
| **Admin** | Bộ phận vận hành nội bộ | Quản lý toàn bộ hệ thống: duyệt Merchant, phân bổ batch, review proof, cấu hình tham số |

> **Lưu ý:** Merchant phải **đăng ký và được Admin approve** trước khi có thể tham gia hệ thống.

---

## 3. Luồng Nghiệp Vụ

### 3.1. Luồng Charity E-Voucher (Quyên Góp)

```
Donor
  → Chọn "Charity E-Voucher"
  → Chọn mục đích quyên góp
  → Nhập số tiền + chọn currency
  → Chọn phương thức thanh toán
  → Hệ thống hiển thị: số tiền quy đổi theo tỷ giá thực tế + phí nền tảng
  → Donor xác nhận thanh toán
  → Hệ thống ghi nhận giao dịch thành công
  → Thông báo gửi đến Donor
  → Giao dịch xuất hiện trong danh sách Charity E-Voucher (Donor view)

Admin
  → Gom các donation cùng mục đích + cùng kỳ vào một batch
  → Tạo distribution record (ai nhận, bao nhiêu, ngày nào)
  → Upload proof phân bổ
  → Đánh dấu batch đã giải ngân
  → Hệ thống thông báo cho Donor
```

### 3.2. Luồng Charity E-Gift Card (Mua Thẻ Quà Tặng)

```
Donor
  → Chọn "Charity E-Gift Card"
  → Chọn mục đích
  → Nhập giá trị card + số lượng + currency
  → (Tuỳ chọn) Bật "Gửi trực tiếp cho Recipient" → nhập email
  → Chọn phương thức thanh toán
  → Hệ thống hiển thị: tổng tiền (giá trị × số lượng) quy đổi + phí nền tảng
  → Donor xác nhận thanh toán
  → Hệ thống tạo các gift card
  → Thông báo gửi đến Donor
  → Nếu có email: Recipient nhận email với link, QR, và code

Donor (sau khi mua, nếu giữ card)
  → Vào màn hình Gift via QR
  → Cho Recipient quét QR trực tiếp HOẶC download/share QR image qua kênh khác

Donor (nếu cần gửi lại email)
  → Vào màn hình Card Detail
  → Chỉnh sửa email (mặc định auto-fill email cũ) → gửi lại
```

### 3.3. Luồng Recipient Nhận và Sử Dụng Card

```
Recipient
  → Nhận email: link xem card + QR + code
  → Mở link → xem thông tin card (không cần đăng nhập)
  → Check balance tại vlinkpay.com/check-balance (nhập code, không cần login)
     HOẶC check balance trong VLinkPay app (nếu có tài khoản)

  → Đến Merchant để redeem:
      Cách 1: Cho Merchant quét QR
      Cách 2: Đọc/nhập code cho Merchant
```

### 3.4. Luồng Merchant Xử Lý Redemption

```
Merchant (đã được Admin approve)
  → Quét QR của Recipient HOẶC nhập code thủ công
  → Hệ thống hiển thị thông tin card + số dư còn lại
  → Merchant nhập số tiền thực tế đã cung cấp cho Recipient
     (có thể nhỏ hơn số dư nếu Recipient chỉ dùng một phần)
  → Merchant chụp hình hóa đơn và submit proof
  → Hệ thống cập nhật số dư card (partial redemption)
  → Thông báo gửi đến Admin để review

Admin
  → Review proof hóa đơn của Merchant
  → [Approve] → Hệ thống tự động chuyển tiền vào ví VLinkPay của Merchant
                → Thông báo gửi đến Merchant
  → [Reject]  → Nhập lý do từ chối
                → Thông báo gửi đến Merchant kèm lý do
                → Merchant được phép submit lại proof mới
```

---

## 4. Quy Tắc Nghiệp Vụ

### 4.1. Quy Tắc Chung

| # | Quy tắc |
|---|---------|
| BR-01 | Giao dịch đã thanh toán thành công **không được hoàn tiền** trong mọi trường hợp |
| BR-02 | Phí nền tảng là **phần trăm (%) cấu hình bởi Admin**, áp dụng trên tổng giá trị giao dịch |
| BR-03 | Khi currency thanh toán khác currency mệnh giá, hệ thống **quy đổi theo tỷ giá thực tế tại thời điểm giao dịch** và hiển thị cho Donor trước khi xác nhận |
| BR-04 | Mục đích quyên góp là **bắt buộc** cho cả hai luồng |
| BR-05 | Số tiền/giá trị phải nằm trong giới hạn **Min/Max do Admin cấu hình** (voucher và gift card có giới hạn riêng) |

### 4.2. Quy Tắc Charity E-Voucher

| # | Quy tắc |
|---|---------|
| BR-V01 | Số tiền quyên góp phải lớn hơn 0 và trong giới hạn Min/Max cấu hình |
| BR-V02 | **Donor view:** mỗi giao dịch = 1 batch riêng biệt |
| BR-V03 | **Admin view:** nhiều donation cùng mục đích + cùng kỳ được gom vào 1 batch để phân bổ |
| BR-V04 | Admin tạo distribution record thủ công: chỉ định người nhận, số tiền, ngày |
| BR-V05 | Admin upload proof cho từng distribution |

### 4.3. Quy Tắc Charity E-Gift Card

| # | Quy tắc |
|---|---------|
| BR-C01 | Giá trị card phải lớn hơn 0 và trong giới hạn Min/Max cấu hình |
| BR-C02 | Số lượng card tối thiểu là 1 |
| BR-C03 | Khi mua nhiều card cùng lúc: tất cả cùng giá trị, cùng mục đích, gửi cùng một recipient email |
| BR-C04 | Nếu bật "Gửi trực tiếp cho Recipient" thì email là **bắt buộc** và phải hợp lệ |
| BR-C05 | Gift card **không có ngày hết hạn** |
| BR-C06 | Gift card hỗ trợ **partial redemption** — số dư được cập nhật sau mỗi lần dùng |
| BR-C07 | Card chuyển sang `Redeemed` khi số dư về 0 |
| BR-C08 | Tính năng Gift via QR chỉ khả dụng khi card còn `Available` (còn số dư) |
| BR-C09 | Donor có thể gửi lại email cho Recipient — form tự điền email cũ, Donor có thể chỉnh sửa |
| BR-C10 | Trang xem card của Recipient (qua link email) **không yêu cầu đăng nhập** |

### 4.4. Quy Tắc Merchant

| # | Quy tắc |
|---|---------|
| BR-M01 | Merchant phải **đăng ký và được Admin approve** mới có thể xử lý redemption |
| BR-M02 | Merchant nhập số tiền thực tế đã cung cấp — không được vượt quá số dư card |
| BR-M03 | Merchant phải **submit proof hóa đơn** (hình chụp) kèm theo redemption |
| BR-M04 | Khi Admin reject proof: Merchant nhận thông báo kèm lý do và được **submit lại proof mới** |
| BR-M05 | Khi Admin approve proof: hệ thống tự động **chuyển tiền vào ví VLinkPay của Merchant** |

---

## 5. Trạng Thái (Status)

### 5.1. Trạng Thái Gift Card

```
[Available] ──(partial redemption)──► [Available] (số dư giảm)
[Available] ──(full redemption)──────► [Redeemed]
[Available] ──(Donor gửi email)──────► [Gifted]
[Gifted]    ──(partial redemption)──► [Gifted] (số dư giảm)
[Gifted]    ──(full redemption)──────► [Redeemed]
```

| Status | Ý nghĩa |
|--------|---------|
| `Available` | Card còn số dư, chưa được gửi cho ai hoặc đã gửi nhưng chưa redeem hết |
| `Gifted` | Card đã được gửi cho Recipient qua email |
| `Redeemed` | Card đã được sử dụng hết (số dư = 0) |

### 5.2. Trạng Thái Batch (Voucher — Admin View)

| Status | Ý nghĩa |
|--------|---------|
| `In Distribution` | Batch đang trong quá trình phân bổ |
| `Distributed` | Đã phân bổ một phần |
| `Completed` | Đã phân bổ toàn bộ |

### 5.3. Trạng Thái Distribution Record

| Status | Ý nghĩa |
|--------|---------|
| `Pending` | Chưa giải ngân |
| `Completed` | Đã giải ngân, có proof |

### 5.4. Trạng Thái Merchant Proof

| Status | Ý nghĩa |
|--------|---------|
| `Pending` | Đang chờ Admin review |
| `Approved` | Đã duyệt, tiền đã chuyển vào ví Merchant |
| `Rejected` | Bị từ chối, Merchant có thể submit lại |

---

## 6. Cấu Hình (Admin-Configurable)

| Tham số | Phạm vi | Mô tả |
|---------|---------|-------|
| `platform_fee_percent` | Toàn hệ thống | % phí nền tảng trên mỗi giao dịch |
| `voucher_min_amount` | Voucher | Số tiền quyên góp tối thiểu |
| `voucher_max_amount` | Voucher | Số tiền quyên góp tối đa |
| `giftcard_min_value` | Gift Card | Giá trị card tối thiểu |
| `giftcard_max_value` | Gift Card | Giá trị card tối đa |
| `purposes` | Toàn hệ thống | Danh mục mục đích: thêm, sửa tên, ẩn/hiện, sắp xếp |

---

## 7. Danh Mục Mục Đích Quyên Góp

Mặc định có 6 mục đích (Admin có thể thêm/sửa/ẩn/sắp xếp):

| # | Mã | Tên hiển thị |
|---|-----|-------------|
| 1 | `food_support` | Food Support |
| 2 | `children_education` | Children Education |
| 3 | `healthcare` | Healthcare & Medicine |
| 4 | `elderly_care` | Elderly Care |
| 5 | `disaster_relief` | Disaster Relief |
| 6 | `scholarship` | Scholarship Programs |

---

## 8. Phương Thức Thanh Toán và Tiền Tệ

### 8.1. Currency mệnh giá (denomination)

| Loại | Currency hỗ trợ |
|------|----------------|
| Voucher | USD, VND |
| Gift Card | USD, VND |

### 8.2. Phương thức thanh toán

| Phương thức | Ký hiệu |
|-------------|---------|
| USDV | USDV |
| USDT | USDT |
| USD | USD |
| Bitcoin | BTC |
| Việt Nam Đồng | VND |

### 8.3. Quy tắc quy đổi

- Nếu currency thanh toán ≠ currency mệnh giá → hệ thống quy đổi theo **tỷ giá thực tế tại thời điểm giao dịch**
- Số tiền sau quy đổi được hiển thị rõ ràng trước khi Donor xác nhận
- Phí nền tảng tính trên số tiền **sau quy đổi**

---

## 9. Sự Kiện Thông Báo (Notifications)

| # | Sự kiện | Người gửi | Người nhận |
|---|---------|-----------|-----------|
| N-01 | Donor thanh toán thành công | Hệ thống | Donor |
| N-02 | Gift card có email Recipient | Hệ thống | Recipient (email với link + QR + code) |
| N-03 | Admin phân bổ batch hoàn tất | Hệ thống | Donor |
| N-04 | Merchant submit proof redemption | Hệ thống | Admin |
| N-05 | Admin approve proof Merchant | Hệ thống | Merchant |
| N-06 | Admin reject proof Merchant | Hệ thống | Merchant (kèm lý do từ chối) |

---

## 10. Màn Hình và Chức Năng

### 10.1. Donor — Màn Hình Chính (4 Tab)

| Tab | Màn hình | Chức năng |
|-----|---------|-----------|
| Buy Gift Charity | Màn hình mua | Chọn loại, nhập thông tin, xác nhận thanh toán |
| Charity E-Voucher | Danh sách batch | Xem batch, lọc theo status, vào xem chi tiết |
| Charity E-Gift Card | Danh sách card | Xem card theo status (Available/Gifted/Redeemed), vào chi tiết |
| Transaction History | Lịch sử giao dịch | Xem tất cả giao dịch, lọc theo loại, vào xem chi tiết |

### 10.2. Màn Hình Mua (3 Bước)

| Bước | Nội dung |
|------|---------|
| Bước 1 | Chọn loại: Charity E-Voucher hoặc Charity E-Gift Card |
| Bước 2 | Nhập thông tin: mục đích, giá trị/số tiền, currency, (nếu gift card: số lượng, email recipient) |
| Bước 3 | Chọn payment method, xem invoice summary (giá trị + phí nền tảng + tổng), xác nhận |

### 10.3. Batch Details — Donor (3 Sub-tab)

| Sub-tab | Nội dung |
|---------|---------|
| Overview | Metadata batch, tổng số tiền, thanh tiến độ phân bổ |
| Distributed | Danh sách distribution record, mỗi record có thể xem proof |
| Tax Receipt | *(Chưa xác định — bổ sung sau)* |

### 10.4. Card Detail — Donor

| Thông tin | Điều kiện hiển thị |
|-----------|-------------------|
| Status, mục đích, mã card, giá trị, số dư, ngày tạo | Luôn hiển thị |
| Thông tin Recipient (tên, email) | Khi status là Gifted hoặc Redeemed |
| Lịch sử redemption (Merchant, ngày, số tiền đã dùng) | Khi có partial/full redemption |
| Nút "Gift via QR" | Khi status là Available |
| Nút "Resend Email" | Khi card đã có email Recipient |

### 10.5. Gift via QR

| Cách | Mô tả |
|------|-------|
| Trực tiếp | Donor mở QR trên app, Recipient quét ngay |
| Gián tiếp | Donor download QR image và gửi qua bất kỳ kênh nào (Zalo, WhatsApp, v.v.) |

### 10.6. Recipient — Trang Xem Card (Không Cần Đăng Nhập)

| Thông tin | Mô tả |
|-----------|-------|
| Thông tin card | Mục đích, mệnh giá, số dư hiện tại, mã code |
| QR code | Để sử dụng tại Merchant |
| Check balance | Nhập code → xem số dư (cũng có tại vlinkpay.com/check-balance) |

### 10.7. Merchant Portal

| Chức năng | Mô tả |
|-----------|-------|
| Đăng ký tài khoản | Merchant tự đăng ký, chờ Admin approve |
| Xử lý redemption | Quét QR hoặc nhập code, xem thông tin card và số dư |
| Nhập số tiền thực tế | Số tiền đã cung cấp cho Recipient (≤ số dư card) |
| Submit proof | Upload hình chụp hóa đơn |
| Xem lịch sử | Danh sách redemption và trạng thái giải ngân |

### 10.8. Admin Portal

| Chức năng | Mô tả |
|-----------|-------|
| Quản lý Merchant | Duyệt đăng ký, vô hiệu hóa |
| Review proof redemption | Xem proof, approve/reject kèm lý do |
| Quản lý batch voucher | Gom donation theo mục đích + kỳ, tạo distribution record, upload proof |
| Cấu hình tham số | Platform fee, Min/Max amount (voucher & gift card riêng) |
| Quản lý mục đích | Thêm/sửa/ẩn/sắp xếp danh mục purpose |

---

## 11. Những Phần Chưa Xác Định (Cần Bổ Sung)

| # | Hạng mục | Ghi chú |
|---|---------|---------|
| TBD-01 | **Tax Receipt** | Toàn bộ business logic: thời điểm phát hành, ai phát hành, định dạng, kênh gửi |
| TBD-02 | **Tỷ giá thực tế** | Nguồn cấp tỷ giá (oracle, feed), tần suất cập nhật, cơ chế lock rate |
| TBD-03 | **Giới hạn submit lại proof** | Merchant có bị giới hạn số lần resubmit không? |
| TBD-04 | **Thời hạn Admin review** | SLA cho Admin review proof Merchant |
| TBD-05 | **Report/Analytics** | Admin cần báo cáo gì? (tổng quyên góp theo kỳ, redemption rate, v.v.) |

---

*Bản đặc tả này được xây dựng từ: `charity-gift-business.md` + phân tích UI prototype tại `https://merchant-portal-html.vercel.app/charity/charity-gift.html` + Q&A với Product Owner (2026-05-19).*
