import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";

/*  2023-09-18 10:04:36
user 스테이트의 상태값이 불규칙하다.
어떨 때엔 fetch 된 데이터가 잘 들어가는데, 또 어떤 때는 null 이 들어간다.


*/

const fetchUrl = "http://127.0.0.1:3000/";

const initialUserState = {
  id: 0,
  name: "",
  email: "",
  website: "",
  address: {
    street: "",
    city: "",
    suite: "",
    zipcode: "",
  },
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

export default function User() {
  const { state: loadingState } = useNavigation();
  const { id } = useParams();
  const [user, setUser] = useState(initialUserState);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  console.log("Component userId", id);

  useEffect(() => {
    const controller = new AbortController();
    console.log(`${fetchUrl}users/${id}`);

    //  삽질한 async await 체인을 GPT 가 제대로 잡아주었다. 밥이라도 사줘야 하는데..
    async function fetchAPIs() {
      try {
        const userRes = await fetch(`${fetchUrl}users/${id}`, {
          signal: controller.signal,
        });
        const userData = await userRes.json();
        console.log("user data", userData);

        const postsRes = await fetch(`${fetchUrl}posts?userId=${id}`, {
          signal: controller.signal,
        });
        const postsData = await postsRes.json();

        const todosRes = await fetch(`${fetchUrl}todos?userId=${id}`, {
          signal: controller.signal,
        });
        const todosData = await todosRes.json();

        setUser(userData);
        setPosts(postsData);
        setTodos(todosData);
        console.log("user state", user);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAPIs();
    return () => {
      controller.abort();
    };
  }, []);

  let loadingClass = "loading";
  loadingState === "loading"
    ? (loadingClass += " active")
    : (loadingClass = "");

  console.log("typeof user?.company", typeof user?.company);
  console.log("user", user);

  return (
    <div className={`container  ${loadingClass} `}>
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
        </>
      )}
      {/* <h1 className="page-title">{user.name}</h1>
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
      </div> */}
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
                <a className="btn" href={`/posts/${post.id}`}>
                  View
                </a>
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
    </div>
  );
}
