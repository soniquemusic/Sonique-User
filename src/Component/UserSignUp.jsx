import React, { useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../../public/lightened_logo.png';
import bgimg from '../../public/bg3.jpg';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    date: '',
    mobileNumber: '',
  });

  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  // Debounced version of handleChange to reduce the number of renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    // Password validation
    if (!validatePassword(formData.password)) {
      toast.error('Strong password required. Example: Password123!');
      setLoading(false);
      return;
    }

    // Mobile number validation
    if (!validateMobileNumber(formData.mobileNumber)) {
      toast.error('Mobile number must be exactly 10 digits long.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://sonique-server.onrender.com/sonique/user/register', formData);
      if (response.status === 201) {
        toast.success('User registered successfully!');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          gender: '',
          date: '',
          mobileNumber: '',
        });
        navigate('/sonique/user/login');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || 'An error occurred');
      } else {
        toast.error('Internal server error');
      }
    } finally {
      setLoading(false); // Hide loading spinner after request is finished
    }
  };

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
              <label className="text-gray-400 block mb-2 text-sm">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-2 text-sm">Date of Birth</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-2 text-sm">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 block mb-2 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-2 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-2 text-sm">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600"
                autoComplete="tel"
              />
            </div>
            <button
              className={`w-full bg-[#405852] text-black font-semibold py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p className="text-gray-400 text-sm text-center mt-4">
              Already have an account?{' '}
              <NavLink to="/sonique/user/login" className="text-[#405852] hover:underline">
                Log in
              </NavLink>
            </p>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-400">Or sign up with:</p>
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

export default UserSignup;
