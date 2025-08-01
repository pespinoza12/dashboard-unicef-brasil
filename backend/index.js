const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Configuración de seguridad
const API_KEYS = [
  'enelx_dashboard_key_2025',
  'wa_contact_center_key',
  'pedro_admin_key'
];

// Middleware de autenticación
const authenticateAPI = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey || !API_KEYS.includes(apiKey)) {
    return res.status(401).json({
      error: 'API key requerida',
      message: 'Incluye X-API-Key en headers'
    });
  }
  
  req.apiKey = apiKey;
  next();
};

// FORCE CACHE INVALIDATION - Variable global para bust cache
let CACHE_BUSTER = Date.now();

// Servir archivos estáticos del frontend build - SIN CACHE + BUST CACHE AGRESIVO
app.use(express.static(path.join(__dirname, '../frontend/dist'), {
  setHeaders: (res, path, stat) => {
    // Deshabilitar cache para todos los archivos
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.set('Pragma', 'no-cache');
    res.set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
    // Bust cache agresivo con timestamp
    res.set('ETag', false);
    res.set('Last-Modified', new Date().toUTCString());
    res.set('X-Cache-Buster', CACHE_BUSTER.toString());
    res.set('X-Timestamp', Date.now().toString());
    res.set('X-Force-Reload', 'true');
  },
  etag: false,
  lastModified: false
}));

// Health check endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    project: 'Dashboard Manager - EnelX B2C 2025',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Additional health check endpoints that EasyPanel might expect
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// ENDPOINT ESPECIAL - Invalidar cache de EasyPanel
app.get('/api/cache-bust', (req, res) => {
  // Actualizar cache buster global
  CACHE_BUSTER = Date.now();
  
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
  res.set('X-Cache-Buster', CACHE_BUSTER.toString());
  res.set('X-Force-Reload', 'true');
  
  res.json({
    message: 'Cache invalidated - EasyPanel should serve fresh files',
    cacheBuster: CACHE_BUSTER,
    timestamp: new Date().toISOString(),
    action: 'FORCE_RELOAD_ALL_STATIC_FILES'
  });
});

// API para obtener datos del dashboard
app.get('/api/dashboard', (req, res) => {
  res.json({
    message: 'Dashboard API endpoint ready',
    version: '1.0.0',
    project: 'EnelX B2C 2025'
  });
});

// Servir API Tester
app.get('/api-tester', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/api-tester.html'));
});

/**
 * API Endpoint para crear/actualizar dashboards.
 * Aquí implementaremos la lógica para modificar dashboards dinámicamente.
 */
