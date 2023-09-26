import { client } from '../utils/fetchClient';

export const getPostComments = (postId) => {
  return client.get(`/posts/${postId}/comments`);
};