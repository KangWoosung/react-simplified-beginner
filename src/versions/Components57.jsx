import React from "react";
import { useState, useEffect, useRef } from "react";
import Child41 from "./components/Child41";
import "../css/styles41.css";

const Components57 = () => {
  const inputRef = useRef();

  useEffect(() => {
    console.log("useEffect rendering...");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    if (name === "") return;
    else alert(`Name: ${name}`);
  };
  return (
    <>
      <h1>Components57</h1>
      <h2>Simple Todo List</h2>

      <form onSubmit={handleSubmit} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={inputRef} />
        <button>Add Todo</button>
      </form>
    </>
  );
};

export default Components57;
