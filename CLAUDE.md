# Claude Code Session History - Dashboard Manager UNICEF Brasil

## 🎯 PROYECTO REPLICADO EXITOSAMENTE
**URL objetivo:** https://dashboard-unicef-brasil.tnrk2n.easypanel.host/
**Estado:** 🔄 EN CONFIGURACIÓN

## 🚀 DEPLOY AUTOMÁTICO EASYPANEL
**Endpoint para redeploy automático:** 
```
http://38.242.207.133:3000/api/deploy/06adccd410cf5637e0af27e25b9187b7ce53e496204887ce
```
- Claude puede usar este endpoint para hacer redeploy automático
- No requiere acceso manual a EasyPanel
- Activa después de cada push a GitHub

## 📋 RESUMEN DEL PROYECTO
- **Nombre:** Dashboard Manager para UNICEF Brasil - Supporter Service
- **Cliente:** UNICEF Brasil
- **Servicio:** Atención a donantes (teléfono, WhatsApp, sistemas digitales)
- **Proyecto:** Desde 2019 - 6 años operando
- **CEO:** Pedro Espinoza
- **Gerente:** Daisy Lenny Santos (Brasilia)
- **Equipo:** 45+ personas
- **Base donantes:** 100,000+ donantes
- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express 4.21.2
- **Deploy:** EasyPanel (Heroku buildpacks)
- **Repositorio:** https://github.com/pespinoza12/dashboard-unicef-brasil.git

## 🔧 PROBLEMAS RESUELTOS

### 1. Error path-to-regexp (SOLUCIONADO)
**Problema:** TypeError: Missing parameter name - Express v5 incompatible con EasyPanel
**Solución final:**
- Downgrade Express 5.1.0 → 4.21.2
- Forzar Node.js 18.20.0 exacto en package.json engines
- Eliminar todos los package-lock.json y regenerar limpios
- Cambiar middleware de `app.get('*')` a middleware personalizado

### 2. Estructura del proyecto adaptada para UNICEF Brasil
```
dashboard-unicef-brasil/
├── backend/
│   ├── index.js (Express server con middleware SPA)
│   ├── package.json (Express 4.21.2)
│   └── package-lock.json (válido)
├── frontend/
│   ├── src/unicef-dashboard.tsx (componente principal UNICEF)
│   ├── src/enelx-dashboard.tsx (componente original EnelX)
│   ├── package.json (React + Vite + Tailwind)
│   └── dist/ (build para producción)
├── package.json (engines: node 18.20.0)
├── .nvmrc (18.20.0)
├── CONFIGURACION-CLIENTE.md (datos específicos UNICEF)
└── CLAUDE.md (este archivo)
```

## 🚀 COMANDOS IMPORTANTES

### Deploy local
```bash
cd dashboard-Controle-Unicef
npm run build           # Construye frontend
npm start              # Inicia servidor en puerto 3000
```

### Deploy en EasyPanel
1. Hacer cambios en código
2. `git add . && git commit -m "descripción"`
3. `git push`
4. En EasyPanel: botón "Deploy" o "Redeploy"

### Troubleshooting
```bash
# Si hay problemas con dependencias
rm -rf node_modules frontend/node_modules backend/node_modules
rm package-lock.json frontend/package-lock.json backend/package-lock.json
npm install

# Verificar versiones
node --version  # Debe ser 18.20.0 en EasyPanel
npm list express  # Debe ser 4.21.2
```

## 📝 PRÓXIMOS PASOS ACORDADOS

### 🎯 FLUJO DE TRABAJO AUTOMATIZADO PROPUESTO:
1. **Cliente sube transcripciones** → Nueva carpeta en proyecto (sugerencias: `reuniones/`, `updates/`, `transcripciones/`)
2. **Claude lee transcripción** → Analiza requerimientos del cliente
3. **Claude actualiza dashboard** → Implementa cambios solicitados
4. **Claude sube a GitHub** → Commit automático con descripción
5. **Pedro redespliega** → EasyPanel actualiza la aplicación

### 📁 Estructura sugerida para transcripciones:
```
dashboard-manager/
└── reuniones/
    ├── 2025-07-16-reunion-cliente.md
    ├── 2025-07-17-feedback-dashboard.md
    └── 2025-07-18-nuevos-requerimientos.md
```

### 🔄 Formato sugerido para transcripciones:
```markdown
# Reunión Cliente - [FECHA]

## Participantes
- Cliente: [nombres]
- Desarrollador: Pedro

## Requerimientos nuevos
- [ ] [Requerimiento 1] (Prioridad: Alta/Media/Baja)
- [ ] [Requerimiento 2] (Prioridad: Alta/Media/Baja)

## Cambios solicitados
- [ ] [Cambio 1]
- [ ] [Cambio 2]

## Notas importantes
- [Notas adicionales]
```

## 🎮 ENDPOINTS API ACTUALES

### Backend (puerto 3000)
- `GET /api/health` - Health check
- `GET /api/dashboard` - Datos del dashboard
- `POST /api/update-dashboard` - Actualizar dashboard (TODO: implementar)
- `GET /*` - Middleware SPA fallback para React Router

### Frontend
- Dashboard principal en `/` 
- Componente: `unicef-dashboard.tsx` (principal)
- Componente: `enelx-dashboard.tsx` (referencia)
- Estilos: Tailwind CSS
- Branding: UNICEF Brasil (azul #00AEEF)

## ⚠️ CONSIDERACIONES TÉCNICAS

### Versiones críticas (NO CAMBIAR)
- Node.js: 18.20.0 (exacto)
- Express: 4.21.2 (NO v5 - causa errores)
- React: 18+ 
- Vite: 7.0.4

### EasyPanel configuración
- Builder: Heroku buildpacks
- Port: 3000 (automático)
- Start command: `npm start`
- Build command: `npm run build`

## 📞 CONTACTO
- **CEO:** Pedro Espinoza
- **Cliente:** UNICEF Brasil
- **Gerente Proyecto:** Daisy Lenny Santos (Brasilia)
- **Proyecto:** Dashboard Manager UNICEF - Supporter Service
- **Equipo:** 45+ personas
- **Base donantes:** 100,000+ donantes

## 🎯 OBJETIVOS ESPECÍFICOS UNICEF
- **Gestión de reuniones:** Control Pedro-Daisy semanales
- **Mapeo de updates:** Todas las conversaciones registradas
- **Priorización:** Sistema visual de tareas
- **Delegación:** Gestión de responsabilidades del equipo
- **Campañas:** Saving, upgrade, aumento de valor, legados
- **Operación:** Lunes a viernes, Brasilia

---
**Última actualización:** 2025-07-17 17:30 GMT
**Estado del proyecto:** 🔄 DASHBOARD REPLICADO - LISTO PARA DEPLOY
**Próxima tarea:** Configurar GitHub y EasyPanel para UNICEF Brasil
