import React, { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigation,
  useParams,
  useNavigate,
} from "react-router-dom";

const fetchUrl = "http://127.0.0.1:3000/";

export default function Post() {
  const { state: loadingState } = useNavigation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const [comments, setComments] = useState([]);
  console.log("Component id", id);

  useEffect(() => {
    const controller = new AbortController();
    let userId;
    async function fetchAPIs() {
      await fetch(`${fetchUrl}posts/${id}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          userId = data.userId;
          setPost(data);
        })
        .catch((err) => {
          console.log(err);
          //  에러가 트리거되는 예측 밖의 경우들이 있어서, 여기에서 404 처리를 하는 건 사실상 어렵다.
          //   navigate("/404");
        });
      await fetch(`${fetchUrl}users/${userId}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
      await fetch(`${fetchUrl}posts/${id}/comments`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchAPIs();
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
  );
}
