/* 2023-10-06 18:46:37


*/

import React, { useState } from "react";
import { z } from "zod";
import { deleteTodos, putTodos } from "../../apiHandler/todos";

/********** Import Zod Schemas */
import { TodoSchema } from "../../models/TodoSchema";

type TodoType = z.infer<typeof TodoSchema>;

export default function EachTodo({ todo, onDelete }) {
  const [todoState, setTodoState] = useState<TodoType>(todo);

  const toggleCompleted = async (e) => {
    try {
      const todoDataObj = { ...todoState, completed: !todoState.completed };
      await putTodos(todoDataObj, {});
      await setTodoState(todoDataObj); // 상태 업데이트
      console.log("todoDataObj", todoDataObj);
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  const deleteTodo = async (e) => {
    try {
      await deleteTodos(todoState.id, {});
      onDelete(todoState.id);
      console.log("deleteTodo", todoState);
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  console.log("todoState", todoState);
  return (
    <>
      <li className={todoState.completed ? "strike-through" : ""}>
        <input
          type="checkbox"
          checked={todoState.completed}
          onChange={(e) => toggleCompleted(e)}
        />
        {todoState.title}
        <button onClick={(e) => deleteTodo(e)}>Delete</button>
      </li>
    </>
  );
}
