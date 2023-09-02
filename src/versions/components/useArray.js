import React from "react";
import { useState, useEffect, useCallback } from "react";

/*
const { array, set, push, replace, filter, remove, clear, reset } =
    useArray(INITIAL_ARRAY)
한개씩, 펑션을 리턴해주는 코드를 만들어보자.

2023-09-02 02:29:28
If we don't wrap them in a useCallback and someone uses our functions inside something like a useEffect then the useEffect would rerun on every rerender since our functions would be recreated brand new on each render. 
*/
const useArray = (initArray) => {
  const [stateArray, setState] = useState(initArray);

  // 1. set([4, 5, 6])
  const set = useCallback((newArray) => {
    setState(newArray);
  }, []);

  // 2. push(4)
  // setArray(a => [...a, element])
  const push = useCallback((newItem) => {
    setState((a) => [...a, newItem]);
  }, []);

  // 3. replace(1, 9)
  const replace = useCallback((index, newItem) => {
    setState((a) => {
      return [...a.slice(0, index), newItem, ...a.slice(index + 1)];
    });
    // const copy = [...stateArray];
    // copy[index] = newItem;
    // setState(copy);
  }, []);

  // 4. filter(n => n < 3)
  const filter = useCallback((callback) => {
    setState((a) => {
      return a.filter(callback);
    });
  }, []);

  // 5. remove(1) - Remove second element
  const remove = useCallback((index) => {
    // setState(stateArray.filter((_, i) => i !== index));
    setState((a) => a?.filter((element, i) => i !== index));
  }, []);

  // 6. clear
  const clear = useCallback(() => {
    setState([]);
  }, []);

  // 7. reset
  const reset = useCallback(() => {
    setState(initArray);
  }, []);

  return {
    array: stateArray,
    set,
    push,
    replace,
    filter,
    remove,
    clear,
    reset,
  };
};

export default useArray;
