import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

const apiUrl = "http://127.0.0.1:3000/";

export default function User() {
  const { state: loadingState } = useNavigation();
  const { user } = useLoaderData();
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  console.log("Component posts", user);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiUrl}posts?userId=${user.id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`${apiUrl}todos?userId=${user.id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
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
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street}, {user.address.city},{" "}
        {user.address.zipcode}
      </div>
      <h2 className="page-title">Posts</h2>
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
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos === undefined ? (
          <div>Todos 데이터가 없습니다.</div>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? "strike-through" : ""}
            >
              {todo.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
