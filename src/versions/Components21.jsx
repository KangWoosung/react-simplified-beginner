import React, { useState, useEffect } from "react";

/*  2023-08-27 10:17:20
1.Create a new function component that has state for name and age
2.Create a text input that when updated will update the name state
3.Create a plus and minus button that will update the age state and display the state between the two buttons
4.Display the string My name is {name} and I am {age} years old in your JSX
5.Repeat but for a class component instead of a function component

*/

const Component21 = () => {
  const [name, setName] = useState("미화");
  const [age, setAge] = useState(30);

  return (
    <div>
      <h1>Component21</h1>
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
    </div>
  );
};

export default Component21;

export class Component21Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "미화",
      age: 30,
    };
  }

  render() {
    return (
      <div>
        <h1>Component21Class</h1>
        <h2>
          안녕? 내 이름은 {this.state.name} 이고, 나는 {this.state.age} 살이야.
          너의 기억속에서 나는 영원히 나이들지 않지.
        </h2>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <button
          onClick={() =>
            this.setState((currentState) => {
              return { ...currentState, age: currentState.age + 1 };
            })
          }
        >
          +
        </button>
        {this.state.age}
        <button onClick={() => this.setState({ age: this.state.age - 1 })}>
          -
        </button>
      </div>
    );
  }
}
