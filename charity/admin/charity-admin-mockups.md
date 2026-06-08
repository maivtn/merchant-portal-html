# Admin Charity — Text Mockups (7 Screens)

> Design pattern: Hero panel → KPI cards → Filter toolbar → Data table.  
> Dựa trên design language của `charity/admin/` (Modern Luxury Gold).  
> API spec: `charity/charity-gift-card-admin-api-spec.md`

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
- Drag handle (⠿) mỗi row → `PUT /api/admin/charity/purposes/reorder`
- Toggle button (⏻) → `POST /api/admin/charity/purposes/{id}/toggle`, badge đổi Active/Off
- Edit button → mở Modal Screen 2 (edit mode)
- Add purpose → mở Modal Screen 2 (create mode)

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

**API:**
- Create: `POST /api/admin/charity/purposes` (multipart/form-data)
- Update: `PUT /api/admin/charity/purposes/{id}` (multipart/form-data)

**Controls:**
- `code` field: disabled khi edit mode (`code` không updateable)
- Icon: preview ảnh hiện tại khi edit; không upload → giữ nguyên `iconUrl`
- Error toast: `InvalidCharityPurposeIconImageFormat`, `InvalidCharityPurposeIconImageSize`, `"Purpose code already exists."`

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
│  [Purpose ▾          ] [Status ▾     ]            [+ Create batch] │
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

**API:** `GET /api/admin/charity/batches?filter.purposeId=1&filter.status=0&pageIndex=0&pageSize=20`

**Controls:**
- Filter Purpose: dropdown từ `/api/admin/charity/purposes?isActive=true`
- Filter Status: `All / InDistribution (0) / Distributed (1) / Completed (2)`
- Row click → Screen 5 (Batch Detail)
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

**API:** `POST /api/admin/charity/batches` → body: `{ "purposeId": 1 }`

**Error states (toast):**
| Error code | Message hiển thị |
|------------|-----------------|
| `PurposeNotFound` | "Purpose not found or inactive" |
| `NoPendingVouchersForBatch` | "No pending vouchers available for this purpose" |
| `MixedVoucherCurrenciesInBatch` | "Vouchers have mixed currencies — cannot create batch" |

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
│  Add distribution            ← ẩn khi batch status = Completed     │
│  Plan a new disbursement to a recipient from this batch.            │
│                                                                     │
│  [Recipient name...              ] [Amount (USD)  ] [+ Add]        │
│  ⚠️  Total distributions cannot exceed $1,000.00                   │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Distributions                                         [1 record]   │
│  Upload proof and mark each distribution complete.                  │
│  ┌──────┬───────────────────┬─────────┬────────────┬──────────────┐ │
│  │  ID  │ Recipient         │ Amount  │ Status     │ Actions      │ │
│  ├──────┼───────────────────┼─────────┼────────────┼──────────────┤ │
│  │ #100 │ Community Kitchen │$250.00  │ ●Pending   │ 📎 Upload    │ │
│  │      │                   │         │            │ ✓ Complete   │ │
│  ├──────┼───────────────────┼─────────┼────────────┼──────────────┤ │
│  │ #101 │ School B          │$500.00  │ ✓Completed │ 🔍 View proof│ │
│  │      │                   │         │ 08/06 09:00│              │ │
│  └──────┴───────────────────┴─────────┴────────────┴──────────────┘ │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  ⚠️  Completing the batch does NOT require all distributions to be  │
│     finished. Verify manually before proceeding.                   │
│                                                                     │
│                              [Complete batch →]                     │
│                    ← button disabled khi status = Completed         │
└─────────────────────────────────────────────────────────────────────┘
```

**API calls:**
- Load: `GET /api/admin/charity/batches/{id}`
- Add distribution: `POST /api/admin/charity/batches/{id}/distributions`
- Upload proof: `POST /api/admin/charity/batches/{id}/distributions/{distId}/proof` (multipart)
- Complete distribution: `PUT /api/admin/charity/batches/{id}/distributions/{distId}/complete`
- Complete batch: `POST /api/admin/charity/batches/{id}/complete`

**Controls:**
- 📎 Upload: file picker `.jpg/.jpeg/.png` only (không phải .gif), max 10MB; sau upload → hiện "🔍 View proof"
- ✓ Complete: confirm dialog trước khi gọi API
- Khi batch `Completed`: Add Distribution section ẩn, tất cả actions row disabled

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
│  [Status ▾      ] [Merchant ID...  ] [From: dd/mm/yyyy] [To: ...] │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Redemptions                                   [142 records]  │   │
│  │ Ordered by submitted date descending.                        │   │
│  ├──────┬────────────┬──────────┬───────────┬──────┬───────────┤   │
│  │  ID  │ Merchant   │ Card code│ Purpose   │  Amt │ Status    │   │
│  ├──────┼────────────┼──────────┼───────────┼──────┼───────────┤   │
│  │ #200 │ Merchant A │ ABCD1234 │ Food Supp │ $50  │ ●Pending  │   │
│  │ #199 │ Merchant B │ WXYZ5678 │ Education │$120  │ ✓Approved │   │
│  │ #198 │ Merchant C │ MNOP9012 │ Health    │ $75  │ ✕Rejected │   │
│  └──────┴────────────┴──────────┴───────────┴──────┴───────────┘   │
│  [< Prev]  Page 1 of 8  [Next >]                                    │
└─────────────────────────────────────────────────────────────────────┘
```

**API:** `GET /api/admin/charity/redemptions?filter.status=0&filter.merchantId=123&filter.dateFrom=...&filter.dateTo=...`

**Controls:**
- Status: `All / Pending (0) / Approved (1) / Rejected (2)`
- Merchant ID: text input number
- Date range: ISO datetime → `filter.dateFrom=2026-06-01T00:00:00Z`
- Row click → Screen 7 (Redemption Detail)

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
│  Review decision         ← section này chỉ hiện khi status=Pending │
│                                                                     │
│  ℹ️  Approving will credit $50.00 USD directly to merchant wallet.  │
│                                                                     │
│              [✕ Reject with reason]    [✓ Approve payout →]        │
│                                                                     │
│  ─── Rejection reason ──────────── ← chỉ hiện khi status=Rejected ─│
│  "Proof image is unreadable"                                        │
└─────────────────────────────────────────────────────────────────────┘
```

**Reject Modal:**

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

**API:**
- Load: `GET /api/admin/charity/redemptions/{id}`
- Approve: `POST /api/admin/charity/redemptions/{id}/approve`
- Reject: `POST /api/admin/charity/redemptions/{id}/reject` → body: `{ "reason": "..." }`

**Controls:**
- Approve/Reject buttons: ẩn hoàn toàn khi `proofStatus ≠ 0`
- Rejection reason panel: chỉ hiện khi `proofStatus = 2 (Rejected)`
- Approve error: hiển thị dynamic message từ WalletService (`MerchantNotFound`, `AssetNotExist`, wallet error)
- Reject error: `RejectionReasonRequired` khi reason trống

---

## Files sẽ tạo

| File | Nội dung |
|------|----------|
| `charity/admin/charity-purposes.html` | Screen 1 + Modal Screen 2 |
| `charity/admin/charity-batches.html` | Screen 3 + Modal Screen 4 |
| `charity/admin/charity-batch-detail.html` | Screen 5 |
| `charity/admin/charity-redemptions.html` | Screen 6 |
| `charity/admin/charity-redemption-detail.html` | Screen 7 + Reject Modal |

Pattern tái sử dụng từ: `charity/admin/assets/` (layout.js, common.js, styles.css)
