import React, { useState } from "react";
import UploadIcon from "assets/images/upload.png";
import "./fileUpload.scss";

function FileUpload({ accept, updateSelected, placeholder, maxSizeInMb = 5 }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <div className='file-upload-container'>
        <div className='file-upload'>
          <input
            type='file'
            onChange={(e) => {
              const files = e.target.files;

              if (files.length) {
                if (files[0].size > maxSizeInMb * 1048576) {
                  setError(
                    `File size can not be greater than ${Number.parseFloat(
                      maxSizeInMb
                    ).toFixed(1)}MB`
                  );
                  return;
                }

                setFileName(files[0].name);
                updateSelected(files[0]);
              }
            }}
            accept={accept}
          />
          <div className='file-upload__details'>
            <img src={UploadIcon} alt='Upload icon' />
            <p>{fileName || placeholder}</p>
          </div>
        </div>

        <p className='file-upload__size-limit'>
          {Number.parseFloat(maxSizeInMb).toFixed(1)}MB Max
        </p>
      </div>

      {error ? (
        <p style={{ color: "#E53E3E", fontSize: 14, marginTop: 6 }}>{error}</p>
      ) : null}
    </>
  );
}

export default FileUpload;
