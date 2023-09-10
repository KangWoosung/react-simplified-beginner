import React from "react";

/*  2023-09-10 22:25:02
이것부터 작업해보자.
*/

const AddNewTodo = ({ addNewTodo, newTodoRef }) => {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={newTodoRef} />
        <button onClick={addNewTodo}>Add Todo</button>
      </form>
    </>
  );
};

export default AddNewTodo;
