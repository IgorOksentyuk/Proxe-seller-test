import React from "react";

export const AlbumPhotos = ({ photos }) => {
  return (
    <ul className="photos">
      {
        photos.map(photo => (
          <li
            key={photo.id}
            className="photo"
          >
            <p className="photo__title">{photo.title}</p>
            <img
              src={photo.url}
              alt={photo.title}
              className="photo__image"
            />
          </li>
        ))
      }
    </ul>
  );
};
