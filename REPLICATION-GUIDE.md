# 📋 Guía de Replicación - Dashboard Kanban Interactivo

## 🎯 Propósito
Esta guía te permite replicar el dashboard Kanban interactivo de UNICEF Brasil para otros clientes de forma rápida y eficiente.

## 📦 Lo que obtienes al replicar
- ✅ Dashboard Kanban interactivo con 3 columnas personalizables
- ✅ Drag & Drop entre columnas
- ✅ Crear, editar y eliminar cards
- ✅ Persistencia en localStorage
- ✅ Deploy automático en EasyPanel + GitHub
- ✅ UI responsiva y profesional

---

## 🚀 PASO 1: Preparación del Proyecto

### 1.1 Crear estructura de carpetas
```
📁 dashboard-[CLIENTE-NOMBRE]/
├── 📁 backend/
│   ├── package.json
│   └── index.js
├── 📁 frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── 📁 src/
│       ├── App.tsx
│       ├── main.tsx
│       └── [cliente]-kanban-dashboard.tsx
├── package.json (principal)
├── .gitignore
└── CONFIGURACION-CLIENTE.md
```

### 1.2 Copiar archivos base desde UNICEF Brasil
Copiar estos archivos del proyecto UNICEF y modificar según cliente:

**Archivos a copiar directamente:**
- `backend/package.json`
- `backend/index.js`
- `frontend/package.json`
- `frontend/vite.config.js`
- `frontend/tailwind.config.js`
- `frontend/index.html`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `package.json` (principal)
- `.gitignore`

**Archivos a personalizar:**
- `frontend/src/unicef-kanban-dashboard.tsx` → `[cliente]-kanban-dashboard.tsx`
- `CONFIGURACION-CLIENTE.md`

---

## 🔧 PASO 2: Personalización para Nuevo Cliente

### 2.1 Actualizar información del cliente

**En `package.json` principal:**
```json
{
  "name": "dashboard-[cliente-nombre]",
  "description": "Dashboard Kanban para [Cliente Name] - [Descripción del servicio]",
  "keywords": ["dashboard", "react", "nodejs", "[cliente]", "kanban"],
  "author": "WA Contact Center - [Cliente Name]"
}
```

**En `frontend/index.html`:**
```html
<meta name="description" content="Dashboard de gestión [Cliente Name] - [Servicio] - WA Contact Center" />
<meta name="keywords" content="dashboard, [cliente], wa contact center, [servicio], [industria]" />
<title>Dashboard [Cliente Name] - WA Contact Center</title>
```

### 2.2 Personalizar el dashboard principal

**Crear `frontend/src/[cliente]-kanban-dashboard.tsx`:**

1. **Copiar** `unicef-kanban-dashboard.tsx`
2. **Cambiar el nombre** del componente:
   ```tsx
   const [Cliente]KanbanDashboard = () => {
   ```

3. **Personalizar datos iniciales** en `initialKanbanData`:
   ```tsx
   const initialKanbanData = {
     critico: {
       title: "🚨 CRÍTICO - Ação Imediata",
       // ... datos específicos del cliente
     },
     em_andamento: {
       title: "📊 EM ANDAMENTO - Acompanhar",
       // ... personalizar según necesidades
     },
     concluido: {
       title: "✅ CONCLUÍDO - Verificar",
       // ... personalizar según necesidades
     }
   };
   ```

4. **Actualizar header y branding:**
   ```tsx
   <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
     PAINEL KANBAN [CLIENTE NAME]
   </h1>
   <p className="text-blue-100 text-xl font-medium">
     Acompanhamento Executivo • [Servicio] • [Ubicación]
   </p>
   ```

5. **Personalizar métricas del header:**
   ```tsx
   <div className="text-2xl font-bold text-white">[Métrica 1]</div>
   <div className="text-blue-200 text-sm">[Descripción]</div>
   ```

6. **Actualizar footer:**
   ```tsx
   <p className="text-xs">
     [Icono] [Descripción del negocio] | 👩‍💼 Gerente: [Nombre] | 🏢 [Ubicación]
   </p>
   ```

### 2.3 Actualizar App.tsx
```tsx
import [Cliente]KanbanDashboard from './[cliente]-kanban-dashboard';

function App() {
  return (
    <[Cliente]KanbanDashboard />
  );
}
```

---

## 🏗️ PASO 3: Configuración GitHub + EasyPanel

### 3.1 Crear repositorio GitHub
```bash
# Crear nuevo repositorio en GitHub
# Nombre: dashboard-[cliente-nombre]
# Descripción: Dashboard Kanban para [Cliente Name] - [Servicio]

# En terminal:
git init
git add .
git commit -m "Initial commit - Dashboard Kanban [Cliente Name]"
git remote add origin https://github.com/pespinoza12/dashboard-[cliente-nombre].git
git push -u origin main
```

### 3.2 Configurar EasyPanel

**Crear nueva aplicación:**
1. **Nombre:** `dashboard-[cliente-nombre]`
2. **Repositorio:** `https://github.com/pespinoza12/dashboard-[cliente-nombre]`
3. **Build command:** `npm run build`
4. **Start command:** `npm start`
5. **Port:** `3000`

