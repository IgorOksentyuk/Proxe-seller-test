import React from "react";

export const PostComments = ({ comments }) => {
  return (
    <ul className="comments">
      {
        comments.map(comment => (
          <li
            key={comment.id}
            className="comment"
          >
            <p className="comment__name">From: {comment.name}</p>
            <p className="comment__email">Email: {comment.email}</p>
            <p className="comment__body">{comment.body}</p>
          </li>
        ))
      }
    </ul>
  );
};
