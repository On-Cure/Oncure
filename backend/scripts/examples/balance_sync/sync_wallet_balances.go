package main

import (
	"database/sql"
	"fmt"
	"log"

	accounts "github.com/hezronokwach/soshi/accounts"
	"github.com/hezronokwach/soshi/pkg/db/sqlite"
	"github.com/hezronokwach/soshi/pkg/models"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load("../../../.env"); err != nil {
		log.Printf("Warning: Could not load .env file: %v", err)
	}

	// Initialize database
	db, err := sqlite.InitDB()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	// Get all wallets
	wallets, err := getAllWallets(db)
	if err != nil {
		log.Fatalf("Failed to get wallets: %v", err)
	}

	if len(wallets) == 0 {
		fmt.Println("No wallets found.")
		return
	}

	fmt.Printf("Found %d wallets. Syncing balances...\n", len(wallets))

	successCount := 0
	for _, wallet := range wallets {
		if err := syncWalletBalance(db, wallet); err != nil {
			log.Printf("Failed to sync wallet for user %d: %v", wallet.UserID, err)
		} else {
			successCount++
			fmt.Printf("✓ Synced balance for user %d\n", wallet.UserID)
		}
	}

	fmt.Printf("\nCompleted: %d/%d wallets synced successfully\n", successCount, len(wallets))
}

func getAllWallets(db *sql.DB) ([]models.UserWallet, error) {
	query := `SELECT id, user_id, hedera_account_id, encrypted_private_key, token_balance, created_at, updated_at FROM user_wallets`
	
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var wallets []models.UserWallet
	for rows.Next() {
		var wallet models.UserWallet
		err := rows.Scan(
			&wallet.ID, &wallet.UserID, &wallet.HederaAccountID,
			&wallet.EncryptedPrivateKey, &wallet.TokenBalance,
			&wallet.CreatedAt, &wallet.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		wallets = append(wallets, wallet)
	}

	return wallets, nil
}

func syncWalletBalance(db *sql.DB, wallet models.UserWallet) error {
	// Get current balance from Hedera network
	balance, err := accounts.GetAccountBalance(wallet.HederaAccountID)
	if err != nil {
		return fmt.Errorf("failed to get balance from Hedera: %v", err)
	}

	// Update balance in database
	return models.UpdateTokenBalance(db, wallet.UserID, balance)
}