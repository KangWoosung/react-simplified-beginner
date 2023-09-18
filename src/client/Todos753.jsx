import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";

const fetchUrl = "http://127.0.0.1:3000/";

export default function Todos() {
  const { state: loadingState } = useNavigation();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${fetchUrl}todos`, { signal: controller.signal })
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
      <h1 className="page-title">Todos</h1>
      <ul>
        {typeof todos === "undefined" ? (
          <div>Posts 데이터가 없습니다.</div>
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
