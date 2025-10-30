package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/On-cure/Oncure/accounts"
	"github.com/On-cure/Oncure/pkg/middleware"
	"github.com/On-cure/Oncure/pkg/models"
	"github.com/On-cure/Oncure/pkg/utils"
)

type TransferHandler struct {
	db *sql.DB
}

func NewTransferHandler(db *sql.DB) *TransferHandler {
	return &TransferHandler{db: db}
}

// TransferHbar handles HBAR transfers between users
func (h *TransferHandler) TransferHbar(w http.ResponseWriter, r *http.Request) {
	var req struct {
		ToUserID int     `json:"to_user_id"`
		Amount   float64 `json:"amount"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Get current user from session
	user, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "User not found in context")
		return
	}
	userID := user.ID

	// Get sender wallet
	senderWallet, err := models.GetUserWallet(h.db, userID)
	if err != nil || senderWallet == nil {
		utils.RespondWithError(w, http.StatusNotFound, "Sender wallet not found")
		return
	}

	// Get receiver wallet
	receiverWallet, err := models.GetUserWallet(h.db, req.ToUserID)
	if err != nil || receiverWallet == nil {
		utils.RespondWithError(w, http.StatusNotFound, "Receiver wallet not found")
		return
	}

	// Decrypt sender's private key
	privateKey, err := senderWallet.DecryptPrivateKey()
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to decrypt private key")
		return
	}

	// Perform transfer
	transactionID, err := wallet.TransferHbar(
		senderWallet.HederaAccountID,
		receiverWallet.HederaAccountID,
		privateKey,
		req.Amount,
	)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Transfer failed: "+err.Error())
		return
	}

	// Record transfer in database
	err = models.CreateTransfer(h.db, userID, req.ToUserID, req.Amount, transactionID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to record transfer: "+err.Error())
		return
	}

	// Update balances in database
	senderBalance, _ := wallet.GetAccountBalance(senderWallet.HederaAccountID)
	receiverBalance, _ := wallet.GetAccountBalance(receiverWallet.HederaAccountID)
	models.SyncWalletBalance(h.db, userID, senderBalance)
	models.SyncWalletBalance(h.db, req.ToUserID, receiverBalance)

	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{
		"message": "Transfer successful",
		"amount":  req.Amount,
		"to":      receiverWallet.HederaAccountID,
	})
}

// GetBalance returns the HBAR balance for the current user
func (h *TransferHandler) GetBalance(w http.ResponseWriter, r *http.Request) {
	user, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "User not found in context")
		return
	}
	userID := user.ID

	// Get user wallet
	userWallet, err := models.GetUserWallet(h.db, userID)
	if err != nil || userWallet == nil {
		utils.RespondWithError(w, http.StatusNotFound, "Wallet not found")
		return
	}

	// Get balance from Hedera
	balance, err := wallet.GetAccountBalance(userWallet.HederaAccountID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to get balance: "+err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{
		"account_id": userWallet.HederaAccountID,
		"balance":    balance,
	})
}

// GetUserBalance returns the HBAR balance for a specific user (by user ID)
func (h *TransferHandler) GetUserBalance(w http.ResponseWriter, r *http.Request) {
	userIDStr := r.URL.Query().Get("user_id")
	if userIDStr == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "user_id parameter required")
		return
	}

	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid user_id")
		return
	}

	// Get user wallet
	userWallet, err := models.GetUserWallet(h.db, userID)
	if err != nil || userWallet == nil {
		utils.RespondWithError(w, http.StatusNotFound, "Wallet not found")
		return
	}

	// Get balance from Hedera
	balance, err := wallet.GetAccountBalance(userWallet.HederaAccountID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to get balance: "+err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{
		"user_id":    userID,
		"account_id": userWallet.HederaAccountID,
		"balance":    balance,
	})
}

// GetTransferHistory returns transfer history for the current user
func (h *TransferHandler) GetTransferHistory(w http.ResponseWriter, r *http.Request) {
	user, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "User not found in context")
		return
	}
	userID := user.ID

	// Get transfer history
	transfers, err := models.GetTransferHistory(h.db, userID, 50)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to get transfer history: "+err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{
		"transfers": transfers,
	})
}