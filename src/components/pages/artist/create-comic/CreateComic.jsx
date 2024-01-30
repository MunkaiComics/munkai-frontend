import React, { useEffect, useState, useContext } from "react";
import FileUpload from "../subcomponents/FileUpload";
import Button from "components/global/Button";
import Layout from "components/global/Layout";
import Heart from "assets/vectors/heart.svg";
import "./createComic.scss";
import axios from "axios";
import { API_URL, CREATE_COMIC_MESSAGE } from "config/constants";
import toast from "react-hot-toast";

import { Web3Context } from "providers/Web3Context";
import { AccountContext } from "providers/AccountContext";
import { useHistory } from "react-router-dom";

function CreateComic() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const { provider } = useContext(Web3Context);
  const { user } = useContext(AccountContext);

  const history = useHistory();

  const getRequestData = () => {
    const form = new FormData();
    form.set("title", title);
    form.set("type", type);
    form.set("description", summary);
    form.set("cover", imageFile);

    return form;
  };

  const submitForm = async () => {
    setLoading(true);
    const data = getRequestData();
    try {
      const signer = provider.getSigner();
      const signature = await signer.signMessage(CREATE_COMIC_MESSAGE);
      await axios.post(`${API_URL}/publication/add-publication`, data, {
        auth: {
          username: user.address,
          password: signature,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.goBack();
    } catch (e) {
      toast.error("Couldn't create your comic");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createURL = (imageFile) => {
    let reader = new FileReader();
    reader.onload = (e) => setImageUrl(e.target.result);
    reader.readAsDataURL(imageFile);
  };

  useEffect(() => {
    if (imageFile) createURL(imageFile);

    return () => {
      if (imageFile) setImageFile(null);
    };
  }, [imageFile]);

  return (
    <Layout>
      <div className="create-comic">
        <h1>PUBLISH AN ART</h1>

        <div className="create-comic__content">
          <form
            className="create-comic__form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!loading) submitForm();
            }}
          >
            <FileUpload
              accept="image/x-png,image/jpeg"
              updateSelected={setImageFile}
              placeholder="Upload Cover"
            />
            <input
              type="text"
              placeholder="Comic Title"
              value={title}
              required
              disabled={loading}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              style={{ padding: "16px" }}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="comic">Comic</option>
              <option value="book">Book</option>
              <option value="poem">Poem</option>
            </select>
            <textarea
              placeholder="Comic Summary"
              value={summary}
              required
              maxLength={300}
              disabled={loading}
              onChange={(e) => setSummary(e.target.value)}
            />
            <Button isLoading={loading}>Create</Button>
          </form>

          <div className="create-comic__preview">
            <h2 className="create-comic__preview-header">Preview</h2>

            <div className="create-comic__preview-panel">
              <div className="create-comic__preview-panel__image">
                {imageUrl ? (
                  <img src={imageUrl} alt="Comic preview illustration" />
                ) : null}
              </div>
              <div className="create-comic__preview-panel__info">
                {title ? (
                  <p className="create-comic__preview-panel__title">{title}</p>
                ) : null}
                {title ? (
                  <div className="create-comic__preview-panel__stats">
                    <p>0 CHAPTERS</p>
                    <div>
                      <img
                        src={Heart}
                        style={{ height: 24, width: 24 }}
                        alt="heart"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateComic;
