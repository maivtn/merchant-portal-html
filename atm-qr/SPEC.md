# Merchant Mobile ATM — Feature Specification

> Module: `atm-qr/`  
> Phiên bản: 1.0  
> Ngày: 2026-05-20

---

## 1. Tổng quan tính năng

Module **Merchant Mobile ATM** cung cấp luồng giao dịch P2P tiền mã hoá giữa khách hàng và đối tác ATM (Merchant ATM hoặc Mobile ATM) thông qua mã QR.

### 1.1 Hai loại ATM đối tác

| Loại | ID mẫu | Đặc điểm |
|---|---|---|
| **Merchant ATM** | `MAT-4K9P2X` | Địa điểm cố định, có giờ hoạt động |
| **Mobile ATM** | `MOB-8H2Q7N` | Di chuyển, yêu cầu xác nhận địa điểm gặp |

### 1.2 Mục đích QR

QR chỉ dùng để **xác định đúng đối tác ATM**. Sau khi quét, khách hàng vẫn đi qua đầy đủ các bước chọn giao dịch, nhập số tiền, xác nhận phí.

---

## 2. Kiến trúc module

```
atm-qr/
├── merchant-atm-qr.html              # Hiển thị mã QR (phía ATM)
├── merchant-atm-info.html            # Thông tin ATM sau khi quét
├── merchant-atm-order.html           # Tạo lệnh giao dịch
├── merchant-atm-mobile-location.html # Xác nhận địa điểm (Mobile ATM only)
├── merchant-atm-review.html          # Xem lại & xác nhận giao dịch
├── merchant-atm-request-details.html # Chờ ATM chấp nhận
├── merchant-atm-accepted.html        # Giao dịch được chấp nhận
├── merchant-atm-settlement-history.html  # Lịch sử thanh toán
├── merchant-atm-settlement-detail.html   # Chi tiết một giao dịch thanh toán
├── merchant-atm-receive-terms.html   # Điều khoản (Tiếng Việt)
├── receive_pay_terms_en.html         # Điều khoản (Tiếng Anh)
├── merchant-atm-setting.html         # Trang cài đặt ATM (phía ATM partner)
├── merchant-atm-common.js            # Logic dùng chung toàn module
├── merchant-atm-common.css           # Style dùng chung toàn module
├── merchant-atm-setting.js           # Logic trang cài đặt
├── images/                           # Icon tiền mã hoá & phương thức
├── icons/                            # Logo phương thức thanh toán
└── AC/                               # Tài liệu Acceptance Criteria
```

**Dependencies shared:**
- `../global.css` — design token toàn portal
- `../global.js` — sidebar & layout chung
- Tailwind CSS (CDN)
- QRCode.js (CDN)
- Lucide Icons (CDN)

---

## 3. Luồng điều hướng

### 3.1 Merchant ATM

```
[1] merchant-atm-qr.html
        ↓ khách quét QR
[2] merchant-atm-info.html
        ↓ nhấn Mua / Bán
[3] merchant-atm-order.html
        ↓ nhập thông tin → xác nhận điều khoản
[4] merchant-atm-review.html
        ↓ xác nhận
[5] merchant-atm-request-details.html   (đếm ngược 5:00)
        ↓ ATM chấp nhận (auto-redirect ~10s demo)
[6] merchant-atm-accepted.html
        ↓ Show QR / More Actions
```

### 3.2 Mobile ATM

```
[1] merchant-atm-qr.html
        ↓ khách quét QR
[2] merchant-atm-info.html
        ↓ nhấn Mua / Bán
[3] merchant-atm-order.html
        ↓ nhập thông tin → xác nhận điều khoản
[4] merchant-atm-mobile-location.html   ← BỔ SUNG cho Mobile ATM
        ↓ nhập địa điểm & số điện thoại
[5] merchant-atm-review.html
        ↓ xác nhận
[6] merchant-atm-request-details.html
        ↓ ATM chấp nhận
[7] merchant-atm-accepted.html
```

### 3.3 URL Parameters truyền qua các bước

| Param | Giá trị | Mô tả |
|---|---|---|
| `atmType` | `merchant` \| `mobile` | Loại ATM |
| `type` | `buy` \| `sell` | Loại giao dịch |
| `unit` | `USD` | Đơn vị nhập tiền |
| `asset` | `USDV`, `USDT`, `USDC`, `VMM`, `DOGE`, `ETH` | Loại tài sản |

---

## 4. Chi tiết từng màn hình

### 4.1 QR Display — `merchant-atm-qr.html`

**Mục đích:** Phía ATM hiển thị QR để khách quét.

