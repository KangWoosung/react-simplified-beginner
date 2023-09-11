import React from "react";
import { useState, useEffect, useContext } from "react";
import { TodosContext } from "../Components682";
import { ACTION } from "../Components682";

const TodoList1 = () => {
  const { state, dispatch, setStorageTodos } = useContext(TodosContext);
  const { todos, filterStr, hideCompleted } = state;
  const [editingTodoId, setEditingTodoId] = useState("");
  const [editingTodo, setEditingTodo] = useState("");

  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
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
                {editingTodoId != todo.id ? (
                  <span data-list-item-text>{todo.name}</span>
                ) : (
                  <>
                    <input
                      type="text"
                      value={editingTodo}
                      onChange={(e) => setEditingTodo(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setEditingTodoId("");
                        dispatch({
                          type: ACTION.EDIT_TODO,
                          payload: { id: todo.id, name: editingTodo },
                        });
                        setStorageTodos(() => {
                          return todos.map((each) => {
                            if (each.id === todo.id) {
                              return { ...each, name: editingTodo };
                            } else {
                              return each;
                            }
                          });
                        });
                      }}
                    >
                      Modify
                    </button>
                  </>
                )}
              </label>
              <button
                data-button-edit
                data-id={todo.id}
                onClick={async () => {
                  setEditingTodo(todo.name);
                  setEditingTodoId(todo.id);
                }}
              >
                Edit
              </button>
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

export default TodoList1;
