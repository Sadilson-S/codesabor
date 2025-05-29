import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export interface Tournament {
  id: string;
  jogo: string;
  edicao: number;
  status: 'ativo' | 'encerrado';
  data_inicio: string;
}

export interface Inscription {
  id: string;
  nome_completo: string;
  numero_whatsapp: string;
  campeonato_id: string;
  criado_em: string;
}

export interface Game {
  id: string;
  name: string;
  image: string;
}

interface TournamentContextType {
  tournaments: Tournament[];
  inscriptions: Inscription[];
  isAdmin: boolean;
  activeTournaments: Tournament[];
  loading: boolean;
  dbError: string | null;
  fetchTournaments: () => Promise<void>;
  fetchInscriptions: (tournamentId: string) => Promise<Inscription[]>;
  registerPlayer: (tournamentId: string, name: string, whatsapp: string) => Promise<{ success: boolean; error?: any }>;
  resetTournament: (tournamentId: string) => Promise<{ success: boolean; error?: any }>;
  deleteTournament: (tournamentId: string) => Promise<{ success: boolean; error?: any }>;
  createNewEdition: (game: string, currentEdition: number) => Promise<{ success: boolean; error?: any }>;
  getInscriptionCount: (tournamentId: string) => number;
  getRemainingSpots: (tournamentId: string) => number;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const { user } = useAuth();

  const isAdmin = !!user;

  // NO automatic fetching at all to prevent loops

  // Get only the most recent active tournament for each game
  const activeTournaments = React.useMemo(() => {
    const gameMap = new Map<string, Tournament>();
    
    // For each game, keep only the tournament with the highest edition number
    tournaments
      .filter(t => t.status === 'ativo')
      .forEach(tournament => {
        const existingTournament = gameMap.get(tournament.jogo);
        if (!existingTournament || tournament.edicao > existingTournament.edicao) {
          gameMap.set(tournament.jogo, tournament);
        }
      });
    
    return Array.from(gameMap.values());
  }, [tournaments]);

