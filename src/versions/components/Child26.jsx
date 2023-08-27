import React from "react";
import { useState, useEffect } from "react";

export function Child26() {
  const [age, setAge] = useState(24);
  const [name, setName] = useState("미화");

  // 1.console.log the text Render each time the component re-renders
  useEffect(() => {
    // console.log("Render");
  });
  // 2.console.log the text Hi when the component mounts
  useEffect(() => {
    // console.log("Hi");
  }, []);
  // 3.console.log the text My name is {name} and I am {age} years old whenever the name or age changes
  useEffect(() => {
    // console.log(`My name is ${name} and I am ${age} years old`);
  }, [name, age]);
  // 4.Update the document.title to be equal to name whenever the name changes
  useEffect(() => {
    document.title = name;
  }, [name]);
  // 5.console.log the text Bye when the component unmounts
  useEffect(() => {
    return () => {
      console.log("Bye");
    };
  }, []);
  // 6.Create a timeout that console.logs the text My name is {name} only after there has been a 1 second delay since the last time the name was changed.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(`My name is ${name}`);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]);

  const handleNameChange = (name) => {
    setTimeout(() => {
      setName(name);
    }, 1000);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => setAge((a) => a - 1)}>-</button>
      {age}
      <button onClick={() => setAge((a) => a + 1)}>+</button>
      <br />
      <br />내 이름은 {name} 이고, 나는 {age} 살이야. 나는 너의 기억 속에서
      영원히 나이들지 않지
    </div>
  );
}

export default Child26;
