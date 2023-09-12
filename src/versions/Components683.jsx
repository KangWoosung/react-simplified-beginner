import React from "react";
import { useState, useEffect, useRef, useReducer, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoList683 from "./components68/TodoList683";
import AddTodo683 from "./components68/AddTodo683";
import "../css/styles68.css";
import FilterForm683 from "./components68/FilterForm683";

/*  2023-09-11 23:56:51
Kyle 의 모범답안이 꽤나 충격적이긴 하다. 
1. useReducer() 의 제 3 파라메터인, init() 펑션으로, 초기 데이터를 Storage 에서 받아와 확보한다.
2. 확보한 초기 데이터를 useReducer() 의 리턴 밸류 스테이트 todos 에 보관한다. 
3. useEffect() 의 디펜던시로 todos 를 붙여주고, todos 에 변경이 있을 때마다, Storage.Update() 가 이루어지도록 한다. 
4. todos 의 array 데이터는 부모 App 컴포넌트에서 항상 최신 상태이고, filter 등의 조건 스테이트 필터링도 부모 App 컴포넌트에서 관리할 수 있다. 
5. Context 에서 dispatch 를 프로바이딩 해줄 게 아니라, 완성된 펑션을 나눠주도록 하자.

.. 
2023-09-12 01:31:30
useReducer 로 모든 state 를 관리하겠다는 강박 때문에 
const [state, dispatch] = useReducer(reducer, initialState);
이렇게 쓰려고 하는데, useReducer 로는 todos 만 관리한다고 생각하자. 
const [todos, dispatch] = useReducer(reducer, initialState);
이렇게 써야 안꼬인다. 
추가로... 
reducer 하나당 데이터 객체 하나.. 라고 생각하고 있자. 다른 상황을 만나기 전 까지는..


2023-09-12 02:39:21
Kyle 은, filter 구현에서, App.jsx 에서 이미 완료한 todos.list 를 보내주고 있다. 
나도 그렇게 해보자. 어떻게 해야 할까?

..
2023-09-12 04:17:10
todo.name.update() 시에, 의도치 않은 completed 가 토글되는 에러가 남아있다. 
어디에서 트리거 되는지 결국 못찾았는데... 중요한 문제가 되지 않을지 걱정은 남는다.
어찌됐든..
1차 답안은 만 하루를 꼬박 잡아먹고도 넘긴 시간만에 제출 되었는데,
2차 답안은 대략 4시간여 걸린 것 같다.
3차 답안까지 반복할 에너지가 될지.. 아직 잘 모르겠다. 너무 달린 듯.. 좀 쉬어야 겠다. 
커밋만 해두고 한두시간 쉬어보자.

2023-09-12 06:16:56
3차 답안은 내일 하자. 오늘은 놀자. 

*/
const LOCALSTORAGE_KEY = "TODOS";

const TodosContext = createContext();
export { TodosContext };

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

    //  map 자체가 어레이를 리턴하므로, 여기선 [] 로 감싸주지 않는다.
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

const Components683 = () => {
  // 0. useLocalStorage() 훅을 이용해서, Storage 에서 초기 데이터를 받아온다.
  const [localStorageTodo, setLocalStorageTodo] =
    useLocalStorage(LOCALSTORAGE_KEY);
  // 1. useReducer() 의 제 3 파라메터인, init() 펑션으로, 초기 데이터를 Storage 에서 받아와 확보한다.
  const [todos, dispatch] = useReducer(reducer, initialState, () => {
    // 2. 확보한 초기 데이터를 useReducer() 의 리턴 밸류 스테이트 todos 에 보관한다.
    return localStorageTodo || [];
  });
  const AddTodoRef = useRef();
  // 글로벌 영역에서 필터를 관리해주자.
  const [filterStr, setFilterStr] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);

  // edit
  const [editingTodoId, setEditingTodoId] = useState("");

  // 3. useEffect() 의 디펜던시로 todos 를 붙여주고, todos 에 변경이 있을 때마다, Storage.Update() 가 이루어지도록 한다.
  useEffect(() => {
    if (todos == "" || todos == []) return;
    setLocalStorageTodo(todos);
  }, [todos]);

  // 5. Context 로 넘겨줄 펑션들을 지정하자.
  const addTodo = (todoName) => {
    dispatch({ type: ACTION.ADD, payload: todoName });
  };
  const deleteTodo = (todoId) => {
    dispatch({ type: ACTION.DELETE, payload: { id: todoId } });
  };
  const editTodoAction = (todoId, todoName) => {
    dispatch({ type: ACTION.EDIT, payload: { id: todoId, name: todoName } });
  };
  const toggleTodo = (todoId) => {
    dispatch({ type: ACTION.TOGGLE, payload: { id: todoId } });
  };
  // 필터 스테이트 값이 부모 컴포넌트에서 관리되기 때문에,
  // 필터의 결과물을 부모 컴포넌트에서 미리 작업해준 뒤에 자식으로 보내주자.
  const filteredTodoList = todos.filter((todo) => {
    if (hideCompleted) {
      return todo.name.includes(filterStr) && !todo.completed;
    } else {
      return todo.name.includes(filterStr);
    }
  });

  return (
    <TodosContext.Provider
      value={{
        todos: filteredTodoList,
        AddTodoRef,
        toggleTodo,
        deleteTodo,
        addTodo,
        editTodoAction,
        editingTodoId,
        setEditingTodoId,
      }}
    >
      <h1>Components683</h1>
      <h2>Simple Todo List... </h2>
      <h3>
        useReducer() 와 dispatch() 가 state 변화를 일으키고, useEffect() 가
        Storage 업데이트를 담당한다.
      </h3>
      <FilterForm683
        hideCompleted={hideCompleted}
        setHideCompleted={setHideCompleted}
        filterStr={filterStr}
        setFilterStr={setFilterStr}
      />
      <TodoList683 />
      <AddTodo683 />
    </TodosContext.Provider>
  );
};

export default Components683;
