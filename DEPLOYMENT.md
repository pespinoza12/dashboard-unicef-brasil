# 🚀 Guía de Deployment - Contabu con EasyPanel

## 📋 Prerrequisitos

- Servidor Contabu activo
- EasyPanel instalado y configurado
- Dominio configurado (opcional)
- Acceso SSH al servidor

## 🔧 Preparación del Proyecto

### 1. Build del Frontend
```bash
cd frontend
npm install
npm run build
```

### 2. Preparar Backend para Servir Frontend
Modificar `backend/index.js`:

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API routes (para futuras funcionalidades)
app.use('/api', require('./routes/api'));

// Fallback para React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

### 3. Crear package.json principal
```json
{
  "name": "dashboard-manager",
  "version": "1.0.0",
  "description": "Dashboard Manager para EnelX B2C 2025",
  "main": "backend/index.js",
  "scripts": {
    "start": "node backend/index.js",
    "build": "cd frontend && npm install && npm run build",
    "install-all": "cd frontend && npm install && cd ../backend && npm install"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

## 🌐 Deployment en EasyPanel

### Paso 1: Crear Nueva Aplicación

1. **Acceder a EasyPanel**
   - Ir a tu panel de Contabu
   - Abrir EasyPanel

2. **Crear Aplicación Node.js**
   - Click "New Service"
   - Seleccionar "Node.js App"
   - Nombre: `dashboard-manager`

### Paso 2: Configuración de la Aplicación

**Configuración Básica:**
```
Name: dashboard-manager
Repository: (si usas Git) o subir archivos
Branch: main
Build Command: npm run build
Start Command: npm start
Port: 3000
```

**Variables de Entorno:**
```
NODE_ENV=production
PORT=3000
```

### Paso 3: Subir Archivos

**Opción A: Via Git (Recomendado)**
1. Inicializar repositorio:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <tu-repo-url>
git push -u origin main
```

**Opción B: Upload Manual**
1. Comprimir proyecto en .zip
2. Subir via EasyPanel interface
3. Extraer en directorio de la app

### Paso 4: Configurar Dominio

1. **Dominio Personalizado**
   - En EasyPanel, ir a "Domains"
   - Agregar tu dominio
   - Configurar DNS si es necesario

2. **SSL (Automático con EasyPanel)**
   - Se configura automáticamente
   - Verificar certificado válido

## 📁 Estructura Final en Servidor

```
/app/
├── backend/
│   ├── index.js              # Servidor principal
│   ├── package.json          # Dependencias backend
│   └── routes/               # APIs futuras
├── frontend/
│   ├── dist/                 # Build files (generados)
│   ├── src/                  # Código fuente
│   └── package.json          # Dependencias frontend
├── package.json              # Scripts principales
├── README.md                 # Documentación
└── DEPLOYMENT.md             # Esta guía
```

## 🔄 Proceso de Actualización

### Método 1: Git Deploy (Automático)
```bash
# Hacer cambios localmente
git add .
git commit -m "Actualización dashboard"
git push origin main

# EasyPanel auto-detecta y redeploya
```

### Método 2: Build Manual
```bash
# 1. Build local
npm run build

# 2. Subir archivos via FTP/SFTP
scp -r frontend/dist/* user@servidor:/app/frontend/dist/

# 3. Reiniciar aplicación
# En EasyPanel: "Restart Application"
```

## 🛠️ Scripts de Automatización

### deploy.sh (Linux/Mac)
```bash
#!/bin/bash
echo "🚀 Iniciando deployment..."

# Build frontend
cd frontend
npm run build
cd ..

# Comprimir archivos
tar -czf dashboard-update.tar.gz frontend/dist backend

# Subir al servidor (configurar credenciales)
scp dashboard-update.tar.gz user@tu-servidor:/tmp/

# Comando remoto para actualizar
ssh user@tu-servidor "
  cd /app &&
  tar -xzf /tmp/dashboard-update.tar.gz &&
  pm2 restart dashboard-manager
"

echo "✅ Deployment completado!"
```

### deploy.bat (Windows)
```batch
@echo off
echo 🚀 Iniciando deployment...

cd frontend
call npm run build
cd ..

echo ✅ Build completado!
echo 📤 Subir archivos manualmente a EasyPanel
pause
```

## 🔍 Verificación Post-Deploy

### Checklist de Verificación
- [ ] Aplicación inicia sin errores
- [ ] Dashboard carga correctamente
- [ ] Estilos TailwindCSS aplicados
- [ ] Iconos Lucide visibles
- [ ] Animaciones funcionando
- [ ] Responsive design correcto
- [ ] SSL certificado válido

### URLs de Verificación
```
https://tu-dominio.com/          # Dashboard principal
https://tu-dominio.com/api/      # API endpoints (futuro)
```

## 🔧 Troubleshooting

### Problema: Estilos no cargan
**Solución:**
```javascript
// Verificar en backend/index.js
app.use(express.static(path.join(__dirname, '../frontend/dist')));
```

### Problema: 404 en rutas
**Solución:**
```javascript
// Agregar fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
```

### Problema: Puerto ocupado
**Solución:**
```bash
# Cambiar puerto en EasyPanel
PORT=3001
```

## 📞 Soporte

**Para problemas de deployment:**
1. Verificar logs en EasyPanel
2. Revisar configuración de dominio
3. Verificar build del frontend
4. Contactar soporte de Contabu si es necesario

---

*Guía actualizada: Julio 2025*