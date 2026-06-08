# Charity Gift Card - Admin API Spec

> Source code snapshot: `GiftHubService.API` on 2026-06-08.
> Scope: Admin endpoints under `CharityAdminController`.

## 1. Overview

- Service: `GiftHubService`
- Base route: `/api/admin/charity`
- Auth: JWT required
- Role: `Administrator`
- Controller: `Services/GiftHubService/GiftHubService.API/Controllers/CharityAdminController.cs`
- Response wrapper: `ApiResult<T>` / `ApiResult`
- Date/time: UTC

## 2. Common Models

### 2.1. ApiResult

Successful response normally has this shape:

```json
{
  "statusCode": 200,
  "value": {},
  "errorCode": null,
  "errorCodes": [],
  "success": true
}
```

For commands without a value, `value` may be absent/null depending on API serialization.

### 2.2. Pagination

Paged endpoints inherit `PagingRequest`.

Query fields:

| Field | Type | Default | Notes |
| --- | --- | ---: | --- |
| `pageIndex` | int | `0` | Zero-based page index |
| `pageSize` | int | `20` | Max `1000`; values `<= 0` fallback to `20` |

Paged response value:

```json
{
  "pageIndex": 0,
  "totalPages": 1,
  "totalCount": 1,
  "pageSize": 20,
  "items": [],
  "hasPrevious": false,
  "hasNext": false
}
```

### 2.3. Enums

`CharityVoucherBatchStatus`

| Value | Name |
| ---: | --- |
| `0` | `InDistribution` |
| `1` | `Distributed` |
| `2` | `Completed` |

`CharityBatchDistributionStatus`

| Value | Name |
| ---: | --- |
| `0` | `Pending` |
| `1` | `Completed` |

`CharityProofStatus`

| Value | Name |
| ---: | --- |
| `0` | `Pending` |
| `1` | `Approved` |
| `2` | `Rejected` |

## 3. Purpose Management

### 3.1. List Purposes

`GET /api/admin/charity/purposes`

Lists all charity purposes, optionally filtered by active status.

Query:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `isActive` | bool | No | If omitted, returns active and inactive purposes |

Response `value`: `PurposeDto[]`

```json
[
  {
    "id": 1,
    "code": "FOOD_SUPPORT",
    "name": "Food Support",
    "iconUrl": "https://...",
    "isActive": true,
    "sortOrder": 1
  }
]
```

Notes:

- Results are ordered by `sortOrder` ascending.
- `iconUrl` is converted to a full public URL when present.

### 3.2. Create Purpose

`POST /api/admin/charity/purposes`

Content type: `multipart/form-data`

Form fields:

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `code` | string | Yes | Max 50 chars; must be unique |
| `name` | string | Yes | Max 200 chars |
| `icon` | file | No | `.jpg`, `.jpeg`, `.png`, `.gif`; max 10 MB |
| `sortOrder` | int | Yes | `>= 0` |

Response:

- `201 Created`

Validation/errors:

| Error code | Meaning |
| --- | --- |
| `InvalidCharityPurposeIconImageSize` | Icon image is larger than 10 MB |
| `InvalidCharityPurposeIconImageFormat` | Icon extension is not allowed |
| Validation message `Purpose code already exists.` | Duplicate purpose code |

### 3.3. Update Purpose

`PUT /api/admin/charity/purposes/{id}`

Content type: `multipart/form-data`

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes |

Form fields:

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `name` | string | Yes | Max 200 chars |
| `icon` | file | No | `.jpg`, `.jpeg`, `.png`, `.gif`; max 10 MB |
| `sortOrder` | int | Yes | `>= 0` |

Response:

- `200 OK`

Notes:

- `code` is not updateable.
- If `icon` is omitted, existing `iconUrl` is kept.

Validation/errors:

| Error code/message | Meaning |
| --- | --- |
| Validation message `Purpose not found.` | Purpose id does not exist |
| `InvalidCharityPurposeIconImageSize` | Icon image is larger than 10 MB |
| `InvalidCharityPurposeIconImageFormat` | Icon extension is not allowed |

### 3.4. Toggle Purpose

`POST /api/admin/charity/purposes/{id}/toggle`

Toggles `isActive`.

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes |

Response `value`: bool

```json
true
```

Notes:

- Returned boolean is the new `isActive` value.

Validation/errors:

| Error code/message | Meaning |
| --- | --- |
| Validation message `Purpose not found.` | Purpose id does not exist |

### 3.5. Reorder Purposes

`PUT /api/admin/charity/purposes/reorder`

Body:

```json
{
  "items": [
    { "id": 1, "sortOrder": 1 },
    { "id": 2, "sortOrder": 2 }
  ]
}
```

