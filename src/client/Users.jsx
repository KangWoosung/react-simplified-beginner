import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

export default function Users() {
  const { state: loadingState } = useNavigation();
  const users = useLoaderData();

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
