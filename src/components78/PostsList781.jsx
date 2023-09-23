/*

*/

import { useLoaderData } from "react-router";
import { getPosts } from "../apiHandler/posts";
import { Link } from "react-router-dom";

function PostsList781() {
  const posts = useLoaderData();
  console.log("Posts", posts);
  return (
    <>
      <h1 className="page-title">Posts</h1>
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

const loader = async ({ request: { signal } }) => {
  return await getPosts({ signal });
};

export const PostsListRoute = {
  element: <PostsList781 />,
  loader,
};
