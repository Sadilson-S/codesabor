import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTournament } from '../../contexts/TournamentContext';

interface TournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentId: string;
  gameName: string;
  gameImage: string;
  type: 'register' | 'waitlist';
}

const TournamentModal: React.FC<TournamentModalProps> = ({ isOpen, onClose, tournamentId, gameName, gameImage, type }) => {
  const { getRemainingSpots, registerPlayer, fetchTournaments } = useTournament();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const remainingSpots = getRemainingSpots(tournamentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    
    if (type === 'register') {
      // Form validation
      if (!name.trim()) {
        toast.error('Por favor, digite seu nome completo');
        return;
      }
      
      if (!whatsapp.trim()) {
        toast.error('Por favor, digite seu número de WhatsApp');
        return;
      }
      
      // Basic validation - just make sure it's not empty
      const formattedWhatsapp = whatsapp.replace(/\D/g, '');
      if (formattedWhatsapp.length < 8) {
        toast.error('Por favor, digite um número de WhatsApp válido');
        return;
      }

      setIsSubmitting(true);
      console.log('Processing registration for tournament:', tournamentId);
      
      try {
        // Use the registerPlayer function from TournamentContext instead of direct Supabase calls
        const { success, error } = await registerPlayer(tournamentId, name, formattedWhatsapp);
        
        if (!success) {
          console.error('Registration error:', error);
          
          // Show appropriate error message based on the error
          if (error === 'Você já está inscrito neste campeonato') {
            alert('Você já está inscrito neste campeonato!');
          } else if (error === 'Campeonato lotado') {
            alert('Este campeonato já está lotado!');
          } else {
            alert(`Erro ao realizar inscrição: ${error}`);
          }
          
          setIsSubmitting(false);
          return;
        }
        
        // Success - no page reload needed
        toast.success('Inscrição realizada com sucesso!');
        setRegistrationSuccess(true);
        
        // Update the remaining spots display
        setTimeout(() => {
          fetchTournaments();
        }, 500);
      } catch (error) {
        console.error('Exception during registration:', error);
        alert('Erro ao processar inscrição. Tente novamente.');
        setIsSubmitting(false);
      }
    } else {
      // For waitlist, open WhatsApp with a message
      const message = encodeURIComponent(
        `Olá! Quero ser avisado quando o campeonato de ${gameName} estiver disponível novamente.`
      );
      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">
            {type === 'register' ? 'Inscrição para Campeonato' : 'Lista de Espera'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {registrationSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Inscrição Confirmada!</h3>
              <p className="text-gray-600 mb-4">
                Sua inscrição para o campeonato de {gameName} foi realizada com sucesso.
              </p>
              <p className="text-sm text-gray-500">
                Fechando em alguns segundos...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <img src={gameImage} alt={gameName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{gameName}</h4>
                  {type === 'register' && (
                    <p className="text-sm text-gray-600">
                      Vagas restantes: {remainingSpots}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {!registrationSuccess && (
            <>
              {type === 'register' ? (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                      Número do WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Ex: 945390490"
                      required
                    />
                  </div>
                </>
              ) : (
                <p className="text-gray-600 mb-4">
                  Clique no botão abaixo para ser avisado quando houver vagas disponíveis para o campeonato de {gameName}.
                </p>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
                  type === 'register'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-orange-500 hover:bg-orange-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : type === 'register' ? (
                  'Inscrever-se'
                ) : (
                  'Quero ser avisado'
                )}
              </button>
            </>
          )}
          
          {registrationSuccess && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-lg font-medium text-white bg-gray-500 hover:bg-gray-600"
            >
              Fechar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TournamentModal;