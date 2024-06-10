import axiosInstance from './axiosInstance';
import { Post } from './types';

export const fetchPosts = async (): Promise<Post[]> => {
  const localPosts = localStorage.getItem('posts');
  if (localPosts) {
    return JSON.parse(localPosts);
  }

  try {
    const response = await axiosInstance.get('/posts');
    const posts = response.data.posts;
    localStorage.setItem('posts', JSON.stringify(posts));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPost = async (id: number): Promise<Post> => {
  const posts = await fetchPosts();
  const post = posts.find((p) => p.id === id);
  if (post) {
    return post;
  } else {
    throw new Error('Post not found');
  }
};

export const addPost = async (post: Post): Promise<void> => {
  const posts = await fetchPosts();
  posts.unshift(post); // Add the new post to the beginning of the array
  localStorage.setItem('posts', JSON.stringify(posts));
};

export const updatePost = async (id: number, updatedPost: Post): Promise<void> => {
  const posts = await fetchPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    posts[index] = updatedPost;
    localStorage.setItem('posts', JSON.stringify(posts));
  }
};

export const deletePost = async (id: number): Promise<void> => {
  let posts = await fetchPosts();
  posts = posts.filter((p) => p.id !== id);
  localStorage.setItem('posts', JSON.stringify(posts));
};
