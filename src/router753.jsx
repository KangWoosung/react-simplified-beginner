import React from "react";
import Navbar from "./client/Navbar";
import { Outlet, createBrowserRouter, useNavigation } from "react-router-dom";
import Home from "./client/Home";
import Posts from "./client/Posts753";
import Post from "./client/Post753";
import Error404 from "./client/Error404";
import Users from "./client/Users753";
import User from "./client/User753";
import Todos from "./client/Todos753";

/*  2023-09-18 08:03:41
모든 데이터가 Components 에서 fetch 되도록 리빌드 해보자.
404 같은 복잡한 문제가 발생할 수 있겠지만,
... 일단 한번 해보자. 리액트 라우터에 대해 좀 더 이해할 수 있게 될 것이다. 

2023-09-18 10:54:26
useNavigate 를 사용해서, navigate(/404) 이렇게 간단히 리다이렉션 처리를 해줄 수 있었다.
useEffect 에서 fetch 해주는 코드의 에러 처리에, navigate(/404) 를 넣어주면 될 것이다.
그런데 문제는, StrictMode 의 더블 리렌더링과 그 과정에서 에러가 발생하면서 catch(err) 를 이벤트로 navigate(/404) 걸어줄 수 없다는 것인데...
이 문제를 우회할 방법을 찾자. 일이 점점 더 복잡해져가는 느낌인데, 
뭐 상관없다. 고생할 수록 잔근육이 더 붙어줄 것이다. 

2023-09-18 14:28:24
최종 컴포넌트에서 fetch 에러를 포착해서 404 리다이랙션을 해주고 싶었으나,
에러가 트리거되는 예상 밖의 경우들을 만났고, 결국 최종 컴포넌트에서 404 리다이렉션 처리는
현실적인 대안이 되지 못한다는 결론을 내렸다. 
원론적으로도, 그런 방식은 원칙에 맞지 않다.
404 등, 요청된 URL 의 무결성은, 라우터에서 검증이 완료되어야 하는 게 맞다. 
라우터에서 URL 의 무결성을 확인하기 위해서는, 라우터가 fetch 검증 코드를 포함하고 있어야만 한다. 

*/

export const fetchUrl = "http://localhost:3000/";

export const router753 = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { path: "*", element: <Error404 /> },
      { path: "404", element: <Error404 /> },
      { path: "/", element: <Home /> },
      {
        path: "posts",
        children: [
          { index: true, element: <Posts /> },
          { path: ":id", element: <Post /> },
        ],
      },
      {
        path: "users",
        children: [
          { index: true, element: <Users /> },
          { path: ":id", element: <User /> },
        ],
      },
      { path: "todos", element: <Todos /> },
    ],
  },
]);
export default router753;

export function NavLayout() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export function ErrorLayout() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
