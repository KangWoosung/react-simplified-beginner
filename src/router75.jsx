/*  2023-09-16 03:56:41
이번 75강 과제는, 
1. API 구축 부터 시작하는 게 좋겠다. 
   API 구조는 단순하지만, react-router 의 설정 코드에 거의 모든 것을 의존할 것이다. 

2. API Structure... 
GET /posts - Returns all of the posts
GET /posts/:id - Returns a single post
GET /posts/:id/comments - Returns all of the comments for a single post
GET /users - Returns all of the users
GET /users/:id - Returns a single user
GET /posts?userId=<userId> - Returns all of the posts for a single user
GET /todos - Returns all of the todos
GET /todos?userId=<userId> - Returns all of the todos for a single user


도전과제... 
*. 로컬에서 빌드된 API 에서 데이터를 fetch 해와서, 리액트 뷰를 구성해준다. 
1. Create a nav bar that contains links to the following pages:
    Posts
    Users
    Todos
2. Create a Posts page that renders out all of the posts from the API in a card based grid where each card contains the title, body, and a link to view the post.
3. Create a Users page that renders out all of the users from the API in a card based grid where each card contains the user name, company name, email, website, and a link to view the user.
4. Create a Todos page that renders out all of the todos from the API in a list where each item contains the todo title and is crossed off if completed.
5. Create a Post page that renders out the post title, and body.
6. Create a User page that renders out the user name, company name, email, website, and address.
/////////////////////////////////////////////////////////////////
[API]
1. API 는 사실, router 가 전부 아닐까?
    /posts - Returns all of the posts
    /posts/:id - Returns a single post
이 두가지 부터 접근해보자. 
전체 파일만 제공하고 있으니까, 일단 json 파일 전체를 읽어온 뒤에,
json.map() 으로, posts 데이터 만 추출해서 어레이로 리턴하는 코드로 해결할 수 있을 것 같다. 


[CLIENT]
1. <Navbar />
2. <Posts />
3. <Users />
4. <Todos />
5. <Post />
6. <User />

파일 트리 구조를 잘 잡아줘야겠다. 
이번 과제를 모두 담는 디렉토리를 하나 만들자. 
그렇게 하고, router 에서 디렉토리 위치 지정만 잘 해주면 될 것 같다. 

File Tree Structure
-[project75]-
    -Navbar.jsx
    -[pages]-
        Posts.jsx
        Post.jsx
        Users.jsx
        User.jsx
        Todos.jsx
        Todo.jsx
[api]
-router75.jsx
-index.jsx
-package.json

2023-09-16 05:55:56
라우터 규칙 안에, 라우터의 결과물이 포함된다는 게.. 이게 가능한 이야기인가??
API 라우터가 생각보다 고난이도일 수 있을 것 같다. 
일차적으로, API 없이, Json 임포트로 client 단 라우팅과 출력부터 해봐야 할 것 같다. 

2023-09-16 10:04:29
문제가 굉장히 어렵다. 
API 서버 따로, 웹서버 따로 구축해야할 것 같았는데, 그건 아닌 것 같다. 포트를 따로 열어도 결국 같은 디렉토리의 같은 라우터가 사용되고 만다... 하나의 라우터에서, 이 모든 작업을 해결해야 한다. 
GPT 에게 인사이트를 좀 얻어보자.

React Router DOM 으로 라우터를 만드는 프로젝트를 완수해야 하는데,
API 서비스와, 웹 서비스가 모두 해결되어야 해.
데이터 처리를 위한 db.json 은,  로컬에 준비되어 있어. 

API 서비스를 위한 디렉토리 구조가 
/api/db.json 
/api/Api.jsx
이렇고,

웹 서비스를 위한 디렉토리 구조가
/client/Navbar.jsx
/client/Home.jsx
/client/Posts.jsx
/client/Post.jsx
/client/Users.jsx

이렇게 있다고 가정할게. 
자 이제,
export const router75 = createBrowserRouter([])
라우터를 한번 만들어줘
.... 
GPT 가 매우 기본적인 라우터 코드를 돌려주었다.
그래.. 기본부터, 차근차근 하나씩만 진행해보자..

*/

import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom";
import Api from "./api/Api";
import Home from "./client/Home";
import Posts from "./client/Posts";
import Navbar from "./client/Navbar";

const fetchUrl = "http://localhost:5173/";

export const router75 = createBrowserRouter([
  {
    path: "posts",
    element: <ApiLayoutPosts />,
    loader: ({ request: { signal } }) => {
      return fetch(`${fetchUrl}/posts`, { signal });
    },
    children: [
      {
        path: ":id",
        element: <ApiLayoutPost />,
        loader: ({ params, request: { signal } }) => {
          return fetch(`${fetchUrl}/posts/${params.id}`, { signal }).then(
            (res) => {
              console.log(res);
              if (res.status === 200) return res.json();
              throw new Error("404 Not Found");
            }
          );
        },
      },
    ],
  },
  {
    element: <NavLayout />,
    children: [
      { path: "/", element: <Home /> },
      {},
      { path: "/posts", element: <Posts /> },
    ],
  },
]);

export function ApiLayoutPosts() {
  const { state } = useNavigation();
  return (
    <>
      <Api />
      <Outlet context={"posts"} />
    </>
  );
}

export function ApiLayoutPost() {
  const { state } = useNavigation();
  return (
    <>
      <Api />
      <Outlet context={"post"} />
    </>
  );
}

export function NavLayout() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
