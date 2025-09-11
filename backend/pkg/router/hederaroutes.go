package router

import (
	"net/http"

	"github.com/On-cure/Oncure/pkg/handlers"
)

// SetupHederaRoutes wires Hedera endpoints
func SetupHederaRoutes(router *Router, h *handlers.HederaHandler, auth func(http.Handler) http.Handler) {
	router.AddRoute("POST", "/api/hedera/account/create", WithAuth(h.CreateHederaAccount, auth))
	router.AddRoute("GET", "/api/hedera/account", WithAuth(h.GetHederaAccount, auth))
	router.AddRoute("POST", "/api/hedera/tip", WithAuth(h.SendTip, auth))
	router.AddRoute("GET", "/api/hedera/transactions", WithAuth(h.GetTransactionHistory, auth))
}
