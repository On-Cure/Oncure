# OnCure Frontend: Netlify to Vercel Migration Guide

## Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository access
- Backend deployed on Render

## Step 1: Prepare Local Environment

### 1.1 Update Environment Variables
```bash
# Update .env.local
NEXT_PUBLIC_API_URL=https://oncure-backend.onrender.com
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

### 1.2 Create Production Environment File
```bash
# Create .env.production
NEXT_PUBLIC_API_URL=https://oncure-backend.onrender.com
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

### 1.3 Update Next.js Configuration
```javascript
// next.config.js - Add Vercel optimizations
const nextConfig = {
  images: {
    domains: ['localhost', 'oncure-backend.onrender.com'],
  },
  output: 'standalone', // Vercel optimization
  // ... rest of config
};
```

### 1.4 Remove Netlify Files
```bash
rm -f netlify.toml _redirects public/_redirects
```

## Step 2: Deploy to Vercel

### 2.1 Import Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select `frontend` as root directory

### 2.2 Configure Build Settings
- **Framework:** Next.js
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 2.3 Set Environment Variables
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://oncure-backend.onrender.com
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

### 2.4 Deploy
Click "Deploy" and wait for completion.

## Step 3: Update Backend CORS

Update your Render backend to allow your new Vercel domain:
```go
// Add your Vercel URL to CORS origins
origins := []string{
    "https://your-app-name.vercel.app", // Replace with actual URL
    "http://localhost:3000",
}
```

## Step 4: Replace Netlify URLs in Code

After deployment, replace all Netlify references with your new Vercel URL:

### 4.1 Search for Netlify URLs
```bash
# Search for any hardcoded Netlify URLs
grep -r "netlify" frontend/src/
grep -r "\.netlify\.app" frontend/src/
```

### 4.2 Common Files to Update
- `frontend/src/lib/api.js` - API base URLs
- `frontend/src/components/**/*.js` - Any hardcoded URLs
- `frontend/README.md` - Documentation links
- Environment files if needed

### 4.3 Replace Pattern
```javascript
// Replace:
const FRONTEND_URL = "https://your-app.netlify.app"

// With:
const FRONTEND_URL = "https://your-app-name.vercel.app"
```

## Step 5: Test Deployment

### 5.1 Functionality Tests
- [ ] User authentication (login/register)
- [ ] API calls to backend
- [ ] WebSocket connections
- [ ] File uploads
- [ ] Image loading
- [ ] Tokenomics features
- [ ] Real-time notifications

### 5.2 Performance Tests
- [ ] Page load speeds
- [ ] API response times
- [ ] WebSocket connectivity

## Step 6: Custom Domain (Optional)

### 6.1 Add Domain in Vercel
1. Go to project settings
2. Add custom domain
3. Follow DNS configuration instructions

### 6.2 Update Environment Variables
If using custom domain, update:
```
NEXT_PUBLIC_API_URL=https://oncure-backend.onrender.com
NEXT_PUBLIC_FRONTEND_URL=https://your-custom-domain.com
```

## Step 7: Cleanup Netlify

### 7.1 Remove Netlify Site
1. Go to Netlify dashboard
2. Delete the old site
3. Remove custom domains from Netlify

### 7.2 Update Documentation
Update any documentation with new Vercel URLs.

## Step 8: Final Verification

### 8.1 URL Replacement Checklist
- [ ] All API calls work with new frontend URL
- [ ] WebSocket connections established
- [ ] File uploads functional
- [ ] Image loading works
- [ ] Social sharing links updated
- [ ] Email templates updated (if any)
- [ ] Documentation updated

### 8.2 Post-Deployment Tasks
- [ ] Update README.md with new URLs
- [ ] Notify team of new deployment URL
- [ ] Update any external integrations
- [ ] Monitor error logs for 24 hours

## Vercel Advantages Over Netlify

- **Better Next.js Integration:** Native Next.js optimizations
- **Edge Functions:** Improved performance
- **Automatic Deployments:** Git-based deployments
- **Preview Deployments:** PR-based previews
- **Built-in Analytics:** Performance monitoring

## Troubleshooting

### Common Issues
1. **CORS Errors:** Update backend CORS settings
2. **Environment Variables:** Ensure all vars are set in Vercel
3. **Build Failures:** Check Node.js version compatibility
4. **WebSocket Issues:** Verify WebSocket URL configuration

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Note:** Replace `your-app-name.vercel.app` with your actual Vercel deployment URL throughout your codebase after deployment.