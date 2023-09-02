import React from "react";
import { useState } from "react";
import useArray from "./components/useArray";

/*  2023-09-02 00:09:38
1. Create a custom useArray hook that takes an array (or a function that returns an array) as its only argument, stores that array in state, and returns an object with the following properties:
    array - This is the array stored in state
    set - This is just the set state function returned from useState
    push - A function that takes one argument and adds that argument to the end of the array
    replace - A function that takes two arguments (the index of the element to replace, and the new element to replace the old element with) and replaces the element at the specified index with the new element
    filter - A function that takes one argument (a callback function) and filters the array just like the array.filter method
    remove - A function that takes one argument (the index of the element to remove) and removes the element at the index specified
    clear - A function that will remove all elements from the array
    reset - A function that will reset the array to its initial value

*/

const INITIAL_ARRAY = [1, 2, 3];
// const INITIAL_ARRAY = () => [1, 2, 3]

const Components51 = () => {
  const { array, set, push, replace, filter, remove, clear, reset } =
    useArray(INITIAL_ARRAY);

  return (
    <>
      <h1>Components51</h1>
      <h2>UseArray Hook</h2>
      <div>{array.join(", ")}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          alignItems: "flex-start",
          marginTop: "1rem",
        }}
      >
        <button onClick={() => set([4, 5, 6])}>Set to [4, 5, 6]</button>
        <button onClick={() => push(4)}>Push 4</button>
        <button onClick={() => replace(1, 9)}>
          Replace the second element with 9
        </button>
        <button onClick={() => filter((n) => n < 3)}>
          Keep numbers less than 3
        </button>
        <button onClick={() => remove(1)}>Remove second element</button>
        <button onClick={clear}>Clear</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
};

export default Components51;
