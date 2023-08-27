import React from "react";
import { useState, useEffect } from "react";

/*  2023-08-27 17:42:15
useEffect 로 fetch 를 실제 활용하여, 아래와 같이 실전에 필요한 스킬들을 배운다.
1. StrictMode 에서 더블 렌더링 될 때, fetch 도 연속 실행되는데, return 으로 직전 미완료 fetch 를 취소시킨다. 실전에서도, fetch 직전에 초기화 한다는 의미에서, return 을 넣어주는 쪽이 좋을 것 같다. 
2. Error handling 을 실전에서 어떻게 배치하고 활용하는지를 배운다. 

AbortController
Error Handler
useEffect Return

할 수 있다면 axios 로 재구성해보자.
*/

const Components32 = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("UseEffect rendering...");
    setLoading(true);
    setError(undefined);
    setUsers(undefined);
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((data) => {
        // console.log(data);
        setUsers(data);
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  //   console.log(users);
  let jsx;
  if (loading) jsx = <h2>Loading..</h2>;
  else if (error != null) jsx = <h2>Error: {error}</h2>;
  else jsx = <p>{JSON.stringify(users)}</p>;

  return (
    <div>
      <h1>Components32</h1>
      {jsx}
    </div>
  );
};

export default Components32;
