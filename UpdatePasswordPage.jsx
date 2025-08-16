import React, { useState } from 'react';
import userService from '../services/user.service';

const UpdatePasswordPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const data = await userService.updatePassword(oldPassword, newPassword);
            setMessage(data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update password.");
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Update Your Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Old Password</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
                </div>
                <div>
                    <label>New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
                </div>
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Update Password</button>
            </form>
        </div>
    );
};

export default UpdatePasswordPage;