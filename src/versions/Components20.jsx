import { useState, useEffect } from "react";

/*  Array functions Exercises
Functionality To Create
1.Create state that stores an array with the initial value of ["A", "B", "C"]
2.Add the ability to remove the first element from the array
3.Add the ability to remove a specific letter from the array
4.Add the ability to add a new element to the start of the array
5.Add the ability to add a new element to the end of the array
6.Add the ability to clear the array
7.Add the ability to reset the array to the initial value

These are optional challenges that are more difficult and will really test your skills.

8.Add the ability to update all A elements in the array to H
9.Add an input that is connected to state and a button that will add the input value to the start of the array
10.Add the ability to add a new element at any index in the array

2023-08-27 09:29:28
정답을 모두 맞췄다고 좋아했는데, 모두 빵점짜리 답안이었다... 코파일럿의 치트키를 썼는데도, 가장 중요한 컨셉을 놓친 채 답안을 제출했다. 
setState() 는 절대로 prevState 를 빠뜨리고 사용하면 안된다. 
이 습관이 가장 중요하다. 
*/

const initArray = ["A", "B", "C", "D", "E"];

const Components20 = () => {
  const [stateArray, setStateArray] = useState(initArray);
  const [newElement, setNewElement] = useState("");

  let newArray = [];
  // 2.Add the ability to remove the first element from the array
  const removeFirstElem = () => {
    // newArray = stateArray.slice(1);
    // console.log(newArray);
    // setStateArray(newArray);
    setStateArray((prevArray) => prevArray.slice(1));
  };
  // 3.Add the ability to remove a specific letter from the array
  const removeFilteredElem = () => {
    setStateArray((prevArray) => prevArray.filter((item) => item !== "C"));
  };
  // 4.Add the ability to add a new element to the start of the array
  const addAsFirstElem = () => {
    setStateArray(["Z", ...stateArray]);
  };
  // 5.Add the ability to add a new element to the end of the array
  const addAslastElem = () => {
    setStateArray((prevArray) => [...prevArray, "Y"]);
  };
  // 6.Add the ability to clear the array
  const clearTheArray = () => {
    setStateArray([]);
  };
  // 7.Add the ability to reset the array to the initial value
  const initTheArray = () => {
    setStateArray(initArray);
  };
  // 8.Add the ability to update all A elements in the array to H
  const switchArrayElem = () => {
    setStateArray((prevArray) =>
      prevArray.map((item) => (item === "A" ? "H" : item))
    );
  };
  // 9.Add an input that is connected to state and a button that will add the input value to the start of the array
  const addInputValue = () => {
    setStateArray((prevArray) => [newElement, ...prevArray]);
  };
  // 10.Add the ability to add a new element at any index in the array
  const addToAnyIndex = (index) => {
    setStateArray((prevArray) => {
      const newArray = [...prevArray];
      //   newArray[index] = "X";
      return [...newArray.slice(0, index), "X", ...newArray.slice(index)];
    });
  };

  return (
    <div>
      <h3>Components20</h3>
      <button onClick={removeFirstElem}>Remove the first Element</button>
      <button onClick={removeFilteredElem}>Remove the "C" Element</button>
      <button onClick={addAsFirstElem}>Add "Z" Element as First</button>
      <button onClick={addAslastElem}>Add "Y" Element as Last</button>
      <button onClick={clearTheArray}>Clear the Array</button>
      <button onClick={initTheArray}>Set the Array to initial</button>
      <button onClick={switchArrayElem}>Update elem to Other</button>
      <br />
      <input
        type="text"
        name="inputValue"
        id="inputValue"
        value={newElement}
        onChange={(e) => {
          setNewElement(e.target.value);
        }}
      />
      <button onClick={addInputValue}>Add an Input Value</button>
      <br />
      <br />
      {stateArray.map((item, index) => {
        return (
          <h4 key={index} onClick={() => addToAnyIndex(index)}>
            {item}
          </h4>
        );
      })}
    </div>
  );
};

export default Components20;
