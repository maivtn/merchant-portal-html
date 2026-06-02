# ATM P2P — Mockup màn hình Chi tiết Yêu cầu (member-request-details)

> **Scope:** Toàn bộ trạng thái × vai trò cho component `MemberRequestDetailsComponent`
>
> **Vai trò:**
> - **MAKER / Cá nhân** — người đặt lệnh (`customerId === profileId`)
> - **TAKER / Mobile ATM** — người nhận lệnh (`atmCustomerId === profileId`)
>
> **Loại giao dịch dùng làm ví dụ:** Mua USDV (Buy) → MAKER = Buyer, TAKER = Seller
>
> **Ký hiệu:** `[BTN]` = nút bấm · `[+]` = expand/collapse · `⏱` = đồng hồ đếm ngược

---

## Bảng tổng hợp trạng thái & hành động

| Status | Badge (VI) | MAKER thấy | TAKER thấy |
|---|---|---|---|
| Pending | Đang xử lý | Banner chờ ATM chấp nhận + countdown | Banner yêu cầu mới + Từ chối / Chấp nhận |
| Accepted – Cash (trước OTP) | Đang xử lý | Xem mã QR | Quét QR + Hành động |
| Accepted – Cash (sau OTP, chưa timeout) | Đang xử lý | Đang chờ xác nhận + countdown | Xác nhận nhận tiền |
| Accepted – Cash (sau OTP, timeout = Buyer dispute) | Đang xử lý | Đã thanh toán (dispute) | Xác nhận |
| Accepted – Online (SubStatus None) | Đang xử lý | Thông tin tài khoản nhận + Tải biên lai | Chờ buyer thanh toán |
| Accepted – Online (Receipt Uploaded) | Đang xử lý | Đang chờ người bán xác nhận | Đã nhận tiền |
| Accepted – Online (Timeout + Receipt) | Đang xử lý | Đã thanh toán (dispute) | Đã nhận tiền |
| Completed | Hoàn tất | Chi tiết giao dịch + Đánh giá | Chi tiết giao dịch + Đánh giá |
| Declined | Đã bị từ chối | (chỉ xem) | — |
| Cancelled | Đã huỷ | (chỉ xem, lý do huỷ) | (chỉ xem, lý do huỷ) |
| Dispute – Initiator (Buyer) | Đang khiếu nại | Thêm bằng chứng + Hủy khiếu nại | Giải trình |
| Dispute – Responder (Seller) | Đang khiếu nại | Xác nhận | Xem bằng chứng + Giải trình |
| CancelWithHolding + canDispute | Hủy | Đã thanh toán (dispute) | — |
| Expired | Hết hạn | (chỉ xem) | — |

---

## 1. PENDING — Đang xử lý (Chờ xử lý)