Request fields:

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `items` | array | Yes | Must not be empty |
| `items[].id` | int | Yes | Existing purpose id; non-existing ids are ignored by current handler |
| `items[].sortOrder` | int | Yes | No explicit validator in current handler |

Response:

- `200 OK`

Validation/errors:

| Error code/message | Meaning |
| --- | --- |
| Validation message `Items cannot be empty.` | `items` is null/empty |

## 4. Voucher Batch & Distribution Management

### 4.1. List Batches

`GET /api/admin/charity/batches`

Query:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `pageIndex` | int | No | Default `0` |
| `pageSize` | int | No | Default `20`, max `1000` |
| `filter.purposeId` | int | No | Filter by charity purpose id |
| `filter.status` | int | No | `CharityVoucherBatchStatus` numeric value |

Response `value.items[]`: `CharityVoucherBatchListItemDto`

```json
{
  "id": 10,
  "purposeName": "Food Support",
  "totalAmount": 1000.00,
  "distributedAmount": 250.00,
  "currency": "USD",
  "status": 1,
  "voucherCount": 5,
  "createdAt": "2026-06-08T08:00:00Z"
}
```

Notes:

- Ordered by `createdAt` descending.
- `currency` is taken from the first voucher in the batch.

### 4.2. Create Batch

`POST /api/admin/charity/batches`

Creates a batch for all pending `CharityVoucher` records with the same `purposeId` and no existing `batchId`.

Body:

```json
{
  "purposeId": 1
}
```

Request fields:

| Field | Type | Required |
| --- | --- | --- |
| `purposeId` | int | Yes |

Response `value`: int

```json
10
```

Business rules:

- Purpose must exist.
- There must be at least one pending voucher for the purpose.
- All vouchers included in the batch must use the same currency.
- New batch starts with `status = InDistribution`, `distributedAmount = 0`.
- Handler creates the batch first, then assigns all matching vouchers to `batchId`.

Errors:

| Error code | Meaning |
| --- | --- |
| `PurposeNotFound` | Charity purpose not found or inactive |
| `NoPendingVouchersForBatch` | No unbatched voucher exists for this purpose |
| `MixedVoucherCurrenciesInBatch` | Pending vouchers have mixed currencies |

### 4.3. Get Batch Detail

`GET /api/admin/charity/batches/{id}`

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes |

Response `value`: `CharityVoucherBatchDetailDto`

```json
{
  "id": 10,
  "purposeName": "Food Support",
  "totalAmount": 1000.00,
  "distributedAmount": 250.00,
  "currency": "USD",
  "status": 1,
  "voucherCount": 5,
  "createdAt": "2026-06-08T08:00:00Z",
  "distributions": [
    {
      "id": 100,
      "recipientName": "Community Kitchen A",
      "amount": 250.00,
      "proofUrl": "https://...",
      "status": 1,
      "disbursedAt": "2026-06-08T09:00:00Z"
    }
  ]
}
```

Notes:

- Distribution `proofUrl` is returned as a presigned URL when present.

Errors:

| Error code | Meaning |
| --- | --- |
| `BatchNotFound` | Batch id does not exist |

### 4.4. Add Distribution

`POST /api/admin/charity/batches/{id}/distributions`

Adds a planned distribution record under a batch.

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes; maps to `batchId` |

Body:

```json
{
  "recipientName": "Community Kitchen A",
  "amount": 250.00
}
```

Request fields:

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `recipientName` | string | Yes | Must not be blank; handler trims value |
| `amount` | decimal | Yes | Must be `> 0` |

Response `value`: int

```json
100
```

Business rules:

- Batch must exist.
- Completed batch cannot receive new distributions.
- Sum of existing planned distribution amounts plus new amount cannot exceed `batch.totalAmount`.
- New distribution starts with `status = Pending`.

Errors:

| Error code | Meaning |
| --- | --- |
| `BatchNotFound` | Batch id does not exist |
| `BatchAlreadyCompleted` | Batch status is `Completed` |
| `RecipientNameRequired` | Recipient name is blank |
| `InvalidAmount` | Amount is `<= 0` |
| `DistributionAmountExceedsBatchTotal` | Planned total would exceed batch total |

### 4.5. Upload Distribution Proof

`POST /api/admin/charity/batches/{id}/distributions/{distId}/proof`

Content type: `multipart/form-data`

Uploads proof image for a distribution.

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes; maps to `batchId` |
| `distId` | int | Yes; maps to `distributionId` |

Form fields:

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `proofFile` | file | Yes | `.jpg`, `.jpeg`, `.png`; max 10 MB |

