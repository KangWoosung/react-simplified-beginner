import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom";
import Home from "./client/Home";
import Posts from "./client/Posts";
import Navbar from "./client/Navbar";
import Post from "./client/Post";
import Users from "./client/Users";
import User from "./client/User";
import Todos from "./client/Todos";
import Error404 from "./client/Error404";

/*  2023-09-16 10:22:07
GPT가 보여준 매우 기본적인 Jsx 라우터 코드.. 

export const router75 = createBrowserRouter([
  <Route path="/" element={<Home />} />,
  <Route path="/posts" element={<Posts />} />,
  <Route path="/posts/:id" element={<Post />} />,
  <Route path="/users" element={<Users />} />,
  <Route path="/api/*" element={<Api />} />,
]);

그리고, 오브젝트형 라우터 코드...


For mates who encounters CORS problem when using useEffect and fetch data from localhost API after mount. 
I found this article in StackOverflow that might help.
https://stackoverflow.com/questions/10883211/why-does-my-http-localhost-cors-origin-not-work

Chrome does not support localhost for CORS requests (a bug opened in 2010, marked WontFix in 2014).
Use the address 127.0.0.1 or localho.st instead which points to the localhost as well.

*/

const fetchUrl = "http://localhost:3000/";
let postId = 0;
let userId = 0;
let todoId = 0;

export const router751 = createBrowserRouter([
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
            loader: ({ request: { signal } }) => {
              return fetch(`${fetchUrl}posts`, { signal });
            },
          },
          {
            path: ":id",
            loader: async ({ params, request: { signal } }) => {
              postId = params.id;
              const post = await fetch(`${fetchUrl}posts/${params.id}`, {
                signal,
              }).then((res) => {
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              const comments = await fetch(
                `${fetchUrl}posts/${params.id}/comments`,
                {
                  signal,
                }
              ).then((res) => {
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              const user = await fetch(`${fetchUrl}users/${post.userId}`, {
                signal,
              }).then((res) => {
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              const users = await fetch(`${fetchUrl}users`, {
                signal,
              }).then((res) => {
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });

              //   console.log("post", post);
              //   console.log("comments", comments);
              //   console.log("user", user);
              return { post, comments, user, users };
            },
            element: <Post postId={postId} />,
          },
          {},
        ],
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <Users />,
            loader: ({ request: { signal } }) => {
              return fetch(`${fetchUrl}users`, { signal });
            },
          },
          {
            path: ":id",
            element: <User />,
            loader: async ({ params, request: { signal } }) => {
              userId = params.id;
              const user = await fetch(`${fetchUrl}users/${params.id}`, {
                signal,
              }).then((res) => {
                console.log("res");
                console.log(res);
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              const posts = await fetch(
                `${fetchUrl}posts?userId=${params.id}`,
                {
                  signal,
                }
              ).then((res) => {
                console.log("res");
                console.log(res);
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              const todos = await fetch(
                `${fetchUrl}todos?userId=${params.id}`,
                {
                  signal,
                }
              ).then((res) => {
                console.log("res");
                console.log(res);
                if (res.status === 200) return res.json();
                throw new Error("404 Not Found");
              });
              return { user, posts, todos };
            },
          },
        ],
      },
      {
        path: "todos",
        children: [
          {
            index: true,
            element: <Todos />,
            loader: async ({ request: { signal } }) => {
              const todos = await fetch(`${fetchUrl}todos`, { signal })
                .then((res) => {
                  console.log("res");
                  console.log(res);
                  if (res.status === 200) return res.json();
                  throw new Error("404 Not Found");
                })
                .catch((err) => {
                  throw new Error("Fetch Error");
                });
              return { todos };
            },
          },
        ],
      },
    ],
  },
  {},
  {},
]);

export function NavLayout() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar />
      {state === "loading" ? <div className="loading-spinner"></div> : ""}
      <Outlet />
    </>
  );
}

export function ErrorLayout() {
  return (
    <>
      <Navbar />
      <Error404 />
    </>
  );
}
