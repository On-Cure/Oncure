#!/bin/bash
set -e

echo "Building onCare Backend..."

# Download dependencies
echo "Downloading Go dependencies..."
go mod download

# Verify dependencies
echo "Verifying Go modules..."
go mod verify

# Build the application
echo "Building application..."
CGO_ENABLED=1 go build -o main .

echo "Backend build complete!"