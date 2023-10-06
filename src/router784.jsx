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
import { createBrowserRouter } from "react-router-dom";

export const router784 = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/posts",
        children: [
          { index: true, ...PostsListRoute },
          { path: ":postId", ...PostRoute },
          { path: "new", ...NewPostRoute },
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
]);
