import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import logoImage from '../data/images/code_sabor-removebg-preview.jpg';

interface HeroSectionProps {
  scrollToMenu: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToMenu }) => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-orange-600 to-purple-900 opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundBlendMode: "overlay" 
        }}
      ></div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <div className="mb-4">
          <img 
            src={logoImage} 
            alt="Code & Sabor Logo" 
            className="h-40 md:h-48 object-contain"
          />
        </div>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 mt-6">
          Junte a melhor comida com os melhores jogos! 🎮 Peça seu lanche e venha se divertir com a gente!
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <button 
            onClick={scrollToMenu}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center"
          >
            Ver Cardápio 🍔
          </button>
          <button 
            onClick={() => document.getElementById('leisure')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center"
          >
            Área Gamer 🎮
          </button>
        </div>
        
        <button 
          onClick={scrollToMenu}
          className="absolute bottom-8 animate-bounce"
          aria-label="Rolar para baixo"
        >
          <ArrowDownCircle size={36} className="text-orange-400" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;