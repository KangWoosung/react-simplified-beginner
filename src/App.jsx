import { useState } from "react";
import Components11 from "./versions/Components11";
import Components12 from "./versions/Components12";
import Components13 from "./versions/Components13";
import Components17 from "./versions/Components17";
import Components20 from "./versions/Components20";
import Components21 from "./versions/Components21";
import { Component21Class } from "./versions/Components21";
import Components24 from "./versions/Components24";
import Components25 from "./versions/Components25";
import Components26 from "./versions/Components26";
import Components32 from "./versions/Components32";
import Components37 from "./versions/Components37";
import Components41 from "./versions/Components41";
import Components44 from "./versions/Components44";
import Components46 from "./versions/Components46";
import Components47 from "./versions/Components47";
import Components48 from "./versions/Components48";
import Components49 from "./versions/Components49";
import Components51 from "./versions/Components51";
import Components53 from "./versions/Components53";
import Components55 from "./versions/Components55";
import Components57 from "./versions/Components57";
import Components58 from "./versions/Components58";
import Components581 from "./versions/Components58.1";
import Components582 from "./versions/Components58.2";
import Components60 from "./versions/Components60";
import Components61 from "./versions/Components61";
import SignInForm from "./versions/SignInForm";
// import SignInFormWithZod from "./versions/SignInFormWithZod";
import Components62 from "./versions/Components62";
import Components63 from "./versions/Components63";
// import Components681 from "./versions/Components681";
import Components682 from "./versions/Components682";
import Components683 from "./versions/Components683";
import Components684 from "./versions/Components684";
import Components70 from "./versions/Components70";
import Components71 from "./versions/Components71";

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
      <Components71 />
    </>
  );
}

export default App;
