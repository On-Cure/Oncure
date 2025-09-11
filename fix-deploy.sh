#!/bin/bash

echo "🔧 Fixing database compatibility issues and redeploying..."

# Navigate to backend directory
cd backend

# Build the application
echo "📦 Building Go application..."
go build -o server server.go

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Commit and push changes
    echo "📤 Committing and pushing changes..."
    cd ..
    git add .
    git commit -m "Fix database adapter usage for PostgreSQL compatibility"
    git push origin main
    
    echo "🚀 Changes pushed to GitHub. Render will automatically redeploy."
    echo "⏳ Wait 2-3 minutes for deployment to complete."
    echo "🌐 Backend URL: https://oncare-4igf.onrender.com"
    echo "🌐 Frontend URL: https://oncare19.netlify.app"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi