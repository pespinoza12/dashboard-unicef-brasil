import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, Calendar, User, MessageSquare, Phone, Target, Settings, Plus, ChevronRight, Edit2, Save, X, Trash2 } from 'lucide-react';

// Componente para editar cards
const EditCardForm = ({ cardId, kanbanData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    // Encontrar el card en cualquier columna
    for (const column of Object.values(kanbanData)) {
      const card = column.items.find(item => item.id === cardId);
      if (card) return { ...card };
    }
    return {};
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const priorities = [
    { value: 'urgent', label: 'Urgente', color: 'bg-red-100 text-red-800' },
    { value: 'blocked', label: 'Bloqueado', color: 'bg-orange-100 text-orange-800' },
    { value: 'high', label: 'Alto', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Médio', color: 'bg-purple-100 text-purple-800' },
    { value: 'low', label: 'Baixo', color: 'bg-green-100 text-green-800' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Impacto</label>
        <textarea
          value={formData.impact || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
          rows={2}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
          <input
            type="text"
            value={formData.responsible || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, responsible: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prazo</label>
          <input
            type="text"
            value={formData.deadline || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
        <select
          value={formData.priority || 'medium'}
          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {priorities.map(priority => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ação Requerida</label>
        <textarea
          value={formData.actionRequired || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, actionRequired: e.target.value }))}
          rows={2}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Atualização</label>
        <textarea
          value={formData.updateText || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, updateText: e.target.value }))}
          rows={2}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Salvar</span>
        </button>
      </div>
    </form>
  );
};

const UnicefKanbanDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [draggedCard, setDraggedCard] = useState(null);

  // Dados iniciais das reuniões organizados em formato Kanban
  const initialKanbanData = {
    critico: {
      title: "🚨 CRÍTICO - Ação Imediata",
      color: "bg-red-50 border-red-200",
      headerColor: "bg-red-600",
      items: [
        {
          id: 1,
          title: "Lista SMS WhatsApp Sem Cases",
          description: "Lista 'Unread incoming SMS' com muitas mensagens sem cases criados automaticamente",
          impact: "Donadores esperando resposta há dias sem atendimento - risco alto cancelamentos",
          responsible: "Saurav + Luciana + Giovanni",
          deadline: "URGENTE - 24/07/2025",
          priority: "urgent",
          lastUpdate: "23/07/2025",
          author: "Carol + Luciana",
          updateText: "Identificado na reunião Partner Community - casos não sendo criados para mensagens WhatsApp",
          actionRequired: "Corrigir API para criar cases automaticamente para retention e digital"
        },
        {
          id: 2,
          title: "Azure Integration User Bloqueando Cases",
          description: "Cases escalados sendo assignados para Azure Integration User (não está em nenhuma fila)",
          impact: "Equipe WA não consegue acessar casos escalados - bloqueio operacional total",
          responsible: "Saurav + Giovanni",
          deadline: "URGENTE - 24/07/2025",
          priority: "urgent",
          lastUpdate: "23/07/2025",
          author: "Luciana + Giovanni",
          updateText: "API não tem campo owner, casos vão para user integração sem acesso equipes",
          actionRequired: "Adicionar owner field na API + mapear queue IDs corretos"
        },
        {
          id: 3,
          title: "Templates WhatsApp Junho Sumidos",
          description: "Templates de junho não aparecem no Partner Community - impossível responder conversas",
          impact: "Operação WhatsApp parada - não consegue responder donadores dentro 24h",
          responsible: "Saurav + Partner Community Team",
          deadline: "URGENTE - 24/07/2025",
          priority: "urgent",
          lastUpdate: "23/07/2025",
          author: "Daisy + Carol",
          updateText: "Templates sumiram após atualização - campo resposta desabilitado",
          actionRequired: "Recuperar templates junho + verificar permissões Partner Community"
        },
        {
          id: 4,
          title: "Middleware Vindi-Salesforce",
          description: "Necessário para correção definitiva dos problemas de integração + owner field API",
          impact: "Sem isso, problemas de duplicação e sincronização continuam + casos perdidos",
          responsible: "Giovanni + Equipe TI",
          deadline: "25/07/2025",
          priority: "urgent",
          lastUpdate: "23/07/2025",
          author: "Giovanni",
          updateText: "Middleware é solução definitiva + necessário adicionar owner field para assignment",
          actionRequired: "Priorizar desenvolvimento middleware + implementar owner field API"
        },
        {
          id: 5,
          title: "Backoffices Sobrecarregadas",
          description: "Backoffices com sobrecarga crítica + problemas manuais duplicação donadores",
          impact: "Operação manual comprometida + sistema duplicação não funciona",
          responsible: "Deisilany + Ana UNICEF",
          deadline: "HOJE - 23/07/2025",
          priority: "urgent",
          lastUpdate: "23/07/2025",
          author: "Deisilany Santos",
          updateText: "Backoffices fazendo duplicação manual na VIND - cancelamentos, reversões, aumentos",
          actionRequired: "Implementar API VIND para ações massivas + redistribuir cargas"
        }
      ]
    },
    esta_semana: {
      title: "📊 ESTA SEMANA - Acompanhar",
      color: "bg-yellow-50 border-yellow-200",
      headerColor: "bg-yellow-600",
      items: [
        {
          id: 6,
          title: "✅ Migração Partner COMPLETADA",
          description: "Solução provisória de Giovanni implementada com sucesso",
          impact: "Sistema Partner funcionando com solução temporária",
          responsible: "Giovanni",
          deadline: "✅ COMPLETADO - 21/07/2025",
          priority: "high",
          lastUpdate: "21/07/2025",
          author: "Giovanni",
          updateText: "✅ Migração concluída com solução provisória. Sistema operacional.",
          actionRequired: "Planejar implementação da solução definitiva",
          completed: true
        },
        {
          id: 7,
          title: "Solução Temporária Bot WhatsApp",
          description: "Implementar mensagem automática direcionando donadores para 0800",
          impact: "Reduzir irritação donadores + evitar cancelamentos por problemas bot",
          responsible: "Saurav + Carol (conteúdo mensagem)",
          deadline: "HOJE - 23/07/2025",
          priority: "urgent",
          lastUpdate: "23/07/2025",
          author: "Pedro + Carol",
          updateText: "Decisão reunião: bot com mensagem temporária direcionando para 0800 até correções",
          actionRequired: "Carol criar conteúdo mensagem + Saurav implementar hoje"
        },
        {
          id: 8,
          title: "✅ Campanha Saving FUNCIONANDO",
          description: "Reativada com dados Vindi - usando 3 últimos pagamentos como base",
          impact: "Operação saving normalizada com dados corretos",
          responsible: "Deisilany + Equipe Vindi",
          deadline: "✅ ATIVO - 23/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Deisilany Santos",
          updateText: "✅ Saving rodando bem, meninas conseguindo contato e batendo resultados com 3 últimos pagamentos VIND",
          actionRequired: "Continuar monitoramento performance",
          completed: true
        },
        {
          id: 9,
          title: "Problemas Receipt Generation/Envio",
          description: "Múltiplos problemas: calendário não aparece para Daisy, não consegue enviar recibos",
          impact: "Donadores não recebem recibos mesmo após pagamento - insatisfação",
          responsible: "Saurav + Luciana",
          deadline: "25/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Daisy + Carol",
          updateText: "Calendário sumiu para alguns usuários + botão envio email não aparece",
          actionRequired: "Verificar permissões + corrigir interface geração recibos"
        },
        {
          id: 10,
          title: "Customer Mobile Number Format Issues",
          description: "Campo mobile sem '+' causando falha na automação WhatsApp",
          impact: "Mensagens WhatsApp não sendo enviadas por formato incorreto número",
          responsible: "Saurav + Bruno (database update)",
          deadline: "26/07/2025",
          priority: "medium",
          lastUpdate: "23/07/2025",
          author: "Saurav",
          updateText: "Fórmula backend não copia corretamente customer mobile number field",
          actionRequired: "Bruno atualizar database + corrigir fórmula backend"
        },
        {
          id: 11,
          title: "Recuperação Histórico BI",
          description: "Ana UNICEF pedindo recuperação de dados dos anos anteriores",
          impact: "Necessário para análises históricas e comparativas",
          responsible: "Giovanni + Ana UNICEF",
          deadline: "30/07/2025",
          priority: "medium",
          lastUpdate: "22/07/2025",
          author: "Ana UNICEF",
          updateText: "Solicitação formal para recuperação de histórico BI anos anteriores",
          actionRequired: "Avaliar viabilidade técnica e cronograma de recuperação"
        },
        {
          id: 12,
          title: "Negociação SFTP UNICEF-Stilo-WA",
          description: "Negociação para SFTP comum entre as três entidades",
          impact: "Melhorar integração e fluxo de dados entre sistemas",
          responsible: "Deisilany + Parceiros",
          deadline: "31/07/2025",
          priority: "medium",
          lastUpdate: "22/07/2025",
          author: "Deisilany Santos",
          updateText: "Iniciando negociações para estabelecer SFTP comum entre UNICEF-Stilo-WA",
          actionRequired: "Coordenar reunião com todas as partes envolvidas"
        }
      ]
    },
    proxima_reuniao: {
      title: "📅 PRÓXIMA REUNIÃO - Verificar",
      color: "bg-green-50 border-green-200", 
      headerColor: "bg-green-600",
      items: [
        {
          id: 13,
          title: "✅ Search Functionality RESOLVIDO",
          description: "Busca por CPF/nome funcionando corretamente no sistema",
          impact: "Equipe pode localizar donadores eficientemente",
          responsible: "Saurav + Team",
          deadline: "✅ RESOLVIDO - 23/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Saurav",
          updateText: "✅ Funcionalidade busca testada e funcionando durante reunião Partner Community",
          actionRequired: "Monitorar funcionamento contínuo",
          completed: true
        },
        {
          id: 14,
          title: "Status Cases Assignment Rules",
          description: "Verificar se correção owner field API está funcionando para cases escalados",
          impact: "Cases chegando nas filas corretas para atendimento",
          responsible: "Saurav + Giovanni + Luciana",
          deadline: "30/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Luciana + Giovanni",
          updateText: "Aguardando confirmação implementação owner field + teste assignment rules",
          actionRequired: "Testar cases escalados chegando WA queue + não Azure Integration User"
        },
        {
          id: 15,
          title: "Relatório Bugs Organizados",
          description: "Jenny + Yolima reunião com exemplos específicos de problemas WhatsApp",
          impact: "Documentação completa para correções efetivas",
          responsible: "Jenny + Yolima + Equipe",
          deadline: "30/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Carol + Jenny",
          updateText: "Necessário organizar casos concretos donadores reais com CPF para identificação",
          actionRequired: "Criar Excel com CPF, problema, situação para equipe global abordar"
        },
        {
          id: 16,
          title: "Status Solução Temporária Bot 0800",
          description: "Verificar se mensagem temporária reduziu irritação donadores",
          impact: "Evitar cancelamentos + melhorar experiência doador durante correções",
          responsible: "Saurav + Carol + Deisilany",
          deadline: "30/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Pedro + Carol",
          updateText: "Implementar mensagem direcionando para 0800 até bot funcionar 100%",
          actionRequired: "Coletar feedback donadores + métricas cancelamento receptivo"
        },
        {
          id: 17,
          title: "Integração 4 Novatos - Sistema Partner",
          description: "4 novatos muito bons ainda não começaram atender - integração urgente",
          impact: "Reforço operacional necessário para demanda atual",
          responsible: "Deisilany + Giovanni + RH",
          deadline: "30/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Deisilany Santos",
          updateText: "4 pessoas muito boas contratadas mas ainda não operando por integração pendente",
          actionRequired: "Acelerar treinamento Partner + liberar para operação"
        },
        {
          id: 18,
          title: "Status Upgrade Campaign Base",
          description: "Verificar se chegou base dados para campanha upgrade - operadoras ociosas",
          impact: "Operadoras upgrade sem trabalho - ociosidade operacional",
          responsible: "Deisilany + UNICEF",
          deadline: "30/07/2025",
          priority: "medium",
          lastUpdate: "23/07/2025",
          author: "Deisilany Santos",
          updateText: "Operadoras upgrade fazendo apenas treinamento reciclagem - sem base dados",
          actionRequired: "Verificar status base upgrade ou realocar operadoras para saving/receptivo"
        },
        {
          id: 19,
          title: "Status Middleware Vindi-Salesforce",
          description: "Acompanhar desenvolvimento da solução definitiva + owner field API",
          impact: "Solução definitiva para problemas de integração + cases perdidos",
          responsible: "Giovanni + Equipe TI",
          deadline: "30/07/2025",
          priority: "high",
          lastUpdate: "23/07/2025",
          author: "Giovanni",
          updateText: "Middleware + owner field são soluções definitivas para múltiplos problemas",
          actionRequired: "Verificar cronograma desenvolvimento + possíveis bloqueios"
        },
        {
          id: 20,
          title: "Status Recuperação Histórico BI",
          description: "Acompanhar progresso da recuperação solicitada pela Ana UNICEF",
          impact: "Importante para análises históricas comparativas",
          responsible: "Giovanni + Ana UNICEF",
          deadline: "30/07/2025",
          priority: "medium",
          lastUpdate: "22/07/2025",
          author: "Ana UNICEF",
          updateText: "Acompanhar viabilidade técnica e cronograma de recuperação",
          actionRequired: "Definir escopo e prazo para recuperação do histórico"
        }
      ]
    }
  };

  // Estado mutable del Kanban con localStorage y version control
  const [kanbanData, setKanbanData] = useState(() => {
    const saved = localStorage.getItem('unicef-kanban-data');
    const version = localStorage.getItem('unicef-kanban-version');
    const currentVersion = '2025-07-30-v5'; // Version post-reunión 30/07 (Catchup Semanal - FORÇAR ATUALIZAÇÃO)
    
    // Si no hay version guardada o es antigua, usar datos actualizados
    if (!version || version !== currentVersion) {
      localStorage.setItem('unicef-kanban-version', currentVersion);
      localStorage.setItem('unicef-kanban-data', JSON.stringify(initialKanbanData));
      return initialKanbanData;
    }
    
    return saved ? JSON.parse(saved) : initialKanbanData;
  });

  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    localStorage.setItem('unicef-kanban-data', JSON.stringify(kanbanData));
  }, [kanbanData]);

  // Funciones para manejar drag & drop
  const handleDragStart = (e, card, sourceColumn) => {
    setDraggedCard({ card, sourceColumn });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedCard) return;

    const { card, sourceColumn } = draggedCard;
    if (sourceColumn === targetColumn) return;

    setKanbanData(prev => {
      const newData = { ...prev };
      
      // Remover del origen
      newData[sourceColumn] = {
        ...newData[sourceColumn],
        items: newData[sourceColumn].items.filter(item => item.id !== card.id)
      };
      
      // Agregar al destino
      newData[targetColumn] = {
        ...newData[targetColumn],
        items: [...newData[targetColumn].items, card]
      };
      
      return newData;
    });

    setDraggedCard(null);
  };

  // Función para crear nuevo card
  const createNewCard = (columnKey) => {
    const newCard = {
      id: Date.now(),
      title: "Novo Item",
      description: "Clique para editar a descrição",
      impact: "Definir impacto",
      responsible: "Responsável",
      deadline: new Date().toLocaleDateString('pt-BR'),
      priority: "medium",
      lastUpdate: new Date().toLocaleDateString('pt-BR'),
      author: "Usuário",
      updateText: "Item criado",
      actionRequired: "Definir ação necessária"
    };

    setKanbanData(prev => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        items: [...prev[columnKey].items, newCard]
      }
    }));

    setEditingCard(newCard.id);
  };

  // Função para editar card
  const updateCard = (cardId, updatedCard) => {
    setKanbanData(prev => {
      const newData = { ...prev };
      
      Object.keys(newData).forEach(columnKey => {
        const itemIndex = newData[columnKey].items.findIndex(item => item.id === cardId);
        if (itemIndex !== -1) {
          newData[columnKey].items[itemIndex] = {
            ...newData[columnKey].items[itemIndex],
            ...updatedCard,
            lastUpdate: new Date().toLocaleDateString('pt-BR')
          };
        }
      });
      
      return newData;
    });
  };

  // Función para eliminar card
  const deleteCard = (cardId) => {
    setKanbanData(prev => {
      const newData = { ...prev };
      
      Object.keys(newData).forEach(columnKey => {
        newData[columnKey] = {
          ...newData[columnKey],
          items: newData[columnKey].items.filter(item => item.id !== cardId)
        };
      });
      
      return newData;
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-800 border-red-300",
      blocked: "bg-orange-100 text-orange-800 border-orange-300",
      high: "bg-blue-100 text-blue-800 border-blue-300",
      medium: "bg-purple-100 text-purple-800 border-purple-300",
      low: "bg-green-100 text-green-800 border-green-300"
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      urgent: <AlertTriangle className="w-4 h-4" />,
      blocked: <Clock className="w-4 h-4" />,
      high: <Target className="w-4 h-4" />,
      medium: <Calendar className="w-4 h-4" />,
      low: <CheckCircle className="w-4 h-4" />
    };
    return icons[priority] || <Calendar className="w-4 h-4" />;
  };

  const getItemCount = (column) => kanbanData[column].items.length;
  const getUrgentCount = () => kanbanData.critico.items.filter(item => item.priority === 'urgent').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6 p-3">
                  <img src="/images/wa-logo.png" alt="WA Contact Center" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    PAINEL KANBAN UNICEF BRASIL
                  </h1>
                  <p className="text-blue-100 text-xl font-medium">
                    Acompanhamento Executivo • Reuniões Deisilany Santos
                  </p>
                </div>
              </div>
              
              <div className="text-right flex items-center space-x-4">
                <button
                  onClick={() => {
                    localStorage.setItem('unicef-kanban-version', '2025-07-30-v5');
                    localStorage.setItem('unicef-kanban-data', JSON.stringify(initialKanbanData));
                    setKanbanData(initialKanbanData);
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm font-medium transition-all"
                >
                  🔄 Atualizar Dados
                </button>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-3xl font-bold text-red-300">{getUrgentCount()}</div>
                  <div className="text-blue-200 text-sm">Itens Críticos</div>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-white">40,31%</div>
                <div className="text-blue-200 text-sm">Receptivo (23/07)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-white">37,67%</div>
                <div className="text-blue-200 text-sm">WhatsApp (23/07)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-white">55,17%</div>
                <div className="text-blue-200 text-sm">E-mail (23/07)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-lg font-bold text-white">30/07/2025</div>
                <div className="text-blue-200 text-sm">Próxima Reunião</div>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(kanbanData).map(([columnKey, column]) => (
            <div key={columnKey} className="bg-white rounded-xl shadow-lg border overflow-hidden">
              {/* Column Header */}
              <div className={`${column.headerColor} text-white p-4`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{column.title}</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium">{getItemCount(columnKey)}</span>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div 
                className={`${column.color} p-4 min-h-[600px]`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, columnKey)}
              >
                <div className="space-y-4">
                  {column.items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, columnKey)}
                      className={`${item.completed ? 'bg-green-50 border-green-200 opacity-75' : 'bg-white'} rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 cursor-move hover:-translate-y-1 group`}
                    >
                      <div className="p-4">
                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-gray-800 text-sm flex-1">{item.title}</h4>
                          <div className="flex items-center space-x-2">
                            {/* Botones de edición */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingCard(item.id);
                                }}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                title="Editar"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCard(item);
                                }}
                                className="p-1 text-green-600 hover:bg-green-100 rounded"
                                title="Ver detalhes"
                              >
                                <ChevronRight className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm('Deseja realmente excluir este item?')) {
                                    deleteCard(item.id);
                                  }
                                }}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                title="Excluir"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)} flex items-center space-x-1`}>
                              {getPriorityIcon(item.priority)}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                        {/* Impact */}
                        <div className="bg-gray-50 rounded p-2 mb-3">
                          <div className="text-xs font-medium text-gray-600 mb-1">Impacto:</div>
                          <div className="text-xs text-gray-800">{item.impact}</div>
                        </div>

                        {/* Responsible & Deadline */}
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{item.responsible}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span className="font-medium">{item.deadline}</span>
                          </div>
                        </div>

                        {/* Last Update */}
                        <div className="border-t pt-2">
                          <div className="text-xs text-gray-600 mb-1">Última atualização:</div>
                          <div className="text-xs text-gray-800">{item.updateText}</div>
                        </div>

                        {/* Action Required */}
                        {columnKey === 'proxima_reuniao' && (
                          <div className="mt-2 bg-blue-50 rounded p-2">
                            <div className="text-xs font-medium text-blue-600 mb-1">⚡ Verificar na reunião:</div>
                            <div className="text-xs text-blue-800">{item.actionRequired}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Card Button */}
                  <button 
                    onClick={() => createNewCard(columnKey)}
                    className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:bg-gray-200 hover:border-gray-400 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm">Adicionar item</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/images/wa-logo.png" alt="WA Contact Center" className="w-5 h-5 object-contain" />
            <p className="text-sm font-medium">Dashboard UNICEF Brasil - WA Contact Center</p>
          </div>
          <p className="text-xs">💝 Base: 100,000+ doadores | 👩‍💼 Gerente: Deisilany Santos | 🏢 Brasília</p>
          <p className="text-xs text-gray-400 mt-1">Atualizado: 23/07/2025 | Powered by Claude Code Agent</p>
        </div>
      </div>

      {/* Modal para detalhes do card */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedCard.title}</h3>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Descrição:</h4>
                  <p className="text-gray-600">{selectedCard.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Impacto:</h4>
                  <p className="text-gray-600">{selectedCard.impact}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Responsável:</h4>
                    <p className="text-gray-600">{selectedCard.responsible}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Prazo:</h4>
                    <p className="text-gray-600">{selectedCard.deadline}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Última Atualização:</h4>
                  <p className="text-gray-600">{selectedCard.updateText}</p>
                  <p className="text-sm text-gray-500 mt-1">Por: {selectedCard.author} em {selectedCard.lastUpdate}</p>
                </div>
                
                {selectedCard.actionRequired && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">⚡ Ação Requerida:</h4>
                    <p className="text-blue-700">{selectedCard.actionRequired}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Editar Item</h3>
                <button
                  onClick={() => setEditingCard(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <EditCardForm 
                cardId={editingCard}
                kanbanData={kanbanData}
                onSave={(updatedCard) => {
                  updateCard(editingCard, updatedCard);
                  setEditingCard(null);
                }}
                onCancel={() => setEditingCard(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnicefKanbanDashboard;