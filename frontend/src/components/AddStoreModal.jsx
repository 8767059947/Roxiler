import React, { useState } from 'react';
import { X } from 'lucide-react';
import adminService from '../services/admin.service';

const AddStoreModal = ({ onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await adminService.addStore({ name, email, address });
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add store.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl shadow-2xl w-full max-w-md relative text-white border border-white/20">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white"><X size={24} /></button>
                <h2 className="text-2xl font-bold mb-6">Add New Store</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm">Store Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input-style w-full mt-1" />
                    </div>
                    <div>
                        <label className="text-sm">Store Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-style w-full mt-1" />
                    </div>
                    <div>
                        <label className="text-sm">Store Address</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required className="input-style w-full mt-1 min-h-[80px]" />
                    </div>
                    {error && <p className="text-red-300 text-sm text-center">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition disabled:bg-gray-400">
                        {isSubmitting ? 'Adding...' : 'Add Store'}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AddStoreModal;