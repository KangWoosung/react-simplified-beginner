import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
// import { router74 } from "./router74";
// import { router75 } from "./router75";
// import { router751 } from "./router751";
import { router752 } from "./router752";
import Navbar from "./Navbar";
// import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router752} />
  </React.StrictMode>
);
