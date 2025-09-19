package db

import (
	"database/sql"
	"os"
	"strconv"
	"strings"
)

// Query executes a query with automatic parameter conversion
func Query(db *sql.DB, query string, args ...interface{}) (*sql.Rows, error) {
	if os.Getenv("DATABASE_URL") != "" {
		query = convertToPostgreSQL(query)
	}
	return db.Query(query, args...)
}

// QueryRow executes a query that returns a single row with automatic parameter conversion
func QueryRow(db *sql.DB, query string, args ...interface{}) *sql.Row {
	if os.Getenv("DATABASE_URL") != "" {
		query = convertToPostgreSQL(query)
	}
	return db.QueryRow(query, args...)
}

// Exec executes a query without returning rows with automatic parameter conversion
func Exec(db *sql.DB, query string, args ...interface{}) (sql.Result, error) {
	if os.Getenv("DATABASE_URL") != "" {
		query = convertToPostgreSQL(query)
	}
	return db.Exec(query, args...)
}

// TxExec executes a query on a transaction with automatic parameter conversion
func TxExec(tx *sql.Tx, query string, args ...interface{}) (sql.Result, error) {
	if os.Getenv("DATABASE_URL") != "" {
		query = convertToPostgreSQL(query)
	}
	return tx.Exec(query, args...)
}

func convertToPostgreSQL(query string) string {
	parts := strings.Split(query, "?")
	if len(parts) <= 1 {
		return query
	}
	
	result := parts[0]
	for i := 1; i < len(parts); i++ {
		result += "$" + strconv.Itoa(i) + parts[i]
	}
	return result
}