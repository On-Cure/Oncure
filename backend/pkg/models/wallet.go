package models

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"errors"
	"io"
	"os"
	"time"
)

type UserWallet struct {
	ID                 int       `json:"id"`
	UserID             int       `json:"user_id"`
	HederaAccountID    string    `json:"hedera_account_id"`
	EncryptedPrivateKey string   `json:"-"`
	TokenBalance       float64   `json:"token_balance"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}

// CreateUserWallet creates a new wallet record for a user
func CreateUserWallet(db *sql.DB, userID int, accountID, privateKey string) error {
	encryptedKey, err := encryptPrivateKey(privateKey)
	if err != nil {
		return err
	}

	_, err = db.Exec(
		`INSERT INTO user_wallets (user_id, hedera_account_id, encrypted_private_key, token_balance)
		VALUES ($1, $2, $3, $4)`,
		userID, accountID, encryptedKey, 0.0,
	)
	return err
}

// GetUserWallet retrieves wallet information for a user
func GetUserWallet(db *sql.DB, userID int) (*UserWallet, error) {
	wallet := &UserWallet{}
	err := db.QueryRow(
		`SELECT id, user_id, hedera_account_id, encrypted_private_key, token_balance, created_at, updated_at
		FROM user_wallets WHERE user_id = $1`,
		userID,
	).Scan(
		&wallet.ID, &wallet.UserID, &wallet.HederaAccountID, &wallet.EncryptedPrivateKey,
		&wallet.TokenBalance, &wallet.CreatedAt, &wallet.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return wallet, nil
}

// UpdateTokenBalance updates the token balance for a user's wallet
func UpdateTokenBalance(db *sql.DB, userID int, balance float64) error {
	_, err := db.Exec(
		`UPDATE user_wallets SET token_balance = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2`,
		balance, userID,
	)
	return err
}

// DecryptPrivateKey decrypts the stored private key
func (w *UserWallet) DecryptPrivateKey() (string, error) {
	return decryptPrivateKey(w.EncryptedPrivateKey)
}

// encryptPrivateKey encrypts a private key using AES
func encryptPrivateKey(privateKey string) (string, error) {
	key := getEncryptionKey()
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	ciphertext := gcm.Seal(nonce, nonce, []byte(privateKey), nil)
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

// decryptPrivateKey decrypts a private key using AES
func decryptPrivateKey(encryptedKey string) (string, error) {
	key := getEncryptionKey()
	ciphertext, err := base64.StdEncoding.DecodeString(encryptedKey)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return "", errors.New("ciphertext too short")
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}

	return string(plaintext), nil
}

// getEncryptionKey gets the encryption key from environment
func getEncryptionKey() []byte {
	key := os.Getenv("WALLET_ENCRYPTION_KEY")
	if key == "" {
		// Fallback key - should be set in production
		key = "your-32-byte-encryption-key-here"
	}
	// Ensure key is 32 bytes for AES-256
	keyBytes := []byte(key)
	if len(keyBytes) < 32 {
		// Pad with zeros if too short
		padded := make([]byte, 32)
		copy(padded, keyBytes)
		return padded
	}
	return keyBytes[:32]
}

// Transfer represents a transfer record
type Transfer struct {
	ID            int       `json:"id"`
	FromUserID    int       `json:"from_user_id"`
	ToUserID      int       `json:"to_user_id"`
	Amount        float64   `json:"amount"`
	TransactionID string    `json:"transaction_id,omitempty"`
	Status        string    `json:"status"`
	CreatedAt     time.Time `json:"created_at"`
}

// CreateTransfer records a transfer in the database
func CreateTransfer(db *sql.DB, fromUserID, toUserID int, amount float64, transactionID string) error {
	_, err := db.Exec(
		`INSERT INTO transfers (from_user_id, to_user_id, amount, transaction_id, status)
		VALUES ($1, $2, $3, $4, $5)`,
		fromUserID, toUserID, amount, transactionID, "completed",
	)
	return err
}

// SyncWalletBalance updates wallet balance from Hedera network
func SyncWalletBalance(db *sql.DB, userID int, balance float64) error {
	return UpdateTokenBalance(db, userID, balance)
}

// GetTransferHistory gets transfer history for a user
func GetTransferHistory(db *sql.DB, userID int, limit int) ([]Transfer, error) {
	query := `
		SELECT id, from_user_id, to_user_id, amount, transaction_id, status, created_at
		FROM transfers 
		WHERE from_user_id = $1 OR to_user_id = $2
		ORDER BY created_at DESC
		LIMIT $3
	`

	rows, err := db.Query(query, userID, userID, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var transfers []Transfer
	for rows.Next() {
		var t Transfer
		err := rows.Scan(
			&t.ID, &t.FromUserID, &t.ToUserID, &t.Amount,
			&t.TransactionID, &t.Status, &t.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		transfers = append(transfers, t)
	}

	return transfers, nil
}