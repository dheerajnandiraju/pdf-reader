# PDF Flipbook Viewer - React App

A React application that displays PDFs as an interactive flipbook using PDF.js and Turn.js.

## 🚀 Features

- ✅ PDF rendering using PDF.js
- ✅ Interactive page-turning animation using Turn.js
- ✅ **Touch/Swipe navigation** - Swipe left/right on mobile devices
- ✅ Keyboard navigation (Left/Right arrow keys)
- ✅ Corner navigation buttons (Previous/Next)
- ✅ Fullscreen support
- ✅ Audio feedback for page turns (mutable)
- ✅ Responsive design (desktop & mobile optimized)
- ✅ Error handling with user-friendly messages
- ✅ Environment variable support for configuration
- ✅ Production-ready deployment

## 📋 Setup Instructions

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure PDF URL (Optional):**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_PDF_URL=https://example.com/your-pdf.pdf
   ```
   
   Or pass it directly as a prop to the component.

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## 📱 Touch Navigation

The app supports touch gestures on mobile devices:

- **Swipe Left** → Next page
- **Swipe Right** → Previous page
- Minimum swipe distance: 50px
- Maximum vertical deviation: 100px (ensures horizontal swipe)

Touch gestures work on both iOS and Android devices.

## 🎮 Controls

### Desktop
- **Arrow Keys (Left/Right)** - Navigate pages
- **Corner Buttons** - Click to turn pages
- **Fullscreen Button** - Toggle fullscreen mode
- **Mute Button** - Toggle page-turn audio

### Mobile
- **Swipe Gestures** - Swipe left/right to turn pages
- **Corner Buttons** - Tap to navigate
- **Fullscreen Button** - Enter/exit fullscreen
- **Mute Button** - Toggle audio

## 📁 File Structure

```
turn.js/
├── src/
│   ├── App.js                 # Main app component
│   ├── components/
│   │   └── PDFFlipbookIframe.js  # PDF flipbook component (iframe-based)
│   └── index.js              # React entry point
├── public/
│   ├── index.html            # HTML template
│   ├── lib/
│   │   ├── turn.min.js       # Turn.js library
│   │   ├── pdf.min.js        # PDF.js library
│   │   └── pdf.worker.min.js # PDF.js worker
│   ├── pageturn.mp3          # Page turn audio file
│   └── sample.pdf            # Sample PDF (optional)
├── build/                    # Production build (generated)
├── package.json
├── DEPLOYMENT.md             # Detailed deployment guide
└── README_REACT.md           # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file or configure in your hosting platform:

```env
# Optional: Default PDF URL (can also be passed as prop)
REACT_APP_PDF_URL=https://example.com/document.pdf

# Optional: Public URL for subdirectory deployments
PUBLIC_URL=/turnjs-pdf-viewer
```

### Component Props

```jsx
<PDFFlipbookIframe 
  pdfUrl="https://example.com/document.pdf"  // PDF URL (optional if env var set)
/>
```

## 🚀 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive deployment instructions.

### Quick Deploy

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel (Recommended):**
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Deploy to Netlify:**
   ```bash
   npm i -g netlify-cli
   npm run build
   netlify deploy --prod --dir=build
   ```

### Other Deployment Options

- GitHub Pages
- AWS S3 + CloudFront
- Traditional web server (Apache/Nginx)
- Any static hosting service

See `DEPLOYMENT.md` for detailed instructions.

## 📋 Requirements

- Node.js 14+
- npm or yarn
- Modern browser with JavaScript enabled

## 🔧 Troubleshooting

### PDF won't load
- Check CORS headers if loading from external URL
- Verify PDF URL is accessible
- Check browser console for errors

### Touch/swipe not working
- Ensure you're testing on actual mobile device (not just browser dev tools)
- Check viewport meta tag is present
- Verify touch events are enabled

### Assets not loading
- Check `PUBLIC_URL` environment variable if deploying to subdirectory
- Verify assets are in `public/` folder
- Check server configuration for static file serving

## 📚 Additional Resources

- [Turn.js Documentation](https://www.turnjs.com/)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [React Documentation](https://react.dev/)

## 📝 Notes

- PDF files should be CORS-enabled if loading from external URLs
- Large PDFs may take time to load - consider lazy loading for production
- Audio file (`pageturn.mp3`) must be in `public/` folder
- All assets in `public/` are automatically copied to `build/` during build

