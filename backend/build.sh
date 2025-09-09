#!/bin/bash
set -e

echo "Building onCare Backend..."

# Download dependencies
go mod download

# Build the application
CGO_ENABLED=1 go build -o main .

echo "Backend build complete!"