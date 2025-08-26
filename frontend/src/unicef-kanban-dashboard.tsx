import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Clock, CheckCircle, Calendar, User, MessageSquare, Phone, Target, Settings, Plus, ChevronRight, Edit2, Save, X, Trash2, Heart, Star, Sparkles, Award, Zap, Smile } from 'lucide-react';
import { 
  ToastNotification, 
  DelightfulLoader, 
  ProgressCelebration, 
  FloatingHearts, 
  UnicefLogoMagic, 
  InspirationMoment, 
  useCardHover, 
  useCelebrations,
  MotivationalEmptyState,
  PriorityBadge,
  ConfettiParticle,
  CELEBRATION_MESSAGES,
  LOADING_MESSAGES
} from './unicef-delight-components';

// Cache buster: Build timestamp to force new JS bundle
const BUILD_TIMESTAMP = '2025-08-26T16:35:00Z-ITEMS-COMPLETADOS-LIMPOS';
const FORCE_RELOAD_VERSION = 'v15-dashboard-limpio-items-completados';

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
  
  // Delight system states
  const [showToast, setShowToast] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Celebration hooks
  const { triggerCelebration } = useCelebrations();
  const { hoveredCard, handleMouseEnter, handleMouseLeave } = useCardHover();

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
          lastUpdate: "30/07/2025",
          author: "Carol + Luciana",
          updateText: "Identificado na reunião Partner Community - casos não sendo criados para mensagens WhatsApp",
          actionRequired: "Corrigir API para criar cases automaticamente para retention e digital"
        },
        {
          id: 2,
          title: "Azuri Integration User Bloqueando Cases",
          description: "Cases escalados sendo assignados para Azuri Integration User (não está em nenhuma fila) - CONFIRMADO 13/08",
          impact: "Equipe WA não consegue acessar casos escalados - bloqueio operacional total confirmado reunião 13/08",
          responsible: "Saurav + Giovanni",
          deadline: "URGENTE - 18/08/2025",
          priority: "urgent",
          lastUpdate: "13/08/2025",
          author: "Deisilany Santos",
          updateText: "CONFIRMADO 13/08: Azuri Integration User bloqueia casos, tabulações escaladas vão pasta errada",
          actionRequired: "Adicionar owner field na API + mapear queue IDs corretos para WA queue"
        },
        {
          id: 3,
          title: "Segmentação Partner - Contatos Duplicados",
          description: "Sistema Partner causando recorrência contatos mesmo doadores - gerando irritação",
          impact: "Operadores registrando ligações repetidas - lista imensa doadores já contatados",
          responsible: "Giovanni + Equipe Segmentação",
          deadline: "URGENTE - 10/08/2025",
          priority: "urgent",
          lastUpdate: "06/08/2025",
          author: "Deisilany Santos",
          updateText: "Necessário ajustes na segmentação antes continuar - evitar irritação doadores",
          actionRequired: "Corrigir segmentação dados Partner + limpar listas duplicadas"
        },
        {
          id: 4,
          title: "API Lenta - Demora Carregamento Donadores",
          description: "API demora até 1 minuto para carregar informações donadores",
          impact: "Operadores precisam 'enrolar' apresentação inicial para ter tempo chamar doador pelo nome",
          responsible: "Giovanni + Equipe API",
          deadline: "12/08/2025",
          priority: "urgent",
          lastUpdate: "06/08/2025",
          author: "Deisilany Santos",
          updateText: "Giovanni atribuiu lentidão ao tempo resposta da API",
          actionRequired: "Otimizar tempo resposta API para carregamento dados doadores"
        },
        {
          id: 5,
          title: "Bot WhatsApp Intromissão Não Para",
          description: "Botão para impedir intromissão bot não funciona - pode enviar mensagens indevidas",
          impact: "Doadora cancelou doação após receber mensagem indevida do bot",
          responsible: "Carol + Saurav",
          deadline: "08/08/2025",
          priority: "urgent",
          lastUpdate: "06/08/2025",
          author: "Deisilany Santos",
          updateText: "Carol ficou verificar mas problema ainda não resolvido",
          actionRequired: "Corrigir botão anti-intromissão bot WhatsApp urgentemente"
        },
        {
          id: 6,
          title: "Campanhas Save/Upgrade - Doadores Repetidos",
          description: "Bases de saving prejudicadas - acúmulo bases meses anteriores. Apenas 3.000 de 17.000 eram novos",
          impact: "Campanha Upgrade imediatamente parada por Lívia - problema formalizado por email",
          responsible: "Ana + Giovanni + Lívia",
          deadline: "URGENTE - 18/08/2025",
          priority: "urgent",
          lastUpdate: "11/08/2025",
          author: "Deisilany Santos",
          updateText: "Saving prejudicado por acúmulo bases anteriores. Upgrade parado imediatamente pedido Lívia",
          actionRequired: "Ana retorna 18/08 - corrigir lógica campanhas + limpar bases acumuladas"
        },
        {
          id: 7,
          title: "API Retorna Cadastro Vazio - Duplicidade Crítica",
          description: "API retorna apenas único cadastro para operador - impossível identificar doadores cadastrados. Problema confirmado reunião 13/08",
          impact: "Contatos duplicados críticos especialmente 'carrinhos abandonados' - operadores não conseguem identificar duplicidade",
          responsible: "Carolina UNICEF + Lívia + Jane",
          deadline: "URGENTE - 18/08/2025",
          priority: "urgent",
          lastUpdate: "13/08/2025",
          author: "Deisilany Santos",
          updateText: "Deisilany comunicou Lívia - prometeu conversar Jane. Carolina UNICEF trabalhando parceria para corrigir situação crítica",
          actionRequired: "Jane + Carolina UNICEF: corrigir API para retornar dados completos doadores cadastrados"
        },
        {
          id: 8,
          title: "Nagarro Intermediação - Segmentações Incorretas",
          description: "Equipe saving/upgrade parada - segmentações incorretas fornecidas pela Nagarro. Sistema automático não funciona",
          impact: "Campanha upgrade parou - apenas 3.000 de 17.000 eram novos contatos. Bases acumuladas meses anteriores",
          responsible: "Nagarro + Giovanni + Ana UNICEF",
          deadline: "URGENTE - 18/08/2025",
          priority: "urgent",
          lastUpdate: "13/08/2025",
          author: "Deisilany Santos",
          updateText: "Nagarro responsável tudo automático - mas segmentação errada causou acúmulo bases anteriores",
          actionRequired: "Ana retorna 18/08 - corrigir lógica Nagarro + limpar bases acumuladas"
        },
        {
          id: 9,
          title: "Intermediação Nagarro - Lentidão API Crítica",
          description: "Lentidão API devido conexão SalesForce via Nagarro - demora até 1 minuto carregar donadores",
          impact: "Operadoras precisam 'enrolar' apresentação inicial para ter tempo chamar doador pelo nome - experiência ruim",
          responsible: "Nagarro + SalesForce + Giovanni",
          deadline: "URGENTE - 15/08/2025",
          priority: "urgent",
          lastUpdate: "13/08/2025",
          author: "Pedro Espinoza + Deisilany Santos",
          updateText: "Pedro explica: Nagarro camada segurança exigida UNICEF para SalesForce - mas comunicação muito lenta",
          actionRequired: "Otimizar integração Nagarro-SalesForce ou revisar arquitetura intermediação"
        },
        {
          id: 10,
          title: "Estornos Mal Direcionados - Pasta Incorreta",
          description: "Estornos escalados não chegam pasta correta 'decopses' - equipe WA gastando tempo buscando informações",
          impact: "Procedimento acordado falha: estornos >R$ 2.000 ou débito conta não chegam aprovação correta",
          responsible: "Luciana + Giovanni + Deisilany",
          deadline: "URGENTE - 18/08/2025",
          priority: "urgent",
          lastUpdate: "26/08/2025",
          author: "Deisilany Santos",
          updateText: "ATUALIZAÇÃO 26/08: Problema persiste - processando estornos manualmente via relatoria para evitar problemas maiores",
          actionRequired: "Luciana definir resultado sistema + Giovanni implementar direcionamento pasta decopses"
        },
        {
          id: 11,
          title: "🚨 CRÍTICO - Cancelamentos Não Funcionam",
          description: "Sistema não cancela cadastros mesmo após comando - 10 cadastros acumulados pendentes cancelamento",
          impact: "Problemas operacionais críticos + insatisfação doadores - comando cancelamento deveria ter prioridade",
          responsible: "Giovanni + UNICEF + Saurav",
          deadline: "URGENTE - 30/08/2025",
          priority: "urgent",
          lastUpdate: "26/08/2025",
          author: "Deisilany Santos + Giovanni",
          updateText: "CRÍTICO 26/08: Sistema não cancela após comando. Sinalizado para UNICEF - aguardando solução urgente",
          actionRequired: "UNICEF resolver falha cancelamento + Giovanni investigar causa raíz comando"
        }
      ]
    },
    esta_semana: {
      title: "📊 ESTA SEMANA - Acompanhar",
      color: "bg-yellow-50 border-yellow-200",
      headerColor: "bg-yellow-600",
      items: [
        {
          id: 7,
          title: "⚠️ Bot WhatsApp Intrometendo - Proposta WA",
          description: "Bot não para quando atendente inicia - Lívia considerando parar WhatsApp. WA propôs solução em 15 dias sem custo",
          impact: "Pedro enviou proposta agressiva: tratamento demandas iniciais + API em 60 dias",
          responsible: "WA Contact Center + Pedro",
          deadline: "AGUARDANDO DECISÃO - Lívia e Carolzinha",
          priority: "urgent",
          lastUpdate: "30/07/2025",
          author: "Pedro + Carol",
          updateText: "Decisão reunião: bot com mensagem temporária direcionando para 0800 até correções",
          actionRequired: "Carol criar conteúdo mensagem + Saurav implementar hoje"
        },
        {
          id: 10,
          title: "Customer Mobile Number Format Issues",
          description: "Campo mobile sem '+' causando falha na automação WhatsApp",
          impact: "Mensagens WhatsApp não sendo enviadas por formato incorreto número",
          responsible: "Saurav + Bruno (database update)",
          deadline: "26/07/2025",
          priority: "medium",
          lastUpdate: "30/07/2025",
          author: "Saurav",
          updateText: "Fórmula backend não copia corretamente customer mobile number field",
          actionRequired: "Bruno atualizar database + corrigir fórmula backend"
        },
        {
          id: 111,
          title: "✅ BI - Filtro Tabulação Corrigido",
          description: "Giovanni ajustou filtro para mostrar apenas conversões e conversões alt no BI",
          impact: "Pedro agora tem campos necessários para preparar estrutura BI - visualização correta",
          responsible: "Giovanni + Pedro",
          deadline: "✅ RESOLVIDO - 26/08/2025",
          priority: "high",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Pedro Espinoza + Giovanni",
          updateText: "Giovanni: precisa ajustar filtro tabulação mostrar apenas conversões. Ajustes finos serão posteriores"
        },
        {
          id: 13,
          title: "💰 Estornos - Direcionamento Pasta Backoffices",
          description: "Deisilany conversar Luciana para entender resultado sistema direcionar estornos pasta correta",
          impact: "Estornos que deveriam ser escalados não chegam pasta correta - todos devem ir equipe WA",
          responsible: "Deisilany Santos + Luciana + Giovanni",
          deadline: "18/08/2025",
          priority: "high",
          lastUpdate: "13/08/2025",
          author: "Deisilany Santos",
          updateText: "Procedimento acordado: estornos para equipe WA, valores >R$2.000 ou débito conta exige aprovação",
          actionRequired: "Luciana: definir resultado sistema + Giovanni: implementar direcionamento pasta decopses"
        },
        {
          id: 14,
          title: "🔄 Estorno Parcial - Teste Atualização Vind",
          description: "Deisilany verificar se estorno parcial atualiza na vind - realizar teste outro cadastro",
          impact: "Verificar funcionamento estorno parcial para confirmar integração Vind",
          responsible: "Deisilany Santos + Giovanni",
          deadline: "18/08/2025",
          priority: "medium",
          lastUpdate: "13/08/2025",
          author: "Deisilany Santos",
          updateText: "Próxima etapa: testar estorno parcial em cadastro diferente para validar atualização Vind",
          actionRequired: "Deisilany: executar teste estorno parcial + Giovanni: verificar integração Vind"
        },
      ]
    },
    proxima_reuniao: {
      title: "📅 PRÓXIMA REUNIÃO - Verificar",
      color: "bg-green-50 border-green-200", 
      headerColor: "bg-green-600",
      items: [
        {
          id: 14,
          title: "Status Cases Assignment Rules",
          description: "Verificar se correção owner field API está funcionando para cases escalados",
          impact: "Cases chegando nas filas corretas para atendimento",
          responsible: "Saurav + Giovanni + Luciana",
          deadline: "30/07/2025",
          priority: "high",
          lastUpdate: "30/07/2025",
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
          lastUpdate: "30/07/2025",
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
          lastUpdate: "30/07/2025",
          author: "Pedro + Carol",
          updateText: "Implementar mensagem direcionando para 0800 até bot funcionar 100%",
          actionRequired: "Coletar feedback donadores + métricas cancelamento receptivo"
        },
        {
          id: 20,
          title: "📋 Relatório de Bugs Organizado Ana",
          description: "Equipe utilizando relatório organizado pela Ana - inclui número do caso, doador, prints e URLs",
          impact: "Facilita identificação e resolução de problemas - controle mais eficiente",
          responsible: "Ana + Equipe Operacional",
          deadline: "✅ ATIVO - 30/07/2025",
          priority: "medium",
          lastUpdate: "30/07/2025",
          author: "Deisilany Santos",
          updateText: "Relatório estruturado melhora rastreamento de issues",
          actionRequired: "Manter uso do relatório para todos os casos"
        },
        {
          id: 19,
          title: "Status Middleware Vindi-Salesforce",
          description: "Acompanhar desenvolvimento da solução definitiva + owner field API",
          impact: "Solução definitiva para problemas de integração + cases perdidos",
          responsible: "Giovanni + Equipe TI",
          deadline: "30/07/2025",
          priority: "high",
          lastUpdate: "30/07/2025",
          author: "Giovanni",
          updateText: "Middleware + owner field são soluções definitivas para múltiplos problemas",
          actionRequired: "Verificar cronograma desenvolvimento + possíveis bloqueios"
        },
      ]
    },
    completadas: {
      title: "✅ COMPLETADAS/RESUELTAS",
      color: "bg-gray-50 border-gray-200",
      headerColor: "bg-gray-600",
      items: [
        {
          id: 100,
          title: "✅ Migração Partner COMPLETADA",
          description: "Avanços na plataforma Partner para canal digital e WhatsApp - Saurav ajudou ajustar vários problemas",
          impact: "Sistema Partner operacional - equipe técnica Carol e Saurav trabalhando juntos",
          responsible: "Giovanni + Saurav + Carol",
          deadline: "✅ COMPLETADO - 21/07/2025",
          priority: "high",
          lastUpdate: "30/07/2025",
          completedDate: "30/07/2025",
          movedToCompleted: "30/07/2025"
        },
        {
          id: 101,
          title: "✅ Backoffices Sobrecarregadas RESOLVIDO",
          description: "Equipe não realiza mais trabalho manual - verificando alterações na Vind através da plataforma Seias FC",
          impact: "Middleware Vind Sales Force resolvido - operação automatizada",
          responsible: "Deisilany + Ana UNICEF",
          deadline: "✅ RESOLVIDO - 30/07/2025",
          priority: "high",
          lastUpdate: "30/07/2025",
          completedDate: "30/07/2025",
          movedToCompleted: "30/07/2025"
        },
        {
          id: 102,
          title: "✅ Geração de Recibos FUNCIONANDO",
          description: "Geração e envio de recibos ajustados e funcionando perfeitamente via Partner",
          impact: "Recibos anuais e pontuais sendo enviados corretamente aos donadores",
          responsible: "Saurav + Luciana",
          deadline: "✅ RESOLVIDO - 30/07/2025",
          priority: "high",
          lastUpdate: "30/07/2025",
          completedDate: "30/07/2025",
          movedToCompleted: "30/07/2025"
        },
        {
          id: 103,
          title: "✅ Search Functionality RESOLVIDO",
          description: "Busca por CPF/nome funcionando corretamente no sistema",
          impact: "Equipe pode localizar donadores eficientemente",
          responsible: "Saurav + Team",
          deadline: "✅ RESOLVIDO - 30/07/2025",
          priority: "high",
          lastUpdate: "30/07/2025",
          completedDate: "30/07/2025",
          movedToCompleted: "30/07/2025"
        },
        {
          id: 104,
          title: "✅ Integração 4 Novatos CONCLUÍDA",
          description: "4 novatos bem integrados ao sistema Partner - avaliação positiva nos primeiros 45 dias",
          impact: "Equipe reforçada - novatos operando normalmente no Partner",
          responsible: "Deisilany + Giovanni + RH",
          deadline: "✅ CONCLUÍDO - 30/07/2025",
          priority: "high",
          lastUpdate: "30/07/2025",
          completedDate: "30/07/2025",
          movedToCompleted: "30/07/2025"
        },
        {
          id: 105,
          title: "✅ Campanha Elétrica - 6 Sucessos Agosto",
          description: "6 sucessos reativação elétrica desde início mês agosto - performance mantida",
          impact: "Campanha Legados 14,06% sucesso - bases enriquecidas funcionando bem",
          responsible: "Deisilany + Equipe Vindi",
          deadline: "✅ EM ANDAMENTO - 06/08/2025",
          priority: "high",
          lastUpdate: "06/08/2025",
          completedDate: "06/08/2025",
          movedToCompleted: "06/08/2025"
        },
        {
          id: 106,
          title: "✅ Templates WhatsApp Recuperados",
          description: "Templates WhatsApp que haviam desaparecido foram recuperados",
          impact: "Operação WhatsApp normalizada - templates funcionando corretamente",
          responsible: "Saurav + Carol",
          deadline: "✅ RESOLVIDO - 06/08/2025",
          priority: "high",
          lastUpdate: "06/08/2025",
          completedDate: "06/08/2025",
          movedToCompleted: "06/08/2025"
        },
        {
          id: 107,
          title: "✅ Cases Escalados - Fila Específica",
          description: "Giovanni lançou atualização direcionando cases escalados para fila específica",
          impact: "Backoffs podem tratar casos escalados - resolvendo pendência assignment",
          responsible: "Giovanni + Luciana",
          deadline: "✅ RESOLVIDO - 06/08/2025",
          priority: "high",
          lastUpdate: "06/08/2025",
          completedDate: "06/08/2025",
          movedToCompleted: "06/08/2025"
        },
        {
          id: 108,
          title: "✅ Middleware Salesforce Funcionando",
          description: "Middleware Salesforce tem funcionado bem após ajustes",
          impact: "Integração Salesforce estabilizada - fluxo de dados normalizado",
          responsible: "Giovanni + Saurav",
          deadline: "✅ RESOLVIDO - 06/08/2025",
          priority: "high",
          lastUpdate: "06/08/2025",
          completedDate: "06/08/2025",
          movedToCompleted: "06/08/2025"
        },
        {
          id: 109,
          title: "⚖️ Campanha Upgrade - PARADA por Segmentação",
          description: "Campanha upgrade parada por Lívia - apenas 3.000 de 17.000 eram novos. Bases acumuladas problema Nagarro",
          impact: "Operadoras upgrade ociosas - campanha parada até Ana retornar 18/08 e corrigir segmentação",
          responsible: "Lívia + Ana UNICEF + Nagarro",
          deadline: "⚠️ PARADA - 13/08/2025",
          priority: "blocked",
          lastUpdate: "13/08/2025",
          completedDate: "13/08/2025",
          movedToCompleted: "13/08/2025",
          author: "Deisilany Santos",
          updateText: "Campanha oficialmente parada por Lívia após identificar bases duplicadas Nagarro"
        },
        {
          id: 110,
          title: "🤖 Bot WhatsApp - Solução Temporária Implementada", 
          description: "Implementada mensagem temporária direcionando para 0800 até bot funcionar 100%",
          impact: "Reduzindo irritação donadores durante correções - solução temporária funcionando",
          responsible: "Saurav + Carol + Pedro",
          deadline: "✅ IMPLEMENTADO - 06/08/2025",
          priority: "high",
          lastUpdate: "13/08/2025",
          completedDate: "06/08/2025",
          movedToCompleted: "13/08/2025",
          author: "Pedro + Deisilany Santos",
          updateText: "Pedro: WA propôs solução 15 dias sem custo + API 60 dias. Aguardando decisão Lívia/Carolzinha"
        },
        {
          id: 112,
          title: "✅ Tabulações - Reestruturação CANCELADA por Carol",
          description: "Carol acordou não expandir de 160 para 400+ tabulações - estrutura atual atende necessidades",
          impact: "Decisão final: não prosseguir expansão tabulações - sistema atual suficiente",
          responsible: "Carol + Deisilany",
          deadline: "✅ CANCELADO - 26/08/2025",
          priority: "high",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Deisilany Santos + Carol",
          updateText: "FINAL 26/08: Carol concordou não prosseguir expansão para 400+ tabulações - estrutura atual atende"
        },
        {
          id: 113,
          title: "✅ Fila Receptivo Separada - CRIADA",
          description: "Fila por receptivo criada conforme solicitado - Saurav configurou visualização tabulações separadas",
          impact: "Organização melhor das filas - visualização separada para receptivo funcionando",
          responsible: "Saurav + Deisilany",
          deadline: "✅ IMPLEMENTADO - 26/08/2025",
          priority: "high",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Deisilany Santos",
          updateText: "CONCLUÍDO 26/08: Fila receptivo criada e Saurav configurou visualização tabulações separadas"
        },
        {
          id: 114,
          title: "✅ CNPJ Creation - FUNCIONANDO",
          description: "Criação de CNPJs agora funciona corretamente - apenas erro visual no refresh da tela final",
          impact: "Funcionalidade CNPJ operacional - apenas erro estético na finalização",
          responsible: "Giovanni",
          deadline: "✅ RESOLVIDO - 26/08/2025",
          priority: "medium",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Deisilany Santos + Giovanni",
          updateText: "FUNCIONANDO 26/08: CNPJs criados corretamente, Giovanni identificou erro refresh como falha visual"
        },
        {
          id: 115,
          title: "✅ Situação Eliane - DESLIGAMENTO ACORDADO",
          description: "Decisão final sobre Eliane: desligamento acordado devido problemas saúde + mudança estado",
          impact: "Colaboradora histórico bom desempenho - decisão humana considerando saúde familiar",
          responsible: "Daniela Cardoso + Deisilany",
          deadline: "✅ DECIDIDO - 26/08/2025",
          priority: "medium",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Daniela Cardoso + Deisilany Santos",
          updateText: "FINAL 26/08: Eliane deseja mudar estado para cuidados família - rescisão R$3,5k + FGTS R$4k"
        },
        {
          id: 116,
          title: "✅ Processo Seletivo RH - 5 CANDIDATOS APROVADOS",
          description: "RH concluído: 5 candidatos aprovados com turmas seleção até quinta-feira para vagas",
          impact: "Equipe fortalecida - Ana supervisora informada sobre contratações em andamento",
          responsible: "Daniela Cardoso + RH",
          deadline: "✅ CONCLUÍDO - 26/08/2025",
          priority: "high",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Daniela Cardoso + Deisilany Santos",
          updateText: "SUCCESS 26/08: 5 aprovados processo + Ana supervisora ciente contratações seguindo"
        },
        {
          id: 117,
          title: "✅ Planilha Erros - SISTEMA MAIS EFICIENTE",
          description: "Planilha erros diminuindo significativamente - apenas casos cancelamento pendentes",
          impact: "Sistema funcionando mais eficientemente - operação estabilizada",
          responsible: "Deisilany Santos + Giovanni",
          deadline: "✅ MELHORADO - 26/08/2025",
          priority: "medium",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Deisilany Santos",
          updateText: "MELHORIA 26/08: Planilha erros diminuindo - sistema mais eficiente operacionalmente"
        },
        {
          id: 118,
          title: "✅ Ana Caremã - Atestado NÃO ABONADO",
          description: "Decisão tomada: atestado comparecimento Ana Caremã não será abonado devido histórico",
          impact: "Política definida - evitar precedente que impacte equipe geral",
          responsible: "Daniela Cardoso + Deisilany",
          deadline: "✅ DECIDIDO - 26/08/2025",
          priority: "low",
          lastUpdate: "26/08/2025",
          completedDate: "26/08/2025",
          movedToCompleted: "26/08/2025",
          author: "Daniela Cardoso + Deisilany Santos",
          updateText: "DEFINIDO 26/08: Atestado não abonado - colaborador entra férias, situação monitorada"
        }
      ]
    }
  };

  // Estado mutable del Kanban con localStorage y version control
  const [kanbanData, setKanbanData] = useState(() => {
    const currentVersion = FORCE_RELOAD_VERSION + '-' + BUILD_TIMESTAMP; // Version control
    const savedVersion = localStorage.getItem('unicef-kanban-version');
    
    // Solo limpiar si la versión cambió (sistema inteligente de cache)
    if (savedVersion !== currentVersion) {
      console.log('🔄 VERSION CHANGED - Clearing cache:', savedVersion, '->', currentVersion);
      localStorage.removeItem('unicef-kanban-data');
      localStorage.removeItem('unicef-kanban-version');
      localStorage.setItem('unicef-kanban-version', currentVersion);
      localStorage.setItem('unicef-kanban-data', JSON.stringify(initialKanbanData));
      
      // LOG VISIBLE PARA VERIFICAR VERSÃO CARREGADA
      console.log('🚀 UNICEF DASHBOARD LOADED - NEW VERSION:', currentVersion);
      console.log('📅 BUILD TIMESTAMP:', BUILD_TIMESTAMP);
      console.log('✅ DADOS ATUALIZADOS COM NOVOS PROBLEMAS CRÍTICOS');
      
      return initialKanbanData;
    } else {
      // Usar datos guardados si la versión es la misma
      const savedData = localStorage.getItem('unicef-kanban-data');
      if (savedData) {
        console.log('📊 USING SAVED DATA - VERSION:', currentVersion);
        return JSON.parse(savedData);
      } else {
        // Fallback a datos iniciales
        localStorage.setItem('unicef-kanban-data', JSON.stringify(initialKanbanData));
        return initialKanbanData;
      }
    }
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
      urgent: <Zap className="w-4 h-4 animate-pulse" />,
      blocked: <Clock className="w-4 h-4" />,
      high: <Target className="w-4 h-4 animate-bounce" />,
      medium: <Star className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />,
      low: <Heart className="w-4 h-4 heart-beat" />
    };
    return icons[priority] || <Sparkles className="w-4 h-4" />;
  };

  const getItemCount = (column) => kanbanData[column].items.length;
  const getUrgentCount = () => kanbanData.critico.items.filter(item => item.priority === 'urgent').length;

  // Celebration trigger function
  const handleCelebration = useCallback((type = 'success', message) => {
    const celebration = triggerCelebration(type, message);
    
    // Show toast notification
    setShowToast({
      type: celebration.type,
      message: celebration.message
    });
    
    // Show confetti for major celebrations
    if (celebration.showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    // Show hearts for special moments
    if (celebration.showHearts) {
      setShowHearts(true);
    }
  }, [triggerCelebration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="seasonal-sparkle" style={{ top: '10%', left: '5%' }}>
          <Sparkles className="w-4 h-4 text-blue-300 opacity-30" />
        </div>
        <div className="seasonal-sparkle" style={{ top: '20%', right: '8%', animationDelay: '1s' }}>
          <Heart className="w-3 h-3 text-pink-300 opacity-20" />
        </div>
        <div className="seasonal-sparkle" style={{ bottom: '15%', left: '10%', animationDelay: '2s' }}>
          <Star className="w-4 h-4 text-yellow-300 opacity-25" />
        </div>
      </div>
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
                    const currentVersion = FORCE_RELOAD_VERSION + '-' + BUILD_TIMESTAMP;
                    console.log('🔄 FORCE REFRESH - Nueva versión:', currentVersion);
                    localStorage.removeItem('unicef-kanban-data');
                    localStorage.removeItem('unicef-kanban-version');
                    localStorage.setItem('unicef-kanban-version', currentVersion);
                    localStorage.setItem('unicef-kanban-data', JSON.stringify(initialKanbanData));
                    setKanbanData(initialKanbanData);
                    // Force page reload to ensure complete refresh
                    window.location.reload();
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
            <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-red-300">39,21%</div>
                <div className="text-blue-200 text-sm">Receptivo (26/08)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-green-300">49,1%</div>
                <div className="text-blue-200 text-sm">WhatsApp (26/08)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-2xl font-bold text-yellow-300">39,47%</div>
                <div className="text-blue-200 text-sm">E-mail (26/08)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-lg font-bold text-white">37</div>
                <div className="text-blue-200 text-sm">Cadastros UNICEF</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-lg font-bold text-orange-300">2,85%</div>
                <div className="text-blue-200 text-sm">Saving Diário</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-lg font-bold text-white">18/08/2025</div>
                <div className="text-blue-200 text-sm">Retorno Ana UNICEF</div>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
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
          <p className="text-xs text-gray-400 mt-1">Atualizado: 26/08/2025 - Catchup Semanal 16:25 CAT | Powered by Claude Code Agent</p>
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
      
      {/* ===== UNICEF DELIGHT SYSTEM COMPONENTS ===== */}
      
      {/* Toast Notifications */}
      {showToast && (
        <ToastNotification 
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
      
      {/* Confetti Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <ConfettiParticle 
              key={i} 
              color={['#1CABE2', '#80BD41', '#FFC72C', '#F77FBE'][i % 4]} 
              delay={Math.random() * 3}
            />
          ))}
        </div>
      )}
      
      {/* Floating Hearts for Special Moments */}
      <FloatingHearts 
        show={showHearts} 
        onComplete={() => setShowHearts(false)}
      />
      
      {/* Inspirational Moments */}
      <InspirationMoment 
        show={showInspiration}
        onClose={() => setShowInspiration(false)}
      />
      
      {/* Loading Overlay with Delight */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
            <DelightfulLoader />
          </div>
        </div>
      )}
      
      {/* Background ambient elements */}
      <div className="fixed bottom-4 right-4 pointer-events-none z-10">
        <div className="text-xs text-blue-400 opacity-50 animate-pulse">
          ✨ Fazendo a diferença para as crianças do Brasil ✨
        </div>
      </div>
      
    </div>
  );
};

export default UnicefKanbanDashboard;