package router

import (
	"net/http"

	"github.com/On-cure/Oncure/pkg/handlers"
)

// SetupTransferRoutes configures HBAR transfer routes
func SetupTransferRoutes(router *Router, transferHandler *handlers.TransferHandler, authMiddleware func(http.Handler) http.Handler) {
	// Transfer routes
	router.AddRoute("POST", "/api/transfer/hbar", WithAuth(transferHandler.TransferHbar, authMiddleware))
	router.AddRoute("GET", "/api/transfer/balance", WithAuth(transferHandler.GetBalance, authMiddleware))
	router.AddRoute("GET", "/api/transfer/balance/user", WithAuth(transferHandler.GetUserBalance, authMiddleware))
	router.AddRoute("GET", "/api/transfer/history", WithAuth(transferHandler.GetTransferHistory, authMiddleware))
}