import React from 'react';
import StarRating from './StarRating'; // Import karein

const StoreCard = ({ store, onRateClick }) => {
    return (
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg backdrop-blur-md hover:scale-105 hover:shadow-xl transition flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold text-white mb-2">{store.name}</h2>
                <p className="text-gray-200 mb-4 h-16">{store.address}</p>
                <p className="text-sm text-gray-300">{store.email}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Overall Rating:</span>
                    <StarRating rating={store.averageRating} />
                </div>
                {store.currentUserRating && (
                    <div className="flex justify-between items-center">
                        <span className="text-yellow-300 font-semibold">Your Rating:</span>
                        <StarRating rating={store.currentUserRating} />
                    </div>
                )}

                {/* Rating dene ka button hum agle step me add karenge */}
               <button
            onClick={onRateClick} // onClick event add karein
            className="mt-4 w-full bg-yellow-400 text-indigo-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition"
        >
            {store.currentUserRating ? 'Modify Your Rating' : 'Rate Store'}
        </button>
            </div>
        </div>
    );
};

export default StoreCard;