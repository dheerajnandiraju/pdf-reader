# 📘 React PDF Flipbook Viewer  
A fully interactive flipbook component built with **React**, **Turn.js**, and **PDF.js** — featuring smooth page-turn animations, mobile-optimized physics, and a clean white backside for realistic flipping.

---

## 🚀 Features

### 🔄 Realistic Page Flip
- Turn.js-powered book animation  
- Smooth transitions on desktop & mobile  
- Click edges or use arrow keys to flip pages  

### 📱 Mobile Friendly
- Single-page view on mobile  
- Custom backside rendering (white fill)  
- Improved shadow + gradient for real-book feel  
- Touch gestures supported  

### 📄 PDF Rendering
- Pages rendered using PDF.js  
- High-resolution canvas pages  
- Preloaded pages for instant navigation  

### 🧩 Iframe-Based Isolation
- Flipbook runs inside an iframe for performance  
- Parent React app receives postMessage events  
- Prevents CSS and script conflicts  

### ⏳ Unified Loading State
- One global loader shown while PDF is being parsed  
- Automatically hides when flipbook is ready  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|----------|
| **React** | UI wrapper and state control |
| **Turn.js** | Page turning animations |
| **PDF.js** | PDF rendering into canvas/images |
| **iframe sandbox** | Isolated flipbook environment |
| **postMessage API** | Communication between iframe and React |

---


