import React from "react";
import { useState, useEffect, useReducer } from "react";

/*  2023-09-10 01:04:49
useReducer 로 재구성한 useFetch 는, 앞으로의 실전에서도 꽤나 유용하게, 자주 사용할 수 있을 정도의 훌륭한 코드가 됐다. 
이 코드를 내 힘으로 도움 없이 작성할 수 있어야 한다. 
반복 작업으로, 숙달될 수 있도록 반복연습하자. 

2023-09-10 01:15:39
CoPilot 도움으로 10분만에 다 만들었다. 

*/

const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
};

const initialState = {
  loading: false,
  isError: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_START:
      return {
        isError: false,
        isLoading: true,
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isError: false,
        isLoading: false,
      };
    case ACTIONS.FETCH_ERROR:
      return {
        isError: true,
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
      return state;
  }
}

const UseFetchRe1 = (fetchUrl, options = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_START });
    const controller = new AbortController();

    fetch(fetchUrl, { signal: controller.signal })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: { error } });
      });
    return () => {
      controller.abort();
    };
  }, [fetchUrl]);

  return state;
};

export default UseFetchRe1;
