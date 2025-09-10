#!/bin/bash

# Render deployment script for onCare backend with PostgreSQL

echo "Starting onCare backend deployment..."

# Navigate to backend directory
cd backend

# Install Go dependencies
echo "Installing Go dependencies..."
go mod download
go mod tidy

# Build the application
echo "Building application..."
go build -o server server.go

# Run the server
echo "Starting server..."
./server