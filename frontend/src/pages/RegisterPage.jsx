import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import { User, Mail, Lock, Home } from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const data = await authService.register(name, email, password, address);
            setSuccess(data.message + ' Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30">
                <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">Create an Account</h1>
                <p className="text-center text-white/80 text-sm">Join StoreRater and start rating your favorite stores</p>

                {success && <p className="text-sm text-center text-green-300">{success}</p>}
                {error && <p className="text-sm text-center text-red-300">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-white">Full Name</label>
                        <div className="relative mt-1">
                            <User className="absolute left-3 top-2.5 text-yellow-300" size={18} />
                            <input
                                id="name"
                                type="text"
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-white">Email address</label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-2.5 text-yellow-300" size={18} />
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-2.5 text-yellow-300" size={18} />
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Address Input */}
                    <div>
                        <label htmlFor="address" className="text-sm font-medium text-white">Address</label>
                        <div className="relative mt-1">
                            <Home className="absolute left-3 top-2.5 text-yellow-300" size={18} />
                            <textarea
                                id="address"
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Your full address..."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-indigo-900 bg-yellow-300 rounded-md hover:bg-yellow-400 shadow-md hover:shadow-lg transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-white/80">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-yellow-300 hover:text-yellow-200 transition">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
