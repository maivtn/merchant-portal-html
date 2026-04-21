# Acceptance Criteria - Charity Admin Funding Flow

**Module:** Charity Admin / Funding Operations  
**Scope:** Admin quản lý nguồn tiền, phân bổ nguồn tiền và đối soát cho tính năng `charity/charity-gift.html`  
**Last updated:** 2026-04-21

---

## 1. Mục đích nghiệp vụ

Admin là backend operation layer cho luồng `charity-gift`:

- Người dùng ở `charity/charity-gift.html` tạo giao dịch donation / charity gift.
- Tiền được ghi nhận vào nguồn quỹ trung gian, chờ admin phân bổ.
- Admin duyệt, gom batch, phân bổ theo mục đích, theo chiến dịch, hoặc theo merchant/beneficiary.
- Khi giải ngân xong, admin upload proof, đóng batch, và hệ thống ghi audit trail.

Luồng này không phải luồng mua hàng trực tiếp của end-user, mà là luồng **quản trị tiền vào / tiền ra / trạng thái phân bổ** của hệ thống charity.

---

## 2. Actor & Responsibility

### 2.1 Actor chính

- **Super Admin**
  - Quản lý cấu hình nguồn tiền, pool, quyền hạn, ngưỡng duyệt.
  - Xem tổng quan inflow / outflow / pending funds.

- **Finance / Accountant**
  - Tạo batch phân bổ.
  - Chuẩn bị chứng từ payout.
  - Upload proof of payout.

- **Manager / Checker**
  - Duyệt hoặc từ chối batch.
  - Kiểm tra maker-checker.

- **Auditor / Compliance**
  - Xem audit trail, export CSV/PDF, kiểm tra lịch sử thay đổi.

### 2.2 Đối tượng nghiệp vụ

- Donation transaction
- Funding pool
- Batch distribution
- Settlement record
- Audit trail
- Proof of payout

---

## 3. Phạm vi màn hình admin

### 3.1 Dashboard

- Hiển thị tổng inflow, total outflow, pending funds, platform fees.
- Hiển thị chart cash flow theo thời gian.
- Hiển thị alert cho merchant overdue, batch waiting checker, idle fund.

### 3.2 Pool Management

- Tạo và quản lý các nguồn quỹ theo mục đích:
  - Food Support
  - Children Education
  - Healthcare
  - Elderly Care
  - Disaster Relief
  - Scholarship Programs
- Xem total received, distributed, available balance.
- Vào trang detail để xem lịch sử batch của từng pool.

### 3.3 Batch Distribution

- Tạo batch giải ngân.
- Chọn beneficiary list.
- Gửi tới checker duyệt.
- Upload proof of payout.
- Đóng batch sau khi payout hoàn tất.

### 3.4 Merchant Settlement

- Gom các giao dịch redeemed theo merchant.
- Tạo payout settlement.
- Theo dõi overdue.

### 3.5 Audit Trail

- Theo dõi mọi hành động insert-only.
- Không cho sửa/xóa log.

---

## 4. Business Flow Tổng Quan

### Flow A - Nguồn tiền vào

1. User tạo donation / charity gift ở `charity-gift.html`.
2. Hệ thống ghi nhận giao dịch thành công.
3. Tiền được đưa vào pending pool hoặc pool cụ thể theo purpose.
4. Admin dashboard cập nhật inflow.
5. Finance xác nhận nguồn tiền và chuẩn bị phân bổ.

### Flow B - Phân bổ nguồn tiền

1. Finance tạo batch distribution.
2. Chọn pool, purpose, danh sách beneficiary, số tiền.
3. Gửi checker duyệt.
4. Checker approve / reject.
5. Nếu approve, finance upload proof of payout.
6. Batch được đóng, balance pool giảm tương ứng.

### Flow C - Đối soát và settlement

1. Các giao dịch redeemed được gom theo merchant.
2. Merchant settlement record được tạo.
3. Nếu overdue, hiển thị cảnh báo.
4. Sau khi payout xong, admin xác nhận settled.

### Flow D - Audit và kiểm tra

1. Mọi thao tác quan trọng được ghi audit trail.
2. Auditor tra cứu theo time / user / action / target / IP.
3. Export báo cáo khi cần.

