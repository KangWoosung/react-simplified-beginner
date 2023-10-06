/* 2023-10-05 19:44:44

TS 버전으로 컨버전하고, Delete 버튼과 액션을 추가하자

*/
import React from "react";
import { z } from "zod";
import { useLoaderData } from "react-router";
import { getCommensByPostId } from "../apiHandler/comments";
import { getPost } from "../apiHandler/posts";
import { getUser } from "../apiHandler/users";
import { Link } from "react-router-dom";

/********************    Types Start    ************************/
/*  Zod models import  */
import { PostSchema } from "../models/PostSchema";
import { UserSchemaWithGeo } from "../models/UsersJsonSchema";
import { CommentSchema } from "../models/CommentSchema";

const UserResults = UserSchemaWithGeo;
type UserType = z.infer<typeof UserResults>;

const PostResults = PostSchema;
type PostType = z.infer<typeof PostResults>;

const CommentResults = CommentSchema;
type CommentType = z.infer<typeof CommentResults>;

interface LoaderType {
  post: PostType;
  user: UserType;
  comments: CommentType[];
}
/********************    Types End    ************************/

function Post782() {
  const { post, user, comments } = useLoaderData() as LoaderType;
  console.log("post", post);

  return (
    <>
      <h1>Hi Post</h1>
      <h1 className="page-title">
        {post.title} <small>{post.id}</small>
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/${post.id}/edit`}>
            Edit
          </Link>
          <Link className="btn btn-outline" to={`/posts/${post.id}/delete`}>
            Delete
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${user.id}`}> {user.name} </Link>
      </span>
      <div>
        <p>{post.body}</p>
      </div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div className="card" key={comment?.id}>
            <div className="card-body">
              <div className="text-sm mb-1"></div>
              <div className="text-sm mb-1">{comment?.email}</div>
              {comment?.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

//  params 와, url 은 파라메터로 받는 위치가 다르다. 주의 하자.
const loader = async ({
  params,
  request: { signal },
}): Promise<LoaderType | undefined> => {
  const postId = params.postId;
  console.log(`Loader ${postId}...`);
  const post = await getPost(postId, { signal });
  const user = await getUser(post.userId, { signal });
  const comments = await getCommensByPostId(postId, { signal });
  return { post, user, comments };
};

export const PostRoute = {
  element: <Post782 />,
  loader,
};
