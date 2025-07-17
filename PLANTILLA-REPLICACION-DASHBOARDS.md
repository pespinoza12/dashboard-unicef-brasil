# 🚀 PLANTILLA DE REPLICACIÓN - Dashboard Manager WA Contact Center

## 🎯 OBJETIVO
Esta documentación te permitirá replicar exactamente el sistema de dashboard que construimos para EnelX con cualquier cliente nuevo. **No reinventes la rueda** - usa esta plantilla paso a paso.

## 📋 RESUMEN DEL SISTEMA COMPLETO

### 🔧 **Arquitectura Técnica:**
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express 4.21.2 + API REST
- **Deploy**: EasyPanel (Heroku buildpacks) + GitHub
- **Agente IA**: Claude Code Agent para procesamiento automático
- **Base de datos**: Archivos JSON (simple y efectivo)

### 🤖 **Funcionalidades Clave:**
- ✅ **Dashboard visual** con progreso en tiempo real
- ✅ **Timeline de proyecto** con fechas y responsables
- ✅ **API completa** para actualizaciones
- ✅ **Claude Code Agent** para procesamiento automático de transcripciones
- ✅ **Deploy automático** sin intervención manual
- ✅ **Interface de testing** para probar APIs

---

## 📁 PASO 1: PREPARACIÓN DE CARPETA CLIENTE

### 🗂️ **Estructura Base:**
```
Cliente-[NOMBRE]/
├── dashboard-manager/          # Proyecto principal
├── README.md                  # Información del cliente
├── CONFIGURACION-CLIENTE.md   # Settings específicos
└── TRANSCRIPCIONES/          # Archivos de reuniones
```

### 📝 **Crear Carpeta Cliente:**
```bash
mkdir -p "C:\Users\pedro\OneDrive\Documents\01-CLIENTES\[NOMBRE-CLIENTE]\Projetos"
cd "C:\Users\pedro\OneDrive\Documents\01-CLIENTES\[NOMBRE-CLIENTE]\Projetos"
```

---

## 🏗️ PASO 2: CLONAR PROYECTO BASE

### 📥 **Copiar Estructura Completa:**
```bash
# Copiar todo el proyecto EnelX como base
cp -r "C:\Users\pedro\OneDrive\Documents\01-CLIENTES\Enel-EnelX\Projetos\dashboard-manager" .

# Renombrar carpeta
mv dashboard-manager dashboard-[NOMBRE-CLIENTE]
cd dashboard-[NOMBRE-CLIENTE]
```

### 🧹 **Limpiar Archivos Específicos:**
```bash
# Eliminar archivos específicos de EnelX
rm -rf .git
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
rm -rf reuniones/*.json

# Limpiar datos de ejemplo
rm -rf frontend/src/dashboard-data.json
```

---

## ⚙️ PASO 3: CONFIGURAR NUEVO CLIENTE

### 📋 **Archivo de Configuración Cliente:**
Crear `CONFIGURACION-CLIENTE.md`:

```markdown
# 🎯 CONFIGURACIÓN - [NOMBRE CLIENTE]

## 📊 INFORMACIÓN BÁSICA
- **Cliente**: [Nombre completo]
- **Proyecto**: [Descripción del proyecto]
- **Fecha inicio**: [DD/MM/YYYY]
- **Fecha estimada fin**: [DD/MM/YYYY]
- **Equipo**: [Número de personas]

## 🎨 BRANDING
- **Logo**: [Ruta del archivo logo]
- **Colores primarios**: [Hex codes]
- **Título dashboard**: Dashboard [CLIENTE] - WA Contact Center

## 👥 EQUIPO PROYECTO
- **Responsable WA**: Pedro Espinoza
- **Cliente principal**: [Nombre]
- **Participantes reuniones**: [Lista]

## 🔑 CONFIGURACIÓN TÉCNICA
- **URL GitHub**: [Será creada]
- **URL EasyPanel**: [Será asignada]
- **API Keys**: [Serán generadas]

## 📅 CRONOGRAMA
[Ajustar según proyecto específico]
```

