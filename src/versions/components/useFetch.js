import React from "react";
import { useState, useEffect, useRef } from "react";

/*  2023-09-01 23:43:40
초기 로드에서 data 로드에 실패하고 있다.
return() 클리너 펑션을 지우면 오류가 사라진다.
controller 를 useEffect 안으로 넣어주니까 오류가 사라졌다.
AbortController 코드는, useEffect() 내부에 넣어주자. 그렇게 외워두자.
*/

const useFetch = (fetchUrl, OPTIONS = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(false);
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
      .then((data) => {
        setData(data);
        console.log("데이터 확보");
      })
      .catch((err) => {
        // 컨트롤러 어보팅 상황이라면 에러를 변경할 필요는 없다.
        if (err.name === "AbortError") {
          return;
        }
        setError(true);
      })
      .finally(() => {
        // 컨트롤러 어보팅 상황이라면 로딩 스태이터스를 변경할 필요는 없다.
        if (controller.signal.aborted) return;
        setLoading(false);
      });

    return () => {
      console.log("useFetch useEffect cleanup...");
      controller.abort();
    };
  }, [fetchUrl]);
  //   console.log("Loading...", loading);
  return { data, isLoading: loading, isError: error };
};

export default useFetch;
