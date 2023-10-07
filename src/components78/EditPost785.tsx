/* 2023-10-05 19:36:54


*/
/*  modules import  */
import React, { useRef } from "react";
import { z } from "zod";
import {
  LoaderFunction,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import { Link } from "react-router-dom";
import { getPost, getPosts, updatePost } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PostForm from "./component/PostForm784";

/********************    Types Start    ************************/
/*  Zod models import  */
import { PostSchema } from "../models/PostSchema";
import { UserSchemaWithGeo } from "../models/UsersJsonSchema";

const UserResults = z.array(UserSchemaWithGeo);
type UserArrayType = z.infer<typeof UserResults>;

const PostResults = PostSchema;
type PostType = z.infer<typeof PostResults>;
/********************    Types End    ************************/

interface loaderInterface {
  users: UserArrayType;
  post: PostType;
}

function EditPost784() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  // useLocation 의 반환 타입은 unknown
  const location = useLocation();
  const state = location.state as string;
  const submittingState = state === "submitting";

  const { users, post }: loaderInterface = useLoaderData() as loaderInterface;

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        users={users}
        post={post}
        version={"785"}
        submittingState={submittingState}
      />
    </>
  );
}

const loader = async ({
  params,
  request: { signal },
}): Promise<loaderInterface | undefined> => {
  const post = await getPost(params.postId, { signal });
  const users = await getUsers({ signal });
  return { users, post };
};

// 2023-10-02 21:06:37
// 아무래도, loader 의 타입에서 문제가 시작되고 있는 것 같다.
export const EditPostRoute = {
  element: <EditPost784 />,
  loader,
};
