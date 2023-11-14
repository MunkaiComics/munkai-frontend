import React, { useEffect, useState, useRef, useCallback } from "react";

export const PdfViewer = ({ url, setPdfRef, pdfRef, currentPage }) => {
  const canvasRef = useRef();

  const [pdfjsLib, setPdfjsLib] = useState();
  pdfjsLib &&
    (pdfjsLib.GlobalWorkerOptions.workerSrc =
      window.location.origin + "/pdf.worker.min.js");

  useEffect(() => {
    (async () => {
      const lib = await import("pdfjs-dist/build/pdf");
      setPdfjsLib(lib);
    })();
  }, []);

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: canvas.getContext("2d"),
            viewport: viewport,
          };
          page.render(renderContext);
        });
    },
    [pdfRef]
  );

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    if (!pdfjsLib) return;
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdfRef(loadedPdf);
      },
      function (reason) {
        console.error(reason);
      }
    );
  }, [pdfjsLib, setPdfRef, url]);

  return <canvas style={{ width: "100%" }} ref={canvasRef}></canvas>;
};
