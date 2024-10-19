"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import Image from 'next/image';

function Signup() {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [profilefordb, setProfilefordb] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); 

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setProfilefordb(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (profilefordb) {
      formData.append('profilePic', profilefordb);
    }

    try {
      // API call placeholder for user registration.
      // const response = await registerUser(formData); // Uncomment when API is ready
      toast.success('Sign up successful!'); 
      router.push('/login'); 
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Sign up failed!'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190826/pngtree-abstract-metallic-blue-black-frame-layout-modern-tech-design-template-image_305020.jpg')` }}>
      <ToastContainer />
      <div className="w-full mt-16 mb-8 max-w-md p-8 bg-transparent bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 cursor-pointer relative overflow-hidden shadow-md"
              onClick={() => document.getElementById('profilePicInput')?.click()}
            >
              {profilePic ? (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={profilePic as string}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <span className="text-gray-500">Upload</span>
              )}
            </div>
            <input
              id="profilePicInput"
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-teal-200">First Name</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="Enter your first name"
              className="text-white placeholder-gray-400 mt-1 block w-full px-4 py-2 border bg-transparent border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-teal-200">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="Enter your last name"
              className="text-white placeholder-gray-400 mt-1 block w-full px-4 py-2 border bg-transparent border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-200">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="text-white placeholder-gray-400 mt-1 block w-full px-4 py-2 border bg-transparent border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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
              placeholder="Create a password"
              className="text-white placeholder-gray-400 mt-1 block w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-teal-200">
          Already have an account? <Link href="/login" className="text-teal-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
