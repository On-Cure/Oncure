package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	md "github.com/On-cure/Oncure/pkg/middleware"
	"github.com/On-cure/Oncure/pkg/utils"

	"github.com/google/uuid"
)

type UploadHandler struct{}

func NewUploadHandler() *UploadHandler {
	return &UploadHandler{}
}

// UploadFile handles file uploads
func (h *UploadHandler) UploadFile(w http.ResponseWriter, r *http.Request) {
	// Get user from context
	user, ok := md.GetUserFromContext(r.Context())
	if !ok {
		utils.RespondWithError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	// Parse multipart form
	err := r.ParseMultipartForm(10 << 20) // 10 MB max
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Failed to parse form")
		return
	}

	// Get file from form
	file, handler, err := r.FormFile("file")
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Failed to get file from form")
		return
	}
	defer file.Close()

	// Check file type
	contentType := handler.Header.Get("Content-Type")
	if !isAllowedFileType(contentType) {
		utils.RespondWithError(w, http.StatusBadRequest, "File type not allowed")
		return
	}

	// Generate unique filename
	filename := fmt.Sprintf("%d_%s_%s", user.ID, uuid.New().String(), handler.Filename)
	filename = sanitizeFilename(filename)

	// Try Pinata IPFS first
	fmt.Printf("[UPLOAD] Attempting Pinata upload for file: %s\n", filename)
	fileURL, err := uploadToPinata(file, filename)
	if err != nil {
		fmt.Printf("[UPLOAD] Pinata failed: %v, falling back to local storage\n", err)
		// Reset file pointer for local storage fallback
		file.Seek(0, 0)
		
		// Fallback to local storage
		uploadsDir := os.Getenv("UPLOAD_PATH")
		if uploadsDir == "" {
			uploadsDir = "./uploads"
		}
		if err := os.MkdirAll(uploadsDir, 0o755); err != nil {
			utils.RespondWithError(w, http.StatusInternalServerError, "Failed to create uploads directory")
			return
		}

		filepath := filepath.Join(uploadsDir, filename)
		dst, err := os.Create(filepath)
		if err != nil {
			utils.RespondWithError(w, http.StatusInternalServerError, "Failed to create file")
			return
		}
		defer dst.Close()

		if _, err = io.Copy(dst, file); err != nil {
			utils.RespondWithError(w, http.StatusInternalServerError, "Failed to save file")
			return
		}

		fileURL = fmt.Sprintf("/uploads/%s", filename)
		fmt.Printf("[UPLOAD] ⚠️  Using local storage (not persistent): %s\n", fileURL)
	} else {
		fmt.Printf("[UPLOAD] ✅ Successfully uploaded to IPFS: %s\n", fileURL)
	}
	utils.RespondWithJSON(w, http.StatusOK, map[string]string{"url": fileURL})
}

// isAllowedFileType checks if the file type is allowed
func isAllowedFileType(contentType string) bool {
	allowedTypes := map[string]bool{
		"image/jpeg":      true,
		"image/png":       true,
		"image/gif":       true,
		"application/pdf": true,
	}
	return allowedTypes[contentType]
}

// UploadFilePublic handles file uploads without authentication (for registration)
func (h *UploadHandler) UploadFilePublic(w http.ResponseWriter, r *http.Request) {
	// Parse multipart form
	err := r.ParseMultipartForm(10 << 20) // 10 MB max
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Failed to parse form")
		return
	}

	// Get file from form
	file, handler, err := r.FormFile("file")
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Failed to get file from form")
		return
	}
	defer file.Close()

	// Check file type
	contentType := handler.Header.Get("Content-Type")
	if !isAllowedFileType(contentType) {
		utils.RespondWithError(w, http.StatusBadRequest, "File type not allowed")
		return
	}

	// Create uploads directory if it doesn't exist
	uploadsDir := "./uploads"
	if err := os.MkdirAll(uploadsDir, 0o755); err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to create uploads directory")
		return
	}

	// Generate unique filename (without user ID since not authenticated)
	filename := fmt.Sprintf("temp_%s_%s", uuid.New().String(), handler.Filename)
	filename = sanitizeFilename(filename)
	filepath := filepath.Join(uploadsDir, filename)

	// Create file
	dst, err := os.Create(filepath)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to create file")
		return
	}
	defer dst.Close()

	// Copy file contents
	if _, err = io.Copy(dst, file); err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Failed to save file")
		return
	}

	// Return the full URL path for the uploaded file
	fileURL := fmt.Sprintf("/uploads/%s", filename)
	utils.RespondWithJSON(w, http.StatusOK, map[string]string{"url": fileURL})
}

