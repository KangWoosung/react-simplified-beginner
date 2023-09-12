import React from "react";
import { useState, useEffect, useRef, useReducer, createContext } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoList684 from "./components68/TodoList684";
import AddTodo685 from "./components68/AddTodo685";
import FilterForm684 from "./components68/FilterForm684";

/*  2023-09-12 22:24:53
68강의 숙제 3차 답안... 
코딩의 방법과 방향은 2차 답안과 같다.
이번 답안은, useReducer 와 useContext 의 사용방식, 사용처 등에 조금 더 숙련되는 데에 목적이 있다. 
그리고 추가로, react-hook-form 라이브러리도 사용해서 폼 엘리먼트를 핸들링 해보자. 

*/
const LOCALSTORAGE_KEY = "TODOS";

const initialState = [];

const ACTION = {
  SET: "SET",
  ADD: "ADD",
  DELETE: "DELETE",
  EDIT: "EDIT",
  TOGGLE: "TOGGLE",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTION.SET:
      return {
        todos: action.payload,
      };
    case ACTION.ADD:
      return [
        ...todos,
        { id: crypto.randomUUID(), name: action.payload, completed: false },
      ];
    case ACTION.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    case ACTION.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTION.EDIT:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name };
        } else {
          return todo;
        }
      });
    default:
      throw new Error("reducer 에서 액션 타입이 잘못되었습니다.");
  }
}

const TodosContext = createContext();
export { TodosContext, ACTION };

const Components684 = () => {
  const [storageTodos, setStorageTodos] = useLocalStorage(
    LOCALSTORAGE_KEY,
    initialState
  );
  const [todos, dispatch] = useReducer(reducer, initialState, () => {
    return storageTodos ? storageTodos : [];
  });

  const [filterStr, setFilterStr] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const newTodoRef = useRef();
  const filterRef = useRef();

  // todos state 변화를 감시하고, 변화가 생기면 storageTodos 에 반영한다.
  useEffect(() => {
    setStorageTodos(todos);
  }, [todos]);

  const toggleTodo = (todoId) => {
    dispatch({ type: ACTION.TOGGLE, payload: { id: todoId } });
  };
  const deleteTodo = (todoId) => {
    dispatch({ type: ACTION.DELETE, payload: { id: todoId } });
  };
  const editTodoAction = (todoId, todoName) => {
    dispatch({ type: ACTION.EDIT, payload: { id: todoId, name: todoName } });
  };
  const addTodo = (todoName) => {
    dispatch({ type: ACTION.ADD, payload: todoName });
  };

  const filteredTodoList = todos.filter((todo) => {
    // console.log("filterStr: ", filterStr, todo.name);
    if (filterStr.length > 0 && typeof todo.name == "undefined") return false;
    else if (typeof todo.name == "undefined") return true;
    if (hideCompleted) {
      return todo.name.includes(filterStr) && !todo.completed;
    } else {
      return todo.name.includes(filterStr);
    }
  });

  return (
    <>
      <h1>Components684</h1>
      <h2>useReducer, useContext 그리고 react-hook-form 의 숙련</h2>

      <TodosContext.Provider
        value={{
          todos: filteredTodoList,
          toggleTodo,
          deleteTodo,
          editTodoAction,
          addTodo,
          newTodoRef,
        }}
      >
        <FilterForm684
          filterRef={filterRef}
          filterStr={filterStr}
          setFilterStr={setFilterStr}
          hideCompleted={hideCompleted}
          setHideCompleted={setHideCompleted}
        />
        <TodoList684 />
        <AddTodo685 />
      </TodosContext.Provider>
    </>
  );
};

export default Components684;
