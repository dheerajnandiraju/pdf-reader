import React, { useEffect, useRef, useState } from 'react';

const PDFFlipbookIframe = ({ pdfUrl }) => {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Get PDF URL from prop or environment variable
    const effectivePdfUrl = pdfUrl || process.env.REACT_APP_PDF_URL;

    const TURN_CSS = "https://cdn.jsdelivr.net/npm/turn.js@4.1.0/dist/basic.css";
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    // Get base path for assets (works in both dev and production)
    const publicUrl = process.env.PUBLIC_URL || '';
    const audioPath = `${publicUrl}/pageturn.mp3`;
    const turnJsPath = `${publicUrl}/lib/turn.min.js`;

    iframeDoc.open();
    iframeDoc.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">

<link rel="stylesheet" href="${TURN_CSS}">
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #16101bff;
    font-family: Arial;
  }

  #wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #magazine {
    margin: 0 auto;
    opacity: 0;
    transition: opacity .5s ease-in;
  }

  #magazine .page {
    background: white ;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
  }

  #magazine .page canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: white;
  }


  /* ------------------------------------------------------------------
     MOBILE FIXES — do NOT change desktop behavior
     ------------------------------------------------------------------ */
  @media (max-width: 900px) {
    #magazine .page,
    .turn-page,
    .turn-page-wrapper,
    .turn-page .gradient,
    .turn-page .fold {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.85) !important;
    }
       .turn-page .gradient {
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.6),
      rgba(0, 0, 0, 0.25)
    ) !important;
    opacity: 1 !important;
    width: 100% !important;
  }
  }
  

  /* Corner buttons for page turning */
  .corner-btn {
    position: absolute;
    bottom: 12px;
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,0.55);
    color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    font-size: 20px;
    z-index: 1000;
    transition: background 0.2s ease;
  }
  .corner-btn:hover { background: rgba(0,0,0,0.7); }
  .corner-btn.left { left: 12px; }
  .corner-btn.right { right: 12px; }

  /* Force blank first page on mobile when requested */
  .blank-first {
    background: #fff !important;
    box-shadow: none !important;
  }
  .blank-first img {
    display: none !important;
  }
@media (max-width: 900px) {
  /* Create a fake backside overlay */
  .turn-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background: white;
    z-index: 1;
    opacity: 1;
    pointer-events: none;
    transform-origin: left center;
  }

  /* Ensure front content stays on top */
  .turn-page > * {
    position: relative;
    z-index: 2;
  }

  /* Gradient shadow above everything */
  .turn-page .gradient {
    z-index: 3 !important;
  }
}
#mute-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 2000;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 10px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  transition: background 0.2s ease;
}

#mute-btn:hover {
  background: rgba(0,0,0,0.8);
}

#fullscreen-btn {
  position: fixed;
  top: 16px;
  right: 64px; /* 👈 beside mute */
  z-index: 2000;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 10px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  transition: background 0.2s ease;
}

  #fullscreen-btn:hover {
    background: rgba(0,0,0,0.8);
  }

  /* Touch feedback for mobile */
  #magazine,
  #wrapper {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    touch-action: pan-y;
  }

  #magazine {
    touch-action: none;
  }

  @media (max-width: 900px) {
    #magazine .page {
      touch-action: none;
    }
    
    .corner-btn {
      -webkit-tap-highlight-color: rgba(255,255,255,0.3);
      tap-highlight-color: rgba(255,255,255,0.3);
    }
    
    #mute-btn,
    #fullscreen-btn {
      -webkit-tap-highlight-color: rgba(255,255,255,0.3);
      tap-highlight-color: rgba(255,255,255,0.3);
    }
  }

</style>

</head>
<body>

<div id="wrapper"><div id="magazine"></div></div>
<audio id="page-audio" preload="auto">
  <source src="${audioPath}" type="audio/mpeg">
</audio>

<div id="mute-btn">🔊</div>
<div id="fullscreen-btn">⛶</div>


<script src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="${turnJsPath}"></script>
<script>
  // If local turn.min.js fails, fallback to CDN
  if (!window.jQuery || !jQuery.fn.turn) {
    document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/turn.js/4/turn.min.js"><\\/script>');
  }
</script>

<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.min.js"></script>

<script>
  window.PDF_URL = ${JSON.stringify(effectivePdfUrl)};
</script>

