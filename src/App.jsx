import { useState } from "react";
import Components11 from "./versions/Components11";
import Components12 from "./versions/Components12";
import Components13 from "./versions/Components13";
import Components17 from "./versions/Components17";
import Components20 from "./versions/Components20";

const test = "";
//  make div with class large and id with largeId
//  Add a label with a for prop set to inputId and any test in it
function App() {
  const [count, setCount] = useState(0);
  const myLabel = <label htmlFor="inputId">Text</label>;

  return (
    <>
      <h1>Hello World. Hello React Again!!! 3</h1>
      <div className="large" id="largeId">
        {myLabel}
        <input id="inputId" type="number" defaultValue={3} />
      </div>
      {/* <Components11 /> */}
      <Components20 />
    </>
  );
}

export default App;
