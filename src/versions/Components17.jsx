import React from "react";
import { useState } from "react";

//  SlowGetter
//  이거 중요하다...
//  외부 API 등, 느린
function slowGetter() {
  //  Really Slow Code...
  console.log("State setter activated");
  return "Kyle";
}

const Components17 = () => {
  const [name, setName] = useState(slowGetter);
  console.log("Rendered Components17", name);

  function handleClick() {
    setName("Sally");
  }
  return (
    <>
      <h1>Components17</h1>
      <h2 onClick={() => handleClick()}>Hi! {name}</h2>
    </>
  );
};

export default Components17;
