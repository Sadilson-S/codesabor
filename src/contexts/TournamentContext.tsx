import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

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
  fetchAllInscriptions: () => Promise<void>;
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
    console.log('Calculating active tournaments from:', tournaments);
    
    // Filter active tournaments
    const activeTournamentsList = tournaments.filter(t => t.status === 'ativo');
    console.log('Filtered active tournaments:', activeTournamentsList);
    
    const gameMap = new Map<string, Tournament>();
    
    // For each game, keep only the tournament with the highest edition number
    activeTournamentsList.forEach(tournament => {
      const existingTournament = gameMap.get(tournament.jogo);
      if (!existingTournament || tournament.edicao > existingTournament.edicao) {
        gameMap.set(tournament.jogo, tournament);
      }
    });
    
    const result = Array.from(gameMap.values());
    console.log('Final active tournaments:', result);
    return result;
  }, [tournaments]);

  // Track the last fetch time to prevent excessive API calls
  const lastFetchRef = React.useRef<number>(0);
  const fetchThrottleMs = 5000; // Minimum 5 seconds between fetches
  
  // Enhanced tournament fetching with throttling to prevent ERR_INSUFFICIENT_RESOURCES
  const fetchTournaments = async () => {
    // Check if we've fetched recently to prevent excessive API calls
    const now = Date.now();
    if (now - lastFetchRef.current < fetchThrottleMs) {
      console.log('Skipping fetch - too soon since last fetch');
      return;
    }
    
    // Update last fetch time
    lastFetchRef.current = now;
    
    try {
      // Only log in development, not in production
      if (process.env.NODE_ENV !== 'production') {
        console.log('Fetching tournaments from Supabase');
      }
      
      setLoading(true);
      setDbError(null);
      
      // Get all tournaments from the database
      const { data, error } = await supabase
        .from('campeonatos')
        .select('*')
        .order('data_inicio', { ascending: false });
      
      if (error) {
        console.error('Error fetching tournaments:', error);
        setDbError('Erro ao carregar os campeonatos');
        return;
      }
      
      if (!data || data.length === 0) {
        setTournaments([]);
        return;
      }
      
      // Update the state with the fetched tournaments
      setTournaments(data);
      
      // Fetch inscriptions, but don't await to prevent blocking
      fetchAllInscriptions().catch(err => {
        console.error('Error fetching inscriptions:', err);
      });
      
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setDbError('Erro ao carregar os campeonatos');
    } finally {
      setLoading(false);
    }
  };

  // Improved inscription fetching that updates state
  const fetchInscriptionsForTournament = async (tournamentId: string) => {
    try {
      console.log(`Fetching inscriptions for tournament: ${tournamentId}`);
      
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*')
        .eq('campeonato_id', tournamentId);
      
      if (error) {
        console.error('Error fetching inscriptions:', error);
        return [];
      }
      
      console.log(`Found ${data?.length || 0} inscriptions for tournament ${tournamentId}:`, data);
      
      // Update the inscriptions state with the new data
      setInscriptions(prev => {
        // Remove any existing inscriptions for this tournament
        const filtered = prev.filter(i => i.campeonato_id !== tournamentId);
        // Add the new inscriptions
        return [...filtered, ...(data || [])];
      });
      
      return data || [];
    } catch (error) {
      console.error('Error fetching inscriptions:', error);
      return [];
    }
  };

  // Fetch all inscriptions for a specific tournament
  const fetchInscriptions = async (tournamentId: string) => {
    return await fetchInscriptionsForTournament(tournamentId);
  };
  
  // Track the last inscriptions fetch time
  const lastInscriptionsFetchRef = React.useRef<number>(0);
  const inscriptionsFetchThrottleMs = 8000; // Minimum 8 seconds between inscription fetches
  
  // Fetch all inscriptions for all tournaments with throttling
  const fetchAllInscriptions = async () => {
    // Check if we've fetched recently to prevent excessive API calls
    const now = Date.now();
    if (now - lastInscriptionsFetchRef.current < inscriptionsFetchThrottleMs) {
      console.log('Skipping inscriptions fetch - too soon since last fetch');
      return;
    }
    
    // Update last fetch time
    lastInscriptionsFetchRef.current = now;
    
    try {
      // Only log in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('Fetching inscriptions');
      }
      
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*');
      
      if (error) {
        console.error('Error fetching inscriptions:', error);
        return;
      }
      
      // Update state with fetched inscriptions
      setInscriptions(data || []);
    } catch (error) {
      console.error('Error fetching inscriptions:', error);
    }
  };

  const getInscriptionCount = (tournamentId: string) => {
    return inscriptions.filter(i => i.campeonato_id === tournamentId).length;
  };

  const getRemainingSpots = (tournamentId: string) => {
    const count = getInscriptionCount(tournamentId);
    
    // Find the tournament to check its game
    const tournament = tournaments.find(t => t.id === tournamentId);
    
    // Set limit of 13 inscriptions for specific games
    if (tournament && [
      'TEKKEN 7',
      'Naruto Storm 4',
      'Mortal Kombat 11'
    ].includes(tournament.jogo)) {
      return Math.max(0, 13 - count);
    }
    
    // Default limit of 20 for other games
    return Math.max(0, 20 - count);
  };

  const registerPlayer = async (tournamentId: string, name: string, whatsapp: string) => {
    try {
      console.log('Attempting to register player for tournament:', tournamentId);
      
      // First, check if the tournament exists and is active
      const { data: tournamentData, error: tournamentError } = await supabase
        .from('campeonatos')
        .select('*')
        .eq('id', tournamentId)
        .eq('status', 'ativo')
        .single();
      
      if (tournamentError || !tournamentData) {
        console.error('Tournament not found or not active:', tournamentError);
        return { success: false, error: 'Campeonato não encontrado ou não está ativo' };
      }
      
      // Format WhatsApp number (remove non-digits)
      const formattedWhatsapp = whatsapp.replace(/\D/g, '');
      
      // Check if this WhatsApp number is already registered for this tournament
      const { data: existingRegistrations, error: checkError } = await supabase
        .from('inscricoes')
        .select('id')
        .eq('campeonato_id', tournamentId)
        .eq('numero_whatsapp', formattedWhatsapp);
      
      if (checkError) {
        console.error('Error checking existing registrations:', checkError);
        return { success: false, error: 'Erro ao verificar inscrições existentes' };
      }
      
      if (existingRegistrations && existingRegistrations.length > 0) {
        console.log('Player already registered for this tournament');
        return { success: false, error: 'Você já está inscrito neste campeonato' };
      }
      
      // Get current inscription count to check if tournament is full
      const { data: currentInscriptions, error: countError } = await supabase
        .from('inscricoes')
        .select('id')
        .eq('campeonato_id', tournamentId);
      
      if (countError) {
        console.error('Error counting inscriptions:', countError);
        return { success: false, error: 'Erro ao verificar vagas disponíveis' };
      }
      
      if (currentInscriptions && currentInscriptions.length >= 20) {
        console.log('Tournament is full');
        return { success: false, error: 'Campeonato lotado' };
      }
      
      console.log('Inserting player registration with data:', {
        nome_completo: name,
        numero_whatsapp: formattedWhatsapp,
        campeonato_id: tournamentId
      });
      
      // Insert the new registration
      const { data, error } = await supabase
        .from('inscricoes')
        .insert({
          nome_completo: name,
          numero_whatsapp: formattedWhatsapp,
          campeonato_id: tournamentId,
        })
        .select();

      if (error) {
        console.error('Database error when registering player:', error);
        return { success: false, error: `Erro ao registrar: ${error.message}` };
      }
      
      console.log('Registration successful:', data);
      
      // Update local state with the new inscription
      if (data && data.length > 0) {
        setInscriptions(prev => [...prev, data[0]]);
      }
      
      // Also fetch all inscriptions to ensure counts are accurate
      await fetchAllInscriptions();
      
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
      console.log(`Creating new edition for ${game}, current edition: ${currentEdition}`);
      
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
        .insert({
          jogo: game,
          edicao: currentEdition + 1,
          status: 'ativo',
          data_inicio: new Date().toISOString(),
        })
        .select();

      if (error) {
        console.error('Error creating new tournament:', error);
        return { success: false, error: error.message };
      }
      
      console.log('New tournament created:', data);
      
      // Update local state directly instead of fetching again
      if (data && data.length > 0) {
        setTournaments(prev => [...prev, data[0]]);
      }
      
      // Also fetch to make sure we have the latest data
      setTimeout(() => {
        fetchTournaments();
      }, 500);
      
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
    fetchAllInscriptions,
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