### 1A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ℹ️  Yêu cầu của bạn đã được gửi tới ATM.                      │
│      Vui lòng chờ sự chấp nhận giao dịch từ phía ATM.          │
│                                                                 │
│  ⏱ Thời gian chờ còn lại:  14:32                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Mua USDV bằng tiền mặt              [Badge: Đang xử lý]       │
├─────────────────────────────────────────────────────────────────┤
│  📱 [icon mobile]  Mã thành viên  (Người bán)                   │
│                    ATM_MobileUser                ⭐ 4.8 (120)   │
├─────────────────────────────────────────────────────────────────┤
│  📍 Địa điểm gặp                                                │
│     123 Nguyễn Huệ, Q.1, TP.HCM                                │
│  📝 Ghi chú: (ghi chú của ATM)                                  │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền                                          $100.00       │
│  Phí hệ thống (1%)                                  $1.00       │
│  Phí dịch vụ  (0.5%)                               $0.50       │
│  Tổng                                    $101.50 [text-primary] │
├─────────────────────────────────────────────────────────────────┤
│              [+] Xem chi tiết giao dịch                         │
├─────────────────────────────────────────────────────────────────┤
│                   [BTN: Hủy yêu cầu]                           │
└─────────────────────────────────────────────────────────────────┘
```

### 1B. Góc nhìn TAKER (Mobile ATM — Seller)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🔔 Bạn vừa nhận được một yêu cầu mới.                         │
│     Vui lòng nhấn "Chấp nhận" để tiếp tục giao dịch.           │
│                                                                 │
│  ⏱ Thời gian phản hồi còn lại:  04:59                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Bán USDV lấy tiền mặt               [Badge: Đang xử lý]       │
├─────────────────────────────────────────────────────────────────┤
│  👤 [icon member]  Mã thành viên  (Người mua)                   │
│                    NguyenVanA                    ⭐ 4.5 (56)    │
├─────────────────────────────────────────────────────────────────┤
│  📍 Địa điểm gặp                                                │
│     123 Nguyễn Huệ, Q.1, TP.HCM                                │
│     Khoảng 1.2 km (5 phút)                                      │
│  📝 Ghi chú: (ghi chú của thành viên)                           │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền                                          $100.00       │
│  Phí hệ thống (1%)                                  $1.00       │
│  Phí dịch vụ  (0.5%)                               $0.50       │
│  Tổng                                    $101.50 [text-primary] │
├─────────────────────────────────────────────────────────────────┤
│              [+] Xem chi tiết giao dịch                         │
├─────────────────────────────────────────────────────────────────┤
│    [BTN: Từ chối]          [BTN: Chấp nhận]                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. ACCEPTED — Cash — Trước OTP (Chưa quét QR)

> Cả hai bên đi đến địa điểm gặp, MAKER hiện QR, TAKER quét QR.

### 2A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│  Mua USDV bằng tiền mặt              [Badge: Đang xử lý]       │
├─────────────────────────────────────────────────────────────────┤
│  📱 [icon mobile]  Mã thành viên  (Người bán)                   │
│                    ATM_MobileUser                ⭐ 4.8 (120)   │
│                    [SubStatus: 🚙 Đang đi]                      │
├─────────────────────────────────────────────────────────────────┤
│  📍 123 Nguyễn Huệ, Q.1, TP.HCM                                │
│     [link: 🗺 Xem bản đồ]                                       │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền                                          $100.00       │
│  Phí hệ thống (1%)                                  $1.00       │
│  Phí dịch vụ  (0.5%)                               $0.50       │
│  Tổng                                    $101.50 [text-primary] │
├─────────────────────────────────────────────────────────────────┤
│              [+] Xem chi tiết giao dịch                         │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy yêu cầu]     [BTN: 📷 Xem mã QR]  [BTN: Hành động] │
│                                                                 │
│  ▾ Hành động (dropdown):                                        │
│    🚙 Tôi đang trên đường — Thông báo bạn đang đến              │
│    ⏳ Chờ một chút — Yêu cầu chờ trong giây lát                  │
│    🗺 Xem bản đồ — Theo dõi vị trí gặp mặt trên bản đồ          │
│    💬 Trò chuyện — Gửi tin nhắn cho đối tác                      │
│    📞 Gọi điện — Thực hiện cuộc gọi với đối tác                  │
│    🆘 SOS — Gọi nhanh số khẩn cấp                               │
└─────────────────────────────────────────────────────────────────┘
```

### 2B. Góc nhìn TAKER (Mobile ATM — Seller)

```
┌─────────────────────────────────────────────────────────────────┐
│  Bán USDV lấy tiền mặt               [Badge: Đang xử lý]       │
├─────────────────────────────────────────────────────────────────┤
│  👤 [icon member]  Mã thành viên  (Người mua)                   │
│                    NguyenVanA                    ⭐ 4.5 (56)    │
├─────────────────────────────────────────────────────────────────┤
│  📍 123 Nguyễn Huệ, Q.1, TP.HCM                                │
│     [link: 🗺 Xem chỉ đường]                                    │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền                                          $100.00       │
│  Phí hệ thống (1%)                                  $1.00       │
│  Phí dịch vụ  (0.5%)                               $0.50       │
│  Tổng                                    $101.50 [text-primary] │
├─────────────────────────────────────────────────────────────────┤
│              [+] Xem chi tiết giao dịch                         │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy]  [BTN: 📷 Quét QR]  [BTN: Hành động]              │
│                                                                 │
│  ▾ Hành động (dropdown):                                        │
│    🚙 Tôi đang trên đường                                        │
│    ⏳ Chờ một chút                                               │
│    🗺 Xem chỉ đường                                              │
│    💬 Trò chuyện                                                 │
│    📞 Gọi điện                                                   │
│    🆘 SOS                                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. ACCEPTED — Cash — Sau OTP (Đã quét QR, chưa timeout)

> TAKER đã quét QR thành công → OTP verified. MAKER đang trả tiền mặt, TAKER đang đếm tiền.

### 3A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ✅ OTP đã được xác minh.                                       │
│  ⏳ Đang chờ ATM_MobileUser xác nhận đã nhận tiền mặt.          │
│                                                                 │
│  ⏱ Thời gian hoàn tất còn lại:  12:05                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Mua USDV bằng tiền mặt              [Badge: Đang xử lý]       │
├─────────────────────────────────────────────────────────────────┤
│  📱 [icon mobile]  Mã thành viên  (Người bán)                   │
│                    ATM_MobileUser                ⭐ 4.8 (120)   │
├─────────────────────────────────────────────────────────────────┤
│  📍 123 Nguyễn Huệ, Q.1, TP.HCM                                │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng (như trên)                                │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy yêu cầu]                   [BTN: Hành động]         │
└─────────────────────────────────────────────────────────────────┘
```

