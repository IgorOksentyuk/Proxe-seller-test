import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumPhotos, getUserAlbums } from "../api/albums";
import { getUserById } from "../api/users";
import { Navigation } from "./Navigation";
import { AlbumPhotos } from "./AlbumPhotos";

export const UserAlbums = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const [photosMap, setPhotosMap] = useState({});
  const [showPhotos, setShowPhotos] = useState({});

  useEffect(() => {
    if (id) {
      getUserAlbums(id)
        .then(setAlbums)
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

  const togglePhotos = (albumId) => {
    setShowPhotos(prevShowPhotos => ({
      ...prevShowPhotos,
      [albumId]: !prevShowPhotos[albumId],
    }));

    if (!photosMap[albumId]) {
      getAlbumPhotos(albumId)
        .then(data => {
          setPhotosMap(prevPhotosMap => ({
            ...prevPhotosMap,
            [albumId]: data,
          }));
        })
        .catch(error => {
          console.error('Error while fetching comments:', error);
        });
    }
  }

  return (
    <div className="album">
      <Navigation />

      <h2 className="album__title">{user.name} albums:</h2>

      <ul className="album__list">
        {
          albums.map(album => (
            <li
              key={album.id}
              className="album__item"
            >

              <p className="album__number">{`Album № ${album.id}`}</p>
              <p className="album__subtitle">{album.title}</p>

              <button
                className="post__button"
                onClick={() => togglePhotos(album.id)}
              >
                {showPhotos[album.id] ? "Hide photos" : "Show photos"}
              </button>

              {showPhotos[album.id] && (
                <AlbumPhotos photos={photosMap[album.id] || []} />
              )}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
