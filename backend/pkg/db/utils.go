package db

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// DB wraps sql.DB with database-agnostic methods
type DB struct {
	*sql.DB
}

// NewDB creates a new database wrapper
func NewDB(db *sql.DB) *DB {
	return &DB{DB: db}
}

// Query executes a query with automatic placeholder conversion
func (db *DB) Query(query string, args ...interface{}) (*sql.Rows, error) {
	return db.DB.Query(convertPlaceholders(query), args...)
}

// QueryRow executes a query that returns a single row with automatic placeholder conversion
func (db *DB) QueryRow(query string, args ...interface{}) *sql.Row {
	return db.DB.QueryRow(convertPlaceholders(query), args...)
}

// Exec executes a query without returning rows with automatic placeholder conversion
func (db *DB) Exec(query string, args ...interface{}) (sql.Result, error) {
	return db.DB.Exec(convertPlaceholders(query), args...)
}

// convertPlaceholders converts ? placeholders to PostgreSQL $1, $2, etc. if needed
func convertPlaceholders(query string) string {
	if os.Getenv("DATABASE_URL") == "" {
		return query // SQLite uses ? placeholders
	}
	
	// Convert ? to $1, $2, etc. for PostgreSQL
	parts := strings.Split(query, "?")
	if len(parts) == 1 {
		return query
	}
	
	result := parts[0]
	for i := 1; i < len(parts); i++ {
		result += "$" + strconv.Itoa(i) + parts[i]
	}
	return result
}

// GetCurrentTimestamp returns the appropriate current timestamp function
func GetCurrentTimestamp() string {
	if os.Getenv("DATABASE_URL") != "" {
		return "CURRENT_TIMESTAMP"
	}
	return "datetime('now')"
}

// GetBooleanValue converts boolean to appropriate database value
func GetBooleanValue(b bool) interface{} {
	if os.Getenv("DATABASE_URL") != "" {
		return b // PostgreSQL uses true/false
	}
	if b {
		return 1 // SQLite uses 1/0
	}
	return 0
}

// GetLastInsertID gets the last inserted ID in a database-agnostic way
func (db *DB) GetLastInsertID(result sql.Result, tableName string) (int64, error) {
	if os.Getenv("DATABASE_URL") != "" {
		// PostgreSQL doesn't support LastInsertId, use RETURNING clause instead
		return 0, fmt.Errorf("use RETURNING clause for PostgreSQL")
	}
	return result.LastInsertId()
}