"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchPost, updatePost, deletePost } from '@/app/api';
import { Post } from '@/app/types';

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const post = await fetchPost(Number(id));
        setPost(post);
        setTitle(post.title);
        setBody(post.body);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleUpdate = async () => {
    if (post) {
      const updatedPost = { ...post, title, body };
      try {
        await updatePost(post.id, updatedPost);
        setPost(updatedPost);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update post:', error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(Number(id));
      router.push('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="text-gray-500 hover:underline mb-4">← Back</button>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <img src="/user.jpg" alt="Author" className="w-10 h-10 rounded-full" />
          <span className="text-gray-500">Authors name • 7 July • 12 min read • Member-only</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-black">{post.title}</h1>
        <img src="/pexels.jpg" alt="Post Image" className="w-full h-64 object-cover rounded-lg mb-4"/>
        <p className="text-gray-600 mb-4">{post.body}</p>
        <button onClick={() => setIsEditing(!isEditing)} className="bg-yellow-500 text-white p-2 rounded mb-4">
          {isEditing ? 'Cancel Edit' : 'Edit Post'}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded ml-2 mb-4">
          Delete Post
        </button>
        {isEditing && (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 mb-4 w-full text-black"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border p-2 mb-4 w-full text-black"
            ></textarea>
            <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">
              Update Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