### 3B. Góc nhìn TAKER (Mobile ATM — Seller)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ✅ OTP đã được xác minh.                                       │
│  📋 Vui lòng xác nhận sau khi nhận đủ tiền mặt.                │
│                                                                 │
│  ⏱ Thời gian hoàn tất còn lại:  12:05                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Bán USDV lấy tiền mặt               [Badge: Đang xử lý]       │
├─────────────────────────────────────────────────────────────────┤
│  👤 [icon member]  Mã thành viên  (Người mua)                   │
│                    NguyenVanA                    ⭐ 4.5 (56)    │
├─────────────────────────────────────────────────────────────────┤
│  📍 123 Nguyễn Huệ, Q.1, TP.HCM                                │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng (như trên)                                │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy]                    [BTN: Confirm — Xác nhận]        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. ACCEPTED — Cash — Sau OTP + Timeout (Buyer có thể Dispute)

> Hết thời gian đếm ngược nhưng TAKER chưa xác nhận.

### 4A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ✅ OTP đã được xác minh.                                       │
│  ⚠️  Thời hạn giao dịch đã kết thúc.                            │
│                                                                 │
│  ⚠️  Bạn đã thanh toán nhưng chưa nhận được USDV?              │
│     Nhấn Đã thanh toán để yêu cầu hỗ trợ.                     │
│     Giao dịch sẽ được đội ngũ hỗ trợ xem xét.                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Mua USDV bằng tiền mặt              [Badge: Đang xử lý]       │
│  ... (thông tin giao dịch như trên) ...                         │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy yêu cầu]         [BTN-PRIMARY: Đã thanh toán]       │
└─────────────────────────────────────────────────────────────────┘
```

### 4B. Góc nhìn TAKER (Mobile ATM — Seller)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ✅ OTP đã được xác minh.                                       │
│  ⚠️  Thời hạn giao dịch đã kết thúc.                            │
│                                                                 │
│  Tuy nhiên, bạn vẫn chưa xác nhận đã nhận tiền mặt.           │
│  Nếu đã nhận đủ tiền, hãy nhấn Xác nhận.                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Bán USDV lấy tiền mặt               [Badge: Đang xử lý]       │
│  ... (thông tin giao dịch như trên) ...                         │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy]                    [BTN-PRIMARY: Xác nhận]          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. ACCEPTED — Online (SubStatus: None — Buyer chưa thanh toán)

> Giao dịch online (Zelle/Bank/PayPal/Venmo/Apple Cash/Cash App). Buyer cần chuyển tiền và tải biên lai.

### 5A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  📋 Thanh toán cho người bán qua Zelle.                         │
│     Nhập chính xác MEMO-CODE vào ghi chú khi chuyển khoản.     │
│     Sau khi hoàn tất, nhấn "Tải biên lai" để gửi bằng chứng.   │
│                                                                 │
│  ⏱ Thời gian còn lại:  28:45                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Mua USDV qua Zelle               [Badge: Đang xử lý]          │
├─────────────────────────────────────────────────────────────────┤
│  👤 [icon member]  Mã thành viên  (Người bán)                   │
│                    ATM_MobileUser                ⭐ 4.8 (120)   │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng (như trên)                                │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
├─────────────────────────────────────────────────────────────────┤
│  [+] Thông tin tài khoản Zelle  ← auto expand                  │
│  │  Email / Phone:  seller@example.com            [📋 copy]    │
│  │  Memo (bắt buộc): MEMO-CODE               [📋 copy] (red)  │
│  │  Lưu ý: ...                                                  │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy yêu cầu]         [BTN-PRIMARY: Tải biên lai]        │
│                               [BTN: Hành động ▾]               │
└─────────────────────────────────────────────────────────────────┘
```

### 5B. Góc nhìn TAKER (Mobile ATM — Seller)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ⏳ Đang chờ người mua hoàn tất thanh toán và tải lên biên lai. │
│     Sau khi người mua tải biên lai lên, vui lòng kiểm tra       │
│     và xác nhận đã nhận đủ tiền để hoàn tất giao dịch.          │
│                                                                 │
│  ⏱ Thời gian còn lại:  28:45                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Bán USDV qua Zelle               [Badge: Đang xử lý]          │
├─────────────────────────────────────────────────────────────────┤
│  👤 [icon member]  Mã thành viên  (Người mua)                   │
│                    NguyenVanA                    ⭐ 4.5 (56)    │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng (như trên)                                │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
├─────────────────────────────────────────────────────────────────┤
│  [+] Thông tin tài khoản Zelle  ← auto expand                  │
│  │  Email / Phone:  seller@example.com            [📋 copy]    │
│  │  Memo:  MEMO-CODE                              [📋 copy]    │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy]                           [BTN: Hành động ▾]       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. ACCEPTED — Online (SubStatus: UploadReceipt — Buyer đã tải biên lai)

