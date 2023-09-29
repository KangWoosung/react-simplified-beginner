/* 2023-09-24 17:45:32
781 버전에서 React-Hook-Form 을 부분적으로 도입해 혼용해 쓰는데 성공하였다.
컴포넌트의 구조도 이미 잘 다듬어져 있는 상태에서 시작한 터라, 달리 손볼 구석은 뚜렷이 없어보인다.

이번 버전에서는,
    -React-Query
    -Zod
를 적극 도입해서 작성해보자. 

그리고, 다음 버전 쯤에는,
실제 API 를 구성해보자. 내 윈도우 PC 를 서버로 쓸 수 있게 공유기 설정을 만지던가,
아님 Vercel 의 MongoDB 를 사용해보던가..
또는, json-server 를 Vercel 에서 따로 구현해 놓고 그 주소를 사용하던가.. 
암튼, beginner 코스를 졸업하려면, 이 문제를 해결하고 졸업하자. 어느 단말기에서도 작동하도록은 해야지. 
1. Github 에 레포지토리를 하나 추가하자. json-server 
2. json-server 의 db.json 과 package.json 을 모두 준비해주고 npm i
3. Vercel 에서 연동시켜주기..
4. beginner 의 env 에서 VITE_API_URL 을 바꿔주면 끗

누군가의 포스트에, Vercel 에서는 update 가 안된다는 말이 있던데, 그래서 Glitch 를 이용했다고..
내일 Glitch 도 한번 알아보자. 

*/

import { RootLayout } from "./layouts/RootLayout";
import Home from "./client/Home";
import { PostsListRoute } from "./components78/PostsList782";
import { PostRoute } from "./components78/Post782";
import { UsersListRoute } from "./components78/UsersList782";
import { UserRoute } from "./components78/User782";
import { TodoListRoute } from "./components78/TodoList781";
import { NewPostRoute } from "./components78/NewPost782";
import { EditPostRoute } from "./components78/EditPost782";
import { createBrowserRouter } from "react-router-dom";

export const router782 = createBrowserRouter([
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
