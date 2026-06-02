# Dashboard / Home — Mockup màn hình (`home.component.html`)

> **Route:** `/dashboard` → `HomeComponent`
>
> **Vai trò hiển thị:**
> - **Personal** (`isPersonalRole()`) — thành viên cá nhân
> - **Merchant** (`isMerchantRole()`) — cửa hàng / doanh nghiệp
>
> **Cấu trúc trang:**
> ```
> [1] Total Members Strip
> [2] Ticker (marquee)
> [3] Banner Swiper (promotion)
> [4] Filter Catalog   ← desktop only
> [5] Dashboard Cards  ← thay đổi theo role
> ```

---

## Bảng tổng hợp Cards theo Role

| Card | Personal | Merchant |
|---|:---:|:---:|
| Payment (Merchant Portal) | ✗ | ✓ |
| P2P Cash Hub | ✓ | ✓ |
| Gift Card Center | ✓ | ✓ |
| Program Hub (IOU) | ✓ (vị trí 3) | ✓ (vị trí 6) |
| Token Hub | ✓ | ✓ |
| VMM Token | ✓ | ✓ |
| Affiliate Program | ✓ | ✓ |
| Global Pool | ✓ | ✓ |

---

## Phần dùng chung (hiển thị ở cả 2 role)

### [1] Total Members Strip

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO vlinkpay]          Tổng thành viên:  0 0 1 2 3 4 5 6   │
└─────────────────────────────────────────────────────────────────┘
```

> Số thành viên hiển thị bằng hình ảnh digit (`assets/images/digits/X.png`).

---

### [2] Ticker — Marquee tự động cuộn

```
┌─────────────────────────────────────────────────────────────────┐
│  🎉 Xin chúc mừng!  JohnDoe  là  Gold  thành viên!             │
│     Chào mừng!  user@example.com  đã gia nhập VLINKPAY!  🎉 …  │
└─────────────────────────────────────────────────────────────────┘
```

> Chỉ hiển thị khi `topRanking.length > 0 || newMember.length > 0`.

---

### [3] Banner Swiper

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│          [ảnh banner promotion — fullwidth swiper]              │
│          Tự động chuyển 2s, có pagination dots                  │
│                                                                 │
│                       ●  ○  ○                                   │
└─────────────────────────────────────────────────────────────────┘
```

> Skeleton loader hiển thị khi `!isHiddenLoaded()`.

---

### [4] Filter Catalog (Desktop only)

```
┌─────────────────────────────────────────────────────────────────┐
│  Tìm kiếm...                           [Danh mục ▾] [Cửa hàng] │
└─────────────────────────────────────────────────────────────────┘
```

---

## Role: PERSONAL — Màn hình cá nhân

> Thứ tự cards: P2P Cash Hub → Gift Card Center → Program Hub → Token Hub → VMM Token → Affiliate Program → Global Pool

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]                          Tổng thành viên:  0 0 1 2 3   │
├─────────────────────────────────────────────────────────────────┤
│  🎉 Xin chúc mừng! JohnDoe là Gold thành viên! ──────── ▶      │
├─────────────────────────────────────────────────────────────────┤
│         [    banner promotion swiper    ]                       │
│                       ●  ○  ○                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-p2p]   Trung tâm P2P Cash                        │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  (không có ATM role)                                     │   │
│  │  [BTN-PRIMARY: 💰 Mua Gift Cash]                         │   │
│  │  [BTN-SEC:     💸 Bán Gift Cash]                         │   │
│  │                                                          │   │
│  │  (có ATM role: isMobileOrMerchantAtm = true)             │   │
│  │  [BTN-PRIMARY: ⚙️  Cài đặt cổng ATM]                    │   │
│  │  [BTN-SEC:     📋 Lịch sử]                              │   │
│  │                                                          │   │
│  │  Giao dịch trong tháng : $1,234.56                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-giftcard]   Trung tâm Thẻ Quà Tặng              │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Thưởng tuần này :  $25.00                              │   │
│  │  Tổng thưởng :      $350.00                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-program]   Trung tâm Chương Trình                │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Tổng thưởng :  $500.00                                 │   │
│  │  [BTN-SEC: Đến chương trình IOU]                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-token]   Trung tâm Token                         │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  [BTN-PRIMARY: Nhận (Mua) Token]                        │   │
│  │  [BTN-SEC:     Gửi (Bán)  Token]                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-vmm]   VMM Token                                 │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Giá thị trường :  $0.001234                            │   │
│  │  [BTN-SEC: Ví của tôi]                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-affiliate]   Chương Trình Liên Kết               │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Thưởng tuần này :  $12.00                              │   │
│  │  Tổng thành viên :  456                                 │   │
│  │                                                          │   │
│  │  Liên kết giới thiệu                                    │   │
│  │  https://vlinkpay.com/r/use...                          │   │
│  │  [BTN: Sao chép 📋]   [BTN: Hiển thị mã QR 📷]         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-global-pool]   Quỹ Toàn Cầu                     │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Tổng cộng :  $98,765.00                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Role: MERCHANT — Màn hình cửa hàng

