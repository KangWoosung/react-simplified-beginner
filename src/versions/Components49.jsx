import React from "react";
import { useState, useEffect, useRef } from "react";
import useFetch from "./components/useFetch";

/*  2023-09-01 20:37:35
useFetch Custom Hook 을 실습한다고 한다. 
강의를 보기 전에, 내가 먼저 만들어보자. 그게 더 공부도 되고 재미도 있겠다. 
....가, 아니라, 시험문제였네. 그런데 미리 컨닝을 해버렸네.. 
코파일럿을 끄고 진행해야 하나... 
암튼, 다시..
1. Create a custom useFetch hook that returns an object with the following data:
    isLoading - Will be true while the fetch request is loading
    isError - Will be true if the fetch request failed
    data - Will contain the data from the fetch request
2. Add the ability to pass down an options object to the useFetch hook that will set the options for the fetch request.
    If you are using the local files instead of the API you will not see any difference in the output when passing these custom options just because of the limitations of not actually calling an API on a server.
3. Add in the proper cleanup functionality for aborting a request if a new request is triggered before the old one finishes.
*/

const URLS = {
  USERS: "https://jsonplaceholder.typicode.com/users",
  POSTS: "https://jsonplaceholder.typicode.com/posts",
  COMMENTS: "https://jsonplaceholder.typicode.com/comments",
};

// BONUS:
const OPTIONS = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};
// const OPTIONS = {};

const Components49 = () => {
  const [url, setUrl] = useState(URLS.USERS);
  const { data, isLoading, isError } = useFetch(url, OPTIONS);
  console.log("isLoading...", isLoading);

  return (
    <>
      <div>
        <label>
          <input
            type="radio"
            checked={url === URLS.USERS}
            onChange={() => setUrl(URLS.USERS)}
          />
          Users
        </label>
        <label>
          <input
            type="radio"
            checked={url === URLS.POSTS}
            onChange={() => setUrl(URLS.POSTS)}
          />
          Posts
        </label>
        <label>
          <input
            type="radio"
            checked={url === URLS.COMMENTS}
            onChange={() => setUrl(URLS.COMMENTS)}
          />
          Comments
        </label>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
};

export default Components49;
