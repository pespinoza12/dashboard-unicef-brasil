import { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Award, Zap, Smile } from 'lucide-react';

// ===== UNICEF DELIGHT SYSTEM COMPONENTS =====

// Inspirational messages related to UNICEF's mission
export const UNICEF_INSPIRATIONAL_MESSAGES = [
  "Cada ação aqui impacta milhares de crianças! 💝",
  "Juntos, construímos um futuro melhor para cada criança 🌟",
  "Seu trabalho transforma vidas - que incrível! ✨",
  "Cada tarefa completada = mais esperança no mundo 🌈",
  "Protegendo sorrisos, construindo futuros 😊",
  "Champions das crianças em ação! 🏆",
  "Fazendo a diferença, uma tarefa por vez 🚀",
  "O impacto do seu trabalho ecoa em gerações 💫"
];

// Loading messages with UNICEF spirit
export const LOADING_MESSAGES = [
  "Conectando corações ao redor do Brasil... 💙",
  "Organizando esperanças e sonhos... ✨",
  "Preparando momentos de impacto... 🌟",
  "Carregando histórias de transformação... 📚",
  "Sincronizando esforços pela infância... 🤝",
  "Reunindo forças para um futuro melhor... 💪"
];

// Success celebration messages
export const CELEBRATION_MESSAGES = [
  "Incrível! Mais uma vitória para as crianças! 🎉",
  "Parabéns! Cada conquista importa! 🌟",
  "Que progresso fantástico! 🚀",
  "Mais uma missão cumprida com sucesso! 🏆",
  "O impacto do seu trabalho é inspirador! 💖",
  "Celebrando cada passo rumo à mudança! 🎊"
];

// Confetti component for celebrations
export const ConfettiParticle = ({ color, delay }: { color: string; delay: number }) => {
  const style = {
    backgroundColor: color,
    left: Math.random() * 100 + '%',
    animationDelay: delay + 's',
    animationDuration: (2 + Math.random() * 2) + 's'
  };
  
  return <div className="confetti" style={style}></div>;
};

// Toast notification system
export const ToastNotification = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getEmoji = (type: string) => {
    switch (type) {
      case 'success': return '🎉';
      case 'celebration': return '🌟';
      case 'progress': return '🚀';
      case 'heart': return '💖';
      default: return '✨';
    }
  };

  return (
    <div className={`unicef-toast toast-${type}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{getEmoji(type)}</span>
        <span className="font-medium text-gray-800">{message}</span>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 ml-2 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Loading component with personality
export const DelightfulLoader = ({ message }: { message?: string }) => {
  const [currentMessage, setCurrentMessage] = useState(message || LOADING_MESSAGES[0]);
  
  useEffect(() => {
    if (!message) {
      const interval = setInterval(() => {
        setCurrentMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [message]);

  return (
    <div className="unicef-loading flex-col gap-4 p-8">
      <div className="flex gap-2">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
      <p className="text-center text-sm font-medium animate-pulse">{currentMessage}</p>
    </div>
  );
};

// Progress tracker with celebrations
export const ProgressCelebration = ({ completed, total, onMilestone }: { 
  completed: number; 
  total: number; 
  onMilestone?: (percentage: number) => void 
}) => {
  const percentage = Math.round((completed / total) * 100);
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    if (percentage > 0 && percentage % 25 === 0) {
      setShowCelebration(true);
      onMilestone && onMilestone(percentage);
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [percentage, onMilestone]);

  return (
    <div className={`progress-container ${showCelebration ? 'celebration-active' : ''}`}>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-center mt-2 font-medium text-gray-600">
        {completed} de {total} tarefas ({percentage}%)
      </div>
      {showCelebration && (
        <div className="text-center mt-2">
          <span className="text-lg animate-bounce">🎉 Marco alcançado! 🎉</span>
        </div>
      )}
    </div>
  );
};

// Floating hearts for special moments
export const FloatingHearts = ({ show, onComplete }: { show: boolean; onComplete: () => void }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-bounce"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: i * 0.2 + 's',
            animationDuration: '2s'
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
};

// Easter egg: Special interaction for UNICEF logo
export const UnicefLogoMagic = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const [clicks, setClicks] = useState(0);
  const [showMagic, setShowMagic] = useState(false);

  const handleClick = () => {
    setClicks(prev => prev + 1);
    onClick && onClick();
    
    if (clicks + 1 === 5) {
      setShowMagic(true);
      setTimeout(() => {
        setShowMagic(false);
        setClicks(0);
      }, 3000);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-300 relative ${showMagic ? 'animate-bounce scale-110' : ''}`}
    >
      {children}
      {showMagic && (
        <div className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-yellow-800 rounded-full px-2 py-1 font-bold animate-pulse">
          ✨ Magic!
        </div>
      )}
    </div>
  );
};

