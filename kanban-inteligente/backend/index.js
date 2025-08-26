const express = require('express');
const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// --- Base de Datos en Memoria ---
const db = {
  projects: {
    'proj-123': {
      id: 'proj-123',
      name: 'Proyecto Alpha',
      board: {
        columns: {
          'col-1': { id: 'col-1', title: 'Por Hacer', taskIds: ['task-1', 'task-2'] },
          'col-2': { id: 'col-2', title: 'En Progreso', taskIds: ['task-3'] },
          'col-3': { id: 'col-3', title: 'Hecho', taskIds: ['task-4'] },
        },
        tasks: {
          'task-1': { id: 'task-1', content: 'Analizar transcripción de la reunión de kickoff' },
          'task-2': { id: 'task-2', content: 'Definir la estructura de la base de datos' },
          'task-3': { id: 'task-3', content: 'Desarrollar el componente de la interfaz del tablero' },
          'task-4': { id: 'task-4', content: 'Configurar el entorno de desarrollo inicial' },
        },
        columnOrder: ['col-1', 'col-2', 'col-3'],
      }
    }
  }
};

// --- Rutas de la API ---

// Endpoint para obtener el estado completo de un tablero
app.get('/api/projects/:projectId/board', (req, res) => {
  const { projectId } = req.params;
  const project = db.projects[projectId];

  if (project) {
    res.json(project.board);
  } else {
    res.status(404).json({ error: 'Proyecto no encontrado' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend del Kanban Inteligente funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});