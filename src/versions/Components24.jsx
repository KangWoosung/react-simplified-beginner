import { useState, useEffect } from "react";
import Child24 from "./components/Child24";

const Components24 = () => {
  const [isShown, setIsShown] = useState(true);

  const childComponent = isShown ? <Child24 /> : null;

  return (
    <div>
      <h1>Components24</h1>
      <button onClick={() => setIsShown((prevIsShown) => !prevIsShown)}>
        Show/Hide
      </button>
      {childComponent}
    </div>
  );
};

export default Components24;
