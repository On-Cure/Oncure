package main

import (
	"fmt"
	"log"

	"github.com/hezronokwach/soshi/accounts"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load("../../../.env"); err != nil {
		log.Printf("Warning: Could not load .env file: %v", err)
	}

	// Test account IDs (replace with actual account IDs from your database)
	fromAccount := "0.0.5793590" // Replace with actual account ID  
	toAccount := "0.0.6874833"   // Replace with actual account ID       
	privateKey := "" // Replace with actual private key
	amount := 10.0 // 1 HBAR

	fmt.Printf("Testing HBAR transfer from %s to %s\n", fromAccount, toAccount)

	// Get initial balances
	fromBalance, err := wallet.GetAccountBalance(fromAccount)
	if err != nil {
		log.Printf("Failed to get from balance: %v", err)
	} else {
		fmt.Printf("From account balance: %.8f HBAR\n", fromBalance)
	}

	toBalance, err := wallet.GetAccountBalance(toAccount)
	if err != nil {
		log.Printf("Failed to get to balance: %v", err)
	} else {
		fmt.Printf("To account balance: %.8f HBAR\n", toBalance)
	}

	// Perform transfer
	err = wallet.TransferHbar(fromAccount, toAccount, privateKey, amount)
	if err != nil {
		log.Fatalf("Transfer failed: %v", err)
	}

	fmt.Printf("✓ Successfully transferred %.8f HBAR\n", amount)

	// Get final balances
	fromBalanceAfter, err := wallet.GetAccountBalance(fromAccount)
	if err != nil {
		log.Printf("Failed to get from balance after: %v", err)
	} else {
		fmt.Printf("From account balance after: %.8f HBAR\n", fromBalanceAfter)
	}

	toBalanceAfter, err := wallet.GetAccountBalance(toAccount)
	if err != nil {
		log.Printf("Failed to get to balance after: %v", err)
	} else {
		fmt.Printf("To account balance after: %.8f HBAR\n", toBalanceAfter)
	}
}