# Claude Code Session History - Dashboard Manager UNICEF Brasil

## 🎯 PROYECTO FUNCIONANDO CORRECTAMENTE
**URL producción:** https://relatorios-unicef.tnrk2n.easypanel.host/
**Estado:** ✅ DASHBOARD KANBAN OPERATIVO

## 🚀 DEPLOY AUTOMÁTICO EASYPANEL
**Endpoint para redeploy automático ACTUALIZADO:** 
```
http://38.242.207.133:3000/api/deploy/7d5159ac081ad69f304f74ed95df74a096af2c908c9bf112
```
- Claude puede usar este endpoint para hacer redeploy automático
- Token actualizado y verificado funcionando
- Activa después de cada push a GitHub
- **IMPORTANTE**: Eliminar token anterior desactualizado

## 📋 RESUMEN DEL PROYECTO
- **Nombre:** Dashboard Manager para UNICEF Brasil - Supporter Service
- **Cliente:** UNICEF Brasil
- **Servicio:** Atención a donantes (teléfono, WhatsApp, sistemas digitales)
- **Proyecto:** Desde 2019 - 6 años operando
- **CEO:** Pedro Espinoza
- **Gerente:** Daisy Lenny Santos (Brasilia)
- **Equipo:** 45+ personas
- **Base donantes:** 100,000+ donantes
- **Frontend:** React + Vite + TypeScript + Tailwind CSS + Kanban Format ONLY
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

### Deploy AUTOMATIZADO en EasyPanel
```bash
# Flujo completo automatizado
1. git add frontend/src/unicef-kanban-dashboard.tsx
2. git add "reuniones/[archivo-reunion].md"
3. git commit -m "📊 ACTUALIZACIÓN DASHBOARD - [FECHA REUNION]"
4. git push
5. curl -X POST "http://38.242.207.133:3000/api/deploy/7d5159ac081ad69f304f74ed95df74a096af2c908c9bf112"
```

### Manejo de errores en deploy automático
```bash
# Si el deploy automático falla:
if curl_response contains "Invalid Token" then
  - Usar deploy manual en EasyPanel
  - Verificar token actualizado
  - Reportar a Pedro para token nuevo
else
  - Deploy exitoso ✅
fi
```

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
**Última actualización:** 2025-08-11 13:47 GMT - Catch Up WA
**Estado del proyecto:** ✅ DASHBOARD UNICEF BRASIL ACTUALIZADO CON CATCH UP WA
**URL en producción:** https://relatorios-unicef.tnrk2n.easypanel.host/
**Deploy automático:** Token actualizado y funcionando
**Próxima reunión clave:** 18/08/2025 - Retorno Ana UNICEF
**Version actual:** v10-update-11-08-2025

## 📊 ACTUALIZACIÓN CON DATOS REALES - AGOSTO 2025

### 🎯 ÚLTIMAS REUNIONES PROCESADAS:
- **Reunión 30/07/2025**: Status migración y problemas críticos  
- **Reunión 06/08/2025**: Actualización datos reunión Deisilany
- **Catch Up WA 11/08/2025**: Actualización completa métricas y problemas

### 📈 MÉTRICAS ACTUALES (11/08/2025):
- **Receptivo**: 40,74% (dificultad mantener arriba 40%)
- **WhatsApp**: 54,55% 
- **E-mail**: 42,86%
- **Cadastros UNICEF**: 37 colaboradores
- **Retorno Ana UNICEF**: 18/08/2025 (mudanças tabulações)

### 🚨 PROBLEMAS CRÍTICOS ACTUALIZADOS:
- **API Cadastro Vazio**: API no permite identificar donadores cadastrados - duplicidad crítica
- **Campanhas Save/Upgrade**: Solo 3,000 de 17,000 eran nuevos - bases acumuladas
- **Migração Partner**: Plataforma no 100% preparada - "bote" irritando donadores
- **Retorno Ana UNICEF**: 18/08 - solicitudes cambios estructura tabulaciones

### 👥 INFORMACIÓN ACTUALIZADA DEL EQUIPO:
- **Gerente**: Deisilany Santos (Brasilia)
- **Ana UNICEF**: Retorna 18/08 después férias
- **Colaboradores UNICEF**: 37 cadastros confirmados
- **Parceria Carolina UNICEF**: Trabajando correção API cadastro
