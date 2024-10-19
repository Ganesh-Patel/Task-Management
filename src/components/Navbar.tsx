"use client"; 
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { FiHome, FiUser, FiInfo, FiMenu, FiX, FiPlus, FiLogOut } from 'react-icons/fi';
import { FaTasks } from 'react-icons/fa';
import AddNewTask from '@/components/task/AddNewTask';
import Image from 'next/image'; 
import { useUserContext } from '@/app/context/UserContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const pathname = usePathname();
    const { user, isLoggedIn, logout } = useUserContext(); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const linkClasses = (path: string) =>
        pathname === path ? 'text-teal-400' : 'text-gray-300 hover:text-teal-400';

    const handleLogout = () => {
        logout(); 
        setShowProfileMenu(false); 
    };

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
                            <Link href="/" className={`${linkClasses('/')}text-sm font-medium text-gray-300 hover:text-teal-400 flex items-center`}>
                                <FiHome className="mr-2" />Home
                            </Link>
                            <Link href="/tasks" className={`${linkClasses('/tasks')}text-sm hover:text-teal-400 text-gray-300 font-medium flex items-center`}>
                                <FaTasks className="mr-2" /> <span>Tasks</span>
                            </Link>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="flex items-center text-gray-300  hover:text-teal-400"
                            >
                                <FiPlus className="mr-2" /> <span>New Task</span>
                            </button>
                            <Link href="/about" className={`${linkClasses('/')}text-sm text-gray-300 hover:text-teal-400 font-medium flex items-center`}>
                                <FiInfo className="mr-2" /> <span>About Us</span>
                            </Link>

                            {/* Profile Menu or Login */}
                            {isLoggedIn  && user ? (
                                <div className="relative">
                                    <button onClick={toggleProfileMenu} className="flex items-center text-gray-300 hover:text-teal-400 focus:outline-none">
                                        <Image
                                            src={user.profilePic || '/default-profile.png'}
                                            alt="User profile"
                                            className="w-8 h-8 rounded-full"
                                            width={32}
                                            height={32}
                                        />
                                    </button>
                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-4 w-48 bg-black border rounded shadow-lg">
                                            <Link href="/about" className="block px-3 py-2 text-gray-300 hover:text-teal-400">
                                                <FiInfo className="inline mr-2" /> <span>About Us</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block px-3 py-2 text-gray-300 hover:text-teal-400"
                                            >
                                                <FiLogOut className="inline mr-2" /> <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login" className="flex items-center text-gray-300 hover:text-teal-400">
                                    <FiUser className="mr-2" /> <span>Login</span>
                                </Link>
                            )}
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
                    <div onClick={toggleMenu}  className="md:hidden bg-black" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-teal-400">
                                <FiHome className="inline mr-2" /> <span>Home</span>
                            </Link>
                            <Link href="/tasks" className="block px-3 py-2 text-gray-300 hover:text-teal-400">
                                <FaTasks className="inline mr-2" /> <span>Tasks</span>
                            </Link>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="block px-3 py-2 text-gray-300 hover:text-teal-400"
                            >
                                <FiPlus className="inline mr-2" /> <span>New Task</span>
                            </button>
                            <Link href="/about" className="block px-3 py-2 text-gray-300 hover:text-teal-400">
                                <FiInfo className="inline mr-2" /> <span>About Us</span>
                            </Link>
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="block px-3 py-2 text-gray-300 hover:text-teal-400"
                                >
                                    <FiLogOut className="inline mr-2" /> <span>Logout</span>
                                </button>
                            ) : (
                                <Link href="/login" className="block px-3 py-2 text-gray-300 hover:text-teal-400">
                                    <FiUser className="inline mr-2" /> <span>Login</span>
                                </Link>
                            )}
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