**Nội dung:**
- Header gradient cam với icon ATM
- Thẻ thông tin ATM (tên, ID, trạng thái Online, phí, địa điểm)
- Vùng QR code:
  - Viền góc màu cam (branding)
  - Logo VLINKPAY chồng lên giữa
  - QR encode URL đến `merchant-atm-info.html?atmType=<merchant|mobile>`
- Dòng CTA: _"Quét để giao dịch trực tiếp với Merchant / Mobile ATM"_

**Điều kiện hiển thị theo loại:**
- Merchant ATM: hiện giờ hoạt động
- Mobile ATM: ẩn giờ hoạt động

---

### 4.2 ATM Information — `merchant-atm-info.html`

**Mục đích:** Hiển thị hồ sơ đối tác sau khi quét QR.

**Nội dung:**
- Header: nút Back + nhãn "Connected from QR"
- Hero: avatar ATM + tên + đánh giá 5.0 sao + khoảng cách (0.6 km)
- Thẻ thông tin:
  - Merchant ID / Trạng thái
  - Địa điểm
  - Giờ hoạt động _(ẩn với Mobile ATM)_
  - Mức phí giao dịch
- Lưới phương thức hỗ trợ (7 phương thức)
- Ghi chú thông tin (callout xanh)
- Nút hành động: **Mua Crypto** (primary) / **Bán Crypto** (secondary)

---

### 4.3 Order Creation — `merchant-atm-order.html`

**Mục đích:** Khách chọn loại giao dịch, tài sản, số tiền, phương thức.

**Nội dung:**
- Toggle Buy / Sell
- Dropdown chọn tài sản (7 options):
  `USD, USDV, USDT, USDC, VMM, DOGE, ETH`
- Hiển thị số dư khả dụng _(chỉ khi chọn Sell)_
- Ô nhập số tiền với đơn vị `USD`
- Giới hạn: `$100 – $10,000`
- Dropdown phương thức thanh toán (7 options):
  `Cash, Bank Transfer, Zelle, Venmo, PayPal, Cash App, Apple Cash`
- Nút Tiếp tục → mở modal điều khoản

**Modal Điều khoản:**
- Tiêu đề: _"Biểu phí & điều kiện giao dịch"_
- 4 điều khoản dạng bullet
- Checkbox: _"Tôi đã đọc và đồng ý"_
- Nút Huỷ / Tiếp tục

---

### 4.4 Mobile Location — `merchant-atm-mobile-location.html`

**Mục đích:** Xác nhận địa điểm gặp (bắt buộc với Mobile ATM).

**Nội dung:**
- Header: "Confirm meeting location"
- Ô tìm kiếm địa điểm (hiển thị vị trí hiện tại)
- Nút "Use my current location"
- Bản đồ tĩnh
- Trường số điện thoại (country code + số)
- Textarea ghi chú cho Mobile ATM (tối đa 100 ký tự + bộ đếm)
- Nút OK

**Lý do bắt buộc:** Mobile ATM cần biết khoảng cách và địa điểm hẹn để quyết định có nhận đơn hay không.

---

### 4.5 Review — `merchant-atm-review.html`

**Mục đích:** Xem lại thông tin trước khi xác nhận.

**Nội dung:**
- Thẻ tóm tắt:
  - Loại dịch vụ (vd: _"Buy USDV with Cash"_)
  - Số tiền
  - Số lượng tài sản + tỷ giá
  - Tên ATM & Merchant ID
  - Khoảng cách
- Tùy chọn Bảo hiểm giao dịch (1% phí thêm)
- Bảng phí:

  | Khoản | Phí |
  |---|---|
  | System Fee | 1% |
  | Service Fee | 5% |
  | Insurance _(tùy chọn)_ | 1% |
  | **Tổng cộng** | **$106** _(không bảo hiểm)_ |

- Nút Huỷ / Xác nhận

---

### 4.6 Request Details — `merchant-atm-request-details.html`

**Mục đích:** Trạng thái chờ ATM chấp nhận.

**Nội dung:**
- Badge: "Buyer - Individual"
- Thông báo chờ + đồng hồ đếm ngược **5:00**
- Tiêu đề yêu cầu + trạng thái **Pending**
- Thẻ thông tin người bán (Member ID, đánh giá 4.3 sao)
- Mã giao dịch + thời gian
- Bảng phân tích số tiền
- Nút Huỷ
- Thông báo bảo hiểm (callout xanh)

**Hành vi tự động:**
- Đếm ngược từ 5:00 bằng `requestAnimationFrame`
- Demo: tự chuyển sang trang `accepted` sau ~10 giây

---

### 4.7 Accepted — `merchant-atm-accepted.html`

**Mục đích:** Thông báo giao dịch được ATM chấp nhận.

**Nội dung:**
- Badge trạng thái: **Accepted**
- Thẻ thông tin người bán
- Mã giao dịch + nút sao chép
- Bảng phí (nền trắng)
- Phần mở rộng "View More Details":
  - Buyer Pays / Seller Receives / Buyer Receives
  - Insurance Fee breakdown
