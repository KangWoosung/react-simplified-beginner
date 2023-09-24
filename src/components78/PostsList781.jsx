/*  2023-09-24 11:18:58

3. Add a filter to the Posts page that allows the user to filter the posts by a query.
4. Add a filter to the Posts page that allows the user to filter the posts by the user that wrote the post.

*/

import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { getPosts, getPostsByFilter } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import Filter781 from "./component/Filter781";

function PostsList781() {
  const { posts, users } = useLoaderData();
  console.log("Posts", posts);
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

/* 2023-09-24 15:45:33
filter 처리를 위해, getPosts 를 getPostsByFilter 로 변경하였다.
*/
const loader = async ({ request: { signal, url } }) => {
  const queryParams = new URL(url).searchParams;
  const query = queryParams.get("query") || "";
  const userId = queryParams.get("userId") || "";
  const filter = { query, userId };

  const posts = await getPostsByFilter(filter, { signal });
  console.log("posts", posts);
  // const posts = await getPosts({ signal });
  const users = await getUsers({ signal });

  return { posts, users, query, userId };
};

export const PostsListRoute = {
  element: <PostsList781 />,
  loader,
};
