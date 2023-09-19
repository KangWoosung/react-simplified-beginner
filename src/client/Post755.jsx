import { useLoaderData } from "react-router";
import { getPost } from "../apiHandler/posts";
import { Link } from "react-router-dom";
import { getUser } from "../apiHandler/users";
import { getCommensByPostId } from "../apiHandler/comments";

const Post755 = () => {
  const { post, user, comments } = useLoaderData();

  return (
    <>
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
};

//  여기서 params 파라메터가 어떻게 밸류를 갖게 되는지 헤깔리는데,
//  여기 이 코드는 함수정의 코드블럭이고, 지금 이 상태에서는 밸류를 갖고있지 않다.
//  이 코드가 리턴되면, loader 처리시에 해당 REST 밸류가 할당되는 것이다.
const loader = async ({ params, request: { signal } }) => {
  const post = await getPost(params.postId, { signal });
  const user = await getUser(post.userId, { signal });
  const comments = getCommensByPostId(params.postId, { signal });
  return { post, user, comments: await comments };
};
let PostRoute = {};
export default PostRoute = {
  loader,
  element: <Post755 />,
};
