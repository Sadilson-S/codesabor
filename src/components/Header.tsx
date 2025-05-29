import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-orange-500' : 'text-white'}`}>
            Code
          </h1>
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-green-500' : 'text-white'}`}>
            & 
          </h1>
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-500' : 'text-white'}`}>
           Sabor
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('menu')}
            className={`font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-300'
            }`}
          >
            Cardápio
          </button>
          <button 
            onClick={() => scrollToSection('leisure')}
            className={`font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-300'
            }`}
          >
            Área de Jogos
          </button>
          
          {/* Admin Login Button */}
          <button
            onClick={() => scrollToSection('tournaments')}
            className={`font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-300'
            }`}
          >
            Campeonatos
          </button>
          
          {user ? (
            <button
              onClick={signOut}
              className={`flex items-center font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-300'
              }`}
            >
              <User size={18} className="mr-1" />
              Sair
            </button>
          ) : (
            <button
              onClick={() => scrollToSection('admin')}
              className={`flex items-center font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-300'
              }`}
            >
              <User size={18} className="mr-1" />
              Admin
            </button>
          )}
        </nav>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => {
                scrollToSection('menu');
                toggleMobileMenu();
              }}
              className="text-gray-700 font-medium py-2 hover:text-orange-500 text-left"
            >
              Cardápio
            </button>
            <button 
              onClick={() => {
                scrollToSection('leisure');
                toggleMobileMenu();
              }}
              className="text-gray-700 font-medium py-2 hover:text-orange-500 text-left"
            >
              Área de Jogos
            </button>
            <button 
              onClick={() => {
                scrollToSection('tournaments');
                toggleMobileMenu();
              }}
              className="text-gray-700 font-medium py-2 hover:text-orange-500 text-left"
            >
              Campeonatos
            </button>
            
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  toggleMobileMenu();
                }}
                className="text-gray-700 font-medium py-2 hover:text-orange-500 text-left flex items-center"
              >
                <User size={18} className="mr-1" />
                Sair
              </button>
            ) : (
              <button
                onClick={() => {
                  scrollToSection('admin');
                  toggleMobileMenu();
                }}
                className="text-gray-700 font-medium py-2 hover:text-orange-500 text-left flex items-center"
              >
                <User size={18} className="mr-1" />
                Admin
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;