---

## 🎨 PASO 4: PERSONALIZAR BRANDING

### 🖼️ **Logo Cliente:**
```bash
# Guardar logo en carpeta images
mkdir -p frontend/public/images
# Pedro debe copiar logo como: frontend/public/images/cliente-logo.png
```

### 📝 **Actualizar Títulos:**
1. **frontend/index.html**:
```html
<title>Dashboard [CLIENTE] - WA Contact Center</title>
<meta name="description" content="Dashboard de gestión de proyectos [CLIENTE] - WA Contact Center" />
```

2. **frontend/src/[cliente]-dashboard.tsx**:
```tsx
<h1>DASHBOARD [CLIENTE] - WA CONTACT CENTER</h1>
<p>Proyecto [DESCRIPCIÓN] | Status Atualizado</p>
```

### 🎨 **Colores Personalizados:**
Ajustar colores en `frontend/src/[cliente]-dashboard.tsx` según brand del cliente.

---

## 📊 PASO 5: CONFIGURAR DATOS ESPECÍFICOS

### 🗂️ **Estructura de Tareas:**
Editar `frontend/src/[cliente]-dashboard.tsx`:

```javascript
const [tasks, setTasks] = useState({
  // PERSONALIZAR SEGÚN PROYECTO CLIENTE
  'fase-1': { 
    completed: false, 
    comments: [], 
    startDate: 'YYYY-MM-DD', 
    endDate: 'YYYY-MM-DD', 
    progress: 0 
  },
  'fase-2': { ... },
  // etc.
});

const taskDefinitions = {
  'fase-1': { 
    title: '[Descripción específica del cliente]', 
    responsible: '[Responsable]', 
    category: '[categoria]', 
    priority: 'high',
    section: '[Sección del proyecto]',
    status: 'pending'
  },
  // etc.
};
```

### 🔧 **Configurar Claude Agent:**
Editar `claude-agent.js`:

```javascript
const CONFIG = {
  API_BASE: 'https://dashboard-[cliente].tnrk2n.easypanel.host',
  API_KEY: '[cliente]_dashboard_key_2025',
  REDEPLOY_ENDPOINT: '[Será asignado por EasyPanel]',
  // etc.
};

const TASK_KEYWORDS = {
  // PERSONALIZAR SEGÚN TERMINOLOGÍA DEL CLIENTE
  'palabra-clave-cliente': 'task-id-cliente',
  // etc.
};
```

---

## 🚀 PASO 6: SETUP GITHUB Y EASYPANEL

### 📁 **Crear Repositorio GitHub:**
```bash
# Inicializar Git
git init
git add .
git commit -m "Initial setup - Dashboard [CLIENTE] - WA Contact Center"

# Crear repo en GitHub (manual)
# Nombre: dashboard-[cliente-minuscula]
# Descripción: Dashboard Manager para [CLIENTE] - WA Contact Center

# Conectar repo
git remote add origin https://github.com/pespinoza12/dashboard-[cliente].git
git branch -M main
git push -u origin main
```

### 🔧 **Configurar EasyPanel:**
1. **Crear nueva app en EasyPanel**
2. **Configuración**:
   - **Name**: dashboard-[cliente]
   - **Repository**: https://github.com/pespinoza12/dashboard-[cliente].git
   - **Branch**: main
   - **Build Command**: npm run build
   - **Start Command**: npm start
   - **Port**: 3000

3. **Obtener URL y endpoint deploy**:
   - **URL**: https://dashboard-[cliente].tnrk2n.easypanel.host/
   - **Deploy endpoint**: http://38.242.207.133:3000/api/deploy/[KEY]

---

## 📝 PASO 7: PROMPT PARA CLAUDE

### 🤖 **Prompt de Inicio para Claude:**
```
Hola Claude, voy a crear un dashboard para un nuevo cliente siguiendo 
la plantilla que desarrollamos para EnelX. 

CLIENTE: [NOMBRE]
PROYECTO: [DESCRIPCIÓN]
LOGO: [Archivo adjunto]

Necesito que:
1. Personalices el branding con el logo y colores del cliente
2. Adaptes las tareas según el proyecto específico
3. Configures Claude Code Agent para la terminología del cliente
4. Actualices todos los textos con la información correcta

Tengo la plantilla base lista en: dashboard-[cliente]/
¿Empezamos con la personalización?
```

