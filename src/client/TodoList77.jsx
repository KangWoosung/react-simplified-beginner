import { useLoaderData, useNavigation } from "react-router";
import { Form, Link } from "react-router-dom";
import TodoItem77 from "./components/TodoItem77";
import { useEffect, useRef } from "react";

export default function TodoList77() {
  const { todos, query } = useLoaderData();
  const { state } = useNavigation();
  const queryRef = useRef();
  console.log("todos", todos);

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  return (
    <div className="container">
      <h1 className="page-title mb-2">
        New Todo
        <div className="title-btns">
          <Link to="/new" className="btn">
            New
          </Link>
        </div>
      </h1>

      <Form className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Search</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <button className="btn">Search</button>
        </div>
      </Form>

      {state === "loading" ? (
        "Loading"
      ) : (
        <ul>
          {todos.map((todo) => (
            //   console.log(todo);
            <TodoItem77 key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
