#!/bin/bash

echo "🚀 Deploying MindNote to GitHub Repository"
echo "Repository: https://github.com/mohanviswa7/mindnote"
echo ""

# Add all changes
echo "📦 Adding all files to git..."
git add .

# Commit with descriptive message
echo "💾 Committing changes..."
git commit -m "feat: Deploy complete MindNote application

- AI-powered document analysis platform
- PDF upload with drag-and-drop interface  
- Real-time chat interface for document queries
- Citation system with page navigation
- Responsive design with modern UI components
- Netlify serverless deployment configuration
- Production-ready build setup

Ready for deployment to Netlify with automatic builds."

# Add remote origin (this will fail if already exists, which is fine)
echo "🔗 Setting up remote repository..."
git remote add origin https://github.com/mohanviswa7/mindnote.git 2>/dev/null || echo "Remote origin already exists"

# Set main branch
echo "🌟 Setting main branch..."
git branch -M main

# Push to repository
echo "⬆️ Pushing to GitHub repository..."
echo "Note: This will overwrite the existing repository content"
read -p "Continue? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push -f origin main
    echo ""
    echo "✅ Successfully deployed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://netlify.com and connect your GitHub repository"
    echo "2. Configure build settings:"
    echo "   - Build command: vite build && esbuild netlify/functions/server.ts --platform=node --packages=external --bundle --format=cjs --outfile=netlify/functions/server.js"
    echo "   - Publish directory: dist/public"
    echo "   - Functions directory: netlify/functions"
    echo "3. Your MindNote app will be live at your Netlify URL!"
    echo ""
    echo "🎉 Deployment complete!"
else
    echo "Deployment cancelled."
fi