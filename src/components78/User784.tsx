/* 2023-10-06 17:43:30


*/

import React, { useState } from "react";
import { z } from "zod";
import { useLoaderData } from "react-router";
import { getUser } from "../apiHandler/users";
import { getPostsByUser } from "../apiHandler/posts";
import { getTodosByUser, putTodos } from "../apiHandler/todos";
import UserTodos from "./component/UserTodos";

/// user, posts, todos
/************** Import Zod Schemas  */
import { UserWithGeo } from "../models/UsersJsonSchema";
import { PostSchema } from "../models/PostSchema";
import { TodoSchema } from "../models/TodoSchema";
import { Link } from "react-router-dom";

type PostType = z.infer<typeof PostSchema>;
type TodoType = z.infer<typeof TodoSchema>;
type TodoTypeArray = TodoType[];

type LoaderType = {
  user: UserWithGeo;
  posts: PostType[];
  todos: TodoType[];
};

function User784() {
  const { user, posts, todos }: LoaderType = useLoaderData() as LoaderType;

  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street}, {user.address.city},{" "}
        {user.address.zipcode}
      </div>
      <h2 className="page-title">Posts</h2>
      <div className="card-grid">
        {typeof posts === "undefined" ? (
          <div>Posts 데이터가 없습니다.</div>
        ) : (
          posts.map((post) => (
            <div className="card" key={post.id}>
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/posts/${post.id}`}>
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <UserTodos todos={todos} />
    </>
  );
}

const loader = async ({ request: { url, signal } }) => {
  const userId = parseInt(url.split("/").pop());
  const user = await getUser(userId, { signal });
  const posts = await getPostsByUser(userId, { signal });
  const todos = await getTodosByUser(userId, { signal });
  return { user, posts, todos };
};

export const UserRoute = {
  element: <User784 />,
  loader,
};
