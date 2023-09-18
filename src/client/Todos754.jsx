import axios from "axios";
import React from "react";
import { getTodos } from "../lib/todos";
import { useLoaderData, useNavigation } from "react-router";

const Todos754 = () => {
  const { state: loadingState } = useNavigation();
  const { todos } = useLoaderData();
  console.log("todos", todos);
  return (
    <>
      <div className={`container `}>
        <h1 className="page-title">Todos</h1>
        <ul>
          {typeof todos === "undefined" ? (
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
    </>
  );
};

const loader = async ({ request: { signal } }) => {
  const todos = await getTodos({ signal });
  return { todos };
};
let TodosRoute = {};
export default TodosRoute = {
  loader,
  element: <Todos754 />,
};
