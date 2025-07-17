# 🚀 Guía Paso a Paso: Subir Dashboard a EasyPanel

## 📋 Prerrequisitos

- [ ] Servidor Contabu activo
- [ ] EasyPanel instalado en el servidor
- [ ] Acceso al panel de administración
- [ ] Dominio configurado (opcional)

## 🔧 PASO 1: Preparar el Proyecto Localmente

### 1.1 Instalar Dependencias
```bash
# En la carpeta raíz del proyecto
cd dashboard-manager

# Instalar todas las dependencias
npm run install:all
```

### 1.2 Hacer Build del Frontend
```bash
# Build para producción
npm run build
```

### 1.3 Probar Localmente
```bash
# Iniciar servidor de producción
npm start

# Verificar en: http://localhost:3000
```

## 🌐 PASO 2: Acceder a EasyPanel

### 2.1 Abrir EasyPanel
1. Ir a la IP de tu servidor Contabu
2. Puerto: `:3000` (o el puerto configurado)
3. URL típica: `http://tu-ip-servidor:3000`

### 2.2 Login
- Usuario: `admin` (o el que configuraste)
- Contraseña: La que estableciste durante la instalación

## 📦 PASO 3: Crear Nueva Aplicación

### 3.1 Crear Servicio
1. Click en **"Services"** en el menú lateral
2. Click en **"Create Service"**
3. Seleccionar **"App"**

### 3.2 Configuración Básica
```
Name: dashboard-manager
Description: Dashboard Manager - EnelX B2C 2025
```

### 3.3 Configurar Source
**Opción A: Upload de Archivos**
1. Seleccionar **"Upload"**
2. Comprimir proyecto: `dashboard-manager.zip`
3. Subir archivo ZIP

**Opción B: Git Repository (Recomendado)**
1. Seleccionar **"Git"**
2. Repository URL: `https://github.com/tu-usuario/dashboard-manager`
3. Branch: `main`

## ⚙️ PASO 4: Configurar Build

### 4.1 Build Settings
```
Build Command: npm run build
Start Command: npm start
```

### 4.2 Environment Variables
```
NODE_ENV=production
PORT=3000
```

### 4.3 Port Configuration
```
Port: 3000
```

## 🔗 PASO 5: Configurar Dominio

### 5.1 Agregar Dominio
1. Ir a **"Domains"**
2. Click **"Add Domain"**
3. Configurar:
```
Domain: tu-dominio.com
Service: dashboard-manager
Port: 3000
```

### 5.2 SSL Certificate
- EasyPanel configurará SSL automáticamente
- Verificar que aparezca el candado verde

## 📁 PASO 6: Estructura de Archivos a Subir

```
dashboard-manager/
├── backend/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── dist/              # Generado por npm run build
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── package.json           # Scripts principales
├── README.md
└── .gitignore
```

## 🚀 PASO 7: Deploy

### 7.1 Iniciar Deploy
1. Click **"Deploy"** en la aplicación
2. Esperar a que termine el build
3. Verificar logs en tiempo real

### 7.2 Verificar Deploy
```
✅ Build successful
✅ Application started
✅ Port 3000 listening
✅ Health check OK
```

## 🔍 PASO 8: Verificación Post-Deploy

### 8.1 Verificar URLs
```
https://tu-dominio.com/           # Dashboard principal
https://tu-dominio.com/api/health # Health check
```

### 8.2 Checklist de Verificación
- [ ] Dashboard carga correctamente
- [ ] Estilos TailwindCSS aplicados
- [ ] Iconos Lucide visibles
- [ ] Animaciones funcionando
- [ ] Responsive design
- [ ] SSL certificado válido

## 🔄 PASO 9: Actualizaciones Futuras

### 9.1 Actualización Manual
```bash
# Localmente
npm run build

# Comprimir y subir nuevamente
# O usar Git push si configuraste repositorio
```

### 9.2 Auto-Deploy con Git
1. Configurar webhook en EasyPanel
2. Push a repositorio activa deploy automático

## 📊 PASO 10: Monitoreo

### 10.1 Verificar Logs
1. Ir a **"Logs"** en EasyPanel
2. Verificar que no hay errores
3. Monitorear performance

### 10.2 Health Check
- URL: `https://tu-dominio.com/api/health`
- Respuesta esperada:
```json
{
  "status": "OK",
  "timestamp": "2025-07-16T...",
  "project": "Dashboard Manager - EnelX B2C 2025",
  "version": "1.0.0"
}
```

## 🛠️ Troubleshooting

### Problema: Build falla
**Solución:**
```bash
# Verificar localmente
npm run build

# Si funciona local pero falla en server:
# Verificar versión Node.js en EasyPanel
```

### Problema: Aplicación no inicia
**Solución:**
```bash
# Verificar puerto correcto
PORT=3000

# Verificar comando de inicio
npm start
```

### Problema: Dominio no resuelve
**Solución:**
1. Verificar DNS configurado
2. Verificar proxy en EasyPanel
3. Verificar SSL certificate

### Problema: 404 en rutas
**Solución:**
```javascript
// Verificar fallback en backend/index.js
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
```

## 📞 Soporte

### Logs Útiles
```bash
# En EasyPanel, revisar:
- Application logs
- Build logs
- System logs
```

### Contactos
- Documentación EasyPanel: `https://easypanel.io/docs`
- Soporte Contabu: Panel de cliente

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu dashboard estará disponible en:
- **URL Principal:** `https://tu-dominio.com`
- **API Health:** `https://tu-dominio.com/api/health`

Tu dashboard estará actualizado y accesible desde cualquier lugar, bajo tu control total.

---

*Guía actualizada: Julio 2025*