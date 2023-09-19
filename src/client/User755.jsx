import { useLoaderData } from "react-router";
import { getUser } from "../apiHandler/users";
import { getPostsByUser } from "../apiHandler/posts";
import { getTodosByUser } from "../apiHandler/todos";
import { Link } from "react-router-dom";

const User755 = () => {
  const { user, posts, todos } = useLoaderData();

  return (
    <>
      {user?.company === "undefined" ? (
        <div>User 데이터가 없습니다.</div>
      ) : (
        <>
          <h1 className="page-title">{user.name}</h1>
          <div className="page-subtitle">{user.email}</div>
          <div>
            <b>Company:</b> {user.company.name}
          </div>
          <div>
            <b>Website:</b> {user.website}
          </div>
          <div>
            <b>Address:</b> {user.address.street}, {user.address.city},{" "}
            {user.address.zipcode}
          </div>
          <h2 className="page-title">Posts</h2>
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
          <h3 className="mt-4 mb-2">Todos</h3>
          <ul>
            {todos === undefined ? (
              <div>Todos 데이터가 없습니다.</div>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={todo.completed ? "strike-through" : ""}
                >
                  {todo.title}
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </>
  );
};

const loader = async ({ params, request: { signal } }) => {
  const user = await getUser(params.userId, { signal });
  const posts = await getPostsByUser(params.userId, { signal });
  const todos = getTodosByUser(params.userId, { signal });

  return { user, posts, todos: await todos };
};
let UserRoute = {};
export default UserRoute = {
  loader,
  element: <User755 />,
};
