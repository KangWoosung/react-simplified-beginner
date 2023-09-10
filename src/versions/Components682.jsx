import React from "react";
import { useState, useEffect, useRef, useReducer, createContext } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "../hooks/useLocalStorage";
import AddNewTodo from "./components68/AddNewTodo";
import TodoList from "./components68/TodoList";
import FilterForm from "./components68/FilterForm";
import "../css/styles68.css";

// props 버전 681
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
initialState 선언, 
action 상수 선언, 
reducer 펑션 작성,
dispatch, 
action.type, 
action.payload
*/
const initialState = {
  todos: [],
  filterStr: "",
  hideCompleted: false,
};
const ACTION = {
  SET_TODOS: "SET_TODOS",
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  FILTER_TODOLIST: "FILTER_TODOLIST",
  HIDE_COMPLETED: "HIDE_COMPLETED",
};
export { ACTION };
// reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTION.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case ACTION.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), name: action.payload, completed: false },
        ],
      };
    case ACTION.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case ACTION.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, name: action.payload.name };
          } else {
            return todo;
          }
        }),
      };
    case ACTION.TOGGLE_TODO:
      console.log("reducer TOGGLE_TODO is running");
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          } else {
            return todo;
          }
        }),
      };
    case ACTION.FILTER_TODOLIST:
      return {
        ...state,
        filterStr: action.payload,
      };
    case ACTION.HIDE_COMPLETED:
      return {
        ...state,
        hideCompleted: !state.hideCompleted,
      };
    default:
      return state;
  }
}

// useContext
const TodosContext = createContext();
export { TodosContext };

// reducer 가 관리하는 건 상태 들이고,
// todos 역시 상태에 속한다.
const Components682 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const newTodoRef = useRef();
  const [storageTodos, setStorageTodos] = useLocalStorage("TODOS", []);

  useEffect(() => {
    console.log("useEffect is running");
    dispatch({ type: ACTION.SET_TODOS, payload: storageTodos });
  }, []);

  return (
    <TodosContext.Provider
      value={{
        state,
        dispatch,
        setStorageTodos,
        newTodoRef,
      }}
    >
      <h1>Components682</h1>
      <h2>Simple ToDo with LocalStorage Hook</h2>
      {/* FilterForm 필터 컴포넌트  */}
      <FilterForm />
      {/*  TodoList ToDo 리스트 컴포넌트  */}
      <TodoList />
      {/*  AddNewTodo Add New ToDo 컴포넌트  */}
      <AddNewTodo />
    </TodosContext.Provider>
  );
};

export default Components682;
