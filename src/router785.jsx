/* 2023-09-30 16:57:59

새로운 모듈 tsx 를 import 하여 시도한다.
*/

import { RootLayout } from "./layouts/RootLayout";
import Home from "./client/Home";
import { PostsListRoute } from "./components78/PostsList784";
import { PostRoute } from "./components78/Post783";
import { UsersListRoute } from "./components78/UsersList784";
import { UserRoute } from "./components78/User784";
import { TodoListRoute } from "./components78/TodoList784";
import { NewPostRoute } from "./components78/NewPost785";
import { EditPostRoute } from "./components78/EditPost785";
import { DeletePostRoute } from "./components78/DeletePost784";
import { createBrowserRouter, useRouteError } from "react-router-dom";

export const router785 = createBrowserRouter([
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
