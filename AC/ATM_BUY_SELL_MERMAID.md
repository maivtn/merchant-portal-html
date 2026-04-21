# ATM Buy/Sell Mermaid Diagram

## 1. Overview

```mermaid
flowchart TD
    A[Buy/Sell Entry] --> B{exchangeType}
    B -->|Buy| C1[Buy Flow]
    B -->|Sell| C2[Sell Flow]

    C1 --> D{paymentMethod}
    C2 --> D

    D -->|Cash| E{atmType}
    D -->|Non-cash| H[Select Location]

    E -->|MobileATM| F[Confirm Location]
    E -->|MerchantATM / ComboATM| H

    F --> G[Select Location]
    G --> I[Review Details]
    H --> I

    I --> J{submit request}
    J -->|Buy| K1[Create Buy Request]
    J -->|Sell| K2[Create Sell Request]

    K1 --> L[Waiting Confirmation]
    K2 --> L

    L --> M{status}
    M -->|Pending| L
    M -->|Accepted| N[Show QR Code]
    M -->|Declined| O[Return / Re-select Flow]
    M -->|Cancelled| P[Back to Entry]
    M -->|Completed| Q[Transaction Complete]

    N --> R{QR status}
    R -->|Pending / Scanning| N
    R -->|Completed| Q
    R -->|Declined| P
    R -->|Cancelled| P

    Q --> S[Rating / History]
```

## 2. Buy / Sell Sequence

```mermaid
sequenceDiagram
    autonumber
    actor U as User
    participant UI as ATM UI
    participant S as AtmSettingsStore
    participant API as ATM API

    U->>UI: Open Buy/Sell entry
    UI->>S: Save initial paramBuySell
    UI->>UI: Decide by exchangeType
    UI->>UI: Decide by paymentMethod

    alt Cash + MobileATM
        UI->>UI: Go to Confirm Location
        U->>UI: Confirm address / map point
        UI->>S: Save meetingLocation, lat/lng, note
    else Cash + MerchantATM
        UI->>UI: Skip Confirm Location
    else Non-cash
        UI->>UI: Skip Confirm Location
    end

    UI->>API: Get nearby merchants
    API-->>UI: Return merchant list
    UI->>U: Select merchant
    UI->>S: Save merchant data
    UI->>UI: Render Review Details

    U->>UI: Toggle insurance / confirm
    UI->>API: Create Buy/Sell request
    API-->>UI: Return requestId
    UI->>UI: Go to Waiting Confirmation

    loop Poll status
        UI->>API: Get request status
        API-->>UI: status response
    end

    alt Accepted
        UI->>UI: Go to QR Code
        loop Poll scan status
            UI->>API: Check QR scan status
            API-->>UI: scan / otp / status
        end
        alt Completed
            UI->>UI: Go to Transaction Complete
        else Declined or Cancelled
            UI->>UI: Return to Entry
        end
    else Declined
        UI->>UI: Show warning and reselect flow
    else Cancelled
        UI->>UI: Return to Entry
    else Completed
        UI->>UI: Go to Transaction Complete
    end
```

## 3. Status Transition Map

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Pending: create request
    Pending --> Accepted: merchant accepts
    Pending --> Declined: merchant declines
    Pending --> Cancelled: user cancels / timeout
    Accepted --> Scanning: QR shown / scan started
    Scanning --> Completed: complete request
    Scanning --> Declined: scan rejected / mismatch
    Scanning --> Cancelled: user cancels
    Completed --> [*]
    Declined --> [*]
    Cancelled --> [*]
```

## 4. Case Matrix

```mermaid
flowchart LR
    A[Buy] --> B{Cash?}
    C[Sell] --> B

    B -->|Yes| D{MobileATM?}
    B -->|No| F[Select Location]

    D -->|Yes| E[Confirm Location]
    D -->|No| F

    E --> F
    F --> G[Review Details]
    G --> H[Waiting Confirmation]
    H --> I[QR Code]
    I --> J[Transaction Complete]
```

## 5. Notes

- Diagram này phản ánh flow hiện tại của frontend, không phải business model tổng quát.
- Nếu backend đổi status machine, cần cập nhật lại các nhánh `Pending / Accepted / Declined / Cancelled / Completed`.
- Nếu product thay đổi rule cash/non-cash, cần cập nhật node `Confirm Location` và `Select Location`.
