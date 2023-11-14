import React, { useState } from "react";
import Button from "components/global/Button";
import ReportMenu from "../ReportMenu";
import "./chapterImages.scss";
import { PdfViewer } from "components/global/PDFViewer";

function ChapterImages({ comicName, chapterNum, dateUploaded, fileURL, username }) {
  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const page = currentPage;

  const moveToNextPage = () =>
    pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const moveToPrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className='chapter-images'>
      <div className='chapter-images__header'>
        <div>
          <h1 className='chapter-images__title'>{comicName}</h1>
          <p className='chapter-images__number'>CHAPTER {chapterNum}</p>
          <p className='chapter-images__upload-date'>
            {new Date(dateUploaded)
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              .replace(" 2", ", 2")}
          </p>
        </div>

        <div>
          <ReportMenu userType='Artist' username={username} tag={`ComicChapter:${comicName}:${chapterNum}`} />
        </div>
      </div>

      <div className='chapter-images__image viewer-container'>
        {fileURL && <PdfViewer
          url={fileURL}
          {...{ setPdfRef, setCurrentPage, pdfRef, currentPage }}
        />}
      </div>

      <div className='chapter-images__page-controls'>
        <div className='chapter-images__action-buttons'>
          <Button
            variant='transparent'
            iconButton
            onClick={() => {
              moveToPrevPage();
            }}>
            <span className='back-button__arrow-container'>
              <i className='fa fa-chevron-left back-icon' />
            </span>
          </Button>

          <p className='chapter-images__action-buttons__page-info'>
            <span>{page}</span>/<span>{pdfRef?.numPages}</span>{" "}
          </p>

          <Button
            variant='transparent'
            iconButton
            onClick={() => {
              moveToNextPage();
            }}>
            <span className='back-button__arrow-container'>
              <i className='fa fa-chevron-right back-icon' />
            </span>
          </Button>
        </div>

        {/* <div className='chapter-images__page-info'>
          <span>PAGE</span>
          <span>{page}</span>
        </div> */}
      </div>
    </div>
  );
}

export default ChapterImages;
