import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { TodosContext } from "../Components684";
import { useForm } from "react-hook-form";

/* 2023-09-13 03:16:07
이제부턴 폼은 무조건 react-hook-form 쓰는 거로 하자.

*/

const AddTodo685 = () => {
  const { addTodo } = useContext(TodosContext);
  const { register, handleSubmit, reset } = useForm();

  const handleInputSubmit = (data) => {
    addTodo(data.newTodo);
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleInputSubmit)} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" {...register("newTodo")} />
        <button>Add Todo</button>
      </form>
    </>
  );
};

export default AddTodo685;
