package middleware

import (
	"net/http"
	"strings"
)

// CORSMiddleware wraps an http.Handler with CORS support
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		
		// Always set credentials first
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Cookie")
		w.Header().Set("Access-Control-Max-Age", "86400")
		
		// Handle origin
		if origin != "" {
			allowedOrigins := []string{
				"http://localhost:3000",
				"https://oncare19.netlify.app",
				"https://main--oncare19.netlify.app",
			}
			
			// Check for Netlify deploy previews
			if strings.Contains(origin, "--oncare19.netlify.app") {
				allowedOrigins = append(allowedOrigins, origin)
			}
			
			for _, allowedOrigin := range allowedOrigins {
				if origin == allowedOrigin {
					w.Header().Set("Access-Control-Allow-Origin", origin)
					break
				}
			}
		} else {
			w.Header().Set("Access-Control-Allow-Origin", "*")
		}

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}