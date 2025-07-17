import { useState, useMemo } from 'react';
import { CheckCircle, Clock, MessageSquare, Users, Server, Settings, TrendingUp, Calendar, Award, Brain } from 'lucide-react';

const EnelxProgressDashboard = () => {
  const [tasks, setTasks] = useState({
    // Recursos Humanos e Treinamento - 100% CONCLUÍDO ✅
    'rh-operadores': { completed: true, comments: [
      {text: "⚡ 80% das vagas preenchidas - processo seletivo avançado", timestamp: "07/07/2025", author: "Daniela Belmock"},
      {text: "🚀 Recorde de contratação! Primeira vez que vemos equipe completa em uma semana", timestamp: "09/07/2025", author: "Fernando"},
      {text: "✅ PROCESSO SELETIVO CONCLUÍDO! 48 pessoas aprovadas (20 veteranos + 28 novos)", timestamp: "14/07/2025", author: "Daniela Belmock"},
      {text: "🎯 EQUIPE B2C DEFINIDA: 27 pessoas confirmadas (22 operadores + 2 supervisores + 2 back office + 1 mesa 1)", timestamp: "14/07/2025", author: "Equipe WA"},
      {text: "💻 Infraestrutura testada e validada para toda a equipe", timestamp: "14/07/2025", author: "Fábio Henrique"}
    ], startDate: '2025-07-01', endDate: '2025-07-18', progress: 100 },
    'rh-acessos': { completed: false, comments: [
      {text: "📝 Daniela enviará amanhã lista com nomes para Natália", timestamp: "14/07/2025", author: "Daniela Belmock"},
      {text: "⚡ Criação de acessos SWS e sistemas será iniciada", timestamp: "14/07/2025", author: "Pedro Espinoza"},
      {text: "🎯 Lista da equipe finalizada e pronta para envio", timestamp: "14/07/2025", author: "Daniela Belmock"},
      {text: "✅ CONFIRMADO: Carlos disse que já pode criar acessos no SWS", timestamp: "16/07/2025", author: "Carlos Junior"},
      {text: "📋 Enviados dados hoje para Natália - em andamento", timestamp: "16/07/2025", author: "Daniela Belmock"}
    ], startDate: '2025-07-15', endDate: '2025-07-20', progress: 85 },
    'rh-contratos': { completed: false, comments: [
      {text: "📋 Contratos sendo finalizados com estrutura de renovação", timestamp: "14/07/2025", author: "Daniela Belmock"}
    ], startDate: '2025-07-20', endDate: '2025-07-23', progress: 70 },
    'rh-treinamentos': { completed: false, comments: [
      {text: "📋 Preparação concluída. Operadores antigos + novos confirmados", timestamp: "07/07/2025", author: "Daniela Belmock"},
      {text: "⏩ ANTECIPADO! Agora podemos começar treinamentos mais cedo que o previsto", timestamp: "09/07/2025", author: "Daniela Belmock"},
      {text: "🎯 Equipe completa permite treinamento com mais segurança", timestamp: "09/07/2025", author: "Fernando"},
      {text: "📅 CRONOGRAMA CONFIRMADO: Início dos treinamentos 23 de julho", timestamp: "14/07/2025", author: "Daniela Belmock"},
      {text: "🎯 Treinamento intensivo para toda a equipe B2C", timestamp: "14/07/2025", author: "Valéria Santos"},
      {text: "📚 Programa focado em procedimentos EnelX e atendimento", timestamp: "14/07/2025", author: "Equipe WA"},
      {text: "📋 50% veteranos da operação + 50% novos - estratégia definida", timestamp: "16/07/2025", author: "Daniela Belmock"},
      {text: "🎯 Cronograma e convites já enviados para operadores", timestamp: "16/07/2025", author: "Valéria Santos"},
      {text: "✅ Grade de treinamento finalizada com Valéria", timestamp: "16/07/2025", author: "Valéria Santos"}
    ], startDate: '2025-07-23', endDate: '2025-07-31', progress: 90 },
    
    // Infraestrutura e Sistemas - 90% CONCLUÍDO
    'infra-telefonia': { completed: true, comments: [
      {text: "✅ Contrato fechado com Algar para os serviços 0800", timestamp: "07/07/2025", author: "Fábio Henrique"},
      {text: "📅 Processo no dia 20/07 - prazo de 10 dias para ativação", timestamp: "09/07/2025", author: "Fábio Henrique"},
      {text: "✅ CONTRATO ALGAR FINALIZADO: Todos os 7 números validados", timestamp: "14/07/2025", author: "Fábio Henrique"},
      {text: "📅 Portabilidade agendada para 31 de julho", timestamp: "14/07/2025", author: "Fábio Henrique"},
      {text: "📞 Configuração completa para operação B2C", timestamp: "14/07/2025", author: "Fábio Henrique"}
    ], startDate: '2025-07-01', endDate: '2025-07-15', progress: 100 },
    'infra-sws': { completed: true, comments: [
      {text: "✅ Integração SWS validada, pesquisa de satisfação funcionando", timestamp: "07/07/2025", author: "Fábio Henrique"},
      {text: "✅ Testes finalizados com Wagner (Ceará)", timestamp: "09/07/2025", author: "Wagner"},
      {text: "✅ SISTEMA SWS MANTIDO E OTIMIZADO", timestamp: "14/07/2025", author: "Fábio Henrique"},
      {text: "🚀 Integração testada e funcionando perfeitamente", timestamp: "14/07/2025", author: "Fábio Henrique"},
      {text: "✅ Ambiente preparado para alta volumetria", timestamp: "14/07/2025", author: "Nicolas Henry"}
    ], startDate: '2025-07-01', endDate: '2025-07-15', progress: 100 },
    'infra-whatsapp': { completed: false, comments: [
      {text: "🚀 Natália aprovou desenvolvimento interno WA! Início básico confirmado", timestamp: "07/07/2025", author: "Fábio Henrique"},
      {text: "🎉 APROVADO! Natália aprovou desenvolvimento interno WhatsApp", timestamp: "09/07/2025", author: "Carlos Junior"},
      {text: "📅 Reunião exclusiva marcada para detalhar implementação", timestamp: "09/07/2025", author: "Pedro Espinoza"},
      {text: "📅 ATIVAÇÃO PROGRAMADA: 28-29 de julho", timestamp: "14/07/2025", author: "Fábio Henrique"},
      {text: "🔧 Testes finais e validação com Twilio", timestamp: "14/07/2025", author: "Fábio Henrique"},
      {text: "📊 Dashboard de monitoramento em desenvolvimento", timestamp: "14/07/2025", author: "Carlos Junior"},
      {text: "🔒 Bloqueio de áudio implementado - 100% PRONTO", timestamp: "16/07/2025", author: "Carlos Junior"},
      {text: "🤖 Agente automático com opções funcionando", timestamp: "16/07/2025", author: "Carlos Junior"},
      {text: "⏰ Dashboard atualizando a cada 10 segundos para testes", timestamp: "16/07/2025", author: "Carlos Junior"},
      {text: "📊 Próxima semana: apresentação da tela de acompanhamento", timestamp: "16/07/2025", author: "Carlos Junior"}
    ], startDate: '2025-07-28', endDate: '2025-08-01', progress: 90 },
    'infra-relatorios': { completed: false, comments: [
      {text: "📊 Estrutura de relatórios sendo otimizada", timestamp: "14/07/2025", author: "Giovanni"},
      {text: "⚡ Automatização de processos para maior eficiência", timestamp: "14/07/2025", author: "Giovanni"},
      {text: "📈 Indicadores de performance em desenvolvimento", timestamp: "14/07/2025", author: "Nicolas Henry"},
      {text: "📊 BI vs Excel discutido - preferência por BI com export Excel", timestamp: "16/07/2025", author: "Natália"},
      {text: "⚡ Necessidade de extrair dados históricos para auditoria", timestamp: "16/07/2025", author: "Natália"},
      {text: "📈 Adição de TMO, ociosidade e métricas back-office", timestamp: "16/07/2025", author: "Pedro Espinoza"}
    ], startDate: '2025-08-01', endDate: '2025-08-15', progress: 60 },
    
    // HSM e Campanhas - NOVA FASE
    'infra-hsm': { completed: false, comments: [
      {text: "🎯 PROGRAMADO: Desenvolvimento HSM para agosto", timestamp: "16/07/2025", author: "Carlos Junior"},
      {text: "📋 Criação de campanhas e disparos programados", timestamp: "16/07/2025", author: "Carlos Junior"},
      {text: "🚀 Construção em conjunto com equipe Enel", timestamp: "16/07/2025", author: "Carlos Junior"},
      {text: "📱 Mensagens Welcome e confirmação de venda", timestamp: "16/07/2025", author: "Fernando"},
      {text: "⚡ Tela para cadastro independente de mensagens", timestamp: "16/07/2025", author: "Carlos Junior"}
    ], startDate: '2025-08-01', endDate: '2025-08-31', progress: 20 },
    
    // Gestão do Projeto - 60% CONCLUÍDO
    'gestao-reunioes': { completed: false, comments: [
      {text: "📅 Natália marcou reunião para mapear andamento", timestamp: "07/07/2025", author: "Pedro Espinoza"},
      {text: "📅 Reunião executiva realizada 09/07 - ótimos resultados!", timestamp: "09/07/2025", author: "Pedro Espinoza"},
      {text: "👥 Próxima reunião semana 17/07 - Pedro estará no Brasil", timestamp: "09/07/2025", author: "Fernando"},
      {text: "📅 Acompanhamento semanal mantido com excelentes resultados", timestamp: "14/07/2025", author: "Pedro Espinoza"},
      {text: "✈️ Reunião presencial programada para próxima semana", timestamp: "14/07/2025", author: "Pedro Espinoza"},
      {text: "🎯 Foco total no go-live de 1º de agosto", timestamp: "14/07/2025", author: "Pedro Espinoza"},
      {text: "✅ REUNIÃO 16/07: Alinhamento EnelX SAC realizada", timestamp: "16/07/2025", author: "Pedro Espinoza"},
      {text: "🏆 Fernando confirmou: ZERO PROBLEMAS no cronograma!", timestamp: "16/07/2025", author: "Fernando"},
      {text: "📅 Reunião presencial marcada para próxima semana", timestamp: "16/07/2025", author: "Pedro Espinoza"}
    ], startDate: '2025-07-01', endDate: '2025-08-31', progress: 75 },
    'gestao-suporte': { completed: false, comments: [
      {text: "👨‍💻 Novo profissional de suporte operacional sendo incorporado", timestamp: "14/07/2025", author: "Equipe WA"},
      {text: "🔧 Especialista dedicado para questões tecnológicas EnelX", timestamp: "14/07/2025", author: "Equipe WA"},
      {text: "⚡ Suporte 100% focado na operação EnelX", timestamp: "14/07/2025", author: "Equipe WA"}
    ], startDate: '2025-08-01', endDate: '2025-08-31', progress: 90 },
    
    // Desenvolvimento e Monitoramento - 70% CONCLUÍDO
    'dev-bi': { completed: false, comments: [
      {text: "📊 BI personalizado para operações EnelX em desenvolvimento", timestamp: "14/07/2025", author: "Carlos Junior"},
      {text: "📈 Dashboards específicos para WhatsApp e telefonia", timestamp: "14/07/2025", author: "Carlos Junior"}
    ], startDate: '2025-07-01', endDate: '2025-07-31', progress: 70 },
    
    // Inovação: Monitoramento IA - NOVO! 🆕
    'ia-monitoramento': { completed: false, comments: [
      {text: "🧠 PROJETO INOVADOR: Sistema de monitoramento com IA", timestamp: "14/07/2025", author: "Pedro Espinoza"},
      {text: "🚀 Tecnologia avançada para otimização de qualidade", timestamp: "14/07/2025", author: "Giovanni"},
      {text: "📊 Análise automatizada para melhoria contínua", timestamp: "14/07/2025", author: "Pedro Espinoza"},
      {text: "⚙️ Planejamento em curso para implementação", timestamp: "14/07/2025", author: "Giovanni"},
      {text: "📋 Critérios de avaliação sendo definidos com Valéria e Elo", timestamp: "16/07/2025", author: "Pedro Espinoza"},
      {text: "🤖 Configuração IA para análise de ligações em desenvolvimento", timestamp: "16/07/2025", author: "Giovanni"},
      {text: "📅 Reunião marcada para 24/07 - apresentação da ferramenta", timestamp: "16/07/2025", author: "Pedro Espinoza"}
    ], startDate: '2025-08-01', endDate: '2025-08-31', progress: 35 },
    
    // Revisão URA - FUTURO
    'gestao-ura': { completed: false, comments: [
      {text: "💡 PLANEJAMENTO: Revisão da estrutura URA", timestamp: "16/07/2025", author: "Fernando"},
      {text: "🔄 Metamorfose para modelo novo - não radical", timestamp: "16/07/2025", author: "Fernando"},
      {text: "⏰ Aguardando término do projeto atual", timestamp: "16/07/2025", author: "Fernando"},
      {text: "🎯 Alinhamento futuro com equipe técnica", timestamp: "16/07/2025", author: "Pedro Espinoza"}
    ], startDate: '2025-09-01', endDate: '2025-09-30', progress: 10 }
  });

  const [newComment, setNewComment] = useState<{[key: string]: string}>({});

  const taskDefinitions = {
    // Recursos Humanos e Treinamento
    'rh-operadores': { 
      title: 'Equipe B2C Completa (27 pessoas)', 
      responsible: 'Daniela Cardoso Belmock', 
      category: 'rh', 
      priority: 'high',
      section: 'Recursos Humanos e Treinamento',
      status: 'completed'
    },
    'rh-acessos': { 
      title: 'Criação de acessos SWS (lista será enviada amanhã)', 
      responsible: 'Daniela Belmock → Natália', 
      category: 'rh', 
      priority: 'high',
      section: 'Recursos Humanos e Treinamento',
      status: 'in-progress'
    },
    'rh-contratos': { 
      title: 'Finalização de contratos da equipe', 
      responsible: 'Daniela Belmock + Jurídico', 
      category: 'rh', 
      priority: 'high',
      section: 'Recursos Humanos e Treinamento',
      status: 'in-progress'
    },
    'rh-treinamentos': { 
      title: 'Treinamentos EnelX (início 23 de julho)', 
      responsible: 'Valéria Santos + Equipe', 
      category: 'rh', 
      priority: 'normal',
      section: 'Recursos Humanos e Treinamento',
      status: 'in-progress'
    },
    
    // Infraestrutura e Sistemas
    'infra-telefonia': { 
      title: 'Telefonia 0800 - Contrato Algar', 
      responsible: 'Fabio Henrique', 
      category: 'infra', 
      priority: 'high',
      section: 'Infraestrutura e Sistemas',
      status: 'completed'
    },
    'infra-sws': { 
      title: 'Sistema SWS - Integração e otimização', 
      responsible: 'Fabio Henrique e Nicolas Henry', 
      category: 'infra', 
      priority: 'high',
      section: 'Infraestrutura e Sistemas',
      status: 'completed'
    },
    'infra-whatsapp': { 
      title: 'Ativação WhatsApp Oficial EnelX', 
      responsible: 'Fábio Henrique + Carlos Junior', 
      category: 'infra', 
      priority: 'high',
      section: 'Infraestrutura e Sistemas',
      status: 'in-progress'
    },
    'infra-relatorios': { 
      title: 'Sistemas de relatórios e dashboards', 
      responsible: 'Giovanni + Nicolas Henry', 
      category: 'infra', 
      priority: 'normal',
      section: 'Infraestrutura e Sistemas',
      status: 'in-progress'
    },
    
    // Gestão do Projeto
    'gestao-reunioes': { 
      title: 'Gestão de projeto e acompanhamento', 
      responsible: 'Pedro Espinoza', 
      category: 'gestao', 
      priority: 'normal',
      section: 'Gestão do Projeto',
      status: 'in-progress'
    },
    'gestao-suporte': { 
      title: 'Equipe de suporte operacional dedicada', 
      responsible: 'WA Contact Center', 
      category: 'gestao', 
      priority: 'normal',
      section: 'Gestão do Projeto',
      status: 'in-progress'
    },
    
    // Desenvolvimento e Monitoramento
    'dev-bi': { 
      title: 'BI e dashboards personalizados EnelX', 
      responsible: 'Carlos Junior', 
      category: 'dev', 
      priority: 'normal',
      section: 'Desenvolvimento e Monitoramento',
      status: 'in-progress'
    },
    
    // HSM e Campanhas - NOVA SEÇÃO
    'infra-hsm': { 
      title: 'HSM e Campanhas WhatsApp (Agosto)', 
      responsible: 'Carlos Junior + Equipe Enel', 
      category: 'infra', 
      priority: 'high',
      section: 'Infraestrutura e Sistemas',
      status: 'in-progress'
    },
    
    // Inovação: Monitoramento IA - NOVA SEÇÃO
    'ia-monitoramento': { 
      title: 'Sistema de Monitoramento com Inteligência Artificial', 
      responsible: 'Pedro Espinoza + Giovanni', 
      category: 'ia', 
      priority: 'high',
      section: 'Inovação: Monitoramento IA',
      status: 'in-progress'
    },
    
    // Revisão URA - FUTURO
    'gestao-ura': { 
      title: 'Revisão e Modernização da URA', 
      responsible: 'Fernando + Equipe Técnica', 
      category: 'gestao', 
      priority: 'normal',
      section: 'Gestão do Projeto',
      status: 'in-progress'
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: {
        ...(prev as any)[taskId],
        completed: !(prev as any)[taskId].completed,
        progress: !(prev as any)[taskId].completed ? 100 : (prev as any)[taskId].progress
      }
    }));
  };

  const updateProgress = (taskId: string, progress: number) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        progress: progress,
        completed: progress === 100
      }
    }));
  };

  const addComment = (taskId) => {
    if (!newComment[taskId]?.trim()) return;
    
    setTasks(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        comments: [...prev[taskId].comments, {
          text: newComment[taskId],
          timestamp: new Date().toLocaleString('pt-BR'),
          author: 'WA Contact Center'
        }]
      }
    }));
    
    setNewComment(prev => ({
      ...prev,
      [taskId]: ''
    }));
  };

  const getDaysFromStart = (dateStr) => {
    const startDate = new Date('2025-07-01');
    const taskDate = new Date(dateStr);
    return Math.floor((taskDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const getTaskDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const generateDateHeaders = () => {
    const dates = [];
    const startDate = new Date('2025-07-01');
    for (let i = 0; i < 62; i++) { // July + August
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dateHeaders = generateDateHeaders();

  const categoryColors = {
    rh: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-800' },
    infra: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-800' },
    gestao: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-800' },
    dev: { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-800' },
    ia: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-800' }
  };

  const statusColors = {
    completed: 'border-l-4 border-green-500 bg-green-50',
    'in-progress': 'border-l-4 border-yellow-500 bg-yellow-50',
    pending: 'border-l-4 border-gray-500 bg-gray-50'
  };

  const getOverallProgress = () => {
    const allTasks = Object.keys(tasks);
    const totalProgress = allTasks.reduce((sum, taskId) => sum + tasks[taskId].progress, 0);
    return Math.round(totalProgress / allTasks.length);
  };

  const getSectionProgress = (sectionName) => {
    const sectionTasks = Object.entries(taskDefinitions).filter(([_, task]) => task.section === sectionName);
    const totalProgress = sectionTasks.reduce((sum, [taskId]) => sum + tasks[taskId].progress, 0);
    return Math.round(totalProgress / sectionTasks.length);
  };

  const tasksBySections = useMemo(() => {
    const sections = {};
    Object.entries(taskDefinitions).forEach(([taskId, taskDef]) => {
      if (!sections[taskDef.section]) {
        sections[taskDef.section] = [];
      }
      sections[taskDef.section].push([taskId, taskDef]);
    });
    return sections;
  }, []);

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    if (progress >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4 p-2">
                  <img src="/images/wa-logo.png" alt="WA Contact Center" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    DASHBOARD ENELX - WA CONTACT CENTER
                  </h1>
                  <p className="text-blue-100 text-lg font-medium">
                    Projeto B2C 2025 | Status Atualizado - Julho 2025
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Equipe B2C: 27 profissionais</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">Go-live: 1º de agosto</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {Math.ceil((new Date('2025-08-01').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias restantes
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl lg:text-5xl font-bold text-green-300 mb-2">
                  {getOverallProgress()}%
                </div>
                <div className="text-blue-100 text-lg font-medium">Progresso Geral</div>
                <div className="w-24 h-24 mx-auto mt-4 relative">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgb(134, 239, 172)"
                      strokeWidth="8"
                      strokeDasharray={`${getOverallProgress() * 2.51} 251`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">RH & Treinamento</h3>
                  <p className="text-xs text-gray-500">27 pessoas prontas</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">
                  {getSectionProgress('Recursos Humanos e Treinamento')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Recursos Humanos e Treinamento')}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Server className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Infraestrutura</h3>
                  <p className="text-xs text-gray-500">Algar confirmado</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">
                  {getSectionProgress('Infraestrutura e Sistemas')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Infraestrutura e Sistemas')}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Settings className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Desenvolvimento</h3>
                  <p className="text-xs text-gray-500">BI personalizado</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getProgressColor(getSectionProgress('Desenvolvimento e Monitoramento'))}`}>
                  {getSectionProgress('Desenvolvimento e Monitoramento')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Desenvolvimento e Monitoramento')}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Brain className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Inovação IA</h3>
                  <p className="text-xs text-gray-500">Tecnologia avançada</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getProgressColor(getSectionProgress('Inovação: Monitoramento IA'))}`}>
                  {getSectionProgress('Inovação: Monitoramento IA')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Inovação: Monitoramento IA')}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Gestão</h3>
                  <p className="text-xs text-gray-500">Suporte dedicado</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getProgressColor(getSectionProgress('Gestão do Projeto'))}`}>
                  {getSectionProgress('Gestão do Projeto')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Gestão do Projeto')}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg mr-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Principais Conquistas do Projeto</h3>
              <p className="text-gray-600">Marcos importantes alcançados</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="font-bold text-green-800 text-lg mb-1">Equipe Completa</div>
                <div className="text-sm text-green-700">27 profissionais confirmados</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">📞</span>
                </div>
                <div className="font-bold text-blue-800 text-lg mb-1">Algar Finalizado</div>
                <div className="text-sm text-blue-700">Contrato assinado - portabilidade 31/07</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">💬</span>
                </div>
                <div className="font-bold text-purple-800 text-lg mb-1">WhatsApp Oficial</div>
                <div className="text-sm text-purple-700">Ativação programada 28-29/07</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="font-bold text-orange-800 text-lg mb-1">IA Inovadora</div>
                <div className="text-sm text-orange-700">Sistema avançado de monitoramento</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tasks */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Cronograma Projeto EnelX B2C
            </h2>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Timeline Header */}
              <div className="flex">
                <div className="w-80 bg-gray-100 p-2 font-semibold text-gray-700 border-r sticky left-0 z-10">
                  Ações do Projeto EnelX
                </div>
                <div className="flex flex-1">
                  {dateHeaders.map((date, index) => (
                    <div 
                      key={index} 
                      className={`w-8 p-1 text-xs text-center border-r ${
                        date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-200' : 'bg-gray-100'
                      } ${
                        date.toDateString() === new Date().toDateString() ? 'bg-blue-200 font-bold' : ''
                      }`}
                    >
                      <div className="font-medium">{date.getDate()}</div>
                      <div className="text-gray-500">
                        {date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks grouped by sections */}
              {Object.entries(tasksBySections).map(([sectionName, sectionTasks]) => (
                <div key={sectionName}>
                  {/* Section Header */}
                  <div className="flex bg-gray-50 border-b">
                    <div className="w-80 p-3 border-r sticky left-0 z-10 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 flex items-center">
                        {sectionName === 'Recursos Humanos e Treinamento' && <Users className="w-4 h-4 mr-2 text-blue-600" />}
                        {sectionName === 'Infraestrutura e Sistemas' && <Server className="w-4 h-4 mr-2 text-green-600" />}
                        {sectionName === 'Desenvolvimento e Monitoramento' && <Settings className="w-4 h-4 mr-2 text-indigo-600" />}
                        {sectionName === 'Gestão do Projeto' && <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />}
                        {sectionName === 'Inovação: Monitoramento IA' && <Brain className="w-4 h-4 mr-2 text-orange-600" />}
                        {sectionName}
                        <span className={`ml-2 text-sm ${getProgressColor(getSectionProgress(sectionName))}`}>
                          {getSectionProgress(sectionName)}%
                        </span>
                      </h3>
                    </div>
                    <div className="flex-1"></div>
                  </div>

                  {/* Section Tasks */}
                  {sectionTasks.map(([taskId, taskDef]) => {
                    const task = tasks[taskId];
                    const startDay = getDaysFromStart(task.startDate);
                    const duration = getTaskDuration(task.startDate, task.endDate);
                    const categoryColor = categoryColors[taskDef.category];

                    return (
                      <div key={taskId} className="flex border-b hover:bg-gray-50">
                        {/* Task Info */}
                        <div className={`w-80 p-3 border-r sticky left-0 z-10 bg-white ${statusColors[taskDef.status]}`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <button
                              onClick={() => toggleTask(taskId)}
                              className={`transition-colors ${task.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                            >
                              <CheckCircle className={`w-5 h-5 ${task.completed ? 'fill-current' : ''}`} />
                            </button>
                            <div className="flex-1">
                              <div className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {taskDef.title}
                              </div>
                              <div className="text-xs text-gray-600">{taskDef.responsible}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`text-xs px-2 py-1 rounded ${categoryColor.light} ${categoryColor.text}`}>
                              {taskDef.status === 'completed' ? '✅ CONCLUÍDA' : 
                               taskDef.status === 'in-progress' ? '⚡ EM ANDAMENTO' : '⏳ PENDENTE'}
                            </span>
                            <span className={`text-xs font-bold ${getProgressColor(task.progress)}`}>
                              {task.progress}%
                            </span>
                          </div>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={task.progress}
                            onChange={(e) => updateProgress(taskId, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />

                          <div className="mt-2 flex space-x-1">
                            <input
                              type="text"
                              placeholder="Nova atualização..."
                              value={newComment[taskId] || ''}
                              onChange={(e) => setNewComment(prev => ({...prev, [taskId]: e.target.value}))}
                              className="flex-1 text-xs border rounded px-2 py-1"
                              onKeyPress={(e) => e.key === 'Enter' && addComment(taskId)}
                            />
                            <button
                              onClick={() => addComment(taskId)}
                              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </button>
                          </div>

                          {task.comments.length > 0 && (
                            <div className="mt-2 max-h-20 overflow-y-auto">
                              {task.comments.map((comment, idx) => (
                                <div key={idx} className="text-xs bg-blue-50 p-1 rounded mb-1">
                                  <div className="text-gray-600">{comment.author} - {comment.timestamp}</div>
                                  <div className="text-gray-800">{comment.text}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Timeline */}
                        <div className="flex-1 relative">
                          <div className="flex h-full">
                            {dateHeaders.map((date, index) => (
                              <div 
                                key={index} 
                                className={`w-8 border-r h-full ${
                                  (index + 1) % 7 === 0 || (index + 2) % 7 === 0 ? 'bg-gray-50' : ''
                                } ${
                                  date.toDateString() === new Date().toDateString() ? 'bg-blue-100' : ''
                                }`}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Task Bar */}
                          <div 
                            className={`absolute top-1/2 transform -translate-y-1/2 h-6 ${categoryColor.bg} rounded flex items-center justify-center text-white text-xs font-medium shadow-sm`}
                            style={{
                              left: `${startDay * 32}px`,
                              width: `${duration * 32}px`
                            }}
                          >
                            <div className="absolute inset-0 bg-black bg-opacity-20 rounded" style={{ width: `${task.progress}%` }}></div>
                            <span className="relative z-10">{task.progress}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/images/wa-logo.png" alt="WA Contact Center" className="w-5 h-5 object-contain" />
            <p className="text-sm font-medium">Dashboard EnelX - WA Contact Center</p>
          </div>
          <p className="text-xs">🎯 Equipe: 27 profissionais | 📅 Treinamentos: 23/07 | 🚀 Go-live: 1º de agosto</p>
          <p className="text-xs text-gray-400 mt-1">Atualizado: 17/07/2025 | Powered by Claude Code Agent</p>
        </div>
      </div>
    </div>
  );
};

export default EnelxProgressDashboard;