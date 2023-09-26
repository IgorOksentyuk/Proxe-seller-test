import React from "react";
import { Link } from "react-router-dom";

export const User = ({ user }) => {
  return (
    <tr className="wrapper">
      <td>
        <Link
          to={`/users/${user.id}`}
          className="user__name"
        >
          {user.name}
        </Link>
      </td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
    </tr>
  );
};
