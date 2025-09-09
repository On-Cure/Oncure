# Hybrid Deployment Checklist (Render + Netlify)

## Pre-Deployment
- [ ] Code pushed to GitHub repository
- [ ] `render.yaml` for backend created
- [ ] `netlify.toml` for frontend created
- [ ] Environment variables documented
- [ ] Database migrations ready

## Backend Deployment (Render)
- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Backend service deployed from `render.yaml`
- [ ] Environment variables configured
- [ ] Persistent disk attached for database
- [ ] Backend accessible at URL

## Frontend Deployment (Netlify)
- [ ] Netlify account created
- [ ] GitHub repository connected
- [ ] Auto-deploy from main branch enabled
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Frontend accessible at URL

## Environment Variables

### Render (Backend)
```
PORT=8080
DB_PATH=/opt/render/project/src/data/soshi.db
MIGRATIONS_PATH=file:///opt/render/project/src/backend/pkg/db/migrations/sqlite
JWT_SECRET=your-secure-jwt-secret-here
UPLOAD_PATH=/opt/render/project/src/uploads
```

### Netlify (Frontend)
```
NEXT_PUBLIC_API_URL=https://oncure-backend.onrender.com
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

## Service URLs
- Backend: `https://oncure-backend.onrender.com`
- Frontend: `https://your-app.netlify.app`

## Benefits of This Setup
- Frontend always available (no cold starts)
- Backend only sleeps when inactive
- Better user experience
- Cost-effective for development