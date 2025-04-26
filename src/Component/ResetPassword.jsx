import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../../public/lightened_logo.png';
import bgimg from '../../public/bg2.png';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        if (!token) {
            toast.error('Invalid or expired reset link.'); // Error toast on invalid token
        }
    }, [token]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match."); // Error toast for password mismatch
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/sonique/user/reset-password?token=${token}`, { password });
            toast.success(response.data.message); // Success toast on successful password reset
            setTimeout(() => {
                navigate('/sonique/user/login');
            }, 2000);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Something went wrong. Please try again.'); // Error toast for failed request
        }
    }, [password, confirmPassword, token, navigate]);

    return (
        <div className="min-h-screen flex">
            <div className="hidden md:flex w-full md:w-1/2 to-purple-700">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bgimg})`, // Correct way to set background image
                    }}
                    loading="lazy" // Lazy loading the background image
                ></div>
            </div>

            <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
                <div className="max-w-md w-full p-8">
                    <h1 className="text-3xl text-purple-500 font-bold text-center mb-6">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-44 h-auto mx-auto sm:w-44 md:w-48 lg:w-56"
                        />
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-400 block mb-2 text-sm">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your new password"
                                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 block mb-2 text-sm">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your new password"
                                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                            />
                        </div>
                        <button className="w-full bg-[#405852] text-black font-semibold py-2 rounded-lg">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
