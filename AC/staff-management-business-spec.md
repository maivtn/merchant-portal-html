# Đặc tả nghiệp vụ: Staff Management

## 1. Tổng quan

`Staff Management` là tính năng cho phép Merchant Owner quản lý nhân viên/tài khoản phụ trong Merchant Portal. Merchant Owner có thể thêm nhân viên, gán role mặc định `Cashier`, bật/tắt quyền nghiệp vụ bên trong role, theo dõi trạng thái, số card đã tạo, doanh số/thanh toán đã xử lý và cấu hình % hoa hồng cho từng nhân viên.

Tính năng này sử dụng role mặc định trong phase đầu để Merchant Owner gán nhanh quyền cho nhân viên, đồng thời vẫn cần thể hiện rõ các quyền nghiệp vụ mà từng role được phép thực hiện.

## 2. Mục tiêu

- Cho phép Merchant Owner thêm nhân viên vào merchant bằng VLINK ID hoặc QR cố định.
- Cho phép Merchant Owner gán role `Cashier` và bật/tắt các quyền nghiệp vụ trong role cho từng nhân viên.
- Cho phép nhân viên đăng nhập Merchant Portal bằng tài khoản của mình và chỉ nhìn thấy các menu được cấp quyền.
- Ghi nhận card/giao dịch theo tên nhân viên thực hiện.
- Theo dõi số card đã tạo, doanh số/thanh toán đã xử lý và hoa hồng của từng nhân viên.
- Giữ lịch sử thao tác của nhân viên ngay cả khi nhân viên bị Inactive hoặc Deleted.

## 3. Phạm vi

### 3.1 Trong phạm vi phase này

- Tạo mục `Staff Management` trong `Settings`.
- Quản lý danh sách nhân viên.
- Thêm nhân viên bằng VLINK ID.
- Cho nhân viên tham gia bằng QR cố định của merchant.
- Gán role `Cashier` và bật/tắt quyền nghiệp vụ trong role cho từng nhân viên.
- Quản lý trạng thái nhân viên: Active, Inactive, Deleted.
- Cho phép nhân viên tự xoá mình khỏi merchant.
- Tạo sẵn role mặc định `Cashier` trong phase này.
- Cấu hình hạn mức tạo Card tối đa theo ngày cho role `Cashier`.
- Cấu hình % hoa hồng chung cho từng nhân viên.
- Tính hoa hồng trên số tiền tạo card thành công.
- Ghi nhận log các hoạt động chính của nhân viên.
- Gửi email cho Merchant Owner khi có nhân viên tham gia bằng QR.

### 3.2 Ngoài phạm vi phase này

- Role-based permission nâng cao như Owner, Manager, Viewer hoặc các role khác ngoài `Cashier`.
- Giới hạn theo số lượng card/giao dịch hoặc hạn mức riêng cho từng nhân viên ngoài hạn mức theo role `Cashier`.
- Lọc report/order/payment theo nhân viên.
- Phân quyền chi tiết theo từng product bên trong card type.
- Cấu hình % hoa hồng riêng theo từng card type/module.
- Báo cáo hoa hồng theo kỳ ngày/tháng/khoảng thời gian.
- Ẩn thông tin nhạy cảm trong Product Management cho nhân viên.
- Technical design và test cases.

## 4. Actor

### 4.1 Merchant Owner

Là chủ tài khoản merchant, có quyền:

- Truy cập `Settings > Staff Management`.
- Thêm nhân viên bằng VLINK ID.
- Cho nhân viên tham gia bằng QR cố định.
- Xem danh sách nhân viên.
- Tìm kiếm/lọc nhân viên.
- Xem chi tiết nhân viên.
- Chỉnh quyền của nhân viên.
- Chỉnh % hoa hồng của nhân viên.
- Chuyển nhân viên sang Active/Inactive.
- Xoá mềm nhân viên.
- Xem số card đã tạo, doanh số/thanh toán đã xử lý của nhân viên.

### 4.2 Staff/Nhân viên

Là tài khoản được thêm vào merchant, có quyền:

