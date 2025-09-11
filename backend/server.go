package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	db "github.com/On-cure/Oncure/pkg/db"
	"github.com/On-cure/Oncure/pkg/handlers"
	"github.com/On-cure/Oncure/pkg/hedera"
	"github.com/On-cure/Oncure/pkg/middleware"
	r "github.com/On-cure/Oncure/pkg/router"
	"github.com/On-cure/Oncure/pkg/websocket"
)

func main() {
	// Initialize database
	dbConn, err := db.InitDB()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer dbConn.Close()

	// Apply migrations
	if err := db.ApplyMigrations(); err != nil {
		log.Fatalf("Failed to apply migrations: %v", err)
	}

	// Optional Hedera service
	var hederaSvc *hedera.Service
	var hederaHandler *handlers.HederaHandler
	if os.Getenv("HEDERA_ACCOUNT_ID") != "" && os.Getenv("HEDERA_PRIVATE_KEY") != "" {
		if svc, err := hedera.NewService(); err != nil {
			log.Printf("Hedera disabled: %v", err)
		} else {
			hederaSvc = svc
			hederaHandler = handlers.NewHederaHandler(dbConn, hederaSvc)
			log.Println("Hedera features enabled")
		}
	}

	// Initialize websocket hub
	hub := websocket.NewHub(dbConn)
	go hub.Run()

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(dbConn)
	postHandler := handlers.NewPostHandler(dbConn)
	commentHandler := handlers.NewCommentHandler(dbConn)
	groupHandler := handlers.NewGroupHandler(dbConn)
	groupCommentHandler := handlers.NewGroupCommentHandler(dbConn)
	userHandler := handlers.NewUserHandler(dbConn, hub)
	messageHandler := handlers.NewMessageHandler(dbConn, hub)
	activityHandler := handlers.NewActivityHandler(dbConn)
	uploadHandler := handlers.NewUploadHandler()
	wsHandler := handlers.NewWebSocketHandler(hub, dbConn)
	notificationHandler := handlers.NewNotificationHandler(dbConn)
	verificationHandler := handlers.NewVerificationHandler(dbConn)

	// Create router
	router := r.NewRouter()
	authMiddleware := middleware.Auth(dbConn)

	// Serve static files for uploads
	fs := http.FileServer(http.Dir("./uploads"))
	router.AddRoute("GET", "/uploads/{file:.*}", func(w http.ResponseWriter, r *http.Request) {
		http.StripPrefix("/uploads/", fs).ServeHTTP(w, r)
	})

	// Setup all routes
	r.SetupAuthRoutes(router, authHandler)
	r.SetupPostRoutes(router, postHandler, commentHandler, authMiddleware)
	r.SetupGroupRoutes(router, groupHandler, groupCommentHandler, messageHandler, authMiddleware)
	r.SetupUserRoutes(router, userHandler, authMiddleware)
	r.SetupActivityRoutes(router, activityHandler, authMiddleware)
	r.SetupNotificationRoutes(router, notificationHandler, authMiddleware)
	r.SetupMessageRoutes(router, messageHandler, authMiddleware)
	r.SetupUploadRoutes(router, uploadHandler, authMiddleware)
	r.SetupWebSocketRoutes(router, wsHandler)
	r.SetupVerificationRoutes(router, verificationHandler, authMiddleware)
	if hederaHandler != nil {
		r.SetupHederaRoutes(router, hederaHandler, authMiddleware)
	}

	// Apply global middleware and use our router
	var handler http.Handler = router
	handler = middleware.CORSMiddleware(handler)
	handler = middleware.WithLogging(handler.ServeHTTP)
	handler = middleware.WithRecover(handler.ServeHTTP)
	handler = middleware.WithTimeout(handler.ServeHTTP, 60*time.Second)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	fmt.Printf("Server starting on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
