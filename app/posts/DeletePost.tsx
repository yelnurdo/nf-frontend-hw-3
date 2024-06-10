"use client";

import axiosInstance from '@/app/axiosInstance';

export default function DeletePost({ postId }: { postId: number }) {
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/posts/${postId}`);
      console.log('Post deleted:', response.data);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
      Delete Post
    </button>
  );
}
