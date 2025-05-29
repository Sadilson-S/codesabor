import React, { useState } from 'react';
import { Trophy, AlertCircle, Users } from 'lucide-react';
import { useTournament } from '../../contexts/TournamentContext';
import TournamentModal from './TournamentModal';
import AdminLogin from './AdminLogin';
// Use a relative path to import TournamentAdminPanel
import TournamentAdminPanel from '../../components/Tournament/TournamentAdminPanel';
import { useAuth } from '../../contexts/AuthContext';

// Game interface is no longer needed as we're using tournament data directly

const TournamentSection: React.FC = () => {
  const { activeTournaments, getRemainingSpots, isAdmin, dbError, fetchTournaments } = useTournament();
  const { user } = useAuth();
  const [selectedTournament, setSelectedTournament] = useState<{id: string, game: string, image: string} | null>(null);
  const [modalType, setModalType] = useState<'register' | 'waitlist'>('register');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch tournaments only once on component mount
  React.useEffect(() => {
    // Initial fetch - no debug logs to reduce console noise
    fetchTournaments();
  }, []);

  // Map game names to their images for display
  const gameImages: Record<string, string> = {
    'Mortal Kombat 11': 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/976310/header.jpg?t=1747925751',
    'FC 25': 'https://cogconnected.com/wp-content/uploads/2024/07/EA-SPORTS-FC-25-PREVIEW-1.jpg',
    'Naruto Storm 4': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/349040/capsule_616x353.jpg?t=1703080866',
    'TEKKEN 7': 'https://image.api.playstation.com/vulcan/img/rnd/202111/1213/djtqEqWCXcKmwUhM6qdUIFnJ.jpg'
  };

  const handleTournamentAction = (tournamentId: string, gameName: string) => {
    const remainingSpots = getRemainingSpots(tournamentId);
    const gameImage = gameImages[gameName] || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg';
    
    setSelectedTournament({
      id: tournamentId,
      game: gameName,
      image: gameImage
    });
    setModalType(remainingSpots > 0 ? 'register' : 'waitlist');
    setIsModalOpen(true);
  };

  return (
    <div className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-orange-500 rounded-full mb-4">
            <Trophy size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Campeonatos</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Participe dos nossos campeonatos e mostre suas habilidades!
          </p>
        </div>

        {dbError ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-12 rounded">
            <div className="flex items-center">
              <div className="py-1">
                <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 10.32 10.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Erro no Banco de Dados</p>
                <p className="text-sm">{dbError}</p>
                <p className="text-sm mt-2">Para configurar o banco de dados:</p>
                <ol className="list-decimal list-inside text-sm mt-1">
                  <li>Acesse o seu projeto no Supabase</li>
                  <li>Vá para a seção SQL Editor</li>
                  <li>Execute o script SQL que está em: <code>supabase/migrations/20250529_create_tournament_tables.sql</code></li>
                </ol>
              </div>
            </div>
          </div>
        ) : isAdmin && user ? (
          <TournamentAdminPanel />
        ) : user ? (
          <div className="mb-12">
            <AdminLogin />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTournaments.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Users size={48} className="mb-4" />
                  <h3 className="text-xl font-medium">Nenhum campeonato ativo no momento</h3>
                  <p className="mt-2">Fique atento para os próximos campeonatos!</p>
                </div>
              </div>
            ) : (
              activeTournaments.map((tournament) => {
                const remainingSpots = getRemainingSpots(tournament.id);
                const isFull = remainingSpots <= 0;
                const gameImage = gameImages[tournament.jogo] || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg';

                return (
                  <div
                    key={tournament.id}
                    className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={gameImage}
                        alt={tournament.jogo}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
                        {tournament.jogo === 'TEKKEN 7' ? 'PS4' : 'PS4 & PS5'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-2">{tournament.jogo}</h3>
                      <p className="text-sm text-gray-400 mb-2">Edição {tournament.edicao}</p>
                      
                      <p className="text-orange-400 font-bold mb-2">Inscrição {['TEKKEN 7', 'Naruto Storm 4', 'Mortal Kombat 11'].includes(tournament.jogo) ? '2.250 Kz' : '2.350 Kz'}</p>
                      
                      <p className="text-green-400 font-bold mb-2">
                        Premiação: {['TEKKEN 7', 'Naruto Storm 4', 'Mortal Kombat 11'].includes(tournament.jogo) 
                          ? '10.000 Kz' 
                          : '15.000 Kz + comida na bancada'}
                      </p>
                      
                      {isFull ? (
                        <div className="flex items-center text-red-400 mb-3">
                          <AlertCircle size={16} className="mr-1" />
                          <span className="text-sm">Campeonato Lotado</span>
                        </div>
                      ) : (
                        <p className="text-gray-300 mb-3">
                          {remainingSpots} vagas restantes
                        </p>
                      )}

                      <button
                        onClick={() => handleTournamentAction(tournament.id, tournament.jogo)}
                        className={`w-full py-2 px-4 rounded-lg font-medium ${
                          isFull
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {isFull ? 'Quero ser avisado' : 'Inscreva-se'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {selectedTournament && (
        <TournamentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tournamentId={selectedTournament.id}
          gameName={selectedTournament.game}
          gameImage={selectedTournament.image}
          type={modalType}
        />
      )}
    </div>
  );
};

export default TournamentSection;