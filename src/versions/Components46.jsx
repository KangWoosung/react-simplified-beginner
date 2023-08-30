import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";

/*  2023-08-30 16:13:21
useMemo 훅은, 함수연산 결과값을 Renderings 사이에서 유지하기 위해 사용한다. 
useRef 와 비슷하다고 할 수 있겠는데, useRef 가 단순 밸류를 유지한다면,
useMemo 는 함수 전체를 보관하면서, dependency 에 변화가 생기면 함수 연산을 새로고침한다. 
리소스 절약에 도움이 될 것 같지만, useMemo 자체로도 리소스를 소모한다. 
때문에 꼭 필요한 곳에서만 사용하도록 하자. 
생각보다 자주 쓰이는 훅이다. 

한줄 요약:
useRef 가 밸류를 메모해 둔다면,
useMemo 는 펑션연산을 메모해둔다. 
디펜던시가 변경되면 펑션연산을 재연산한다. 
*/

const LIST = Array(1_000_000)
  .fill()
  .map((_, i) => i + 1);

const Components46 = () => {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const inputRef = useRef();

  //   const filteredList = LIST.filter((n) => n.toString().includes(query));
  const filteredList = useMemo(() => {
    console.log("useMemo rendering...");
    return LIST.filter((n) => n.toString().includes(query));
  }, [query]);

  console.log(filteredList.length);

  useEffect(() => {
    console.log("useEffect rendering...");
    inputRef.current.focus();
  });

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#333" : "white",
        color: isDarkMode ? "white" : "#333",
      }}
    >
      <h1>Components46</h1>
      <h2>UseMemo Hook</h2>
      <label>
        Query:
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={(e) => setIsDarkMode(e.target.checked)}
        />
        Dark Mode
      </label>
    </div>
  );
};

export default Components46;