> Buyer đã tải biên lai lên, chờ Seller xác nhận.

### 6A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ⏳ Đang chờ người bán xác nhận đã nhận đủ tiền.                │
│     Khi được xác nhận, giao dịch sẽ hoàn tất.                  │
│                                                                 │
│  ⏱ Thời gian còn lại:  15:20                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Mua USDV qua Zelle               [Badge: Đang xử lý]          │
│  ... (member box, tx info, amount) ...                          │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
│  [+] Thông tin tài khoản Zelle                                  │
│  [+] Bằng chứng thanh toán  (preview biên lai đã upload)        │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy yêu cầu (disabled)]       [BTN: Hành động ▾]       │
└─────────────────────────────────────────────────────────────────┘
```

> **Lưu ý:** Nút "Hủy yêu cầu" bị disabled sau khi Buyer đã upload biên lai.

### 6B. Góc nhìn TAKER (Mobile ATM — Seller)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  💳 Người mua đã xác nhận thanh toán.                           │
│     Nếu bạn đã nhận đủ số tiền, vui lòng nhấn                  │
│     "Đã nhận tiền" để hoàn tất giao dịch.                       │
│                                                                 │
│  ⏱ Thời gian còn lại:  15:20                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Bán USDV qua Zelle               [Badge: Đang xử lý]          │
│  ... (member box, tx info, amount) ...                          │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
│  [+] Thông tin tài khoản Zelle  ← auto expand                  │
│  [+] Bằng chứng thanh toán                                      │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy (disabled)]     [BTN-PRIMARY: Đã nhận tiền]         │
│                              [BTN: Hành động ▾]                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. ACCEPTED — Online + Timeout + Receipt Uploaded (Buyer Dispute)

### 7A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ⚠️  Bạn đã thanh toán nhưng chưa nhận được USDV?              │
│     Nhấn Đã thanh toán để yêu cầu hỗ trợ.                     │
│     Giao dịch sẽ được đội ngũ hỗ trợ xem xét.                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Mua USDV qua Zelle               [Badge: Đang xử lý]          │
│  ... (thông tin giao dịch) ...                                  │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy yêu cầu]         [BTN-PRIMARY: Đã thanh toán]       │
└─────────────────────────────────────────────────────────────────┘
```

### 7B. Góc nhìn TAKER (Mobile ATM — Seller)

```
┌─────────────────────────────────────────────────────────────────┐
│  Bán USDV qua Zelle               [Badge: Đang xử lý]          │
│  ... (thông tin giao dịch) ...                                  │
├─────────────────────────────────────────────────────────────────┤
│  [BTN: Hủy (disabled)]     [BTN-PRIMARY: Đã nhận tiền]         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. DISPUTE — Đang khiếu nại

> MAKER (Buyer) đã nhấn "Đã thanh toán". Dispute đang được xử lý.

### 8A. Góc nhìn Buyer (Dispute Initiator — người gửi khiếu nại)

> Điều kiện: `isDispute() && isDisputeInitiator() && isBuyer()`

```
┌─────────────────────────────────────────────────────────────────┐
│  Mua USDV bằng tiền mặt            [Badge: Đang khiếu nại]     │
├─────────────────────────────────────────────────────────────────┤
│  👤 member box ...                                               │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID / datetime ...                                  │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng ...                                       │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
│  [+] Bằng chứng khiếu nại  (preview files đã upload)           │
├─────────────────────────────────────────────────────────────────┤
│  [BTN-OUTLINE: Thêm bằng chứng]   [BTN-PRIMARY: Hủy khiếu nại] │
└─────────────────────────────────────────────────────────────────┘
```

> **Note:** "Thêm bằng chứng" disabled nếu `remainingQty <= 0`.

### 8B. Góc nhìn Seller (Dispute Responder — người nhận khiếu nại)

> Điều kiện: `isDispute() && isDisputeResponder() && isSeller()`

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ⚠️  Người mua đã gửi khiếu nại vì bạn chưa xác nhận đã nhận  │
│     tiền mặt. Nếu đã nhận đủ, nhấn Xác nhận. Nếu chưa, nhấn   │
│     Giải Trình — giao dịch sẽ được đội hỗ trợ kiểm tra.        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Bán USDV bằng tiền mặt            [Badge: Đang khiếu nại]     │
├─────────────────────────────────────────────────────────────────┤
│  👤 member box ...                                               │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID / datetime ...                                  │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng ...                                       │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
├─────────────────────────────────────────────────────────────────┤
│  [BTN-OUTLINE: Giải trình]         [BTN-PRIMARY: Xác nhận]      │
└─────────────────────────────────────────────────────────────────┘
```

