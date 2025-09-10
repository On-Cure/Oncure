# Render Deployment Guide

## Quick Deploy with Render Database

### Step 1: Create PostgreSQL Database
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **PostgreSQL**
3. Configure:
   - **Name**: `oncare-db`
   - **Database**: `oncare`
   - **User**: `oncare_user`
   - **Region**: Choose closest to your users
4. Click **Create Database**
5. **Copy the DATABASE_URL** from the database info page

### Step 2: Deploy Backend Service
1. Click **New** → **Web Service**
2. Connect your GitHub repository: `https://github.com/On-cure/Oncure`
3. Configure service:
   - **Name**: `oncare-backend`
   - **Environment**: `Go`
   - **Build Command**: `cd backend && go build -o server server.go`
   - **Start Command**: `cd backend && ./server`

### Step 3: Set Environment Variables
Add these environment variables in Render:

```env
DATABASE_URL=<paste-your-database-url-here>
MIGRATIONS_PATH=file://pkg/db/migrations/postgres
JWT_SECRET=your-super-secret-jwt-key-here
UPLOAD_PATH=./uploads
```

Optional Hedera variables:
```env
HEDERA_ACCOUNT_ID=your-hedera-account-id
HEDERA_PRIVATE_KEY=your-hedera-private-key
HEDERA_NETWORK=testnet
```

### Step 4: Deploy
1. Click **Create Web Service**
2. Render will automatically:
   - Build your Go application
   - Run PostgreSQL migrations
   - Start the server

### Step 5: Deploy Frontend (Netlify)
1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure:
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/.next`
4. Add environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
   ```

## Alternative: Using render.yaml

You can also use the included `render.yaml` file for automatic deployment:

1. Push your code to GitHub
2. In Render Dashboard, click **New** → **Blueprint**
3. Connect your repository
4. Render will automatically create both database and web service

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string from Render | `postgres://user:pass@host/db` |
| `MIGRATIONS_PATH` | Path to PostgreSQL migrations | `file://pkg/db/migrations/postgres` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-123` |
| `UPLOAD_PATH` | Directory for file uploads | `./uploads` |

## Troubleshooting

### Build Fails
- Ensure Go version is 1.21+ in Render settings
- Check build logs for missing dependencies

### Database Connection Issues
- Verify DATABASE_URL is correctly set
- Ensure PostgreSQL service is running
- Check database connection string format

### Migration Errors
- Migrations run automatically on startup
- Check logs for specific migration failures
- Ensure MIGRATIONS_PATH points to postgres folder

### File Uploads
- Render has ephemeral filesystem
- Consider using cloud storage (AWS S3, Cloudinary) for production
- Current setup works for testing

## Production Checklist

- [ ] PostgreSQL database created on Render
- [ ] Backend service deployed and running
- [ ] Environment variables configured
- [ ] Database migrations successful
- [ ] Frontend deployed on Netlify
- [ ] API URL configured in frontend
- [ ] SSL certificates (automatic with Render)
- [ ] Custom domain configured (optional)

## Monitoring

- Check Render service logs for errors
- Monitor database performance in Render dashboard
- Set up alerts for service downtime

Your onCare application will be live at:
- Backend: `https://your-service-name.onrender.com`
- Frontend: `https://your-site-name.netlify.app`