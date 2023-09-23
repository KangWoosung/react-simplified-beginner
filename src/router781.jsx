/* 2023-09-23 11:01:20
beginner 코스의 마지막 프로젝트.... 
리얼 월드의 태스크와 다를 게 없다. 
CRUD 를 모두 다루고, URL 라우팅과 리다이랙션을 완성한다. 

1. 우선 태스크를 모두 완성하고,
2. 다양한 라이브러리를 도입해 활용해보자.
    React-Router-Dom
    React-Hook-Form
    React-Query
    Zod

75 강에서의 라우터를, from scratch.. 기억을 더듬어 처음부터 만들어보자.
2023-09-23 21:00:13
약간의 컨닝도 있었지만, 거의 모든 코드를 혼자 더듬어내서 복원하였다. 
잘 했어.
우선 커밋 해서, 버슬 디플로이 상태부터 바꾸고, 그리고 내일부터 78강 숙제에 본격적으로 들어가보자.

*/

import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { PostsListRoute } from "./components78/PostsList781";
import { PostRoute } from "./components78/Post781";
import { UsersListRoute } from "./components78/UsersList781";
import { UserRoute } from "./components78/User781";
import { TodoListRoute } from "./components78/TodoList781";
import Home from "./client/Home";

console.log("PostsListRoute", PostsListRoute);

export const router781 = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "posts",
        children: [
          { index: true, ...PostsListRoute },
          { path: ":postId", ...PostRoute },
        ],
      },
      {
        path: "users",
        children: [
          { index: true, ...UsersListRoute },
          { path: ":userId", ...UserRoute },
        ],
      },
      {
        path: "todos",
        children: [
          { index: true, ...TodoListRoute },
          // { path: ":todoId", ...UserRoute },
        ],
      },
    ],
  },
  {},
]);
