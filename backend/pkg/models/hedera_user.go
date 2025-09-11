package models

import (
	"database/sql"
	"fmt"
	"time"
)

type HederaUser struct {
	ID         int       `json:"id"`
	UserID     int       `json:"user_id"`
	AccountID  string    `json:"hedera_account_id"`
	PublicKey  string    `json:"hedera_public_key"`
	PrivKeyEnc string    `json:"-"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type HederaTransaction struct {
	ID              int       `json:"id"`
	UserID          int       `json:"user_id"`
	TransactionID   string    `json:"transaction_id"`
	TransactionType string    `json:"transaction_type"`
	Amount          float64   `json:"amount,omitempty"`
	TokenID         string    `json:"token_id,omitempty"`
	NftSerialNumber int64     `json:"nft_serial_number,omitempty"`
	Status          string    `json:"status"`
	Memo            string    `json:"memo,omitempty"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type UserBadge struct {
	ID           int       `json:"id"`
	UserID       int       `json:"user_id"`
	BadgeType    string    `json:"badge_type"`
	BadgeName    string    `json:"badge_name"`
	TokenID      string    `json:"token_id"`
	SerialNumber int64     `json:"serial_number"`
	EarnedDate   time.Time `json:"earned_date"`
	Description  string    `json:"description,omitempty"`
}

func CreateHederaUser(db *sql.DB, userID int, accountID, pubKey, privKeyEnc string) error {
	_, err := db.Exec(`
		UPDATE users 
		SET hedera_account_id = ?, hedera_public_key = ?, hedera_private_key_encrypted = ?, updated_at = CURRENT_TIMESTAMP
		WHERE id = ?
	`, accountID, pubKey, privKeyEnc, userID)
	if err != nil {
		return fmt.Errorf("update user hedera fields: %w", err)
	}
	return nil
}

func GetHederaUserByID(db *sql.DB, userID int) (*HederaUser, error) {
	row := db.QueryRow(`
		SELECT id, hedera_account_id, hedera_public_key, hedera_private_key_encrypted, created_at, updated_at
		FROM users WHERE id = ? AND hedera_account_id IS NOT NULL
	`, userID)
	var u HederaUser
	if err := row.Scan(&u.ID, &u.AccountID, &u.PublicKey, &u.PrivKeyEnc, &u.CreatedAt, &u.UpdatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	u.UserID = u.ID
	return &u, nil
}

func CreateHederaTransaction(db *sql.DB, tx *HederaTransaction) (int, error) {
	res, err := db.Exec(`
		INSERT INTO hedera_transactions(user_id, transaction_id, transaction_type, amount, token_id, nft_serial_number, status, memo)
		VALUES(?, ?, ?, ?, ?, ?, ?, ?)
	`, tx.UserID, tx.TransactionID, tx.TransactionType, tx.Amount, tx.TokenID, tx.NftSerialNumber, tx.Status, tx.Memo)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(id), nil
}

func GetUserTransactions(db *sql.DB, userID, limit, offset int) ([]*HederaTransaction, error) {
	rows, err := db.Query(`
		SELECT id, user_id, transaction_id, transaction_type, amount, token_id, nft_serial_number, status, memo, created_at, updated_at
		FROM hedera_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?
	`, userID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*HederaTransaction
	for rows.Next() {
		var t HederaTransaction
		var amount sql.NullFloat64
		var tokenID sql.NullString
		var serial sql.NullInt64
		var memo sql.NullString
		if err := rows.Scan(&t.ID, &t.UserID, &t.TransactionID, &t.TransactionType, &amount, &tokenID, &serial, &t.Status, &memo, &t.CreatedAt, &t.UpdatedAt); err != nil {
			return nil, err
		}
		if amount.Valid {
			t.Amount = amount.Float64
		}
		if tokenID.Valid {
			t.TokenID = tokenID.String
		}
		if serial.Valid {
			t.NftSerialNumber = serial.Int64
		}
		if memo.Valid {
			t.Memo = memo.String
		}
		out = append(out, &t)
	}
	return out, nil
}

func CreateUserBadge(db *sql.DB, b *UserBadge) (int, error) {
	res, err := db.Exec(`
		INSERT INTO user_badges(user_id, badge_type, badge_name, token_id, serial_number, description)
		VALUES(?, ?, ?, ?, ?, ?)
	`, b.UserID, b.BadgeType, b.BadgeName, b.TokenID, b.SerialNumber, b.Description)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(id), nil
}

func GetUserBadges(db *sql.DB, userID int) ([]*UserBadge, error) {
	rows, err := db.Query(`
		SELECT id, user_id, badge_type, badge_name, token_id, serial_number, earned_date, description
		FROM user_badges WHERE user_id = ? ORDER BY earned_date DESC
	`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*UserBadge
	for rows.Next() {
		var b UserBadge
		var desc sql.NullString
		if err := rows.Scan(&b.ID, &b.UserID, &b.BadgeType, &b.BadgeName, &b.TokenID, &b.SerialNumber, &b.EarnedDate, &desc); err != nil {
			return nil, err
		}
		if desc.Valid {
			b.Description = desc.String
		}
		out = append(out, &b)
	}
	return out, nil
}
