import React from "react";
import { useState, useEffect, useContext } from "react";
import { TodosContext } from "../Components682";
import { ACTION } from "../Components682";

const TodoList = () => {
  const { state, dispatch, setStorageTodos } = useContext(TodosContext);
  console.log("TodoList ", state);
  const { todos, filterStr, hideCompleted } = state;
  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          // console.log("array.map is running)");
          // console.log(filterStr, todo.name);
          // console.log(hideCompleted, todo.completed);
          if (filterStr !== "" && !todo.name.includes(filterStr)) return null;
          if (hideCompleted && todo.completed) return null;
          return (
            <li className="list-item" key={todo.id}>
              <label className="list-item-label">
                <input
                  type="checkbox"
                  data-list-item-checkbox
                  checked={todo.completed}
                  onChange={async (e) => {
                    const isChecked = e.target.checked;
                    await dispatch({
                      type: ACTION.TOGGLE_TODO,
                      payload: { id: todo.id, completed: isChecked },
                    });
                    await setStorageTodos(() => {
                      return todos.map((each) => {
                        if (each.id === todo.id) {
                          return { ...each, completed: isChecked };
                        } else {
                          return each;
                        }
                      });
                    });
                  }}
                />
                <span data-list-item-text>{todo.name}</span>
              </label>
              <button data-button-edit>Edit</button>
              <button
                data-button-delete
                data-id={todo.id}
                onClick={() => {
                  dispatch({ type: ACTION.DELETE_TODO, payload: todo.id });
                  setStorageTodos(() => {
                    return todos.filter((each) => each.id !== todo.id);
                  });
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
