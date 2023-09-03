import React from "react";
import { useState, useEffect, useRef } from "react";

const Components58 = () => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
  };

  return (
    <>
      <h1>Components58</h1>
      <h2>Simple Todo List</h2>

      <form onSubmit={handleSubmit} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={inputRef} />
        <button>Add Todo</button>
      </form>
    </>
  );
};

export default Components58;
