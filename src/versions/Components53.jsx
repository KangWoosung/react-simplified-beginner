import React from "react";
import useLocalStorage from "./components/useLocalStorage";

/*  2023-09-02 03:01:40
- localStorage I/O 를 담당하는 훅을 예상한다. 
- 문제지를 받으면, 답안을 제출할 때까지, CoPilot 을 끄고 작업하자. 

문제지를 받기 전에 예상해보는 구조...
const [localStorage, setLocalStorage] = useLocalStorage()
localStorage.Item 을 불러오는 게 아니라, localStorage 전체를 통째로 불러오는 것 같다... 혹은, 파라메터를 받아서 해당 파라메터 스토리지만 불러오는 것일 수도 있다. 

1.Create a custom useLocalStorage hook that functions identically to useState by returning an array where the first element is the value and the second element is the function to set the value. 
This hook should take two arguments. The first is a string which is the key for localStorage and the second is the initial value of the state.
2.Whenever the state changes it should be synced with localStorage so that if you were to refresh your page nothing would change as all values are pulled from localStorage on initial load and stored in localStorage when changed.
3.Ensure that the useLocalStorage hook works just like useState in that you can pass it a value or function as the initial value.
4.Use JSON to serialize and deserialize the values stored in localStorage so that it will work with any value (such as arrays or objects).
*/

//  storage = { key: key, value: value } -- value 는 object 일 수 있다.
function useLocalStorage(storage, options) {
  const [localStore, setLocalStorage] = useState();

  function setToStorage() {
    localStorage.setItem(storage.key, JSON.stringify(storage.value));
    setLocalStorage(storage);
  }
  return { localStore, setToStorage };
}

const Components53 = () => {
  const [name, setName] = useLocalStorage("name", "");
  const [age, setAge] = useLocalStorage("age", 0, Number);
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "isDarkMode",
    false,
    Boolean
  );

  return (
    <div>
      <h1>Components53</h1>
      <h2>Use LocalStorage Hook</h2>
    </div>
  );
};

export default Components53;
