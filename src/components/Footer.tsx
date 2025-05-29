import React from 'react';
import { MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FoodPlay</h3>
            <p className="text-gray-400 mb-4">
              O melhor lugar para saborear hambúrgueres artesanais e se divertir com jogos incríveis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Segunda a Quinta</p>
                  <p className="font-medium text-white">18:00 - 23:00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Sexta a Domingo</p>
                  <p className="font-medium text-white">17:00 - 00:00</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Contato e Localização</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Av. Paulista, 1000</p>
                  <p>São Paulo - SP</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Telefone:</p>
                  <p className="font-medium text-white">945897654</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 FoodPlay. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;