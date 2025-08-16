import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await authService.login(email, password);
            login(data.token);
            console.log("Login successful, token:", data.token);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30">
                <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">StoreRater Login</h1>
                <p className="text-center text-white/80 text-sm">Rate your favorite stores after logging in</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-white">Email address</label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-2.5 text-yellow-700" size={18} />
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

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-2.5 text-yellow-700" size={18} />
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

                    {error && <p className="text-sm text-red-300">{error}</p>}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-indigo-900 bg-yellow-300 rounded-md hover:bg-yellow-400 shadow-md hover:shadow-lg transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-center text-white/80">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-yellow-300 hover:text-yellow-200 transition">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
