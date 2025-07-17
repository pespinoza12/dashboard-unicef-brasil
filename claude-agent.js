#!/usr/bin/env node

/**
 * 🤖 Claude Code Agent - Procesador Automático de Transcripciones
 * 
 * Este script permite a Claude Code actuar como agente inteligente para:
 * 1. Obtener transcripciones pendientes
 * 2. Analizarlas y extraer información relevante
 * 3. Actualizar el dashboard automáticamente
 * 4. Hacer redeploy automático
 */

const fs = require('fs');
const path = require('path');

// Configuración del agente
const CONFIG = {
  API_BASE: 'https://relatorios-enelx.tnrk2n.easypanel.host',
  API_KEY: 'enelx_dashboard_key_2025',
  REDEPLOY_ENDPOINT: 'http://38.242.207.133:3000/api/deploy/25c125cfc5635d4a61bfbb0a61c4c1b1aa7aa2a458cecb5a',
  TRANSCRIPTIONS_DIR: './reuniones',
  DASHBOARD_DATA_FILE: './frontend/src/dashboard-data.json'
};

// Mapeo de palabras clave a task IDs
const TASK_KEYWORDS = {
  'acessos': 'rh-acessos',
  'acceso': 'rh-acessos', 
  'sws': 'rh-acessos',
  'contratos': 'rh-contratos',
  'contrato': 'rh-contratos',
  'treinamentos': 'rh-treinamentos',
  'treinamento': 'rh-treinamentos',
  'capacitacion': 'rh-treinamentos',
  'whatsapp': 'infra-whatsapp',
  'wa': 'infra-whatsapp',
  'telefonia': 'infra-telefonia',
  'algar': 'infra-telefonia',
  '0800': 'infra-telefonia',
  'relatórios': 'infra-relatorios',
  'relatorios': 'infra-relatorios',
  'dashboard': 'infra-relatorios',
  'bi': 'dev-bi',
  'reunião': 'gestao-reunioes',
  'reunion': 'gestao-reunioes',
  'meeting': 'gestao-reunioes',
  'suporte': 'gestao-suporte',
  'support': 'gestao-suporte',
  'ia': 'ia-monitoramento',
  'inteligencia': 'ia-monitoramento',
  'artificial': 'ia-monitoramento',
  'ura': 'gestao-ura',
  'hsm': 'infra-hsm',
  'campanha': 'infra-hsm',
  'campaign': 'infra-hsm'
};

// Expresiones regulares para extraer información
const PATTERNS = {
  progress: /(\d{1,3})%|progresso.*?(\d{1,3})|avance.*?(\d{1,3})|(\d{1,3}).*?por.*?cento/gi,
  completed: /concluído|finalizado|terminado|completo|listo|done|✅|acabado/gi,
  inProgress: /em andamento|en progreso|trabajando|developing|⚡|🔄/gi,
  dates: /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})|(\d{1,2}) de (janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/gi,
  people: /(pedro|daniela|carlos|fabio|fábio|giovanni|nicolas|natália|natalia|valéria|valeria|fernando|wagner)/gi,
  priorities: /urgente|alta prioridad|critical|importante|priority|prioridade/gi
};

/**
 * Función principal del agente Claude Code
 */
async function runClaudeAgent() {
  console.log('🤖 Claude Code Agent iniciado...');
  console.log('📝 Buscando transcripciones pendientes...');
  
  try {
    // 1. Obtener transcripciones pendientes
    const pendingTranscriptions = await getPendingTranscriptions();
    
    if (pendingTranscriptions.length === 0) {
      console.log('✅ No hay transcripciones pendientes para procesar');
      return;
    }
    
    console.log(`📋 Encontradas ${pendingTranscriptions.length} transcripciones pendientes`);
    
    // 2. Procesar cada transcripción
    for (const transcription of pendingTranscriptions) {
      console.log(`\n🔄 Procesando: ${transcription.filename}`);
      
      const analysis = analyzeTranscription(transcription);
      console.log('🧠 Análisis completado:', analysis);
      
      if (analysis.updates) {
        // 3. Actualizar dashboard
        await updateDashboard(analysis.updates);
        console.log('📊 Dashboard actualizado');
        
        // 4. Marcar transcripción como procesada
        await markTranscriptionProcessed(transcription.id);
      }
    }
    
    // 5. Hacer redeploy automático
    await performRedeploy();
    console.log('🚀 Redeploy completado');
    
    console.log('\n✅ Claude Code Agent finalizado exitosamente');
    
  } catch (error) {
    console.error('❌ Error en Claude Code Agent:', error);
    process.exit(1);
  }
}

