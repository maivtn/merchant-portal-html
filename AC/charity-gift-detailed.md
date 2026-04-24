# BRD / BA - Charity Gift Detailed Specification

## Document Info

| Field | Value |
|---|---|
| Module | Charity |
| Feature | Charity Gift |
| Primary Flows | E-Voucher, E-Gift Card |
| Audience | BA, PO, QA, Dev, Ops |
| Basis | Current frontend implementation in `charity/charity-gift.html` and `charity/charity-gift.js` |
| Last Updated | 2026-04-21 |

---

## 1. Business Objective

`Charity Gift` is a customer-facing charity donation and gift purchase flow that supports two commercial/operational use cases:

- **Charity E-Voucher**
  - User donates to a selected cause.
  - Donation is recorded as a batch and tracked through distribution lifecycle.

- **Charity E-Gift Card**
  - User purchases charity gift cards.
  - Gift cards can be held, gifted directly to a recipient, or later redeemed.

The feature also provides visibility into post-transaction artifacts:

- batch donation status,
- distribution details,
- tax receipt,
- gift card status,
- QR gift view,
- redemption proof,
- transaction history.

---

## 2. Scope

| Scope Type | Items |
|---|---|
| In Scope | Buy charity voucher, buy charity gift card, payment summary, success modal, voucher batch list, batch details, distribution details, tax receipt, gift card list, gift card detail, QR gift, proof view, transaction history |
| Out of Scope | Real payment gateway integration, backend APIs, persistent storage, settlement engine, legal tax calculation engine, real QR generation service |

---

## 3. Actors and Responsibilities

### 3.1 Primary Actors

- **Donor**
  - Selects a cause.
  - Makes a donation or buys a gift card.
  - Reviews payment summary and completes checkout.

- **Recipient**
  - Receives a charity gift card.
  - Redeems the gift card later.

- **Ops / Admin**
  - Reviews batch and distribution progress.
  - Checks proof and tax receipt.
  - Monitors gift card lifecycle and redeem history.

### 3.2 Secondary Actors

- **System**
  - Computes invoice summary.
  - Validates required fields.
  - Controls view routing and state transitions.

---

## 4. High-Level Business Flow

### 4.1 Charity E-Voucher Flow

1. User enters `Buy Gift Charity` or `Charity E-Voucher`.
2. User selects `Voucher`.
3. User selects a charity purpose.
4. User enters donation amount and currency.
5. User selects payment method.
6. System calculates platform fee and total.
7. User confirms payment.
8. System shows success modal.
9. User lands on voucher batch list.
10. User can open batch detail, distribution detail, tax receipt, and proof.

### 4.2 Charity E-Gift Card Flow

1. User enters `Buy Gift Charity` or `Charity E-Gift Card`.
2. User selects `Card`.
3. User enters gift card value, quantity, and currency.
4. User may enable direct sending to recipient.
5. User selects payment method.
6. System calculates total.
7. User confirms payment.
8. System shows success modal.
9. User lands on gift card list.
10. User can open gift card detail, QR gift, proof, and redeem history.

---

## 5. Core Business Rules

| Rule ID | Rule | Description |
|---|---|---|
| BR-CH-01 | Flow type determines UI | `voucher` and `card` have different step-2 content, validation, and post-success destination |
| BR-CH-02 | Voucher requires purpose | Donation cannot continue without selecting a cause |
| BR-CH-03 | Voucher requires positive amount | Amount must be greater than 0 |
| BR-CH-04 | Voucher fee is 1.5% | Platform fee is computed from donation amount |
| BR-CH-05 | Card requires positive value | Card value must be greater than 0 |
| BR-CH-06 | Card quantity minimum is 1 | Quantity cannot go below 1 |
| BR-CH-07 | Direct send requires valid email | Recipient email must include `@` when direct send is enabled |
| BR-CH-08 | QR only for Available card | QR action is visible only when card status is `Available` |
| BR-CH-09 | Proof depends on data availability | Proof button shows only if `hasProof = true` |
| BR-CH-10 | Success modal controls redirect | After payment success, user returns to the relevant list flow |

---

## 6. Data and State Model

| Field | Type | Purpose |
|---|---|---|
| `viewMode` | string | Current route/view state |
| `activeTab` | string | Top-level tab selection |
| `flowType` | string | `voucher` or `card` |
| `purpose` | string | Charity purpose for voucher |
| `amount` | string | Voucher amount |
| `currency` | string | Currency selection |
| `paymentMethod` | string | Selected payment method |
| `cardValue` | string | Gift card face value |
| `quantity` | number | Number of cards to buy |
| `sendDirectly` | boolean | Direct-send toggle |
| `recipientName` | string | Recipient name |
| `recipientEmail` | string | Recipient email |
| `selectedBatch` | object | Current batch detail |
| `selectedDist` | object | Current distribution detail |
| `selectedCard` | object | Current gift card detail |
| `proofKind` | string | `voucher` or `gift-card` proof context |
| `batchTab` | string | Batch detail sub-tab |
| `cardSubTab` | string | Gift card list sub-tab |
| `filterStatus` | string | Voucher batch filter |
| `cardFilterStatus` | string | Gift card filter |
| `historyFilter` | string | Transaction history filter |
| `isSuccess` | boolean | Success modal visibility |

