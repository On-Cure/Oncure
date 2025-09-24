#!/bin/bash

# Script to sync wallet balances from Hedera network
cd "$(dirname "$0")/.."

echo "Syncing wallet balances from Hedera network..."
go run scripts/examples/balance_sync/sync_wallet_balances.go