# GitHub Pages Deployment Guide

This document explains how the GitHub Actions workflow and GitHub Pages are configured for this project.

## Overview

The project is now configured to automatically build and deploy to GitHub Pages when changes are pushed to the `main` branch.

## Configuration Changes Made

### 1. Vite Configuration (`vite.config.ts`)
- Added `base: '/undercover-word-game/'` in production mode
- This ensures all asset paths are prefixed correctly for GitHub Pages

### 2. React Router Configuration (`src/App.tsx`)
- Added `basename={import.meta.env.BASE_URL}` to BrowserRouter
- This ensures routing works correctly on GitHub Pages

### 3. Jekyll Prevention (`public/.nojekyll`)
- Added `.nojekyll` file to prevent GitHub Pages from processing the site with Jekyll
- This file is automatically copied to the `dist` folder during build

## GitHub Actions Workflow

The workflow file is located at `.github/workflows/deploy.yml` and does the following:

1. **Build Job**:
   - Checks out the repository
   - Sets up Node.js 18
   - Installs dependencies
   - Builds the project using `npm run build`
   - Uploads the `dist` folder as a Pages artifact

2. **Deploy Job**:
   - Deploys the artifact to GitHub Pages
   - Requires the build job to complete first

## Required GitHub Repository Settings

To enable GitHub Pages deployment, ensure the following settings are configured in your repository:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy when you push to `main`

## Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

The preview server will serve the built files from the `dist` folder.

## Deployment URL

Once deployed, your site will be available at:
```
https://uki-hub.github.io/undercover-word-game/
```

## Troubleshooting

### Assets Not Loading
- Verify the `base` path in `vite.config.ts` matches your repository name
- Check that the BrowserRouter `basename` is set correctly

### Routing Issues
- Ensure the `basename` prop on BrowserRouter uses `import.meta.env.BASE_URL`
- This will automatically use the correct base path for both development and production

### Build Failures
- Check the Actions tab in GitHub to see workflow logs
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

## Additional Notes

- The `dist` folder is in `.gitignore` and should not be committed to the repository
- The workflow runs automatically on every push to `main`
- You can also manually trigger the workflow from the Actions tab
