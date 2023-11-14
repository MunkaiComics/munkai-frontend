import React, { Suspense, useCallback, useContext } from "react";
import ProfileImage from "assets/images/profile-picture.png";
import Layout from "components/global/Layout";
import AddCommentForm from "./subcomponents/AddCommentForm";
import CommentCardList from "./subcomponents/CommentCardList";
import ChapterImages from "./subcomponents/ChapterImages";
import "./chapter.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API_URL } from "config/constants";
import axios from "axios";
import { AccountContext } from "providers/AccountContext";
import { getFileUrl } from "utils/file";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function ChapterPage() {
  const { user } = useContext(AccountContext);
  const { id: chapterId } = useParams();
  const { data: response, error } = useSWR(
    `${API_URL}/comic/chapter/${chapterId}`,
    fetcher
  );

  const authenticatedFetcher = (url) =>
    axios
      .get(url, {
        auth: {
          username: user.address,
          password: user.authSignature,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        // const new_blob = new Blob([data]);
        // // with blob: URI, the browser will try to load 'data' as-is
        // const url = URL.createObjectURL(new_blob);
        return data.url;
      });
  const { data: fileResponse } = useSWR(
    `${API_URL}/comic/chapter/${chapterId}/file`,
    authenticatedFetcher,
    {
      fallbackData: null,
    }
  );

  const { data: commentsResponse, mutate } = useSWR(
    `${API_URL}/comment/get/chapter/${chapterId}`,
    fetcher
  );

  const [commentCreateLoading, setCommentCreateLoading] = React.useState(false);
  const createComment = useCallback(
    async (comment) => {
      setCommentCreateLoading(true);
      await axios
        .post(
          `${API_URL}/comment/add/chapter/${chapterId}`,
          { comment },
          {
            auth: {
              username: user.address,
              password: user.authSignature,
            },
          }
        )
        .catch((err) => {
          console.error(err);
        });
      setCommentCreateLoading(false);
      mutate();
    },
    [chapterId, mutate, user.address, user.authSignature]
  );

  const { data: chapterData } = response ?? {};
  const chapter = {
    ...chapterData,
    fileURL: fileResponse,
    artist: {
      name: chapterData && chapterData.comic?.author?.username,
      bio: chapterData && chapterData.comic.author.bio,
    },
    comments: !commentsResponse
      ? []
      : commentsResponse.data.map((comment) => ({
          name: comment.user?.username,
          createdAt: new Date(comment.createdAt),
          imageUrl:
            (comment.user?.profile_picture &&
              getFileUrl(comment.user?.profile_picture)) ??
            ProfileImage,
          message: comment.comment,
          id: comment.id,
        })),
  };

  console.error(error, chapter);
  if (!chapter) {
    return <Suspense></Suspense>;
  }

  return (
    <Layout>
      <div className='chapter-page'>
        <ChapterImages
          comicName={chapter.comic?.title}
          chapterNum={chapter.number}
          dateUploaded={chapter.createdAt}
          fileURL={chapter.fileURL}
        />

        <div className='chapter-page__details'>
          <div className='chapter-page__artist-info'>
            <Link to={`/creator/${chapter.artist.name}`}>
              <h2>{chapter.artist.name}</h2>
            </Link>
            <p>{chapter.artist.bio}</p>
          </div>

          <div className='chapter-page__comments-section'>
            <h2>
              <span>{chapter.comments.length}</span> COMMENTS
            </h2>

            <AddCommentForm
              createComment={createComment}
              loading={commentCreateLoading}
              user_avatar={
                user?.profile_picture && getFileUrl(user?.profile_picture)
              }
            />

            <CommentCardList comments={chapter.comments} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChapterPage;
