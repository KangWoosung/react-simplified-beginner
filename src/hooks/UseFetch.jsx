import React from "react";
import { useState, useEffect, useReducer } from "react";

/*  2023-09-10 00:26:23
reducer 를 다시 공부하는데... 이렇게 까맣게 잊어버릴 수도 있나... 
49강 에서 작업했던 useFetch 훅을 useReducer 버전으로 재구성 한다. 
처음 한번은 따라해보고, from scratch 에서 다시한번 작성해보자. 
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

const reducer = (state, { type, payload }) => {
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
};

const useFetch = (fetchUrl, OPTIONS = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // fetch 시작 전에 관련 state 를 모두 리셋, 초기화 시킨다.
    dispatch({ type: ACTIONS.FETCH_START });
    console.log("useFetch useEffect rendering...", fetchUrl);
    const controller = new AbortController();

    fetch(fetchUrl, { signal: controller.signal })
      .then((res) => {
        console.log("fetch 가 되었는가??", res.status);
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })
      //  useReducer 버전으로 코드 수정..
      .then((data) => {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
      })
      .catch((e) => {
        // 컨트롤러 어보팅 상황이라면 에러를 변경할 필요는 없다.
        if (e.name === "AbortError") return;
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: { error: e } });
      });

    return () => {
      controller.abort();
    };
  }, [fetchUrl]);

  return state;
};

export default useFetch;
