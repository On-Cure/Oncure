package db

import (
	"database/sql"
	"os"

	"github.com/On-cure/Oncure/pkg/db/postgres"
	"github.com/On-cure/Oncure/pkg/db/sqlite"
)

// InitDB initializes the appropriate database based on environment
func InitDB() (*sql.DB, error) {

	println( " Database link is " + os.Getenv("DATABASE_URL"))
	// Check if DATABASE_URL is set (PostgreSQL)
	if os.Getenv("DATABASE_URL") != "" {
		return postgres.InitDB()
	}


	// Fall back to SQLite
	return sqlite.InitDB()
}

// ApplyMigrations applies the appropriate migrations based on environment
func ApplyMigrations() error {
	// Check if DATABASE_URL is set (PostgreSQL)
	if os.Getenv("DATABASE_URL") != "" {
		return postgres.ApplyMigrations()
	}
	// Fall back to SQLite
	return sqlite.ApplyMigrations()
}