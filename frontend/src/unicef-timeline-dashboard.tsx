import { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, Calendar, User, TrendingUp, MessageSquare, Phone, Target, Settings } from 'lucide-react';

const UnicefTimelineDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('hoje');

  // Dados reais das reuniões com Deisilany Santos
  const timelineData = {
    hoje: {
      title: "HOJE - Ações Imediatas",
      items: [
        {
          id: 1,
          type: "critico",
          title: "Duplicação Cadastros no Vind",
          description: "Consulta frontal retorna apenas 1 cadastro, mas existem múltiplos ativos",
          impact: "Risco de cobrança indevida aos doadores",
          responsible: "Deisilany + Giovanni",
          deadline: "Hoje - 17/07/2025",
          status: "urgent",
          lastUpdate: "17/07/2025 - Deisilany: Problema crítico identificado"
        },
        {
          id: 2,
          type: "critico", 
          title: "Power BI sem Atualizar - 2 Dias",
          description: "Sistema não atualiza há 2 dias - problema no banco de dados",
          impact: "Impossível analisar resultados precisos",
          responsible: "Carlos + Giovanni",
          deadline: "Hoje - 17/07/2025",
          status: "urgent",
          lastUpdate: "17/07/2025 - Pedro: Carlos vai revisar problema"
        },
        {
          id: 3,
          type: "bloqueador",
          title: "Campanha Saving Paralisada",
          description: "Dados importados UNICEF com datas erradas (tudo marcado dia 10)",
          impact: "Impossível fazer análise dos doadores para saving",
          responsible: "UNICEF + Deisilany",
          deadline: "Hoje - 17/07/2025",
          status: "blocked",
          lastUpdate: "17/07/2025 - Deisilany: E-mail enviado para UNICEF"
        }
      ]
    },
    esta_semana: {
      title: "ESTA SEMANA - Acompanhar de Perto",
      items: [
        {
          id: 4,
          type: "sistema",
          title: "Migração Infobip → Parting",
          description: "Infobip desativado 9:30h - Parting ainda não 100% funcional",
          impact: "WhatsApp Digital em transição crítica",
          responsible: "Deisilany + Carolina + Equipe",
          deadline: "20/07/2025",
          status: "in_progress",
          lastUpdate: "17/07/2025 - Deisilany: Campos em inglês dificultando operação"
        },
        {
          id: 5,
          type: "equipe",
          title: "Mariana Ganda - Desligamento",
          description: "Retorno de férias - desligamento programado por RH",
          impact: "Equipe ficará com 37 colaboradores (número correto)",
          responsible: "Daniela Belmock + RH",
          deadline: "19/07/2025",
          status: "planned",
          lastUpdate: "09/07/2025 - Daniela: Indenização será feita pelo RH"
        },
        {
          id: 6,
          type: "campanha",
          title: "Campanha Elétricas - Monitorar Resultados",
          description: "7 sucessos em 5 dias - tendência positiva com boleto autorizado",
          impact: "Melhor contactabilidade que base anterior",
          responsible: "Deisilany + Equipe Operações",
          deadline: "21/07/2025",
          status: "positive",
          lastUpdate: "09/07/2025 - Deisilany: Menos gente falecida, mais contato com vivos"
        },
        {
          id: 7,
          type: "reuniao",
          title: "Reunião Ana (11h-12h) + Carolina (14:30-15:30)",
          description: "Followup + alinhamento procedimentos backoffice",
          impact: "Definir continuidade trabalho manual por 1 mês",
          responsible: "Deisilany",
          deadline: "17/07/2025 - Hoje",
          status: "scheduled",
          lastUpdate: "17/07/2025 - Deisilany: Cases desaparecidas no Parting"
        }
      ]
    },
    proximas_2_semanas: {
      title: "PRÓXIMAS 2 SEMANAS - Planejamento",
      items: [
        {
          id: 8,
          type: "desenvolvimento",
          title: "Novo BI - Giovanni",
          description: "Estrutura nova do BI pronta para carregamento mais rápido",
          impact: "Ana não vai mais reclamar da lentidão do Power BI",
          responsible: "Giovanni + Pedro",
          deadline: "23/07/2025",
          status: "development",
          lastUpdate: "17/07/2025 - Pedro: Próxima semana terça/quarta pronto"
        },
        {
          id: 9,
          type: "treinamento",
          title: "Treinamento Novas Tabulações",
          description: "UNICEF alterou várias tabulações - simplificação geral",
          impact: "Equipe precisa se adaptar às mudanças",
          responsible: "Deisilany + Equipe",
          deadline: "22/07/2025",
          status: "planned",
          lastUpdate: "09/07/2025 - Deisilany: Material preparado para segunda-feira"
        },
        {
          id: 10,
          type: "campanha",
          title: "Base Upgrade - Aguardando Segmentação",
          description: "UNICEF não gerou base ainda por problema segmentação",
          impact: "Equipe upgrade parada - ajudando no Infobip",
          responsible: "UNICEF + Deisilany",
          deadline: "25/07/2025",
          status: "waiting",
          lastUpdate: "17/07/2025 - Deisilany: Base será enviada posteriormente"
        },
        {
          id: 11,
          type: "novatos",
          title: "4 Novatos - Início Atendimento",
          description: "Equipe muito boa e interessada - ainda não começaram atender",
          impact: "Reforço para operação",
          responsible: "Deisilany + Supervisores",
          deadline: "30/07/2025",
          status: "ready",
          lastUpdate: "09/07/2025 - Deisilany: Muito empolgados e interessados"
        }
      ]
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      urgent: "bg-red-100 border-red-500 text-red-800",
      blocked: "bg-orange-100 border-orange-500 text-orange-800", 
      in_progress: "bg-blue-100 border-blue-500 text-blue-800",
      planned: "bg-purple-100 border-purple-500 text-purple-800",
      positive: "bg-green-100 border-green-500 text-green-800",
      scheduled: "bg-indigo-100 border-indigo-500 text-indigo-800",
      development: "bg-cyan-100 border-cyan-500 text-cyan-800",
      waiting: "bg-gray-100 border-gray-500 text-gray-800",
      ready: "bg-emerald-100 border-emerald-500 text-emerald-800"
    };
    return colors[status] || "bg-gray-100 border-gray-500 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      urgent: <AlertTriangle className="w-5 h-5 text-red-600" />,
      blocked: <Clock className="w-5 h-5 text-orange-600" />,
      in_progress: <Settings className="w-5 h-5 text-blue-600 animate-spin" />,
      planned: <Calendar className="w-5 h-5 text-purple-600" />,
      positive: <TrendingUp className="w-5 h-5 text-green-600" />,
      scheduled: <MessageSquare className="w-5 h-5 text-indigo-600" />,
      development: <Settings className="w-5 h-5 text-cyan-600" />,
      waiting: <Clock className="w-5 h-5 text-gray-600" />,
      ready: <CheckCircle className="w-5 h-5 text-emerald-600" />
    };
    return icons[status] || <Clock className="w-5 h-5 text-gray-600" />;
  };

  const getTypeIcon = (type) => {
    const icons = {
      critico: "🚨",
      bloqueador: "🚫", 
      sistema: "⚙️",
      equipe: "👥",
      campanha: "📈",
      reuniao: "📅",
      desenvolvimento: "💻",
      treinamento: "📚",
      novatos: "🆕"
    };
    return icons[type] || "📋";
  };

  const currentData = timelineData[selectedTimeframe];

  // Resumo executivo
  const getExecutiveSummary = () => {
    const hoje = timelineData.hoje.items;
    const criticos = hoje.filter(item => item.status === 'urgent').length;
    const bloqueados = hoje.filter(item => item.status === 'blocked').length;
    
    return {
      criticos,
      bloqueados,
      totalHoje: hoje.length,
      proximaReuniao: "24/07/2025 - Catchup Semanal UNICEF"
    };
  };

  const summary = getExecutiveSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6 p-3">
                <img src="/images/wa-logo.png" alt="WA Contact Center" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  PAINEL EXECUTIVO UNICEF BRASIL
                </h1>
                <p className="text-blue-100 text-xl font-medium">
                  Acompanhamento Reuniões • Supporter Service • Brasília
                </p>
              </div>
            </div>

            {/* Resumo Executivo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-red-300/30">
                <div className="text-3xl font-bold text-red-100">{summary.criticos}</div>
                <div className="text-red-200 text-sm">Críticos Hoje</div>
              </div>
              <div className="bg-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-300/30">
                <div className="text-3xl font-bold text-orange-100">{summary.bloqueados}</div>
                <div className="text-orange-200 text-sm">Bloqueados</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="text-3xl font-bold text-white">37</div>
                <div className="text-blue-200 text-sm">Colaboradores</div>
              </div>
              <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-300/30">
                <div className="text-lg font-bold text-green-100">{summary.proximaReuniao}</div>
                <div className="text-green-200 text-sm">Próxima Reunião</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="bg-white rounded-xl shadow-lg border p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { key: 'hoje', label: 'HOJE - Ação Imediata', icon: '🚨' },
              { key: 'esta_semana', label: 'ESTA SEMANA - Acompanhar', icon: '📊' },
              { key: 'proximas_2_semanas', label: 'PRÓXIMAS 2 SEMANAS - Planejar', icon: '📅' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTimeframe(tab.key)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedTimeframe === tab.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{currentData.title}</h2>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentData.items.length} itens
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentData.items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-lg border-l-4 ${getStatusColor(item.status)} p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(item.type)}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(item.status)}
                        <span className="text-sm text-gray-600">{item.responsible}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">{item.deadline}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{item.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-sm font-medium text-gray-600 mb-1">Impacto:</div>
                  <div className="text-sm text-gray-800">{item.impact}</div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-blue-800 mb-1">Última Atualização:</div>
                  <div className="text-sm text-blue-700">{item.lastUpdate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/images/wa-logo.png" alt="WA Contact Center" className="w-5 h-5 object-contain" />
            <p className="text-sm font-medium">Dashboard UNICEF Brasil - WA Contact Center</p>
          </div>
          <p className="text-xs">💝 Base: 100,000+ doadores | 👥 Equipe: 37 pessoas | 📅 Operando desde 2019</p>
          <p className="text-xs">🎯 CEO: Pedro Espinoza | 👩‍💼 Gerente: Deisilany Santos | 🏢 Brasília</p>
          <p className="text-xs text-gray-400 mt-1">Atualizado: 17/07/2025 | Powered by Claude Code Agent</p>
        </div>
      </div>
    </div>
  );
};

export default UnicefTimelineDashboard;