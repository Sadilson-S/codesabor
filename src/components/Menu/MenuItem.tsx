import React, { useState } from 'react';
import { PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../types/types';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatters';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setIsAdding(false);
    setQuantity(1);
    
    // Show notification
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-1 text-sm h-12 overflow-hidden">{item.description}</p>
        <p className="text-orange-500 font-bold mt-2">{formatCurrency(item.price)}</p>
        
        {isAdding ? (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="text-gray-500 hover:text-orange-500 focus:outline-none"
                  aria-label="Diminuir quantidade"
                >
                  <MinusCircle size={20} />
                </button>
                <span className="mx-3 w-8 text-center">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="text-gray-500 hover:text-orange-500 focus:outline-none"
                  aria-label="Aumentar quantidade"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Adicionar
              </button>
            </div>
            <button 
              onClick={() => setIsAdding(false)}
              className="text-gray-500 text-sm mt-2 hover:text-gray-700"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="mt-4 flex items-center justify-center w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ShoppingCart size={16} className="mr-2" />
            Adicionar ao pedido
          </button>
        )}
      </div>
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center">
          <span className="text-sm font-medium">Item adicionado ao carrinho!</span>
        </div>
      )}
    </div>
  );
};

export default MenuItem;