> Thứ tự cards: Payment → P2P Cash Hub → Gift Card Center → Token Hub → VMM Token → Program Hub → Affiliate Program → Global Pool

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]                          Tổng thành viên:  0 0 1 2 3   │
├─────────────────────────────────────────────────────────────────┤
│  🎉 Xin chúc mừng! JohnDoe là Gold thành viên! ──────── ▶      │
├─────────────────────────────────────────────────────────────────┤
│         [    banner promotion swiper    ]                       │
│                       ●  ○  ○                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-payment]   Thanh toán                            │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  [BTN-PRIMARY: 🎁 Thẻ Quà Tặng]                        │   │
│  │  [BTN-SEC:     ₿  Crypto]                              │   │
│  │                                                          │   │
│  │  Doanh thu tháng :  $8,540.00                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-p2p]   Trung tâm P2P Cash                        │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  [BTN-PRIMARY: ⚙️  Cài đặt cổng ATM]                    │   │
│  │  [BTN-SEC:     📋 Lịch sử]                              │   │
│  │                                                          │   │
│  │  Giao dịch trong tháng :  $3,200.00                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-giftcard]   Trung tâm Thẻ Quà Tặng              │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Địa chỉ cửa hàng                                       │   │
│  │  https://vlinkpay.com/store/my-shop                     │   │
│  │  [BTN: Sao chép 📋]   [BTN: Hiển thị mã QR 📷]         │   │
│  │                                                          │   │
│  │  Tổng doanh số :  $12,450.00                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-token]   Trung tâm Token                         │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  [BTN-PRIMARY: Nhận (Mua) Token]                        │   │
│  │  [BTN-SEC:     Gửi (Bán)  Token]                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-vmm]   VMM Token                                 │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Giá thị trường :  $0.001234                            │   │
│  │  [BTN-SEC: Ví của tôi]                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-program]   Trung tâm Chương Trình                │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Tổng thưởng :  $500.00                                 │   │
│  │  [BTN-SEC: Đến chương trình IOU]                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-affiliate]   Chương Trình Liên Kết               │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Thưởng tuần này :  $12.00                              │   │
│  │  Tổng thành viên :  456                                 │   │
│  │                                                          │   │
│  │  Liên kết giới thiệu                                    │   │
│  │  https://vlinkpay.com/r/use...                          │   │
│  │  [BTN: Sao chép 📋]   [BTN: Hiển thị mã QR 📷]         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  [icon-global-pool]   Quỹ Toàn Cầu                     │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Tổng cộng :  $98,765.00                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Chi tiết từng Card

### Card 1: Payment / Merchant Portal (Merchant only)

```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-payment]  │  Thanh toán                                │
│                     │  ──────────────────────────────────────── │
│                     │  [BTN-PRIMARY]  🎁  Thẻ Quà Tặng         │
│                     │  [BTN-SEC]      ₿   Crypto               │
│                     │                                            │
│                     │  Doanh thu tháng :  $8,540.00             │
└──────────────────────────────────────────────────────────────────┘
```

**Navigate:**
- Icon / Header click → `navigateToPaymentGiftCard()`
- Thẻ Quà Tặng → `navigateToPaymentGiftCard()`
- Crypto → `navigateToPaymentCrypto()`

---

### Card 2: P2P Cash Hub

**Personal — không có ATM role:**
```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-p2p]      │  Trung tâm P2P Cash                       │
│                     │  ──────────────────────────────────────── │
│                     │  [BTN-PRIMARY]  💰  Mua Gift Cash         │
│                     │  [BTN-SEC]      💸  Bán Gift Cash         │
│                     │                                            │
│                     │  Giao dịch trong tháng :  $1,234.56       │
└──────────────────────────────────────────────────────────────────┘
```

**Personal — có ATM role (`isMobileOrMerchantAtm = true`):**
```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-p2p]      │  Trung tâm P2P Cash                       │
│                     │  ──────────────────────────────────────── │
│                     │  [BTN-PRIMARY]  ⚙️  Cài đặt cổng ATM     │
│                     │  [BTN-SEC]      📋  Lịch sử              │
│                     │                                            │
│                     │  Giao dịch trong tháng :  $3,200.00       │
└──────────────────────────────────────────────────────────────────┘
```