- Nút hành động:
  - **Cancel** (đỏ)
  - **Show QR** (primary) → mở modal QR
  - **More Actions** (dropdown)

**More Actions menu:**
| Tuỳ chọn | Hành động |
|---|---|
| View Map | Xem bản đồ |
| Chat | Nhắn tin |
| Call | Gọi điện |
| SOS | Khẩn cấp |

**Modal Show QR:**
- QR lớn để xuất trình cho Mobile ATM
- Hướng dẫn hiển thị cho ATM quét
- Ghi chú xác minh OTP

---

### 4.8 Settlement History — `merchant-atm-settlement-history.html`

**Mục đích:** Xem lịch sử thanh toán & nhận tiền từ VLINKPAY.

**Nội dung:**
- Bộ lọc (cuộn ngang):
  - All / Pay to VLINKPAY / VLINKPAY Payout
- Thanh tóm tắt:
  - Tổng đã trả (cam)
  - Tổng đã nhận (xanh)
  - Số lượng giao dịch
- Danh sách giao dịch (nhóm theo tháng):
  - Icon loại (lên/xuống)
  - Nhãn loại + ngày
  - Mã giao dịch
  - Số tiền (âm/dương)
  - Badge trạng thái

**Các trạng thái:** `Completed` · `Review` · `Processing` · `Rejected` · `Pending`

---

### 4.9 Settlement Detail — `merchant-atm-settlement-detail.html`

**Mục đích:** Chi tiết một giao dịch thanh toán.

**Nội dung:**
- Thẻ hero: icon trạng thái + loại + số tiền lớn
- Thông tin giao dịch (ID, ngày, loại, phương thức)
- Chi tiết thanh toán (số tiền, phí, tài khoản, ghi chú)
- Bằng chứng thanh toán:
  - Lưới ảnh 3 cột
  - Mỗi ảnh có tên + link Xem + lightbox
  - Nút "Upload More Proof" _(khi đang review)_
- Timeline tiến trình _(chỉ cho Pay to VLINKPAY)_:
  - Submitted → Waiting Review → Completed
- Hành động:
  - "Submit Updated Proof" _(khi waiting review)_
  - "Download Receipt" _(khi completed)_

---

## 5. Dữ liệu & logic dùng chung

### 5.1 Hồ sơ ATM (`merchant-atm-common.js`)

```js
// Merchant ATM
{
  qrLabel:      "QR Merchant ATM",
  name:         "VLINKPAY MERCHANT ATM 01",
  id:           "MAT-4K9P2X",
  status:       "Online",
  feeRate:      "1%-5%",
  location:     "Quận 1, TP. Hồ Chí Minh",
  hoursSummary: "Thứ 2 – Thứ 6: 9:00 AM – 7:00 PM; Thứ 7: 10:00 AM – 4:00 PM"
}

// Mobile ATM
{
  qrLabel:  "QR Mobile ATM",
  name:     "VLINKPAY MOBILE ATM 01",
  id:       "MOB-8H2Q7N",
  status:   "Online",
  feeRate:  "1%-5%",
  location: "Quận 3, TP. Hồ Chí Minh"
  // hours: ẩn
}
```

### 5.2 Cấu trúc phí

| Loại phí | Tỷ lệ | Ghi chú |
|---|---|---|
| System Fee | 1% | Luôn áp dụng |
| Service Fee | 5% | Của Merchant ATM |
| Insurance Fee | 1% | Tùy chọn của khách |

Công thức tổng:
- Không bảo hiểm: `amount × 1.06`
- Có bảo hiểm: `amount × 1.07`

### 5.3 Tài sản hỗ trợ & số dư mẫu (Sell mode)

| Tài sản | Số lượng | Giá trị USD |
|---|---|---|
| USD | 50,000.00 | $50,000 |
| USDV | 29,399.68 | $29,399.68 |
| USDT | 18,240.22 | $18,240.22 |
| USDC | 12,980.10 | $12,980.10 |
| VMM | 8,450.00 | ~$3,018 |
| DOGE | 72,300.00 | ~$5,804 |
| ETH | 14.25 | ~$43,400 |

### 5.4 Phương thức thanh toán hỗ trợ

Cash · Bank Transfer · Zelle · PayPal · Venmo · Cash App · Apple Cash

---

## 6. Hành vi tương tác

### 6.1 Dropdown tuỳ chỉnh (`initImageSelect`)

- Toggle hiển thị/ẩn menu
- Hỗ trợ bàn phím: `Escape` để đóng
- Click ngoài để đóng
- Trạng thái active với gradient background
- Dùng cho: chọn tài sản, chọn đơn vị, chọn phương thức

