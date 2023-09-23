/*

*/

import { useLoaderData } from "react-router";
import { getTodos } from "../apiHandler/todos";

function Todos781() {
  const todos = useLoaderData();

  return (
    <>
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
    </>
  );
}

const loader = async ({ request: { signal } }) => {
  return await getTodos({ signal });
};

export const TodoListRoute = {
  element: <Todos781 />,
  loader,
};
