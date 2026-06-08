# Admin Charity — Text Mockups (7 Screens)

> Design pattern: Hero panel → KPI cards → Filter toolbar → Data table.  
> Dựa trên design language của `charity/admin/` (Modern Luxury Gold).

---

## Screen 1 — Purposes List (`charity-purposes.html`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [← Back]                                                            │
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║  Charity purpose                                              ║  │
│  ║  Purpose management                                          ║  │
│  ║  Manage donation categories · toggle visibility · reorder    ║  │
│  ║                                           [badge: Catalog]   ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐  │
│  │ Total        │ │ Active       │ │ Inactive     │ │ Last added│  │
│  │     8        │ │     6        │ │     2        │ │  Today    │  │
│  │ All purposes │ │ Shown to     │ │ Hidden from  │ │ Food      │  │
│  │ in catalog   │ │ donors       │ │ donors       │ │ Support   │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘  │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Purpose catalog                          [badge: Drag to reorder]  │
│  Manage categories shown to donors. Toggle to hide/show.           │
│                                                                     │
│  [🔍 Search by name or code...    ] [All status ▾] [+ Add purpose] │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Purposes                                        [8 records]  │   │
│  │ Sort order is applied live on the donor gift flow.           │   │
│  ├────┬──────────────┬────────────┬───────┬────────┬───────────┤   │
│  │ ☰  │ Icon & Name  │ Code       │ Sort  │ Status │ Actions   │   │
│  ├────┼──────────────┼────────────┼───────┼────────┼───────────┤   │
│  │ ⠿  │ 🍲 Food      │ FOOD_SUPP  │  1    │ ●Active│ Edit  ⏻   │   │
│  │ ⠿  │ 📚 Education │ EDUCATION  │  2    │ ●Active│ Edit  ⏻   │   │
│  │ ⠿  │ 🏥 Health    │ HEALTH     │  3    │ ●Active│ Edit  ⏻   │   │
│  │ ⠿  │ 🌱 Environ.  │ ENV_CARE   │  4    │ ○Off   │ Edit  ⏻   │   │
│  └────┴──────────────┴────────────┴───────┴────────┴───────────┘   │
│                                                                     │
│  ℹ️  Drag rows (⠿) to reorder. Changes save automatically.         │
└─────────────────────────────────────────────────────────────────────┘
```

**Controls:**
- Drag handle (⠿) mỗi row → gọi `PUT /purposes/reorder`
- Toggle button (⏻) → gọi `POST /purposes/{id}/toggle`, badge đổi Active/Off
- Edit button → mở Modal Screen 2
- Add purpose → mở Modal Screen 2 (mode create)

---

## Screen 2 — Purpose Create / Edit Modal

```
┌────────────────────────────────────────────┐
│  ✦ Add new purpose              [✕ Close]  │
│  ─────────────────────────────────────────  │
│                                            │
│  Purpose code *                            │
│  [  FOOD_SUPPORT                        ]  │
│  Max 50 chars · Cannot be changed later    │
│                            ← disabled khi edit
│                                            │
│  Display name *                            │
│  [  Food Support                        ]  │
│  Max 200 chars                             │
│                                            │
│  Icon image                                │
│  ┌──────────────────────────────────────┐  │
│  │  📎 Drop image here or click         │  │
│  │     .jpg .jpeg .png .gif · max 10MB  │  │
│  │  [current: food-icon.png  ✕]         │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Sort order *                              │
│  [  1                                   ]  │
│  Must be ≥ 0                               │
│                                            │
│  ─────────────────────────────────────────  │
│           [Cancel]        [Save purpose →] │
└────────────────────────────────────────────┘
```

**Controls:**
- `code` field: disabled khi edit mode
- Icon: preview ảnh hiện tại khi edit; nếu không upload file mới → giữ nguyên
- Error toast: `InvalidCharityPurposeIconImageFormat`, `InvalidCharityPurposeIconImageSize`, duplicate code

---

## Screen 3 — Batches List (`charity-batches.html`)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║  Voucher batch                                                ║  │
│  ║  Batch management                                             ║  │
│  ║  Group pending vouchers · track distribution · close batches ║  │
│  ║                                        [badge: Distribution]  ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐  │
│  │ Total batches│ │ In Progress  │ │ Distributed  │ │ Completed │  │
│  │     24       │ │     5        │ │     8        │ │    11     │  │
│  │ All time     │ │ status=0     │ │ status=1     │ │ status=2  │  │
│  │              │ │ Needs action │ │ Partial done │ │ Closed    │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘  │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Voucher batches                                                    │
│  Each batch groups all pending vouchers for one purpose.            │
│                                                                     │
│  [Purpose ▾          ] [Status ▾     ] [+ Create batch]            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Batches                                        [24 records]  │   │
│  │ Ordered by created date descending.                          │   │
│  ├──────┬────────────┬──────────┬───────────┬──────┬───────────┤   │
│  │  ID  │ Purpose    │ Total    │Distributed│ Vchr │ Status    │   │
│  ├──────┼────────────┼──────────┼───────────┼──────┼───────────┤   │
│  │  #24 │ Food Supp  │$1,000.00 │  $250.00  │  5   │●InDistrib │   │
│  │  #23 │ Education  │$2,500.00 │$2,500.00  │ 12   │●Distribut │   │
│  │  #22 │ Health     │  $800.00 │  $800.00  │  4   │✓Completed │   │
│  └──────┴────────────┴──────────┴───────────┴──────┴───────────┘   │
│  [< Prev]  Page 1 of 3  [Next >]                                    │
└─────────────────────────────────────────────────────────────────────┘
```