/**
 * Obtener transcripciones pendientes de procesamiento
 */
async function getPendingTranscriptions() {
  const transcriptionsDir = path.resolve(CONFIG.TRANSCRIPTIONS_DIR);
  
  if (!fs.existsSync(transcriptionsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(transcriptionsDir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filepath = path.join(transcriptionsDir, file);
      const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      return data;
    })
    .filter(data => data.status === 'pending_analysis');
  
  return files;
}

/**
 * Analizar transcripción y extraer información relevante
 * Esta es la "inteligencia" de Claude Code
 */
function analyzeTranscription(transcription) {
  const text = transcription.transcription.toLowerCase();
  const analysis = {
    taskUpdates: {},
    newComments: [],
    progressChanges: {},
    metadata: {}
  };
  
  console.log('🔍 Analizando contenido de la transcripción...');
  
  // Extraer progreso mencionado
  const progressMatches = [...text.matchAll(PATTERNS.progress)];
  progressMatches.forEach(match => {
    const percentage = parseInt(match[1] || match[2] || match[3] || match[4]);
    if (percentage >= 0 && percentage <= 100) {
      console.log(`📊 Progreso detectado: ${percentage}%`);
      
      // Intentar asociar con una tarea específica
      const taskId = findRelatedTask(text, match.index);
      if (taskId) {
        analysis.progressChanges[taskId] = percentage;
        console.log(`🎯 Asociado a tarea: ${taskId}`);
      }
    }
  });
  
  // Detectar tareas completadas
  const completedTasks = findCompletedTasks(text);
  completedTasks.forEach(taskId => {
    analysis.taskUpdates[taskId] = { completed: true, progress: 100 };
    console.log(`✅ Tarea completada detectada: ${taskId}`);
  });
  
  // Detectar tareas en progreso
  const inProgressTasks = findInProgressTasks(text);
  inProgressTasks.forEach(taskId => {
    if (!analysis.taskUpdates[taskId]) {
      analysis.taskUpdates[taskId] = { completed: false };
    }
    console.log(`⚡ Tarea en progreso detectada: ${taskId}`);
  });
  
  // Extraer comentarios importantes
  const comments = extractImportantComments(transcription);
  analysis.newComments = comments;
  
  // Extraer fechas importantes
  const dates = extractDates(text);
  if (dates.length > 0) {
    analysis.metadata.importantDates = dates;
  }
  
  // Detectar personas mencionadas
  const people = [...text.matchAll(PATTERNS.people)];
  if (people.length > 0) {
    analysis.metadata.participants = [...new Set(people.map(p => p[1]))];
  }
  
  // Construir objeto de actualización para API
  const updates = {};
  
  if (Object.keys(analysis.taskUpdates).length > 0 || Object.keys(analysis.progressChanges).length > 0) {
    updates.tasks = {};
    
    // Aplicar cambios de progreso
    Object.entries(analysis.progressChanges).forEach(([taskId, progress]) => {
      updates.tasks[taskId] = {
        progress: progress,
        completed: progress === 100
      };
    });
    
    // Aplicar actualizaciones de tareas
    Object.entries(analysis.taskUpdates).forEach(([taskId, update]) => {
      updates.tasks[taskId] = { ...updates.tasks[taskId], ...update };
    });
  }
  
  if (analysis.newComments.length > 0) {
    updates.comments = analysis.newComments;
  }
  
  if (Object.keys(analysis.metadata).length > 0) {
    updates.metadata = {
      ...analysis.metadata,
      processedBy: 'claude-code-agent',
      processedAt: new Date().toISOString(),
      sourceTranscription: transcription.filename
    };
  }
  
  return { analysis, updates: Object.keys(updates).length > 0 ? updates : null };
}

/**
 * Encontrar tarea relacionada basada en el contexto
 */
function findRelatedTask(text, matchIndex) {
  // Buscar palabras clave en un rango de 100 caracteres antes y después
  const start = Math.max(0, matchIndex - 100);
  const end = Math.min(text.length, matchIndex + 100);
  const context = text.substring(start, end);
  
  for (const [keyword, taskId] of Object.entries(TASK_KEYWORDS)) {
    if (context.includes(keyword)) {
      return taskId;
    }
  }
  
  return null;
}

/**
 * Encontrar tareas marcadas como completadas
 */
function findCompletedTasks(text) {
  const completedTasks = [];
  const sentences = text.split(/[.!?]/);
  
  sentences.forEach(sentence => {
    if (PATTERNS.completed.test(sentence)) {
      // Buscar palabras clave de tareas en la misma oración
      for (const [keyword, taskId] of Object.entries(TASK_KEYWORDS)) {
        if (sentence.includes(keyword)) {
          completedTasks.push(taskId);
        }
      }
    }
  });
  
  return [...new Set(completedTasks)];
}

/**
 * Encontrar tareas en progreso
 */
function findInProgressTasks(text) {
  const inProgressTasks = [];
  const sentences = text.split(/[.!?]/);
  
  sentences.forEach(sentence => {
    if (PATTERNS.inProgress.test(sentence)) {
      for (const [keyword, taskId] of Object.entries(TASK_KEYWORDS)) {
        if (sentence.includes(keyword)) {
          inProgressTasks.push(taskId);
        }
      }
    }
  });
  
  return [...new Set(inProgressTasks)];
}

/**
 * Extraer comentarios importantes de la transcripción
 */
function extractImportantComments(transcription) {
  const text = transcription.transcription;
  const comments = [];
  
  // Dividir en oraciones y filtrar las importantes
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 10);
  
  sentences.forEach(sentence => {
    // Buscar oraciones que contengan información importante
    if (PATTERNS.priorities.test(sentence) || 
        PATTERNS.completed.test(sentence) ||
        PATTERNS.inProgress.test(sentence) ||
        sentence.includes('%')) {
      
      // Encontrar tarea relacionada
      const taskId = findRelatedTask(sentence.toLowerCase(), 0);
      
      comments.push({
        taskId: taskId || 'general',
        text: `🤖 Claude Code Agent: ${sentence.trim()}`,
        author: 'Claude Code Agent',
        timestamp: new Date().toLocaleDateString('pt-BR'),
        source: 'transcription_analysis'
      });
    }
  });
  
  return comments.slice(0, 5); // Limitar a 5 comentarios más importantes
}