- Đăng nhập Merchant Portal bằng tài khoản của chính mình.
- Thấy các menu được Merchant Owner bật quyền.
- Thực hiện các nghiệp vụ được cấp quyền.
- Xem lịch sử thanh toán/reload do chính mình thực hiện theo phạm vi quyền.
- Tự xoá mình khỏi merchant.

## 5. Vị trí chức năng

`Staff Management` nằm trong `Settings`, cùng cấp với các mục setting hiện có như Receive Payment Setup, Membership Program và các setting tương tự.

Màn `Staff Management` gồm các tab/khu vực:

- `Staff List`
- `Invite by VLINK ID`
- `Invite by QR`

## 6. Flow nghiệp vụ chính

### 6.1 Merchant Owner thêm nhân viên bằng VLINK ID

1. Merchant Owner vào `Settings > Staff Management`.
2. Merchant Owner chọn tab/khu vực `Invite by VLINK ID`.
3. Merchant Owner nhập VLINK ID của nhân viên.
4. Nếu VLINK ID hợp lệ, hệ thống thêm nhân viên vào merchant ngay.
5. Nhân viên được thêm với trạng thái `Active`.
6. Nhân viên được gán role mặc định `Cashier`, nhưng các quyền bên trong role mặc định ban đầu là trống/tắt.
7. % hoa hồng mặc định được reset về mặc định khi thêm mới hoặc khôi phục từ trạng thái Deleted.
8. Merchant Owner có thể vào chi tiết nhân viên để bật quyền và nhập % hoa hồng.

### 6.2 Trường hợp VLINK ID không hợp lệ

Khi Merchant Owner nhập VLINK ID, hệ thống cần thông báo cho Merchant Owner nếu:

- VLINK ID không tồn tại.
- VLINK ID không hợp lệ.
- Nhân viên đã tham gia merchant này.
- Tài khoản không thể thêm vào Staff Management.

Thông báo business cần thể hiện rõ nhân viên không thể được thêm hoặc đã tham gia rồi.

### 6.3 Nhân viên tham gia bằng QR cố định

1. Merchant Owner vào `Settings > Staff Management`.
2. Merchant Owner mở tab/khu vực `Invite by QR`.
3. Hệ thống hiển thị QR cố định của merchant.
4. Nhân viên quét QR để tham gia merchant.
5. Nhân viên tự điền thông tin gồm:
   - Tên
   - Phone
   - Email
6. Hệ thống thêm nhân viên vào Staff Management ngay.
7. Nhân viên được thêm với trạng thái `Active`.
8. Nhân viên được gán role mặc định `Cashier`, nhưng các quyền bên trong role mặc định ban đầu là trống/tắt.
9. Merchant Owner nhận email thông báo có nhân viên mới tham gia bằng QR.

### 6.4 Nhân viên đăng nhập khi chưa có quyền

Nếu nhân viên đã được thêm vào Staff Management nhưng chưa được bật quyền nào:

- Nhân viên vẫn đăng nhập Merchant Portal bằng tài khoản của mình.
- Portal hiển thị trạng thái trống.
- Hệ thống hiển thị thông báo nhân viên chưa được cấp quyền.
- Không hiển thị các menu nghiệp vụ.

### 6.5 Nhân viên đăng nhập sau khi được cấp quyền

1. Nhân viên đăng nhập Merchant Portal bằng tài khoản của mình.
2. Hệ thống kiểm tra quyền mà Merchant Owner đã bật.
3. Nhân viên chỉ thấy các menu/tính năng tương ứng với quyền được bật.
4. Các menu/tính năng chưa được bật sẽ bị ẩn hoàn toàn.

## 7. Danh sách nhân viên

### 7.1 Thông tin hiển thị

Danh sách Staff Management cần hiển thị:

- Tên nhân viên
- VLINK ID
- Email
- Phone
- Role
- Trạng thái
- Quyền đang bật
- Số card đã tạo
- Doanh số/thanh toán đã xử lý

Email và phone hiển thị theo chuẩn mask hiện có của portal.

### 7.2 Trạng thái mặc định của danh sách

