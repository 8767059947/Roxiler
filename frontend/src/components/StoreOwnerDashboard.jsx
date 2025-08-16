import React, { useState, useEffect } from 'react';
import adminService from '../services/admin.service'; // <-- Yeh line badlein
import StarRating from './StarRating';
import { User, Star } from 'lucide-react';

const StoreOwnerDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Yahan par function call badlein
                const data = await adminService.getStoreOwnerData(); 
                setDashboardData(data.dashboard);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-20">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-300"></div>
            </div>
        );
    }

    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
                    {dashboardData.storeName}
                </h1>
                <p className="text-lg text-gray-200 mb-8">Welcome to your dashboard</p>
                
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg backdrop-blur-md mb-8">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">Overall Performance</h2>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full"><Star /></div>
                        <div>
                            <p className="text-gray-300">Average Rating</p>
                            <p className="text-3xl font-bold flex items-center gap-2">
                                {dashboardData.averageRating.toFixed(2)}
                                <span className="text-yellow-400"><Star size={28} className="fill-current" /></span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-4">Customer Ratings</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4">Customer Name</th>
                                    <th className="py-2 px-4">Customer Email</th>
                                    <th className="py-2 px-4">Rating Given</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.ratings.map((rating, index) => (
                                    <tr key={index} className="border-t border-white/20 hover:bg-white/10">
                                        <td className="py-2 px-4">{rating.user.name}</td>
                                        <td className="py-2 px-4">{rating.user.email}</td>
                                        <td className="py-2 px-4">
                                            <StarRating rating={rating.rating_value} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreOwnerDashboard;