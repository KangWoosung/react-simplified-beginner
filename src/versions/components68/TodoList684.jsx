import React from "react";
import { useState, useEffect, useContext } from "react";
import TodoItem685 from "./TodoItem685";
import { TodosContext } from "../Components684";

const TodoList684 = () => {
  const { todos } = useContext(TodosContext);
  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          return (
            <TodoItem685
              key={todo.id}
              id={todo.id}
              name={todo.name}
              completed={todo.completed}
            />
          );
        })}
      </ul>
    </>
  );
};

export default TodoList684;
