# Functional Requirements - Charity Gift

## 1. Overview

`Charity Gift` is a customer-facing charity flow that supports:

- `Charity E-Voucher`
- `Charity E-Gift Card`

Reference:

- [`AC/charity-gift-business.md`](./charity-gift-business.md)
- [`charity/charity-gift.html`](../charity/charity-gift.html)
- [`charity/charity-gift.js`](../charity/charity-gift.js)

---

## 2. Functional Requirements

### FR-01: Select Charity Gift Type

The system shall allow the user to choose between:

- Charity E-Voucher
- Charity E-Gift Card

The selected type shall update the form content immediately.

### FR-02: Voucher Donation Input

The system shall allow the user to create a voucher donation by:

- selecting a charity purpose,
- selecting currency,
- entering a donation amount.

The purpose list shall include:

- Food Support
- Children Education
- Healthcare & Medicine
- Elderly Care
- Disaster Relief
- Scholarship Programs

### FR-03: Gift Card Purchase Input

The system shall allow the user to create a gift card purchase by:

- selecting currency,
- entering card value,
- selecting quantity,
- optionally enabling direct send to recipient.

### FR-04: Payment Method Selection

The system shall display available payment methods:

- USDV
- USDT
- USD
- BTC
- VND

The user shall be able to select one payment method before confirming payment.

### FR-05: Invoice Summary Calculation

The system shall display an invoice summary based on selected flow:

- Voucher:
  - donation amount,
  - platform fee at 1.5%,
  - total amount.
- Gift Card:
  - gift card value,
  - quantity,
  - total amount.

### FR-06: Payment Validation

The system shall prevent payment confirmation unless required data is valid.

Voucher validation:

- purpose is selected,
- amount is greater than 0.

Gift card validation:

- card value is greater than 0,
- quantity is at least 1,
- if direct send is enabled, recipient email must be provided and contain `@`.

### FR-07: Success Modal

The system shall show a success modal after payment confirmation.

The modal shall include:

- success message,
- Close action,
- View action that returns to the relevant list.

### FR-08: Voucher List

The system shall display voucher donation batches with:

- Batch ID
- Purpose
- Donated date
- Amount
- Status
- View Details action

The system shall provide status filtering:

- All Statuses
- In Distribution
- Distributed
- Completed

### FR-09: Batch Detail

The system shall allow the user to open batch detail and view:

- Overview tab,
- Distributed tab,
- Tax Receipt tab.

### FR-10: Distribution Detail

The system shall allow the user to open a distribution record and view:

- recipient,
- address,
- amount,
- date,
- status,
- proof availability.

### FR-11: Gift Card List

The system shall display charity gift cards with:

- masked card number,
- value,
- status,
- created date,
- recipient or redeemer info when available.

The system shall provide sub-tabs:

- E-Gift Card
- Redeem History

The system shall provide filters:

- All
- Available
- Gifted

### FR-12: Gift Card Detail

The system shall allow the user to open a gift card detail and view:

- status,
- card number,
- card value,
- created date,
- recipient information when applicable,
- redemption details when applicable.

### FR-13: QR Gift View

The system shall allow the user to open QR gift view only for cards with status `Available`.

The QR view shall display:

- amount,
- currency,
- QR image,
- redeem code,
- download QR action.

### FR-14: Proof View

The system shall allow the user to view proof only when proof exists.

The proof view shall support:

- voucher proof,
- gift card proof.

### FR-15: Transaction History

The system shall display transaction history with a filter by type:

- All
- E-Voucher
- E-Gift Card

---

## 3. Screen Behavior Rules

- The header title shall change based on the current view.
- The back button shall appear on detail screens.
- Tabs shall be visible on main list and buy screens.
- The confirm button shall be disabled until validation passes.
- The QR and proof screens shall be route-driven from detail views.

