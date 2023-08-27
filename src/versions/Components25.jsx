import React from "react";
import { useState, useEffect } from "react";

/*  2023-08-27 11:29:51
이번 강은 useEffect 를 다룬다.
useEffect 는, 컴포넌트 내에서, side effect 가 필요할 때 사용한다.
-특정 조건하에서 코드블럭이 실행되어야할 때,
-pure function 조건을 엄수한 상태에서 외부 결과물을 받아와야 할 때
등에 사용한다.

*/

const Components25 = () => {
  const [name, setName] = useState("미화");
  const [age, setAge] = useState(30);
  const [width, setWidth] = useState(window.innerWidth);

  // dependency array 로 empty array 가 주어지면, 마운트 될 때 1회만 실행된다.
  useEffect(() => {
    document.title = name + "의 추억";

    // EventListener 니까, 한번만 등록되면 된다. 즉, 마운트 시점에 1회면 된다.
    window.addEventListener("resize", () => {
      console.log("window.addEventListener");
      setWidth(window.innerWidth);
    });
  }, []);

  //  return 에 대하여...
  //  eventListener 가 계속 쌓이게 된다.
  useEffect(() => {
    const handler = () => {
      console.log("name", name);
    };

    document.addEventListener("click", handler);
    console.log("Inside effect");

    // 이 useEffect 가 실행될 때마다, 먼저 return 펑션이 호출되고, 다음으로 윗 줄 코드가 실행된다고 한다. 아직은 이해 불가...
    // 실제로 console.log 결과는, cleanup 이 먼저 나오고 그 뒤에 Inside effect 가 로그된다.
    return () => {
      document.removeEventListener("click", handler);
      console.log("Cleaned up");
    };
  }, [name]);

  return (
    <div>
      <h1>Components25</h1>

      <h2>
        My name is {name} and I am {age} years old ever in your memory
      </h2>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setAge((prevAge) => prevAge + 1)}>+</button>
      {age}
      <button onClick={() => setAge((prevAge) => prevAge - 1)}>-</button>
      <h4>{width}</h4>
    </div>
  );
};

export default Components25;
