# Acceptance Criteria - Charity Gift

## 1. Overview

This document defines the acceptance criteria for the Charity Gift feature.

Reference:

- [`AC/charity-gift-business.md`](./charity-gift-business.md)
- [`AC/charity-gift-fr.md`](./charity-gift-fr.md)
- [`AC/charity-gift-user-story.md`](./charity-gift-user-story.md)

---

## 2. Acceptance Criteria

### AC-01: Charity type selection

- [ ] User can select `Charity E-Voucher`.
- [ ] User can select `Charity E-Gift Card`.
- [ ] Selected flow changes the step-2 content immediately.

### AC-02: Voucher creation

- [ ] User can select a charity purpose.
- [ ] User can select currency.
- [ ] User can enter a donation amount.
- [ ] Payment cannot continue if purpose is missing.
- [ ] Payment cannot continue if amount is zero or invalid.

### AC-03: Gift card creation

- [ ] User can select currency.
- [ ] User can enter gift card value.
- [ ] User can adjust quantity and quantity cannot go below 1.
- [ ] User can enable direct send to recipient.
- [ ] If direct send is enabled, recipient email is required.

### AC-04: Invoice summary

- [ ] Voucher summary shows donation amount, platform fee, and total.
- [ ] Voucher platform fee is 1.5% of the donation amount.
- [ ] Gift card summary shows value, quantity, and total.
- [ ] Gift card total equals value multiplied by quantity.

### AC-05: Payment validation

- [ ] Confirm Payment button remains disabled until required fields are valid.
- [ ] Voucher requires purpose and amount greater than 0.
- [ ] Gift card requires value greater than 0 and quantity at least 1.
- [ ] Direct send requires a valid recipient email containing `@`.

### AC-06: Success modal

- [ ] Success modal is shown after payment confirmation.
- [ ] Close action dismisses the modal.
- [ ] View action returns to the relevant list screen.

### AC-07: Voucher batch list

- [ ] Voucher list shows batch ID, purpose, donated date, amount, status, and detail action.
- [ ] User can filter by batch status.
- [ ] User can open a batch detail from the list.

### AC-08: Batch detail

- [ ] Batch detail shows overview information.
- [ ] Batch detail shows distributed records.
- [ ] Batch detail shows tax receipt information.

### AC-09: Distribution detail and proof

- [ ] Distribution detail shows recipient, address, amount, date, and status.
- [ ] Proof link is visible only when proof exists.
- [ ] If proof does not exist, system shows `Not available`.

### AC-10: Gift card list

- [ ] Gift card list shows masked card number, value, status, and created date.
- [ ] Gift card list can be filtered by status.
- [ ] Gift card list supports `E-Gift Card` and `Redeem History` sub-tabs.

### AC-11: Gift card detail

- [ ] Gift card detail shows card number, value, status, and created date.
- [ ] Gifted or redeemed card shows recipient information.
- [ ] Redeemed card shows redemption information and proof action.
- [ ] Available card shows `Gift via QR` action.

### AC-12: QR view

- [ ] QR view is available only for cards with status `Available`.
- [ ] QR view shows QR image, redeem code, and download action.

### AC-13: Proof view

- [ ] Proof view is available only when proof exists.
- [ ] Proof content changes based on voucher or gift card context.

### AC-14: Transaction history

- [ ] User can view transaction history.
- [ ] User can filter history by `E-Voucher` and `E-Gift Card`.

