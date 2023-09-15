import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Team from "./pages/Team";
import TeamMembers from "./pages/TeamMembers";
import Navbar from "./Navbar";
import TeamNav from "./TeamNav";
import NewTeamMember from "./pages/NewTeamMember";

/*  2023-09-16 01:09:13
Dynamic Routes 를 공부해보자. 

301,302 redirect 처리를 여기서는 <Navigate to="/page" /> 이렇게 한다.
개별 컴포넌트에서의 301, 302 처리는,
const navigate = useNavigate();
navigate("/");
이렇게 사용한다. 
*/

const navigate = useNavigate();
navigate("/");

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    // errorElement: <h1>404 Not Found</h1>,
    children: [
      { path: "*", element: <Navigate to="/" /> },
      { path: "/", element: <Home /> },
      { path: "/store", element: <Store /> },
      { path: "/about", element: <About /> },
      {
        path: "/team",
        element: <TeamNavLayout />,
        children: [
          { index: true, element: <Team /> },
          // RES 로 넘겨주는 정보는 memberId 하나 뿐이다. 모든 RES 가 그렇듯이..
          // TeamMembers.jsx 에서 memberId 에 근거하여, Json 에서 필요정보를 찾아내야 한다.
          { path: ":memberId", element: <TeamMembers /> },
          { path: "new", element: <NewTeamMember /> },
        ],
      },
    ],
  },
]);

// export const router = createBrowserRouter([
//   {
//     element: <NavLayout />,
//     errorElement: <h1>404 Not Found</h1>,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/store", element: <Store /> },
//       { path: "/about", element: <About /> },
//       {
//         path: "/team",
//         element: <TeamNavLayout />,
//         children: [
//           { index: true, element: <Team /> },
//           { path: "joe", element: <TeamMembers name={"Joe"} /> },
//           { path: "sally", element: <TeamMembers name={"Sally"} /> },
//         ],
//       },
//     ],
//   },
// ]);

export function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export function TeamNavLayout() {
  return (
    <>
      <TeamNav />
      <Outlet context={"Hi from Outlet"} />
    </>
  );
}
