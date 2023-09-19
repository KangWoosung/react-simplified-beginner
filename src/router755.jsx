/* 2023-09-19 09:14:31
75강 router 최종버전...

meta data 를 react-router-dom 에서 추가할 수 있는지 잠시 궁금했는데,
어차피 client 사이드에서의 렌더링이라.. 의미가 없겠다.
meta tag 문제는, Next.js 로 넘어가서 시작하기로 하자. 


*/

import {
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import Home from "./client/Home";
import Navbar from "./client/Navbar";
import PostsRoute from "./client/Posts755";
import UsersRoute from "./client/Users755";
import TodosRoute from "./client/Todos755";
import PostRoute from "./client/Post755";
import UserRoute from "./client/User755";

export const router755 = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home /> },
          {
            path: "posts",
            children: [
              { index: true, ...PostsRoute },
              { path: ":postId", ...PostRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...UsersRoute },
              { path: ":userId", ...UserRoute },
            ],
          },
          {
            path: "todos",
            children: [{ index: true, ...TodosRoute }],
          },
        ],
      },
    ],
  },
]);

function RootLayout() {
  const { state } = useNavigation();
  const loadingState = state === "loading";
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {loadingState && <div className="loading-spinner"></div>}
      <div className={`container ${loadingState} ? "loading" : "" `}>
        <Outlet />
      </div>
    </>
  );
}

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>Something went wrong!!</h1>
      {import.meta.env.MODE === "production" ? (
        <>
          <h1>{error.status}</h1>
          <h3>{error.message}</h3>
        </>
      ) : (
        <>
          <h1>{error.status}</h1>
          <h3>{error.message}</h3>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
