import React from "react";
import { useState, useEffect } from "react";
import Child41 from "./components/Child41";
import "../css/styles41.css";

const Components55 = () => {
  const [newTodo, setNewTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todoId, setTodoId] = useState(1);
  //   const [finished, setFinished] = useState(false);

  useEffect(() => {
    // console.log("useEffect rendering...");
    console.log(allTodos);
  }, [allTodos]);

  const addNewTodo = (e) => {
    e.preventDefault();
    if (newTodo === "") return;
    setAllTodos([...allTodos, { id: todoId, finished: false, todo: newTodo }]);
    setTodoId((prev) => prev + 1);
    setNewTodo("");
  };
  const removeTodo = (targetTodoId) => {
    console.log("removeTodo");
    // State 를 업데이트할 때에는, setState 를 직접 붙여주는 게 좋다.
    // 변수를 추가해서 업데이트 밸류를 작업아고, setState(verVar) 하는 습관은,
    // 프로젝트 규모가 커지면서 버그 트랙다운을 어렵게 한다.
    setAllTodos(allTodos.filter((eachTodo) => eachTodo.id !== targetTodoId));
  };
  const toggleTodo = (targetTodoId, checked) => {
    console.log("toggleTodo", targetTodoId, checked);
    //  오브젝트 어레이의 한 요소, 한개의 값을 변경하려면, 스프레드로는 방법 없고,
    //  map() 을 써야 한다... 이거 중요한 거 배운 거니까 꼭 기억해두자.
    setAllTodos(
      allTodos.map((todo) => {
        if (todo.id === targetTodoId) return { ...todo, finished: checked };
        else return todo;
      })
    );
  };
  return (
    <>
      <h1>Components41</h1>
      <h2>Simple Todo List</h2>
      <ul id="list">
        {allTodos.map((eachTodo) => {
          return (
            <Child41
              key={crypto.randomUUID()}
              {...eachTodo}
              removeFunc={removeTodo}
              toggleFunc={toggleTodo}
            />
          );
        })}
      </ul>

      <form onSubmit={addNewTodo} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <select value={3}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button>Add Todo</button>
      </form>
    </>
  );
};

export default Components55;
