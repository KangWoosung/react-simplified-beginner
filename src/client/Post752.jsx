import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

/*  2023-09-17 03:38:19
/posts/:id/comments
useEffect() 로, 마운트시, fetch 해서 받아오면 된다. 
ㅋㅋㅋ 15초간 이것도 routing 해주려고 했다. ㅋㅋㅋㅋ 속을 뻔 했음

*/

export default function Post({ postId }) {
  const { state: loadingState } = useNavigation();
  const { post } = useLoaderData();
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(1);
  const postsUrl = "http://127.0.0.1:3000/";
  postId = post.id;
  console.log("postId", postId);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${postsUrl}posts/${postId}/comments`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });

    fetch(`${postsUrl}users/${post.userId}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, []);

  let loadingClass = "loading";
  loadingState === "loading"
    ? (loadingClass += " active")
    : (loadingClass = "");
  return (
    <>
      <div className={`container  ${loadingClass} `}>
        <h1 className="page-title">
          {post.title} <small>{post.id}</small>
        </h1>
        <span className="page-subtitle">
          By: <a href={`/users/${user.id}`}> {user.name} </a>
        </span>
        <div>
          <p>{post.body}</p>
        </div>
        <h3 className="mt-4 mb-2">Comments</h3>
        <div className="card-stack">
          {comments.map((comment) => (
            <div className="card" key={comment.id}>
              <div className="card-body">
                <div className="text-sm mb-1"></div>
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
