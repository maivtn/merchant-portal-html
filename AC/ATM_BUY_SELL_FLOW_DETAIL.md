# ATM Buy/Sell Flow Detail

Tài liệu này mô tả chi tiết luồng Buy/Sell của module `atm` theo từng màn hình và từng case thực tế đang có trong code.

## 1. Mục tiêu

Luồng Buy/Sell dùng để:
- cho user tạo request giao dịch
- chọn merchant hoặc xác nhận điểm hẹn
- review phí và tổng tiền
- chờ merchant xác nhận
- theo dõi QR / trạng thái
- hoàn tất giao dịch

Luồng này dùng chung state tạm trong `AtmSettingsStore`, vì vậy chuyển màn hình không được làm mất dữ liệu giữa chừng.

## 2. Key Variables

| Variable | Vai trò |
|---|---|
| `exchangeType` | Xác định Buy hay Sell |
| `atmType` | Xác định loại ATM: MobileATM, MerchantATM, ComboATM |
| `paymentMethod` | Xác định cash hay non-cash |
| `paramBuySell` | State tạm lưu toàn bộ dữ liệu của flow |
| `requestId` | Id request sau khi submit |
| `secureCode` | Dùng cho QR / request detail |
| `otp` | Dùng cho xác thực giao dịch |

## 3. Screen List

| Screen | Route | Mục đích |
|---|---|---|
| Buy/Sell entry | `buy-gift-cash` / `sell-gift-cash` | Điểm bắt đầu của flow |
| Confirm Location | `buy-gift-cash/confirm-location` / `sell-gift-cash/confirm-location` | Chọn hoặc xác nhận điểm hẹn |
| Select Location | `buy-gift-cash/location` / `sell-gift-cash/location` | Chọn merchant gần nhất |
| Review Details | `buy-gift-cash/review-details` / `sell-gift-cash/review-details` | Review phí và tổng tiền |
| Waiting Confirmation | `buy-gift-cash/waiting-confirmation` / `sell-gift-cash/waiting-confirmation` | Chờ merchant accept/decline |
| QR Code | `buy-gift-cash/qrcode` | Hiển thị QR và theo dõi scan |
| Transaction Complete | `buy-gift-cash/transaction-complete` / `sell-gift-cash/transaction-complete` | Kết thúc giao dịch |

## 4. Flow Logic By Screen

### 4.1 Buy/Sell Entry Screen

Màn này là entry point của flow.

#### Vai trò
- User chọn mua hoặc bán
- User nhập amount, symbol, payment method, và các thông tin ban đầu khác

#### Output mong đợi
- Tạo được `paramBuySell` ban đầu
- Điều hướng sang màn tiếp theo tùy `atmType` và `paymentMethod`

#### Điều kiện rẽ nhánh
- Nếu `paymentMethod = Cash` và `atmType = MobileATM`:
  - flow phải đi qua `Confirm Location`
- Nếu `paymentMethod = Cash` và `atmType != MobileATM`:
  - flow có thể đi thẳng sang `Select Location`
- Nếu `paymentMethod != Cash`:
  - flow đi thẳng sang `Select Location`

---

### 4.2 Confirm Location Screen

Màn này chỉ thực sự cần trong case `MobileATM + Cash`.

#### User actions
- Search địa chỉ
- Click map để chọn tọa độ
- Lấy current location
- Nhập note cho mobile ATM
- Bấm confirm

#### System behavior
- Load dữ liệu cũ từ `paramBuySell` nếu có
- Khởi tạo Google Maps và geocoder
- Khi confirm:
  - lưu `latitude`
  - lưu `longitude`
  - lưu `meetingLocation`
  - lưu `noteForMobileAtm`
  - quay về `Select Location`

#### Validate / fail cases
- Nếu `amount = 0` thì tự back về flow gốc
- Nếu search không tìm thấy địa chỉ thì hiển thị thông báo lỗi
- Nếu geolocation không khả dụng thì fallback về center mặc định

---

### 4.3 Select Location Screen

Màn này là nơi chọn merchant gần nhất.

#### Data đầu vào
- amount
- exchangeType
- atmType
- latitude/longitude
- paymentMethod
- symbol
- isUseDollarAmount

#### System behavior
- Gọi API nearby merchant
- Nếu payment method là cash:
  - cần `atmType`
  - ưu tiên location từ `Confirm Location`
  - nếu chưa có thì lấy current location
- Nếu payment method không phải cash:
  - không bắt buộc confirm location
  - gọi API trực tiếp theo location có sẵn hoặc fallback
- Group merchant theo fee:
  - < 2%
  - 2% - 5%
  - > 5%

#### User actions
- Lọc theo radius
- Lọc theo max fee
- Chọn merchant

#### Khi user chọn merchant
- Update `paramBuySell`:
  - merchant
  - amount
  - atmType
  - exchangeType
  - latitude/longitude
  - symbol
  - isUseDollarAmount
- Điều hướng sang `Review Details`

#### Back behavior
- Nếu `atmType = MobileATM` và `paymentMethod = Cash`:
  - back về `Confirm Location`
- Ngược lại:
  - back về màn buy/sell gốc

---

### 4.4 Review Details Screen

Màn này là màn xác nhận cuối trước khi tạo request.

#### Data hiển thị
- amount
- symbol
- merchant name
- merchant address
- distance
- system fee
- merchant fee
- insurance fee
- total

#### Công thức total
- Buy:
  - `total = amount + systemFee + merchantFee + insuranceFee`
- Sell:
  - `total = amount - systemFee - merchantFee - insuranceFee`

