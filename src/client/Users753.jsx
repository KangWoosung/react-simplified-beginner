import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";

const fetchUrl = "http://127.0.0.1:3000/";

export default function Users() {
  const { state: loadingState } = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${fetchUrl}users`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        // console.log("users", data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, []);

  let loadingClass = "loading";
  loadingState === "loading"
    ? (loadingClass += " active")
    : (loadingClass = "");

  return (
    <div className={`container  ${loadingClass} `}>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {typeof users === "undefined" ? (
          <div>Users 데이터가 없습니다.</div>
        ) : (
          users.map((user) => (
            <div className="card" key={user.id}>
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.company.name}</div>
                <div>https://{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <a className="btn" href={`/users/${user.id}`}>
                  View
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
