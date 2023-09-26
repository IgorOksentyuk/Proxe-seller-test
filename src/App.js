import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UsersPage } from "./components/UsersPage";
import { UserPosts } from "./components/UserPosts";
import { UserAlbums } from "./components/UserAlbums";

export const App = () => (
  <main className="main">
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/users" element={<Navigate to="/" replace />} />
      <Route path="users/:id" element={<UserPosts />} />

      <Route path="users/:id/posts" element={<UserPosts />} />
      <Route path="users/:id/albums" element={<UserAlbums />} />
    </Routes>
  </main>
);
