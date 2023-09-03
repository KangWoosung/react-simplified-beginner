//  useLocalStorage2.1.js
import React from "react";
import { useState, useEffect, useCallback } from "react";

/*  2023-09-03 18:35:23

*/

const useLocalStorage2 = (key, initialValue) => {
  const [stateData, setStateData] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      if (typeof initialValue === "function") {
        return initialValue();
      } else return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });
  console.log("stateData ", stateData);

  //  dependency 가 변경되면 localStorage 를 업데이트하고,
  //  현재 state 값도 변경해준다.
  useEffect(() => {
    console.log("useEffect Rendering...");
    // console.log("localStorage Data...");
    // const localValue = localStorage.getItem(key);
    if (stateData === "undefined") localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(stateData));
    // setStateData(localValue);
  }, [stateData, key]);

  //   const setLocalStorage = useCallback(
  //     (key, value) => {
  //       console.log("setLocalStorage function running...");
  //       console.log("localStorage 에 저장되는 key, 밸류: ", key, value);
  //       localStorage.setItem(key, JSON.stringify(value));
  //       setStateData(value);
  //     },
  //     [key, stateData]
  //   );

  return [stateData, setStateData];
};

export default useLocalStorage2;
