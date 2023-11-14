import React from "react";
import CommentCard from "../CommentCard";
// import Button from "components/global/Button";
import "./commentCardList.scss";

function CommentCardList({ comments }) {
  return (
    <>
      <ul className="comment-card-list">
        {comments.map((comment, index) => (
          <CommentCard {...comment} key={index} />
        ))}
      </ul>

      {/* <Button variant="transparent" className="comment-card-list__view-more">
        VIEW MORE
      </Button> */}
    </>
  );
}

export default CommentCardList;
