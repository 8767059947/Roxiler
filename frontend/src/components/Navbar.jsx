import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 backdrop-blur-lg shadow-lg border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand Name */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="text-2xl font-extrabold text-yellow-300 drop-shadow-md hover:text-yellow-200 transition"
                        >
                            StoreRater
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-white/90 font-medium hidden sm:block">
                                    Welcome, <span className="text-yellow-300">{user.email}</span>

                                </span>
                                 <Link to="/update-password" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
        Update Password
    </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 text-sm font-semibold text-indigo-900 bg-yellow-300 rounded-md hover:bg-yellow-400 shadow-md hover:shadow-lg transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white/90 hover:text-yellow-300 transition font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-3 py-2 text-sm font-semibold text-indigo-900 bg-yellow-300 rounded-md hover:bg-yellow-400 shadow-md hover:shadow-lg transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
