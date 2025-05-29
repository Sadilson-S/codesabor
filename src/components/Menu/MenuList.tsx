import React, { useState, useRef } from 'react';
import { categories, menuItems } from '../../data/menuData';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '../../types/types';
import { Merge as Burger, Pizza, Coffee, Cake, Utensils } from 'lucide-react';

const MenuList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case 'burger':
        return <Burger className="w-5 h-5" />;
      case 'pizza':
        return <Pizza className="w-5 h-5" />;
      case 'cup':
        return <Coffee className="w-5 h-5" />;
      case 'cake':
        return <Cake className="w-5 h-5" />;
      case 'utensils':
        return <Utensils className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const filteredItems: { [key: string]: MenuItemType[] } = categories.reduce(
    (acc, category) => ({
      ...acc,
      [category.id]: menuItems.filter(item => item.category === category.id)
    }),
    {}
  );

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nosso Cardápio</h2>
      
      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-8 categories-scrollbar">
        <div className="flex space-x-2 md:space-x-4 mx-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center">
                {getIconByName(category.icon)}
                <span className="ml-2 font-medium">{category.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Menu items by category */}
      {categories.map(category => (
        <div
          key={category.id}
          ref={el => categoryRefs.current[category.id] = el}
          className={`mb-12 scroll-mt-24`}
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems[category.id].map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;