  const fetchTournaments = async () => {
    setLoading(true);
    setDbError(null);
    try {
      // Log the query we're about to make
      console.log('Fetching tournaments from Supabase');
      
      const { data, error } = await supabase
        .from('campeonatos')
        .select('*')
        .order('data_inicio', { ascending: false });
        
      console.log('Tournament query result:', { data, error });

      if (error) {
        // Check if the error is related to missing tables
        if (error.code === '42P01') {
          setDbError('As tabelas do banco de dados não existem. Por favor, configure o banco de dados Supabase.');
          console.error('Database tables do not exist:', error);
          setTournaments([]);
          return;
        }
        throw error;
      }
      
      setTournaments(data || []);
      
      // Fetch inscriptions for active tournaments
      const activeTournamentIds = data
        ?.filter(t => t.status === 'ativo')
        .map(t => t.id) || [];
      
      for (const tournamentId of activeTournamentIds) {
        await fetchInscriptionsForTournament(tournamentId);
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      toast.error('Erro ao carregar os campeonatos');
    } finally {
      setLoading(false);
    }
  };

  const fetchInscriptionsForTournament = async (tournamentId: string) => {
    try {
      console.log('Fetching inscriptions for tournament:', tournamentId);
      
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*')
        .eq('campeonato_id', tournamentId);

      if (error) {
        console.error('Error fetching inscriptions:', error);
        return [];
      }
      
      console.log(`Found ${data?.length || 0} inscriptions for tournament ${tournamentId}`);
      
      // Update inscriptions state
      setInscriptions(prev => {
        // Remove existing inscriptions for this tournament
        const filtered = prev.filter(i => i.campeonato_id !== tournamentId);
        // Add new inscriptions
        return [...filtered, ...(data || [])];
      });
      
      return data || [];
    } catch (error) {
      console.error('Error fetching inscriptions:', error);
      return [];
    }
  };

  const fetchInscriptions = async (tournamentId: string) => {
    return await fetchInscriptionsForTournament(tournamentId);
  };

  const getInscriptionCount = (tournamentId: string) => {
    return inscriptions.filter(i => i.campeonato_id === tournamentId).length;
  };

  const getRemainingSpots = (tournamentId: string) => {
    const count = getInscriptionCount(tournamentId);
    return Math.max(0, 20 - count);
  };

  const registerPlayer = async (tournamentId: string, name: string, whatsapp: string) => {
    try {
      console.log('Attempting to register player for tournament:', tournamentId);
      
      // Check if there are spots available
      if (getRemainingSpots(tournamentId) <= 0) {
        console.log('Tournament is full');
        return { success: false, error: 'Campeonato lotado' };
      }
      
      // Format WhatsApp number (remove non-digits)
      const formattedWhatsapp = whatsapp.replace(/\D/g, '');
      
      console.log('Inserting player registration with data:', {
        nome_completo: name,
        numero_whatsapp: formattedWhatsapp,
        campeonato_id: tournamentId
      });
      
      const { data, error } = await supabase
        .from('inscricoes')
        .insert([
          {
            nome_completo: name,
            numero_whatsapp: formattedWhatsapp,
            campeonato_id: tournamentId,
          }
        ])
        .select();

      if (error) {
        console.error('Database error when registering player:', error);
        return { success: false, error: `Erro ao registrar: ${error.message}` };
      }
      
      console.log('Registration successful:', data);
      await fetchInscriptionsForTournament(tournamentId);
      return { success: true };
    } catch (error) {
      console.error('Error registering player:', error);
      return { success: false, error: 'Erro ao processar inscrição. Tente novamente.' };
    }
  };

  const resetTournament = async (tournamentId: string) => {
    if (!isAdmin) return { success: false, error: 'Unauthorized' };
    
    console.log('Attempting to reset tournament:', tournamentId);
    
    try {
      // First, check if the tournament exists
      const { data: tournament, error: checkError } = await supabase
        .from('campeonatos')
        .select('id')
        .eq('id', tournamentId)
        .single();
      
      if (checkError) {
        console.error('Error checking tournament:', checkError);
        return { success: false, error: 'Campeonato não encontrado' };
      }
      
      if (!tournament) {
        return { success: false, error: 'Campeonato não encontrado' };
      }
      
      console.log('Deleting inscriptions for tournament:', tournamentId);
      
      // Delete all inscriptions for this tournament
      const { error } = await supabase
        .from('inscricoes')
        .delete()
        .eq('campeonato_id', tournamentId);

      if (error) {
        console.error('Error deleting inscriptions:', error);
        return { success: false, error: `Erro ao deletar inscrições: ${error.message}` };
      }
      
      console.log('Successfully reset tournament:', tournamentId);
      
      // Clear local inscriptions for this tournament
      setInscriptions(prev => prev.filter(i => i.campeonato_id !== tournamentId));
      
      return { success: true };
    } catch (error) {
      console.error('Error resetting tournament:', error);
      return { success: false, error: 'Erro ao resetar campeonato' };
    }
  };

  const createNewEdition = async (game: string, currentEdition: number) => {
    if (!isAdmin) return { success: false, error: 'Unauthorized' };
    
    try {
      // First, set all existing tournaments for this game to 'encerrado'
      if (currentEdition > 0) {
        const { error: updateError } = await supabase
          .from('campeonatos')
          .update({ status: 'encerrado' })
          .eq('jogo', game)
          .eq('status', 'ativo');

        if (updateError) {
          console.error('Error updating existing tournaments:', updateError);
          // Continue anyway to create a new tournament
        }
      }
      
      // Create a new tournament with incremented edition
      const { data, error } = await supabase
        .from('campeonatos')
        .insert([
          {
            jogo: game,
            edicao: currentEdition + 1,
            status: 'ativo',
            data_inicio: new Date().toISOString(),
          }
        ])
        .select();

      if (error) throw error;
      
      console.log('New tournament created:', data);
      await fetchTournaments();
      return { success: true };
    } catch (error) {
      console.error('Error creating new edition:', error);
      return { success: false, error };
    }
  };

  const deleteTournament = async (tournamentId: string) => {
    if (!isAdmin) return { success: false, error: 'Unauthorized' };
    
    console.log('Attempting to delete tournament:', tournamentId);
    
    try {
      // First delete all inscriptions for this tournament
      const { error: inscriptionError } = await supabase
        .from('inscricoes')
        .delete()
        .eq('campeonato_id', tournamentId);
      
      if (inscriptionError) {
        console.error('Error deleting inscriptions:', inscriptionError);
        return { success: false, error: `Erro ao deletar inscrições: ${inscriptionError.message}` };
      }
      
      // Then delete the tournament itself
      const { error: tournamentError } = await supabase
        .from('campeonatos')
        .delete()
        .eq('id', tournamentId);
      
      if (tournamentError) {
        console.error('Error deleting tournament:', tournamentError);
        return { success: false, error: `Erro ao deletar campeonato: ${tournamentError.message}` };
      }
      
      console.log('Successfully deleted tournament:', tournamentId);
      
      // Update local state
      setTournaments(prev => prev.filter(t => t.id !== tournamentId));
      setInscriptions(prev => prev.filter(i => i.campeonato_id !== tournamentId));
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting tournament:', error);
      return { success: false, error: 'Erro ao deletar campeonato' };
    }
  };

  const value = {
    tournaments,
    inscriptions,
    isAdmin,
    activeTournaments,
    loading,
    dbError,
    fetchTournaments,
    fetchInscriptions,
    registerPlayer,
    resetTournament,
    deleteTournament,
    createNewEdition,
    getInscriptionCount,
    getRemainingSpots
  };

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};
