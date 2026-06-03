# Sidebar Menu — Mô tả các mục

Tài liệu này mô tả toàn bộ các mục trong hai cấu hình sidebar của VLINKPAY Merchant Portal, được định nghĩa trong `global.js`.

---

## 1. SIDEBAR_MENU — Menu chính (Merchant Portal)

### OVERVIEW

| Mục | File | Mô tả |
|-----|------|--------|
| **Homepage** | _(external URL)_ | Truy cập trang chủ công khai của VLINKPAY (P2P Exchange ATM). Mở site marketing/landing page bên ngoài portal. |
| **Dashboard** | `index.html` | Trang tổng quan chính sau khi đăng nhập. Hiển thị số liệu tổng hợp: doanh thu, thẻ đã phát hành, giao dịch gần đây. |

---

### GIFT CARD CENTER

#### Create New — Tạo thẻ mới

| Mục | File | Mô tả |
|-----|------|--------|
| **Issue Digital** | `issue-digital.html` | Tạo thẻ quà tặng kỹ thuật số để bán trực tiếp tại tiệm (in-store). Merchant phát hành thẻ cho khách mua tại quầy. |
| **Quick Setup** | `issue-card.html` | Tạo thẻ để bán online trên VlinkPay với form thiết lập nhanh, ít tùy chọn — phù hợp khi muốn đưa sản phẩm lên store nhanh chóng. |
| **Advanced Setup** | _(chưa có file)_ | Tạo thẻ để bán online trên VlinkPay với đầy đủ tùy chọn nâng cao: giá, điều kiện, hạn sử dụng, v.v. (đang phát triển). |

#### Product Management — Quản lý sản phẩm

| Mục | File | Mô tả |
|-----|------|--------|
| **Products** | `product-list.html` | Danh sách toàn bộ sản phẩm thẻ đang hoạt động: gift card, voucher, thẻ membership. Từ đây có thể xem chi tiết từng thẻ, lịch sử, và thẻ membership. |
| **Cancelled Products** | `cancelled-cards.html` | Danh sách các thẻ/sản phẩm đã bị hủy. Cho phép tra cứu và xem lý do hủy. |

#### Marketing Tools — Công cụ marketing

**Spiner** — Công cụ tạo chiến dịch quay số trúng thưởng (spin-to-win):

| Mục | File | Mô tả |
|-----|------|--------|
| **Create Campaign** | `marketing-create.html` | Tạo chiến dịch Spiner mới: cấu hình phần thưởng, xác suất, thời gian chạy. |
| **Campaign Management** | `marketing-tools.html` | Xem và quản lý danh sách chiến dịch đã tạo. Hỗ trợ chỉnh sửa (`marketing-edit.html`) và xem chi tiết (`marketing-details.html`). |

**AI Ads Hub** — Nền tảng quảng cáo được hỗ trợ bởi AI:

| Mục | File | Mô tả |
|-----|------|--------|
| **Create Ads** | `ai-ads-create.html` | Tạo quảng cáo mới với sự hỗ trợ của AI: nhập nội dung, chọn đối tượng, tạo banner tự động. |
| **AI Ads Hub** | `ai-ads.html` | Trung tâm quản lý toàn bộ quảng cáo AI: xem hiệu suất, trạng thái, và thống kê. |
| **Manage Banner** | `ai-ads-banner.html` | Quản lý các banner quảng cáo: upload, chỉnh sửa, kích hoạt/vô hiệu hóa banner. |
| **Buy Package** | `ai-ads-buy-package.html` | Mua gói quảng cáo (credits/impressions) để chạy AI Ads. |
| **Transaction History** | `ai-ads-history.html` | Lịch sử giao dịch mua và sử dụng gói quảng cáo AI. |

#### Payment Acceptance — Chấp nhận thanh toán

