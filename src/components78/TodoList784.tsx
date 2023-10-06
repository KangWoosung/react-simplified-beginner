/* 2023-10-05 23:22:28


*/

import React, { useState } from "react";
import { z } from "zod";

import { TodoSchema } from "../models/TodoSchema";
import { getTodos, putTodos } from "../apiHandler/todos";
import { useLoaderData } from "react-router";

const TodoResults = z.array(TodoSchema);
type TodoTypeArray = z.infer<typeof TodoResults>;

function TodoList784() {
  const todos: TodoTypeArray = useLoaderData() as TodoTypeArray;
  const [todosState, setTodosState] = useState<TodoTypeArray>(todos);

  const toggleCompleted = async (todo, e) => {
    // 2023-10-06 02:47:26
    // 중요한 건, 여기서 바꾼다고 디스플레이가 리렌더링 되지 않는다.
    // checked 상태가 state 로 관리되고 있어야 한다.
    e.target.checked = !e.target.checked;
    const todoDataObj = { ...todo, completed: !todo.completed };
    console.log("toggleCompleted", todoDataObj);
    await putTodos(todoDataObj, {});
    await setTodosState(
      todosState.map((todo) =>
        todo.id === todoDataObj.id ? todoDataObj : todo
      )
    );
  };

  return (
    <>
      <h1 className="page-title">Todos in 784</h1>
      <ul>
        {typeof todos === "undefined" ? (
          <div>Todos 데이터가 없습니다.</div>
        ) : (
          todosState.map((todo, e) => (
            <li
              key={todo.id}
              className={todo.completed ? "strike-through" : ""}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleCompleted(todo, e)}
              />
              {todo.title}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

const loader = async ({
  request: { signal },
}): Promise<TodoTypeArray | undefined> => {
  const todos = await getTodos({ signal });
  console.log("todos", todos);
  return todos;
};

export const TodoListRoute = {
  element: <TodoList784 />,
  loader,
};
