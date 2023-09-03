import React from "react";
import { useState, useEffect } from "react";

const useLocalStorage3 = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      if (typeof initialValue === "function") return initialValue();
      else return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });
  console.log("value ", value);

  useEffect(() => {
    if (value === "undefined") localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage3;
