/* 2023-09-29 16:41:47

*/

import { RootLayout } from "./layouts/RootLayout";
import Home from "./client/Home";
import { PostsListRoute } from "./components78/PostsList782";
import { PostRoute } from "./components78/Post782";
import { UsersListRoute } from "./components78/UsersList782";
import { UserRoute } from "./components78/User782";
import { TodoListRoute } from "./components78/TodoList781";
import { NewPostRoute } from "./components78/NewPost783";
import { EditPostRoute } from "./components78/EditPost782";
import { createBrowserRouter } from "react-router-dom";

export const router783 = createBrowserRouter([
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
