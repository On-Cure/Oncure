package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/On-cure/Oncure/pkg/hedera"
	"github.com/On-cure/Oncure/pkg/middleware"
	"github.com/On-cure/Oncure/pkg/models"
	"github.com/On-cure/Oncure/pkg/utils"
	hsdk "github.com/hashgraph/hedera-sdk-go/v2"
)

type HederaHandler struct {
	db     *sql.DB
	client *hedera.Service
}

func NewHederaHandler(db *sql.DB, client *hedera.Service) *HederaHandler {
	return &HederaHandler{db: db, client: client}
}

func (h *HederaHandler) CreateHederaAccount(w http.ResponseWriter, r *http.Request) {
	user, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	userID := user.ID
	var req struct {
		InitialBalance float64 `json:"initial_balance"`
	}
	_ = json.NewDecoder(r.Body).Decode(&req)
	if req.InitialBalance <= 0 {
		req.InitialBalance = 1
	}
	acct, err := h.client.CreateAccount(req.InitialBalance)
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	enc, err := h.client.EncryptPrivateKey(acct.PrivateKey)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "encrypt error")
		return
	}
	if err := models.CreateHederaUser(h.db, userID, acct.AccountID.String(), acct.PublicKey.String(), enc); err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "save error")
		return
	}
	utils.RespondWithJSON(w, http.StatusCreated, map[string]any{
		"account_id":      acct.AccountID.String(),
		"public_key":      acct.PublicKey.String(),
		"initial_balance": req.InitialBalance,
	})
}

func (h *HederaHandler) GetHederaAccount(w http.ResponseWriter, r *http.Request) {
	user, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	userID := user.ID
	hu, err := models.GetHederaUserByID(h.db, userID)
	if err != nil || hu == nil {
		utils.RespondWithError(w, http.StatusNotFound, "not found")
		return
	}
	accID, err := hsdk.AccountIDFromString(hu.AccountID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "bad account id")
		return
	}
	bal, err := h.client.GetBalance(accID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "balance error")
		return
	}
	utils.RespondWithJSON(w, http.StatusOK, map[string]any{
		"account_id": hu.AccountID,
		"public_key": hu.PublicKey,
		"balance":    bal,
	})
}

func (h *HederaHandler) SendTip(w http.ResponseWriter, r *http.Request) {
	senderUser, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	var req struct {
		RecipientUserID int     `json:"recipient_user_id"`
		Amount          float64 `json:"amount"`
		Memo            string  `json:"memo"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "invalid body")
		return
	}
	if req.Amount <= 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "amount must be > 0")
		return
	}
	sender, _ := models.GetHederaUserByID(h.db, senderUser.ID)
	recipient, _ := models.GetHederaUserByID(h.db, req.RecipientUserID)
	if sender == nil || recipient == nil {
		utils.RespondWithError(w, http.StatusBadRequest, "both users need accounts")
		return
	}
	sAcc, _ := hsdk.AccountIDFromString(sender.AccountID)
	rAcc, _ := hsdk.AccountIDFromString(recipient.AccountID)
	priv, err := h.client.DecryptPrivateKey(sender.PrivKeyEnc)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "key error")
		return
	}
	txID, err := h.client.TransferHbar(sAcc, rAcc, req.Amount, priv, req.Memo)
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	models.CreateHederaTransaction(h.db, &models.HederaTransaction{
		UserID:          recipient.UserID,
		TransactionID:   txID,
		TransactionType: "tip",
		Amount:          req.Amount,
		Status:          "success",
		Memo:            req.Memo,
	})
	utils.RespondWithJSON(w, http.StatusOK, map[string]any{"message": "tip sent", "transaction_id": txID})
}

func (h *HederaHandler) GetTransactionHistory(w http.ResponseWriter, r *http.Request) {
	user, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	userID := user.ID
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	if offset < 0 {
		offset = 0
	}
	rows, err := models.GetUserTransactions(h.db, userID, limit, offset)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "query error")
		return
	}
	utils.RespondWithJSON(w, http.StatusOK, map[string]any{"transactions": rows, "limit": limit, "offset": offset})
}
