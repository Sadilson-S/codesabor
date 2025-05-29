import React, { useState } from 'react';
import { useTournament } from '../../contexts/TournamentContext';
import { RefreshCw, Eye, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Inscription {
  id: string;
  nome_completo: string;
  numero_whatsapp: string;
  campeonato_id: string;
  criado_em: string;
}

const TournamentAdminPanel: React.FC = () => {
  const { tournaments, fetchTournaments, createNewEdition, getInscriptionCount } = useTournament();
  const [loading, setLoading] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [playerList, setPlayerList] = useState<Inscription[]>([]);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  // Fetch tournaments on component mount
  React.useEffect(() => {
    fetchTournaments();
  }, []);

  const handleViewInscriptions = async (tournamentId: string) => {
    setProcessingId(tournamentId);
    setLoading(true);
    
    try {
      console.log('Fetching inscriptions for tournament:', tournamentId);
      
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*')
        .eq('campeonato_id', tournamentId);
      
      if (error) {
        console.error('Error fetching inscriptions:', error);
        alert('Erro ao carregar inscrições');
        setLoading(false);
        setProcessingId(null);
        return;
      }
      
      console.log(`Found ${data?.length || 0} inscriptions`);
      setPlayerList(data || []);
      setSelectedTournamentId(tournamentId);
      setShowPlayerList(true);
    } catch (error) {
      console.error('Exception when fetching inscriptions:', error);
      alert('Erro ao carregar inscrições');
    } finally {
      setLoading(false);
      setProcessingId(null);
    }
  };

  const handleDeleteTournament = async (tournamentId: string) => {
    if (!window.confirm('Tem certeza que deseja DELETAR este campeonato? Esta ação não pode ser desfeita.')) {
      return;
    }
    
    setProcessingId(tournamentId);
    setLoading(true);
    
    try {
      // Use a completely different approach with the Supabase client
      // First, get the current tournament to confirm it exists
      const { data: tournament } = await supabase
        .from('campeonatos')
        .select('id, jogo')
        .eq('id', tournamentId)
        .single();
        
      if (!tournament) {
        throw new Error('Campeonato não encontrado');
      }
      
      console.log(`Deleting tournament: ${tournament.jogo} (${tournamentId})`);
      
      // First delete all inscriptions
      const { error: inscriptionsError } = await supabase
        .from('inscricoes')
        .delete()
        .eq('campeonato_id', tournamentId);
        
      if (inscriptionsError) {
        console.error('Error deleting inscriptions:', inscriptionsError);
        throw inscriptionsError;
      }
      
      // Then delete the tournament
      const { error: tournamentError } = await supabase
        .from('campeonatos')
        .delete()
        .eq('id', tournamentId);
        
      if (tournamentError) {
        console.error('Error deleting tournament:', tournamentError);
        throw tournamentError;
      }
      
      console.log('Tournament deletion successful');
      alert('Campeonato deletado com sucesso!');
      
      // Manually update the local state
      if (selectedTournamentId === tournamentId) {
        setPlayerList([]);
        setShowPlayerList(false);
      }
      
      // Force a hard reload of the page
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Exception when deleting tournament:', error);
      alert('Erro ao deletar campeonato. Tente novamente.');
    } finally {
      setLoading(false);
      setProcessingId(null);
    }
  };

  const handleCreateNewEdition = async (game: string, currentEdition: number) => {
    setLoading(true);
    setProcessingId(`${game}-${currentEdition}`);
    
    try {
      const { success, error } = await createNewEdition(game, currentEdition);
      
      if (success) {
        alert(`Nova edição do campeonato de ${game} criada com sucesso`);
        // Reload the page to refresh everything
        window.location.reload();
      } else {
        alert(`Erro ao criar nova edição: ${error}`);
      }
    } catch (error) {
      console.error('Exception when creating new edition:', error);
      alert('Erro ao criar nova edição');
    } finally {
      setLoading(false);
      setProcessingId(null);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-6 mb-12">
      <h3 className="text-2xl font-bold text-white mb-6">Painel do Administrador</h3>
      
      {showPlayerList && selectedTournamentId ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-white">
              Lista de Inscritos
            </h4>
            <button
              onClick={() => setShowPlayerList(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Voltar
            </button>
          </div>
          
          {playerList.length === 0 ? (
            <p className="text-gray-300">Nenhuma inscrição encontrada para este campeonato.</p>
          ) : (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-4 py-3 text-left text-white">Nome</th>
                    <th className="px-4 py-3 text-left text-white">WhatsApp</th>
                    <th className="px-4 py-3 text-left text-white">Data de Inscrição</th>
                  </tr>
                </thead>
                <tbody>
                  {playerList.map((inscription) => (
                    <tr key={inscription.id} className="border-t border-gray-700">
                      <td className="px-4 py-3 text-gray-300">{inscription.nome_completo}</td>
                      <td className="px-4 py-3 text-gray-300">{inscription.numero_whatsapp}</td>
                      <td className="px-4 py-3 text-gray-300">
                        {new Date(inscription.criado_em).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-white">Campeonatos Ativos</h4>
            <button
              onClick={() => fetchTournaments()}
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-full"
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
          
          {tournaments.length === 0 ? (
            <p className="text-gray-300">Nenhum campeonato encontrado.</p>
          ) : (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-4 py-3 text-left text-white">Jogo</th>
                    <th className="px-4 py-3 text-left text-white">Edição</th>
                    <th className="px-4 py-3 text-left text-white">Status</th>
                    <th className="px-4 py-3 text-left text-white">Inscritos</th>
                    <th className="px-4 py-3 text-center text-white">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tournaments
                    .filter(t => t.status === 'ativo')
                    .sort((a, b) => a.jogo.localeCompare(b.jogo))
                    .map((tournament) => {
                      const inscriptionCount = getInscriptionCount(tournament.id);
                      const isFull = inscriptionCount >= 20;
                      const isProcessing = processingId === tournament.id;
                      
                      return (
                        <tr key={tournament.id} className="border-t border-gray-700">
                          <td className="px-4 py-3 text-gray-300">{tournament.jogo}</td>
                          <td className="px-4 py-3 text-gray-300">{tournament.edicao}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                              Ativo
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300">
                            <span className={`font-medium ${isFull ? 'text-red-400' : 'text-gray-300'}`}>
                              {inscriptionCount}/20
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleViewInscriptions(tournament.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                                title="Ver inscritos"
                                disabled={isProcessing}
                              >
                                <Eye size={16} className={isProcessing ? 'animate-pulse' : ''} />
                              </button>
                              <button
                                onClick={() => handleDeleteTournament(tournament.id)}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                                title="Deletar campeonato"
                                disabled={isProcessing}
                              >
                                <Trash2 size={16} className={isProcessing ? 'animate-pulse' : ''} />
                              </button>
                              <button
                                onClick={() => handleCreateNewEdition(tournament.jogo, tournament.edicao)}
                                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
                                title="Criar nova edição"
                                disabled={isProcessing}
                              >
                                <Plus size={16} className={isProcessing ? 'animate-pulse' : ''} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TournamentAdminPanel;