Response `value`: string

```json
"https://presigned-proof-url..."
```

Business rules:

- Distribution must exist and belong to the batch.
- Uploaded file is stored under `charity/proofs/{batchId}/{distributionId}`.
- Handler saves stored path into `CharityBatchDistribution.ProofUrl`.
- Response is a presigned URL.

Errors:

| Error code | Meaning |
| --- | --- |
| `InvalidProofFileFormat` | File extension is not `.jpg`, `.jpeg`, or `.png` |
| `ProofFileTooLarge` | File exceeds 10 MB |
| `DistributionNotFound` | Distribution does not exist under this batch |

### 4.6. Complete Distribution

`PUT /api/admin/charity/batches/{id}/distributions/{distId}/complete`

Marks a distribution as completed and allocates its amount proportionally across all vouchers in the batch.

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes; maps to `batchId` |
| `distId` | int | Yes; maps to `distributionId` |

Response `value`: bool

```json
true
```

Business rules:

- Batch and distribution must exist.
- Distribution must not already be completed.
- Distribution amount must be `> 0`.
- `batch.distributedAmount + distribution.amount` cannot exceed `batch.totalAmount`.
- For each voucher in the batch, handler creates a `CharityVoucherDistribution`.
- Allocation formula: `distribution.amount * voucher.amount / batch.totalAmount`.
- Last voucher absorbs rounding residual so total allocation equals distribution amount exactly.
- Handler increments each voucher `distributedAmount`.
- Distribution changes to `Completed` and `disbursedAt = UtcNow`.
- Batch `distributedAmount` is incremented by distribution amount.
- If batch status is `InDistribution`, it changes to `Distributed`.

Errors:

| Error code | Meaning |
| --- | --- |
| `BatchNotFound` | Batch id does not exist |
| `DistributionNotFound` | Distribution id does not exist under this batch |
| `DistributionAlreadyCompleted` | Distribution is already completed |
| `InvalidAmount` | Distribution amount is invalid |
| `DistributionAmountExceedsBatchTotal` | Completing would exceed batch total |

### 4.7. Complete Batch

`POST /api/admin/charity/batches/{id}/complete`

Marks the whole voucher batch as completed and sends donor notifications.

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes; maps to `batchId` |

Response `value`: bool

```json
true
```

Business rules:

- Batch must exist.
- Batch must not already be completed.
- Handler sets `status = Completed`.
- After DB save, handler sends `PersistNotificationType.CharityBatchDistributed` to each distinct donor in the batch vouchers.

Current code note:

- The handler does not validate that all distribution amounts have been completed or that `distributedAmount == totalAmount` before marking the batch as `Completed`.

Errors:

| Error code | Meaning |
| --- | --- |
| `BatchNotFound` | Batch id does not exist |
| `BatchAlreadyCompleted` | Batch status is already `Completed` |

## 5. Redemption Review & Merchant Payout

### 5.1. List Redemptions

`GET /api/admin/charity/redemptions`

Query:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `pageIndex` | int | No | Default `0` |
| `pageSize` | int | No | Default `20`, max `1000` |
| `filter.status` | int | No | `CharityProofStatus` numeric value |
| `filter.merchantId` | int | No | Filters by merchant customer id |
| `filter.dateFrom` | DateTime | No | Inclusive lower bound on `createdAt` |
| `filter.dateTo` | DateTime | No | Inclusive upper bound on `createdAt` |

Response `value.items[]`: `AdminRedemptionListItemDto`

```json
{
  "id": 200,
  "merchantId": 12345,
  "merchantName": "Merchant A",
  "cardCode": "ABCD123456",
  "purposeName": "Food Support",
  "amount": 50.00,
  "currency": "USD",
  "proofStatus": 0,
  "createdAt": "2026-06-08T08:00:00Z"
}
```

Notes:

- Ordered by `createdAt` descending.

### 5.2. Get Redemption Detail

`GET /api/admin/charity/redemptions/{id}`

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes |

Response `value`: `AdminRedemptionDetailDto`

```json
{
  "id": 200,
  "merchantId": 12345,
  "merchantName": "Merchant A",
  "cardCode": "ABCD123456",
  "purposeName": "Food Support",
  "amount": 50.00,
  "currency": "USD",
  "proofStatus": 0,
  "proofUrl": "https://presigned-proof-url...",
  "rejectionReason": null,
  "createdAt": "2026-06-08T08:00:00Z"
}
```

Notes:

- `proofUrl` is returned as a presigned URL when present.

Errors:

| Error code | Meaning |
| --- | --- |
| `RedemptionNotFound` | Redemption id does not exist |

### 5.3. Approve Redemption

