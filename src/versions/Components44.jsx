import React from "react";
import { useState, useEffect, useRef } from "react";

/*  2023-08-30 12:46:09
useRef 훅의 두가지 사용 용법에 대한 연습을 충분히 하자.
1.useRef 는 모든 re-rendering 에도 consistency 한 고유값을 유지한다.
  Re-rendering 을 발생시키지 않는 밸류를 저장할 때 사용되는데, '그렇다면 글로벌 변수와 같이 작동하는 것 아니냐' 고 반문할 수 있겠지만, useRef 에 할당된 밸류는, 펑션 컴포넌트 스코프 내에서만 유효하고 접근 가능하다.
  앞으로 되도록, 적극적으로 활용해보자. 중요한 훅인 것 같다. 
2.useRef 는 Html DOM 요소에 대하여 anchor 기능을 한다.
  useRef 를 anchor 로 사용하려면, useEffect 내부에서 접근해야 한다. 
  왜냐하면, DOM 이 생성된 후에 접근해야 하므로...
*/

const Components44 = () => {
  const [name, setName] = useState("");
  const kyleRef = useRef("Kyle");
  const inputRef = useRef();

  useEffect(() => {
    console.log(kyleRef);
    console.log("useEffect rendering...");
    console.log(inputRef.current.value);
    inputRef.current.focus();
  });

  return (
    <div>
      <h1>Components43</h1>
      <label>
        Name: {name}
        <br />
        <input
          type="text"
          name="name"
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={() => (kyleRef.current = Math.random())}>
        Change Ref Value
      </button>
      <button
        onClick={() => {
          console.log(kyleRef);
          console.log(inputRef);
        }}
      >
        Print Ref Value
      </button>
    </div>
  );
};

export default Components44;
