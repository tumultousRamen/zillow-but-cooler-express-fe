import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faBath,
  faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  dimension: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({
  title,
  address,
  price,
  beds,
  baths,
  dimension,
  imageUrl,
}) => {
  return (
    <div className="relative w-[360px] h-[424px] bg-white border border-purple-100 rounded-lg shadow-md">
      {/* Image Section */}
      <div className="relative h-[200px] rounded-t-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Price Section */}
      <div className="absolute top-[232px] left-8 flex items-center gap-2">
        <span className="text-primary font-extrabold text-lg">{price}</span>
        <span className="text-black/50 text-sm">/month</span>
      </div>

      {/* Favorited Icon */}
      <div className="absolute top-[232px] right-8 w-12 h-12 bg-white border border-purple-100 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21l-1.45-1.31C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.49 6.49 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.19L12 21z"
          />
        </svg>
      </div>

      {/* Title and Address */}
      <h4 className="absolute top-[272px] left-8 text-lg font-bold text-black">
        {title}
      </h4>
      <p className="absolute top-[316px] left-8 text-sm text-black/50">
        {address}
      </p>

      {/* Divider */}
      <div className="absolute top-[356px] left-8 w-[304px] border-t border-purple-100"></div>

      {/* Facilities */}
      <div className="absolute top-[372px] left-8 flex gap-4">
        {/* Beds */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faBed} className="text-primary" />
          </div>
          <span className="text-sm text-black/70">{beds} Beds</span>
        </div>
        {/* Baths */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faBath} className="text-primary" />
          </div>
          <span className="text-sm text-black/70">{baths} Bathrooms</span>
        </div>
        {/* Dimension */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className="text-primary"
            />
          </div>
          <span className="text-sm text-black/70">{dimension}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

