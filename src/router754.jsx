import React from "react";
import Navbar from "./client/Navbar";
import {
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import Home from "./client/Home";
import Error404 from "./client/Error404";
import PostsRoute from "./client/Posts754";
import UsersRoute from "./client/Users754";
import TodosRoute from "./client/Todos754";
import PostRoute from "./client/Post754";
import UserRoute from "./client/User754";

/*  

*/

export const fetchUrl = "http://localhost:3000/";

export const router754 = createBrowserRouter([
  {
    element: <NavLayout />,
    // errorElement: <ErrorLayout />,
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
export default router754;

//  2023-09-19 00:51:10
//  정확하게는, 이것은 Nav 레이아웃이 아니라, Root 레이아웃이다.
//  따라서, 이렇게 바뀌어야 한다.
//  2023-09-19 04:09:32
//  loading-spinner 와 loading class 가 간결하게 추가되었고, 글로벌 하게 적용되었다.
export function NavLayout() {
  const { state } = useNavigation();
  const loadingState = state === "loading";
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {loadingState && <div className="loading-spinner"></div>}
      <div className={`container ${loadingState ? "loading" : ""}`}>
        <div className=""></div>
        <Outlet />
      </div>
    </>
  );
}
//  에러 표시 메세지를..
//  배포/프로덕션 페이즈에서는 http.status 까지만 보여주고,
//  개발중일 때에는 stack 에러를 노출시켜준다.
export function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>Error - Something went wrong!!</h1>
      {import.meta.env.MODE === "production" ? (
        <pre>{error.message}</pre>
      ) : (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
