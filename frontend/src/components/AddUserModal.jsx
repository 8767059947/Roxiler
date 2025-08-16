import React, { useState } from 'react';
import { X } from 'lucide-react';
import adminService from '../services/admin.service';

const AddUserModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '', role: 'NORMAL_USER' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await adminService.addUser(formData);
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add user.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl w-full max-w-md relative text-white">
                <button onClick={onClose} className="absolute top-4 right-4"><X size={24} /></button>
                <h2 className="text-2xl font-bold mb-6">Add New User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="text-sm">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-style w-full mt-1" /></div>
                    <div><label className="text-sm">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-style w-full mt-1" /></div>
                    <div><label className="text-sm">Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} required className="input-style w-full mt-1" /></div>
                    <div><label className="text-sm">Address</label><textarea name="address" value={formData.address} onChange={handleChange} required className="input-style w-full mt-1" /></div>
                    <div><label className="text-sm">Role</label><select name="role" value={formData.role} onChange={handleChange} className="input-style w-full mt-1 bg-white/10"><option className="text-black" value="NORMAL_USER">Normal User</option><option className="text-black" value="STORE_OWNER">Store Owner</option><option className="text-black" value="SYSTEM_ADMINISTRATOR">Administrator</option></select></div>
                    {error && <p className="text-red-300 text-sm text-center">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg">
                        {isSubmitting ? 'Adding...' : 'Add User'}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AddUserModal;