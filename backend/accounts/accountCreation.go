package wallet

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	hedera "github.com/hashgraph/hedera-sdk-go/v2"
	"github.com/On-cure/Oncure/pkg/models"
		// "github.com/joho/godotenv"
)



func SetupClient() (*hedera.Client, error) {
	// retrieve the private key from .env file using doho/dotenv package
	// err := godotenv.Load()
	// if err != nil {
	// 	return nil, fmt.Errorf("error loading .env file: %v", err)
	// }

	privateKey := os.Getenv("HEDERA_PRIVATE_KEY")
	if privateKey == "" {
		return nil, fmt.Errorf("HEDERA_PRIVATE_KEY not set in .env file")
	}

	operatorIDStr := os.Getenv("HEDERA_CLIENT_ID")
	if operatorIDStr == "" {
		return nil, fmt.Errorf("HEDERA_CLIENT_ID not set in .env file")
	}

	client := hedera.ClientForTestnet() // Use ClientForMainnet() for production
	// Operator account ID and private key from string value
	operatorID, err := hedera.AccountIDFromString(operatorIDStr)
	if err != nil {
		panic(err)
	}

	operatorKey, err := hedera.PrivateKeyFromString(privateKey)
	if err != nil {
		return nil, err
	}
	client.SetOperator(operatorID, operatorKey)
	return client, nil
}

func CreateWallet(client *hedera.Client) (string, string, error) {
	privateKey, err := hedera.GeneratePrivateKey()
	if err != nil {
		return "", "", err
	}
	publicKey := privateKey.PublicKey()

	// Create a new account with initial 5 HBAR balance
	transaction, err := hedera.NewAccountCreateTransaction().
		SetKey(publicKey).
		SetInitialBalance(hedera.NewHbar(5)).
		SetAccountMemo("OnCure user account").
		Execute(client)
	if err != nil {
		return "", "", err
	}

	receipt, err := transaction.GetReceipt(client)
	if err != nil {
		return "", "", err
	}

	log.Printf("Created new account %s with 5 HBAR initial balance", receipt.AccountID.String())
	return receipt.AccountID.String(), privateKey.String(), nil
}

// CreateUserWalletWithDeposit creates wallet and updates balance after successful deposit
func CreateUserWalletWithDeposit(db *sql.DB, userID int, accountID, privateKey string) error {
	// First create the wallet record
	err := models.CreateUserWallet(db, userID, accountID, privateKey)
	if err != nil {
		return err
	}

	// Update balance to 5 HBAR after successful deposit
	return models.UpdateTokenBalance(db, userID, 5.0)
}

// CreateUserWallet creates a Hedera wallet for a new user
func CreateUserWallet() (string, string, error) {
	client, err := SetupClient()
	if err != nil {
		return "", "", err
	}
	defer client.Close()

	return CreateWallet(client)
}

func SetUpTreasuryAccount(client *hedera.Client) (hedera.PrivateKey, hedera.AccountID){
	// Generate Treasury Account Keys
	treasuryPrivateKey, err := hedera.GeneratePrivateKey()
	if err != nil {
		log.Fatalf("Failed to generate treasury private key: %v", err)
	}
	treasuryPublicKey := treasuryPrivateKey.PublicKey()

	// Create the Treasury Account
	treasuryAccountTx, err := hedera.NewAccountCreateTransaction().
		SetKey(treasuryPublicKey).
		SetInitialBalance(hedera.HbarFromTinybar(1000)).
		Execute(client)
	if err != nil {
		log.Fatalf("Failed to create treasury account: %v", err)
	}

	treasuryAccountReceipt, err := treasuryAccountTx.GetReceipt(client)
	if err != nil {
		log.Fatalf("Failed to get treasury account receipt: %v", err)
	}

	treasuryAccountID := *treasuryAccountReceipt.AccountID
	fmt.Printf("Treasury Account Created: %s\n", treasuryAccountID)

	return treasuryPrivateKey, treasuryAccountID
}

