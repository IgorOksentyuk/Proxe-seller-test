import React, { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import { UsersGrid } from "./UsersGrid";
import { Loader } from "./Loader";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setLoading(true);

    getUsers()
      .then((data => {
        const sortedUsers = [...data].sort((a, b) => {
          if (sortOrder === "asc") {
            return a.username.localeCompare(b.username);
          } else {
            return b.username.localeCompare(a.username);
          }
        });

        setUsers(sortedUsers);
      }))
      .catch(error => {
        setError(true);
        console.error('Error while fetching users:', error);
      })
      .finally(() => setLoading(false));
  }, [sortOrder]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
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

      <div className="wrapper">
        <input
          type="text"
          placeholder="Search by username.."
          value={query}
          onChange={handleQueryChange}
          className="input"
        />

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="select"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

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
