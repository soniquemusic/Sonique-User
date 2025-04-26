import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected route component
const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        return <Navigate to="/sonique/user/login" />;
    }

    return element;
};

export default PrivateRoute;