**Controls:**
- Filter Purpose: dropdown từ danh sách purposes (`/purposes?isActive=true`)
- Filter Status: `All / InDistribution (0) / Distributed (1) / Completed (2)`
- Row click hoặc icon → mở Screen 5 (Batch Detail)
- Create batch → mở Modal Screen 4

---

## Screen 4 — Create Batch Modal

```
┌────────────────────────────────────────────┐
│  ✦ Create new batch             [✕ Close]  │
│  ─────────────────────────────────────────  │
│                                            │
│  Select purpose *                          │
│  [  Food Support ▾                      ]  │
│  Only active purposes shown                │
│                                            │
│  ℹ️  The batch will include ALL pending    │
│     vouchers for the selected purpose.     │
│     Vouchers must share the same currency. │
│                                            │
│  ─────────────────────────────────────────  │
│           [Cancel]       [Create batch →]  │
└────────────────────────────────────────────┘
```

**Error states:**
- `PurposeNotFound` → "Purpose not found or inactive"
- `NoPendingVouchersForBatch` → "No pending vouchers available for this purpose"
- `MixedVoucherCurrenciesInBatch` → "Vouchers have mixed currencies — cannot create batch"

---

## Screen 5 — Batch Detail (`charity-batch-detail.html`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [← Back to Batches]                                                 │
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║  Batch #24 · Food Support                                     ║  │
│  ║  Voucher batch detail                                         ║  │
│  ║  Manage distributions, upload proofs, close batch             ║  │
│  ║                                   [badge: ●In Distribution]   ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                                                     │
│  ┌─────────────────────────────┐  ┌──────────────────────────────┐  │
│  │ Batch summary               │  │ Distribution progress         │  │
│  │ ─────────────────────       │  │ ──────────────────────────    │  │
│  │ Purpose   Food Support      │  │ Total amount   $1,000.00      │  │
│  │ Currency  USD               │  │ Distributed      $250.00      │  │
│  │ Vouchers  5                 │  │ Remaining        $750.00      │  │
│  │ Created   08 Jun 2026       │  │                               │  │
│  │                             │  │ ████░░░░░░░░  25%            │  │
│  └─────────────────────────────┘  └──────────────────────────────┘  │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Add distribution                                                   │
│  Plan a new disbursement to a recipient from this batch.            │
│                                                                     │
│  [Recipient name...              ] [Amount (USD)  ] [+ Add]        │
│  ⚠️  Total distributions cannot exceed $1,000.00                   │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Distributions                                         [1 record]   │
│  Upload proof and mark each distribution complete.                  │
│  ┌──────┬───────────────────┬─────────┬────────┬──────────────────┐ │
│  │  ID  │ Recipient         │ Amount  │ Status │ Actions          │ │
│  ├──────┼───────────────────┼─────────┼────────┼──────────────────┤ │
│  │ #100 │ Community Kitchen │$250.00  │●Pending│ 📎Proof  ✓Done   │ │
│  │      │                   │         │        │ [View proof]     │ │
│  └──────┴───────────────────┴─────────┴────────┴──────────────────┘ │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  ⚠️  Note: completing the batch does NOT require all distributions  │
│     to be finished. Verify manually before proceeding.             │
│                                                                     │
│                              [Complete batch →]  ← disabled if Completed
└─────────────────────────────────────────────────────────────────────┘
```

**Controls:**
- Add Distribution: inline form → `POST /batches/{id}/distributions`
- 📎 Proof button: file picker (jpg/jpeg/png only, 10MB) → `POST .../proof`; sau upload hiện [View proof] link
- ✓ Done button: confirm dialog → `PUT .../complete`; row status → Completed, button disabled
- Complete batch: confirm dialog → `POST /batches/{id}/complete`; toàn bộ form/buttons disabled
- Khi batch `Completed`: Add Distribution ẩn, mọi action row disabled

---

## Screen 6 — Redemptions List (`charity-redemptions.html`)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║  Merchant redemption                                          ║  │
│  ║  Redemption review                                            ║  │
│  ║  Review merchant proof · approve payout · reject with reason  ║  │
│  ║                                        [badge: Payout flow]   ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐  │
│  │ Total        │ │ Pending      │ │ Approved     │ │ Rejected  │  │
│  │    142       │ │     18       │ │    112       │ │    12     │  │
│  │ All requests │ │ Needs review │ │ Wallet paid  │ │ Returned  │  │
│  │              │ │ Act now ⚡   │ │              │ │           │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘  │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Redemption queue                      [badge: Maker-checker flow]  │
│  Review proof submissions from merchants before releasing payout.   │
│                                                                     │
│  [Status ▾      ] [Merchant ID...] [From: dd/mm/yyyy] [To: ...]   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Redemptions                                   [142 records]  │   │
│  │ Ordered by submitted date descending.                        │   │
│  ├──────┬────────────┬──────────┬───────────┬──────┬───────────┤   │
│  │  ID  │ Merchant   │ Card code│ Purpose   │  Amt │ Status    │   │
│  ├──────┼────────────┼──────────┼───────────┼──────┼───────────┤   │
│  │ #200 │ Merchant A │ ABCD1234 │ Food Supp │$50   │●Pending   │   │
│  │ #199 │ Merchant B │ WXYZ5678 │ Education │$120  │✓Approved  │   │
│  │ #198 │ Merchant C │ MNOP9012 │ Health    │$75   │✕Rejected  │   │
│  └──────┴────────────┴──────────┴───────────┴──────┴───────────┘   │
│  [< Prev]  Page 1 of 8  [Next >]                                    │
└─────────────────────────────────────────────────────────────────────┘
```

