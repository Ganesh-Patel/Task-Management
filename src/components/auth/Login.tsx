"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '@/services/authService.js'; 
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/app/context/UserContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const { login } = useUserContext();
  const router =useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
        const response = await loginUser({ email, password });

        if (response.status === 200) {
            const userData = response.data; 

            // Use the login method from context
            login({
                email: userData.email,
                firstName: userData.firstname,
                lastName: userData.lastname,
                profilePic: userData.profilePic,
                role: userData.role,
            });

            setMessage({ text: 'Login successful!', type: 'success' });
            router.push('/home');
        } else {
            setMessage({ text: 'Login failed.', type: 'error' });
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            setMessage({ text: error.response?.data?.message || 'An error occurred during login.', type: 'error' });
        } else {
            setMessage({ text: 'An unexpected error occurred.', type: 'error' });
        }
    } finally {
        setLoading(false);
    }
};
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20190826/pngtree-abstract-metallic-blue-black-frame-layout-modern-tech-design-template-image_305020.jpg)' }}>
      <div className="w-full max-w-md p-8 bg-transparent bg-opacity-90 backdrop-filter backdrop-blur-md shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-200">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border bg-transparent text-white placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal-200">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border bg-transparent text-white placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-teal-200">
          Don't have an account? <Link href="/signup" className="text-teal-500 hover:underline">Sign Up</Link>
        </p>
        <p className="mt-2 text-center text-gray-600">
          <Link href="/forgotpassword" className="text-teal-500 hover:underline">Forgot Password?</Link>
        </p>

        {message && (
          <div className={`mt-4 p-2 text-center rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        <div className="mt-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} ProHomes. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
