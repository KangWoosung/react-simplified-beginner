import React from "react";
import { useState, useEffect, useContext } from "react";
import { TodosContext } from "../Components683";
import TodoItem683 from "./TodoItem683";

const TodoList683 = () => {
  const { todos, filterStr, hideCompleted, toggleTodo, deleteTodo, addTodo } =
    useContext(TodosContext);
  console.log("TodoList683 todos", todos);
  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          return (
            <TodoItem683
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

export default TodoList683;
