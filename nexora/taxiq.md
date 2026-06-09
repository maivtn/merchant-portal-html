# Tax IQ Quick Deduction Optimizer — Enhancement Specification

## 1. Mục tiêu enhance

Màn hình hiện tại cần được nâng cấp từ một “tax calculator” đơn giản thành một màn hình con trong Tax IQ có tên:

**Tax IQ Quick Deduction Optimizer**

Mục tiêu của màn hình là giúp Owner hoặc Staff nhập nhanh thông tin thu nhập, chọn các khoản deduction phổ biến trong ngành nail, upload receipt/proof, nhận AI review và xem ước tính tax savings ở mức tham khảo.

Màn hình này không phải màn hình khai thuế chính thức. Đây là công cụ hỗ trợ ước tính, chuẩn bị dữ liệu và gợi ý deduction để user biết nên bổ sung thông tin gì trước khi gửi CPA hoặc tax professional.

---

## 2. Vấn đề hiện tại cần sửa

Màn hình hiện tại có một số điểm chưa phù hợp với Tax IQ thật:

1. Badge “IRS Approved” không nên dùng vì có rủi ro pháp lý nếu sản phẩm chưa được IRS chứng nhận.
2. Màn hình chưa phân biệt role Owner và Staff.
3. Deduction category còn quá ít, chưa đủ cho ngành nail.
4. Expense item chỉ có checkbox, chưa có trạng thái như Missing Receipt, Needs CPA Review, Ready.
5. Chưa có upload receipt/proof cho từng expense.
6. Tax estimate chỉ hiển thị số cuối, chưa có breakdown.
7. CTA “AI-Powered Tax Optimization” nghe quá mạnh, dễ tạo cảm giác AI đang tối ưu thuế chính thức.
8. Chưa có disclaimer rõ ràng rằng đây chỉ là estimate và cần CPA review.
9. Filing status và children đang chiếm vị trí quá nổi bật, làm màn hình giống app khai thuế chính thức hơn là deduction assistant.

---

## 3. Hướng định vị mới

Đổi màn hình thành:

**Tax IQ Quick Deduction Optimizer**

Subtitle đề xuất:

**AI-assisted deduction review for nail salon owners and technicians.**

Không dùng wording:

* IRS Approved
* Guaranteed tax savings
* Official tax filing
* Tax optimization guaranteed

Dùng wording an toàn hơn:

* AI Assisted
* CPA-Ready
* Estimate Only
* Review Recommended
* Tax Prep Support

Badge ở góc phải nên đổi từ:

**IRS Approved**

thành một trong các option:

* **AI Assisted**
* **CPA-Ready**
* **Estimate Only**
* **Review Recommended**

Khuyến nghị dùng:

**AI Assisted • CPA Review Recommended**

---

## 4. Cấu trúc màn hình mới

Màn hình cần chia thành 5 block chính:

1. Tax Profile
2. Deduction Search & Suggestions
3. Actual Expenses
4. Estimated Tax Summary
5. Next Actions

---

## 5. Block 1 — Tax Profile

### Purpose

Cho user nhập thông tin cơ bản để hệ thống hiểu user là Owner hay Staff và gợi ý category phù hợp.

### Fields

* Role

  * Salon Owner
  * Nail Technician / Staff

* Tax Year

  * Default current year

* Estimated Annual Gross Income

  * Input amount

* Worker / Business Classification

  * Nếu role là Staff:

    * 1099 Independent Contractor
    * W2 Employee
    * Booth Renter
    * Multi-salon Worker
  * Nếu role là Owner:

    * Salon Owner
    * Multi-location Owner
    * Owner with W2 Staff
    * Owner with 1099 Contractors
    * Mixed Staff Model

* Filing Status

  * Single
  * Married Filing Jointly
  * Married Filing Separately
  * Head of Household
  * Optional field, không nên làm quá nổi bật

* Qualifying Children

  * Optional field
  * Có thể để trong “Advanced Tax Profile”

### UX note

Role phải nằm ở vị trí đầu tiên vì toàn bộ deduction suggestion phụ thuộc vào role.

### Tooltip cho Worker Classification

Text đề xuất:

**This helps estimate tax treatment. Worker classification should be confirmed with a CPA or tax professional.**

---

## 6. Block 2 — Deduction Search & Suggestions

### Purpose

Giúp user tìm nhanh các deduction phổ biến trong ngành nail.

### Search placeholder

Đổi placeholder thành:

**Search deductible items, receipts, or business expenses**

### Quick chips

Hiển thị chips ngay dưới search:

* Nail Supplies
* Booth Rent
* Mileage
* Phone
* Tools
* License
* CPA Fee
* Marketing
* Gift Card
* Payroll

### Suggested Deduction Cards

Thay vì chỉ có 2 card như hiện tại, cần có cards theo role.

