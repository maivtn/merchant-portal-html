# Mô tả tính năng QR Partner

## Mục đích

Cho phép **Merchant ATM / Mobile ATM** hiển thị mã QR của mình để khách hàng quét và bắt đầu giao dịch ngay, thay vì phải tìm kiếm hoặc chọn đối tác trong app.

---

## Cách hoạt động tổng thể

### 1. Phía ATM (Merchant hoặc Mobile)

- Người vận hành bật chế độ nhận khách (**Walk-in**)
- Nhấn **“Show ATM QR”**
- Hệ thống hiển thị mã QR

---

### 2. Phía khách hàng

- Khách hàng mở app và quét QR
- Hệ thống tự nhận diện đúng đối tác
- Khách hàng được dẫn vào luồng tạo giao dịch

---

## Điểm quan trọng cần hiểu đúng

QR chỉ dùng để **xác định đúng đối tác**.

QR **không thay thế toàn bộ flow giao dịch đã có trước đó**.

Sau khi quét QR, khách hàng vẫn cần đi qua các bước giao dịch cần thiết như chọn loại giao dịch, nhập số tiền, xem phí và xác nhận.

---

## Khác nhau giữa Merchant ATM và Mobile ATM

### Merchant ATM — cửa hàng cố định

Khách hàng đang đứng tại quầy hoặc địa điểm cố định của Merchant ATM.

Sau khi quét QR:

- Vào luồng giao dịch
- Chọn Buy / Sell
- Nhập số tiền
- Xem phí
- Tạo giao dịch

---

### Mobile ATM — di chuyển

Khách hàng quét QR của Mobile ATM.

Sau khi quét QR:

- Vào luồng giao dịch
- Chọn Buy / Sell
- Nhập số tiền
- Xem phí
- Tạo giao dịch
- Bắt buộc phải nhập hoặc xác nhận location
- Hệ thống cần biết địa điểm gặp

**Lý do:** Mobile ATM là đối tác di chuyển. Họ cần biết khách hàng đang ở đâu và cách bao xa để quyết định có nhận giao dịch hay không.

---

## Vì sao Mobile ATM bắt buộc phải có location?

Mobile ATM cần biết:

- Khách hàng đang ở đâu
- Khoảng cách bao xa
- Có thể di chuyển đến điểm hẹn hay không
- Thời gian di chuyển dự kiến

Thông tin location giúp Mobile ATM quyết định:

- Có nhận đơn hay không
- Có đủ thời gian xử lý không
- Có phù hợp với phạm vi hoạt động không

Nếu không có location, Mobile ATM sẽ không thể đánh giá đúng giao dịch, dễ dẫn đến hủy đơn hoặc trải nghiệm không tốt.

---

## Luồng đơn giản

### Với Merchant ATM

```text
Scan QR
→ Vào giao dịch
→ Xác nhận giao dịch
```

---

### Với Mobile ATM

```text
Scan QR
→ Nhập địa điểm gặp
→ Vào giao dịch
→ Xác nhận giao dịch
```

---

## Tóm tắt

**QR Partner** giúp khách hàng kết nối nhanh với đúng Merchant ATM hoặc Mobile ATM.