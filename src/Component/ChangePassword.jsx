import React, { useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import logo from '../../public/lightened_logo.png';
import bgimg from '../../public/b2.jpg';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields.');
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const formData = {
                currentPassword,
                newPassword
            };

            const response = await axios.post(
                'https://sonique-server.onrender.com/sonique/user/change-password',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            toast.success('Password changed successfully!');
            navigate('/');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(error.response.data.error || 'Failed to change password');
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        }
    }, [currentPassword, newPassword, confirmPassword, navigate]);

    const handleCurrentPasswordChange = useCallback((e) => setCurrentPassword(e.target.value), []);
    const handleNewPasswordChange = useCallback((e) => setNewPassword(e.target.value), []);
    const handleConfirmPasswordChange = useCallback((e) => setConfirmPassword(e.target.value), []);

    return (
        <div className="min-h-screen flex">
            <div className="hidden md:flex w-full md:w-1/2 to-purple-700">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bgimg})`,
                    }}
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
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-400 block mb-2 text-sm">Current Password</label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 block mb-2 text-sm">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 block mb-2 text-sm">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#405852] text-black font-semibold py-2 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Change Password'}
                        </button>
                        <p className="text-gray-400 text-sm text-center mt-4">
                            <NavLink to="/" className="text-[#405852] hover:underline">
                                Back to Home
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;