// uploadToPinata uploads file to IPFS via Pinata
func uploadToPinata(file multipart.File, filename string) (string, error) {
	apiKey := os.Getenv("PINATA_API_KEY")
	apiSecret := os.Getenv("PINATA_SECRET_API_KEY")

	fmt.Printf("[PINATA] API Key configured: %t\n", apiKey != "")
	fmt.Printf("[PINATA] Secret Key configured: %t\n", apiSecret != "")

	if apiKey == "" || apiSecret == "" {
		fmt.Println("[PINATA] Credentials not configured, falling back to local storage")
		return "", fmt.Errorf("pinata not configured")
	}

	// Reset file pointer
	file.Seek(0, 0)

	var b bytes.Buffer
	w := multipart.NewWriter(&b)

	// Add metadata
	metadata := fmt.Sprintf(`{"name":"%s"}`, filename)
	w.WriteField("pinataMetadata", metadata)
	w.WriteField("pinataOptions", `{"cidVersion":1}`)

	fw, err := w.CreateFormFile("file", filename)
	if err != nil {
		fmt.Printf("[PINATA] Error creating form file: %v\n", err)
		return "", err
	}

	if _, err = io.Copy(fw, file); err != nil {
		fmt.Printf("[PINATA] Error copying file: %v\n", err)
		return "", err
	}

	w.Close()

	fmt.Println("[PINATA] Uploading to IPFS...")
	req, err := http.NewRequest("POST", "https://api.pinata.cloud/pinning/pinFileToIPFS", &b)
	if err != nil {
		fmt.Printf("[PINATA] Error creating request: %v\n", err)
		return "", err
	}

	req.Header.Set("Content-Type", w.FormDataContentType())
	req.Header.Set("pinata_api_key", apiKey)
	req.Header.Set("pinata_secret_api_key", apiSecret)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("[PINATA] Error making request: %v\n", err)
		return "", err
	}
	defer resp.Body.Close()

	fmt.Printf("[PINATA] Response status: %d\n", resp.StatusCode)

	if resp.StatusCode != 200 {
		body, _ := io.ReadAll(resp.Body)
		fmt.Printf("[PINATA] Error response: %s\n", string(body))
		return "", fmt.Errorf("pinata upload failed: %d", resp.StatusCode)
	}

	var result struct {
		IpfsHash string `json:"IpfsHash"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		fmt.Printf("[PINATA] Error decoding response: %v\n", err)
		return "", err
	}

	ipfsURL := fmt.Sprintf("https://gateway.pinata.cloud/ipfs/%s", result.IpfsHash)
	fmt.Printf("[PINATA] ✅ Upload successful! IPFS URL: %s\n", ipfsURL)
	return ipfsURL, nil
}

// sanitizeFilename sanitizes a filename
func sanitizeFilename(filename string) string {
	// Replace spaces with underscores
	filename = strings.ReplaceAll(filename, " ", "_")
	// Remove any characters that aren't alphanumeric, underscore, hyphen, or period
	filename = strings.Map(func(r rune) rune {
		if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r >= '0' && r <= '9') || r == '_' || r == '-' || r == '.' {
			return r
		}
		return -1
	}, filename)
	return filename
}
