"use client"; 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [accountFound, setAccountFound] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>('');
    const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [otpTimer, setOtpTimer] = useState<number>(60);
    const router = useRouter(); // Use Next.js router

    // Timer for OTP
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (otpTimer > 0 && otpSent) {
            timer = setInterval(() => {
                setOtpTimer(prevTime => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpTimer, otpSent]);

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        // Simulate password reset
        alert('Password changed successfully!');
        router.push('/login'); // Use router to navigate
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20190826/pngtree-abstract-metallic-blue-black-frame-layout-modern-tech-design-template-image_305020.jpg)' }}>
            <div className="w-full max-w-md p-8 bg-transparent bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Forgot Password</h2>

                {!accountFound && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-teal-200">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="text-white placeholder-gray-400 mt-1 block w-full px-4 py-2 border bg-transparent border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                        <button
                            onClick={() => setAccountFound(true)} // Simulate account found
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Fetch Account
                        </button>
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    </div>
                )}

                {accountFound && !otpSent && (
                    <div className="space-y-4">
                        <p className="text-center text-gray-200">Account found for {email}. Send OTP to proceed.</p>
                        <button
                            onClick={() => { setOtpSent(true); setErrorMessage(''); }} // Simulate sending OTP
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {otpSent && !isOtpValid && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-200">Enter OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Enter the OTP"
                            />
                        </div>
                        <button
                            onClick={() => { setIsOtpValid(true); setErrorMessage(''); }} // Simulate OTP validation
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Validate OTP
                        </button>
                        <p className="text-center text-red-500">Time left: {otpTimer}s</p>
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    </div>
                )}

                {isOtpValid && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Reset Password
                        </button>
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    </div>
                )}

                <div className="text-center mt-4">
                    <Link href="/login" className="text-teal-500 hover:text-teal-600">Back to login</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
