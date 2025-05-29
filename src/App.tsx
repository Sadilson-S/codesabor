import { useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import Header from './components/Header';
import MenuList from './components/Menu/MenuList';
import LeisureSection from './components/LeisureArea/LeisureSection';
import AdminRouter from './components/Admin/AdminRouter';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { TournamentProvider } from './contexts/TournamentContext';
import './App.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const leisureRef = useRef<HTMLDivElement>(null);
  const tournamentsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'menu' && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'leisure' && leisureRef.current) {
      leisureRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'tournaments' && tournamentsRef.current) {
      tournamentsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'admin') {
      setShowAdmin(true);
    }
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <TournamentProvider>
        <CartProvider>
          {showAdmin ? (
            <AdminRouter onBack={() => setShowAdmin(false)} />
          ) : (
            <div className="min-h-screen bg-gray-50">
              <Header 
                scrollToSection={scrollToSection} 
              />
              <HeroSection scrollToMenu={scrollToMenu} />
              
              <div id="menu" ref={menuRef}>
                <MenuList />
              </div>
              
              <div id="leisure" ref={leisureRef}>
                <LeisureSection />
              </div>
              
              <div id="tournaments" ref={tournamentsRef}>
                {/* This will be automatically scrolled to when clicking on the Tournaments link */}
              </div>
            </div>
          )}
        </CartProvider>
      </TournamentProvider>
    </AuthProvider>
  );
}

export default App;