"use client";

import { useEffect, useState } from 'react';
import { fetchPosts } from './api';
import { Post } from './types';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const getPosts = async () => {
        try {
          const posts = await fetchPosts();
          setPosts(posts);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        }
      };

      getPosts();
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-serif font-bold mb-8 text-black">Hello, world!</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} legacyBehavior>
            <a className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row hover:bg-gray-100 transition duration-200">
              <div className="md:w-3/4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-500">Authors name in Topics Name • 7 July</span>
                </div>
                <h2 className="text-2xl font-semibold text-black">{post.title}</h2>
                <p className="mt-2 text-gray-600">{post.body}</p>
                <div className="flex space-x-2 mt-4">
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">JavaScript</span>
                  <span className="text-gray-500">12 min read • Selected for you</span>
                </div>
              </div>
              <div className="md:w-1/4 md:pl-4 flex justify-center md:justify-end mt-4 md:mt-0">
                <img src="/pexels.jpg" alt="Post Image" className="w-full h-48 object-cover rounded-lg"/>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
