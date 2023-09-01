import React from "react";
import { useState } from "react";

function useToggle(initValue) {
  const [value, setValue] = useState(initValue);
  const setToggle = () => setValue((value) => !value);
  return [value, setToggle];
}

export default useToggle;
