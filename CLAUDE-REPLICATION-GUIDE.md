# 🤖 Guía de Replicación para Claude AI

## 🎯 Propósito
Esta guía permite a Claude replicar el dashboard Kanban interactivo de UNICEF Brasil para nuevos clientes de forma automatizada.

---

## 📋 Información que necesitas del usuario

### ✅ Datos Básicos del Cliente
```
- Nombre del cliente: [Ej: "Banco Central", "Movistar"]
- Slug del cliente: [Ej: "banco-central", "movistar"]
- Servicio: [Ej: "Atención al Cliente", "Ventas"]
- Industria: [Ej: "Banca", "Telecomunicaciones"]
- Ubicación: [Ej: "São Paulo", "Lima"]
- Tamaño del equipo: [Ej: "45", "120"]
- Nombre del gerente: [Ej: "María González"]
```

### ✅ Métricas del Dashboard
```
- Métrica 1 + Valor: [Ej: "Llamadas Atendidas: 85.5%"]
- Métrica 2 + Valor: [Ej: "Satisfacción Cliente: 92.3%"]
- Métrica 3 + Valor: [Ej: "Tiempo Promedio: 3.5 min"]
```

### ✅ Configuración de Columnas
```
- Columna 1: [Ej: "🔥 URGENTE - Acción Inmediata"]
- Columna 2: [Ej: "📊 EN PROCESO - Monitorear"]
- Columna 3: [Ej: "✅ COMPLETADO - Verificar"]
```

---

## 🚀 Proceso de Replicación (para Claude)

### PASO 1: Crear Estructura de Archivos
```bash
# Crear directorio principal
mkdir dashboard-[CLIENTE_SLUG]

# Crear subdirectorios
mkdir -p dashboard-[CLIENTE_SLUG]/backend
mkdir -p dashboard-[CLIENTE_SLUG]/frontend/src
mkdir -p dashboard-[CLIENTE_SLUG]/frontend/dist/assets
mkdir -p dashboard-[CLIENTE_SLUG]/frontend/dist/images
```

### PASO 2: Copiar Archivos Base
**Archivos a copiar DIRECTAMENTE (sin cambios):**
- `.gitignore`
- `backend/package.json`
- `backend/index.js`
- `frontend/package.json`
- `frontend/vite.config.js`
- `frontend/tailwind.config.js`
- `frontend/src/main.tsx`

**Archivos a copiar y PERSONALIZAR:**
- `package.json` principal
- `frontend/index.html`
- `frontend/src/App.tsx`
- `frontend/src/unicef-kanban-dashboard.tsx` → `[CLIENTE_SLUG]-kanban-dashboard.tsx`

### PASO 3: Aplicar Reemplazos Globales
```javascript
const replacements = {
  'UNICEF Brasil': '[CLIENTE_NOMBRE]',
  'unicef': '[CLIENTE_SLUG]',
  'Deisilany Santos': '[GERENTE_NOMBRE]',
  'Supporter Service': '[SERVICIO]',
  'Brasília': '[UBICACION]',
  'dashboard-Controle-Unicef': 'dashboard-[CLIENTE_SLUG]',
  'PAINEL KANBAN UNICEF BRASIL': 'PAINEL KANBAN [CLIENTE_NOMBRE]',
  '37': '[EQUIPO_SIZE]',
  '42.53%': '[METRICA_1_VALOR]',
  '39.06%': '[METRICA_2_VALOR]',
  'Colaboradores Ativos': '[METRICA_1]',
  'Receptivo (atual)': '[METRICA_2]',
  'Digital (recuperando)': '[METRICA_3]',
  'unicef-kanban-data': '[CLIENTE_SLUG]-kanban-data',
  'UnicefKanbanDashboard': '[CLIENTE_NOMBRE_CAMEL]KanbanDashboard',
  'unicef-kanban-dashboard': '[CLIENTE_SLUG]-kanban-dashboard'
};
```

### PASO 4: Personalizar Dashboard Principal
**En `[CLIENTE_SLUG]-kanban-dashboard.tsx`:**

1. **Cambiar nombre del componente:**
   ```tsx
   const [Cliente]KanbanDashboard = () => {
   ```

2. **Actualizar localStorage key:**
   ```tsx
   const saved = localStorage.getItem('[CLIENTE_SLUG]-kanban-data');
   ```

3. **Personalizar header:**
   ```tsx
   <h1>PAINEL KANBAN [CLIENTE_NOMBRE]</h1>
   <p>Acompanhamento Executivo • [SERVICIO] • [UBICACION]</p>
   ```

4. **Actualizar métricas:**
   ```tsx
   <div className="text-2xl font-bold text-white">[METRICA_1_VALOR]</div>
   <div className="text-blue-200 text-sm">[METRICA_1]</div>
   ```

