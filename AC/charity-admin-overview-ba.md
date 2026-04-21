# Charity Admin Overview

## 1. Tổng quan

`Charity Admin` là hệ thống back-office dùng để vận hành phần charity phía sau.

Nếu phần user side là nơi người dùng tạo giao dịch, thì phần admin là nơi nội bộ:
- quản lý quỹ,
- tạo và duyệt batch,
- theo dõi payout,
- đối soát merchant,
- xử lý refund,
- kiểm tra proof,
- theo dõi audit,
- phân quyền và bảo mật.

Nói ngắn gọn:
- user side tạo hoạt động charity,
- admin side quản lý hậu trường của hoạt động đó.

---

## 2. Mục tiêu của Charity Admin

Charity Admin cần giải quyết 6 bài toán vận hành chính:

### 2.1. Quản lý nguồn quỹ
Biết quỹ nào đang có bao nhiêu tiền, đang hoạt động hay tạm dừng.

### 2.2. Quản lý phân bổ
Biết batch nào đang chờ duyệt, đang giải ngân hoặc đã hoàn tất.

### 2.3. Quản lý settlement với merchant
Theo dõi payable, overdue, proof of payout và dispute.

### 2.4. Quản lý ngoại lệ
Xử lý refund, failed payout, missing proof, overdue approval, mismatch số liệu.

### 2.5. Quản lý kiểm soát nội bộ
Lưu audit trail, maker-checker, role-based permissions.

### 2.6. Hỗ trợ compliance và niềm tin
Đảm bảo hệ thống charity có thể kiểm tra, đối soát và chứng minh được dòng tiền.

---

## 3. Nhóm người dùng trong admin

### 3.1. Accountant / Operations
Theo dõi pool, batch, settlement, refund và proof.

### 3.2. Manager / Checker
Phê duyệt hoặc từ chối các nghiệp vụ nhạy cảm.

### 3.3. Finance Admin
Xử lý reconciliation, settlement close, điều chỉnh tài chính.

### 3.4. Support
Tra cứu transaction, refund request và các case liên quan.

### 3.5. Auditor
Xem log, đối chiếu và kiểm tra luồng xử lý nhưng không can thiệp vận hành.

---

## 4. Các màn hình chính của Charity Admin

## 4.1. Dashboard

### Mục đích
Là màn hình tổng quan đầu tiên khi admin vào hệ thống.

### Vai trò
Giúp admin biết nhanh tình hình hiện tại:
- tổng số quỹ,
- số batch đang chạy,
- payout đang chờ,
- merchant overdue,
- alert cần xử lý.

### Nội dung chính
- KPI cards,
- chart tổng quan,
- recent activities,
- alert summary,
- quick links.

### Kết quả mong đợi
Admin mở vào là biết toàn cảnh hệ thống đang ổn hay đang có vấn đề.

---

## 4.2. Pool Management

### Mục đích
Quản lý các quỹ charity trong hệ thống.

### Vai trò
Là nơi trả lời câu hỏi:
- hiện có bao nhiêu pool,
- mỗi pool còn bao nhiêu tiền,
- pool nào active / paused / closed.

### Nội dung chính
- pool name / code,
- current balance,
- allocated amount,
- available amount,
- status,
- action xem chi tiết / chỉnh sửa.

### Kết quả mong đợi
Admin quản lý được nguồn tiền gốc trước khi phân bổ xuống batch.

---

## 4.3. Batch Distribution

### Mục đích
Quản lý việc tạo và theo dõi các batch phân bổ từ quỹ.

### Vai trò
Đây là trung tâm vận hành payout của charity.

### Nội dung chính
- batch ID,
- pool nguồn,
- batch amount,
- beneficiary count,
- created by,
- approval status,
- payout status,
- action view / approve / reject / release.

### Kết quả mong đợi
Admin nhìn rõ batch nào đang draft, pending approval, approved, in payout hoặc completed.

---

## 4.4. Batch Detail

### Mục đích
Hiển thị đầy đủ thông tin của một batch cụ thể.

### Vai trò
Giúp admin xem sâu batch ở mức vận hành.

### Nội dung chính
- batch summary,
- pool nguồn,
- danh sách beneficiary,
- allocation breakdown,
- approval timeline,
- proof / payout info,
- audit notes.

### Kết quả mong đợi
Admin hiểu đầy đủ batch từ lúc tạo đến lúc hoàn tất.

---

## 4.5. Merchant Settlement

### Mục đích
Quản lý công nợ và thanh toán với merchant hoặc partner.

### Vai trò
Theo dõi số tiền cần đối soát và thanh toán cho merchant.

### Nội dung chính
- merchant name,
- settlement cycle,
- payable amount,
- paid amount,
- overdue status,
- proof status,
- action view detail / upload proof / settle.

### Kết quả mong đợi
Admin không bị mù công nợ với merchant.

---

## 4.6. Settlement Detail

### Mục đích
Mở chi tiết một settlement record.

### Vai trò
Cho admin biết settlement đó được tạo từ đâu và đang ở trạng thái nào.

### Nội dung chính
- merchant info,
- cycle date,
- payable breakdown,
- transaction list,
- proof of payout,
- adjustment history,
- action settle / dispute / retry / attach file.

### Kết quả mong đợi
Settlement được xử lý đúng nghĩa, không chỉ là danh sách tĩnh.

---

## 4.7. Transactions

### Mục đích
Hiển thị toàn bộ giao dịch liên quan đến charity.

### Vai trò
Là nơi tra cứu chung theo transaction ID, batch, merchant, user hoặc status.

### Nội dung chính
- transaction ID,
- source type,
- amount,
- date,
- status,
- linked batch / settlement / refund,
- action view detail.

