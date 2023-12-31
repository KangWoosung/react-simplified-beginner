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

*.useReducer 와 useContext 를 사용해야 한다.
*.컴포넌트를 최대한 분리해야 한다.
*.컴포넌트 구조 결정부터 시작하자. 
    FilterForm
    TodoList
    AddNewTodo
데이터 IO 를 LocalStorage 에서 해야하는데, 이걸 어느 컴포넌트에서 관리해야 하는가?
여기, 본캐에서 해야지. 자식 컴포넌트들이 모두 사용하게 될텐데

useLocalStorage 의 사용방법을 다 까먹었다. 소스코드를 시간을 갖고 들여다 보고, 사용방법을 알아내야겠다. 
localStorage 에 data 가 stack 되는 구조부터 결정해야 한다.
그걸 결정하기 위해서는, TodoList 앱이 어떤 기능을 갖게 되는 지를 알아야 한다. 
-array.filter
-array.edit
-array.delete
-array.add
-array.show/hide & completed

localStorage 에 저장되는 데이터 구조는, 단순 배열로 충분하다. 
localStorage: 
ToDoList = [
  { id: 1, name: "Item 1", completed: false },
  { id: 2, name: "Item 2", completed: false },
  { id: 3, name: "Item 3", completed: false },
];
조금 해보니, 단순배열은 아닌 것 같은데... 
맞고 틀리고의 문제가 아니다. 태스크 구현의 문제이다.
단순 배열 데이터 구조로 결정하고, 그걸 구현해내자. 

처음부터 reducer 와 context 를 쓰면 너무 어려워지니까,
일단은 props 로 구현해보고, 나중에 reducer 와 context 로 바꿔보자.
먼저 initialTodos 를 insert 되도록 useEffect 에 넣어주고,
addNewTodo 펑션을 만들어서 AddNewTodo 컴포넌트에 넘겨주자.

2023-09-11 00:55:37
props 버전으로 모두 구현 완료.. 
이제 useReducer, useContext 를 넣어서 재구성해보자. 
먼저 할 일들.. useReducer 의 6개 스텝 기억해내자.
initialState, reducer, dispatch, action, action.type, action.payload
*/
const initialTodos = [
  { id: crypto.randomUUID(), name: "Item 1", completed: false },
  { id: crypto.randomUUID(), name: "Item 2", completed: false },
  { id: crypto.randomUUID(), name: "Item 3", completed: false },
];

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
