import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { TodosContext } from "../Components684";

const AddTodo684 = () => {
  const { addTodo, newTodoRef } = useContext(TodosContext);
  const handleInputSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodoRef.current.value);
    newTodoRef.current.value = "";
    newTodoRef.current.focus();
  };
  return (
    <>
      <form onSubmit={(e) => handleInputSubmit(e)} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={newTodoRef} />
        <button>Add Todo</button>
      </form>
    </>
  );
};

export default AddTodo684;
