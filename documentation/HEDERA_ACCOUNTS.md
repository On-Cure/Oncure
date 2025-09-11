# Hedera Accounts – OnCare

This document explains how app users get Hedera accounts, how to use them, and how to test the flow.

## Prerequisites

- Backend environment variables (`backend/.env`):
  - `HEDERA_ACCOUNT_ID=0.0.xxxxx`
  - `HEDERA_PRIVATE_KEY=302e02...`
  - `HEDERA_NETWORK=testnet`
  - `HEDERA_ENCRYPTION_KEY=<32-byte hex>`
- Operator (above account) funded with Testnet HBAR.
- Server running migrations successfully.

## What the system does

- Adds Hedera fields to `users` and creates:
  - `hedera_transactions` (tip/reward/badge events)
  - `user_badges` (NFT achievements)
- Provides APIs to:
  - Create a Hedera account for the logged-in user
  - Fetch account info and live HBAR balance
  - Send HBAR tips between users
  - List user transactions

## API Endpoints

All endpoints require a valid session cookie `session_token` (set by login).

- Create account
  - `POST /api/hedera/account/create`
  - Body: `{ "initial_balance": 1.0 }` (defaults to 1.0 if omitted)
  - Response: `{ "account_id", "public_key", "initial_balance" }`

- Get account info
  - `GET /api/hedera/account`
  - Response: `{ "account_id", "public_key", "balance" }`

- Send a tip (HBAR transfer)
  - `POST /api/hedera/tip`
  - Body: `{ "recipient_user_id": number, "amount": number, "memo": "string (optional)" }`
  - Response: `{ "message": "tip sent", "transaction_id": "..." }`

- Transaction history
  - `GET /api/hedera/transactions?limit=20&offset=0`
  - Response: `{ "transactions": [...], "limit": 20, "offset": 0 }`

## UI (optional)

- Add a button in user settings/dashboard that calls:
  - `POST /api/hedera/account/create` (create)
  - `GET /api/hedera/account` (show id + balance)
- Tip buttons (profiles/posts) call `POST /api/hedera/tip`.

## Testing the flow (curl)

1) Login (get `session_token` via app UI or `POST /api/auth/login`).
2) Create account:
```bash
curl -X POST http://localhost:8080/api/hedera/account/create \
  -H "Cookie: session_token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"initial_balance": 1.0}'
```

3) Fetch account + balance:
```bash
curl http://localhost:8080/api/hedera/account \
  -H "Cookie: session_token=YOUR_TOKEN"
```

4) Tip another user (their account must exist):
```bash
curl -X POST http://localhost:8080/api/hedera/tip \
  -H "Cookie: session_token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipient_user_id": 2, "amount": 0.25, "memo":"Thanks!"}'
```

5) Verify on HashScan (testnet):
- https://hashscan.io/testnet/account/YOUR_ACCOUNT_ID

## Security & Storage

- Private keys are encrypted (AES-GCM) and stored as `users.hedera_private_key_encrypted`.
- Keys are never returned by the API.
- Operator credentials are read from environment variables at startup.

## Troubleshooting

- “Hedera features disabled” at startup:
  - Ensure `HEDERA_ACCOUNT_ID` and `HEDERA_PRIVATE_KEY` are set.
- Migrations fail with “duplicate migration file”:
  - Use the next free version index for the Hedera migration files.
- Tip fails:
  - Ensure both users have Hedera accounts and the sender has sufficient HBAR.
- Balance is zero:
  - Confirm account creation succeeded and operator sent initial HBAR.
- 401 Unauthorized:
  - Ensure `session_token` cookie is present and valid. 