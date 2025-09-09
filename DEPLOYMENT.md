# Hybrid Deployment Guide - Backend (Render) + Frontend (Netlify)

## Why This Setup?
- **Frontend on Netlify**: Always available, no cold starts, global CDN
- **Backend on Render**: Free database storage, good for APIs
- **Best of both worlds**: Fast frontend, persistent backend

## Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

## Step 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml` and create backend service

5. Configure environment variables:
   ```
   PORT=8080
   DB_PATH=/opt/render/project/src/data/soshi.db
   MIGRATIONS_PATH=file:///opt/render/project/src/backend/pkg/db/migrations/sqlite
   JWT_SECRET=your-secure-jwt-secret-here
   UPLOAD_PATH=/opt/render/project/src/uploads
   ```

## Step 3: Deploy Frontend to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://oncure-backend.onrender.com
   NEXT_PUBLIC_HEDERA_NETWORK=testnet
   ```
6. Deploy!

## Step 4: Update CORS (Important!)
Update your backend to allow requests from Netlify domain.

## Service URLs
- Backend: `https://oncure-backend.onrender.com`
- Frontend: `https://your-app.netlify.app`

## Benefits
- Frontend loads instantly (no cold starts)
- Backend only sleeps when truly inactive
- Better SEO and user experience
- Free tier suitable for development