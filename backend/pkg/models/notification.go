package models

import (
	"database/sql"
	"time"

	"github.com/On-cure/Oncure/pkg/db"
)

type Notification struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	Type      string    `json:"type"`
	Message   string    `json:"message"`
	RelatedID int       `json:"related_id,omitempty"`
	IsRead    bool      `json:"is_read"`
	CreatedAt time.Time `json:"created_at"`
}

// CreateNotification creates a new notification
func CreateNotification(database *sql.DB, userId int, notificationType string, message string, relatedId int) (int, error) {
	result, err := db.Exec(database,
		`INSERT INTO notifications (user_id, type, message, related_id) VALUES (?, ?, ?, ?)`,
		userId, notificationType, message, relatedId,
	)
	if err != nil {
		return 0, err
	}

	notificationId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(notificationId), nil
}

// GetUserNotifications retrieves notifications for a user
func GetUserNotifications(database *sql.DB, userId int, page int, limit int) ([]Notification, error) {
	offset := (page - 1) * limit
	notifications := []Notification{}

	rows, err := db.Query(database, `
		SELECT id, user_id, type, message, related_id, is_read, created_at
		FROM notifications
		WHERE user_id = ?
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`, userId, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var notification Notification
		err := rows.Scan(
			&notification.ID, &notification.UserID, &notification.Type, &notification.Message,
			&notification.RelatedID, &notification.IsRead, &notification.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		notifications = append(notifications, notification)
	}

	return notifications, nil
}

// MarkNotificationAsRead marks a notification as read
func MarkNotificationAsRead(database *sql.DB, notificationId int, userId int) error {
	_, err := db.Exec(database,
		"UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?",
		notificationId, userId,
	)
	return err
}

// MarkAllNotificationsAsRead marks all notifications for a user as read
func MarkAllNotificationsAsRead(database *sql.DB, userId int) error {
	_, err := db.Exec(database,
		"UPDATE notifications SET is_read = 1 WHERE user_id = ?",
		userId,
	)
	return err
}

// GetUnreadNotificationCount gets the count of unread notifications for a user
func GetUnreadNotificationCount(database *sql.DB, userId int) (int, error) {
	var count int
	err := db.QueryRow(database,
		"SELECT COUNT(*) FROM notifications WHERE user_id = ? AND is_read = 0",
		userId,
	).Scan(&count)
	return count, err
}
