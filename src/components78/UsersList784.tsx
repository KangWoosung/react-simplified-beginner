/* 2023-10-06 17:36:12

*/

import React from "react";
import { z } from "zod";
import { getUsers } from "../apiHandler/users";

/************** Import Zod Schemas  */
import { UserWithGeo } from "../models/UsersJsonSchema";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

type LoaderType = {
  users: UserWithGeo[];
};

function UsersList784() {
  const { users }: LoaderType = useLoaderData() as LoaderType;
  return (
    <>
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
    </>
  );
}

const loader = async () => {
  const users = await getUsers();
  return { users };
};

export const UsersListRoute = {
  element: <UsersList784 />,
  loader,
};
