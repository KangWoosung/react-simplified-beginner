import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

const fetchUrl = "http://127.0.0.1:3000/";

export default function Posts() {
  const { state: loadingState } = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${fetchUrl}posts`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        // console.log("posts", data);
        setPosts(data);
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
    <div className={`container  ${loadingClass} `}>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {typeof posts === "undefined" ? (
          <div>Posts 데이터가 없습니다.</div>
        ) : (
          posts.map((post) => (
            <div className="card" key={post.id}>
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <a className="btn" href={`/posts/${post.id}`}>
                  View
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
