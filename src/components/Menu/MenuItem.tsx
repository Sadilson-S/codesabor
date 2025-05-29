import React from 'react';
import { MenuItem as MenuItemType } from '../../types/types';
import { formatCurrency } from '../../utils/formatters';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy" // Add lazy loading for better performance
        />
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
        <p className="text-orange-500 font-bold mt-1 sm:mt-2">{formatCurrency(item.price)}</p>
      </div>
    </div>
  );
};

export default MenuItem;