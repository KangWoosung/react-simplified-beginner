import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
// import { router74 } from "./router74";
// import { router75 } from "./router75";
// import { router751 } from "./router751";
// import { router752 } from "./router752";
// import { router753 } from "./router753";
// import { router754 } from "./router754";
// import { router755 } from "./router755";
import { router77 } from "./router77";
import Navbar from "./Navbar";
// import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router77} />
  </React.StrictMode>
);
