import React, { useEffect, useState } from "react";
import { getUserPosts } from "../api/posts";
import { getPostComments } from "../api/comments";
import { PostComments } from "./PostComments";
import { Loader } from "./Loader";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/users";
import { Navigation } from "./Navigation";

export const UserPosts = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [showComments, setShowComments] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);

      getUserPosts(id)
        .then(setUserPosts)
        .catch(error => {
          console.error('Error while fetching posts:', error);
        })
        .finally(() => setLoading(false));
    }

    getUserById(id)
      .then(setUser)
      .catch(error => {
        console.error('Error while fetching user:', error);
      });
  }, [id]);

  const toggleComments = (postId) => {
    setShowComments(prevShowComments => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));

    if (!commentsMap[postId]) {
      getPostComments(postId)
        .then(data => {
          setCommentsMap(prevCommentsMap => ({
            ...prevCommentsMap,
            [postId]: data,
          }));
        })
        .catch(error => {
          console.error('Error while fetching comments:', error);
        });
    }
  }

  return (
    <>
      <Navigation />
      {loading && <Loader />}

      {!loading && (
        <>
          <h2 className="posts__title">{user.name} posts:</h2>

          <ul className="posts__container">
            {
              userPosts.map(post => (
                <li
                  key={post.id}
                  className="post"
                >
                  <p className="post__title">Title: {post.title}</p>
                  <p className="post__body">{post.body}</p>
                  <button
                    className="post__button"
                    onClick={() => toggleComments(post.id)}
                  >
                    {showComments[post.id] ? "Hide comments" : "Show comments"}
                  </button>

                  {showComments[post.id] && (
                    <PostComments comments={commentsMap[post.id] || []} />
                  )}
                </li>
              ))
            }
          </ul>
        </>
      )}
    </>
  );
};
