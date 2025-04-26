import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserLogin from './Component/UserLogin';
import UserSignup from './Component/UserSignUp';
import ResetPassword from './Component/ResetPassword';
import ForgotPassword from './Component/ForgotPassword';
import ErrorPage from './Component/ErrorPage';
import Home from './pages/Home';
import PrivateRoute from './pages/PrivateRoute';
import Profile from './Component/Profile';
import Settings from './Component/Setting';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/sonique/user/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/sonique/user/login" element={<UserLogin />} />
        <Route path="/sonique/user/signup" element={<UserSignup />} />
        <Route path="/sonique/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/sonique/user/reset-password" element={<ResetPassword />} />
        <Route path="/sonique/user/setting" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
