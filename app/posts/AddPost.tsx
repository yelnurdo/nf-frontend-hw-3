"use client";

import { useState } from 'react';
import axiosInstance from '@/app/axiosInstance';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/posts/add', { title, body });
      console.log('Post added:', response.data);
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 mb-4 w-full"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Post
      </button>
    </form>
  );
}
