import React, { useState, useContext, useEffect, useCallback } from "react";
import Layout from "components/global/Layout";
import FileUpload from "../subcomponents/FileUpload";
import { Web3Context } from "providers/Web3Context";
import Button from "components/global/Button";
import "./uploadChapter.scss";
import { ethers } from "ethers";
import {
  API_URL,
  CHAPTER_MINT_PRICE,
  UPLOAD_CHAPTER_MESSAGE,
} from "config/constants";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AccountContext } from "providers/AccountContext";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

function UploadChapter() {
  const location = useLocation();

  const [chapterFile, setChapterFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chapterMintTx, setChapterMintTx] = useState(null);
  const [chapterId, setChapterId] = useState(null);
  const [chapterNum] = useState((location.state.comic.chapterCount ?? 0) + 1);
  const [chapterPrice, setChapterPrice] = useState(null);
  const [summary, setSummary] = useState("");
  const { provider, munkTokenContract, chaptersContract } =
    useContext(Web3Context);
  const { user } = useContext(AccountContext);
  const history = useHistory();
  const [uploadProgress, setUploadProgress] = useState(null);

  const submitForm = useCallback(async () => {
    setIsLoading(true);
    const getRequestData = () => {
      const form = new FormData();
      form.set("comicId", location.state.comicId);
      form.set("summary", summary);
      form.set("chapterId", chapterId);
      form.set("price", chapterPrice);
      form.set("number", chapterNum);
      form.set("pdf", chapterFile);

      return form;
    };
    const data = getRequestData();
    try {
      const signer = provider.getSigner();
      setUploadProgress("Requesting signature...");
      const signature = await signer.signMessage(UPLOAD_CHAPTER_MESSAGE);
      setUploadProgress("Uploading chapter...");
      await axios.post(`${API_URL}/comic/add-chapter`, data, {
        auth: {
          username: user.address,
          password: signature,
        },
      });
      toast.success("Chapter uploaded successfully!");
      history.goBack();
    } catch (e) {
      toast.error("Couldn't create your comic");
      console.error(e);
    }
    setUploadProgress(null);
    setIsLoading(false);
  }, [
    chapterFile,
    chapterId,
    chapterNum,
    chapterPrice,
    history,
    location.state.comicId,
    provider,
    summary,
    user.address,
  ]);

  async function mintChapter() {
    setIsLoading(true);
    try {
      const price = ethers.utils.parseUnits(chapterPrice, 18);

      setUploadProgress(
        "Requesting approval to spend MUNK for payment to be deducted from your account..."
      );
      await munkTokenContract
        .approve(
          chaptersContract.address,
          ethers.utils.parseUnits(CHAPTER_MINT_PRICE, 9)
        )
        .then((tx) => {
          setUploadProgress("Waiting for transaction to be mined...");
          return provider.waitForTransaction(tx.hash);
        })
        .then((receipt) => {
          if (receipt.status !== 1) {
            throw Error("Transaction failed");
          }
        })
        .catch((error) => {
          console.error("Txn Confirm Error: ", error);
          throw error;
        });

      setUploadProgress(
        "Sending transaction to create the chapter, requesting confirmation..."
      );
      const tx = await chaptersContract.createChapter(price);
      setUploadProgress("Waiting for transaction to be mined...");
      const receipt = await provider.waitForTransaction(tx.hash);
      const event = chaptersContract.interface.parseLog(receipt.logs[0]);
      const cid = event.args._chapterId;

      setChapterId(cid.toString());

      setChapterMintTx(tx.hash);
      toast.success("Chapter created on-chain successfully");
      await Promise.resolve(0);
    } catch (error) {
      setUploadProgress(null);
      toast.error("Couldn't create your chapter");
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (chapterId) {
      submitForm();
    }
  }, [chapterId, submitForm]);

  function formatTxHash(value = "") {
    if (!value) return "";
    return value?.substring(0, 6) + "..." + value?.substring(value.length - 5);
  }

  const [isCopied, setIsCopied] = useState(false);
  const copyHash = useCallback(
    (hash) => {
      navigator.clipboard.writeText(hash).then(() => {
        setIsCopied(true);
      });
    },
    [setIsCopied]
  );

  return (
    <Layout>
      <div className='upload-chapter'>
        <h1>UPLOAD CHAPTER</h1>
        <style jsx>{`
          .tx-hash {
            border-radius: 999px;
            width: fit-content;
            color: #00022b;
            margin-top: 10px;
          }

          .tx-hash button {
            outline: none;
            border: none;
            color: inherit;
            box-shadow: none;
          }

          .tx-hash .copied {
            font-size: 80%;
          }

          .upload-progress {
            width: fit-content;
          }
        `}</style>
        {uploadProgress && (
          <div className='upload-progress alert alert-info'>
            <p>{uploadProgress}</p>
          </div>
        )}
        {chapterMintTx && (
          <div className='tx-hash-container py-4'>
            Do not retry this transaction. If your upload doesn't go through,
            please contact support with this hash.
            <br />
            Here's your Transaction Hash.
            <div className='tx-hash px-3 py-1 bg-white'>
              {formatTxHash(chapterMintTx)}{" "}
              {isCopied ? (
                <span className='copied mx-2'>
                  <i className='fa far fa-check'></i> Copied
                </span>
              ) : (
                <button
                  className='mx-2'
                  onClick={() => copyHash(chapterMintTx)}>
                  <i className='fa far fa-copy'></i>
                </button>
              )}
            </div>
          </div>
        )}

        <form
          className='upload-chapter__form'
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading) {
              mintChapter();
            }
          }}>
          <div>
            <FileUpload
              accept='application/pdf'
              updateSelected={setChapterFile}
              placeholder='Upload pdf'
              maxSizeInMb={10}
            />
            <div className='row '>
              <div className='col-5'>
                <label htmlFor='chapterNumberInput' className='form-label'>
                  Chapter No.
                </label>
                <input
                  type='number'
                  id='chapterNumberInput'
                  placeholder='Chapter Number'
                  className='form-control'
                  value={chapterNum}
                  disabled
                />
              </div>
              <div className='col-7'>
                <label htmlFor='chapterPriceInput' className='form-label'>
                  Price
                </label>
                <input
                  type='number'
                  id='chapterPriceInput'
                  placeholder='0 BUSD'
                  className='form-control'
                  value={chapterPrice}
                  onChange={(e) => setChapterPrice(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          <div>
            <textarea
              placeholder='Comic Summary'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={isLoading}
              maxLength={100}
            />
            <Button isLoading={isLoading}>Upload</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UploadChapter;
