/* 2023-10-06 18:24:08


*/

import React, { useState } from "react";
import { z } from "zod";

/********** Import Zod Schemas */
import { TodoSchema } from "../../models/TodoSchema";
import { putTodos } from "../../apiHandler/todos";
import EachTodo from "./EachTodo";

// type TodoType = z.infer<typeof TodoSchema>;
// type TodoTypeArray = TodoType[];

export default function UserTodos({ todos }) {
  const [todosState, setTodosState] = useState(todos);

  const onDelete = (id) => {
    setTodosState(todosState.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todosState === undefined ? (
          <div>Todos 데이터가 없습니다.</div>
        ) : (
          todosState.map((todo) => (
            <EachTodo
              key={todo.id}
              todo={todo}
              onDelete={() => onDelete(todo.id)}
            />
          ))
        )}
      </ul>
    </>
  );
}
