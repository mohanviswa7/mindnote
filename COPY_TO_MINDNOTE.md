# Files to Copy to MindNote Repository

After cloning https://github.com/mohanviswa7/mindnote.git, copy these files from your development environment:

## Core Application Files

### Frontend (client/)
```
client/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── index.html
```

### Backend (server/)
```
server/
├── index.ts
├── routes.ts
├── storage.ts
└── vite.ts
```

### Shared Types
```
shared/
└── schema.ts
```

## Configuration Files

### Build and Development
- `package.json` - Dependencies and scripts
- `package-lock.json` - Exact dependency versions
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `components.json` - Shadcn/ui configuration

### Deployment Configuration
- `netlify.toml` - Netlify build and deployment settings
- `netlify/functions/server.ts` - Serverless function for API
- `.gitignore` - Git ignore patterns

## Documentation
- `README.md` - Project overview and setup instructions
- `replit.md` - Technical architecture and preferences
- `DEPLOYMENT_TO_MINDNOTE.md` - Deployment instructions
- `deploy.md` - General deployment guide
- `DEPLOY_COMMANDS.md` - Manual deployment commands

## Optional Files
- `drizzle.config.ts` - Database configuration (if using Drizzle)
- `deploy-to-mindnote.sh` - Deployment script

## Files to Exclude
- `node_modules/` - Will be installed via npm install
- `dist/` - Generated during build
- `uploads/` - Runtime generated directory
- `.git/` - Will use the cloned repository's git
- `.cache/` - Build cache
- `.upm/` - Replit specific

## Quick Copy Commands

If you have access to both directories:

```bash
# From your development environment, copy to the cloned mindnote directory
cp -r client/ /path/to/mindnote/
cp -r server/ /path/to/mindnote/
cp -r shared/ /path/to/mindnote/
cp -r netlify/ /path/to/mindnote/
cp package.json package-lock.json vite.config.ts tsconfig.json tailwind.config.ts postcss.config.js components.json netlify.toml .gitignore /path/to/mindnote/
cp README.md replit.md *.md /path/to/mindnote/
```

## After Copying Files

1. **Install Dependencies**:
   ```bash
   cd mindnote
   npm install
   ```

2. **Test Locally**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   esbuild netlify/functions/server.ts --platform=node --packages=external --bundle --format=cjs --outfile=netlify/functions/server.js
   ```

4. **Deploy to GitHub**:
   ```bash
   git add .
   git commit -m "feat: Complete MindNote application deployment"
   git push origin main
   ```

Your MindNote repository will then have the complete application ready for Netlify deployment!