---

## 7. Screen-by-Screen Detailed Specification

### 7.1 Shared Shell

#### Purpose

Provide a consistent shell for all charity views.

#### Elements

- Sticky header
- Conditional back button
- Top tabs
- Main content slot
- Success modal overlay

#### Behavior

- Header title changes based on current view.
- Back button appears only on deep views.
- Tabs are visible in `buy`, `list`, `cardList`, and `history`.
- Success modal is rendered on top of current view without losing state.

---

### 7.2 Buy Gift Charity

#### Purpose

Entry point for creating a new charity transaction.

#### Layout Steps

1. Gift Type
2. Donation Details or Gift Card Details
3. Payment

#### Step 1: Gift Type

- User chooses:
  - Charity E-Voucher
  - Charity E-Gift Card
- Selected card receives active styling.
- Flow type changes immediately.

#### Step 2A: Donation Details for Voucher

- Purpose selection grid:
  - Food Support
  - Children Education
  - Healthcare & Medicine
  - Elderly Care
  - Disaster Relief
  - Scholarship Programs
- Currency select:
  - USD
  - VND
- Amount input:
  - numeric input
  - formatted with thousand separators

#### Step 2B: Gift Card Details for Card

- Currency select:
  - USD
  - VND
- Card value input:
  - numeric input
  - formatted with thousand separators
- Quantity control:
  - `-` button
  - count display
  - `+` button
- Direct send checkbox:
  - if checked, recipient fields are shown
- Recipient fields:
  - Recipient Name (optional)
  - Recipient Email (required when direct send is enabled)

#### Step 3: Payment

- Payment methods:
  - USDV
  - USDT
  - USD
  - BTC
  - VND
- Invoice summary:
  - Voucher:
    - Donation Amount
    - Platform Fee (1.5%)
    - Total
  - Card:
    - Gift Card Value
    - Quantity
    - Total
- Confirm button:
  - disabled when validation fails
  - enabled when all required fields are valid

---

### 7.3 Charity E-Voucher List

#### Purpose

Display donation batches and allow user to inspect distribution progress.

#### Filters

- All Statuses
- In Distribution
- Distributed
- Completed

#### Batch Card Content

- Batch ID
- Purpose
- Donated date
- Amount with currency
- Status badge
- View Details action

#### Behavioral Rules

- Filter applies immediately on selection.
- `Donate Now` opens a fresh voucher flow.
- Clicking `View Details` opens batch detail.

---

### 7.4 Batch Detail

#### Purpose

Show detailed status of a batch donation.

#### Tabs

- Overview
- Distributed
- Tax Receipt

#### Overview Tab

- Batch ID
- Purpose
- Donated on
- Total Donation Amount
- Distribution Progress
- Distributed amount
- Remaining amount

#### Distributed Tab

- List of distributed records in the selected batch.
- Each item shows:
  - recipient
  - amount
  - date
  - status
  - view detail action

#### Tax Receipt Tab

- Foundation name
- EIN
- address
- receipt ID
- date issued
- donor information
- donation summary
- disclaimer text
- download receipt button

#### Behavioral Rules

- Overview must visually show progress percentage.
- Distributed tab must show only records belonging to the selected batch.
- Tax Receipt action is a simulated download action in the current implementation.

---

### 7.5 Distribution Detail

#### Purpose

Show one distribution record in full detail.

#### Displayed Data

- Recipient
- Address
- Amount
- Date
- Status
- Proof section

#### Behavioral Rules

- If proof exists, user can open proof view.
- If proof does not exist, display `Not available`.

---

### 7.6 Charity E-Gift Card List

#### Purpose

Display charity gift cards and redemption states.

#### Sub-tabs

- E-Gift Card
- Redeem History

#### Filter

- All
- Available
- Gifted

#### Card List Content

- Masked card number
- Recipient or Redeemed by
- Created date
- Value
- Status badge
- View Details action

#### Behavioral Rules

- `E-Gift Card` sub-tab shows available and gifted cards.
- `Redeem History` sub-tab shows redeemed cards only.
- Filter is only applied to the `E-Gift Card` sub-tab in current implementation.

---

### 7.7 Gift Card Detail

#### Purpose

Show full lifecycle of one charity gift card.

#### Common Information