---

## 5. Trạng thái nghiệp vụ

### 5.1 Funding Pool

- `ACTIVE`
- `MONITORING`
- `LOW_BALANCE`
- `SUSPENDED`

### 5.2 Batch Distribution

- `DRAFT`
- `PENDING_CHECKER`
- `APPROVED`
- `REJECTED`
- `PAID`
- `CLOSED`

### 5.3 Settlement

- `PENDING`
- `OVERDUE`
- `PAID`
- `CLOSED`

### 5.4 Donation / Gift Transaction

- `PENDING`
- `SUCCESS`
- `FAILED`
- `REDEEMED`
- `REFUNDED`

---

## 6. Acceptance Criteria - Dashboard

### FR-1: Funding Overview

- [ ] Hiển thị 4 KPI chính:
  - Total inflow
  - Total outflow
  - Pending funds
  - Platform fees
- [ ] KPI phải phản ánh dữ liệu tổng hợp theo toàn hệ thống.
- [ ] Giá trị tiền hiển thị format currency rõ ràng.
- [ ] Dashboard load mặc định trong < 2s với data mock / cached.

### FR-2: Cash Flow Chart

- [ ] Hiển thị chart inflow vs outflow theo thời gian.
- [ ] Có legend rõ ràng cho inflow, outflow, net balance.
- [ ] Tooltip phải hiển thị đúng giá trị từng điểm dữ liệu.
- [ ] Chart responsive trên desktop/tablet.

### FR-3: Alert Center

- [ ] Hiển thị cảnh báo overdue merchant.
- [ ] Hiển thị batch chờ checker.
- [ ] Hiển thị idle fund khi pool không giải ngân quá lâu.
- [ ] Click alert phải điều hướng được đến màn hình liên quan.

---

## 7. Acceptance Criteria - Pool Management

### FR-4: Pool List

- [ ] Hiển thị danh sách pool theo mục đích.
- [ ] Mỗi pool phải có:
  - Total received
  - Distributed
  - Available balance
  - Status
- [ ] Click card pool phải mở pool detail.

### FR-5: Pool Detail

- [ ] Hiển thị thông tin pool và lịch sử batch.
- [ ] Cho phép tạo batch mới từ pool đang chọn.
- [ ] Batch history phải phân biệt trạng thái distributed / pending / completed.
- [ ] Pool available balance phải cập nhật sau khi batch đóng.

### FR-6: Pool Validation

- [ ] Không cho tạo batch lớn hơn available balance.
- [ ] Không cho đóng pool nếu còn batch pending.
- [ ] Pool `LOW_BALANCE` phải được highlight rõ.

---

## 8. Acceptance Criteria - Batch Distribution

### FR-7: Create Batch

- [ ] Finance tạo batch với Batch ID duy nhất.
- [ ] Chọn purpose/pool đúng nghiệp vụ.
- [ ] Nhập checker, maker note, và danh sách beneficiary.
- [ ] Batch mặc định ở trạng thái `DRAFT`.

### FR-8: Maker-Checker

- [ ] Maker chỉ được tạo và gửi batch.
- [ ] Checker mới có quyền approve/reject.
- [ ] Nếu reject, batch quay về `REJECTED`.
- [ ] Nếu approve, batch chuyển sang `APPROVED`.

### FR-9: Proof of Payout

- [ ] Batch chỉ được `CLOSED` sau khi upload proof.
- [ ] Proof có thể là PDF/JPG/PNG hoặc file tham chiếu tương đương.
- [ ] Proof phải gắn với batch ID và lưu audit trail.

### FR-10: Batch Completion

- [ ] Khi batch hoàn tất, distributed amount phải trừ vào pool balance.
- [ ] Batch status chuyển sang `PAID` hoặc `CLOSED`.
- [ ] Tất cả thay đổi phải log vào audit trail.

---

## 9. Acceptance Criteria - Merchant Settlement

### FR-11: Settlement Ledger

- [ ] Gom các giao dịch redeemed theo merchant.
- [ ] Hiển thị redeemd cards count, current payable, overdue.
- [ ] Merchant overdue phải có badge cảnh báo.

