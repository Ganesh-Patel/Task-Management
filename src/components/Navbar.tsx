"use client"; 
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { FiHome, FiUser, FiInfo, FiMenu, FiX, FiPlus } from 'react-icons/fi';
import { FaTasks } from 'react-icons/fa';
import AddNewTask from '@/components/task/AddNewTask';
import { useUserContext } from '@/app/context/UserContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const pathname = usePathname();
    const { user,isLoggedIn } = useUserContext();
    console.log(user)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const linkClasses = (path: string) =>
        pathname === path ? 'text-teal-400' : 'text-gray-300 hover:text-teal-400';

    return (
        <>
            <nav className="bg-black shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/home" className="flex-shrink-0">
                                <h1 className='text-2xl py-1 font-bold text-teal-400'>Task Manager</h1>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link href="/" className={`${linkClasses('/')} text-sm font-medium flex items-center`}>
                                <FiHome className="mr-2" /> Home
                            </Link>
                            <Link href="/tasks" className={`${linkClasses('/tasks')} text-sm font-medium flex items-center`}>
                                <FaTasks className="mr-2" /> Tasks
                            </Link>
                            <button 
                                onClick={() => setIsModalOpen(true)} // Open modal on button click
                                className="flex items-center text-sm font-medium text-gray-300 hover:text-teal-400"
                            >
                                <FiPlus className="mr-2" /> New Task
                            </button>
                            <Link href="/about" className={`${linkClasses('/about')} text-sm font-medium flex items-center`}>
                                <FiInfo className="mr-2" /> About Us
                            </Link>
                            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-teal-400 flex items-center">
                                <FiUser className="mr-2" /> Login
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="bg-gray-800 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? (
                                    <FiX className="h-6 w-6" />
                                ) : (
                                    <FiMenu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-black" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                <FiHome className="inline mr-2" /> Home
                            </Link>
                            <Link href="/tasks" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                <FaTasks className="inline mr-2" /> Tasks
                            </Link>
                            <button 
                                onClick={() => setIsModalOpen(true)} // Open modal on button click
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400"
                            >
                                <FiPlus className="inline mr-2" /> New Task
                            </button>
                            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                <FiInfo className="inline mr-2" /> About Us
                            </Link>
                            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400">
                                <FiUser className="inline mr-2" /> Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Task Modal */}
            <AddNewTask
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Navbar;
