/* 2023-09-26 10:15:25

*/

import { useLoaderData } from "react-router";
import { getCommensByPostId } from "../apiHandler/comments";
import { getPost } from "../apiHandler/posts";
import { getUser } from "../apiHandler/users";
import { Link } from "react-router-dom";

function Post782() {
  const { post, user, comments } = useLoaderData();
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
          <div className="card" key={comment.id}>
            <div className="card-body">
              <div className="text-sm mb-1"></div>
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

//  params 와, url 은 파라메터로 받는 위치가 다르다. 주의 하자.
const loader = async ({ params, request: { signal } }) => {
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
