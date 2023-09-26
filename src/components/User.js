import React from "react";
import { Link } from "react-router-dom";

export const User = ({ user }) => {
  return (
    <div className="user">
      <Link
        to={`/users/${user.id}`}
        className="user__name"
      >
        {user.name}
      </Link>

      <div className="user__username">{user.username}</div>
      <div className="user__email">{user.email}</div>
      <div className="user__city">{user.address.city}</div>
    </div>
  );
};