Nếu role là Staff, hiển thị:

* Business Mileage Deductions
* Nail Supplies & Specialized Kits
* Booth Rent / Station Rent
* Phone & Internet Business-use
* License & Education
* Tools & Equipment

Nếu role là Owner, hiển thị:

* Salon Supplies
* Rent & Facility
* Payroll & Staff Cost
* Tip Paid by Salon
* Gift Card & Membership Liability
* Equipment & Assets
* Marketing & Advertising
* Tax Payments

### Card content

Mỗi suggested card cần có:

* Icon
* Title
* Short description
* Potential max write-off hoặc estimate range
* Risk badge nếu cần CPA review

Example:

**🚗 Business Mileage Deductions**
Track client visits, supply runs, bank trips, and travel between salons.
Badge: **Needs Mileage Log**

---

## 7. Block 3 — Actual Expenses

### Purpose

Cho user chọn hoặc nhập expense thật để đưa vào deduction estimate.

### Expense item structure

Mỗi expense card cần gồm:

* Checkbox
* Icon
* Expense name
* Amount
* Short description
* Status badge
* Receipt/proof state
* Action button

### Required statuses

Expense item phải có các status sau:

* Ready
* Missing Receipt
* Needs Info
* Needs CPA Review
* Partially Deductible
* Not Deductible
* Draft

### Example expense cards

#### Mileage

Title: **Mileage**
Subtitle: **1,500 business miles**
Amount: **Estimated deduction: $1,005**
Status: **Needs Mileage Log**
Action: **Add Trip Details**

#### Gel Polish, Brushes, UV Lamp

Title: **Gel Polish, Brushes, UV Lamp**
Subtitle: **Nail supplies purchased for client services**
Amount: **$450**
Status: **Missing Receipt**
Action: **Upload Receipt**

#### State Board License Fee

Title: **State Board License Fee**
Subtitle: **Education & professional license**
Amount: **$150**
Status: **Ready**
Action: **View Details**

#### Booth Rent

Title: **Booth Rent**
Subtitle: **Booth rental deduction**
Amount: **$1,200**
Status: **Missing Proof**
Action: **Upload Proof**

#### Phone / Internet

Title: **Phone & Internet**
Subtitle: **Used for booking, client communication and social media**
Amount: **$960 annual bill**
Status: **Partially Deductible**
Business-use: **70%**
Deductible amount: **$672**
Action: **Confirm Business-use %**

---

## 8. Add New Expense interaction

Cần có nút:

**+ Add Expense**

Khi bấm mở bottom sheet hoặc modal với options:

* Add Manually
* Upload Receipt
* Ask Tax IQ
* Add Mileage
* Add Recurring Expense

Nếu user chọn Add Manually, mở form:

* Category
* Item name
* Amount
* Date
* Vendor
* Business purpose
* Receipt/proof upload
* Business-use %
* Notes

---

## 9. Receipt / Proof interaction

Mỗi expense cần có action liên quan receipt:

* Upload Receipt
* Upload Proof
* Replace Receipt
* View Receipt
* Mark as No Receipt
* Ask CPA Review

Nếu receipt bị thiếu, item status là:

**Missing Receipt**

Nếu receipt bị mờ hoặc thiếu dữ liệu:

**Needs More Info**

Nếu nghi duplicate:

**Duplicate Review**

---

## 10. AI Review behavior

Đổi CTA chính từ:

**AI-Powered Tax Optimization**

thành:

**Review with Tax IQ**

Hoặc:

**Ask Tax IQ to Review**

Sau khi user bấm, AI trả về panel review gồm:

* Suggested deductions
* Missing receipts
* Missing business-use %
* Items needing CPA review
* Potential estimated savings
* Non-deductible warning nếu có
* Next actions

### AI status

AI review phải dùng các status:

* Deductible
* Partially Deductible
* Needs CPA Review
* Not Deductible

### AI disclaimer

Luôn hiển thị:

**Estimate only. This is not tax advice. Final tax treatment should be reviewed by a CPA or tax professional.**

---

## 11. Block 4 — Estimated Tax Summary

Hiện tại chỉ hiển thị:

* Estimated Tax Liability
* Tax Savings

Cần đổi thành breakdown rõ hơn.

### Fields cần hiển thị

* Gross Income
* Selected Deductions
* Estimated Taxable Income
* Estimated Tax Liability
* Estimated Savings
* Items Missing Proof
* Items Needing CPA Review

### Example

**Estimated Tax Summary**

* Gross Income: **$55,000**
* Selected Deductions: **$2,805**
* Estimated Taxable Income: **$52,195**
* Estimated Tax Liability: **$12,808**
* Estimated Savings: **$406**
* Missing Receipt: **2 items**
* Needs CPA Review: **1 item**

### Warning text

