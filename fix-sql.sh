#!/bin/bash

# Quick fix for PostgreSQL syntax in production
# This script updates SQL queries to use proper PostgreSQL syntax

cd backend

# Create a simple SQL converter function
cat > pkg/db/sql_converter.go << 'EOF'
package db

import (
	"os"
	"strconv"
	"strings"
)

// ConvertSQL converts SQLite syntax to PostgreSQL when needed
func ConvertSQL(query string) string {
	if os.Getenv("DATABASE_URL") == "" {
		return query // Keep SQLite syntax for local development
	}
	
	// Convert ? placeholders to $1, $2, etc. for PostgreSQL
	parts := strings.Split(query, "?")
	if len(parts) == 1 {
		return query
	}
	
	result := parts[0]
	for i := 1; i < len(parts); i++ {
		result += "$" + strconv.Itoa(i) + parts[i]
	}
	
	// Convert SQLite-specific functions to PostgreSQL
	result = strings.ReplaceAll(result, "datetime('now')", "CURRENT_TIMESTAMP")
	
	return result
}
EOF

echo "Created SQL converter utility"
echo "Now update your models to use db.ConvertSQL() for all queries"