<script>
(function(){

const fsBtn = document.getElementById("fullscreen-btn");

fsBtn.onclick = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
};

document.addEventListener("fullscreenchange", () => {
  fsBtn.textContent = document.fullscreenElement ? "✕" : "⛶";
});


let isMuted = false;
let audio = document.getElementById("page-audio");
audio.volume = 0.8;

const muteBtn = document.getElementById("mute-btn");
muteBtn.onclick = () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? "🔇" : "🔊";
};


  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

  let pdfDoc = null;
  let totalPages = 0;
  let pdfViewport = null;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     ('ontouchstart' in window) ||
                     (navigator.maxTouchPoints > 0);

  function getBookSize(){
    if (!pdfViewport) return { width: 800, height: 600, isMobile: false };

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const isMobile = winW < 900;

    const pageRatio = pdfViewport.width / pdfViewport.height;
    const availW = isMobile ? winW : Math.min(winW * 0.95, 1400);
    const availH = winH * 0.95;

    let w, h;

    if (isMobile) {
      w = availW;
      h = w / pageRatio;
      if (h > availH) {
        h = availH;
        w = h * pageRatio;
      }
    } else {
      const bookRatio = pageRatio * 2;
      w = availW;
      h = w / bookRatio;
      if (h > availH) {
        h = availH;
        w = h * bookRatio;
      }
    }

    return { width: Math.floor(w), height: Math.floor(h), isMobile };
  }

  async function renderPage(pageNum){
    const page = await pdfDoc.getPage(pageNum);
    const scale = isMobileUA ? 1.2 : 1.5; // slightly higher scale on mobile for better visual quality
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas.toDataURL("image/png");
  }

  async function loadPDF(){
    const url = window.PDF_URL;

    if (!url || typeof url !== 'string') {
      console.error('PDF Load Error: PDF_URL is not defined or invalid', url);
      document.body.innerHTML = '<div style="padding: 50px; text-align: center; color: white; font-size: 16px;"><h2 style="margin-bottom: 20px;">⚠️ PDF Load Error</h2><p>PDF URL is missing or invalid. Please check the pdfUrl prop or REACT_APP_PDF_URL environment variable.</p></div>';
      window.parent.postMessage({ type: "error", message: "PDF URL is missing or invalid" }, "*");
      return;
    }

    try {
      pdfDoc = await pdfjsLib.getDocument({
        url,
        withCredentials: false
      }).promise;
      totalPages = pdfDoc.numPages;

      const first = await pdfDoc.getPage(1);
      pdfViewport = first.getViewport({ scale: 1 });

      const mag = document.getElementById("magazine");

      // Clear previous content if any
      mag.innerHTML = "";

      // Decide if mobile layout (single) needs a leading blank page
      const size = getBookSize();

      // Build page DOM and render all pages eagerly (no lazy loading)
      for (let i = 1; i <= totalPages; i++) {
        const dataUrl = await renderPage(i);
        const div = document.createElement("div");
        div.className = "page";
        div.style.width = "100%";
        div.style.height = "100%";
        const img = document.createElement("img");
        img.src = dataUrl;
        img.decoding = "async";
        img.loading = "eager";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.display = "block";
        img.style.objectFit = "contain";
        img.style.backgroundColor = "white";
        div.appendChild(img);
        // Mirror the first page content onto its backside for desktop; blank it on mobile
        
        mag.appendChild(div);
      }

      // ✅ FIX: add blank page if total pages is odd (required for double display)
if (totalPages % 2 !== 0) {
  const blank = document.createElement("div");
  blank.className = "page";
  blank.style.background = "white";
  mag.appendChild(blank);
}


      /* ------------------------------
         TURN.JS INIT
      ------------------------------ */

      $("#magazine").turn({
        display: size.isMobile ? "single" : "double",
        width: size.width,
        height: size.height,
        autoCenter: true,
        acceleration: true,
        gradients: true,
        elevation: size.isMobile ? 70 : 50,
        duration: size.isMobile ? 900 : 800, // slower flip on mobile
        page: 1,
        cornerSize: Math.max(size.width, size.height)
      });

      $("#magazine").bind("turning", function () {
  if (!isMuted && audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
});

      $("#magazine").css("opacity", 1);
      // Notify parent React component
      window.parent.postMessage({ type: "loaded" }, "*");


  


      // Listen for parent keyboard navigation messages
      window.addEventListener("message", function(ev) {
        if (!ev.data || ev.data.type !== "turn") return;
        if (ev.data.dir === "prev") $("#magazine").turn("previous");
        if (ev.data.dir === "next") $("#magazine").turn("next");
      });

      // Add corner buttons for both desktop and mobile
      const wrapper = document.getElementById("wrapper");
      if (wrapper && !document.getElementById("corner-left")) {
        const leftBtn = document.createElement("div");
        leftBtn.id = "corner-left";
        leftBtn.className = "corner-btn left";
        leftBtn.innerHTML = "↩";
        leftBtn.onclick = () => $("#magazine").turn("previous");

        const rightBtn = document.createElement("div");
        rightBtn.id = "corner-right";
        rightBtn.className = "corner-btn right";
        rightBtn.innerHTML = "↪";
        rightBtn.onclick = () => $("#magazine").turn("next");

        wrapper.appendChild(leftBtn);
        wrapper.appendChild(rightBtn);
      }

      window.addEventListener("keydown", function(e){
        if (!$("#magazine").data("turn")) return;
        if (e.key === "ArrowLeft") $("#magazine").turn("previous");
        if (e.key === "ArrowRight") $("#magazine").turn("next");
      });

      // Touch/Swipe gesture navigation (attach after Turn.js initialization)
      let touchStartX = null;
      let touchStartY = null;
      let touchStartTime = null;
      const minSwipeDistance = 50; // Minimum distance for swipe
      const maxVerticalDistance = 100; // Max vertical movement to consider it horizontal swipe

      function handleTouchStart(e) {
        if (!$("#magazine").data("turn")) return;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchStartTime = Date.now();
      }

      function handleTouchMove(e) {
        // Prevent default scrolling when swiping on the magazine
        if (touchStartX !== null) {
          e.preventDefault();
        }
      }

      function handleTouchEnd(e) {
        if (!$("#magazine").data("turn") || touchStartX === null) return;

        const touch = e.changedTouches[0];
        const touchEndX = touch.clientX;
        const touchEndY = touch.clientY;
        const touchEndTime = Date.now();

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaTime = touchEndTime - touchStartTime;

        // Check if it's a horizontal swipe (not too much vertical movement)
        if (Math.abs(deltaY) < maxVerticalDistance && Math.abs(deltaX) > minSwipeDistance && deltaTime < 500) {
          if (deltaX > 0) {
            // Swipe right - go to previous page
            $("#magazine").turn("previous");
          } else {
            // Swipe left - go to next page
            $("#magazine").turn("next");
          }
        }

        // Reset
        touchStartX = null;
        touchStartY = null;
        touchStartTime = null;
      }

      // Add touch event listeners after magazine is initialized
      // Use setTimeout to ensure Turn.js is fully initialized
      setTimeout(function() {
        const magazine = document.getElementById("magazine");
        const wrapper = document.getElementById("wrapper");
        
        if (magazine && $("#magazine").data("turn")) {
          magazine.addEventListener("touchstart", handleTouchStart, { passive: false });
          magazine.addEventListener("touchmove", handleTouchMove, { passive: false });
          magazine.addEventListener("touchend", handleTouchEnd, { passive: true });
        }
        
        if (wrapper && $("#magazine").data("turn")) {
          wrapper.addEventListener("touchstart", handleTouchStart, { passive: false });
          wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
          wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });
        }
      }, 100);

      window.addEventListener("resize", function(){
        const ns = getBookSize();
        $("#magazine").turn("size", ns.width, ns.height);
        const d = ns.isMobile ? "single" : "double";
        if ($("#magazine").turn("display") !== d) {
          $("#magazine").turn("display", d);
        }
      });

    } catch (err) {
      console.error("PDF Load Error:", err);
      const errorMsg = err.message || "Failed to load PDF. Please check the URL and ensure CORS is properly configured.";
      document.body.innerHTML = '<div style="padding: 50px; text-align: center; color: white; font-size: 16px;"><h2 style="margin-bottom: 20px;">❌ PDF Load Error</h2><p style="margin-bottom: 10px;">' + errorMsg + '</p><p style="font-size: 14px; opacity: 0.8;">If using a local file, ensure it is in the public folder or use a valid URL.</p></div>';
      window.parent.postMessage({ type: "error", message: errorMsg }, "*");
    }
  }

  function checkDeps(){
    if (window.$ && $.fn.turn && window.pdfjsLib && window.PDF_URL) {
      loadPDF();
    } else {
      setTimeout(checkDeps, 50);
    }
  }

  checkDeps();

})();
document.body.tabIndex = 0;
document.body.focus();

