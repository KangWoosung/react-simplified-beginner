import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/store", element: <Store /> },
  { path: "/about", element: <About /> },
]);