| Mục | File | Mô tả |
|-----|------|--------|
| **Pay with Gift Card** | `gift-card-payment.html` | Trang thanh toán cho khách hàng sử dụng gift card. Bao gồm giao diện nhập/quét mã thẻ (`gift-card-payment-box.html`). |
| **Pay with Crypto** | `crypto-payment.html` | Trang thanh toán bằng tiền mã hóa (crypto). Bao gồm giao diện chọn coin và QR code (`crypto-payment-box.html`). |

#### Settings — Cài đặt

| Mục | File | Mô tả |
|-----|------|--------|
| **Merchant Payment Setup** | `merchant-payment-setup.html` | Cấu hình phương thức thanh toán của merchant: tích hợp cổng thanh toán, thiết lập tài khoản nhận tiền. |
| **Benefits Setup** | `benefits-setup.html` | Cấu hình các gói quyền lợi/membership: tạo gói, thiết lập phúc lợi, quản lý trạng thái phê duyệt. Liên quan đến nhiều trang chi tiết gói membership. |

#### Report — Báo cáo

| Mục | File | Mô tả |
|-----|------|--------|
| **Sales Orders** | `sales-order-list.html` | Danh sách đơn bán hàng (thẻ đã bán ra). Cho phép xem chi tiết từng đơn (`sales-order-details.html`). |
| **Redeem History** | `card-transaction-history-merchant.html` | Lịch sử đổi thẻ (redeem) — tra cứu giao dịch khách hàng sử dụng thẻ tại merchant. |
| **Membership Report** | `membership-report.html` | Báo cáo tình hình thành viên/membership: số lượng đăng ký, doanh thu membership, trạng thái. |

---

### APPS

| Mục | File | Mô tả |
|-----|------|--------|
| **Notifications** | _(chưa có)_ | Trung tâm thông báo hệ thống. Badge hiển thị số thông báo chưa đọc (32+). |
| **AI Assistant** | _(chưa có)_ | Trợ lý AI hỗ trợ merchant: giải đáp thắc mắc, gợi ý hành động, hỗ trợ vận hành. |

---

### ACCOUNT

| Mục | File | Mô tả |
|-----|------|--------|
| **Logout** | `sign-in.html` | Đăng xuất khỏi merchant portal, chuyển về trang đăng nhập. |

---

## 2. SIDEBAR_MENU_CARDS — Menu cá nhân (Personal Cards)

Dùng cho các trang quản lý thẻ cá nhân. Kích hoạt bằng cách đặt `window.SIDEBAR_USE_CARDS_MENU = true` trước khi load `global.js`.

### Gift Card Center

| Mục | File | Mô tả |
|-----|------|--------|
| **My Cards** | `my-cards.html` | Danh sách thẻ của người dùng cá nhân. Từ đây có thể xem chi tiết đơn hàng, lịch sử, chi tiết thẻ crypto và thẻ membership. |
| **VlinkPay Store** | `digital-gifts-management.html` | Cửa hàng quà tặng kỹ thuật số VlinkPay — nơi người dùng mua/khám phá các sản phẩm thẻ. |
| **Merchant Map** | _(chưa có)_ | Bản đồ tìm kiếm merchant gần đây chấp nhận thanh toán bằng thẻ (đang phát triển). |

### Crypto Card Management

| Mục | File | Mô tả |
|-----|------|--------|
| **Crypto Card Management** | `crypto-card-list.html?role=personal` | Quản lý danh sách thẻ crypto cá nhân: xem số dư, nạp tiền, xem chi tiết thẻ. Mở trong chế độ personal (theme xanh dương). |

---

## Ghi chú kỹ thuật

- **Active state**: Mục được highlight tự động dựa trên `window.location.pathname` và danh sách `relatedPages` trong mỗi item.
- **Theme personal**: Các trang dùng `SIDEBAR_MENU_CARDS` tự động áp dụng class `.style-personal` (màu xanh dương `#3b82f6` thay vì teal `#00a76f`).
- **Group items**: Khi click vào group header sẽ điều hướng đến `href` của group hoặc `href` của child đầu tiên nếu group không có `href`.