### 6.2 Đồng hồ đếm ngược (Request Details)

- Thời gian: 5:00 (MM:SS)
- Dùng `requestAnimationFrame` để mượt
- Demo: tự redirect sau ~10 giây

### 6.3 Bộ đếm ký tự (Mobile Location)

- Max 100 ký tự
- Hiển thị: `0/100` → cập nhật real-time

### 6.4 Insurance Toggle (Review)

- Checkbox bật/tắt phí bảo hiểm
- Tổng tiền cập nhật ngay lập tức

### 6.5 More Actions Menu (Accepted)

- Popup menu với 4 tuỳ chọn
- Click ngoài để đóng
- Icon mũi tên xoay khi mở

### 6.6 Proof Upload (Settlement Detail)

- Hỗ trợ chọn file hoặc camera
- Lưu vào `localStorage`
- Lightbox xem ảnh

---

## 7. Design System (module-level)

### 7.1 Màu sắc

| Token | Giá trị | Sử dụng |
|---|---|---|
| Brand Primary | `#d97706` | Nút, viền, gradient |
| Brand Deep | `#b45309` | Hover, pressed |
| Brand Soft | `#fef3c7` | Nền nhạt, callout |
| Online Green | `#22c55e` | Status dot, badge Online |
| Text Ink | `#221f1f` | Tiêu đề chính |
| Text Dark | `#1f2937` | Body |
| Text Secondary | `#6f7684` | Label phụ |
| Text Muted | `#94a3b8` | Placeholder |

### 7.2 Layout

- **Screen shell:** max-width 392px, căn giữa (phone frame)
- **Sidebar:** 280px, cuộn dọc, collapse trên mobile (từ `global.js`)

### 7.3 Component chính

| Component | Mô tả |
|---|---|
| `.screen-shell` | Khung màn hình điện thoại |
| `.phone-frame` | Viền bo tròn thiết bị |
| ATM Detail Card | Thẻ thông tin ATM, compact variant |
| Status Pill | Badge Online với dot xanh |
| QR Shell | Vùng QR với góc cam branding |
| Primary Button | Gradient cam `f59e0b → d97706` |
| Secondary Button | Nền trắng + viền cam |
| Modal Overlay | Backdrop blur `rgba(15,23,42,0.42)` |
| Method Select | Dropdown icon + label |
| Review Frame | Nền trong suốt trên gradient |

### 7.4 Typography

- Font: **Inter**, sans-serif
- Scale: 10px–24px qua CSS variables
- Weight: 400–900

---

## 8. Accessibility

- `aria-label` trên các phần tử tương tác
- `aria-expanded` / `aria-pressed` trên toggles
- `aria-selected` trên dropdown options
- `role="listbox"` / `role="option"` cho custom dropdowns
- `aria-haspopup` trên menu triggers
- Heading hierarchy đúng thứ tự
- `<button>` cho tất cả interactive elements
- `<label>` liên kết với form fields

---

## 9. External Dependencies

| Thư viện | Nguồn | Mục đích |
|---|---|---|
| Tailwind CSS | CDN | Utility classes |
| QRCode.js | CDN | Sinh mã QR |
| Lucide Icons | CDN | Icon SVG |
| Bootstrap 5.3.3 | CDN | Layout trang điều khoản |
| Bootstrap Icons | CDN | Icon trang điều khoản |
| SweetAlert2 | CDN | Hộp thoại xác nhận |
| Tippy.js | CDN | Tooltip |
| Google Fonts | CDN | Font Inter |

---

## 10. Trang cài đặt ATM — `merchant-atm-setting.html`

Đây là trang phức tạp nhất trong module (`merchant-atm-setting.js` ~99 KB).

**Chức năng chính (theo cấu trúc file):**
- Cài đặt hồ sơ Merchant ATM / Mobile ATM
- Quản lý phí, giờ hoạt động, phạm vi phục vụ
- Cài đặt phương thức thanh toán chấp nhận
- Quản lý tài sản & giới hạn giao dịch
- Cài đặt bảo hiểm & điều khoản

_(Chi tiết đầy đủ của trang Setting cần tài liệu riêng do phạm vi rộng.)_

---

## 11. Giới hạn & ghi chú kỹ thuật

- **Không có backend:** Toàn bộ là static HTML/JS, dữ liệu là mock hardcode
- **State qua URL params:** Không dùng session storage hay context, truyền trạng thái qua query string
- **Demo redirect:** `merchant-atm-request-details.html` tự redirect sau ~10s (behavior mô phỏng)
- **Proof persistence:** Dùng `localStorage` để giữ ảnh bằng chứng trong session
- **No API calls:** Không có fetch/XHR thực sự trong module này
- **Mobile-first:** Toàn bộ thiết kế dùng khung 392px, không responsive desktop