/**
 * Extraer fechas mencionadas
 */
function extractDates(text) {
  const dates = [];
  const dateMatches = [...text.matchAll(PATTERNS.dates)];
  
  dateMatches.forEach(match => {
    dates.push(match[0]);
  });
  
  return [...new Set(dates)];
}

/**
 * Actualizar dashboard via API
 */
async function updateDashboard(updates) {
  try {
    const response = await fetch(`${CONFIG.API_BASE}/api/update-dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CONFIG.API_KEY
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('✅ Dashboard actualizado:', result.message);
    return result;
    
  } catch (error) {
    console.error('❌ Error actualizando dashboard:', error);
    throw error;
  }
}

/**
 * Marcar transcripción como procesada
 */
async function markTranscriptionProcessed(transcriptionId) {
  // Actualizar archivo local
  const transcriptionsDir = path.resolve(CONFIG.TRANSCRIPTIONS_DIR);
  const files = fs.readdirSync(transcriptionsDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filepath = path.join(transcriptionsDir, file);
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    
    if (data.id === transcriptionId) {
      data.status = 'processed_by_claude';
      data.processedAt = new Date().toISOString();
      data.processedBy = 'claude-code-agent';
      
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      console.log(`✅ Transcripción marcada como procesada: ${file}`);
      break;
    }
  }
}

/**
 * Realizar redeploy automático
 */
async function performRedeploy() {
  try {
    const response = await fetch(CONFIG.REDEPLOY_ENDPOINT);
    console.log('🚀 Redeploy ejecutado');
    return true;
  } catch (error) {
    console.error('❌ Error en redeploy:', error);
    return false;
  }
}

// Simular fetch para Node.js (ya que este script se ejecutará en línea de comandos)
global.fetch = global.fetch || require('node-fetch');

// Ejecutar si es llamado directamente
if (require.main === module) {
  runClaudeAgent();
}

module.exports = {
  runClaudeAgent,
  analyzeTranscription,
  CONFIG
};