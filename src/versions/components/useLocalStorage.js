import { useState, useEffect, useCallback } from "react";

/*  2023-09-03 15:52:53
1.Create a custom useLocalStorage hook that functions identically to useState by returning an array where the first element is the value and the second element is the function to set the value. 
This hook should take two arguments. The first is a string which is the key for localStorage and the second is the initial value of the state.

My Solution...
1. 렌더링 시점에 init value 쌍을 localStorage 에 넣어준다.
2. useEffect 로, value 쌍에 변경이 생기면 localStorage.setItem 이 가동되도록 해준다.
3. 
*/

// const [firstName, setFirstName] = useLocalStorage("FIRST_NAME", "");
const useLocalStorage = (key, value) => {
  const storedValue = localStorage.getItem(key);
  const { storageKey: storageValue } = storedValue || {};
  const [stateValue, setStateValue] = useState(storageValue);

  // [key, value] 디펜던시 변경시, 로컬스토리지의 key밸류를 얻어와서 state 에 넣어준다.
  useEffect(() => {
    console.log("useEffect rendered");
    console.log("storageVal", storedValue);
    console.log("storeVal", storedValue);
    localStorage.setItem(key, value);
    storedValue = localStorage.getItem(key);
    setStateValue(storedValue);
    // (async () => {
    //   await localStorage.setItem(key, value);
    //   const storedVal = await localStorage.getItem(key);
    //   setStoreVal(storedVal);
    // })();
  }, [key, value]);

  function setStateFunction(key, value) {
    localStorage.setItem(key, value);
    console.log("storeVal", storeVal);
    console.log(key, value);
    setStateValue(localStorage.getItem(key));
  }

  return [storeVal, setStateFunction];
};

export default useLocalStorage;
