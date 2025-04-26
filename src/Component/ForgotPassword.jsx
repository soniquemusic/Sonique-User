import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Importing the toast function

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ message: '', error: '', success: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/sonique/user/forgot-password', { email });
      setStatus({ message: response.data.message, error: '', success: true });
      setEmail('');
      
      // Displaying success toast
      toast.success(response.data.message || 'Password reset link sent!');
    } catch (err) {
      setStatus({
        message: '',
        error: err.response?.data?.error || 'Something went wrong. Please try again.',
        success: false
      });

      // Displaying error toast
      toast.error(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-purple-700 to-pink-500">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('../../../public/bg1.jpg')" }}
          loading="lazy"
        ></div>
      </div>

      <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <h1 className="text-3xl text-purple-500 font-bold text-center mb-6">
            <img
              src="../../../public/lightened_logo.png"
              alt="logo"
              className="w-44 h-auto mx-auto sm:w-44 md:w-48 lg:w-56"
            />
          </h1>
          {!status.success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 block mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                />
              </div>
              <button
                type="submit"
                className={`w-full font-semibold py-2 rounded-lg ${loading ? 'bg-gray-600 cursor-wait' : 'bg-[#405852] text-black'}`}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Reset Password'}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                Remembered your password?{' '}
                <NavLink to='/sonique/user/login' className="text-[#405852] hover:underline">
                  Login
                </NavLink>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-xl text-green-400 mb-4">Check your email!</h2>
              <p className="text-gray-400 mb-4">
                A password reset link has been sent to your email address. Please follow the instructions to reset your password.
              </p>
              <NavLink to="/sonique/user/login" className="w-full bg-[#405852] text-black font-semibold py-2 px-2 rounded-lg text-center">
                Go to Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
