import React, { useContext, useState } from "react";
import { TodosContext } from "../Components682";
import { ACTION } from "../Components682";

/*  2023-09-11 19:26:16
GPT 에게 리팩토링을 부탁한 결과 코드...
*/

const TodoList2 = () => {
  const { state, dispatch, setStorageTodos } = useContext(TodosContext);
  const { todos, filterStr, hideCompleted } = state;

  const [editingTodoId, setEditingTodoId] = useState("");
  const [editingTodo, setEditingTodo] = useState("");

  const handleCheckboxChange = async (todo, isChecked) => {
    await dispatch({
      type: ACTION.TOGGLE_TODO,
      payload: { id: todo.id, completed: isChecked },
    });
    await updateStorageTodos((each) => {
      if (each.id === todo.id) {
        return { ...each, completed: !each.completed };
      } else {
        return each;
      }
    });
  };

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTodo(todo.name);
  };

  const handleModifyClick = async (todo) => {
    await dispatch({
      type: ACTION.EDIT_TODO,
      payload: { id: todo.id, name: editingTodo },
    });
    await updateStorageTodos((each) => {
      if (each.id === todo.id) {
        return { ...each, name: editingTodo };
      } else {
        return each;
      }
    });
    setEditingTodoId("");
  };

  const handleDeleteClick = async (todo) => {
    await dispatch({ type: ACTION.DELETE_TODO, payload: todo.id });
    await updateStorageTodos((each) => each.id !== todo.id);
  };
  // 오!!!
  // 이런 코드가 있었네!!!!
  // updateStorageTodos((each) => each.id !== todo.id);
  const updateStorageTodos = (updateFunction) => {
    // setStorageTodos((todos) => todos.map(updateFunction));
    // Promise 를 리턴하도록 수정함.
    return new Promise((resolve) => {
      setStorageTodos((todos) => {
        const updatedTodos = todos.map(updateFunction);
        resolve(updatedTodos);
        return updatedTodos;
      });
    });
  };

  return (
    <ul id="list">
      {todos.map((todo) => {
        if (filterStr && !todo.name.includes(filterStr)) return null;
        if (hideCompleted && todo.completed) return null;

        return (
          <li className="list-item" key={todo.id}>
            <label className="list-item-label">
              <input
                type="checkbox"
                data-list-item-checkbox
                checked={todo.completed}
                onChange={(e) => handleCheckboxChange(todo, e.target.checked)}
              />
              {editingTodoId !== todo.id ? (
                <span data-list-item-text>{todo.name}</span>
              ) : (
                <>
                  <input
                    type="text"
                    value={editingTodo}
                    onChange={(e) => setEditingTodo(e.target.value)}
                  />
                  <button onClick={() => handleModifyClick(todo)}>
                    Modify
                  </button>
                </>
              )}
            </label>
            <button data-button-edit onClick={() => handleEditClick(todo)}>
              Edit
            </button>
            <button data-button-delete onClick={() => handleDeleteClick(todo)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList2;
