import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Agar user logged in nahi hai, to login page par bhej do
        return <Navigate to="/login" />;
    }

    // Agar user logged in hai, to us page ko dikhao jise woh access karna chahta hai
    return <Outlet />;
};

export default ProtectedRoute;