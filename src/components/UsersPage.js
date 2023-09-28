import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getUsers } from "../api/users";
import { UsersGrid } from "./UsersGrid";
import { Loader } from "./Loader";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const initialQuery = new URLSearchParams(location.search)
    .get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  const initialSortOrder = new URLSearchParams(location.search)
    .get("sortBy") || "";
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  useEffect(() => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    queryParams.set("query", query);
    queryParams.set("sortBy", sortOrder);

    navigate(`?${queryParams.toString()}`);

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
  }, [sortOrder, query, navigate, location.search]);

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

  console.log(query);

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
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
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
