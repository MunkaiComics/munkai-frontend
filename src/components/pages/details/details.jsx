import { useContext, useState } from "react";
import BackButton from "components/global/BackButton";
import Footer from "components/global/footer";
import Nav from "components/global/nav";
import React, { Suspense } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import "./details.scss";
import { API_URL } from "config/constants";
import { getFileUrl } from "utils/file";
import { AccountContext } from "providers/AccountContext";
import { Web3Context } from "providers/Web3Context";
import { ethers } from "ethers";
import Button from "components/global/Button";
import toast from "react-hot-toast";

const fetcher = url => axios.get(url).then(res => res.data);

function Details() {
  const { user } = useContext(AccountContext);
  const { bUSDTokenContract, chaptersContract, provider } =
    useContext(Web3Context);
  const { id: chapterId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { data, error } = useSWR(
    `${API_URL}/comic/chapter/${chapterId}`,
    fetcher
  );
  const { data: chapter } = data ?? {};
  const [purchaseProgress, setPurchaseProgress] = useState(null);

  const {
    data: accessData,
    error: accessError,
    mutate,
  } = useSWR(
    `${API_URL}/comic/chapters/has-access?address=${user.address}&chapterId=${chapterId}`,
    fetcher
  );

  async function collectChapter() {
    setIsLoading(true);
    try {
      const price = ethers.utils.parseUnits(chapter.price.toString(), 18);
      setPurchaseProgress(
        "Requesting approval to spend BUSD for payment to be deducted from your account..."
      );
      await bUSDTokenContract
        .approve(chaptersContract.address, price)
        .then(tx => {
          setPurchaseProgress("Waiting for transaction to be mined...");
          return provider.waitForTransaction(tx.hash);
        })
        .then(receipt => {
          if (receipt.status !== 1) {
            throw Error("Transaction failed");
          }
        })
        .catch(error => {
          console.error("Txn Confirm Error: ", error);
          throw error;
        });

      setPurchaseProgress(
        "Sending transaction to collect the chapter, requesting confirmation..."
      );
      const tx = await chaptersContract.mintChapter(chapterId);
      setPurchaseProgress("Waiting for transaction to be mined...");
      await provider.waitForTransaction(tx.hash);
      mutate();
      toast.success("Chapter collected successfully!");
    } catch (error) {
      toast.error("Couldn't collect your chapter");
      console.error(error);
    }
    await axios
      .put(
        `${API_URL}/comic/add-to-collection`,
        {},
        {
          params: { id: chapter.comic.id },
          auth: {
            username: user.address,
            password: user.authSignature,
          },
        }
      )
      .catch(console.error);
    setIsLoading(false);
  }

  console.error(error, chapter);
  if (!chapter) {
    return <Suspense></Suspense>;
  }

  return (
    <>
      <Nav />
      <div className="restricted-width">
        <BackButton />
        <div className="arrivals theme details--outer">
          <div className="details">
            <div>
              <div className="image zoom-on-hover">
                <img src={getFileUrl(chapter.comic.cover)} alt="" />
              </div>
            </div>
            <div className="details-description">
              <h1 className="font-weight-bold">{chapter.comic.title}</h1>
              <p>CHAPTER {chapter.number}</p>
              <div
                onClick={() =>
                  history.push(`/creator/${chapter.comic.author.username}`)
                }
              >
                <p className="comics">{chapter.comic.author?.username}</p>
              </div>
              <h3>{chapter.summary}</h3>
              {purchaseProgress && (
                <div
                  style={{ width: "fit-content" }}
                  className="purchase-progress alert alert-info"
                >
                  <p>{purchaseProgress}</p>
                </div>
              )}
              <div className="pay">
                <style jsx>{`
                  p {
                    color: #00022b;
                  }
                `}</style>
                <p>{chapter.price} BUSD</p>
                {accessData ? (
                  <Button
                    className="btn"
                    isLoading={isLoading}
                    onClick={
                      accessData.data
                        ? () => {
                            history.push(history.location.pathname + "/read");
                          }
                        : collectChapter
                    }
                  >
                    {accessData.data ? "Read" : "Collect"}
                  </Button>
                ) : (
                  accessError && (
                    <p className="text-danger">
                      Couldn't fetch access data, please reload the page.
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Details;
