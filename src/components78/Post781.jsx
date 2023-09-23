/*

*/

import { useLoaderData } from "react-router";
import { getPost } from "../apiHandler/posts";
import { getCommensByPostId } from "../apiHandler/comments";
import { getUser } from "../apiHandler/users";
import { Link } from "react-router-dom";

function Post781() {
  const { post, user, comments } = useLoaderData();
  return (
    <>
      <h1>Hi Post</h1>
      <h1 className="page-title">
        {post.title} <small>{post.id}</small>
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

const loader = async ({ params, request: { signal } }) => {
  const post = await getPost(params.postId, { signal });
  const user = await getUser(post.userId, { signal });
  const comments = await getCommensByPostId(post.id, { signal });
  return { post, user, comments };
};

export const PostRoute = {
  element: <Post781 />,
  loader,
};
