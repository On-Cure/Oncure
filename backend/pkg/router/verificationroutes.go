package router

import (
	"net/http"

	"github.com/On-cure/Oncure/pkg/handlers"
)

// SetupVerificationRoutes sets up verification-related routes
func SetupVerificationRoutes(router *Router, verificationHandler *handlers.VerificationHandler, authMiddleware func(http.Handler) http.Handler) {
	// Verification routes (require authentication)
	router.AddRoute("POST", "/api/verification/request", WithAuth(verificationHandler.RequestVerification, authMiddleware))
	router.AddRoute("GET", "/api/verification/status", WithAuth(verificationHandler.GetVerificationStatus, authMiddleware))
}