**Merchant:**
```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-p2p]      │  Trung tâm P2P Cash                       │
│                     │  ──────────────────────────────────────── │
│                     │  [BTN-PRIMARY]  ⚙️  Cài đặt cổng ATM     │
│                     │  [BTN-SEC]      📋  Lịch sử              │
│                     │                                            │
│                     │  Giao dịch trong tháng :  $3,200.00       │
└──────────────────────────────────────────────────────────────────┘
```

---

### Card 3: Gift Card Center

**Personal:**
```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-giftcard] │  Trung tâm Thẻ Quà Tặng                   │
│                     │  ──────────────────────────────────────── │
│                     │  Thưởng tuần này :  $25.00               │
│                     │  Tổng thưởng :      $350.00              │
└──────────────────────────────────────────────────────────────────┘
```

**Merchant:**
```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-giftcard] │  Trung tâm Thẻ Quà Tặng                   │
│                     │  ──────────────────────────────────────── │
│                     │  Địa chỉ cửa hàng                        │
│                     │  https://vlinkpay.com/store/my-shop       │
│                     │                [Sao chép 📋] [QR 📷]     │
│                     │  (chỉ hiện khi myStore.id > 0)            │
│                     │                                            │
│                     │  Tổng doanh số :  $12,450.00             │
└──────────────────────────────────────────────────────────────────┘
```

---

### Card 4: Program Hub / IOU (cả 2 role, khác vị trí)

```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-program]  │  Trung tâm Chương Trình                    │
│                     │  ──────────────────────────────────────── │
│                     │  Tổng thưởng :  $500.00                   │
│                     │  [BTN-SEC: Đến chương trình IOU]           │
└──────────────────────────────────────────────────────────────────┘
```

---

### Card 5: Token Hub

```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-token]    │  Trung tâm Token                           │
│                     │  ──────────────────────────────────────── │
│                     │  [BTN-PRIMARY]  Nhận ₍Mua₎ Token         │
│                     │  [BTN-SEC]      Gửi  ₍Bán₎ Token         │
└──────────────────────────────────────────────────────────────────┘
```

---

### Card 6: VMM Token

```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-vmm]      │  VMM Token                                 │
│                     │  ──────────────────────────────────────── │
│                     │  Giá thị trường :  $0.001234              │
│                     │  [BTN-SEC: Ví của tôi]                    │
└──────────────────────────────────────────────────────────────────┘
```

---

### Card 7: Affiliate Program

```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-affiliate]│  Chương Trình Liên Kết                     │
│                     │  ──────────────────────────────────────── │
│                     │  Thưởng tuần này :  $12.00               │
│                     │  Tổng thành viên :  456                   │
│                     │                                            │
│                     │  Liên kết giới thiệu                      │
│                     │  https://vlinkpay.com/r/abc123...         │
│                     │         [Sao chép 📋]  [Hiển thị QR 📷]  │
└──────────────────────────────────────────────────────────────────┘
```

---

### Card 8: Global Pool

```
┌──────────────────────────────────────────────────────────────────┐
│  [🖼 icon-global]   │  Quỹ Toàn Cầu                             │
│                     │  ──────────────────────────────────────── │
│                     │  Tổng cộng :  $98,765.00                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Loading State (skeleton)

```
┌─────────────────────────────────────────────────────────────────┐
│  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]  h=225px               │
│  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]  h=225px               │
│  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]  h=225px               │
│  ... × 8 skeleton blocks                                        │
└─────────────────────────────────────────────────────────────────┘
```

> Hiển thị khi `isLoadingDashboard() === true`.

---

## Navigate destinations

| Hành động | Destination |
|---|---|
| P2P → Mua Gift Cash | `navigateToBuyGiftCash()` |
| P2P → Bán Gift Cash | `navigateToSellGiftCash()` |
| P2P → Cài đặt ATM (ATM role) | `navigateToBuyGiftCashIsMobileOrMerchantAtm()` |
| P2P → Lịch sử (ATM role) | `navigateToP2PHistory()` |
| P2P → Cài đặt cổng ATM (Merchant) | `navigateToPortalAtmSetting()` |
| P2P → Lịch sử (Merchant) | `navigateToP2PHistory()` |
| Payment → Gift Card | `navigateToPaymentGiftCard()` |
| Payment → Crypto | `navigateToPaymentCrypto()` |
| Gift Card Center | `navigateToGiftCardCenter()` |
| Gift Card Center → Store URL copy | `onCopyCardNumber()` |
| Gift Card Center → Show QR | `openUrlStore()` |
| Program Hub | `navigateToIouProgram()` |
| Token Hub → Receive | `navigateToReceiveToken()` |
| Token Hub → Send Out | `navigateToSendOutToken()` |
| VMM Token → My Wallet | `navigateToMyWallet()` |
| Affiliate → Copy referral | `openCopyReferralLinkDialog()` |
| Affiliate → Show QR | `openBottomSheet()` |
| Affiliate → Header | `navigateToAffiliateProgram()` |
