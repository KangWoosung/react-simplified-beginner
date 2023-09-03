//  Katrina version
/*  2023-09-03 22:21:33
같은 훅이지만, 3항 연산자로 코드를 더 간결하게 만들었다.
Katrina 는 예쁠 것 같다.
*/
import { useState, useEffect } from "react";

const useLocalStorage = (key, init) => {
  const [value, setValue] = useState(() => {
    const initial_value = typeof init === "function" ? init() : init;
    const stored_value = localStorage.getItem(key);
    return JSON.parse(stored_value) || initial_value;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
