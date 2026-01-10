import PDFFlipbookIframe from "./components/PDFFlipbookIframe";

function App() {
  // Get PDF URL from environment variable or use default
  const pdfUrl = process.env.REACT_APP_PDF_URL || "https://www.pdf995.com/samples/pdf.pdf";

  return (
    <div className="App">
      <PDFFlipbookIframe pdfUrl={pdfUrl} />
    </div>
  );
}

export default App;
