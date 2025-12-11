# PDF Flipbook Viewer - React App

A React application that displays PDFs as an interactive flipbook using PDF.js and Turn.js.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## Features

- PDF rendering using PDF.js
- Interactive page-turning animation using Turn.js
- Keyboard navigation (Left/Right arrow keys)
- Previous/Next buttons
- Page counter display
- Responsive design

## File Structure

- `src/App.js` - Main app component
- `src/components/PDFFlipbook.js` - PDF flipbook component
- `public/sample.pdf` - Sample PDF file to display
- `public/lib/turn.min.js` - Turn.js library

## Requirements

- Node.js 14+ 
- npm or yarn

## Usage

The app will automatically load `sample.pdf` from the `public` folder. To use a different PDF, replace the file or update the path in `src/components/PDFFlipbook.js`.

