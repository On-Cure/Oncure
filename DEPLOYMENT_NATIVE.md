# Native Deployment (No Docker)

## Backend - Render
1. Connect GitHub repo to Render
2. Use `render.yaml` blueprint
3. Environment variables:
   ```
   PORT=8080
   DB_PATH=./data/soshi.db
   MIGRATIONS_PATH=file://pkg/db/migrations/sqlite
   JWT_SECRET=your-secure-jwt-secret
   UPLOAD_PATH=./uploads
   CGO_ENABLED=1
   ```

## Frontend - Netlify
1. Connect GitHub repo to Netlify
2. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://oncure-backend.onrender.com
   NEXT_PUBLIC_HEDERA_NETWORK=testnet
   ```

## Key Changes for Native Deployment
- Relative paths instead of Docker paths
- CGO_ENABLED=1 for SQLite support
- Direct npm/go builds without containers
- Persistent disk mounted to backend/data