**Controls:**
- Status filter: `All / Pending (0) / Approved (1) / Rejected (2)` → query `filter.status=0`
- Merchant ID: text input → `filter.merchantId=...`
- Date range: 2 date inputs → `filter.dateFrom=` / `filter.dateTo=` (ISO format)
- Row click → mở Screen 7 (Redemption Detail)

---

## Screen 7 — Redemption Detail (`charity-redemption-detail.html`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [← Back to Redemptions]                                             │
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║  Redemption #200                                              ║  │
│  ║  Merchant proof review                                        ║  │
│  ║  Verify proof · approve wallet payout · reject with reason    ║  │
│  ║                                          [badge: ●Pending]    ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                                                     │
│  ┌─────────────────────────────┐  ┌──────────────────────────────┐  │
│  │ Redemption detail           │  │ Proof image                   │  │
│  │ ─────────────────────       │  │ ──────────────────────────    │  │
│  │ Merchant    Merchant A      │  │                               │  │
│  │ Merchant ID 12345           │  │   ┌─────────────────────┐    │  │
│  │ Card code   ABCD123456      │  │   │                     │    │  │
│  │ Purpose     Food Support    │  │   │   [proof image]     │    │  │
│  │ Amount      $50.00 USD      │  │   │                     │    │  │
│  │ Submitted   08 Jun 2026     │  │   └─────────────────────┘    │  │
│  │ Status      ●Pending        │  │   [🔍 Open full size]        │  │
│  └─────────────────────────────┘  └──────────────────────────────┘  │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Review decision          ← chỉ hiện khi proofStatus = Pending (0) │
│                                                                     │
│  ℹ️  Approving will credit $50.00 USD directly to merchant wallet.  │
│                                                                     │
│              [✕ Reject with reason]    [✓ Approve payout →]        │
│                                                                     │
│  ─── Rejection reason ──────────── ← hiện sau khi bị Rejected ────  │
│  "Proof image is unreadable"                                        │
└─────────────────────────────────────────────────────────────────────┘
```

**Reject Modal (overlay khi bấm Reject):**
```
┌────────────────────────────────────────────┐
│  ✕ Reject redemption #200      [✕ Close]  │
│  ─────────────────────────────────────────  │
│                                            │
│  Rejection reason *                        │
│  ┌──────────────────────────────────────┐  │
│  │ Proof image is unreadable...         │  │
│  │                                      │  │
│  └──────────────────────────────────────┘  │
│  Required · merchant will be notified      │
│                                            │
│  ─────────────────────────────────────────  │
│           [Cancel]     [Confirm reject →]  │
└────────────────────────────────────────────┘
```

**Controls:**
- Approve: confirm dialog → `POST /redemptions/{id}/approve`; hiển thị dynamic error từ WalletService nếu lỗi
- Reject: mở modal → `POST /redemptions/{id}/reject` với `{ reason }` bắt buộc
- Cả 2 buttons ẩn hoàn toàn khi `proofStatus ≠ 0 (Pending)`
- Rejection reason section chỉ hiện khi status = Rejected

---

## Tóm tắt file sẽ tạo

| File | Route |
|------|-------|
| `charity/admin/charity-purposes.html` | Purposes list + modals |
| `charity/admin/charity-batches.html` | Batches list |
| `charity/admin/charity-batch-detail.html` | Batch detail + distributions |
| `charity/admin/charity-redemptions.html` | Redemptions list |
| `charity/admin/charity-redemption-detail.html` | Redemption detail |

Modals (Create/Edit Purpose, Create Batch, Reject Reason) inline trong trang tương ứng.
