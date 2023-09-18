import React from "react";
import Navbar from "./client/Navbar";
import Error404 from "./client/Error404";
import { Outlet, createBrowserRouter, useNavigation } from "react-router-dom";
import Home from "./client/Home";
import Posts from "./client/Posts752";
import Post from "./client/Post752";
import Users from "./client/Users752";
import User from "./client/User752";
import Todos from "./client/Todos752";

/*  2023-09-17 11:11:07
라우터에서는 최소한의 데이터만 fetch 하고,
개별 컴포넌트에서 useEffect 로 fetch 하는 버전으로 리빌드 해보자.

I have implemented this job in three different ways.
1. Fetch every data in router.
2. Fetch minimum data in router and fetch the rest in components.
3. Fetch every data in components.

1 & 2 were not tough.
and 3... was impossible to make 404 things work.
*/

const fetchUrl = "http://localhost:3000/";

export const router752 = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { path: "*", element: <Error404 /> },
      { path: "/", element: <Home /> },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <Posts />,
            loader: async ({ request: { signal } }) => {
              const posts = await fetch(`${fetchUrl}posts`, { signal }).then(
                (res) => {
                  if (res.status === 200) return res.json();
                  throw new Error("404 Not Found");
                }
              );
              console.log("posts", posts);
              return { posts };
            },
          },
          {
            path: ":id",
            loader: async ({ params, request: { signal } }) => {
              const post = await fetch(`${fetchUrl}posts/${params.id}`, {
                signal,
              }).then((res) => {
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              console.log("post", post);
              return { post };
            },
            element: <Post />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <Users />,
            loader: async ({ request: { signal } }) => {
              const users = await fetch(`${fetchUrl}users`, { signal }).then(
                (res) => {
                  if (res.status === 200) return res.json();
                  throw new Error("404 Not Found");
                }
              );
              console.log("users", users);
              return { users };
            },
          },
          {
            path: ":id",
            loader: async ({ params, request: { signal } }) => {
              const user = await fetch(`${fetchUrl}users/${params.id}`, {
                signal,
              }).then((res) => {
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              console.log("user", user);
              return { user };
            },
            element: <User />,
          },
        ],
      },
      {
        path: "todos",
        children: [
          {
            index: true,
            element: <Todos />,
          },
        ],
      },
    ],
  },
]);

function NavLayout() {
  const state = useNavigation();
  return (
    <>
      <Navbar />
      {state === "loading" ? <div className="loading-spinner"></div> : ""}
      <Outlet />
    </>
  );
}
function ErrorLayout() {
  return (
    <>
      <Navbar />
      <Error404 />
    </>
  );
}