### Kết quả mong đợi
Support, finance và ops có một chỗ chung để lookup giao dịch.

---

## 4.8. Refund List

### Mục đích
Quản lý toàn bộ yêu cầu hoàn tiền.

### Vai trò
Là điểm tập trung của các case refund.

### Nội dung chính
- refund ID,
- source type,
- linked transaction,
- amount,
- reason,
- requested by,
- status,
- created date,
- action.

### Kết quả mong đợi
Admin không bỏ sót refund và biết case nào đang ở trạng thái nào.

---

## 4.9. Refund Detail

### Mục đích
Xem chi tiết và xử lý một refund request.

### Vai trò
Là nơi maker-checker diễn ra cho nghiệp vụ refund.

### Nội dung chính
- refund information,
- linked source,
- reason,
- amount,
- destination,
- evidence,
- approval workflow,
- audit history,
- action approve / reject / mark refunded.

### Kết quả mong đợi
Refund được xử lý có kiểm soát và lưu vết đầy đủ.

---

## 4.10. Beneficiary List

### Mục đích
Quản lý danh sách đơn vị hoặc đối tượng nhận tiền từ charity.

### Vai trò
Là danh bạ payout của hệ thống.

### Nội dung chính
- beneficiary code,
- beneficiary name,
- type,
- bank account,
- verification status,
- risk level,
- last payout,
- action.

### Kết quả mong đợi
Admin kiểm soát được người nhận tiền thay vì nhập tay từng lần.

---

## 4.11. Beneficiary Detail

### Mục đích
Hiển thị hồ sơ đầy đủ của một beneficiary.

### Vai trò
Là nơi xác minh khả năng nhận tiền của beneficiary.

### Nội dung chính
- profile,
- legal info,
- bank info,
- document checklist,
- compliance result,
- payout history,
- risk note,
- action verify / suspend / request update.

### Kết quả mong đợi
Giảm rủi ro chuyển tiền sai người hoặc cho beneficiary chưa đủ điều kiện.

---

## 4.12. Proof Review Queue

### Mục đích
Quản lý hàng chờ các file proof cần kiểm tra.

### Vai trò
Là nơi duyệt chứng từ tập trung.

### Nội dung chính
- proof ID,
- linked record,
- proof type,
- uploaded by,
- uploaded date,
- file type,
- status,
- action approve / reject / request re-upload.

### Kết quả mong đợi
Proof không bị rải rác và có quy trình duyệt rõ ràng.

---

## 4.13. Exception Center

### Mục đích
Gom toàn bộ lỗi và case bất thường vào một nơi.

### Vai trò
Là trung tâm xử lý sự cố vận hành.

### Nội dung chính
- exception ID,
- category,
- reference,
- severity,
- owner,
- SLA,
- status,
- action retry / assign / escalate / close.

### Kết quả mong đợi
Ops không bỏ sót các vấn đề như failed payout, missing proof, overdue approval.

---

## 4.14. Settlement Dispute

### Mục đích
Xử lý tranh chấp hoặc điều chỉnh settlement với merchant.

### Vai trò
Là nơi giải quyết khi merchant không đồng ý với số liệu.

### Nội dung chính
- dispute info,
- settlement info,
- disputed amount,
- reason,
- affected transactions,
- adjustment records,
- resolution workflow,
- action approve adjustment / reject dispute.

### Kết quả mong đợi
Settlement minh bạch hơn và mọi điều chỉnh đều được lưu vết.

---

## 4.15. Ledger & Reconciliation

### Mục đích
Đối chiếu dòng tiền ở mức tài chính tổng thể.

### Vai trò
Xác nhận số liệu vận hành khớp với số liệu tài chính.

### Nội dung chính
- opening balance,
- inflow,
- outflow,
- payable,
- refund,
- fee,
- closing balance,
- reconciliation status,
- unmatched records.

### Kết quả mong đợi
Finance và admin trả lời được câu hỏi: tiền có đang khớp sổ không?

---

## 4.16. Alert Center Full Screen

### Mục đích
Quản lý đầy đủ các cảnh báo thay vì chỉ xem tóm tắt trên dashboard.

### Vai trò
Là nơi điều phối các alert cần xử lý.

### Nội dung chính
- alert ID,
- alert type,
- severity,
- owner,
- triggered time,
- SLA,
- status,
- action assign / escalate / resolve.

### Kết quả mong đợi
Alert trở thành một phần của quy trình xử lý công việc.

---

## 4.17. Audit Trail

### Mục đích
Ghi lại lịch sử thao tác của admin trong hệ thống.

### Vai trò
Là lớp bảo vệ quan trọng cho charity admin.

### Nội dung chính
- time,
- user,
- action,
- target,
- IP / device,
- notes / reason.

### Kết quả mong đợi
Hệ thống có thể truy ngược ai đã làm gì, lúc nào và trên đối tượng nào.

---

## 4.18. RBAC & Security

### Mục đích
Quản lý vai trò và quyền truy cập.

### Vai trò
Đảm bảo đúng người, đúng quyền, đúng phạm vi thao tác.

### Nội dung chính
- role list,
- module access,
- action permissions,
- user assignment,
- security restrictions,
- maker-checker rule.

### Kết quả mong đợi
Giảm rủi ro lạm quyền hoặc thao tác sai vai trò.

---

## 4.19. Permission Matrix Detail

### Mục đích
Hiển thị quyền chi tiết theo vai trò và theo hành động.

### Vai trò
Là bản luật thật để dev, QA và admin hiểu đúng quyền hệ thống.

### Nội dung chính
- danh sách action,
- role columns,
- trạng thái allow / deny / view only,
- restriction notes,
- special rules như maker cannot approve own batch.

### Kết quả mong đợi
Không còn mơ hồ chuyện role nào được làm tới đâu.