**Nếu Seller đã có bằng chứng giải trình (`explanationProofFiles.length > 0`):**

```
├─────────────────────────────────────────────────────────────────┤
│  [+] Bằng chứng giải trình khiếu nại                            │
├─────────────────────────────────────────────────────────────────┤
│  [BTN-OUTLINE: Thêm bằng chứng giải trình]  [BTN: Xác nhận]    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. CANCEL WITH HOLDING + canDispute

> Giao dịch bị Seller cancel sau khi OTP đã verify → Hệ thống giữ USDV 24h để Buyer khiếu nại.

### 9A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ⚠️  Bạn đã thanh toán nhưng chưa nhận được USDV?              │
│     Nhấn Đã thanh toán để yêu cầu hỗ trợ.                     │
│     Giao dịch sẽ được đội ngũ hỗ trợ xem xét.                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Mua USDV bằng tiền mặt                  [Badge: Hủy]          │
│  ... (thông tin giao dịch) ...                                  │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
│  Lý do huỷ: (reason)        Huỷ bởi: (cancelledBy)             │
├─────────────────────────────────────────────────────────────────┤
│                   [BTN-PRIMARY: Đã thanh toán]                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. COMPLETED — Hoàn tất

### 10A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│  Mua USDV bằng tiền mặt                [Badge: Hoàn tất]       │
├─────────────────────────────────────────────────────────────────┤
│  👤 member box ...                                               │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID: TXN-XXXX...              hh:mm DD/MM/YYYY      │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền                                          $100.00       │
│  Phí hệ thống (1%)                                  $1.00       │
│  Phí dịch vụ  (0.5%)                               $0.50       │
│  Tổng                                    $101.50 [text-primary] │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
│  ✅ Được bảo hiểm bởi VLinkPay (nếu có)                         │
├─────────────────────────────────────────────────────────────────┤
│  [BTN-OUTLINE: Đánh giá]    [BTN-PRIMARY: Chi tiết giao dịch]  │
└─────────────────────────────────────────────────────────────────┘
```

### 10B. Góc nhìn TAKER (Mobile ATM — Seller)

> Cấu trúc tương tự 10A. Nút "Chi tiết giao dịch" thay bằng `btnTransactionDetails`.

```
├─────────────────────────────────────────────────────────────────┤
│  [BTN-OUTLINE: Đánh giá]    [BTN-PRIMARY: Chi tiết giao dịch]  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. DECLINED — Đã bị từ chối

> ATM từ chối yêu cầu của MAKER.

### 11A. Góc nhìn MAKER (Cá nhân — Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│  Mua USDV bằng tiền mặt            [Badge: Đã bị từ chối]      │
├─────────────────────────────────────────────────────────────────┤
│  👤 member box ...                                               │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID / datetime ...                                  │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng ...                                       │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
│  │  Huỷ bởi: ATM_MobileUser                                     │
│  │  Lý do:   (reason)                                           │
├─────────────────────────────────────────────────────────────────┤
│  (Không có nút hành động)                                       │
└─────────────────────────────────────────────────────────────────┘
```

> **Popup tự động hiện (showDeclinedWarning):**
> ```
> ┌──────────────────────────────────┐
> │  ⚠️  Yêu cầu không được chấp nhận │
> │  Giao dịch của bạn đã bị từ chối  │
> │  [BTN: Chọn Mobile ATM khác]      │
> └──────────────────────────────────┘
> ```

---

## 12. CANCELLED — Đã huỷ

### 12A. Cả MAKER và TAKER

```
┌─────────────────────────────────────────────────────────────────┐
│  Mua USDV bằng tiền mặt               [Badge: Đã huỷ]          │
├─────────────────────────────────────────────────────────────────┤
│  👤 member box ...                                               │
├─────────────────────────────────────────────────────────────────┤
│  Transaction ID / datetime ...                                  │
├─────────────────────────────────────────────────────────────────┤
│  Số tiền / Phí / Tổng ...                                       │
├─────────────────────────────────────────────────────────────────┤
│  [+] Xem chi tiết giao dịch                                     │
│  │  Huỷ bởi: NguyenVanA                                         │
│  │  Lý do:   (reason nhập khi huỷ)                              │
├─────────────────────────────────────────────────────────────────┤
│  (Không có nút hành động)                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 13. CANCELLED DISPUTE — Đã rút khiếu nại

### 13A. Góc nhìn Buyer (đã rút khiếu nại)

```
┌─────────────────────────────────────────────────────────────────┐
│  Mua USDV bằng tiền mặt         [Badge: Đã rút khiếu nại]      │
│  ... (thông tin giao dịch, chỉ đọc) ...                         │
│  (Không có nút hành động)                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 14. EXPIRED — Hết hạn

