# Deployment Guide

## GitHub Setup

1. **Initialize Git Repository**
```bash
git init
git add .
git commit -m "Initial commit: NotebookLM clone with PDF upload and AI chat"
```

2. **Deploy to Existing Repository**
   - Using existing repository: https://github.com/mohanviswa7/mindnote
   - Repository already exists, ready for deployment

3. **Push to GitHub**
```bash
git remote add origin https://github.com/mohanviswa7/mindnote.git
git branch -M main
git push -u origin main
```

## Netlify Deployment

### Option 1: Connect GitHub Repository (Recommended)

1. **Login to Netlify**
   - Go to https://netlify.com
   - Login with your GitHub account

2. **Import Project**
   - Click "New site from Git"
   - Select GitHub
   - Choose your `mindnote` repository

3. **Configure Build Settings**
   - Build command: `vite build && esbuild netlify/functions/server.ts --platform=node --packages=external --bundle --format=cjs --outfile=netlify/functions/server.js`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`

4. **Deploy**
   - Click "Deploy site"
   - Your site will be available at a random Netlify URL

### Option 2: Manual Deployment

1. **Build the Project**
```bash
npm run build
esbuild netlify/functions/server.ts --platform=node --packages=external --bundle --format=cjs --outfile=netlify/functions/server.js
```

2. **Deploy to Netlify**
   - Drag and drop the `dist/public` folder to Netlify
   - Upload the `netlify/functions` folder

## Environment Variables

For production deployment, you may need to set up environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add any required variables:
   - `NODE_ENV=production`
   - Database URLs if using external database

## Custom Domain (Optional)

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Follow Netlify's DNS configuration instructions

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are installed
   - Verify Node.js version (18+)
   - Check build logs for specific errors

2. **Functions Not Working**
   - Ensure `netlify/functions/server.js` is built correctly
   - Check function logs in Netlify dashboard
   - Verify API routes are working

3. **Static Files Not Loading**
   - Check that `dist/public` contains all assets
   - Verify publish directory is set correctly

### File Upload Limitations

Note: The current implementation uses local file storage which won't persist in serverless environments like Netlify. For production, consider:

1. **Cloud Storage Solutions**
   - AWS S3
   - Cloudinary
   - Firebase Storage

2. **Database Storage**
   - Store file metadata in database
   - Use cloud storage URLs

## Performance Optimizations

1. **Enable Gzip Compression** (Netlify does this automatically)
2. **Set up CDN** (Netlify includes global CDN)
3. **Optimize Images** - Consider using Netlify Image Optimization
4. **Add Caching Headers** - Configure in netlify.toml

## Monitoring

1. **Netlify Analytics** - Built-in traffic analytics
2. **Function Logs** - Monitor API performance
3. **Error Tracking** - Consider Sentry integration

Your NotebookLM clone is now ready for deployment! 🚀