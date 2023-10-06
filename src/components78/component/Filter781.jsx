/* 2023-09-24 11:13:58

3.Add a filter to the Posts page that allows the user to filter the posts by a query.

2023-09-24 15:18:54
77강에서 처리했던 Filter 구현은..
Form 이 submit 되면, loader 펑션에서 fetch URL 을 수정하는 방식으로 구현되었던 것 같다. 
loader 펑션을 만들기 시작하면 좀 더 가닥이 잡히겠다.

1. Filter Form 이 submit 되면, 현재 URL 이 /posts?query=미&userId= 로 바뀐다. 
2. loader 에서 이 url 을 받아서, fetch url 을 생성해줘야 한다. 
3. 생성된 fetch url 에서 data 를 받아와, loader data 로 받아주면 끗

*/

import { useEffect, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getPostsByFilter } from "../../apiHandler/posts";

export default function Filter({ users, filter }) {
  // const [query, setQuery] = useState();
  // const [userId, setUserId] = useState();
  const { query, userId } = filter;
  const queryRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
    userRef.current.value = userId;
  }, [query, userId]);

  return (
    <>
      <Form method="get" action="/posts" className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userRef}>
              <option value="">Any</option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
    </>
  );
}

// 2023-09-24 16:07:53
// 이곳에서 loader 를 새로 만들어주려고 했는데,
// getPosts 펑션에 처음부터 query 유무를 검사해주면 되었다. getPosts 를 수정함으로 갈음한다.

// 1. Filter Form 이 submit 되면, 현재 URL 이 /posts?query=미&userId= 로 바뀐다.
// 2. loader 에서 이 url 을 받아서, fetch url 을 생성해줘야 한다.
// 3. 생성된 fetch url 에서 data 를 받아와, loader data 로 받아주면 끗
//  http://localhost:5173/posts?query=미화&userId=
//  API address:
//  GET /posts?q=<query>&userId=<userId>
// const loader = async ({ request: { signal, url } }) => {
//   const queryParams = new URL(url).searchParams;
//   const query = queryParams.get("query") || "";
//   const userId = queryParams.get("userId") || "";
//   const filter = { query, userId };

//   const data = await getPostsByFilter(filter, option);
//   return { data };
// };

// export const FilteredRoute = {
//   loader,
// };
