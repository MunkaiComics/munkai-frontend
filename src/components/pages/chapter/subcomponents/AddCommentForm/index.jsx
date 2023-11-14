import React from "react";
import Button from "components/global/Button";
import ProfileImage from "assets/images/profile-picture.png";
import "./addCommentForm.scss";

function AddCommentForm({
  createComment = (comment) => null,
  loading = false,
  user_avatar,
}) {
  const [comment, setComment] = React.useState("");

  return (
    <div className='add-comment'>
      <img
        src={user_avatar ?? ProfileImage}
        alt='User avatar'
        className='user-image'
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          new Promise(async (resolve) => {
            await createComment(comment);
            resolve();
          }).then(() => {
            setComment("");
          });
        }}
        className='add-comment__form'>
        <input
          type='text'
          placeholder='Add a comment...'
          className='add-comment__input'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          disabled={loading}
        />
        <Button isLoading={loading} isDisabled={!comment} className='add-comment__button'>
          COMMENT
        </Button>
      </form>
    </div>
  );
}

export default AddCommentForm;
