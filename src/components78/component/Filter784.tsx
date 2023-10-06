/* 2023-10-06 15:41:54

API 함수가 getPostsByFilter 이 되어야 한다. 
그러려면, posts 의 loader 에서 질의 object 를 생성하고 있어야 한다. 
1. 현재 Filter 컴포넌트에서 filter 질의 URL 이 RRD 에서 posts 로 전달된다. 
   질의 URL 은 /posts?query=undefined&userId=6 형식 
2. posts 의 loader 와 API 질의는, 모든 요청을 getPostsByFilter 에 질의한다. 
   디폴트 질의 오브젝트를 생성해야 한다. 

*/

import React from "react";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getPostsByFilter } from "../../apiHandler/posts";

/************** */
import { PostSchema } from "../../models/PostSchema";
import { UserWithGeo } from "../../models/UsersJsonSchema";

interface loaderInterface {
  // posts: PostSchema[] | undefined;
}

export default function Filter({ users, filter }) {
  const { query, userId } = filter;
  const queryRef = useRef<HTMLFormElement | null>(null);
  const userRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (queryRef.current) queryRef.current.value = query;
    if (userRef.current) userRef.current.value = userId;
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