**Configuración:**
- **Builder:** Heroku buildpacks
- **Node version:** 18.20.0
- **Environment:** `NODE_ENV=production`

### 3.3 Obtener endpoint de deploy
Después de crear la app, obtener el endpoint:
```
http://38.242.207.133:3000/api/deploy/[TOKEN-UNICO]
```

---

## 🎨 PASO 4: Personalización Avanzada

### 4.1 Cambiar esquema de colores
```tsx
// Para cambiar los colores del tema
const columnColors = {
  critico: {
    color: "bg-red-50 border-red-200",
    headerColor: "bg-red-600"
  },
  em_andamento: {
    color: "bg-yellow-50 border-yellow-200", 
    headerColor: "bg-yellow-600"
  },
  concluido: {
    color: "bg-green-50 border-green-200",
    headerColor: "bg-green-600"
  }
};
```

### 4.2 Personalizar tipos de prioridad
```tsx
const priorities = [
  { value: 'urgent', label: 'Urgente', color: 'bg-red-100 text-red-800' },
  { value: 'high', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
  { value: 'medium', label: 'Média', color: 'bg-blue-100 text-blue-800' },
  { value: 'low', label: 'Baixa', color: 'bg-green-100 text-green-800' }
];
```

### 4.3 Personalizar campos del formulario
Editar `EditCardForm` para agregar/quitar campos específicos del cliente.

---

## 🎯 PASO 5: Datos Iniciales del Cliente

### 5.1 Reemplazar datos de ejemplo
En `initialKanbanData`, reemplazar los datos de UNICEF con:
- **Información real del cliente**
- **Proyectos actuales**
- **Responsables reales**
- **Fechas relevantes**

### 5.2 Configurar localStorage key
```tsx
const [kanbanData, setKanbanData] = useState(() => {
  const saved = localStorage.getItem('[cliente]-kanban-data');
  return saved ? JSON.parse(saved) : initialKanbanData;
});
```

---

## 🚀 PASO 6: Deploy y Pruebas

### 6.1 Build local
```bash
npm run build:local
```

### 6.2 Deploy inicial
```bash
git add .
git commit -m "Setup inicial Dashboard [Cliente Name]"
git push

# Usar endpoint de EasyPanel para deploy
curl -X POST "http://38.242.207.133:3000/api/deploy/[TOKEN]"
```

### 6.3 Verificar funcionalidades
- ✅ Drag & Drop entre columnas
- ✅ Crear nuevos cards
- ✅ Editar cards existentes
- ✅ Eliminar cards
- ✅ Persistencia de datos

---

## 📝 PASO 7: Documentación del Cliente

### 7.1 Crear CONFIGURACION-CLIENTE.md
```markdown
# Dashboard Kanban - [Cliente Name]

## Información del Cliente
- **Nombre:** [Cliente Name]
- **Servicio:** [Descripción del servicio]
- **Equipo:** [Número] personas
- **Ubicación:** [Ciudad, País]
- **Gerente:** [Nombre del gerente]

## URLs y Configuración
- **URL Dashboard:** https://dashboard-[cliente].tnrk2n.easypanel.host/
- **GitHub:** https://github.com/pespinoza12/dashboard-[cliente-nombre]
- **Deploy Token:** [TOKEN]

## Datos Operacionales
- [Métricas específicas del cliente]
- [KPIs relevantes]
- [Información de contacto]
```

---

## 🔄 PASO 8: Mantenimiento y Actualizaciones

### 8.1 Agregar nuevos cards
1. Acceder al dashboard
2. Clic en "Adicionar item" en la columna apropiada
3. Completar información del card
4. Guardar (se guarda automáticamente en localStorage)

### 8.2 Actualizar información del cliente
1. Editar el archivo `[cliente]-kanban-dashboard.tsx`
2. Hacer commit y push
3. Ejecutar redeploy

### 8.3 Backup de datos
Los datos se guardan en localStorage del browser. Para backup:
1. Abrir DevTools (F12)
2. Application → Local Storage
3. Copiar datos de la key `[cliente]-kanban-data`

---

## 📋 CHECKLIST DE REPLICACIÓN

### ✅ Preparación
- [ ] Crear estructura de carpetas
- [ ] Copiar archivos base
- [ ] Personalizar información del cliente

### ✅ Desarrollo
- [ ] Actualizar package.json
- [ ] Personalizar dashboard component
- [ ] Actualizar App.tsx
- [ ] Personalizar datos iniciales

### ✅ Deploy
- [ ] Crear repositorio GitHub
- [ ] Configurar EasyPanel
- [ ] Obtener deploy token
- [ ] Realizar deploy inicial

### ✅ Verificación
- [ ] Probar funcionalidades interactivas
- [ ] Verificar personalización
- [ ] Documentar configuración

---

## 🎯 TIEMPO ESTIMADO
- **Replicación básica:** 2-3 horas
- **Personalización completa:** 4-6 horas
- **Deploy y pruebas:** 1 hora

## 📞 SOPORTE
Para dudas o problemas durante la replicación, contactar al equipo de desarrollo.

---

**Última actualización:** $(date)
**Versión:** 1.0
**Autor:** WA Contact Center - Pedro Espinoza