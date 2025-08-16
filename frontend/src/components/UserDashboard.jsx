import React, { useState, useEffect, useCallback } from 'react';
import storeService from '../services/store.service';
import { Search } from 'lucide-react';
import StoreCard from './StoreCard';
import RatingModal from './RatingModal';

const UserDashboard = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);

    // fetchStores function ko alag se define karna acchi practice hai
    const fetchStores = useCallback(() => {
        setLoading(true);
        storeService.getAllStores(searchTerm)
            .then(data => setStores(data.stores))
            .catch(err => setError('Failed to fetch stores.'))
            .finally(() => setLoading(false));
    }, [searchTerm]); // Yeh tab naya function banayega jab searchTerm badlega

    // YEH EK HI USEEFFECT BLOCK RAKHNA HAI
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStores();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [fetchStores]); // Ab yeh fetchStores par depend karega

    const handleOpenModal = (store) => {
        setSelectedStore(store);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStore(null);
    };

    const handleRatingSuccess = () => {
        fetchStores(); // Rating successful hone par stores ki list refresh karein
    };

    // Loading aur Error wala JSX aapka perfect hai
    if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-300"></div>
          </div>
        );
    }
    
    if (error) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <p className="text-lg font-semibold text-red-300">{error}</p>
          </div>
        );
    }

    // Return wala JSX bhi aapka perfect hai
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        Available Stores
                    </h1>
                    <div className="relative group">
                        <Search
                            className="absolute left-3 top-2.5 text-yellow-300 group-hover:text-yellow-200 transition"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search by name or address..."
                            className="pl-11 pr-4 py-2 w-full md:w-80 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.length > 0 ? (
                        stores.map((store) => (
                            <StoreCard key={store.id} store={store} onRateClick={() => handleOpenModal(store)} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-200 italic">
                            No stores found.
                        </p>
                    )}
                </div>
            </div>
            {isModalOpen && selectedStore && (
                <RatingModal
                    store={selectedStore}
                    onClose={handleCloseModal}
                    onSuccess={handleRatingSuccess}
                />
            )}
        </div>
    );
};

export default UserDashboard;