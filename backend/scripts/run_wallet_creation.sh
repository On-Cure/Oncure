#!/bin/bash

# Script to run wallet creation for existing users
cd "$(dirname "$0")/.."

echo "Creating wallets for existing users..."
go run scripts/create_wallets_for_existing_users.go