/* 2023-09-30 16:57:59

새로운 모듈 tsx 를 import 하여 시도한다.
*/

import { RootLayout } from "./layouts/RootLayout";
import Home from "./client/Home";
import { PostsListRoute } from "./components78/PostsList784.tsx";
import { PostRoute } from "./components78/Post783.tsx";
import { UsersListRoute } from "./components78/UsersList784.tsx";
import { UserRoute } from "./components78/User784.tsx";
import { TodoListRoute } from "./components78/TodoList784.tsx";
import { NewPostRoute } from "./components78/NewPost784.tsx";
import { EditPostRoute } from "./components78/EditPost785.tsx";
import { DeletePostRoute } from "./components78/DeletePost784.tsx";
import { createBrowserRouter, useRouteError } from "react-router-dom";

export const router784 = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home /> },
          {
            path: "/posts",
            children: [
              { index: true, ...PostsListRoute },
              { path: "new", ...NewPostRoute },
              { path: ":postId", ...PostRoute },
              { path: ":postId/edit", ...EditPostRoute },
              { path: ":postId/delete", ...DeletePostRoute },
            ],
          },
          {
            path: "/users",
            children: [
              { index: true, ...UsersListRoute },
              { path: ":userId", ...UserRoute },
            ],
          },
          {
            path: "todos",
            children: [{ index: true, ...TodoListRoute }],
          },
        ],
      },
    ],
  },
]);
function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
