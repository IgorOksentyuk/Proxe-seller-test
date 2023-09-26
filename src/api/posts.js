import { client } from '../utils/fetchClient';

export const getPosts = () => {
  return client.get(`/posts`);
}

export const getUserPosts = (userId) => {
  return client.get(`/users/${userId}/posts`);
};