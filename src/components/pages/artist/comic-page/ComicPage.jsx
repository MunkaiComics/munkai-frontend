import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "components/global/Button";
import Layout from "components/global/Layout";
import Card from "components/global/card";
import "./comicPage.scss";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getFileUrl } from "utils/file";
import { API_URL } from "config/constants";
import axios from "axios";
import _ from "lodash";
import { AccountContext } from "providers/AccountContext";

function ComicPage() {
  const history = useHistory();
  const location = useLocation();
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const { user } = useContext(AccountContext);

  const comic = useMemo(
    () => ({
      ...location.state.comic,
      img: getFileUrl(location.state.comic.cover),
      chapters,
    }),
    [chapters, location.state.comic]
  );

  const fetchChapters = _.debounce((comic) => {
    setChaptersLoading(true);
    axios
      .get(`${API_URL}/comic/get`, { params: { id: comic.id } })
      .then((res) => {
        location.state.comic = res.data.data;
      })
      .then(() =>
        axios.get(`${API_URL}/comic/${comic.id}/chapters`).then((res) => {
          setChapters(res.data.data);
        })
      )
      .catch(console.error)
      .finally(() => setChaptersLoading(false));
  });

  useEffect(() => {
    if (!chaptersLoading && chapters.length === 0) {
      fetchChapters(comic);
    }
  }, [comic, chaptersLoading, chapters.length, fetchChapters]);

  return (
    <Layout>
      <div className='comic-page'>
        <div className='comic-page__details'>
          <div className='comic-page__details__info'>
            <h1 className='comic-page__details__header'>{comic.title}</h1>
            <p className='comic-page__details__description'>
              {comic.description}
            </p>
          </div>
          <div className='comic-page__details__image'>
            <div className="image zoom-on-hover">
              <img src={getFileUrl(comic.cover)} alt='Comic illustration' />
            </div>
          </div>
        </div>

        <div className='comic-page__chapters'>
          <div className='comic-page__chapters__header'>
            <h2>
              <span>{comic.chapterCount}</span> CHAPTERS
            </h2>
            {user.id &&
              comic.author &&
              (user.id === comic.author || user.id === comic.author.id) && (
                <Button
                  onClick={() =>
                    history.push("/upload-chapter", {
                      comicId: comic.id,
                      comic,
                    })
                  }>
                  Upload
                </Button>
              )}
          </div>
          <div className='card-list card-list--explore'>
            {comic.chapters.map((data, index) => (
              <Card
                key={index}
                img={comic.img}
                title={comic.title}
                chapter={`Chapter ${data.number}`}
                amount={data.views}
                username={comic.author.username}
                chapterId={data.chapterId}
                {...data}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ComicPage;
