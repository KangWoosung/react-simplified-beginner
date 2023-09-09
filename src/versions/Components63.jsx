import React from "react";
import { useState, useEffect, useReducer, useContext } from "react";
import Child63 from "./components/Child63";

/*  2023-09-10 01:46:10
useContext 를 배워보자. 

*/
const UserContext = React.createContext();
export { UserContext };

const Components63 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    setIsDarkMode((d) => !d);
  }

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#333" : "#FFF";
    document.body.style.color = isDarkMode ? "#FFF" : "#333";
  }, [isDarkMode]);

  return (
    <UserContext.Provider value={{ isDarkMode, toggleTheme }}>
      <h1>Components63</h1>
      <h2>UseContext</h2>
      <Child63 />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, natus
        sapiente dicta deserunt quaerat amet ab id aperiam earum. Perspiciatis
        dolores numquam id, dolorum repellendus eaque modi dicta? Dolore, vitae.
        Alias exercitationem nobis qui eum vitae. Voluptas, eius nam. Similique
        ut nisi animi. Pariatur ab, et doloremque culpa placeat ullam quos
        quasi. Blanditiis voluptas molestias inventore distinctio et nostrum
        pariatur. Tempore ab atque voluptatibus at voluptas aperiam praesentium
        consequuntur corporis placeat, commodi doloribus facere libero eaque
        temporibus fuga repudiandae ipsa natus sed, adipisci quia. Voluptas,
        delectus! Magnam nostrum harum expedita. Magni saepe voluptatum rem
        nisi, nobis qui mollitia. Est fugiat tenetur, nesciunt doloremque ab
        error? In ducimus rerum repellendus quia expedita, architecto est
        quidem, molestias natus nobis minima esse perferendis? Tempore maxime
        aliquam, dolore unde necessitatibus quod animi cupiditate aut, harum,
        aspernatur sunt officiis iure rem quae placeat tenetur accusantium
        incidunt in impedit. Voluptates odio molestias quae quidem aut totam.
      </p>
    </UserContext.Provider>
  );
};

export default Components63;
