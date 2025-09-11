package middleware

import (
	"net/http"
	"os"
)

// CORSMiddleware wraps an http.Handler with CORS support
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		origin := r.Header.Get("Origin")
		
		// In production, be more specific about allowed origins
		if os.Getenv("DATABASE_URL") != "" {
			// Production - allow specific origins including the actual Netlify URL
			allowedOrigins := []string{
				"https://oncare19.netlify.app",
				"https://oncare-frontend.netlify.app",
				"https://oncare.netlify.app",
				"https://main--oncare19.netlify.app",
				"https://deploy-preview-*--oncare19.netlify.app",
			}
			
			allowed := false
			for _, allowedOrigin := range allowedOrigins {
				if origin == allowedOrigin {
					allowed = true
					break
				}
			}
			
			if allowed || origin == "" {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			} else {
				// Fallback for production - allow the main Netlify URL
				w.Header().Set("Access-Control-Allow-Origin", "https://oncare19.netlify.app")
			}
		} else {
			// Development - allow localhost and Netlify
			if origin == "http://localhost:3000" || origin == "https://oncare19.netlify.app" {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			} else {
				w.Header().Set("Access-Control-Allow-Origin", "*")
			}
		}
		
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		w.Header().Set("Access-Control-Max-Age", "86400")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// WithCORS adds CORS headers to responses
func WithCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		origin := r.Header.Get("Origin")
		
		// In production, be more specific about allowed origins
		if os.Getenv("DATABASE_URL") != "" {
			// Production - allow specific origins including the actual Netlify URL
			allowedOrigins := []string{
				"https://oncare19.netlify.app",
				"https://oncare-frontend.netlify.app",
				"https://oncare.netlify.app",
				"https://main--oncare.netlify.app",
			}
			
			allowed := false
			for _, allowedOrigin := range allowedOrigins {
				if origin == allowedOrigin {
					allowed = true
					break
				}
			}
			
			if allowed {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			} else {
				// Fallback for production - allow all for now
				w.Header().Set("Access-Control-Allow-Origin", "*")
			}
		} else {
			// Development - allow all origins
			w.Header().Set("Access-Control-Allow-Origin", "*")
		}
		
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		w.Header().Set("Access-Control-Max-Age", "86400")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}