- Status
- Card Number
- Card Value
- Created Date

#### Gifted / Redeemed Extension

- Recipient Name
- Recipient Email if available

#### Redeemed Extension

- Redeemer
- Merchant
- Redemption date
- Proof of Redemption action

#### Available State Extension

- Gift via QR button

#### Behavioral Rules

- QR action is only available for `Available` cards.
- Redeemed cards must show redemption details.
- Gifted cards must show recipient context.

---

### 7.8 QR Gift View

#### Purpose

Provide QR-based transfer experience for available gift cards.

#### Displayed Information

- Card value
- Currency
- QR image
- Redeem code
- Download QR button

#### Behavioral Rules

- QR view is opened from an `Available` card only.
- Redeem code is deterministically generated from the card identifier or masked number.
- Download button is currently a placeholder action.

---

### 7.9 Proof View

#### Purpose

Display uploaded proof for voucher distribution or gift card redemption.

#### Contexts

- Voucher proof
- Gift card proof

#### Behavioral Rules

- Proof content is driven by `proofKind`.
- Current implementation uses static preview images.

---

### 7.10 Transaction History

#### Purpose

Provide a transaction log view for charity-related activity.

#### Filter

- All
- E-Voucher
- E-Gift Card

#### Displayed Data

- Transaction ID
- Amount
- Date
- Status

#### Behavioral Rules

- Transaction history is currently mock data.
- Clicking an item may later be connected to transaction detail if needed.

---

## 8. Validation Rules

### 8.1 Voucher Validation

- Purpose must be selected.
- Amount must be numeric and greater than zero.
- Payment cannot proceed if validation fails.

### 8.2 Gift Card Validation

- Card value must be numeric and greater than zero.
- Quantity must be at least 1.
- If direct send is enabled, recipient email is required.
- Recipient email must contain `@`.

### 8.3 Common Validation

- Payment method must be selected.
- Summary must be recalculated whenever relevant inputs change.
- Button state must reflect current validity.

---

## 9. Exception Handling

| Case | System Behavior |
|---|---|
| Missing voucher purpose | Prevent payment confirmation |
| Zero or empty amount/value | Disable confirm button |
| Quantity below 1 | Keep quantity at 1 minimum |
| Invalid recipient email | Disable confirm button when direct send is enabled |
| Card status not Available | Hide QR action |
| Proof unavailable | Show `Not available` |
| Empty route context | Render empty or fallback state based on current selected data |

---

## 10. State Transition Matrix

| Current View | Trigger | Next View |
|---|---|---|
| buy | Success and voucher flow | list |
| buy | Success and card flow | cardList |
| list | Open batch | batch |
| batch | Open distribution | dist |
| cardList | Open card | cardDetail |
| cardDetail | Open QR | qr |
| batch/dist/cardDetail | Open proof | proof |
| qr | Back | cardDetail |
| dist | Back | batch |
| batch | Back | list |
| cardDetail | Back | cardList |
| proof | Back | context-dependent previous detail |

---

## 11. Acceptance Criteria

### 11.1 Buy Flow

- [ ] User can choose between voucher and card flow.
- [ ] UI step 2 changes based on selected flow.
- [ ] Invoice summary updates when user changes value, quantity, currency, or purpose.
- [ ] Confirm button is disabled until required inputs are valid.

### 11.2 Voucher Flow

- [ ] User can select a purpose from the available list.
- [ ] User can enter amount and currency.
- [ ] Platform fee is calculated as 1.5%.
- [ ] After success, user returns to voucher list.

### 11.3 Gift Card Flow

- [ ] User can enter value, quantity, and currency.
- [ ] User can enable direct send and enter recipient email.
- [ ] Total is calculated as value times quantity.
- [ ] After success, user returns to gift card list.

### 11.4 Voucher Detail Flow

- [ ] Batch detail shows overview, distributed records, and tax receipt.
- [ ] Distribution detail shows recipient, address, amount, date, and proof status.
- [ ] Proof is visible only when available.

### 11.5 Gift Card Detail Flow

- [ ] Card detail shows status, number, value, and created date.
- [ ] Gifted and redeemed cards show recipient data.
- [ ] Redeemed cards show redemption data and proof action.
- [ ] Available cards show QR gift action.

### 11.6 History and Proof

- [ ] Transaction history is available with type filter.
- [ ] Proof view changes based on voucher or gift-card context.

---

## 12. Risks and Constraints

| Risk | Impact | Mitigation |
|---|---|---|
| Mock-only data | No real transaction persistence | Replace with API integration later |
| Placeholder download | No actual file output | Wire actual download service later |
| Static proof and QR | Limited realism in demo | Replace with generated artifacts later |
| Frontend-only validation | No server-side enforcement | Add backend validation later |

---
 