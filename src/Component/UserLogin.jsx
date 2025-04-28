import React, { useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import logo from '../../public/lightened_logo.png';
import bgimg from '../../public/bg4.jpg';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Optimize the handleSubmit function to prevent unnecessary re-renders.
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Please fill in both fields.'); // Using toast.error for error message
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/sonique/user/login', { email, password });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setEmail('');
      setPassword('');

      toast.success('Login successful!'); // Using toast.success for success message

      navigate('/');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.error); // Display the error message from the response
      } else {
        toast.error('Something went wrong. Please try again later.'); // Generic error message
      }
    }
  }, [email, password, navigate]);

  // Using useCallback here to memoize the onChange handlers to avoid unnecessary renders.
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-full md:w-1/2 to-purple-700">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgimg})`, // Correct way to set background image
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
              <label className="text-gray-400 block mb-2 text-sm">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange} // Using the memoized function
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-2 text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange} // Using the memoized function
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#405852] text-black font-semibold py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-gray-400 text-sm text-center mt-4">
              Don't have an account?{' '}
              <NavLink to="/sonique/user/signup" className="text-[#405852] hover:underline">
                Sign up
              </NavLink>
            </p>
            <p className="text-gray-400 text-sm text-center mt-2">
              <NavLink to="/sonique/user/forgot-password" className="text-[#405852] hover:underline">
                Forgot Password?
              </NavLink>
            </p>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-400">Or sign in with:</p>
            <div className="flex justify-center gap-4 mt-3">
              <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111393.png" alt="Google" className="h-6 w-6" />
              </button>
              <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all">
                <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
