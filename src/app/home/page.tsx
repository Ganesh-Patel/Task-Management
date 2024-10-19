"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import AddNewTask from '@/components/task/AddNewTask'; 

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div
            className="min-h-screen bg-gray-100 flex flex-col"
            style={{
                backgroundImage: 'url(https://e1.pxfuel.com/desktop-wallpaper/963/596/desktop-wallpaper-backgrounds-dokter-3-background-dokter.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-700 mb-4">Welcome to Task Manager</h2>
                    <p className="text-gray-600 mb-8">Organize your tasks efficiently and boost your productivity.</p>
                    <div className="space-x-4">
                        <button
                            onClick={() => setIsModalOpen(true)} // Open modal on button click
                            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-200"
                        >
                            Create Task
                        </button>
                        <Link href="/tasks" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200">
                            View Tasks
                        </Link>
                    </div>
                </div>
            </div>

            {/* Task Modal */}
            <AddNewTask
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Home;
