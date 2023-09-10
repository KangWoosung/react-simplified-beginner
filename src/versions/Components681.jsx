import React from "react";
import { useState, useEffect, useRef, useReducer, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import AddNewTodo from "./components68/AddNewTodo";
import TodoList from "./components68/TodoList";
import FilterForm from "./components68/FilterForm";
import "../css/styles68.css";

/*  2023-09-10 21:38:19
1. The state for our todos should be stored in local storage so when we come back to the page at a later time all our data is still there
2. Convert all the state in the application to use useReducer and Context to pass the state between components
3. Add the ability to delete existing todos
4. Add a form that lets you filter todos by their name and hide completed todos
5. Add the ability to edit existing todos
    This is in the bonus section not because the editing portion is tricky, but because handling the proper UI state of swapping between text and an input is something we haven't really done before

2023-09-11 00:55:37
props 버전으로 모두 구현 완료.. 
이제 useReducer, useContext 를 넣어서 재구성해보자. 
먼저 할 일들.. useReducer 의 6개 스텝 기억해내자.
initialState, reducer, dispatch, action, action.type, action.payload
*/
const initialState = {
  todos: [],
  filterStr: "",
  hideCompleted: false,
};

const Components68 = () => {
  const [todos, setTodos] = useLocalStorage("TODOS");
  const [filterStr, setFilterStr] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);
  const newTodoRef = useRef();

  const addNewTodo = () => {
    if (newTodoRef.current.value === "") return;
    const name = newTodoRef.current.value;
    console.log("addNewTodo ", newTodoRef.current.value);
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), name: name, completed: false },
    ]);
  };
  // onChange 체크박스 클릭에 대응 하는 펑션
  // 2023-09-10 23:36:37
  // onChange 작동 성공
  const onChange = (e) => {
    const dataId = e.target.getAttribute("data-id");
    console.log("onChange ", dataId);
    setTodos(
      todos.map((todo) => {
        if (todo.id === dataId) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };
  // 2023-09-10 23:32:01
  // onDelete 작동 성공
  const onDelete = (e) => {
    const dataId = e.target.getAttribute("data-id");
    console.log("onDelete ", dataId);
    setTodos(todos.filter((todos) => todos.id !== dataId));
  };
  // onChangeFilterStr
  // 2023-09-11 00:48:47
  // onChangeFilterStr 작동 성공
  const onChangeFilterStr = (e) => {
    setFilterStr(e.target.value);
    console.log("onChangeFilterStr ", e.target.value, filterStr);
  };
  // hideCompleted
  // 2023-09-11 00:55:25
  // hideCompleted 작동 성공
  const onChangeHideCompleted = (e) => {
    console.log("hideCompleted ", e.target.checked);
    setHideCompleted(e.target.checked);
  };

  return (
    <div>
      <h1>Components68</h1>
      <h2>Simple ToDo with LocalStorage Hook</h2>
      {/* FilterForm 필터 컴포넌트  */}
      <FilterForm
        filterStr={filterStr}
        onChangeFilterStr={onChangeFilterStr}
        hideCompleted={onChangeHideCompleted}
      />
      {/*  TodoList ToDo 리스트 컴포넌트  */}
      <TodoList
        todos={todos}
        onChange={onChange}
        onDelete={onDelete}
        filterStr={filterStr}
        hideCompleted={hideCompleted}
      />
      {/*  AddNewTodo Add New ToDo 컴포넌트  */}
      <AddNewTodo addNewTodo={addNewTodo} newTodoRef={newTodoRef} />
    </div>
  );
};

export default Components68;
