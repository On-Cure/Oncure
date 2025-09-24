#!/bin/bash

# Script to run HBAR transfer test
cd "$(dirname "$0")/../.."

echo "Running HBAR transfer test..."
go run scripts/examples/transfer_test/test_transfer.go