- Mặc định danh sách chỉ hiển thị nhân viên `Active`.
- Nhân viên `Inactive` và `Deleted` chỉ hiển thị khi Merchant Owner dùng bộ lọc trạng thái.

### 7.3 Tìm kiếm và lọc

Staff Management cần hỗ trợ tìm kiếm theo:

- Tên
- Email
- Phone

Staff Management cần hỗ trợ lọc theo:

- Trạng thái

Không cần lọc theo khoảng thời gian tham gia hoặc doanh số trong phase này.

### 7.4 Thao tác trên từng nhân viên

Merchant Owner có thể thực hiện các thao tác:

- Xem chi tiết nhân viên
- Chỉnh quyền
- Chỉnh % hoa hồng
- Chuyển Active/Inactive
- Xoá mềm nhân viên
- Xem lịch sử hoạt động/card/payment theo phạm vi phase này

## 8. Chi tiết nhân viên

Màn chi tiết nhân viên cần hiển thị:

- Thông tin nhân viên
- VLINK ID
- Email
- Phone
- Role
- Trạng thái
- Quyền đang bật
- % hoa hồng
- Số card đã tạo
- Tổng doanh số/thanh toán đã xử lý

Các chỉ số số card đã tạo, doanh số/thanh toán đã xử lý và hoa hồng được tính theo toàn bộ lịch sử của nhân viên, không chỉ tính khi nhân viên đang Active.

## 9. Trạng thái nhân viên

### 9.1 Danh sách trạng thái

Nhân viên có 3 trạng thái:

- `Active`
- `Inactive`
- `Deleted`

### 9.2 Inactive

Khi Merchant Owner chuyển nhân viên sang `Inactive`:

- Nhân viên bị ngắt quyền ngay lập tức.
- Nếu nhân viên đang đăng nhập portal, hệ thống cần ngắt session/quyền ngay.
- Nhân viên không còn thấy hoặc thao tác được các menu nghiệp vụ.
- Nhân viên vẫn xuất hiện trong Staff Management khi lọc trạng thái `Inactive`.
- Merchant Owner có thể bật lại thành `Active`.
- Lịch sử card/giao dịch cũ vẫn giữ tên nhân viên.

### 9.3 Deleted

`Deleted` là trạng thái xoá mềm để giữ lịch sử.

Khi Merchant Owner xoá nhân viên:

- Trạng thái nhân viên chuyển thành `Deleted`.
- Nhân viên bị ngắt quyền ngay lập tức.
- Nếu nhân viên đang đăng nhập portal, hệ thống cần ngắt session/quyền ngay.
- Nhân viên không còn thấy hoặc thao tác được các menu nghiệp vụ.
- Lịch sử card/giao dịch cũ vẫn giữ tên nhân viên.
- Nhân viên `Deleted` không hiển thị mặc định trong danh sách, chỉ hiển thị khi lọc trạng thái.

### 9.4 Nhân viên tự xoá mình khỏi merchant

Nhân viên có thể tự xoá mình khỏi merchant.

Khi nhân viên tự xoá:

- Trạng thái chuyển thành `Deleted`.
- Quyền bị ngắt ngay.
- Không gửi email/thông báo cho Merchant Owner.
- Lịch sử card/giao dịch cũ vẫn giữ tên nhân viên.

### 9.5 Thêm lại nhân viên ở trạng thái Deleted

Nếu nhân viên đã từng ở trạng thái `Deleted` được thêm lại bằng VLINK ID hoặc QR:

- Hệ thống khôi phục bản ghi cũ.
- Trạng thái chuyển về `Active`.
- Quyền bên trong role được reset về trống/tắt.
- % hoa hồng được reset về mặc định.
- Lịch sử cũ vẫn được giữ.

## 10. Role và quyền nghiệp vụ

Phase này có role mặc định `Cashier` để Merchant Owner gán cho nhân viên. Role này đại diện cho một nhóm quyền nghiệp vụ được tạo sẵn. Tất cả quyền bên trong role đều có thể được Merchant Owner bật/tắt cho từng nhân viên.

### 10.1 Role mặc định

Phase này tạo sẵn 1 role:

- `Cashier`

