import React from "react";
import { useState, useEffect } from "react";

/* 2023-09-10 23:33:44
훅이 리턴하는 setValue 는 실제로 LocalStorage 에 저장하는 함수가 된다. 
컴포넌트에서 가져다 쓸 때에는,
const [value, setValue] = useLocalStorage("TODOS", []);
setValue([...value, { id: crypto.randomUUID(), name: name, completed: false }]);
이런 식으로 쓰면 된다.
*/

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      if (typeof initialValue === "function") return initialValue();
      else return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });
  //   console.log("value ", value);

  useEffect(() => {
    if (value === "undefined") localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
