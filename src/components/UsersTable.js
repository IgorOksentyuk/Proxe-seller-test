import React from "react";
import { User } from "./User";
import { userTitles } from "../constants/userTitles";

export const UsersTable = ({ users, loading }) => {
  return (
    <table className="table">
      <thead>
        <tr className="title-container">
          {userTitles.map((title, index) => (
            <th
              key={index}
              className="title-item"
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {
          users.length > 0
          && (users.map(user => (
            <User
              key={user.id}
              user={user}
              users={users}
            />
          )))
        }

        {users.length === 0 && !loading && (
          <tr>
            <td>There are no people on the server</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