> Cả hai bên không thực hiện trong thời gian cho phép.

### 14A. Cả MAKER và TAKER

```
┌─────────────────────────────────────────────────────────────────┐
│  Mua USDV bằng tiền mặt              [Badge: Hết hạn]          │
│  ... (thông tin giao dịch, chỉ đọc) ...                         │
│  (Không có nút hành động)                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 15. Trạng thái Sub-Status (hiển thị trong member box)

> Chỉ hiển thị khi: `isAccept() && !isSubStatusNone()` và đúng điều kiện vai trò di chuyển.

| SubStatus | Icon + Text hiển thị |
|---|---|
| `OnMyWay` | 🚙 Đang đi |
| `WaitingAMoment` | ⏳ Chờ một lát |
| `WillbeThereSoon` | 🕔 Sẽ đến trong vòng 5 phút |
| `AtMeetingPoint` | ✅ Đã đến điểm hẹn |

> **Ai thấy gì:**
> - MAKER (Mobile ATM) thấy sub-status của TAKER (Mobile ATM đang di chuyển)
> - TAKER (Merchant) thấy sub-status của MAKER (Merchant đang di chuyển)

---

## 16. Dialog "Xác nhận nhận tiền mặt" (SweetAlert — Seller confirm)

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  Xác nhận đã nhận 10.00 USDV từ NguyenVanA?         │
│                                                      │
│       [BTN: Đóng]      [BTN-PRIMARY: Confirm]        │
│                                                      │
└──────────────────────────────────────────────────────┘
  → Nhấn Confirm mở PIN dialog → gọi API complete
```

---

## 17. Dialog "Hủy yêu cầu" (Cancel Transaction Dialog)

```
┌──────────────────────────────────────────────────────┐
│  Hủy yêu cầu giao dịch                              │
│                                                      │
│  Hủy giao dịch này sẽ chịu phí X%.                  │
│  Tổng phí: $X.XX                                     │
│                                                      │
│  Cho chúng tôi biết lý do bạn muốn hủy:             │
│  [textarea: Nhập lý do hủy]                          │
│                                                      │
│       [BTN: Đóng]      [BTN-DANGER: Xác nhận]        │
└──────────────────────────────────────────────────────┘
```

---

## 18. Badge màu sắc theo status

| Status | Class CSS | Màu |
|---|---|---|
| Pending | `status-atm-request--pending` | Xanh dương nhạt |
| Accepted | `status-atm-request--accepted` | Xanh lá |
| Completed | `status-atm-request--completed` | Xanh lá đậm |
| Declined | `status-atm-request--declined` | Đỏ |
| Cancelled | `status-atm-request--cancelled` | Xám |
| Dispute | `status-atm-request--dispute` | Cam |
| CancelledDispute | `status-atm-request--cancelled-dispute` | Xám |
| CancelWithHolding | `status-atm-request--cancel-with-holding` | Vàng |
| Expired | `status-atm-request--expired` | Xám nhạt |

---

## 19. Collapse "[+] Xem chi tiết giao dịch" — Nội dung đầy đủ

> Nút luôn hiển thị trừ khi `isDecline() && insuranceAmount === 0`.
> Khi mở ra, nội dung thay đổi theo loại giao dịch và trạng thái.

---

### 19A. BUY — Thanh toán tiền mặt (isPaymentCash)

```
[ Xem chi tiết giao dịch ▾ ]
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Người mua trả (tiền mặt)                        $101.50       │
│  ─────────────────────────────────────────────────────────────  │
│  Người bán nhận (tiền mặt)                        $100.00      │
│  Người bán thu hộ nền tảng (tiền mặt)               $1.00      │
│  Người bán thu hộ bảo hiểm (tiền mặt) *             $0.50      │
│  Người mua nhận                               10.00 USDV       │
│                                                                 │
│  ─ ─ ─ ─ [divider nếu có phí bảo hiểm] ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Phí bảo hiểm (người mua) *                   0.10 USDV        │
│  Phí bảo hiểm (người bán) *                   0.10 USDV        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

> `*` chỉ hiển thị khi có bảo hiểm (`isCollectedForInsurance()` / `insuranceAmount > 0`).

---

### 19B. BUY — Thanh toán online (isPaymentOnline, ví dụ: Zelle)

```
[ Xem chi tiết giao dịch ▾ ]
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Người mua trả (qua Zelle)                       $101.50       │
│  ─────────────────────────────────────────────────────────────  │
│  Người bán nhận (qua Zelle)                       $100.00      │
│  Người bán thu hộ nền tảng (qua Zelle)              $1.00      │
│  Người bán thu hộ bảo hiểm (qua Zelle) *            $0.50      │
│  Người mua nhận                               10.00 USDV       │
│                                                                 │
│  ─ ─ ─ [divider nếu có bảo hiểm] ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Phí bảo hiểm (người mua) *                   0.10 USDV        │
│  Phí bảo hiểm (người bán) *                   0.10 USDV        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 19C. SELL — Thanh toán tiền mặt (isSell + isPaymentCash)