// Inspirational quote component
export const InspirationMoment = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [quote] = useState(() => 
    UNICEF_INSPIRATIONAL_MESSAGES[Math.floor(Math.random() * UNICEF_INSPIRATIONAL_MESSAGES.length)]
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="quote-container max-w-md mx-auto transform animate-pulse bg-white rounded-2xl shadow-2xl">
        <div className="text-center p-8">
          <div className="text-4xl mb-6">🌟</div>
          <p className="text-lg font-medium text-gray-800 mb-6 leading-relaxed">{quote}</p>
          <button 
            onClick={onClose}
            className="unicef-button text-sm px-8 py-3 flex items-center gap-2 mx-auto"
          >
            <Heart className="w-4 h-4" />
            <span>Continuar fazendo a diferença!</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Smart card hover effects hook
export const useCardHover = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (cardId: number, event: React.MouseEvent) => {
    setHoveredCard(cardId);
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return { hoveredCard, hoverPosition, handleMouseEnter, handleMouseLeave };
};

// Celebration trigger hook
export const useCelebrations = () => {
  const [celebrationCount, setCelebrationCount] = useState(0);

  const triggerCelebration = (type = 'success', message?: string) => {
    setCelebrationCount(prev => prev + 1);
    
    // Return celebration data for parent component to handle
    return {
      type,
      message: message || CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)],
      showConfetti: type === 'celebration' || celebrationCount % 3 === 0,
      showHearts: type === 'heart'
    };
  };

  return { triggerCelebration, celebrationCount };
};

// Motivational Empty State Component
export const MotivationalEmptyState = ({ columnKey }: { columnKey: string }) => {
  const getEmptyStateContent = (key: string) => {
    switch (key) {
      case 'critico':
        return {
          icon: '🌟',
          title: 'Ótimo! Nenhuma situação crítica!',
          subtitle: 'Momento perfeito para focar no crescimento! 🎉',
          message: 'Quando não há emergências, há espaço para inovação'
        };
      case 'esta_semana':
        return {
          icon: '🚀',
          title: 'Semana livre para planejar!',
          subtitle: 'Oportunidade de pensar estrategicamente ✨',
          message: 'Use este tempo para preparar conquistas futuras'
        };
      case 'proxima_reuniao':
        return {
          icon: '📅',
          title: 'Agenda organizada!',
          subtitle: 'Próxima reunião será tranquila! 📋',
          message: 'Planejamento é o segredo do sucesso'
        };
      case 'completadas':
        return {
          icon: '🏆',
          title: 'Aguardando suas conquistas!',
          subtitle: 'Cada missão cumprida faz a diferença! 💪',
          message: 'Grandes impactos começam com pequenas ações'
        };
      default:
        return {
          icon: '✨',
          title: 'Pronto para o impacto!',
          subtitle: 'Vamos fazer a diferença juntos!',
          message: 'Cada ação importa para as crianças'
        };
    }
  };

  const content = getEmptyStateContent(columnKey);

  return (
    <div className="empty-state text-center py-12">
      <div className="empty-state-icon text-6xl mb-4">{content.icon}</div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">{content.title}</h3>
      <p className="text-sm font-medium text-blue-600 mb-3">{content.subtitle}</p>
      <p className="text-xs text-gray-500 italic">{content.message}</p>
      <div className="mt-4">
        <div className="inline-block bg-blue-50 px-4 py-2 rounded-full">
          <span className="text-xs text-blue-700 font-medium">
            Arraste itens aqui ou crie uma nova missão 👆
          </span>
        </div>
      </div>
    </div>
  );
};

// Priority badge with enhanced visuals
export const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return {
          icon: <Zap className="w-4 h-4 animate-pulse" />,
          className: 'priority-urgent',
          text: 'Urgente'
        };
      case 'blocked':
        return {
          icon: <span className="w-4 h-4 text-center">⏸</span>,
          className: 'bg-orange-100 text-orange-800 border-orange-300',
          text: 'Bloqueado'
        };
      case 'high':
        return {
          icon: <Star className="w-4 h-4 animate-bounce" />,
          className: 'priority-high',
          text: 'Alto'
        };
      case 'medium':
        return {
          icon: <Star className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />,
          className: 'priority-medium',
          text: 'Médio'
        };
      case 'low':
        return {
          icon: <Heart className="w-4 h-4 heart-beat" />,
          className: 'priority-low',
          text: 'Baixo'
        };
      default:
        return {
          icon: <Sparkles className="w-4 h-4" />,
          className: 'bg-gray-100 text-gray-800 border-gray-300',
          text: 'Normal'
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-110 ${config.className} flex items-center space-x-1`}>
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

export default {
  ConfettiParticle,
  ToastNotification,
  DelightfulLoader,
  ProgressCelebration,
  FloatingHearts,
  UnicefLogoMagic,
  InspirationMoment,
  useCardHover,
  useCelebrations,
  MotivationalEmptyState,
  PriorityBadge
};