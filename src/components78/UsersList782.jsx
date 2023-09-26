/* 2023-09-26 10:35:16

*/

import { useLoaderData } from "react-router";
import { getUsers } from "../apiHandler/users";
import { Link } from "react-router-dom";

function UsersList782() {
  const { users } = useLoaderData();
  console.log("users", users);

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

const loader = async ({ request: { signal } }) => {
  const users = await getUsers({ signal });
  return { users };
};

export const UsersListRoute = {
  element: <UsersList782 />,
  loader,
};
