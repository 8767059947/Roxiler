import React, { useState } from 'react';
import userService from '../services/user.service';

const UpdatePasswordPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsSubmitting(true);
        try {
            const data = await userService.updatePassword(oldPassword, newPassword);
            setMessage(data.message);
            // Clear fields on success
            setOldPassword('');
            setNewPassword('');
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update password.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg backdrop-blur-md text-white">
                <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">Update Password</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="oldPassword"className="text-sm font-medium text-gray-200">Old Password</label>
                        <input 
                            id="oldPassword"
                            type="password" 
                            value={oldPassword} 
                            onChange={(e) => setOldPassword(e.target.value)} 
                            required 
                            className="input-style w-full mt-1" 
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="text-sm font-medium text-gray-200">New Password</label>
                        <input 
                            id="newPassword"
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                            className="input-style w-full mt-1"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    {message && <p className="text-center text-green-300 font-semibold p-2 bg-green-500/20 rounded-md">{message}</p>}
                    {error && <p className="text-center text-red-300 font-semibold p-2 bg-red-500/20 rounded-md">{error}</p>}
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
            <InputStyle />
        </div>
    );
};

// Helper component for consistent input styling
const InputStyle = () => (
    <style>{`
        .input-style {
            background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem; padding: 0.75rem 1rem; color: white; transition: all 0.2s;
        }
        .input-style::placeholder { color: #d1d5db; }
        .input-style:focus {
            outline: none; box-shadow: 0 0 0 2px #facc15; border-color: transparent;
        }
    `}</style>
);


export default UpdatePasswordPage;