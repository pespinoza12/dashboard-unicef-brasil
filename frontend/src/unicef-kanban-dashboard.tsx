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
          title: "Duplicação Cadastros no Vind",
          description: "Consulta frontal mostra apenas 1, mas existem múltiplos ativos",
          impact: "Risco cobrança indevida aos doadores",
          responsible: "Deisilany + Giovanni",
          deadline: "HOJE - 17/07/2025",
          priority: "urgent",
          lastUpdate: "17/07/2025",
          author: "Deisilany Santos",
          updateText: "Problema crítico identificado na consulta. E-mail enviado para UNICEF.",
          actionRequired: "Verificar se UNICEF já começou deduplicação"
        },
        {
          id: 2,
          title: "Power BI Parado - 2 Dias",
          description: "Sistema não atualiza há 2 dias - problema banco de dados",
          impact: "Impossível analisar resultados com precisão",
          responsible: "Carlos + Giovanni",
          deadline: "HOJE - 17/07/2025", 
          priority: "urgent",
          lastUpdate: "17/07/2025",
          author: "Pedro Espinoza",
          updateText: "Carlos vai revisar problema no banco de dados hoje",
          actionRequired: "Cobrar status da revisão do Carlos"
        },
        {
          id: 3,
          title: "Campanha Saving Paralisada",
          description: "Dados UNICEF importados com datas erradas (tudo dia 10)",
          impact: "Impossível fazer análise dos doadores",
          responsible: "UNICEF + Deisilany",
          deadline: "HOJE - 17/07/2025",
          priority: "blocked",
          lastUpdate: "17/07/2025",
          author: "Deisilany Santos", 
          updateText: "E-mail enviado para UNICEF solicitando correção das datas",
          actionRequired: "Aguardar resposta UNICEF sobre correção"
        }
      ]
    },
    esta_semana: {
      title: "📊 ESTA SEMANA - Acompanhar",
      color: "bg-yellow-50 border-yellow-200",
      headerColor: "bg-yellow-600",
      items: [
        {
          id: 4,
          title: "Migração Infobip → Parting",
          description: "Infobip desativado às 9:30h - Parting ainda não 100%",
          impact: "WhatsApp Digital em transição crítica",
          responsible: "Deisilany + Carolina",
          deadline: "20/07/2025",
          priority: "high",
          lastUpdate: "17/07/2025",
          author: "Deisilany Santos",
          updateText: "Campos em inglês dificultando operação. Cases desaparecidas no Parting.",
          actionRequired: "Reunião com Carolina hoje 14:30-15:30 para resolver"
        },
        {
          id: 5,
          title: "Desligamento Mariana Ganda",
          description: "Retorno de férias + desligamento programado",
          impact: "Equipe fica com 37 colaboradores (número correto)",
          responsible: "Daniela Belmock + RH",
          deadline: "19/07/2025",
          priority: "medium",
          lastUpdate: "09/07/2025",
          author: "Daniela Belmock",
          updateText: "Indenização será feita pelo RH. Não colocamos no plano de saúde novo.",
          actionRequired: "Confirmar que processo foi concluído"
        },
        {
          id: 6,
          title: "Resultados Operacionais",
          description: "Receptivo: 42.53% | Digital: 39.06% (em recuperação)",
          impact: "Manter resultados apesar dos desafios",
          responsible: "Deisilany + Equipe",
          deadline: "21/07/2025",
          priority: "high",
          lastUpdate: "17/07/2025",
          author: "Deisilany Santos",
          updateText: "Equipe conseguiu manter 50% reversão no dia da migração",
          actionRequired: "Acompanhar evolução pós-migração Parting"
        },
        {
          id: 7,
          title: "Reuniões Ana + Carolina",
          description: "Ana (11h-12h) + Carolina (14:30-15:30) hoje",
          impact: "Definir procedimentos backoffice por 1 mês",
          responsible: "Deisilany",
          deadline: "17/07/2025 - HOJE",
          priority: "high",
          lastUpdate: "17/07/2025",
          author: "Deisilany Santos",
          updateText: "Reuniões agendadas para alinhamento procedimentos manuais",
          actionRequired: "Participar das reuniões e definir continuidade"
        }
      ]
    },
    proxima_reuniao: {
      title: "📅 PRÓXIMA REUNIÃO - Verificar",
      color: "bg-green-50 border-green-200", 
      headerColor: "bg-green-600",
      items: [
        {
          id: 8,
          title: "Novo BI - Status Giovanni",
          description: "Estrutura nova prometida para próxima semana",
          impact: "Carregamento muito mais rápido - Ana para de reclamar",
          responsible: "Giovanni + Pedro",
          deadline: "24/07/2025",
          priority: "medium",
          lastUpdate: "17/07/2025",
          author: "Pedro Espinoza",
          updateText: "Terça ou quarta próxima semana deve estar pronto",
          actionRequired: "Confirmar se Giovanni cumpriu prazo"
        },
        {
          id: 9,
          title: "Base Upgrade - Chegou?",
          description: "UNICEF não gerou ainda por problema segmentação",
          impact: "Equipe upgrade ajudando no Infobip",
          responsible: "UNICEF + Deisilany",
          deadline: "24/07/2025",
          priority: "medium",
          lastUpdate: "17/07/2025",
          author: "Deisilany Santos",
          updateText: "Base será enviada posteriormente - aguardando",
          actionRequired: "Perguntar se UNICEF já enviou a base"
        },
        {
          id: 10,
          title: "Campanha Elétricas - Resultados",
          description: "7 sucessos em 5 dias - tendência positiva",
          impact: "Melhor contactabilidade que base anterior",
          responsible: "Deisilany + Equipe",
          deadline: "24/07/2025",
          priority: "low",
          lastUpdate: "09/07/2025",
          author: "Deisilany Santos",
          updateText: "Autorização boleto melhorou muito os resultados",
          actionRequired: "Pedir números atualizados da campanha"
        },
        {
          id: 11,
          title: "4 Novatos - Começaram Atender?",
          description: "Equipe muito boa, ainda não começaram operação",
          impact: "Reforço importante para a operação",
          responsible: "Deisilany + Supervisores",
          deadline: "24/07/2025",
          priority: "medium",
          lastUpdate: "09/07/2025",
          author: "Deisilany Santos", 
          updateText: "Muito empolgados e interessados no trabalho",
          actionRequired: "Verificar quando vão começar a atender"
        },
        {
          id: 12,
          title: "Treinamento Novas Tabulações",
          description: "UNICEF simplificou várias tabulações",
          impact: "Equipe precisa se adaptar às mudanças",
          responsible: "Deisilany",
          deadline: "24/07/2025",
          priority: "medium",
          lastUpdate: "09/07/2025",
          author: "Deisilany Santos",
          updateText: "Material preparado para aplicar na segunda-feira",
          actionRequired: "Confirmar se treinamento foi aplicado"
        }
      ]
    }
  };

  // Estado mutable del Kanban con localStorage
  const [kanbanData, setKanbanData] = useState(() => {
    const saved = localStorage.getItem('unicef-kanban-data');
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
              
              <div className="text-right">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-3xl font-bold text-red-300">{getUrgentCount()}</div>
                  <div className="text-blue-200 text-sm">Itens Críticos</div>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-white">37</div>
                <div className="text-blue-200 text-sm">Colaboradores Ativos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-white">42.53%</div>
                <div className="text-blue-200 text-sm">Receptivo (atual)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-white">39.06%</div>
                <div className="text-blue-200 text-sm">Digital (recuperando)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-lg font-bold text-white">24/07/2025</div>
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
                      className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 cursor-move hover:-translate-y-1 group"
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
          <p className="text-xs text-gray-400 mt-1">Atualizado: 17/07/2025 | Powered by Claude Code Agent</p>
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