import React from "react";
import { useState, useContext } from "react";
import { TodosContext } from "../Components683";
import { ACTION } from "../Components682";

const AddTodo683 = () => {
  const { addTodo, AddTodoRef } = useContext(TodosContext);
  const handleInputSubmit = (e) => {
    e.preventDefault();
    addTodo(AddTodoRef.current.value);
    AddTodoRef.current.value = "";
  };
  return (
    <>
      <form onSubmit={(e) => handleInputSubmit(e)} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={AddTodoRef} />
        <button>Add Todo</button>
      </form>
    </>
  );
};

export default AddTodo683;
