import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserLogin from './Component/UserLogin';
import UserSignup from './Component/UserSignUp';
import ResetPassword from './Component/ResetPassword';
import ForgotPassword from './Component/ForgotPassword';
import UserHome from './pages/UserHome';
import ChangePassword from './Component/ChangePassword';

function App() {
  return (
    <>
      <Routes>

        <Route path="/*" element={<UserHome />} />

        <Route path="/sonique/user/login" element={<UserLogin />} />

        <Route path="/sonique/user/signup" element={<UserSignup />} />

        <Route path="/sonique/user/forgot-password" element={<ForgotPassword />} />

        <Route path="/sonique/user/reset-password" element={<ResetPassword />} />

        <Route path="/sonique/user/change-password" element={<ChangePassword />} />
        
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
