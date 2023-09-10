import React from "react";
import { useContext } from "react";
import { TodosContext } from "../Components682";
import { ACTION } from "../Components682";

const AddNewTodo = () => {
  const { state, dispatch, setStorageTodos, newTodoRef } =
    useContext(TodosContext);
  const { todos } = state;
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={newTodoRef} />
        <button
          onClick={() => {
            const newTodo = {
              id: crypto.randomUUID(),
              name: newTodoRef.current.value,
              completed: false,
            };
            dispatch({
              type: ACTION.ADD_TODO,
              payload: newTodoRef.current.value,
            });
            setStorageTodos(() => {
              return [...todos, newTodo];
            });
            newTodoRef.current.value = "";
          }}
        >
          Add Todo
        </button>
      </form>
    </>
  );
};

export default AddNewTodo;