5. **Personalizar columnas:**
   ```tsx
   const initialKanbanData = {
     critico: {
       title: "[COLUMNA_1]",
       // ...
     },
     em_andamento: {
       title: "[COLUMNA_2]",
       // ...
     },
     concluido: {
       title: "[COLUMNA_3]",
       // ...
     }
   };
   ```

6. **Actualizar footer:**
   ```tsx
   <p>Dashboard [CLIENTE_NOMBRE] - WA Contact Center</p>
   <p>👥 Equipe: [EQUIPO_SIZE] pessoas | 👩‍💼 Gerente: [GERENTE_NOMBRE] | 🏢 [UBICACION]</p>
   ```

### PASO 5: Crear Documentación
**Crear `CONFIGURACION-CLIENTE.md`:**
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
- **Deploy Token:** [PENDIENTE]

## 📈 Métricas del Dashboard
- **[METRICA_1]:** [METRICA_1_VALOR]
- **[METRICA_2]:** [METRICA_2_VALOR]
- **[METRICA_3]:** [METRICA_3_VALOR]

## 🎯 Configuración de Columnas
1. **[COLUMNA_1]**
2. **[COLUMNA_2]**
3. **[COLUMNA_3]**

## 📞 Contacto
- **CEO:** Pedro Espinoza
- **Cliente:** [CLIENTE_NOMBRE]
- **Gerente Proyecto:** [GERENTE_NOMBRE]

## 🚀 Próximos Pasos
1. [ ] Crear repositorio en GitHub
2. [ ] Configurar EasyPanel
3. [ ] Obtener deploy token
4. [ ] Realizar primer deploy
5. [ ] Personalizar datos iniciales

---
**Creado:** [FECHA]
**Estado:** 🔄 EN CONFIGURACIÓN
```

### PASO 6: Crear README con Instrucciones
**Crear `README.md`:**
```markdown
# Dashboard Kanban - [CLIENTE_NOMBRE]

## 🚀 Próximos Pasos

### 1. Configurar Git
git init
git add .
git commit -m "Initial setup Dashboard [CLIENTE_NOMBRE]"

### 2. Crear repositorio GitHub
- Nombre: dashboard-[CLIENTE_SLUG]
- URL: https://github.com/pespinoza12/dashboard-[CLIENTE_SLUG]

### 3. Configurar EasyPanel
- Aplicación: dashboard-[CLIENTE_SLUG]
- Repositorio: GitHub conectado
- Build: npm run build
- Start: npm start

### 4. Primer Deploy
npm run build:local
git add .
git commit -m "Add build files"
git push

## 📋 Información del Cliente
- **Nombre:** [CLIENTE_NOMBRE]
- **Servicio:** [SERVICIO]
- **Gerente:** [GERENTE_NOMBRE]
- **Equipo:** [EQUIPO_SIZE] personas
```

---

## 🔧 Comandos para Claude

### Crear todos los archivos necesarios:
```bash
# Usar el Read tool para leer archivos template
# Usar el Write tool para crear archivos personalizados
# Usar el Edit tool para modificar archivos existentes
# Usar el MultiEdit tool para múltiples cambios
```

### Verificar estructura creada:
```bash
# Usar LS tool para verificar directorios
# Usar Read tool para verificar contenido
```

### Inicializar Git:
```bash
# Usar Bash tool para comandos git
git init
git add .
git commit -m "Initial setup Dashboard [CLIENTE_NOMBRE]"
```

---

## 📋 Checklist de Verificación

### ✅ Estructura de Archivos
- [ ] Directorio dashboard-[CLIENTE_SLUG] creado
- [ ] Subdirectorios backend/ y frontend/src/ creados
- [ ] Archivos base copiados
- [ ] Archivos personalizados creados

### ✅ Personalización
- [ ] package.json actualizado
- [ ] index.html personalizado
- [ ] App.tsx actualizado
- [ ] Dashboard component personalizado
- [ ] Reemplazos globales aplicados

### ✅ Documentación
- [ ] CONFIGURACION-CLIENTE.md creado
- [ ] README.md creado
- [ ] Información del cliente completa

### ✅ Funcionalidad
- [ ] Nombres de componentes correctos
- [ ] localStorage key personalizado
- [ ] Métricas del cliente configuradas
- [ ] Columnas personalizadas

---

## 🎯 Tiempo Estimado
- **Replicación automática:** 15-20 minutos
- **Verificación:** 5-10 minutos
- **Deploy inicial:** 10-15 minutos
- **Total:** 30-45 minutos

## 🚀 Resultado Final
Dashboard Kanban completamente funcional y personalizado para el cliente, listo para:
- Drag & Drop entre columnas
- Crear, editar y eliminar cards
- Persistencia en localStorage
- Deploy en EasyPanel
- Uso inmediato por el cliente

---

**🤖 Esta guía permite a Claude replicar el dashboard de forma completamente automatizada**