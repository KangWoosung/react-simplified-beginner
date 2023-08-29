import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

/* 2023-08-29 14:00:50
1.Fetch all users from the API (https://jsonplaceholder.typicode.com/users) in your App.jsx file using useEffect.
2.Render an h1 that says User List and below that a ul containing a list of all users. This is a perfect use case for fragments since we don't want to wrap it in an extra div.
3.The users in the list should be in their own component and that component should take a name prop and return the name inside an li element.

axios 로 진행시켜보자. 
*/

const Components37 = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const fetchURL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    console.log("UseEffect rendering...");
    const controller = new AbortController();
    setLoading(true);
    axios
      .get(fetchURL, { signal: controller.signal })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  let jsx;
  if (loading === true) {
    jsx = <h2>Loading..</h2>;
  } else {
    jsx = (
      <ul id="userDataUL">
        {userData.map((eachData) => {
          return <UserList key={crypto.randomUUID()} name={eachData.name} />;
        })}
      </ul>
    );
  }

  return (
    <>
      <h1>Components37</h1>
      <h2>User List</h2>
      {jsx}
    </>
  );
};

export default Components37;

function UserList(prop) {
  return <li>{prop.name}</li>;
}
