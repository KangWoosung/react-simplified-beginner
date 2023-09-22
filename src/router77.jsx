import { createBrowserRouter, redirect } from "react-router-dom";
import NewTodo77 from "./client/NewTodo77";
import TodoList77 from "./client/TodoList77";
import { RootLayout } from "./layouts/RootLayout";
import "./css/styles75.css";

export const router77 = createBrowserRouter([
  {
    index: true,
    element: <TodoList77 />,
    loader: async ({ request: { signal, url } }) => {
      const queryParams = new URL(url).searchParams;
      const query = queryParams.get("query") || "";
      console.log(query);
      console.log(`fetch URL: http://localhost:3000/todos?q=${query}`);
      const data = await fetch(`http://localhost:3000/todos?q=${query}`, {
        signal,
      }).then((res) => res.json());

      return { todos: data, query };
    },
  },
  {
    path: "/new",
    element: <NewTodo77 />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const title = formData.get("title");
      console.log(title);

      if (title === "") return "Title required";

      const todo = await fetch(`http://localhost:3000/todos?`, {
        method: "POST",
        signal: request.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      }).then((res) => res.json());

      console.log(todo);
      return redirect("/");
    },
  },
]);
