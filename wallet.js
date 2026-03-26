/**
 * global.js — Shared layout logic for VLINKPAY merchant portal
 * Handles: sidebar data & render, sidebar toggle, hamburger injection, overlay, responsive behavior
 */

(function () {
  "use strict";
  const MY_WALLETS_CONFIG = {
    page: {
      backLabel: "Back",
      title: "My Wallets",
    },
    wallets: [
      {
        id: "wallet-usdv-001",
        code: "USDV",
        name: "USD VLINK",
        icon: "https://raw.githubusercontent.com/vlink-group/VlinkPay/refs/heads/main/icon/assets/new-icon/USDV.png",
        viewType: "tabs",
        summary: [
          {
            key: "availableBalance",
            label: "Available Balance",
            value: 7207.92,
            unit: "USDV",
            display: "7,207.92 USDV",
          },
          {
            key: "value",
            label: "Value",
            value: 7207.92,
            unit: "USD",
            display: "$7,207.92",
          },
        ],
        actions: [
          {
            key: "receive",
            label: "Receive",
          },
          {
            key: "send",
            label: "Send",
          },
        ],
        views: [
          {
            key: "transactionWallet",
            label: "Transaction Wallet",
            type: "table",
            defaultActive: true,
            table: {
              columns: [
                { key: "type", label: "Type" },
                { key: "amount", label: "Amount" },
                { key: "dateTime", label: "Date & Time" },
                { key: "status", label: "Status" },
                { key: "action", label: "View Details" },
              ],
              rows: [
                {
                  id: "usdv-tx-001",
                  type: "Transfer",
                  amount: {
                    value: -98.5,
                    display: "-$98.5",
                    trend: "decrease",
                  },
                  dateTime: {
                    value: "2025-11-25T09:41:00",
                    display: "Nov 25, 2025 9:41 AM",
                  },
                  status: {
                    key: "completed",
                    label: "Completed",
                    tone: "success",
                  },
                  action: {
                    key: "view",
                    label: "View",
                  },
                },
                {
                  id: "usdv-tx-002",
                  type: "Transfer",
                  amount: {
                    value: -98.5,
                    display: "-$98.5",
                    trend: "decrease",
                  },
                  dateTime: {
                    value: "2025-11-25T09:41:00",
                    display: "Nov 25, 2025 9:41 AM",
                  },
                  status: {
                    key: "completed",
                    label: "Completed",
                    tone: "success",
                  },
                  action: {
                    key: "view",
                    label: "View",
                  },
                },
                {
                  id: "usdv-tx-003",
                  type: "Buy E-gift Code",
                  amount: {
                    value: -500,
                    display: "-$500",
                    trend: "decrease",
                  },
                  dateTime: {
                    value: "2025-11-25T09:41:00",
                    display: "Nov 25, 2025 9:41 AM",
                  },
                  status: {
                    key: "completed",
                    label: "Completed",
                    tone: "success",
                  },
                  action: {
                    key: "view",
                    label: "View",
                  },
                },
                {
                  id: "usdv-tx-004",
                  type: "Send Gift",
                  amount: {
                    value: -50,
                    display: "-$50",
                    trend: "decrease",
                  },
                  dateTime: {
                    value: "2025-11-25T09:41:00",
                    display: "Nov 25, 2025 9:41 AM",
                  },
                  status: {
                    key: "completed",
                    label: "Completed",
                    tone: "success",
                  },
                  action: {
                    key: "view",
                    label: "View",
                  },
                },
                {
                  id: "usdv-tx-005",
                  type: "IOU Package",
                  amount: {
                    value: 101.25,
                    display: "+$101.25",
                    trend: "increase",
                  },
                  dateTime: {
                    value: "2025-11-25T09:41:00",
                    display: "Nov 25, 2025 9:41 AM",
                  },
                  status: {
                    key: "completed",
                    label: "Completed",
                    tone: "success",
                  },
                  action: {
                    key: "view",
                    label: "View",
                  },
                },
                {
                  id: "usdv-tx-006",
                  type: "Received",
                  amount: {
                    value: 43.25,
                    display: "+$43.25",
                    trend: "increase",
                  },
                  dateTime: {
                    value: "2025-11-25T09:41:00",
                    display: "Nov 25, 2025 9:41 AM",
                  },
                  status: {
                    key: "completed",
                    label: "Completed",
                    tone: "success",
                  },
                  action: {
                    key: "view",
                    label: "View",
                  },
                },
                {
                  id: "usdv-tx-007",
                  type: "Buy USDV",
                  amount: {
                    value: 100,
                    display: "+$100",
                    trend: "increase",
                  },
                  dateTime: {
                    value: "2025-11-25T09:41:00",
                    display: "Nov 25, 2025 9:41 AM",
                  },
                  status: {
                    key: "completed",
                    label: "Completed",
                    tone: "success",
                  },
                  action: {
                    key: "view",
                    label: "View",
                  },
                },
              ],
            },
          },
          {
            key: "bonusHoldings",
            label: "Bonus Holdings",
            type: "table",
            defaultActive: false,
            table: {
              columns: [
                { key: "type", label: "Type" },
                { key: "amount", label: "Amount" },
                { key: "conditionToUnlock", label: "Condition to unlock" },
                { key: "status", label: "Status" },
              ],
              rows: [
                {
                  id: "usdv-bonus-001",
                  type: "Business Opportunity holding",
                  amount: {
                    value: 20,
                    display: "$20",
                  },
                  conditionToUnlock:
                    "You will receive 32,206.119163 VMM, after renewing your next Business Opportunity package",
                  status: {
                    key: "holding",
                    label: "Holding",
                    tone: "warning",
                  },
                },
                {
                  id: "usdv-bonus-002",
                  type: "Business Opportunity holding",
                  amount: {
                    value: 20,
                    display: "$20",
                  },
                  conditionToUnlock:
                    "You will receive 31,545.741325 VMM, after renewing your next Business Opportunity package",
                  status: {
                    key: "holding",
                    label: "Holding",
                    tone: "warning",
                  },
                },
                {
                  id: "usdv-bonus-003",
                  type: "Business Opportunity holding",
                  amount: {
                    value: 20,
                    display: "$20",
                  },
                  conditionToUnlock:
                    "You will receive 29,850.746269 VMM, after renewing your next Business Opportunity package",
                  status: {
                    key: "holding",
                    label: "Holding",
                    tone: "warning",
                  },
                },
                {
                  id: "usdv-bonus-004",
                  type: "F1 bonus (50%) from direct member quanpmref01",
                  amount: {
                    value: 75,
                    display: "75 USDV",
                  },
                  conditionToUnlock: "Active an IOU package",
                  status: {
                    key: "holding",
                    label: "Holding",
                    tone: "warning",
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  };

  window.MY_WALLETS_CONFIG = MY_WALLETS_CONFIG;
})();
