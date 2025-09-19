package main

import (
	"database/sql"
	"fmt"
	"log"


	"github.com/hezronokwach/soshi/accounts"
	"github.com/hezronokwach/soshi/pkg/db/sqlite"
	"github.com/hezronokwach/soshi/pkg/models"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load("../.env"); err != nil {
		log.Printf("Warning: Could not load .env file: %v", err)
	}

	// Initialize database
	db, err := sqlite.InitDB()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	// Get all users without wallets
	users, err := getUsersWithoutWallets(db)
	if err != nil {
		log.Fatalf("Failed to get users: %v", err)
	}

	if len(users) == 0 {
		fmt.Println("No users found without wallets.")
		return
	}

	fmt.Printf("Found %d users without wallets. Creating wallets...\n", len(users))

	successCount := 0
	for _, userID := range users {
		if err := createWalletForUser(db, userID); err != nil {
			log.Printf("Failed to create wallet for user %d: %v", userID, err)
		} else {
			successCount++
			fmt.Printf("✓ Created wallet for user %d\n", userID)
		}
	}

	fmt.Printf("\nCompleted: %d/%d wallets created successfully\n", successCount, len(users))
}

func getUsersWithoutWallets(db *sql.DB) ([]int, error) {
	query := `
		SELECT u.id 
		FROM users u 
		LEFT JOIN user_wallets w ON u.id = w.user_id 
		WHERE w.user_id IS NULL
	`
	
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var userIDs []int
	for rows.Next() {
		var userID int
		if err := rows.Scan(&userID); err != nil {
			return nil, err
		}
		userIDs = append(userIDs, userID)
	}

	return userIDs, nil
}

func createWalletForUser(db *sql.DB, userID int) error {
	// Create Hedera wallet
	accountID, privateKey, err := wallet.CreateUserWallet()
	if err != nil {
		return fmt.Errorf("failed to create Hedera wallet: %v", err)
	}

	// Store in database
	return models.CreateUserWallet(db, userID, accountID, privateKey)
}