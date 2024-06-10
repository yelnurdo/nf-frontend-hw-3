"use client";

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState(process.env.NEXT_PUBLIC_USERNAME || '');
  const [password, setPassword] = useState(process.env.NEXT_PUBLIC_PASSWORD || '');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  useEffect(() => {
    console.log('Loaded environment variables:', {
      username: process.env.NEXT_PUBLIC_USERNAME,
      password: process.env.NEXT_PUBLIC_PASSWORD,
    });
    setUsername(process.env.NEXT_PUBLIC_USERNAME || '');
    setPassword(process.env.NEXT_PUBLIC_PASSWORD || '');
  }, []);

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', { username, password });
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      console.log('Login response:', response.data);
      const token = response.data.token;
      login(token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to login:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded text-black">
        Login
      </button>
    </div>
  );
}
