import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import StoreOwnerDashboard from '../components/StoreOwnerDashboard';
import UserDashboard from '../components/UserDashboard';

const HomePage = () => {
    const { user } = useContext(AuthContext);

    // Agar user logged in nahi hai (ya state abhi load ho raha hai), to kuch na dikhayein
    if (!user) {
        return <div>Loading user data...</div>;
    }

    // Role ke aadhar par component render karein
    const renderDashboard = () => {
        switch (user.role) {
            case 'SYSTEM_ADMINISTRATOR':
                return <AdminDashboard />;
            case 'STORE_OWNER':
                return <StoreOwnerDashboard />;
            case 'NORMAL_USER':
                return <UserDashboard />;
            default:
                return <div>Invalid user role.</div>;
        }
    };

    return (
        <div>
            {renderDashboard()}
        </div>
    );
};

export default HomePage;