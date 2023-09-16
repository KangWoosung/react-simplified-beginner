import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

export default function Todos() {
  const { state: loadingState } = useNavigation();
  const { user, posts, todos } = useLoaderData();
  console.log("todos", todos);

  let loadingClass = "loading";
  loadingState === "loading"
    ? (loadingClass += " active")
    : (loadingClass = "");
  return (
    <>
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
    </>
  );
}
