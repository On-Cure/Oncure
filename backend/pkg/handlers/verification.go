package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/hezronokwach/soshi/pkg/models"
	"github.com/hezronokwach/soshi/pkg/utils"
)

type VerificationHandler struct {
	db *sql.DB
}

func NewVerificationHandler(db *sql.DB) *VerificationHandler {
	return &VerificationHandler{db: db}
}

// RequestVerification handles verification requests
func (h *VerificationHandler) RequestVerification(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(int)
	
	var req struct {
		RequestedRole string   `json:"requested_role"`
		Documents     []string `json:"documents"`
		Notes         string   `json:"notes"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if req.RequestedRole != "coach" && req.RequestedRole != "mentor" {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid role requested")
		return
	}

	// Check if user already has pending request
	var exists bool
	err := h.db.QueryRow(
		"SELECT EXISTS(SELECT 1 FROM verification_requests WHERE user_id = ? AND status = 'pending')",
		userID,
	).Scan(&exists)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Database error")
		return
	}
	if exists {
		utils.RespondWithError(w, http.StatusConflict, "You already have a pending verification request")
		return
	}

	documentsJSON, _ := json.Marshal(req.Documents)
	
	_, err = h.db.Exec(
		`INSERT INTO verification_requests (user_id, requested_role, documents, notes) 
		 VALUES (?, ?, ?, ?)`,
		userID, req.RequestedRole, string(documentsJSON), req.Notes,
	)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to create verification request")
		return
	}

	utils.RespondWithJSON(w, http.StatusCreated, map[string]string{
		"message": "Verification request submitted successfully",
	})
}

// GetVerificationStatus gets user's verification status
func (h *VerificationHandler) GetVerificationStatus(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(int)
	
	var request models.VerificationRequest
	err := h.db.QueryRow(
		`SELECT id, user_id, requested_role, status, documents, notes, 
		 reviewed_by, reviewed_at, created_at, updated_at 
		 FROM verification_requests WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`,
		userID,
	).Scan(
		&request.ID, &request.UserID, &request.RequestedRole, &request.Status,
		&request.Documents, &request.Notes, &request.ReviewedBy, &request.ReviewedAt,
		&request.CreatedAt, &request.UpdatedAt,
	)
	
	if err != nil {
		if err == sql.ErrNoRows {
			utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{
				"has_request": false,
			})
			return
		}
		utils.RespondWithError(w, http.StatusInternalServerError, "Database error")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, map[string]interface{}{
		"has_request": true,
		"request":     request,
	})
}