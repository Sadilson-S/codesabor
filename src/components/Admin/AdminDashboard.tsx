import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTournament } from '../../contexts/TournamentContext';
import { Trophy, Users, RefreshCw, Eye, Plus, Trash2, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { 
    tournaments, 
    fetchTournaments, 
    fetchInscriptions, 
    deleteTournament, 
    createNewEdition, 
    getInscriptionCount 
  } = useTournament();
  
  const [loading, setLoading] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  const [inscriptions, setInscriptions] = useState<any[]>([]);
  const [showInscriptions, setShowInscriptions] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const handleViewInscriptions = async (tournamentId: string) => {
    setLoading(true);
    try {
      const data = await fetchInscriptions(tournamentId);
      setInscriptions(data);
      setSelectedTournament(tournamentId);
      setShowInscriptions(true);
    } catch (error) {
      toast.error('Erro ao carregar inscrições');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTournament = async (tournamentId: string) => {
    if (!window.confirm('Tem certeza que deseja EXCLUIR este campeonato? Esta ação não pode ser desfeita.')) {
      return;
    }

    setLoading(true);
    try {
      // Use the deleteTournament function from the context instead of resetTournament
      const { success, error } = await deleteTournament(tournamentId);
      if (success) {
        toast.success('Campeonato excluído com sucesso');
        await fetchTournaments();
      } else {
        toast.error(`Erro ao excluir campeonato: ${error}`);
      }
    } catch (error) {
      toast.error('Erro ao excluir campeonato');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewEdition = async (game: string, currentEdition: number) => {
    setLoading(true);
    try {
      const { success, error } = await createNewEdition(game, currentEdition);
      if (success) {
        toast.success(`Nova edição do campeonato de ${game} criada com sucesso`);
        await fetchTournaments();
      } else {
        toast.error(`Erro ao criar nova edição: ${error}`);
      }
    } catch (error) {
      toast.error('Erro ao criar nova edição');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Trophy size={32} className="text-orange-500 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Painel Administrativo</h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sair
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          {showInscriptions && selectedTournament ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Lista de Inscritos
                </h2>
                <button
                  onClick={() => setShowInscriptions(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Voltar
                </button>
              </div>
              
              {inscriptions.length === 0 ? (
                <div className="bg-gray-700 rounded-lg p-8 text-center">
                  <Users size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Nenhuma inscrição encontrada para este campeonato.</p>
                </div>
              ) : (
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900">
                        <th className="px-4 py-3 text-left text-white">Nome</th>
                        <th className="px-4 py-3 text-left text-white">WhatsApp</th>
                        <th className="px-4 py-3 text-left text-white">Data de Inscrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscriptions.map((inscription) => (
                        <tr key={inscription.id} className="border-t border-gray-800">
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Gerenciar Campeonatos</h2>
                <button
                  onClick={() => fetchTournaments()}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
                  disabled={loading}
                  title="Atualizar"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>
              
              {tournaments.length === 0 ? (
                <div className="bg-gray-700 rounded-lg p-8 text-center">
                  <Trophy size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Nenhum campeonato encontrado.</p>
                  <p className="text-gray-400 mt-2">Crie seu primeiro campeonato para começar.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="px-4 py-3 text-left text-white">Jogo</th>
                        <th className="px-4 py-3 text-left text-white">Edição</th>
                        <th className="px-4 py-3 text-left text-white">Status</th>
                        <th className="px-4 py-3 text-left text-white">Inscritos</th>
                        <th className="px-4 py-3 text-center text-white">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournaments
                        .sort((a, b) => a.jogo.localeCompare(b.jogo))
                        .map((tournament) => {
                          const inscriptionCount = getInscriptionCount(tournament.id);
                          const isFull = inscriptionCount >= 20;
                          
                          return (
                            <tr key={tournament.id} className="border-t border-gray-800 hover:bg-gray-700">
                              <td className="px-4 py-3 text-gray-300">{tournament.jogo}</td>
                              <td className="px-4 py-3 text-gray-300">{tournament.edicao}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${tournament.status === 'ativo' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                  {tournament.status === 'ativo' ? 'Ativo' : 'Encerrado'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`font-medium ${isFull ? 'text-red-400' : 'text-gray-300'}`}>
                                  {inscriptionCount}/20
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex justify-center space-x-2">
                                  <button
                                    onClick={() => handleViewInscriptions(tournament.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                                    title="Ver inscritos"
                                    disabled={loading}
                                  >
                                    <Eye size={16} />
                                  </button>
                                  {tournament.status === 'ativo' && (
                                    <>
                                      <button
                                        onClick={() => handleDeleteTournament(tournament.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                                        title="Excluir campeonato"
                                        disabled={loading}
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                      <button
                                        onClick={() => handleCreateNewEdition(tournament.jogo, tournament.edicao)}
                                        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded transition-colors"
                                        title="Criar nova edição"
                                        disabled={loading}
                                      >
                                        <Plus size={16} />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-white mb-4">Criar Novo Campeonato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Mortal Kombat 11', 'FC 25', 'Naruto Storm 4', 'TEKKEN 7'].map((game) => {
                    const existingTournament = tournaments.find(t => t.jogo === game && t.status === 'ativo');
                    return (
                      <div key={game} className="bg-gray-700 rounded-lg p-4 text-center">
                        <h4 className="text-white font-medium mb-2">{game}</h4>
                        {existingTournament ? (
                          <p className="text-gray-400 text-sm mb-3">Já existe um campeonato ativo</p>
                        ) : (
                          <p className="text-gray-400 text-sm mb-3">Sem campeonato ativo</p>
                        )}
                        <button
                          onClick={() => handleCreateNewEdition(game, existingTournament ? existingTournament.edicao : 0)}
                          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          disabled={loading || !!existingTournament}
                        >
                          {existingTournament ? 'Já Existe' : 'Criar Campeonato'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
