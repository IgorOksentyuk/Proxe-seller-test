import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserAlbums } from "../api/albums";
import { getUserById } from "../api/users";
import { Navigation } from "./Navigation";

export const UserAlbums = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (id) {
      getUserAlbums(id)
        .then(data => {
          setAlbums(data);
        })
        .catch(error => {
          console.error('Error while fetching albums:', error);
        });
    }

    getUserById(id)
      .then(setUser)
      .catch(error => {
        console.error('Error while fetching user:', error);
      });

  }, [id]);

  return (
    <>
      <Navigation />
      <h2>{user.name} albums:</h2>

      <ul>
        {
          albums.map(album => (
            <li key={album.id}>{album.title}</li>
          ))
        }
      </ul>
    </>
  );
};
