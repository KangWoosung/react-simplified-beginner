import axios from "axios";
import { useContext } from "react";
import { useLoaderData, useParams } from "react-router";
import { getPost } from "../lib/posts";
import { getCommensByPostId } from "../lib/comments";
import { getUser } from "../lib/users";
import { Link } from "react-router-dom";

const Post754 = () => {
  const { postId } = useParams();
  const { post, user, comments } = useLoaderData();

  return (
    <div className={`container `}>
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
    </div>
  );
};

//  API 에 병렬 질의를 하고 그 회답에 종속적인 다음 질의가 따라야 하는 경우,
//  await 로 체인을 만들어 주는 것이 이 상황에서는 좋지만은 않다.
//  Kyle 은, return( comments: await comments, post, user: await user )
//  이렇게 퍼포먼스 최적화 코드를 보여줬다.
async function loader({ request: { signal }, params: { postId } }) {
  const post = await getPost(postId, { signal });
  const user = await getUser(post.userId, { signal });
  const comments = await getCommensByPostId(postId, { signal });
  return { post, user, comments };
}
let PostRoute = {};
export default PostRoute = {
  loader,
  element: <Post754 />,
};
