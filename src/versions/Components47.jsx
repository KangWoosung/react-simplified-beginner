import React from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

/*  2023-08-30 16:39:59
useCallback 은 펑션 자체를 보관한다.
useMemo 또한 펑션을 보관하지만, useMemo 가 퍼포먼스를 위한 펑션보관인 반면,
useCallback 은 dependency 에 관련한다. 
useCallback 은, useEffect 의 디펜던시로 전달되는데, 
1. useCallback 의 디펜던시가 변경되면, useCallback 이 인스턴스 된 변수명이 새롭게 저장된다. 
2. useCallback 이 인스턴스된 변수명이 useEffect 에 디펭던시로 등록되면,
3. 결과적으로, useCallback 의 디펜던시가 useEffect 를 트리거하게 된다. 
*. 즉, useEffect 를 트리거 하는 펑션??

*/

const Components47 = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  //   function printName() {
  //     console.log(name);
  //   }
  const printName = useCallback(() => {
    console.log(name);
  }, [name]);

  useEffect(() => {
    console.log("useEffect - rendering...");
    printName();
  }, [printName]);

  return (
    <div>
      <h1>Components47</h1>
      <h2>UseCallback</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
    </div>
  );
};

export default Components47;
