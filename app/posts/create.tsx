"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPost } from '@/app/api';
import { Post } from '@/app/types';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      id: Date.now(), // Use a better way to generate unique IDs if needed
      title,
      body,
      userId: 1,
      tags: [],
      reactions: 0,
    };
    try {
      await addPost(newPost);
      router.push('/'); // Redirect to home page after creating the post
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full text-black"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 mb-4 w-full text-black"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Post
        </button>
      </form>
    </div>
  );
}
