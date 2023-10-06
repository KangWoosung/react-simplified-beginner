/* 2023-10-05 20:14:20

Delete 를 담당하고, Delete 후에는, Post List 로 이동하자
View 페이지에서 펑션으로 처리해도 되지만,
Delete 페이지를 만들어서, Delete 를 담당하게 하자

2023-10-05 20:42:47
완료.. 
*/

import React from "react";
import { z } from "zod";
import { useLoaderData, useNavigate } from "react-router";
import { deletePost, getPost } from "../apiHandler/posts";

/************** import Zod Schemas */
import { PostSchema } from "../models/PostSchema";

const PostResults = PostSchema;
type PostType = z.infer<typeof PostResults>;

interface LoaderType {
  post: PostType;
}

function DeletePost784() {
  const { post }: LoaderType = useLoaderData() as LoaderType;
  const navigate = useNavigate();

  const deleteAction = async () => {
    if (post) {
      await deletePost(post.id);
      navigate("/posts");
    }
  };

  return (
    <>
      <h1>Hi DeletePost784</h1>
      {post && (
        <>
          <h3>Are you sure you want to delete this article {post.id} ?</h3>
          <h4>{post.title}</h4>
          <pre>{post.body}</pre>
        </>
      )}

      <button className="btn btn-outline" onClick={deleteAction}>
        Delete
      </button>
    </>
  );
}

// LoaderType
const loader = async ({
  params,
  request: { signal },
}): Promise<LoaderType | undefined> => {
  const postId = parseInt(params.postId);
  const post = await getPost(postId, { signal });
  return { post };
};

export const DeletePostRoute = {
  element: <DeletePost784 />,
  loader,
};
