import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { TodosContext } from "../Components684";

const TodoItem684 = ({ id, name, completed }) => {
  const { toggleTodo, deleteTodo, editTodoAction } = useContext(TodosContext);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const editTodoRef = useRef();

  const handleEditTodo = (e) => {
    console.log(editTodoRef.current.value);
    e.preventDefault();
    editTodoAction(id, editTodoRef.current.value);
    setEditingTodoId(null);
  };

  return (
    <li>
      {editingTodoId === id ? (
        <form onSubmit={(e) => handleEditTodo(e)}>
          <label htmlFor="edit-todo">Edit Todo</label>
          <input
            type="text"
            id="edit-todo"
            defaultValue={name}
            ref={editTodoRef}
          />
          <button>Update Todo</button>
        </form>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => toggleTodo(id)}
            />
            {name}
          </label>
          <button onClick={(e) => setEditingTodoId(id)}>Edit</button>
          <button onClick={(e) => deleteTodo(id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem684;
