package models

import (
	"database/sql"
	"errors"
	"os"
	"time"

	"github.com/On-cure/Oncure/pkg/db"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID                 int        `json:"id"`
	Email              string     `json:"email"`
	Password           string     `json:"-"`
	FirstName          string     `json:"first_name"`
	LastName           string     `json:"last_name"`
	DateOfBirth        string     `json:"date_of_birth"`
	Avatar             string     `json:"avatar,omitempty"`
	Nickname           string     `json:"nickname,omitempty"`
	AboutMe            string     `json:"about_me,omitempty"`
	Role               string     `json:"role"`
	VerificationStatus string     `json:"verification_status"`
	VerifiedAt         *time.Time `json:"verified_at,omitempty"`
	CreatedAt          time.Time  `json:"created_at"`
	UpdatedAt          time.Time  `json:"updated_at"`
	IsPublic           bool       `json:"is_public"`
}

type VerificationRequest struct {
	ID            int        `json:"id"`
	UserID        int        `json:"user_id"`
	RequestedRole string     `json:"requested_role"`
	Status        string     `json:"status"`
	Documents     string     `json:"documents,omitempty"`
	Notes         string     `json:"notes,omitempty"`
	ReviewedBy    *int       `json:"reviewed_by,omitempty"`
	ReviewedAt    *time.Time `json:"reviewed_at,omitempty"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

// CreateUser creates a new user in the database
func CreateUser(database *sql.DB, user User) (int, error) {
	dbWrapper := db.NewDB(database)
	
	// Check if user with email already exists
	var exists bool
	err := dbWrapper.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)", user.Email).Scan(&exists)
	if err != nil {
		return 0, err
	}
	if exists {
		return 0, errors.New("user with this email already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	// Begin transaction
	tx, err := database.Begin()
	if err != nil {
		return 0, err
	}
	defer tx.Rollback()

	// Insert user
	var userID int
	if os.Getenv("DATABASE_URL") != "" {
		// PostgreSQL with RETURNING
		err = tx.QueryRow(
			`INSERT INTO users (email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me, role)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
			user.Email, string(hashedPassword), user.FirstName, user.LastName, user.DateOfBirth, user.Avatar, user.Nickname, user.AboutMe, user.Role,
		).Scan(&userID)
	} else {
		// SQLite with LastInsertId
		result, err := tx.Exec(
			`INSERT INTO users (email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me, role)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			user.Email, string(hashedPassword), user.FirstName, user.LastName, user.DateOfBirth, user.Avatar, user.Nickname, user.AboutMe, user.Role,
		)
		if err == nil {
			id, _ := result.LastInsertId()
			userID = int(id)
		}
	}
	if err != nil {
		return 0, err
	}

	// Create user profile (default to public)
	_, err = tx.Exec(
		db.ConvertSQL(`INSERT INTO user_profiles (user_id, is_public) VALUES (?, ?)`),
		userID, true,
	)
	if err != nil {
		return 0, err
	}

	// Commit transaction
	if err := tx.Commit(); err != nil {
		return 0, err
	}

	return userID, nil
}

// GetUserByEmail retrieves a user by email
func GetUserByEmail(database *sql.DB, email string) (*User, error) {
	user := &User{}
	err := database.QueryRow(
		db.ConvertSQL(`SELECT u.id, u.email, u.password, u.first_name, u.last_name, u.date_of_birth, 
		u.avatar, u.nickname, u.about_me, COALESCE(u.role, 'user') as role, 
		COALESCE(u.verification_status, 'unverified') as verification_status, u.verified_at,
		u.created_at, u.updated_at, COALESCE(p.is_public, true) as is_public
		FROM users u
		LEFT JOIN user_profiles p ON u.id = p.user_id
		WHERE u.email = ?`),
		email,
	).Scan(
		&user.ID, &user.Email, &user.Password, &user.FirstName, &user.LastName, &user.DateOfBirth,
		&user.Avatar, &user.Nickname, &user.AboutMe, &user.Role, &user.VerificationStatus, &user.VerifiedAt,
		&user.CreatedAt, &user.UpdatedAt, &user.IsPublic,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}

// GetUserById retrieves a user by ID
func GetUserById(db *sql.DB, id int) (*User, error) {
	user := &User{}
	err := db.QueryRow(
		db.ConvertSQL(`SELECT u.id, u.email, u.first_name, u.last_name, u.date_of_birth, 
		u.avatar, u.nickname, u.about_me, COALESCE(u.role, 'user') as role,
		COALESCE(u.verification_status, 'unverified') as verification_status, u.verified_at,
		u.created_at, u.updated_at, COALESCE(p.is_public, true) as is_public
		FROM users u
		LEFT JOIN user_profiles p ON u.id = p.user_id
		WHERE u.id = ?`),
		id,
	).Scan(
		&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.DateOfBirth,
		&user.Avatar, &user.Nickname, &user.AboutMe, &user.Role, &user.VerificationStatus, &user.VerifiedAt,
		&user.CreatedAt, &user.UpdatedAt, &user.IsPublic,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}

// AuthenticateUser authenticates a user with email and password
func AuthenticateUser(database *sql.DB, email, password string) (*User, error) {
	user, err := GetUserByEmail(database, email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, nil
	}

	// Compare password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, nil
	}

	return user, nil
}

// UpdateUser updates user information
func UpdateUser(db *sql.DB, user *User) error {
	_, err := db.Exec(
		`UPDATE users SET 
		first_name = ?, last_name = ?, date_of_birth = ?, 
		avatar = ?, nickname = ?, about_me = ?, updated_at = CURRENT_TIMESTAMP
		WHERE id = ?`,
		user.FirstName, user.LastName, user.DateOfBirth,
		user.Avatar, user.Nickname, user.AboutMe, user.ID,
	)
	return err
}

// GetSuggestedUsers returns all users in the database (except current user)
func GetSuggestedUsers(db *sql.DB, userID int) ([]map[string]interface{}, error) {
	query := `
		SELECT u.id, u.email, u.first_name, u.last_name, u.date_of_birth, 
		       u.avatar, u.nickname, u.about_me, COALESCE(u.role, 'user') as role,
		       COALESCE(u.verification_status, 'unverified') as verification_status,
		       u.created_at, u.updated_at, COALESCE(p.is_public, true) as is_public
		FROM users u
		LEFT JOIN user_profiles p ON u.id = p.user_id
		WHERE u.id != ?
		ORDER BY u.created_at DESC
		LIMIT 20
	`

	rows, err := db.Query(db.ConvertSQL(query), userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []map[string]interface{}
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.DateOfBirth,
			&user.Avatar, &user.Nickname, &user.AboutMe, &user.Role, &user.VerificationStatus,
			&user.CreatedAt, &user.UpdatedAt, &user.IsPublic,
		)
		if err != nil {
			return nil, err
		}

		// Check follow status in both directions
		isFollowing, err := IsFollowing(db, userID, user.ID)
		if err != nil {
			isFollowing = "none"
		}
		isFollowedBy, err := IsFollowing(db, user.ID, userID)
		if err != nil {
			isFollowedBy = "none"
		}

		userMap := map[string]interface{}{
			"id":                   user.ID,
			"email":                user.Email,
			"first_name":           user.FirstName,
			"last_name":            user.LastName,
			"date_of_birth":        user.DateOfBirth,
			"avatar":               user.Avatar,
			"nickname":             user.Nickname,
			"about_me":             user.AboutMe,
			"role":                 user.Role,
			"verification_status":  user.VerificationStatus,
			"created_at":           user.CreatedAt,
			"updated_at":           user.UpdatedAt,
			"is_public":            user.IsPublic,
			"is_following":         isFollowing == "accepted",
			"is_followed_by":       isFollowedBy == "accepted",
		}
		users = append(users, userMap)
	}

	return users, nil
}

// GetUsersByIDs retrieves multiple users by their IDs
func GetUsersByIDs(db *sql.DB, userIDs []int) ([]User, error) {
	if len(userIDs) == 0 {
		return []User{}, nil
	}

	// Build placeholders for the IN clause
	placeholders := make([]string, len(userIDs))
	args := make([]interface{}, len(userIDs))
	for i, id := range userIDs {
		placeholders[i] = "?"
		args[i] = id
	}

	query := `
		SELECT u.id, u.email, u.first_name, u.last_name, u.date_of_birth,
		       u.avatar, u.nickname, u.about_me, u.created_at, u.updated_at,
		       COALESCE(p.is_public, true) as is_public
		FROM users u
		LEFT JOIN user_profiles p ON u.id = p.user_id
		WHERE u.id IN (` + joinPlaceholders(placeholders) + `)
		ORDER BY u.first_name, u.last_name
	`

	rows, err := db.Query(db.ConvertSQL(query), args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.DateOfBirth,
			&user.Avatar, &user.Nickname, &user.AboutMe, &user.CreatedAt, &user.UpdatedAt, &user.IsPublic,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

// Helper function to join placeholders with commas
func joinPlaceholders(placeholders []string) string {
	if len(placeholders) == 0 {
		return ""
	}
	if len(placeholders) == 1 {
		return placeholders[0]
	}

	result := placeholders[0]
	for i := 1; i < len(placeholders); i++ {
		result += ", " + placeholders[i]
	}
	return result
}

// GetUserBySessionToken retrieves a user by their session token
func GetUserBySessionToken(db *sql.DB, sessionToken string) (*User, error) {
	query := `
		SELECT u.id, u.email, u.first_name, u.last_name, u.date_of_birth,
		       u.avatar, u.nickname, u.about_me, u.created_at, u.updated_at,
		       COALESCE(p.is_public, true) as is_public
		FROM users u
		LEFT JOIN user_profiles p ON u.id = p.user_id
		INNER JOIN sessions s ON u.id = s.user_id
		WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP
	`

	var user User
	err := db.QueryRow(db.ConvertSQL(query), sessionToken).Scan(
		&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.DateOfBirth,
		&user.Avatar, &user.Nickname, &user.AboutMe, &user.CreatedAt, &user.UpdatedAt, &user.IsPublic,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, err
		}
		return nil, err
	}

	return &user, nil
}

// GetAllUsers returns all users, including private ones, for the sidebar
func GetAllUsers(db *sql.DB, excludeUserID int) ([]map[string]interface{}, error) {
	query := `
		SELECT u.id, u.email, u.first_name, u.last_name, u.date_of_birth, 
		       u.avatar, u.nickname, u.about_me, COALESCE(u.role, 'user') as role,
		       COALESCE(u.verification_status, 'unverified') as verification_status,
		       u.created_at, u.updated_at, COALESCE(p.is_public, true) as is_public
		FROM users u
		LEFT JOIN user_profiles p ON u.id = p.user_id
		WHERE u.id != ?
		ORDER BY u.created_at DESC
		LIMIT 100
	`

	rows, err := db.Query(db.ConvertSQL(query), excludeUserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []map[string]interface{}
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.DateOfBirth,
			&user.Avatar, &user.Nickname, &user.AboutMe, &user.Role, &user.VerificationStatus,
			&user.CreatedAt, &user.UpdatedAt, &user.IsPublic,
		)
		if err != nil {
			return nil, err
		}
		userMap := map[string]interface{}{
			"id":                   user.ID,
			"email":                user.Email,
			"first_name":           user.FirstName,
			"last_name":            user.LastName,
			"date_of_birth":        user.DateOfBirth,
			"avatar":               user.Avatar,
			"nickname":             user.Nickname,
			"about_me":             user.AboutMe,
			"role":                 user.Role,
			"verification_status":  user.VerificationStatus,
			"created_at":           user.CreatedAt,
			"updated_at":           user.UpdatedAt,
			"is_public":            user.IsPublic,
		}
		users = append(users, userMap)
	}

	return users, nil
}
