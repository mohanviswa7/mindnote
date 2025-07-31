# Deploy MindNote to GitHub Repository

Follow these steps to deploy the complete MindNote application to https://github.com/mohanviswa7/mindnote

## 1. Initialize Git and Prepare for Deployment

```bash
# Initialize git repository (if not already done)
git init

# Add all files to git
git add .

# Commit all files
git commit -m "feat: Complete MindNote implementation - AI-powered document analysis platform

- Full-stack React + Express application
- PDF upload with drag-and-drop interface
- AI-powered chat interface for document analysis
- Citation system with page references
- Responsive design with Tailwind CSS
- Netlify deployment configuration
- Serverless architecture ready"
```

## 2. Connect to MindNote Repository

```bash
# Add the mindnote repository as remote origin
git remote add origin https://github.com/mohanviswa7/mindnote.git

# Set main as default branch
git branch -M main

# Push to the repository (this will overwrite existing content)
git push -f origin main
```

## 3. Deploy to Netlify

### Automatic Deployment (Recommended)

1. **Login to Netlify**
   - Go to https://netlify.com
   - Sign in with your GitHub account

2. **Create New Site**
   - Click "New site from Git"
   - Choose GitHub as your Git provider
   - Select the `mindnote` repository

3. **Configure Build Settings**
   ```
   Repository: mohanviswa7/mindnote
   Branch: main
   Build command: vite build && esbuild netlify/functions/server.ts --platform=node --packages=external --bundle --format=cjs --outfile=netlify/functions/server.js
   Publish directory: dist/public
   Functions directory: netlify/functions
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy automatically
   - You'll get a random URL like `https://amazing-app-name.netlify.app`

### Manual Deployment

If you prefer manual deployment:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
vite build && esbuild netlify/functions/server.ts --platform=node --packages=external --bundle --format=cjs --outfile=netlify/functions/server.js

# Deploy
netlify deploy --prod --dir=dist/public --functions=netlify/functions
```

## 4. Verify Deployment

After deployment, your MindNote application will be available at:
- **GitHub**: https://github.com/mohanviswa7/mindnote
- **Netlify**: Your assigned Netlify URL (e.g., `https://mindnote-ai.netlify.app`)

### Test the Application

1. **Upload a PDF**: Test the drag-and-drop functionality
2. **Chat Interface**: Ask questions about the uploaded document
3. **Citations**: Click on citation buttons to navigate to referenced pages
4. **Responsive Design**: Test on mobile and desktop

## 5. Post-Deployment Setup

### Custom Domain (Optional)

1. In Netlify dashboard: Site settings → Domain management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify

### Environment Variables

If you need environment variables:
1. Netlify dashboard → Site settings → Environment variables
2. Add variables like:
   - `NODE_ENV=production`
   - API keys for external services

### Monitoring

- **Build logs**: Available in Netlify dashboard
- **Function logs**: Monitor API performance
- **Analytics**: Built-in Netlify analytics

## 6. Future Updates

To update the application:

```bash
# Make your changes
git add .
git commit -m "feat: your update description"
git push origin main
```

Netlify will automatically rebuild and redeploy when you push to the main branch.

## Features Included

✅ **Complete Application**
- React frontend with TypeScript
- Express backend with Netlify Functions
- PDF upload and viewing
- AI-powered chat interface
- Citation system
- Responsive design

✅ **Production Ready**
- Optimized build process
- Serverless architecture
- CDN distribution
- Automatic HTTPS

✅ **Developer Experience**
- Hot reload in development
- Type safety with TypeScript
- Modern tooling (Vite, ESBuild)
- Comprehensive documentation

Your MindNote application is now ready for production use! 🚀