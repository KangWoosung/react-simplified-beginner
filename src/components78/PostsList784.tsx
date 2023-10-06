/* 2023-10-06 14:37:50

*/

import React, { useState } from "react";
import { z } from "zod";
import { useLoaderData } from "react-router";
import { getPosts, getPostsByFilter } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import { Link } from "react-router-dom";
import Filter from "./component/Filter784";

/************** import Zod Schemas */
import { PostSchema, filterSchema } from "../models/PostSchema";
import { UserWithGeo } from "../models/UsersJsonSchema";
/************** End Zod Schemas */

const PostResult = z.array(PostSchema);
type PostTypeArray = z.infer<typeof PostResult>;

type FilterType = z.infer<typeof filterSchema>;

type PostsLoaderType = {
  posts: PostTypeArray;
  users: UserWithGeo[];
  filter: FilterType;
};

function PostsList784() {
  const { posts, users, filter }: PostsLoaderType =
    useLoaderData() as PostsLoaderType;

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <Filter users={users} filter={filter} />
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
    </>
  );
}

// /posts?query=undefined&userId=6
const loader = async function ({ request: { signal, url } }) {
  const urlObj = new URL(url);
  const query = urlObj.searchParams.get("query");
  const userId = urlObj.searchParams.get("userId");
  const filter = { query, userId };
  //   console.log("filter", filter);
  const posts = await getPostsByFilter(filter, { signal, url });
  const users = await getUsers({ signal });
  return { posts, users, filter };
};

export const PostsListRoute = {
  element: <PostsList784 />,
  loader,
};
