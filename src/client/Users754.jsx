import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router";
import { getUsers } from "../lib/users";
import { Link } from "react-router-dom";

const Users754 = () => {
  const { state: loadingState } = useNavigation();
  const users = useLoaderData();

  let loadingClass = "loading";
  loadingState === "loading"
    ? (loadingClass += " active")
    : (loadingClass = "");

  return (
    <div className={`container  ${loadingClass} `}>
      <h1 className="page-title">Users</h1> {users.length}
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
                <Link className="btn" to={`/users/${user.id}`}>
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const loader = async ({ request: { signal } }) => {
  return getUsers({ signal });
};
let UsersRoute;
export default UsersRoute = {
  loader,
  element: <Users754 />,
};
