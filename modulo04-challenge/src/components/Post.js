import React from "react";
import Comment from "./Comment";

import "./Post.css";

function Post({ content }) {
  return (
    <section>
      <div className="header">
        <img
          className="profile"
          src={content.author.avatar}
          alt="avatar-image"
        />
        <div className="info">
          <span className="name">{content.author.name}</span>
          <span className="date">{content.date}</span>
        </div>
      </div>
      <div className="divider" />
      <div className="comments">
        {content.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}

export default Post;
