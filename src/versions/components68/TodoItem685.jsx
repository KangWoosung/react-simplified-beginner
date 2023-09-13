import { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { TodosContext } from "../Components684";

/*  2023-09-13 03:07:13
react-hook-form 라이브러리를 도입하여 재구성 해봤다.
GPT 에게 시켜서 나온 코드를 조금 손 보기만 했지만,
이렇게 쓰면 되는 거였구나. 앞으로 react-hook-form 라이브러리를 되도록 많이 사용하자.
*/

const TodoItem685 = ({ id, name, completed }) => {
  const { toggleTodo, deleteTodo, editTodoAction } = useContext(TodosContext);
  const { register, handleSubmit, setValue } = useForm();
  const [editingTodoId, setEditingTodoId] = useState(null);

  // edit 모드에서 사용자 편의를 추가하는 useEffect
  // edit 모드에서 esc 를 누르면 edit 모드가 해제된다.
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.key === "Escape" && setEditingTodoId(null);
    };
    editingTodoId
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);
  }, [editingTodoId]);

  const handleEditTodo = (data) => {
    if (data.editTodo.length === 0) return;
    editTodoAction(id, data.editTodo);
    setEditingTodoId(null);
  };

  return (
    <li>
      {editingTodoId === id ? (
        <form onSubmit={handleSubmit(handleEditTodo)}>
          <label htmlFor={`edit-todo-${id}`}>Edit Todo</label>
          <input
            autoFocus
            type="text"
            id={`edit-todo-${id}`}
            defaultValue={name}
            {...register("editTodo")}
          />
          <button>Update Todo</button>
        </form>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleTodo(id)}
            />
            {name}
          </label>
          <button onClick={() => setEditingTodoId(id)}>Edit</button>
          <button onClick={() => deleteTodo(id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem685;
