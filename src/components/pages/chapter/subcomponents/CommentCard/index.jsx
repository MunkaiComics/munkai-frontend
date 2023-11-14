import React from "react";
import Button from "components/global/Button";
import AddCommentForm from "../AddCommentForm";
import ReportMenu from "../ReportMenu";
import TimeAgo from "react-timeago";
import "./commentCard.scss";
import useSWR from "swr";
import { API_URL } from "config/constants";
import axios from "axios";
import { AccountContext } from "providers/AccountContext";
import { getFileUrl } from "utils/file";
import defaultProfileImage from "assets/images/profile-picture.png";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function CommentCard({ name, imageUrl, message, createdAt, username, id }) {
  const [showReplyForm, setShowReplyForm] = React.useState(false);
  const { user } = React.useContext(AccountContext);
  const { data: commentsResponse, mutate } = useSWR(
    `${API_URL}/comment/${id}/replies`,
    fetcher
  );

  const [commentCreateLoading, setCommentCreateLoading] = React.useState(false);
  const createComment = React.useCallback(
    async (comment) => {
      setCommentCreateLoading(true);
      await axios
        .post(
          `${API_URL}/comment/${id}/add-reply`,
          { message: comment, commentId: id },
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
      setShowReplyForm(false);
      mutate();
    },
    [id, mutate, user.address, user.authSignature]
  );
  return (
    <li className='comment-card'>
      <img src={imageUrl} alt={name} className='user-image' />
      <div className='comment-card__details'>
        <div className='comment-card__header'>
          <div className='comment-card__header__details'>
            <h3>{name}</h3>
            <TimeAgo date={createdAt} />
          </div>

          <ReportMenu
            userType='User'
            username={username}
            tag={`Comment:${id}`}
          />
        </div>

        <p className='comment-card__message'>{message}</p>

        {!showReplyForm && (
          <Button
            variant='transparent'
            className='comment-card__button'
            onClick={() => setShowReplyForm(true)}>
            REPLY
          </Button>
        )}

        {showReplyForm && (
          <AddCommentForm
            createComment={createComment}
            loading={commentCreateLoading}
            user_avatar={
              user?.profile_picture && getFileUrl(user?.profile_picture)
            }
          />
        )}

        <ul>
          {commentsResponse?.data?.map(
            ({
              author: { profile_picture: imageUrl, username },
              createdAt,
              id: replyId,
              message,
            }) => (
              <li className='comment-card'>
                <img
                  src={imageUrl ? getFileUrl(imageUrl) : defaultProfileImage}
                  alt={username}
                  className='user-image'
                />
                <div className='comment-card__details'>
                  <div className='comment-card__header'>
                    <div className='comment-card__header__details'>
                      <h3>{username}</h3>
                      <TimeAgo date={createdAt} />
                    </div>

                    <ReportMenu
                      userType='User'
                      username={username}
                      tag={`CommentReply:${id}:${replyId}`}
                    />
                  </div>
                  <p className='comment-card__message'>{message}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </li>
  );
}

export default CommentCard;
