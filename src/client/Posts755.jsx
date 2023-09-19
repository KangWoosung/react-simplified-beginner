import { useLoaderData } from "react-router";
import { getPosts } from "../apiHandler/posts";
import { Link } from "react-router-dom";

const Posts755 = () => {
  const posts = useLoaderData();

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
};

const loader = ({ request: { signal } }) => {
  return getPosts({ signal });
};
let PostsRoute = {};
export default PostsRoute = {
  loader,
  element: <Posts755 />,
};
