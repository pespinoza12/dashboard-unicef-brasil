import './App.css'

// Datos de ejemplo para las tarjetas
const initialTasks = {
  todo: [
    { id: 'task-1', content: 'Analizar transcripción de la reunión de kickoff' },
    { id: 'task-2', content: 'Definir la estructura de la base de datos' },
  ],
  inProgress: [
    { id: 'task-3', content: 'Desarrollar el componente de la interfaz del tablero' },
  ],
  done: [
    { id: 'task-4', content: 'Configurar el entorno de desarrollo inicial' },
  ],
};

// Componente para una tarjeta individual
function Card({ content }: { content: string }) {
  return <div className="card">{content}</div>;
}

// Componente para una columna del tablero
function Column({ title, tasks }: { title: string, tasks: { id: string, content: string }[] }) {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="card-list">
        {tasks.map(task => <Card key={task.id} content={task.content} />)}
      </div>
    </div>
  );
}

// Componente principal de la aplicación
function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Kanban Inteligente</h1>
      </header>
      <main className="board">
        <Column title="Por Hacer" tasks={initialTasks.todo} />
        <Column title="En Progreso" tasks={initialTasks.inProgress} />
        <Column title="Hecho" tasks={initialTasks.done} />
      </main>
    </div>
  )
}

export default App