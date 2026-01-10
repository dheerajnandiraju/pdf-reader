# 🚀 Deployment Guide

This guide covers how to deploy the PDF Flipbook Viewer application to production.

## Prerequisites

- Node.js 14+ and npm/yarn installed
- A hosting service (Vercel, Netlify, AWS S3, GitHub Pages, etc.)

## Environment Variables

Create a `.env` file in the root directory (or configure environment variables in your hosting platform):

```env
# Optional: Set default PDF URL
REACT_APP_PDF_URL=https://example.com/your-pdf.pdf

# Optional: Public URL for asset paths (usually auto-detected)
PUBLIC_URL=/
```

### Example `.env` for different environments:

**Development (`.env.development`):**
```env
REACT_APP_PDF_URL=https://www.pdf995.com/samples/pdf.pdf
```

**Production (`.env.production`):**
```env
REACT_APP_PDF_URL=https://yourdomain.com/files/document.pdf
PUBLIC_URL=/turnjs-pdf-viewer
```

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### 3. Test the Build Locally

```bash
# Install serve globally (optional)
npm install -g serve

# Serve the build directory
serve -s build
```

Or use npx:
```bash
npx serve -s build
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Or connect your GitHub repository to Vercel for automatic deployments.

4. Set environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `REACT_APP_PDF_URL` and `PUBLIC_URL` if needed

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=build
   ```

3. Or use Netlify's GitHub integration for automatic deployments.

4. Configure environment variables in Netlify dashboard:
   - Site Settings → Build & Deploy → Environment Variables

### Option 3: AWS S3 + CloudFront

1. Build the app:
   ```bash
   npm run build
   ```

2. Upload `build/` contents to S3 bucket:
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

3. Configure S3 bucket for static website hosting
4. Set up CloudFront distribution for CDN
5. Configure environment variables via CloudFront environment-specific configs

### Option 4: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/turnjs-pdf-viewer",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Configure environment variables in GitHub Actions or use a different config approach.

### Option 5: Traditional Web Server (Apache/Nginx)

1. Build the app:
   ```bash
   npm run build
   ```

2. Copy `build/` contents to your web server directory:
   ```bash
   cp -r build/* /var/www/html/
   ```

3. Configure your server to serve `index.html` for all routes (for React Router compatibility if you add routing later).

**Nginx example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Important Notes

### Asset Paths

- All assets in `public/` folder are automatically copied to `build/`
- Use `process.env.PUBLIC_URL` for absolute paths if deploying to a subdirectory
- Relative paths work automatically in most cases

### PDF File Hosting

The PDF files should be:
1. **Hosted on a CORS-enabled server** if loading from external URL
2. **Placed in the `public/` folder** if using local files
3. **Served from the same domain** to avoid CORS issues

### CORS Configuration

If loading PDFs from external URLs, ensure the server has proper CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
```

Or restrict to your domain:
```
Access-Control-Allow-Origin: https://yourdomain.com
```

### Audio File

The `pageturn.mp3` file should be in the `public/` directory. It will be copied to `build/` during build process.

## Production Checklist

- [ ] Set `REACT_APP_PDF_URL` environment variable (or pass via component prop)
- [ ] Verify `PUBLIC_URL` is set correctly if deploying to subdirectory
- [ ] Ensure all assets in `public/` folder are present
- [ ] Test PDF loading with production URL
- [ ] Verify touch/swipe navigation works on mobile devices
- [ ] Test keyboard navigation (arrow keys)
- [ ] Check console for errors
- [ ] Verify page turn audio plays (if enabled)
- [ ] Test fullscreen functionality
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)

## Troubleshooting

### PDF won't load

1. Check CORS headers on PDF server
2. Verify PDF URL is accessible
3. Check browser console for errors
4. Ensure PDF URL is valid (accessible via browser)

### Assets not loading (404 errors)

1. Check `PUBLIC_URL` environment variable
2. Verify assets are in `public/` folder
3. Check build output includes assets
4. Verify server configuration serves static files correctly

### Touch/swipe not working

1. Ensure viewport meta tag is present
2. Check browser supports touch events
3. Verify no conflicting touch handlers
4. Test on actual mobile device (not just browser dev tools)

### Build fails

1. Check Node.js version (14+ required)
2. Clear `node_modules` and `package-lock.json`, reinstall
3. Check for TypeScript errors (if using TypeScript)
4. Review build output for specific error messages

## Performance Optimization

1. **Lazy loading**: For large PDFs, consider implementing page-by-page loading
2. **Image optimization**: PDF pages are rendered as images - consider compression
3. **CDN**: Use CDN for PDF files and static assets
4. **Caching**: Configure proper cache headers for static assets
5. **Code splitting**: React automatically code-splits, but verify bundle sizes

## Support

For issues or questions:
- Check the main README.md for usage examples
- Review browser console for error messages
- Verify environment variables are set correctly

