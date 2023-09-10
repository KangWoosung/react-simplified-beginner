import React from "react";

const TodoList = ({ todos, onChange, onDelete, filterStr, hideCompleted }) => {
  console.log("TodoList ", todos);
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
                  data-id={todo.id}
                  onChange={onChange}
                />
                <span data-list-item-text>{todo.name}</span>
              </label>
              <button data-button-edit>Edit</button>
              <button data-button-delete data-id={todo.id} onClick={onDelete}>
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
