import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import storeService from '../services/store.service';

const RatingModal = ({ store, onClose, onSuccess }) => {
    const [rating, setRating] = useState(store.currentUserRating || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (rating === 0) {
            setError("Please select a rating.");
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            await storeService.rateStore(store.id, rating);
            onSuccess(); // Dashboard ko refresh karne ke liye
            onClose(); // Modal band karne ke liye
        } catch (err) {
            setError("Failed to submit rating. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl shadow-2xl w-full max-w-md relative text-white border border-white/20">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-2">Rate {store.name}</h2>
                <p className="text-gray-300 mb-6">Select your rating from 1 to 5 stars.</p>
                
                <div className="flex justify-center items-center space-x-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={40}
                            className={`cursor-pointer transition-colors ${
                                (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-400'
                            }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        />
                    ))}
                </div>

                {error && <p className="text-center text-red-300 mb-4">{error}</p>}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                </button>
            </div>
        </div>
    );
};

export default RatingModal;