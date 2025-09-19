#!/bin/bash

# Script to run HBAR transfer test
cd "$(dirname "$0")/../.."

echo "Running HBAR transfer test..."
go run scripts/examples/test_transfer.go