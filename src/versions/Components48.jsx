import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import useToggle from "./components/useToggle";

const Components48 = () => {
  //   const [isDarkMode, setIsDarkMode] = useState(false);
  //   const [query, setQuery] = useState("");
  //   const [inputValue, setInputValue] = useInputValue("");
  const nameInput = useInputValue("");
  const [toggle, setToggle] = useToggle(false);
  const inputRef = useRef();

  //   console.log(nameInput.value);
  return (
    <div
      style={{
        backgroundColor: toggle ? "#333" : "white",
        color: toggle ? "white" : "#333",
      }}
    >
      <h1>Components48</h1>
      <h2>UseMemo Hook</h2>
      <h4>{nameInput.value}</h4>
      <label>
        Query:
        <input
          type="text"
          ref={inputRef}
          //   value={inputValue}
          //   onChange={setInputValue}
          {...nameInput}
        />
      </label>
      <label>
        <input type="checkbox" onClick={setToggle} />
        Dark Mode
      </label>
    </div>
  );
};
// As I understand, both of the above codes are the same,
// or at least they produce the same result.
// However, they work in slightly different ways.
// In Code 1, I received this console.log output from the custom hook's code,
// while in Code 2, the same custom hook does not produce any console.log output.
// If this is happening due to differences in how they render,
// I would like to understand why so that I can be sure and distinguish between the two methods.

function useInputValue(initValue) {
  const [value, setValue] = useState(initValue);
  const onChange = (e) => setValue(e.target.value);
  console.log("hook logging...", value);
  return { value, onChange };
}

export default Components48;
