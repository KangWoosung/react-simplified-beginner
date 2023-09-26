/* 2023-09-26 10:01:16


*/

import { useLoaderData } from "react-router";
import { getPosts } from "../apiHandler/posts";
import Filter781 from "./component/Filter781";
import { Link } from "react-router-dom";
import { getUsers } from "../apiHandler/users";

function PostsList782() {
  const { posts, users } = useLoaderData();
  console.log("posts:", posts);

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
      <Filter781 users={users} />
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

const loader = async ({ request: { signal, url } }) => {
  const posts = await getPosts({ signal });
  const users = await getUsers({ signal });
  return { posts, users };
};

export const PostsListRoute = {
  element: <PostsList782 />,
  loader,
};