`POST /api/admin/charity/redemptions/{id}/approve`

Approves merchant proof and credits the merchant wallet.

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes |

Response `value`: bool

```json
true
```

Business rules:

- Redemption must exist.
- Redemption `proofStatus` must be `Pending`.
- Merchant customer must exist in CustomerService.
- Asset matching `redemption.card.currency` must exist in WalletService.
- Handler calls WalletService transaction service to credit merchant payout:
  - customer id: `SellingGiftRegistrationDetail.CustomerId`
  - asset id: resolved from card currency
  - amount: `redemption.amount`
  - type: Charity merchant payout flow (`CreditCharityMerchantPayoutAsync`)
  - extra info: `{ "RedemptionId": redemption.Id }`
- After successful credit, handler sets `proofStatus = Approved`.
- Handler sends `PersistNotificationType.CharityRedemptionApproved` to merchant.

Important ordering:

- Wallet credit happens before GiftHub DB `SaveChangesAsync`.
- If wallet credit succeeds but GiftHub save fails, manual reconciliation may be required.

Errors:

| Error code | Meaning |
| --- | --- |
| `RedemptionNotFound` | Redemption id does not exist |
| `RedemptionAlreadyProcessed` | Proof status is not `Pending` |
| `MerchantNotFound` | Merchant customer cannot be found |
| `AssetNotExist` | Wallet asset for card currency cannot be found |
| Dynamic `Error(...)` | Wallet transaction failed; message comes from WalletService result detail |

### 5.4. Reject Redemption

`POST /api/admin/charity/redemptions/{id}/reject`

Rejects merchant proof with a reason.

Route:

| Field | Type | Required |
| --- | --- | --- |
| `id` | int | Yes |

Body:

```json
{
  "reason": "Proof image is unreadable"
}
```

Request fields:

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `reason` | string | Yes | Must not be empty |

Response `value`: bool

```json
true
```

Business rules:

- Redemption must exist.
- Redemption `proofStatus` must be `Pending`.
- Handler sets `proofStatus = Rejected` and saves `rejectionReason`.
- Handler sends `PersistNotificationType.CharityRedemptionRejected` to merchant, with `RedemptionId` and `RejectionReason`.

Errors:

| Error code | Meaning |
| --- | --- |
| `RejectionReasonRequired` | Reason is empty |
| `RedemptionNotFound` | Redemption id does not exist |
| `RedemptionAlreadyProcessed` | Proof status is not `Pending` |

## 6. Endpoint Summary

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/admin/charity/purposes` | List purposes |
| `POST` | `/api/admin/charity/purposes` | Create purpose |
| `PUT` | `/api/admin/charity/purposes/{id}` | Update purpose |
| `POST` | `/api/admin/charity/purposes/{id}/toggle` | Toggle active/inactive |
| `PUT` | `/api/admin/charity/purposes/reorder` | Update sort orders |
| `GET` | `/api/admin/charity/batches` | List voucher batches |
| `POST` | `/api/admin/charity/batches` | Create voucher batch |
| `GET` | `/api/admin/charity/batches/{id}` | Get voucher batch detail |
| `POST` | `/api/admin/charity/batches/{id}/distributions` | Add distribution |
| `POST` | `/api/admin/charity/batches/{id}/distributions/{distId}/proof` | Upload distribution proof |
| `PUT` | `/api/admin/charity/batches/{id}/distributions/{distId}/complete` | Complete distribution |
| `POST` | `/api/admin/charity/batches/{id}/complete` | Complete batch |
| `GET` | `/api/admin/charity/redemptions` | List merchant redemption proofs |
| `GET` | `/api/admin/charity/redemptions/{id}` | Get redemption detail |
| `POST` | `/api/admin/charity/redemptions/{id}/approve` | Approve proof and credit merchant |
| `POST` | `/api/admin/charity/redemptions/{id}/reject` | Reject proof with reason |

## 7. FE Integration Notes

- Use `multipart/form-data` for purpose icon upload and distribution proof upload.
- Use enum numeric values in query filters unless the API binder is confirmed to accept strings.
- Query binding for nested filters should use ASP.NET-style names, for example:
  - `?pageIndex=0&pageSize=20&filter.status=0`
  - `?filter.purposeId=1`
  - `?filter.merchantId=12345&filter.dateFrom=2026-06-01T00:00:00Z`
- Admin edits `CharitySetting` through MasterService generic Settings API, not through `GiftHubService` admin charity endpoints.
- Purpose create/update stores icons in `charity/purpose-icons`.
- Distribution proof upload allows only `.jpg`, `.jpeg`, `.png`; purpose icons also allow `.gif`.