#### User actions
- Bật/tắt insurance
- Quay lại
- Hủy
- Confirm

#### System behavior
- Lấy data từ `paramBuySell` và ATM settings
- Tính lại fee khi insurance thay đổi
- Đồng bộ insurance về store

#### Khi confirm
- Build payload request
- Nếu Buy:
  - gọi `createBuyRequest`
- Nếu Sell:
  - gọi `createSellRequest`
- Nếu thành công:
  - lấy `requestId`
  - điều hướng sang màn detail của request

#### Back behavior
- Nếu `atmType = MobileATM` và `paymentMethod = Cash`:
  - quay về `Confirm Location`
- Ngược lại:
  - quay về `Select Location`

---

### 4.5 Waiting Confirmation Screen

Màn này dùng để chờ merchant phản hồi request.

#### System behavior
- Load request detail theo `requestId`
- Tính countdown theo `waitToConfirmInterval`
- Polling status định kỳ

#### Status handling
- `Pending`:
  - tiếp tục chờ
- `Accepted`:
  - chuyển sang màn QR Code
- `Declined`:
  - show warning
  - cho user chọn lại flow
- `Cancelled`:
  - quay về màn buy/sell gốc
- `Completed`:
  - quay về màn buy/sell gốc

#### Timeout
- Nếu countdown hết mà request vẫn chưa accepted:
  - hiển thị warning
  - user có thể quay lại flow chọn merchant/location

#### Cancel request
- User có thể mở dialog để hủy request
- Nếu hủy thành công:
  - show success
  - quay về màn gốc

#### Store cleanup
- Nếu status final:
  - clear `paramBuySell`

---

### 4.6 QR Code Screen

Màn này chỉ xuất hiện khi request đã được accept.

#### System behavior
- Load request details
- Lấy `secureCode`
- Lấy `otp`
- Auto refresh để kiểm tra:
  - scan QR
  - trạng thái request

#### Status handling
- `Completed`:
  - chuyển sang Transaction Complete
- `Cancelled`:
  - quay về màn buy/sell gốc
- `Declined`:
  - quay về màn buy/sell gốc

#### User actions
- Xem QR
- Mở directions
- Hủy transaction
- Confirm hoàn tất bằng PIN

#### Khi confirm hoàn tất
- Mở PIN modal
- Nếu PIN hợp lệ:
  - gọi API complete
  - chuyển sang Transaction Complete

---

### 4.7 Transaction Complete Screen

Màn này hiển thị giao dịch đã hoàn tất.

#### System behavior
- Load request detail theo `requestId`
- Hiển thị thông tin final của giao dịch
- Với sell flow có thể auto refresh status đến khi completed

#### User actions
- Xem chi tiết hoàn tất
- Đi sang rating

#### Navigation
- Sau khi hoàn tất:
  - user có thể sang rating
  - hoặc quay về history tương ứng

---

## 5. Case Matrix

| Case | Flow |
|---|---|
| Buy + Cash + MobileATM | Entry -> Confirm Location -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Sell + Cash + MobileATM | Entry -> Confirm Location -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Buy + Cash + MerchantATM | Entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Sell + Cash + MerchantATM | Entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Buy + non-cash | Entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |
| Sell + non-cash | Entry -> Select Location -> Review Details -> Waiting Confirmation -> QR Code -> Transaction Complete |

## 6. Back Navigation Rules

| Screen | Back Behavior |
|---|---|
| Confirm Location | Back về màn gốc nếu không có browser history |
| Select Location | Cash + MobileATM back về Confirm Location, còn lại back về màn gốc |
| Review Details | Cash + MobileATM back về Confirm Location, còn lại back về Select Location |
| Waiting Confirmation | Nếu final state thì về màn gốc |
| QR Code | Nếu final state hoặc cancel/decline thì về màn gốc |
| Transaction Complete | Quay về màn gốc hoặc history tùy context |

## 7. State Persistence Rules

| Rule | Description |
|---|---|
| Store first | Dữ liệu flow phải đi qua `AtmSettingsStore` |
| LocalStorage fallback | `paramBuySell` được lưu localStorage để không mất khi refresh |
| Final cleanup | Khi request final phải clear state tạm |
| Safe re-entry | Thiếu dữ liệu thì route phải đẩy user về màn gốc |

## 8. Error / Edge Cases

| Case | Expected Behavior |
|---|---|
| Amount = 0 | Không cho đi tiếp |
| Không có location | Fallback geolocation hoặc quay lại màn trước |
| Search địa chỉ không ra kết quả | Hiển thị toast lỗi |
| API nearby merchant lỗi | Dừng loading và giữ UI an toàn |
| Request status đổi sang final | Clear store và quay về màn hợp lệ |
| QR scan 404 | Dừng refresh QR |

## 9. Dependencies

| Dependency | Usage |
|---|---|
| Nearby merchant API | Lấy danh sách merchant |
| Request create APIs | Tạo buy/sell request |
| Request status APIs | Polling trạng thái request |
| Google Maps SDK | Confirm location và geocoding |
| Transloco | Localized UI messages |
| PIN modal | Xác nhận hoàn tất |

## 10. Notes For Dev

- Flow này dùng chung state xuyên suốt, nên không nên reset store giữa chừng trừ khi request đã final.
- `paymentMethod` là điểm rẽ quan trọng nhất để quyết định có cần confirm location hay không.
- `exchangeType` quyết định route, API và công thức total.
- `atmType` quyết định hành vi back và một phần logic chọn vị trí.
- Mọi màn đều nên guard dữ liệu đầu vào trước khi render logic tiếp theo.