func CreateInitialTokenSupply(client *hedera.Client, treasuryPrivateKey hedera.PrivateKey, treasuryAccountID hedera.AccountID) {

	// Create a Token with the Treasury Account and Supply Key
	supplyPrivateKey, err := hedera.GeneratePrivateKey()
	if err != nil {
		log.Fatalf("Failed to generate supply private key: %v", err)
	}

	tokenCreateTx, err := hedera.NewTokenCreateTransaction().
		SetTokenName("ExampleToken").
		SetTokenSymbol("EXT").
		SetTreasuryAccountID(treasuryAccountID).
		SetInitialSupply(0). // No initial supply, mint later
		SetDecimals(2).
		SetSupplyKey(supplyPrivateKey.PublicKey()).
		FreezeWith(client)
	if err != nil {
		log.Fatalf("Failed to create token: %v", err)
	}

	// Sign the transaction with the treasury account key
	signedTokenCreateTx := tokenCreateTx.Sign(treasuryPrivateKey)

	// Execute the transaction
	tokenCreateResponse, err := signedTokenCreateTx.Execute(client)
	if err != nil {
		log.Fatalf("Failed to execute token creation transaction: %v", err)
	}

	tokenCreateReceipt, err := tokenCreateResponse.GetReceipt(client)
	if err != nil {
		log.Fatalf("Failed to get token creation receipt: %v", err)
	}

	tokenID := *tokenCreateReceipt.TokenID
	fmt.Printf("Token Created: %s\n", tokenID)
}

// TransferHbar transfers HBAR between two accounts
func TransferHbar(fromAccountID, toAccountID, fromPrivateKey string, amount float64) (string, error) {
	client, err := SetupClient()
	if err != nil {
		return "", err
	}
	defer client.Close()

	// Parse account IDs
	fromID, err := hedera.AccountIDFromString(fromAccountID)
	if err != nil {
		return "", fmt.Errorf("invalid from account ID: %v", err)
	}

	toID, err := hedera.AccountIDFromString(toAccountID)
	if err != nil {
		return "", fmt.Errorf("invalid to account ID: %v", err)
	}

	// Parse private key
	privateKey, err := hedera.PrivateKeyFromString(fromPrivateKey)
	if err != nil {
		return "", fmt.Errorf("invalid private key: %v", err)
	}

	// Create transfer transaction
	transferTx, err := hedera.NewTransferTransaction().
		AddHbarTransfer(fromID, hedera.NewHbar(-amount)).
		AddHbarTransfer(toID, hedera.NewHbar(amount)).
		FreezeWith(client)
	if err != nil {
		return "", fmt.Errorf("failed to create transfer transaction: %v", err)
	}

	// Sign and execute
	transferTx = transferTx.Sign(privateKey)
	response, err := transferTx.Execute(client)
	if err != nil {
		return "", fmt.Errorf("failed to execute transfer: %v", err)
	}

	// Get receipt
	_, err = response.GetReceipt(client)
	if err != nil {
		return "", fmt.Errorf("transfer failed: %v", err)
	}

	return response.TransactionID.String(), nil
}

// GetAccountBalance gets the HBAR balance of an account
func GetAccountBalance(accountID string) (float64, error) {
	client, err := SetupClient()
	if err != nil {
		return 0, err
	}
	defer client.Close()

	// Parse account ID
	accID, err := hedera.AccountIDFromString(accountID)
	if err != nil {
		return 0, fmt.Errorf("invalid account ID: %v", err)
	}

	// Query balance
	balance, err := hedera.NewAccountBalanceQuery().
		SetAccountID(accID).
		Execute(client)
	if err != nil {
		return 0, fmt.Errorf("failed to query balance: %v", err)
	}

	return balance.Hbars.As(hedera.HbarUnits.Hbar), nil
}

// DepositInitialFunds deposits 5 HBAR to a newly created account
func DepositInitialFunds(toAccountID string) error {
	client, err := SetupClient()
	if err != nil {
		return err
	}
	defer client.Close()

	// Get operator account ID from environment
	operatorIDStr := os.Getenv("HEDERA_CLIENT_ID")
	if operatorIDStr == "" {
		return fmt.Errorf("HEDERA_CLIENT_ID not set")
	}

	// Parse account IDs
	operatorID, err := hedera.AccountIDFromString(operatorIDStr)
	if err != nil {
		return fmt.Errorf("invalid operator account ID: %v", err)
	}

	toID, err := hedera.AccountIDFromString(toAccountID)
	if err != nil {
		return fmt.Errorf("invalid recipient account ID: %v", err)
	}

	// Create transfer transaction for 5 HBAR
	transferTx, err := hedera.NewTransferTransaction().
		AddHbarTransfer(operatorID, hedera.NewHbar(-5)).
		AddHbarTransfer(toID, hedera.NewHbar(5)).
		SetTransactionMemo("Initial deposit for new user").
		Execute(client)
	if err != nil {
		return fmt.Errorf("failed to execute initial deposit: %v", err)
	}

	// Get receipt to confirm transaction
	_, err = transferTx.GetReceipt(client)
	if err != nil {
		return fmt.Errorf("initial deposit failed: %v", err)
	}

	log.Printf("Successfully deposited 5 HBAR to account %s", toAccountID)
	return nil
}
