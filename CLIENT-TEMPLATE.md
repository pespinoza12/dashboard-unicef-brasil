# 📋 Template de Cliente - Dashboard Kanban

## 🎯 Datos del Cliente a Personalizar

### Información Básica
```
CLIENTE_NOMBRE: [Ej: "Banco Central", "Movistar", "Claro"]
CLIENTE_SLUG: [Ej: "banco-central", "movistar", "claro"]
SERVICIO: [Ej: "Atención al Cliente", "Ventas", "Soporte Técnico"]
INDUSTRIA: [Ej: "Banca", "Telecomunicaciones", "Retail"]
UBICACION: [Ej: "São Paulo", "Lima", "Bogotá"]
EQUIPO_SIZE: [Ej: "45", "120", "25"]
GERENTE_NOMBRE: [Ej: "María González", "João Silva"]
```

### Métricas Específicas
```
METRICA_1: [Ej: "Llamadas Atendidas", "Ventas Cerradas"]
METRICA_1_VALOR: [Ej: "85.5%", "1,250"]
METRICA_2: [Ej: "Satisfacción Cliente", "Conversión"]
METRICA_2_VALOR: [Ej: "92.3%", "15.8%"]
METRICA_3: [Ej: "Tiempo Promedio", "Tickets Cerrados"]
METRICA_3_VALOR: [Ej: "3.5 min", "89%"]
```

### Configuración de Columnas
```
COLUMNA_1_TITULO: [Ej: "🔥 URGENTE - Acción Inmediata"]
COLUMNA_1_COLOR: [Ej: "red", "orange", "purple"]
COLUMNA_2_TITULO: [Ej: "📊 EN PROCESO - Monitorear"]
COLUMNA_2_COLOR: [Ej: "yellow", "blue", "indigo"]
COLUMNA_3_TITULO: [Ej: "✅ COMPLETADO - Verificar"]
COLUMNA_3_COLOR: [Ej: "green", "emerald", "teal"]
```

---

## 🏗️ Estructura de Archivos a Crear

```
📁 dashboard-[CLIENTE_SLUG]/
├── 📄 package.json ← Copiar y personalizar
├── 📄 .gitignore ← Copiar directamente
├── 📄 CONFIGURACION-CLIENTE.md ← Crear nuevo
├── 📁 backend/
│   ├── 📄 package.json ← Copiar directamente
│   └── 📄 index.js ← Copiar directamente
├── 📁 frontend/
│   ├── 📄 package.json ← Copiar directamente
│   ├── 📄 index.html ← Copiar y personalizar
│   ├── 📄 vite.config.js ← Copiar directamente
│   ├── 📄 tailwind.config.js ← Copiar directamente
│   └── 📁 src/
│       ├── 📄 main.tsx ← Copiar directamente
│       ├── 📄 App.tsx ← Copiar y personalizar
│       └── 📄 [cliente]-kanban-dashboard.tsx ← Crear nuevo
└── 📁 dist/ ← Se genera automáticamente
```

---

## 🔧 Plantillas de Personalización

### 1. package.json Principal
```json
{
  "name": "dashboard-[CLIENTE_SLUG]",
  "version": "1.0.0",
  "description": "Dashboard Kanban para [CLIENTE_NOMBRE] - [SERVICIO] - Sistema de gestión y seguimiento",
  "main": "backend/index.js",
  "scripts": {
    "start": "node backend/index.js",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "echo 'Using pre-built frontend/dist from repository'",
    "build:local": "cd frontend && npm install && npm run build",
    "build:production": "cd frontend && npm ci && npm run build"
  },
  "keywords": [
    "dashboard",
    "kanban",
    "react",
    "nodejs",
    "[CLIENTE_SLUG]",
    "[INDUSTRIA]",
    "wa-contact-center"
  ],
  "author": "WA Contact Center - [CLIENTE_NOMBRE]",
  "license": "Private",
  "engines": {
    "node": "18.20.0",
    "npm": ">=8.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "node-fetch": "^2.6.7"
  },
  "devDependencies": {
    "concurrently": "^9.1.0"
  }
}
```

### 2. frontend/index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/wa-logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Dashboard de gestión [CLIENTE_NOMBRE] - [SERVICIO] - WA Contact Center" />
    <meta name="keywords" content="dashboard, [CLIENTE_SLUG], wa contact center, [SERVICIO], [INDUSTRIA]" />
    <title>Dashboard [CLIENTE_NOMBRE] - WA Contact Center</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3. frontend/src/App.tsx
```tsx
import [CLIENTE_NOMBRE]KanbanDashboard from './[CLIENTE_SLUG]-kanban-dashboard';

function App() {
  return (
    <[CLIENTE_NOMBRE]KanbanDashboard />
  );
}

export default App;
```

