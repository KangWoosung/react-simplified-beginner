import { useState } from "react";

const Child24 = () => {
  const [name, setName] = useState("미화");
  return (
    <div>
      <h4>Child24</h4>

      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>안녕 내 이름은 {name} 야.</div>
      <p>
        Child 컴포넌트가 언마운트 되면, Child 컴포넌트에서 작업된 변경사항을
        모두 잃게 되지. 중요한 문제 이니까 잘 기억해두길 바라.
      </p>
    </div>
  );
};

export default Child24;
