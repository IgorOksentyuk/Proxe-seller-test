import React, { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import { UsersGrid } from "./UsersGrid";
import { Loader } from "./Loader";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);

    getUsers()
      .then(setUsers)
      .catch(error => {
        setError(true);
        console.error('Error while fetching users:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const getFilteredUsers = () => {
    let filteredUsers = [...users];
    const normalizedQuery = query.toLowerCase().trim();

    return filteredUsers.filter(
      user => user.username
        .toLowerCase()
        .includes(normalizedQuery)
    );
  };

  return (
    <>
      <h1 className="title">Users Page</h1>

      <input
        type="text"
        placeholder="Search by username.."
        value={query}
        onChange={handleQueryChange}
        className="input"
      />

      <div>
        {error && (
          <p className="error">
            Something went wrong
          </p>
        )}

        {!error && (
          <UsersGrid
            users={getFilteredUsers()}
            loading={loading}
          />
        )}

        {loading && <Loader />}
      </div>
    </>
  );
};