```
[ Xem chi tiết giao dịch ▾ ]
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Người bán trả                                10.00 USDV       │
│  ─────────────────────────────────────────────────────────────  │
│  Người mua nhận                                9.90 USDV       │
│  Người mua thu hộ nền tảng                     0.10 USDV       │
│  Người mua thu hộ bảo hiểm *                   0.05 USDV       │
│  Người bán nhận (tiền mặt)                       $99.00        │
│                                                                 │
│  ─ ─ ─ [divider nếu có bảo hiểm] ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Phí bảo hiểm (người bán) *                   0.10 USDV        │
│  Phí bảo hiểm (người mua) *                   0.10 USDV        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 19D. Đã HUỶ (isCancelled hoặc isCancelWithHolding) — Thêm info hủy

> Phần breakdown số tiền bị ẩn (`!isCancelled() && !isDecline()`). Chỉ hiện thông tin hủy và phí bảo hiểm nếu có.

```
[ Xem chi tiết giao dịch ▾ ]
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ─ ─ ─ [divider] ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│  Huỷ bởi                                      NguyenVanA       │
│  Lý do huỷ             Thay đổi kế hoạch, không đến được        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 19E. Tổng hợp điều kiện render từng dòng

| Dòng | Điều kiện hiển thị |
|---|---|
| `Người mua/bán trả` | `!isCancelled() && !isDecline()` |
| `Người bán nhận` | `isBuy() && !isCancelled()` |
| `Người bán thu hộ nền tảng` | `isBuy() && !isCancelled()` |
| `Người bán thu hộ bảo hiểm` | `isBuy() && isCollectedForInsurance()` |
| `Người mua nhận (USDV)` | `isBuy() && !isCancelled()` |
| `Người mua nhận (USDV)` | `isSell() && !isCancelled()` |
| `Người mua thu hộ nền tảng` | `isSell() && !isCancelled()` |
| `Người mua thu hộ bảo hiểm` | `isSell() && isCollectedForInsurance()` |
| `Người bán nhận (tiền mặt)` | `isSell() && !isCancelled()` |
| `Divider + Phí bảo hiểm` | `!isCancelled() && (insuranceAmount > 0 \|\| atmInsuranceAmount > 0)` |
| `Divider + Huỷ bởi / Lý do` | `(isCancelled() \|\| isCancelWithHolding()) && cancelledBy != null` |

---

## 20. Dropdown "[BTN: Hành động ▾]" — Tất cả các trường hợp

> **Điều kiện hiển thị nút:**
> ```
> isAccept() && !isVerifyOtp() && isPaymentCash()
> OR
> isAccept() && isPaymentOnline()
> ```

---

### 20A. ACCEPTED — Cash — MAKER (Cá nhân, Mobile ATM giao dịch) — SubStatus: None

> `isShowChooseAction() = true` vì `isMaker() && isMerchant()` → có chọn action.
> Nhưng với **Mobile ATM MAKER** thì `isShowChooseAction() = false` (MAKER phải là Merchant mới chọn action).

**MAKER là Individual (giao dịch với Mobile ATM) — Chỉ có: map + chat + call + SOS**

```
┌────────────────────────────────────────────────┐
│  🗺  [icon]  Xem bản đồ                        │
│              Theo dõi vị trí gặp mặt trên       │
│              bản đồ                             │
├────────────────────────────────────────────────┤
│  💬  [icon]  Trò chuyện                        │
│              Gửi tin nhắn cho đối tác           │
├────────────────────────────────────────────────┤
│  📞  [icon]  Gọi điện                          │
│              Thực hiện cuộc gọi với đối tác     │
├────────────────────────────────────────────────┤
│  🆘  [icon]  SOS                               │
│              Gọi nhanh số khẩn cấp             │
└────────────────────────────────────────────────┘
```

---

### 20B. ACCEPTED — Cash — TAKER (Mobile ATM) — SubStatus: None

> `isShowChooseAction() = true` vì `isTaker() && isMobile()`.
> SubStatus = None → hiện "Chờ một chút".

