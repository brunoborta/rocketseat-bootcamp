import React from "react";
import "./Comment.css";

function Comment({ comment }) {
  return (
    <div className="comment">
      <img className="profile" src={comment.author.avatar} alt="avatar-image" />
      <div className="content">
        <span>
          <strong>{comment.author.name}</strong> {comment.content}
        </span>
      </div>
    </div>
  );
}

export default Comment;
