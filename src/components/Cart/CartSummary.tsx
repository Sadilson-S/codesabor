import React, { useEffect, useState } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatters';

interface CartSummaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState('+244 950 949 098');

  useEffect(() => {
    // Prevent scrolling when cart is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const formatOrderMessage = () => {
    if (cartItems.length === 0) return '';
    
    const itemsText = cartItems
      .map(item => `${item.quantity}x ${item.name} (${formatCurrency(item.price * item.quantity)})`)
      .join('\n');
    
    return encodeURIComponent(
      `Olá, quero fazer um pedido:\n\n${itemsText}\n\nTotal: ${formatCurrency(cartTotal)}`
    );
  };

  const handleWhatsAppClick = () => {
    if (cartItems.length === 0) return;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formatOrderMessage()}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col animate-slide-in">
        <div className="p-4 border-b flex justify-between items-center bg-orange-500 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2" size={20} /> 
            Seu Pedido
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Seu carrinho está vazio</p>
              <button 
                onClick={onClose}
                className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
              >
                Voltar para o cardápio
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-orange-500 font-semibold">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center mt-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-orange-500"
                          aria-label="Diminuir quantidade"
                        >
                          -
                        </button>
                        <span className="mx-2 w-8 text-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-orange-500"
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-gray-800">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 mt-2"
                        aria-label="Remover item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 flex items-center text-sm mb-4"
                >
                  <Trash2 size={16} className="mr-1" />
                  Limpar carrinho
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 border-t">
          <button 
            onClick={handleWhatsAppClick}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-full font-bold flex items-center justify-center 
              ${cartItems.length === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'}`}
          >
            Finalizar Pedido via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;