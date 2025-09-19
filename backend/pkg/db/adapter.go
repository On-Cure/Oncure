package db

import (
	"database/sql"
	"os"
	"strconv"
	"strings"

	"github.com/On-cure/Oncure/pkg/db/postgres"
	"github.com/On-cure/Oncure/pkg/db/sqlite"
)

// IsPostgreSQL checks if we're using PostgreSQL
func IsPostgreSQL() bool {
	return os.Getenv("DATABASE_URL") != ""
}

// Placeholder converts ? placeholders to PostgreSQL $1, $2, etc.
func Placeholder(query string) string {
	if !IsPostgreSQL() {
		return query
	}
	
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

// GetDB returns the appropriate database connection
func GetDB() (*sql.DB, error) {
	if IsPostgreSQL() {
		return postgres.GetDB()
	}
	return sqlite.GetDB()
}