window.addEventListener("keydown", function (e) {
  if (!$("#magazine").data("turn")) return;

  if (e.key === "ArrowLeft") {
    $("#magazine").turn("previous");
  }

  if (e.key === "ArrowRight") {
    $("#magazine").turn("next");
  }
});

</script>

</body>
</html>
    `);
    iframeDoc.close();

    // Listen for "loaded" / "error" messages from iframe
    const handleMessage = (event) => {
      if (!event.data) return;
      if (event.data.type === "loaded") {
        setLoading(false);
      } else if (event.data.type === "error") {
        setError(event.data.message);
        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [pdfUrl]); // Recreate iframe when pdfUrl changes

  // Parent-level keyboard navigation: forward to iframe
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft" || e.keyCode === 37) {
        iframeRef.current?.contentWindow?.postMessage({ type: "turn", dir: "prev" }, "*");
      } else if (e.key === "ArrowRight" || e.keyCode === 39) {
        iframeRef.current?.contentWindow?.postMessage({ type: "turn", dir: "next" }, "*");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#9b7bb8",
        position: "relative"
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            color: "white"
          }}
        >
          Loading PDF...
        </div>
      )}

      {error && (
        <div
          style={{
            color: "#ff6b6b",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10
          }}
        >
          {error}
        </div>
      )}

      <iframe
        ref={iframeRef}
        tabIndex={0}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block"
        }}
        title="PDF Flipbook"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default PDFFlipbookIframe;
