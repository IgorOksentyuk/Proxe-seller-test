import { client } from '../utils/fetchClient';

export const getUserAlbums = (userId) => {
  return client.get(`/users/${userId}/albums`);
};

export const getAlbumPhotos = (albumId) => {
  return client.get(`/albums/${albumId}/photos`);
}