### 4. CONFIGURACION-CLIENTE.md
```markdown
# Dashboard Kanban - [CLIENTE_NOMBRE]

## 📊 Información del Cliente
- **Nombre:** [CLIENTE_NOMBRE]
- **Servicio:** [SERVICIO]
- **Industria:** [INDUSTRIA]
- **Equipo:** [EQUIPO_SIZE] personas
- **Ubicación:** [UBICACION]
- **Gerente:** [GERENTE_NOMBRE]

## 🔗 URLs y Configuración
- **URL Dashboard:** https://dashboard-[CLIENTE_SLUG].tnrk2n.easypanel.host/
- **GitHub:** https://github.com/pespinoza12/dashboard-[CLIENTE_SLUG]
- **Deploy Token:** [TOKEN_DEPLOY]

## 📈 Métricas del Dashboard
- **[METRICA_1]:** [METRICA_1_VALOR]
- **[METRICA_2]:** [METRICA_2_VALOR]
- **[METRICA_3]:** [METRICA_3_VALOR]

## 🎯 Configuración de Columnas
1. **[COLUMNA_1_TITULO]** - Color: [COLUMNA_1_COLOR]
2. **[COLUMNA_2_TITULO]** - Color: [COLUMNA_2_COLOR]
3. **[COLUMNA_3_TITULO]** - Color: [COLUMNA_3_COLOR]

## 📞 Contacto
- **CEO:** Pedro Espinoza
- **Cliente:** [CLIENTE_NOMBRE]
- **Gerente Proyecto:** [GERENTE_NOMBRE]
- **Equipo:** [EQUIPO_SIZE] personas

---
**Creado:** $(date)
**Actualizado:** $(date)
**Estado:** ✅ DASHBOARD EN PRODUCCIÓN
```

---

## 🚀 Comandos de Replicación Rápida

### Paso 1: Crear proyecto
```bash
# Crear carpeta
mkdir dashboard-[CLIENTE_SLUG]
cd dashboard-[CLIENTE_SLUG]

# Copiar estructura desde UNICEF
cp -r ../dashboard-Controle-Unicef/* .
```

### Paso 2: Personalizar archivos
```bash
# Renombrar dashboard principal
mv frontend/src/unicef-kanban-dashboard.tsx frontend/src/[CLIENTE_SLUG]-kanban-dashboard.tsx

# Buscar y reemplazar en archivos
# Usar editor de texto para reemplazar:
# "UNICEF Brasil" → "[CLIENTE_NOMBRE]"
# "unicef" → "[CLIENTE_SLUG]"
# "Deisilany Santos" → "[GERENTE_NOMBRE]"
```

### Paso 3: Git y Deploy
```bash
# Inicializar Git
git init
git add .
git commit -m "Initial setup Dashboard [CLIENTE_NOMBRE]"

# Crear repositorio y push
git remote add origin https://github.com/pespinoza12/dashboard-[CLIENTE_SLUG].git
git push -u origin main

# Build y deploy
npm run build:local
git add .
git commit -m "Add build files"
git push
```

---

## 🎯 Checklist de Personalización

### ✅ Archivos Base
- [ ] package.json principal actualizado
- [ ] frontend/index.html personalizado
- [ ] frontend/src/App.tsx actualizado
- [ ] CONFIGURACION-CLIENTE.md creado

### ✅ Dashboard Component
- [ ] Archivo renombrado a [CLIENTE_SLUG]-kanban-dashboard.tsx
- [ ] Nombre del componente actualizado
- [ ] Header y branding personalizados
- [ ] Métricas del cliente configuradas
- [ ] Columnas personalizadas
- [ ] Datos iniciales del cliente
- [ ] Footer actualizado

### ✅ Deploy
- [ ] Repositorio GitHub creado
- [ ] EasyPanel configurado
- [ ] Deploy token obtenido
- [ ] Build inicial deployado
- [ ] Funcionalidades verificadas

---

## 🔄 Mantenimiento Post-Deploy

### Actualizar datos del cliente
1. **Editar** `[CLIENTE_SLUG]-kanban-dashboard.tsx`
2. **Cambiar** datos en `initialKanbanData`
3. **Commit y push**
4. **Redeploy** usando token

### Backup de datos de usuario
```javascript
// En DevTools Console
const data = localStorage.getItem('[CLIENTE_SLUG]-kanban-data');
console.log('Backup data:', data);
```

### Restaurar datos
```javascript
// En DevTools Console
localStorage.setItem('[CLIENTE_SLUG]-kanban-data', '[BACKUP_DATA]');
location.reload();
```

---

**🚀 Con esta plantilla puedes replicar el dashboard en 2-3 horas por cliente**