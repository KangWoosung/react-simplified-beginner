//  useLocalStorage2.1.js
import React from "react";
import { useState, useEffect, useCallback } from "react";

/*  2023-09-03 18:35:23

1. 로컬스토리지에서 key 에 대한 데이터를 쿼리해보고,
2. 없다면, initialValue 로 useState 에 전달할 밸류를 구성해주는 작업을 한다.
2-1. initialValue 가 함수라면, 함수 실행결과를 useState 에 넣어주도록 하고,
2-2. 아니면, initialValue 를 useState 에 전달해준다.
3. useState 가 리턴해주는 상태와 함수 value, setValue 가 확보된다.
4. const [firstName, setFirstName] = useLocalStorage2("FIRST_NAME", "미화") 일 때,
4-1. 상태 firstName 에는, 스트링 "미화" 가..
4-2. 상태함수 setFirstName() 에는, 펑션 () => setValue("미화") 가 할당되는데, 
4-3. setValue("미화") 는, 상태 value 를 업데이트 시키고,
4-4. 상태 [value] 가 업데이트되면, useEffect() 가 트리거 되면서,
4-5. localStorage.setItem() 이 가동된다.
4-6. 여기서 이해하기 어려운 점은, key 의 라이프 사이클인데,
4-7. 훅 자체가 어떤 구조체라서, 훅이 선언되는 시점의 state 는 훅이 사용되는 동안 계속 유지가 되는 것 같다.
5. 결론적으로, useEffect 의 효과가, setValue() 를 훅 함수로 탈바꿈 시키는 원리로 짜인 코드이다.
*/

const useLocalStorage2 = (key, initialValue) => {
  const [stateData, setStateData] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      if (typeof initialValue === "function") {
        return initialValue();
      } else return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });
  console.log("stateData ", stateData);

  //  dependency 가 변경되면 localStorage 를 업데이트하고,
  //  현재 state 값도 변경해준다.
  useEffect(() => {
    console.log("useEffect Rendering...");
    // console.log("localStorage Data...");
    // const localValue = localStorage.getItem(key);
    if (stateData === "undefined") localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(stateData));
    // setStateData(localValue);
  }, [stateData, key]);

  return [stateData, setStateData];
};

export default useLocalStorage2;
