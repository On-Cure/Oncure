package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/On-cure/Oncure/accounts"
	"github.com/On-cure/Oncure/pkg/models"
	"github.com/On-cure/Oncure/pkg/utils"

	"github.com/google/uuid"
)

type AuthHandler struct {
	db *sql.DB
}

func NewAuthHandler(db *sql.DB) *AuthHandler {
	return &AuthHandler{db: db}
}

// Register handles user registration
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var req struct {
		Email       string `json:"email"`
		Password    string `json:"password"`
		FirstName   string `json:"first_name"`
		LastName    string `json:"last_name"`
		DateOfBirth string `json:"date_of_birth"`
		Avatar      string `json:"avatar"`
		Nickname    string `json:"nickname"`
		AboutMe     string `json:"about_me"`
		Role        string `json:"role"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Validate required fields
	if req.Email == "" || req.Password == "" || req.FirstName == "" || req.LastName == "" || req.DateOfBirth == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "Missing required fields")
		return
	}

	// Set default role if not provided
	if req.Role == "" {
		req.Role = "user"
	}

	// Create user
	user := models.User{
		Email:       req.Email,
		Password:    req.Password,
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		DateOfBirth: req.DateOfBirth,
		Avatar:      req.Avatar,
		Nickname:    req.Nickname,
		AboutMe:     req.AboutMe,
		Role:        req.Role,
	}

	userId, err := models.CreateUser(h.db, user)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Create Hedera wallet for the user
	accountID, privateKey, err := wallet.CreateUserWallet()
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to create wallet: "+err.Error())
		return
	}

	// Store wallet information in database
	err = models.CreateUserWallet(h.db, userId, accountID, privateKey)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to store wallet: "+err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusCreated, map[string]interface{}{
		"message":           "User registered successfully",
		"user_id":           userId,
		"hedera_account_id": accountID,
	})
}

// Login handles user login
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Authenticate user
	user, err := models.AuthenticateUser(h.db, req.Email, req.Password)
	if err != nil {
		log.Printf("Authentication error for %s: %v", req.Email, err)
		utils.RespondWithError(w, http.StatusInternalServerError, "Authentication error")
		return
	}
	if user == nil {
		log.Printf("Invalid credentials for %s", req.Email)
		utils.RespondWithError(w, http.StatusUnauthorized, "Invalid email or password")
		return
	}

	// Create session
	sessionToken := uuid.New().String()
	err = models.CreateSession(h.db, user.ID, sessionToken)
	if err != nil {
		log.Printf("Failed to create session for user %d: %v", user.ID, err)
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to create session")
		return
	}

	// Set session cookie with proper cross-origin settings
	isProduction := os.Getenv("DATABASE_URL") != ""
	cookie := &http.Cookie{
		Name:     "session_token",
		Value:    sessionToken,
		Path:     "/",
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		HttpOnly: true,
		SameSite: func() http.SameSite {
			if isProduction {
				return http.SameSiteNoneMode
			}
			return http.SameSiteLaxMode
		}(),
		Secure: isProduction,
	}
	http.SetCookie(w, cookie)
	
	// Also set in response header for debugging
	w.Header().Set("X-Session-Token", sessionToken)

	utils.RespondWithJSON(w, http.StatusOK, user)
}

// Logout handles user logout
func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	// Get session token from cookie
	cookie, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			utils.RespondWithError(w, http.StatusUnauthorized, "No session token provided")
			return
		}
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid request")
		return
	}
	sessionToken := cookie.Value

	// Delete session
	err = models.DeleteSessionByToken(h.db, sessionToken)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to delete session")
		return
	}

	// Clear cookie
	isProduction := os.Getenv("DATABASE_URL") != ""
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    "",
		Path:     "/",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
		SameSite: func() http.SameSite {
			if isProduction {
				return http.SameSiteNoneMode
			}
			return http.SameSiteLaxMode
		}(),
		Secure: isProduction,
	})

	utils.RespondWithJSON(w, http.StatusOK, map[string]string{"message": "Logged out successfully"})
}

// GetSession retrieves the current user session
func (h *AuthHandler) GetSession(w http.ResponseWriter, r *http.Request) {
	// Get session token from cookie
	cookie, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			utils.RespondWithError(w, http.StatusUnauthorized, "No session token provided")
			return
		}
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid request")
		return
	}
	sessionToken := cookie.Value

	// Get session
	session, err := models.GetSessionByToken(h.db, sessionToken)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to retrieve session")
		return
	}
	if session == nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "Invalid or expired session")
		return
	}

	// Get user
	user, err := models.GetUserById(h.db, session.UserID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to retrieve user")
		return
	}
	if user == nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "User not found")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, user)
}