Dưới summary cần có text:

**This estimate is for planning only and may change after CPA review, filing status, state tax rules, and final income adjustments.**

---

## 12. Block 5 — Next Actions

Primary CTA:

**Review with Tax IQ**

Secondary CTA:

**Save Draft**

Third CTA:

**Export Draft Report**

Optional CTA:

**Share with CPA**

### CTA hierarchy

Primary button nên dùng màu nổi bật nhất.

Secondary button nên dùng outline hoặc neutral style.

Không nên dùng CTA gây hiểu nhầm như:

* Optimize My Taxes
* Maximize IRS Refund
* Guaranteed Write-off

---

## 13. UI/UX yêu cầu

### Visual direction

Giữ style hiện tại:

* Dark premium fintech style
* Rounded cards
* Purple/blue accent
* Compact but readable layout
* Strong contrast
* Modern SaaS dashboard feel

### Cần cải thiện

* Tăng spacing giữa các section
* Thêm section heading rõ ràng
* Status badge phải dễ nhìn
* Checkbox không nên là yếu tố chính duy nhất
* Mỗi expense card nên có quick action
* Summary phải có breakdown
* Disclaimer cần nhỏ nhưng dễ thấy

### Responsive

Desktop:

* 2-column layout cho Tax Profile
* Expense cards 2 columns
* Summary sticky hoặc full-width bottom card

Mobile:

* 1-column layout
* Quick chips scroll ngang
* Expense card full width
* CTA sticky bottom
* Form dài mở full-screen step form

---

## 14. Copywriting đề xuất

### Header

**NEXORA Tax IQ**

Subtitle:

**AI-assisted deduction review for nail salon owners and technicians.**

Badge:

**AI Assisted • CPA Review Recommended**

### Search label

**Quick Search: Deductible Categories**

Placeholder:

**Search deductible items, receipts, or business expenses**

### Expense section title

**Select Your Actual Expenses**

Subtitle:

**Choose items you paid for. Tax IQ will check receipts, missing info, and CPA review needs.**

### Summary section title

**Estimated Tax Summary**

### Main CTA

**Review with Tax IQ**

### Disclaimer

**Estimate only. This is not tax advice. Final tax treatment should be reviewed by a CPA or tax professional.**

---

## 15. Business rules cần áp dụng

1. Không hiển thị “IRS Approved”.
2. AI chỉ gợi ý, không kết luận thay CPA.
3. Nếu expense thiếu receipt thì status là Missing Receipt.
4. Nếu expense thuộc high-risk category thì status là Needs CPA Review nếu thiếu proof.
5. Nếu item dùng chung cá nhân/business thì bắt buộc business-use %.
6. Nếu chưa có business-use %, item không được tính vào Final Export.
7. Draft item không tính vào total deduction.
8. High-risk unresolved items phải hiển thị warning.
9. Draft Report vẫn cho export, nhưng phải có watermark.
10. Final Export không nằm trong màn hình này, chỉ gợi ý user sang Year-End Export Center.

---

## 16. Data mẫu cho UI demo

Use these sample values:

* Product: NEXORA Tax IQ
* Gross Income: $55,000
* Role: Staff / Nail Technician
* Worker Classification: 1099 Independent Contractor
* Filing Status: Single
* Qualifying Children: 0 children

Sample expenses:

1. Mileage

   * 1,500 miles
   * Estimated deduction: $1,005
   * Status: Needs Mileage Log

2. Gel Polish, Brushes, UV Lamp

   * Amount: $450
   * Status: Missing Receipt

3. State Board License Fee

   * Amount: $150
   * Status: Ready

4. Booth Rent

   * Amount: $1,200
   * Status: Missing Proof

5. Phone & Internet

   * Annual amount: $960
   * Business-use: 70%
   * Deductible amount: $672
   * Status: Partially Deductible

Estimated summary:

* Gross Income: $55,000
* Selected Deductions: $2,805
* Estimated Taxable Income: $52,195
* Estimated Tax Liability: $12,808
* Estimated Savings: $406
* Missing Receipt: 2 items
* Needs CPA Review: 1 item

---

## 17. Output AI cần tạo

AI cần enhance lại màn hình hiện tại thành một UI hoàn chỉnh gồm:

1. Updated header
2. Removed IRS Approved badge
3. Added Owner/Staff role selector
4. Improved Tax Profile block
5. Improved deduction search with quick chips
6. More suggested deduction cards
7. Enhanced actual expense cards with status and actions
8. Receipt/proof upload actions
9. AI review CTA renamed to Review with Tax IQ
10. Estimated Tax Summary breakdown
11. Clear disclaimer
12. Save Draft and Export Draft Report buttons
13. Mobile responsive behavior
14. Consistent dark premium visual style

Final UI should feel like a real Tax IQ feature, not a generic tax calculator.