### FR-12: Payout Confirmation

- [ ] Cho phép nhập payout reference.
- [ ] Cho phép upload proof.
- [ ] Sau confirm settled, record phải chuyển sang `PAID` hoặc `CLOSED`.
- [ ] Không cho sửa record đã closed nếu không có quyền đặc biệt.

---

## 10. Acceptance Criteria - Audit Trail

### FR-13: Immutable Audit

- [ ] Audit trail chỉ cho INSERT.
- [ ] Không được sửa hoặc xóa log.
- [ ] Mỗi log phải có: time, user, action, target, IP.

### FR-14: Traceability

- [ ] Mọi hành động quan trọng đều ghi log:
  - Create batch
  - Approve batch
  - Reject batch
  - Upload proof
  - Close settlement
  - Update pool status
- [ ] Auditor có thể lọc theo user, action, target.

---

## 11. Business Rules

- [ ] Số tiền phân bổ không được vượt quá available balance của pool.
- [ ] Batch chưa có checker duyệt thì không được payout.
- [ ] Batch đã có proof thì không được sửa amount.
- [ ] Merchant settlement phải có proof trước khi close.
- [ ] Log audit phải được ghi cho mọi thay đổi quan trọng.
- [ ] Pending funds phải được tách rõ với outflow đã giải ngân.
- [ ] Funding allocation phải theo đúng purpose/pool mapping.

---

## 12. Mapping với UI hiện tại

### Admin screens liên quan

- `charity/admin/index.html`
  - Dashboard nguồn tiền
- `charity/admin/pools.html`
  - Danh sách pool
- `charity/admin/pool-detail.html`
  - Chi tiết pool và batch history
- `charity/admin/batch-distribution.html`
  - Tạo và duyệt batch
- `charity/admin/settlement.html`
  - Đối soát merchant
- `charity/admin/merchant-detail.html`
  - Chi tiết settlement
- `charity/admin/transactions.html`
  - Tra cứu giao dịch
- `charity/admin/transaction-detail.html`
  - Chi tiết vòng đời transaction
- `charity/admin/audit.html`
  - Nhật ký kiểm toán
- `charity/admin/refund.html`
  - Luồng hoàn tiền
- `charity/admin/rbac.html`
  - Phân quyền

### End-user screen liên quan

- `charity/charity-gift.html`
  - Người dùng khởi tạo donation / charity gift
  - Tạo nguồn tiền đầu vào cho admin xử lý

---

## 13. Validation / Error Handling

- [ ] Nếu available balance = 0 thì không được tạo batch mới.
- [ ] Nếu checker chưa duyệt thì nút payout phải disabled.
- [ ] Nếu proof chưa upload thì batch không được close.
- [ ] Nếu merchant overdue quá ngưỡng thì hiển thị trạng thái danger.
- [ ] Nếu record không tìm thấy thì hiển thị empty state rõ ràng.
- [ ] Nếu người dùng không đủ quyền thì ẩn hoặc disable action tương ứng.

---

## 14. Test Scenarios

- [ ] Tạo donation thành công ở `charity-gift.html` và xác nhận admin dashboard cập nhật inflow.
- [ ] Tạo batch từ pool hợp lệ, gửi checker, approve, upload proof, close batch.
- [ ] Tạo batch vượt balance và phải bị chặn.
- [ ] Merchant settlement quá hạn phải hiển thị overdue badge.
- [ ] Audit log phải ghi nhận đầy đủ action tạo batch, duyệt batch, upload proof.
- [ ] User không có quyền checker không thể approve payout.

---

## 15. Out of Scope

- [ ] Không định nghĩa UI chi tiết của `charity-gift.html` ở file này.
- [ ] Không mô tả logic payment gateway cụ thể.
- [ ] Không mô tả blockchain implementation chi tiết.
- [ ] Không mô tả schema database đầy đủ.

---

## 16. Notes

- File này là AC nghiệp vụ cho admin back office, không phải spec của màn hình khách hàng.
- Nếu cần, có thể tách thêm 3 file con:
  - Funding Overview AC
  - Batch Distribution AC
  - Settlement & Audit AC