### 📋 **Información a Proporcionar:**
- **Logo del cliente** (archivo)
- **Colores corporativos** (hex codes)
- **Estructura del proyecto** (fases/etapas)
- **Terminología específica** (keywords)
- **Participantes del equipo**
- **Fechas importantes**

---

## 🔄 PASO 8: FLUJO DE TRABAJO CLIENTE

### 📅 **Reuniones Regulares:**
1. **Pedro tiene reunión con cliente**
2. **Sube transcripción** via API o archivo
3. **Ejecuta Claude Agent**: `npm run claude-agent`
4. **Dashboard se actualiza** automáticamente
5. **Cliente ve progreso** en tiempo real

### 🎯 **URLs Cliente:**
- **Dashboard**: https://dashboard-[cliente].tnrk2n.easypanel.host/
- **API Health**: https://dashboard-[cliente].tnrk2n.easypanel.host/api/health
- **API Tester**: https://dashboard-[cliente].tnrk2n.easypanel.host/api-tester

---

## 📚 PASO 9: DOCUMENTACIÓN CLIENTE

### 📄 **Crear Documentos Específicos:**
1. **README-[CLIENTE].md** - Información general
2. **GUIA-REUNIONES-[CLIENTE].md** - Proceso específico
3. **CLAUDE-AGENT-[CLIENTE].md** - Configuración del agente
4. **API-EXAMPLES-[CLIENTE].md** - Ejemplos de API

### 🎓 **Capacitación Equipo:**
- **Pedro**: Manejo completo del sistema
- **Equipo WA**: Uso básico de API tester
- **Cliente**: Acceso de solo lectura al dashboard

---

## ⚡ PASO 10: OPTIMIZACIONES POR CLIENTE

### 🎨 **Personalizaciones Avanzadas:**
- **Colores corporativos** específicos
- **Métricas particulares** del cliente
- **Integraciones** con sistemas del cliente
- **Reportes personalizados**

### 📊 **Métricas Específicas:**
Cada cliente puede tener métricas diferentes:
- **Retail**: Ventas, conversiones, ROI
- **Tech**: Features, bugs, deployments
- **Consultoría**: Horas, entregables, facturación

---

## 🚀 RESUMEN EJECUTIVO

### ⏱️ **Tiempo de Setup:**
- **Preparación**: 30 minutos
- **Personalización**: 1-2 horas
- **Deploy**: 15 minutos
- **Testing**: 30 minutos
- **Total**: 2-3 horas por cliente

### 💰 **Beneficios:**
- **Escalabilidad**: Un dashboard por cliente
- **Consistencia**: Mismo sistema probado
- **Eficiencia**: No reinventar la rueda
- **Automatización**: Claude Agent en cada proyecto
- **Profesionalismo**: Branding específico por cliente

### 🎯 **Resultado Final:**
Cada cliente tendrá su propio dashboard profesional con:
- ✅ **URL propia** y branding específico
- ✅ **Claude Code Agent** configurado
- ✅ **API completa** para actualizaciones
- ✅ **Deploy automático** sin intervención manual
- ✅ **Proceso de reuniones** optimizado (2-3 minutos)

---

## 📞 CONTACTO Y SOPORTE

**Pedro Espinoza**
- Email: [email]
- WhatsApp: [número]
- GitHub: pespinoza12

**Proceso de Soporte:**
1. **Problemas técnicos**: Contactar Pedro
2. **Nuevas funcionalidades**: Usar Claude Code
3. **Cambios menores**: API tester directo
4. **Emergencias**: WhatsApp inmediato

---

**🤖 Powered by Claude Code Agent | WA Contact Center 2025**

**Versión**: 1.0
**Última actualización**: 17/07/2025
**Próxima revisión**: Según necesidades de clientes