import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, size = 20 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={size} className="text-yellow-400 fill-current" />
            ))}
            {/* Hum abhi half-star support nahi kar rahe, simple rakhte hain */}
            {[...Array(5 - fullStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={size} className="text-gray-300 fill-current" />
            ))}
        </div>
    );
};

export default StarRating;