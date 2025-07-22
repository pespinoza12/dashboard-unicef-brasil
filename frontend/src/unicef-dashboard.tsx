import { useState, useMemo } from 'react';
import { CheckCircle, Clock, MessageSquare, Users, Server, Settings, TrendingUp, Calendar, Award, Brain, Heart, Target, DollarSign, Globe } from 'lucide-react';

const UnicefProgressDashboard = () => {
  const [tasks, setTasks] = useState({
    // Gestión de Donantes - OPERACIÓN PRINCIPAL  
    'donantes-saving': { completed: false, comments: [
      {text: "✅ MIGRAÇÃO COMPLETADA: Sistema Partner funcionando com solução provisória", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "🔧 Giovanni implementou campos Vindi na fronte - campanha ativa novamente", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "📊 Taxa atual saving: 2,52% - funcionando com dados corretos Vindi", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "⚡ Middleware em desenvolvimento para correção definitiva dados Partner", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"}
    ], startDate: '2025-07-01', endDate: '2025-07-31', progress: 75 },

    'donantes-upgrade': { completed: false, comments: [
      {text: "🔄 Base de upgrade ainda não chegou - problema segmentação UNICEF", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "⏳ Aguardando base que será enviada posteriormente", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "📋 Preparação cargas elétricas em layout SalesForce", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"},
      {text: "🔄 Continuando base inativos no restante do mês", timestamp: "21/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-20', endDate: '2025-09-30', progress: 50 },

    'donantes-legados': { completed: false, comments: [
      {text: "👩‍🏫 Carolina de Legados dará treinamento a 2 nuevas agentes", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🎯 Treinamento programado: 10h às 12h com equipe gestão", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🗣️ Novata con dificultad de dicção - trabajando para superar", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "💝 Carolina muy querida por el equipo - almuerza con operadores", timestamp: "09/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-01', endDate: '2025-12-31', progress: 70 },

    'donantes-relacionamiento': { completed: false, comments: [
      {text: "📊 RECEPTIVO: 40.31% - estável pós-migração sistema Partner", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "📱 WHATSAPP: 37.67% - recuperando após problemas migração", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "✉️ E-MAIL: 55.17% - excelente performance canal digital", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "👥 37 colaboradores ativos - equipe mantém alta performance", timestamp: "21/07/2025", author: "Deisilany Santos"}
    ], startDate: '2019-01-01', endDate: '2025-12-31', progress: 85 },

    // Operaciones y Sistemas - FUNCIONAMIENTO DIARIO
    'ops-telefonia': { completed: false, comments: [
      {text: "📞 RECEPTIVO: 43.12% (excelente resultado julio 9)", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "📉 Bajó a 42.53% (julio 17) pero mantiene buen nivel", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "💪 Día migración: 50% reversión - equipo psicológicamente preparado", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "⚠️ Últimos 3-4 días no reflejan en Salesforce, solo DPO", timestamp: "17/07/2025", author: "Deisilany Santos"}
    ], startDate: '2019-01-01', endDate: '2025-12-31', progress: 85 },

    'ops-whatsapp': { completed: false, comments: [
      {text: "📱 DIGITAL: 37.14% (julio 9) → 39.06% (julio 17) recuperándose", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "🚨 INFOBIP DESACTIVADO: 9:30am julio 17 - migración forzada", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "⚡ Un día zeró completamente - gran impacto negativo", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🔄 Migración a PARTING en curso - plataforma no 100% funcional", timestamp: "17/07/2025", author: "Deisilany Santos"}
    ], startDate: '2020-01-01', endDate: '2025-12-31', progress: 75 },

    'ops-sistemas': { completed: false, comments: [
      {text: "🚨 PROBLEMA CRÍTICO: Duplicación cadastros - consulta retorna solo 1", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "⚠️ Power BI sin actualizar 2 días - problema banco datos", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🌐 Campos PARTING en inglés - operación no es bilingüe", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "🔧 Nuevo BI en desarrollo - Giovanni lista próxima semana", timestamp: "17/07/2025", author: "Pedro Espinoza"}
    ], startDate: '2025-07-01', endDate: '2025-12-31', progress: 60 },

    // Gestión de Equipo - RECURSOS HUMANOS
    'equipo-brasilia': { completed: false, comments: [
      {text: "👥 EQUIPO ACTUAL: 37 colaboradores (número autorizado correcto)", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "📤 Mariana Ganda será desligada - retorno vacaciones", timestamp: "09/07/2025", author: "Daniela Cardoso Belmock"},
      {text: "🆕 4 novatos muy buenos e interesados - aún no comenzaron atender", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🚫 Prohibido pedir demissão durante migración", timestamp: "17/07/2025", author: "Daniela Cardoso Belmock"}
    ], startDate: '2019-01-01', endDate: '2025-12-31', progress: 90 },

    'equipo-capacitacion': { completed: false, comments: [
      {text: "✅ Treinamento novas tabulações UNICEF - realizado online com sucesso", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "🔄 Pequenas modificações nomenclatura a pedido UNICEF implementadas", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "👥 2 de 4 novatos saving ainda em escuta - aprendendo sistema Partner", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "📞 Operadora receptivo inicia atendimento esta semana", timestamp: "21/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-06-01', endDate: '2025-12-31', progress: 85 },

    'equipo-kpis': { completed: false, comments: [
      {text: "😔 Operadores se sienten culpables por cancelamentos de problemas UNICEF", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "💪 Trabajo psicológico constante para mantener motivación", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "📊 Giovanni subiu novo relatório - equipe já envia parciais", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "🎁 Gift cards distribuidos - Pablo muy animado con campañas", timestamp: "09/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-01', endDate: '2025-09-30', progress: 75 },

    // Reuniones y Control - GESTIÓN DIRECTIVA
    'reuniones-semanales': { completed: false, comments: [
      {text: "📅 REUNIÓN 09/07: Catchup semanal - Power BI, migración, resultados", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "📅 REUNIÓN 17/07: Status migración, problemas críticos, duplicação", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "😴 Deisilany trabajando 8:30-20:30 para acelerar soluciones", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "🧘 Calma de Giovanni fundamental para manejar crisis", timestamp: "17/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-01', endDate: '2025-12-31', progress: 95 },

    'reuniones-priorizacion': { completed: false, comments: [
      {text: "📅 Reunión Ana programada: 11h-12h (followup)", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "📅 Reunión Carolina: 14:30-15:30 (alineamiento backoffice)", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "📋 Revisión procedimientos manuales - 1 mes transición", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "❓ Cases desaparecidas en Parting - necesita localización urgente", timestamp: "17/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-01', endDate: '2025-12-31', progress: 80 },

    // Optimización Base de Donantes - ESTRATÉGICO
    'base-optimizacion': { completed: false, comments: [
      {text: "📊 Base 100,000+ donantes - migración en curso", timestamp: "17/07/2025", author: "Pedro Espinoza"},
      {text: "⚠️ PROBLEMA: Duplicação masiva cadastros en Vind", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "🔍 Consulta frontal retorna solo 1 - múltiples activos escondidos", timestamp: "17/07/2025", author: "Deisilany Santos"},
      {text: "🚨 Riesgo: Cobranzas indebidas y descontento donadores", timestamp: "17/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-06-01', endDate: '2025-12-31', progress: 45 },

    'base-segmentacion': { completed: false, comments: [
      {text: "📈 Campanha elétricas: 6-7 sucessos desde día 3 (4 días operando)", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "💳 Autorización boleto mejoró resultados significativamente", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🗣️ Mejor contactabilidad - menos gente fallecida que base anterior", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "⚰️ Base anterior: 5 llamadas, 4 personas muertas - ahora gente viva", timestamp: "09/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-03', endDate: '2025-10-31', progress: 65 },
    
    // Campañas Especiales - PROYECTOS ADICIONALES
    'campanhas-eletricas': { completed: false, comments: [
      {text: "🔌 UNICEF Reativação Elétrica - campanha ativa desde 03/07", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🎯 7 sucessos en 5 días operativos - tendencia positiva", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "💳 Modalidad boleto autorizada - impacto positivo inmediato", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "📈 Base upgrade elétrica mejor que inactivos - menos caixas postais", timestamp: "09/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-03', endDate: '2025-09-30', progress: 75 },
    
    'campanhas-premio': { completed: false, comments: [
      {text: "🎁 Campanha premiação julho SUSPENDIDA por migração", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "⏳ Aguardando normalidad para campanha elaborada próximo mês", timestamp: "09/07/2025", author: "Deisilany Santos"},
      {text: "🔄 Variação: gift cards, folgas, saídas antecipadas", timestamp: "09/07/2025", author: "Daniela Cardoso Belmock"},
      {text: "💰 Orçamento UNICEF 2025 ultrapassado - campanhas anteriores contabilizadas", timestamp: "09/07/2025", author: "Daniela Cardoso Belmock"}
    ], startDate: '2025-08-01', endDate: '2025-12-31', progress: 30 },

    // NOVAS TAREAS CRÍTICAS IDENTIFICADAS EM REUNIÕES
    'critico-bot-whatsapp': { completed: false, comments: [
      {text: "🚨 URGENTE: Bot WhatsApp irritando donadores - podem virar cancelamentos", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "❌ Equipe não consegue responder mensagens WhatsApp", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "⚠️ Plataforma digital falhas múltiplas - backoffices sobrecarregadas", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "📧 E-mail enviado UNICEF com prints e descrições detalhadas das falhas", timestamp: "21/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-21', endDate: '2025-08-31', progress: 10 },

    'critico-middleware-vindi': { completed: false, comments: [
      {text: "🚨 CRÍTICO: Middleware Vindi-Salesforce para corrigir dados Partner", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"},
      {text: "⚠️ Reversões cancelamento não refletindo Vindi - impacto resultados futuros", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "🔄 Comunicação dados Vindi-Salesforce deve começar funcionar em breve", timestamp: "21/07/2025", author: "Giovanni Desenvolvimento"},
      {text: "📊 Alterando datas pagamento diretamente Vindi para evitar perdas", timestamp: "21/07/2025", author: "Giovanni Desenvolvimento"}
    ], startDate: '2025-07-22', endDate: '2025-08-15', progress: 20 },

    'critico-bi-historico': { completed: false, comments: [
      {text: "📊 Ana UNICEF questionando ausência histórico anos anteriores no BI", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "🔧 Necessário manter histórico dados para comparações e análises", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "⚠️ Problema conexão BI mensal - atualizações pausadas", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"},
      {text: "📈 BI mensal já batendo conversão - consolidados adaptados para UNICEF", timestamp: "21/07/2025", author: "Giovanni Desenvolvimento"}
    ], startDate: '2025-07-22', endDate: '2025-08-30', progress: 30 },

    'critico-plataforma-sftp': { completed: false, comments: [
      {text: "🤝 Negociação plataforma SFTP comum UNICEF-Stilo-WA", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"},
      {text: "📅 Data envío retorno UNICEF: todo dia 16, envío distribuidores até dia 20", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"},
      {text: "🔄 Otimização fluxo transferência dados - evitar trimulação", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"},
      {text: "🔧 20 atualizações sistema implementadas última semana", timestamp: "22/07/2025", author: "Giovanni Desenvolvimento"}
    ], startDate: '2025-07-22', endDate: '2025-09-15', progress: 40 },

    'critico-novatos-integracao': { completed: false, comments: [
      {text: "👥 2 de 4 novatos saving ainda em escuta - aprendendo novo sistema", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "📞 Operadora receptivo começa atender esta semana", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "📋 Treinamento novas tabulações UNICEF - pequenas modificações nomenclatura", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "🎯 4 novatos muito bons e interessados - ainda não começaram atender", timestamp: "21/07/2025", author: "Deisilany Santos"}
    ], startDate: '2025-07-21', endDate: '2025-08-31', progress: 60 },

    'critico-backoffices-sobrecarga': { completed: false, comments: [
      {text: "🚨 Backoffices sobrecarregadas com suporte sistema digital", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "🌐 Plataforma digital em inglês - dificulta correção manual dados", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "🔧 Equipe priorizando mapeamento falhas plataforma digital para correção", timestamp: "21/07/2025", author: "Deisilany Santos"},
      {text: "💪 Deisilany trabalhando 8:30-20:30 para acelerar soluções", timestamp: "21/07/2025", author: "Pedro Espinoza"}
    ], startDate: '2025-07-21', endDate: '2025-09-30', progress: 25 }
  });

  const [newComment, setNewComment] = useState<{[key: string]: string}>({});

  const taskDefinitions = {
    // Gestión de Donantes
    'donantes-saving': { 
      title: 'Campañas de Saving - Retención de Donantes', 
      responsible: 'Daisy Lenny Santos + Equipo Brasilia', 
      category: 'donantes', 
      priority: 'high',
      section: 'Gestión de Donantes',
      status: 'in-progress'
    },
    'donantes-upgrade': { 
      title: 'Campañas de Upgrade - Aumento de Valor', 
      responsible: 'Daisy Lenny Santos + Equipo Brasilia', 
      category: 'donantes', 
      priority: 'high',
      section: 'Gestión de Donantes',
      status: 'in-progress'
    },
    'donantes-legados': { 
      title: 'Campañas de Legados - Grandes Donadores', 
      responsible: 'Daisy Lenny Santos + Pedro Espinoza', 
      category: 'donantes', 
      priority: 'normal',
      section: 'Gestión de Donantes',
      status: 'in-progress'
    },
    'donantes-relacionamiento': { 
      title: 'Programa de Relacionamento General', 
      responsible: 'Equipo Completo WA Contact Center', 
      category: 'donantes', 
      priority: 'high',
      section: 'Gestión de Donantes',
      status: 'completed'
    },

    // Operaciones y Sistemas
    'ops-telefonia': { 
      title: 'Sistema Telefónico - Atención Lunes a Viernes', 
      responsible: 'Equipo Técnico WA + Daisy', 
      category: 'ops', 
      priority: 'high',
      section: 'Operaciones y Sistemas',
      status: 'completed'
    },
    'ops-whatsapp': { 
      title: 'WhatsApp Business - Atención Digital', 
      responsible: 'Equipo Técnico WA + Daisy', 
      category: 'ops', 
      priority: 'high',
      section: 'Operaciones y Sistemas',
      status: 'completed'
    },
    'ops-sistemas': { 
      title: 'Sistemas Digitales - Integración UNICEF', 
      responsible: 'Pedro Espinoza + Equipo Técnico', 
      category: 'ops', 
      priority: 'normal',
      section: 'Operaciones y Sistemas',
      status: 'in-progress'
    },

    // Gestión de Equipo
    'equipo-brasilia': { 
      title: 'Equipo Brasilia - 45 Personas Operativas', 
      responsible: 'Daisy Lenny Santos', 
      category: 'equipo', 
      priority: 'high',
      section: 'Gestión de Equipo',
      status: 'completed'
    },
    'equipo-capacitacion': { 
      title: 'Capacitación Continua - Fundraising', 
      responsible: 'Daisy Lenny Santos + Pedro Espinoza', 
      category: 'equipo', 
      priority: 'normal',
      section: 'Gestión de Equipo',
      status: 'completed'
    },
    'equipo-kpis': { 
      title: 'KPIs y Monitoreo de Performance', 
      responsible: 'Pedro Espinoza + Daisy Lenny Santos', 
      category: 'equipo', 
      priority: 'high',
      section: 'Gestión de Equipo',
      status: 'in-progress'
    },

    // Reuniones y Control
    'reuniones-semanales': { 
      title: 'Reuniones Semanales Pedro-Daisy', 
      responsible: 'Pedro Espinoza + Daisy Lenny Santos', 
      category: 'gestao', 
      priority: 'high',
      section: 'Reuniones y Control',
      status: 'in-progress'
    },
    'reuniones-priorizacion': { 
      title: 'Priorización y Delegación de Tareas', 
      responsible: 'Pedro Espinoza + Daisy Lenny Santos', 
      category: 'gestao', 
      priority: 'high',
      section: 'Reuniones y Control',
      status: 'in-progress'
    },

    // Optimización Base de Donantes
    'base-optimizacion': { 
      title: 'Optimización Base 100,000+ Donantes', 
      responsible: 'Pedro Espinoza + Daisy Lenny Santos', 
      category: 'estrategia', 
      priority: 'high',
      section: 'Optimización Base de Donantes',
      status: 'in-progress'
    },
    'base-segmentacion': { 
      title: 'Campanha Elétricas - Resultados Reales', 
      responsible: 'Deisilany Santos + Equipo Operaciones', 
      category: 'estrategia', 
      priority: 'high',
      section: 'Optimización Base de Donantes',
      status: 'in-progress'
    },

    // Campañas Especiales
    'campanhas-eletricas': { 
      title: 'UNICEF Reativação Elétrica - 7 Sucessos', 
      responsible: 'Deisilany Santos + Equipo Brasilia', 
      category: 'campanhas', 
      priority: 'high',
      section: 'Campañas Especiales',
      status: 'in-progress'
    },
    'campanhas-premio': { 
      title: 'Campañas Premiação - Gestão Incentivos', 
      responsible: 'Deisilany Santos + Daniela Belmock', 
      category: 'campanhas', 
      priority: 'normal',
      section: 'Campañas Especiales',
      status: 'in-progress'
    },

    // NUEVAS TAREAS CRÍTICAS
    'critico-bot-whatsapp': { 
      title: '🚨 CRÍTICO: Bot WhatsApp Irritando Donadores', 
      responsible: 'Deisilany Santos + Equipo Técnico', 
      category: 'ops', 
      priority: 'critical',
      section: 'Problemas Críticos Post-Migração',
      status: 'in-progress'
    },
    'critico-middleware-vindi': { 
      title: '🚨 CRÍTICO: Middleware Vindi-Salesforce', 
      responsible: 'Giovanni Desenvolvimento + Pedro Espinoza', 
      category: 'ops', 
      priority: 'critical',
      section: 'Problemas Críticos Post-Migração',
      status: 'in-progress'
    },
    'critico-bi-historico': { 
      title: 'Recuperação Histórico BI Anos Anteriores', 
      responsible: 'Giovanni Desenvolvimento + Ana UNICEF', 
      category: 'ops', 
      priority: 'high',
      section: 'Problemas Críticos Post-Migração',
      status: 'in-progress'
    },
    'critico-plataforma-sftp': { 
      title: 'Negociação SFTP Comum UNICEF-Stilo', 
      responsible: 'Giovanni Desenvolvimento + Pedro Espinoza', 
      category: 'ops', 
      priority: 'high',
      section: 'Problemas Críticos Post-Migração',
      status: 'in-progress'
    },
    'critico-novatos-integracao': { 
      title: 'Integração Novatos - Sistema Partner', 
      responsible: 'Deisilany Santos + Equipo Training', 
      category: 'equipo', 
      priority: 'high',
      section: 'Problemas Críticos Post-Migração',
      status: 'in-progress'
    },
    'critico-backoffices-sobrecarga': { 
      title: '🚨 CRÍTICO: Backoffices Sobrecarregadas', 
      responsible: 'Deisilany Santos + Equipo Operações', 
      category: 'ops', 
      priority: 'critical',
      section: 'Problemas Críticos Post-Migração',
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
    for (let i = 0; i < 184; i++) { // 6 meses
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dateHeaders = generateDateHeaders();

  const categoryColors = {
    donantes: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-800' },
    ops: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-800' },
    equipo: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-800' },
    gestao: { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-800' },
    estrategia: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-800' },
    campanhas: { bg: 'bg-pink-500', light: 'bg-pink-100', text: 'text-pink-800' }
  };

  const statusColors = {
    completed: 'border-l-4 border-green-500 bg-green-50',
    'in-progress': 'border-l-4 border-yellow-500 bg-yellow-50',
    pending: 'border-l-4 border-gray-500 bg-gray-50'
  };

  const priorityColors = {
    critical: 'border-l-4 border-red-600 bg-red-50 shadow-lg',
    high: 'border-l-4 border-orange-500 bg-orange-50',
    normal: 'border-l-4 border-blue-500 bg-blue-50',
    low: 'border-l-4 border-gray-400 bg-gray-50'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header - UNICEF Brasil */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
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
                    DASHBOARD UNICEF BRASIL - ACTUALIZADO 22/07/2025 🚨
                  </h1>
                  <p className="text-blue-100 text-lg font-medium">
                    Supporter Service | Proyecto desde 2019 | Status Julio 2025
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Equipo Brasilia: 37 profesionales</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="font-medium">Base: 100,000+ donantes</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="font-medium">Gerente: Daisy Lenny Santos</span>
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
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Gestión Donantes</h3>
                  <p className="text-xs text-gray-500">Saving & Upgrade</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">
                  {getSectionProgress('Gestión de Donantes')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Gestión de Donantes')}%` }}
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
                  <h3 className="font-semibold text-gray-800">Operaciones</h3>
                  <p className="text-xs text-gray-500">Tel + WhatsApp</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">
                  {getSectionProgress('Operaciones y Sistemas')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Operaciones y Sistemas')}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Equipo</h3>
                  <p className="text-xs text-gray-500">45 personas</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getProgressColor(getSectionProgress('Gestión de Equipo'))}`}>
                  {getSectionProgress('Gestión de Equipo')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Gestión de Equipo')}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Reuniones</h3>
                  <p className="text-xs text-gray-500">Pedro-Daisy</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getProgressColor(getSectionProgress('Reuniones y Control'))}`}>
                  {getSectionProgress('Reuniones y Control')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Reuniones y Control')}%` }}
              ></div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Base Donantes</h3>
                  <p className="text-xs text-gray-500">100k+ optimización</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getProgressColor(getSectionProgress('Optimización Base de Donantes'))}`}>
                  {getSectionProgress('Optimización Base de Donantes')}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getSectionProgress('Optimización Base de Donantes')}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Key Achievements UNICEF */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg mr-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Principales Logros UNICEF Brasil</h3>
              <p className="text-gray-600">Supporter Service - 6 años de operación exitosa</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">💝</span>
                </div>
                <div className="font-bold text-blue-800 text-lg mb-1">100k+ Donantes</div>
                <div className="text-sm text-blue-700">Base optimizada activamente</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">👥</span>
                </div>
                <div className="font-bold text-green-800 text-lg mb-1">45 Profesionales</div>
                <div className="text-sm text-green-700">Equipo Brasilia operativo</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">📅</span>
                </div>
                <div className="font-bold text-purple-800 text-lg mb-1">6 Años Operando</div>
                <div className="text-sm text-purple-700">Desde 2019 con UNICEF</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="font-bold text-orange-800 text-lg mb-1">Fundraising Integral</div>
                <div className="text-sm text-orange-700">Saving, Upgrade & Legados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tasks */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Gestión UNICEF Brasil - Supporter Service
            </h2>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Timeline Header */}
              <div className="flex">
                <div className="w-80 bg-gray-100 p-2 font-semibold text-gray-700 border-r sticky left-0 z-10">
                  Proyectos UNICEF Brasil
                </div>
                <div className="flex flex-1">
                  {dateHeaders.slice(0, 62).map((date, index) => (
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
                        {sectionName === 'Gestión de Donantes' && <Heart className="w-4 h-4 mr-2 text-blue-600" />}
                        {sectionName === 'Operaciones y Sistemas' && <Server className="w-4 h-4 mr-2 text-green-600" />}
                        {sectionName === 'Gestión de Equipo' && <Users className="w-4 h-4 mr-2 text-purple-600" />}
                        {sectionName === 'Reuniones y Control' && <Calendar className="w-4 h-4 mr-2 text-indigo-600" />}
                        {sectionName === 'Optimización Base de Donantes' && <Target className="w-4 h-4 mr-2 text-orange-600" />}
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
                        <div className={`w-80 p-3 border-r sticky left-0 z-10 bg-white ${
                          taskDef.priority === 'critical' ? priorityColors.critical : statusColors[taskDef.status]
                        }`}>
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
                            <span className={`text-xs px-2 py-1 rounded ${
                              taskDef.priority === 'critical' ? 'bg-red-100 text-red-800 font-bold' : 
                              categoryColor.light + ' ' + categoryColor.text
                            }`}>
                              {taskDef.priority === 'critical' ? '🚨 CRÍTICO' :
                               taskDef.status === 'completed' ? '✅ CONCLUÍDA' : 
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
                            {dateHeaders.slice(0, 62).map((date, index) => (
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
                              left: `${Math.max(0, startDay) * 32}px`,
                              width: `${Math.min(duration, 62 - Math.max(0, startDay)) * 32}px`
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
            <p className="text-sm font-medium">Dashboard UNICEF Brasil - WA Contact Center</p>
          </div>
          <p className="text-xs">💝 Base: 100,000+ donantes | 👥 Equipo: 37 personas | 📅 Operando desde 2019</p>
          <p className="text-xs">🎯 CEO: Pedro Espinoza | 👩‍💼 Gerente: Deisilany Santos | 🏢 Brasilia</p>
          <p className="text-xs text-gray-400 mt-1">🚨 ÚLTIMA ACTUALIZACIÓN: 22/07/2025 14:45 GMT-3 | Powered by Claude Code Agent</p>
        </div>
      </div>
    </div>
  );
};

export default UnicefProgressDashboard;