```
┌────────────────────────────────────────────────┐
│  ⏳  [icon]  Chờ một chút                      │  ← chỉ khi SubStatus = None
│              Yêu cầu chờ trong giây lát         │
├────────────────────────────────────────────────┤
│  🚙  [icon]  Tôi đang trên đường               │  ← luôn hiện (isPaymentCash)
│              Thông báo rằng bạn đang đến        │
├────────────────────────────────────────────────┤
│  🗺  [icon]  Xem chỉ đường                     │  ← isTaker && isMobile
│              Xem lộ trình của bạn trên bản đồ   │
├────────────────────────────────────────────────┤
│  💬  [icon]  Trò chuyện                        │
│              Gửi tin nhắn cho đối tác           │
├────────────────────────────────────────────────┤
│  📞  [icon]  Gọi điện                          │
│              Thực hiện cuộc gọi với đối tác     │
├────────────────────────────────────────────────┤
│  🆘  [icon]  SOS                               │
│              Gọi nhanh số khẩn cấp             │
└────────────────────────────────────────────────┘
```

---

### 20C. ACCEPTED — Cash — TAKER (Mobile ATM) — SubStatus: OnMyWay

> SubStatus = OnMyWay → **ẩn "Chờ một chút"** (isSubStatusNone = false).
> `isShowChooseAction()` = false vì `isSubStatusOnWay() = true`.
> → Chỉ còn map + chat + call + SOS.

```
┌────────────────────────────────────────────────┐
│  🗺  [icon]  Xem chỉ đường                     │
│              Xem lộ trình của bạn trên bản đồ   │
├────────────────────────────────────────────────┤
│  💬  [icon]  Trò chuyện                        │
│              Gửi tin nhắn cho đối tác           │
├────────────────────────────────────────────────┤
│  📞  [icon]  Gọi điện                          │
│              Thực hiện cuộc gọi với đối tác     │
├────────────────────────────────────────────────┤
│  🆘  [icon]  SOS                               │
│              Gọi nhanh số khẩn cấp             │
└────────────────────────────────────────────────┘
```

---

### 20D. ACCEPTED — Cash — MAKER (Merchant ATM) — SubStatus: None

> `isShowChooseAction() = true` vì `isMaker() && isMerchant()`.
> MAKER là Merchant → map item = "Xem chỉ đường" (isMaker+isMerchant).

```
┌────────────────────────────────────────────────┐
│  ⏳  [icon]  Chờ một chút                      │  ← SubStatus = None
│              Yêu cầu chờ trong giây lát         │
├────────────────────────────────────────────────┤
│  🚙  [icon]  Tôi đang trên đường               │
│              Thông báo rằng bạn đang đến        │
├────────────────────────────────────────────────┤
│  🗺  [icon]  Xem chỉ đường                     │  ← isMaker && isMerchant
│              Xem lộ trình của bạn trên bản đồ   │
├────────────────────────────────────────────────┤
│  💬  [icon]  Trò chuyện                        │
│              Gửi tin nhắn cho đối tác           │
├────────────────────────────────────────────────┤
│  📞  [icon]  Gọi điện                          │
│              Thực hiện cuộc gọi với đối tác     │
├────────────────────────────────────────────────┤
│  🆘  [icon]  SOS                               │
│              Gọi nhanh số khẩn cấp             │
└────────────────────────────────────────────────┘
```

---

### 20E. ACCEPTED — Online (Zelle/Bank/PayPal/...) — Cả MAKER và TAKER

> Giao dịch online → không có "Chờ một chút", "Tôi đang trên đường", Map, SOS.
> Chỉ còn Chat + Call.

```
┌────────────────────────────────────────────────┐
│  💬  [icon]  Trò chuyện                        │
│              Gửi tin nhắn cho đối tác           │
├────────────────────────────────────────────────┤
│  📞  [icon]  Gọi điện                          │
│              Thực hiện cuộc gọi với đối tác     │
└────────────────────────────────────────────────┘
```

---

### 20F. Bảng tổng hợp — item nào hiển thị trong trường hợp nào

| Item | Điều kiện hiển thị |
|---|---|
| ⏳ Chờ một chút | `isShowChooseAction() && isPaymentCash() && isSubStatusNone()` |
| 🚙 Tôi đang trên đường | `isShowChooseAction() && isPaymentCash()` |
| 🗺 Xem chỉ đường | `isPaymentCash() && (isMaker+isMerchant \|\| isTaker+isMobile)` |
| 🗺 Xem bản đồ | `isPaymentCash() && !(isMaker+isMerchant) && !(isTaker+isMobile)` |
| 💬 Trò chuyện | Luôn có (khi dropdown hiển thị) |
| 📞 Gọi điện | Luôn có (khi dropdown hiển thị) |
| 🆘 SOS | `isPaymentCash()` |

> **`isShowChooseAction()`** = `isAccept() && (isTaker+isMobile || isMaker+isMerchant) && !isSubStatusOnWay()`
