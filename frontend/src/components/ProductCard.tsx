// File: src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types/api';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateDescription = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleClick = (): void => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border cursor-pointer hover:border-blue-300"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate flex-1 mr-4">
          {product.name}
        </h3>
        <div className="text-2xl font-bold text-blue-600 whitespace-nowrap">
          {product.price_display}
        </div>
      </div>

      <p className="text-gray-600 mb-4 min-h-[3rem] leading-relaxed">
        {truncateDescription(product.description)}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="bg-gray-100 px-2 py-1 rounded">
          📅 {formatDate(product.created_at)}
        </span>
        <span className="text-xs">
          ID: {product.id}
        </span>
      </div>

      {product.updated_at !== product.created_at && (
        <div className="mt-2 text-xs text-gray-400">
          Updated: {formatDate(product.updated_at)}
        </div>
      )}
    </div>
  );
};

export default ProductCard;