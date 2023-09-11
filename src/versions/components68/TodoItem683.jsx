import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { TodosContext } from "../Components683";

const TodoItem683 = ({ id, name, completed }) => {
  const {
    toggleTodo,
    deleteTodo,
    addTodo,
    editTodoAction,
    editingTodoId,
    setEditingTodoId,
  } = useContext(TodosContext);
  //   const [editingTodoId, setEditingTodoId] = useState("");
  const editTodoInputRef = useRef();
  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          data-list-item-checkbox
          checked={completed}
          onChange={(e) => {
            toggleTodo(id);
          }}
        />

        {editingTodoId != id ? (
          <span data-list-item-text>{name}</span>
        ) : (
          <>
            <input type="text" defaultValue={name} ref={editTodoInputRef} />
            <button
              onClick={() => {
                editTodoAction(id, editTodoInputRef.current.value);
                setEditingTodoId("");
              }}
            >
              Done
            </button>
          </>
        )}
      </label>
      <button
        data-button-edit
        data-id={id}
        onClick={(e) => {
          setEditingTodoId(id);
          console.log("edit mode triggered", id);
          console.log("EditingTodoId", editingTodoId);
        }}
      >
        Edit
      </button>
      <button
        data-button-delete
        data-id={id}
        onClick={(e) => {
          deleteTodo(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem683;
