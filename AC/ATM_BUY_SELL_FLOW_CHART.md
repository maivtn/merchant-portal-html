# ATM Buy/Sell Flow Chart

Tài liệu này trình bày luồng Buy/Sell dưới dạng bảng mũi tên theo từng case để dễ trace điều hướng giữa các màn hình.

## 1. Legend

| Ký hiệu | Ý nghĩa |
|---|---|
| `->` | Chuyển sang màn tiếp theo |
| `[]` | Tên màn hình |
| `()` | Điều kiện rẽ nhánh |

## 2. Shared Screen Set

| Screen | Route |
|---|---|
| Buy entry | `buy-gift-cash` |
| Sell entry | `sell-gift-cash` |
| Confirm Location | `buy-gift-cash/confirm-location` / `sell-gift-cash/confirm-location` |
| Select Location | `buy-gift-cash/location` / `sell-gift-cash/location` |
| Review Details | `buy-gift-cash/review-details` / `sell-gift-cash/review-details` |
| Waiting Confirmation | `buy-gift-cash/waiting-confirmation` / `sell-gift-cash/waiting-confirmation` |
| QR Code | `buy-gift-cash/qrcode` |
| Transaction Complete | `buy-gift-cash/transaction-complete` / `sell-gift-cash/transaction-complete` |

## 3. Flow Chart by Case

### 3.1 Buy + Cash + MobileATM

| Step | Flow |
|---|---|
| 1 | `[Buy entry]` |
| 2 | `[Confirm Location]` |
| 3 | `(save location/note to store)` |
| 4 | `[Select Location]` |
| 5 | `(load nearby merchants, filter/group by fee)` |
| 6 | `(select merchant)` |
| 7 | `[Review Details]` |
| 8 | `(calculate fees + total, optional insurance)` |
| 9 | `(submit buy request)` |
| 10 | `[Waiting Confirmation]` |
| 11 | `(poll status)` |
| 12 | `(Accepted)` -> `[QR Code]` |
| 13 | `(Completed)` -> `[Transaction Complete]` |

### 3.2 Sell + Cash + MobileATM

| Step | Flow |
|---|---|
| 1 | `[Sell entry]` |
| 2 | `[Confirm Location]` |
| 3 | `(save location/note to store)` |
| 4 | `[Select Location]` |
| 5 | `(load nearby merchants, filter/group by fee)` |
| 6 | `(select merchant)` |
| 7 | `[Review Details]` |
| 8 | `(calculate fees + total, optional insurance)` |
| 9 | `(submit sell request)` |
| 10 | `[Waiting Confirmation]` |
| 11 | `(poll status)` |
| 12 | `(Accepted)` -> `[QR Code]` |
| 13 | `(Completed)` -> `[Transaction Complete]` |

### 3.3 Buy + Cash + MerchantATM

| Step | Flow |
|---|---|
| 1 | `[Buy entry]` |
| 2 | `[Select Location]` |
| 3 | `(load nearby merchants, filter/group by fee)` |
| 4 | `(select merchant)` |
| 5 | `[Review Details]` |
| 6 | `(calculate fees + total, optional insurance)` |
| 7 | `(submit buy request)` |
| 8 | `[Waiting Confirmation]` |
| 9 | `(poll status)` |
| 10 | `(Accepted)` -> `[QR Code]` |
| 11 | `(Completed)` -> `[Transaction Complete]` |

### 3.4 Sell + Cash + MerchantATM

| Step | Flow |
|---|---|
| 1 | `[Sell entry]` |
| 2 | `[Select Location]` |
| 3 | `(load nearby merchants, filter/group by fee)` |
| 4 | `(select merchant)` |
| 5 | `[Review Details]` |
| 6 | `(calculate fees + total, optional insurance)` |
| 7 | `(submit sell request)` |
| 8 | `[Waiting Confirmation]` |
| 9 | `(poll status)` |
| 10 | `(Accepted)` -> `[QR Code]` |
| 11 | `(Completed)` -> `[Transaction Complete]` |

### 3.5 Buy + non-cash

| Step | Flow |
|---|---|
| 1 | `[Buy entry]` |
| 2 | `[Select Location]` |
| 3 | `(cash location not required)` |
| 4 | `(load nearby merchants directly)` |
| 5 | `(select merchant)` |
| 6 | `[Review Details]` |
| 7 | `(calculate fees + total, optional insurance)` |
| 8 | `(submit buy request)` |
| 9 | `[Waiting Confirmation]` |
| 10 | `(Accepted)` -> `[QR Code]` |
| 11 | `(Completed)` -> `[Transaction Complete]` |

### 3.6 Sell + non-cash

| Step | Flow |
|---|---|
| 1 | `[Sell entry]` |
| 2 | `[Select Location]` |
| 3 | `(cash location not required)` |
| 4 | `(load nearby merchants directly)` |
| 5 | `(select merchant)` |
| 6 | `[Review Details]` |
| 7 | `(calculate fees + total, optional insurance)` |
| 8 | `(submit sell request)` |
| 9 | `[Waiting Confirmation]` |
| 10 | `(Accepted)` -> `[QR Code]` |
| 11 | `(Completed)` -> `[Transaction Complete]` |

## 4. Alternative Sequence View

| Case | Sequence |
|---|---|
| Buy + Cash + MobileATM | Buy entry -> Confirm Location -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Sell + Cash + MobileATM | Sell entry -> Confirm Location -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Buy + Cash + MerchantATM | Buy entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Sell + Cash + MerchantATM | Sell entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Buy + non-cash | Buy entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Sell + non-cash | Sell entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |

## 5. Status-Based Branching

| Screen | Condition | Next Step |
|---|---|---|
| Waiting Confirmation | `Pending` | Stay on waiting screen and continue polling |
| Waiting Confirmation | `Accepted` | Go to QR Code |
| Waiting Confirmation | `Declined` | Show warning and allow re-selection |
| Waiting Confirmation | `Cancelled` | Return to buy/sell entry |
| Waiting Confirmation | `Completed` | Return to buy/sell entry or final path |
| QR Code | `Completed` | Go to Transaction Complete |
| QR Code | `Declined` / `Cancelled` | Return to buy/sell entry |

## 6. Back Path Table

| Current Screen | Back Target |
|---|---|
| Confirm Location | Buy/Sell entry |
| Select Location | Confirm Location if `MobileATM + Cash`, otherwise Buy/Sell entry |
| Review Details | Confirm Location if `MobileATM + Cash`, otherwise Select Location |
| Waiting Confirmation | Buy/Sell entry after final/rollback |
| QR Code | Buy/Sell entry after final/rollback |
| Transaction Complete | Buy/Sell entry or history depending on next action |

## 7. Notes

- `exchangeType` là điều kiện chính để tách Buy và Sell.
- `paymentMethod` quyết định có cần bước Confirm Location hay không.
- `atmType` quyết định back behavior và việc đi qua Confirm Location.
- `paramBuySell` là state tạm phải được giữ xuyên suốt flow.
- Các trạng thái final phải clear state tạm trước khi quay về màn gốc.
