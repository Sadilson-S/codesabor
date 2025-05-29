import React from 'react';
import { Gamepad2, Trophy, Users, Sparkles } from 'lucide-react';
import TournamentSection from '../Tournament/TournamentSection';

const LeisureSection: React.FC = () => {
  const games = [
    {
      id: 'game-1',
      name: 'God of War Ragnarök',
      image: 'https://cdn1.epicgames.com/spt-assets/edaff839f0734d16bc89d2ddb1dc9339/steel-magnolia-15owu.jpg',
      description: 'Embarque na jornada épica de Kratos e Atreus'
    },
    {
      id: 'game-2',
      name: 'GTA V',
      image: 'https://akamai.sscdn.co/uploadfile/letras/playlists/e/3/a/0/e3a09ba4e208476795c224d8fb478e98.jpg',
      description: 'Explore Los Santos em máxima qualidade'
    },
    {
      id: 'game-3',
      name: 'Mortal Kombat 11',
      image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/976310/header.jpg?t=1747925751',
      description: 'Batalhas épicas em 4K'
    },
    {
      id: 'game-4',
      name: 'FC 25',
      image: 'https://cogconnected.com/wp-content/uploads/2024/07/EA-SPORTS-FC-25-PREVIEW-1.jpg',
      description: 'O melhor do futebol virtual'
    },
    {
      id: 'game-5',
      name: 'Naruto Storm 4',
      image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/349040/capsule_616x353.jpg?t=1703080866',
      description: 'Batalhas ninjas em alta velocidade'
    },
    {
      id: 'game-6',
      name: 'TEKKEN 7',
      image: 'https://image.api.playstation.com/vulcan/img/rnd/202111/1213/djtqEqWCXcKmwUhM6qdUIFnJ.jpg',
      description: 'Combates intensos com lutadores lendários'
    }
  ];

  return (
    <>
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-full mb-4">
              <Gamepad2 size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Área Gamer</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Jogue os melhores títulos enquanto saboreia nossa deliciosa comida!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {games.map((game) => (
              <div 
                key={game.id}
                className="bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                  <p className="text-gray-400">{game.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Campeonatos</h3>
              <p className="text-gray-400">Participe dos nossos torneios semanais</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Setup Premium</h3>
              <p className="text-gray-400">PS4 e PS5</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Multiplayer</h3>
              <p className="text-gray-400">Jogue com seus amigos</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Venha se Divertir!</h3>
            <p className="text-lg mb-6">
              Ambiente climatizado, som ambiente e os melhores jogos para você aproveitar com os amigos!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                Jogos em 4K
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                Controles Premium
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                Ambiente Gamer
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      <TournamentSection />
    </>
  );
};

export default LeisureSection;