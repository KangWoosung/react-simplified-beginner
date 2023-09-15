import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Team from "./pages/Team";
import TeamMembers from "./pages/TeamMembers";
import Navbar from "./Navbar";
import TeamNav from "./TeamNav";
import NewTeamMember from "./pages/NewTeamMember";

/*  2023-09-16 02:05:28
React-Router 의  Loader 를 익혀본다. 
Loader 는, React-Router 의 특별한 기능인데,
fetch 프로세스를 전반적으로 관리하고 각 시점에서의 상태를 활용할 수 있다.

*/
const fetchUrl = "https://jsonplaceholder.typicode.com/users";

export const router74 = createBrowserRouter([
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
        loader: ({ request: { signal } }) => {
          return fetch(fetchUrl, { signal });
        },
        children: [
          { index: true, element: <Team /> },
          {
            path: ":memberId",
            loader: ({ params, request: { signal } }) => {
              return fetch(`${fetchUrl}/${params.memberId}`, { signal }).then(
                (res) => {
                  if (res.status === 200) return res.json();
                  throw new Error("404 Not Found");
                }
              );
            },
            element: <TeamMembers />,
          },
          { path: "new", element: <NewTeamMember /> },
        ],
      },
    ],
  },
]);

export function NavLayout() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar />
      {state === "loading" ? <h1>Loading...</h1> : <Outlet />}
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