Khi nhân viên mới được thêm vào merchant, hệ thống gán role mặc định `Cashier` cho nhân viên. Tuy nhiên, các quyền bên trong role vẫn mặc định là trống/tắt cho tới khi Merchant Owner bật.

### 10.2 Role Cashier

Role `Cashier` bao gồm các nhóm quyền:

- Tạo card
- Payment
- Reload Card
- Xem Product Management
- Giới hạn tạo Card theo ngày

Merchant Owner có quyền bật/tắt tất cả quyền thuộc role này cho từng nhân viên, gồm bật/tắt tạo card theo card type, bật/tắt từng loại payment, bật/tắt Reload Card và bật/tắt Xem Product Management. Merchant Owner cũng có thể cấu hình hạn mức tạo Card tối đa theo ngày cho role `Cashier`.

Trong phạm vi quyền payment, role này áp dụng cho các quyền thanh toán được Merchant Owner bật cho nhân viên, gồm:

- Gift Card Payment
- Crypto Card Payment

### 10.3 Nhóm quyền Tạo card

Quyền Tạo card được bật/tắt theo card type.

Các card type cần hỗ trợ theo danh sách hiện có:

- Gift Card
- Crypto Card
- Membership
- E-Gift Card
- Voucher
- Promotion
- Discount
- Prepaid Card
- Các card type khác nếu có trong hệ thống

`All` được hiểu là thao tác bật/tắt toàn bộ nhóm quyền tạo card theo card type.

Khi nhân viên được bật quyền tạo card cho một card type:

- Nhân viên thấy menu/tab tương ứng.
- Nhân viên được thực hiện đầy đủ flow tạo/issue card, gồm:
  - Xem/chọn card
  - Nhập thông tin khách hàng
  - Chọn product/card
  - Nhập amount
  - Xem preview
  - Confirm
  - Issue card

Khi nhân viên không được bật quyền cho card type:

- Menu/tab của card type đó bị ẩn hoàn toàn.
- Nhân viên không thể thao tác tạo card cho card type đó.

Nhân viên có thể tạo card ở các module khác nếu Merchant Owner bật loại card tương ứng.

Trong phase này, với quyền Tạo card, nhân viên chỉ cần tạo card mới; chưa cần xem lịch sử card đã tạo.

### 10.4 Giới hạn tạo Card theo ngày

Merchant Owner có thể cấu hình hạn mức tạo Card tối đa theo ngày cho role `Cashier`.

Rule giới hạn tạo Card:

- Hạn mức được cấu hình theo amount/ngày, ví dụ `1,000 USD/ngày`.
- Hạn mức áp dụng cho nhân viên thuộc role `Cashier` khi thực hiện tạo card.
- Hạn mức áp dụng trên các card type mà nhân viên được bật quyền tạo card.
- Hệ thống kiểm tra tổng amount card nhân viên đã tạo trong ngày trước khi cho phép tạo card mới.
- Nếu card mới làm tổng amount trong ngày vượt quá hạn mức, nhân viên không được tiếp tục tạo/issue card đó.
- Chỉ card issue thành công được tính vào hạn mức đã sử dụng trong ngày.
- Hạn mức được reset theo ngày.

Trong phase này, hạn mức tạo Card là cấu hình theo role `Cashier`, không cấu hình riêng theo từng nhân viên.

### 10.5 Quyền Reload Card

`Reload Card` là một quyền riêng, không gộp vào Tạo card hoặc Thanh toán.

Quyền Reload Card áp dụng cho tất cả card type có hỗ trợ tính năng reload.

Khi được bật quyền:

- Nhân viên có thể thực hiện reload card theo các card type hỗ trợ.
- Nhân viên có thể xem lịch sử reload do chính mình thực hiện.

Khi bị tắt quyền:

- Menu/tính năng reload bị ẩn hoặc không cho thao tác.
- Nếu nhân viên đang ở màn reload, quyền bị tắt ngay và nhân viên không được tiếp tục thao tác.

### 10.6 Quyền Thanh toán

Quyền Thanh toán có 2 loại bật/tắt riêng:

- Gift Card Payment
- Crypto Card Payment

Khi được bật quyền tương ứng:

- Nhân viên được thực hiện thanh toán cho khách theo loại payment được bật.
- Nhân viên được xem lịch sử thanh toán do chính mình thực hiện.

Khi không được bật quyền:

- Menu/tính năng payment tương ứng bị ẩn hoàn toàn.
- Nhân viên không thể thực hiện payment tương ứng.

### 10.7 Quyền Xem Product Management

Quyền `Xem Product Management` là một quyền bật/tắt riêng.

Khi được bật:

- Nhân viên thấy menu Product Management.
- Nhân viên được xem toàn bộ Product Management giống Merchant Owner trong phase này.
- Nhân viên xem được tất cả product/card type, kể cả những card type nhân viên không được quyền tạo.

Khi bị tắt:

- Nhân viên không thấy menu Product Management.
- Nhân viên không thể truy cập Product Management.

Việc ẩn thông tin nhạy cảm như cost/profit/margin sẽ được làm chi tiết ở phase sau nếu cần.

## 11. Hiệu lực thay đổi quyền

Khi Merchant Owner chỉnh quyền của nhân viên:

- Quyền có hiệu lực ngay.
- Nhân viên không cần đăng nhập lại.
- Không gửi thông báo cho nhân viên.

Nếu quyền bị tắt trong lúc nhân viên đang ở menu/tính năng đó:

- Quyền bị tắt ngay.
- Menu/tính năng bị ẩn hoặc không còn truy cập được.
- Nhân viên không được hoàn tất thao tác đang làm.
- Hệ thống đưa nhân viên về trạng thái không có quyền hoặc màn phù hợp.

## 12. Hoa hồng nhân viên

### 12.1 Cấu hình hoa hồng

Merchant Owner có ô nhập `% hoa hồng` cho từng nhân viên.

Rule nhập % hoa hồng:

- Cho phép số thập phân tối đa 1 chữ số sau dấu phẩy.
- Không được nhỏ hơn 0.
- Không giới hạn tối đa trong phase này.

Phase này dùng một mức % hoa hồng chung cho từng nhân viên. Các phase sau có thể nâng cấp cấu hình % riêng theo từng card type/module.

### 12.2 Điều kiện tính hoa hồng

Hoa hồng được tính trên số tiền tạo card của `Issue Digital`.

Nhân viên được ghi nhận hoa hồng khi:

- Nhân viên tạo card để bán cho khách hàng.
- Card được issue thành công.

`Bán thành công` trong phase này được hiểu là card issue thành công.

### 12.3 Điều chỉnh hoa hồng

Nếu card/giao dịch bị huỷ, refund, failed hoặc void sau khi đã ghi nhận hoa hồng:

- Hoa hồng của nhân viên bị trừ lại.
- Tổng hoa hồng/doanh số của nhân viên được cập nhật lại.

## 13. Ghi nhận người thực hiện

Khi nhân viên tạo card, reload card hoặc thanh toán:

- Card/giao dịch được ghi nhận theo tên nhân viên thực hiện.
- Thông tin hiển thị kèm gồm:
  - Thời gian
  - VLINK ID
  - Tên nhân viên

Không cần phân biệt trong lịch sử nhân viên được thêm bởi Merchant Owner qua VLINK ID hay tự tham gia bằng QR.

## 14. Log hoạt động

Hệ thống cần ghi nhận log các hoạt động chính của nhân viên:

- Tạo card
- Thanh toán Gift Card
- Thanh toán Crypto Card
- Reload Card

Log được dùng để biết card/giao dịch được thực hiện bởi nhân viên nào.

## 15. Email thông báo

### 15.1 Trường hợp gửi email

Khi nhân viên tham gia merchant bằng QR, hệ thống gửi email thông báo cho Merchant Owner.

Không cần gửi email khi:

- Merchant Owner chỉnh quyền nhân viên.
- Merchant Owner chỉnh % hoa hồng.
- Nhân viên tự xoá mình khỏi merchant.

### 15.2 Người nhận email

Email chỉ gửi cho Merchant Owner.

### 15.3 Nội dung email

Email cần có:

- Tên nhân viên
- VLINK ID
- Thời gian tham gia
- Merchant name
- Nội dung nhắc Merchant Owner vào `Staff Management` để bật quyền cho nhân viên

## 16. Các rule business bổ sung

- Mỗi lần Merchant Owner chỉ thêm 1 nhân viên bằng VLINK ID.
- QR tham gia là QR cố định của merchant.
- Nhân viên tham gia bằng QR được thêm ngay, không cần Merchant Owner duyệt trước.
- Nhân viên mới tham gia được gán role mặc định `Cashier`, nhưng quyền bên trong role mặc định là trống/tắt.
- Menu/tính năng chưa được cấp quyền phải ẩn hoàn toàn khỏi giao diện nhân viên.
- Lịch sử card/giao dịch cũ luôn giữ tên nhân viên thực hiện, kể cả khi nhân viên bị Inactive hoặc Deleted.
- Staff Management không cần giới hạn số lượng card/giao dịch nhân viên được tạo hoặc xử lý trong phase này; chỉ áp dụng hạn mức amount tạo Card theo ngày cho role `Cashier`.

## 17. Edge cases

### 17.1 VLINK ID đã tham gia merchant

Nếu Merchant Owner nhập VLINK ID của nhân viên đã tham gia merchant:

- Không thêm trùng.
- Hiển thị thông báo nhân viên đã tham gia hoặc không hợp lệ.

### 17.2 VLINK ID không tồn tại/không hợp lệ

Nếu VLINK ID không tồn tại hoặc không hợp lệ:

- Không thêm nhân viên.
- Hiển thị thông báo không hợp lệ cho Merchant Owner.

### 17.3 Nhân viên đang thao tác thì bị tắt quyền

Nếu Merchant Owner tắt quyền khi nhân viên đang thao tác:

- Quyền bị ngắt ngay.
- Nhân viên không được hoàn tất thao tác.
- Menu/tính năng tương ứng bị ẩn hoặc không còn truy cập được.

### 17.4 Nhân viên đang đăng nhập thì bị Inactive/Deleted

Nếu nhân viên đang đăng nhập portal:

- Hệ thống ngắt quyền/session ngay.
- Nhân viên không thể tiếp tục thao tác các nghiệp vụ của merchant.

### 17.5 Nhân viên ở trạng thái Deleted tham gia lại

Nếu nhân viên ở trạng thái Deleted tham gia lại bằng QR hoặc được thêm lại bằng VLINK ID:

- Khôi phục bản ghi cũ.
- Reset quyền bên trong role về trống/tắt.
- Reset % hoa hồng về mặc định.
- Giữ lịch sử cũ.

### 17.6 Vượt hạn mức tạo Card trong ngày

Nếu nhân viên thuộc role `Cashier` tạo card làm tổng amount trong ngày vượt quá hạn mức Merchant Owner đã cấu hình:

- Không cho nhân viên tiếp tục tạo/issue card đó.
- Hiển thị thông báo nhân viên đã vượt hạn mức tạo Card trong ngày.
- Nhân viên chỉ có thể tiếp tục tạo card khi sang ngày mới hoặc khi Merchant Owner điều chỉnh hạn mức.

## 18. Các điểm cần hỏi PO sau

- Màn/kỳ báo cáo hoa hồng: xem ở đâu, theo ngày/tháng/khoảng thời gian hay theo tùy chọn khác.
- Cần chốt currency và mốc reset ngày cho hạn mức tạo Card theo ngày nếu merchant có nhiều currency hoặc hoạt động nhiều timezone.
- Có cần ẩn thông tin nhạy cảm trong Product Management cho nhân viên không.
- Có cần mở rộng % hoa hồng riêng theo card type/module không.
- Có cần lọc Sales Orders/card/payment theo nhân viên trong các phase sau không.
- Có cần bổ sung role-based permission nâng cao như Owner, Manager, Viewer hoặc các role khác ngoài `Cashier` không.
- Có cần bổ sung thông báo cho nhân viên khi quyền hoặc % hoa hồng thay đổi không.
- Có cần hiển thị lịch sử card đã tạo của nhân viên trong portal nhân viên không.
