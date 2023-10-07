/* 2023-10-07 16:58:16

After watching Kyle's implementation of 79.
Trying to seperate PostForm to independent component.


*/

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { FormDataSchema } from "../schemas/formDataSchema";
import { PostSchema } from "../models/PostSchema";

import { useLoaderData, useLocation, useNavigate } from "react-router";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";
import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { addPost, getPosts } from "../apiHandler/posts";
import PostForm from "./component/PostForm784";
import { UserSchemaWithGeo } from "../models/UsersJsonSchema";

const UserResults = z.array(UserSchemaWithGeo);
type UserArrayType = z.infer<typeof UserResults>;

const PostResults = PostSchema;
type PostType = z.infer<typeof PostResults>;

interface loaderInterface {
  users: UserArrayType;
  post: PostType;
  maxId: number;
}

type Inputs = z.infer<typeof PostSchema>;

export default function NewPost784() {
  const data = useLoaderData() as loaderInterface;
  const { users, maxId }: loaderInterface = data;
  const location = useLocation();
  const state = location.state as string;
  const submittingState = state === "submitting";
  let nextId = maxId + 1;

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm
        users={users}
        version={"785"}
        nextId={nextId}
        submittingState={submittingState}
      />
    </>
  );
}

const loader = async ({ request: { signal } }) => {
  const users = await getUsers({ signal });
  const posts = await getPosts({ signal });
  const maxId = Math.max(...posts.map((post) => post.id));
  return { users, maxId };
};

export const NewPostRoute = {
  element: <NewPost784 />,
  loader,
};
