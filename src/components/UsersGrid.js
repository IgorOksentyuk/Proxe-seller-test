import React from "react";
import { User } from "./User";
import { userTitles } from "../constants/userTitles";

export const UsersGrid = ({ users, loading }) => {
  return (
    <section className="users-wrapper">
      <div className="title-container">
        {userTitles.map((title, index) => (
          <div
            key={index}
            className="title-item"
          >
            {title}
          </div>
        ))}
      </div>


      <div className="users-container">
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
          <div>
            <div>There are no people on the server</div>
          </div>
        )}
      </div>
    </section>
  );
};