app.post('/api/update-dashboard', authenticateAPI, (req, res) => {
  console.log('🔄 Petición recibida en /api/update-dashboard');
  console.log('📊 Datos del dashboard:', req.body);
  console.log('🔑 API Key utilizada:', req.apiKey);
  
  try {
    const { tasks, comments, progress, metadata } = req.body;
    
    // Validar estructura de datos
    if (!tasks && !comments && !progress) {
      return res.status(400).json({
        error: 'Datos insuficientes',
        message: 'Se requiere al menos tasks, comments o progress'
      });
    }
    
    // Actualizar archivo de datos del dashboard
    const dashboardDataPath = path.join(__dirname, '../frontend/src/dashboard-data.json');
    let dashboardData = {};
    
    // Leer datos existentes si el archivo existe
    if (fs.existsSync(dashboardDataPath)) {
      dashboardData = JSON.parse(fs.readFileSync(dashboardDataPath, 'utf8'));
    }
    
    // Actualizar datos
    if (tasks) dashboardData.tasks = { ...dashboardData.tasks, ...tasks };
    if (comments) dashboardData.comments = [...(dashboardData.comments || []), ...comments];
    if (progress) dashboardData.progress = { ...dashboardData.progress, ...progress };
    if (metadata) dashboardData.metadata = { ...dashboardData.metadata, ...metadata };
    
    dashboardData.lastUpdated = new Date().toISOString();
    dashboardData.updatedBy = req.apiKey;
    
    // Escribir datos actualizados
    fs.writeFileSync(dashboardDataPath, JSON.stringify(dashboardData, null, 2));
    
    console.log('✅ Dashboard actualizado exitosamente');
    
    res.status(200).json({ 
      message: 'Dashboard actualizado correctamente',
      timestamp: new Date().toISOString(),
      changes: {
        tasks: tasks ? Object.keys(tasks).length : 0,
        comments: comments ? comments.length : 0,
        progress: progress ? Object.keys(progress).length : 0
      },
      data: req.body
    });
    
  } catch (error) {
    console.error('❌ Error actualizando dashboard:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

/**
 * Nuevo endpoint para procesar transcripciones de reuniones
 */
app.post('/api/process-transcription', authenticateAPI, (req, res) => {
  console.log('📝 Petición recibida en /api/process-transcription');
  console.log('🔑 API Key utilizada:', req.apiKey);
  
  try {
    const { transcription, meetingDate, participants, metadata } = req.body;
    
    if (!transcription) {
      return res.status(400).json({
        error: 'Transcripción requerida',
        message: 'El campo transcription es obligatorio'
      });
    }
    
    // Crear directorio de transcripciones si no existe
    const transcriptionsDir = path.join(__dirname, '../reuniones');
    if (!fs.existsSync(transcriptionsDir)) {
      fs.mkdirSync(transcriptionsDir, { recursive: true });
    }
    
    // Generar nombre de archivo único
    const date = meetingDate || new Date().toISOString().split('T')[0];
    const timestamp = new Date().getTime();
    const filename = `reunion_${date}_${timestamp}.json`;
    const filepath = path.join(transcriptionsDir, filename);
    
    // Estructura de la transcripción
    const transcriptionData = {
      id: crypto.randomUUID(),
      meetingDate: meetingDate || new Date().toISOString(),
      participants: participants || [],
      transcription: transcription,
      metadata: metadata || {},
      processedAt: new Date().toISOString(),
      processedBy: req.apiKey,
      status: 'pending_analysis',
      filename: filename
    };
    
    // Guardar transcripción
    fs.writeFileSync(filepath, JSON.stringify(transcriptionData, null, 2));
    
    console.log(`✅ Transcripción guardada: ${filename}`);
    
    // TODO: Aquí se integrará el procesamiento con Claude API
    // Por ahora devolvemos respuesta de éxito
    
    res.status(200).json({
      message: 'Transcripción procesada correctamente',
      transcriptionId: transcriptionData.id,
      filename: filename,
      status: 'saved',
      nextStep: 'pending_ai_analysis',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error procesando transcripción:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

/**
 * Endpoint para listar transcripciones guardadas
 */
app.get('/api/transcriptions', authenticateAPI, (req, res) => {
  try {
    const transcriptionsDir = path.join(__dirname, '../reuniones');
    
    if (!fs.existsSync(transcriptionsDir)) {
      return res.json({ transcriptions: [], count: 0 });
    }
    
    const files = fs.readdirSync(transcriptionsDir)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filepath = path.join(transcriptionsDir, file);
        const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return {
          id: data.id,
          filename: file,
          meetingDate: data.meetingDate,
          participants: data.participants,
          status: data.status,
          processedAt: data.processedAt
        };
      })
      .sort((a, b) => new Date(b.processedAt) - new Date(a.processedAt));
    
    res.json({
      transcriptions: files,
      count: files.length
    });
    
  } catch (error) {
    console.error('❌ Error listando transcripciones:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Middleware para manejar rutas SPA
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Skip static asset routes - let them 404 naturally
  if (req.path.startsWith('/assets/') || 
      req.path.match(/\.(js|css|svg|png|jpg|ico|woff|woff2|ttf|eot)$/)) {
    return res.status(404).send('Asset not found');
  }
  
  // For all other routes, serve index.html (SPA fallback) - FORCE NO CACHE
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
  res.set('ETag', false);
  res.set('X-Cache-Buster', CACHE_BUSTER.toString());
  res.set('X-Timestamp', Date.now().toString());
  res.set('X-Force-Reload', 'true');
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

// Manejo de errores y señales
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  console.log('🔍 Process uptime:', process.uptime(), 'seconds');
  console.log('🔍 Memory usage:', process.memoryUsage());
  console.log('🔍 Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PWD: process.env.PWD
  });
  
  // Dar tiempo para que las conexiones se cierren
  setTimeout(() => {
    server.close(() => {
      console.log('✅ Server closed gracefully');
      process.exit(0);
    });
  }, 1000);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('🚨 Uncaught Exception:', err);
  console.error('🚨 Stack:', err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Dashboard Manager - Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔧 API Health: http://localhost:${PORT}/api/health`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏗️  Static files: ${path.join(__dirname, '../frontend/dist')}`);
  console.log(`🔍 Process ID: ${process.pid}`);
  console.log(`🔍 Node version: ${process.version}`);
  console.log(`🔍 Platform: ${process.platform}`);
  console.log(`🔍 Working directory: ${process.cwd()}`);
  
  // Log periódico para mostrar que el servidor está activo
  setInterval(() => {
    console.log(`💓 Server heartbeat - uptime: ${Math.floor(process.uptime())}s`);
  }, 30000); // Cada 30 segundos
});

server.on('error', (err) => {
  console.error('🚨 Server error:', err);
});

server.on('connection', (socket) => {
  console.log('🔗 New connection established');
});

server.on('close', () => {
  console.log('🛑 Server closed');
});
