import React from "react";
import Navbar from "../Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Store from "../pages/Store";

const Components71 = () => {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/about":
      component = <About />;
      break;
    case "/store":
      component = <Store />;
      break;
  }
  return (
    <>
      <Navbar />
      {component}
    </>
  );
};

export default Components71;
