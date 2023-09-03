//  useLocalStorage2.1.js
import React from "react";
import { useState, useEffect, useCallback } from "react";

/*  2023-09-03 17:11:50
처음부터 다시 해보자.
1. 훅의 기본적인 외형부터 준비해놓고,

1.Create a custom useLocalStorage hook that functions identically to useState by returning an array where the first element is the value and the second element is the function to set the value. 
This hook should take two arguments. The first is a string which is the key for localStorage and the second is the initial value of the state.
*/

const useLocalStorage2 = (key, value) => {
  let localStorageData = localStorage.getItem(key);
  //  stateData 에는 key,value 쌍이 아니라, value 만 담는다.
  const [stateData, setStateData] = useState(localStorageData);

  //  dependency 가 변경되면 localStorage 를 업데이트하고,
  //  현재 state 값도 변경해준다.
  useEffect(() => {
    console.log("useEffect Rendering...");
    console.log("localStorage Data...");
    localStorageData = localStorage.getItem(key);
    setStateData(localStorageData);
  }, [key, value]);

  const setLocalStorage = useCallback(
    (key, value) => {
      console.log("setLocalStorage function running...");
      console.log("localStorage 에 저장되는 key, 밸류: ", key, value);
      localStorage.setItem(key, value);
      setStateData(value);
    },
    [key, value]
  );

  return [stateData, setLocalStorage];
};

export default useLocalStorage2;
