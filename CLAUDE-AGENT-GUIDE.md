# 🤖 Claude Code Agent - Guía de Uso

## ¿Qué es Claude Code Agent?

**Claude Code Agent** es un sistema inteligente donde **Claude Code actúa como agente automático** para procesar transcripciones de reuniones y actualizar el dashboard automáticamente.

## 🎯 Flujo Automatizado

```
📝 Pedro sube transcripción → 🤖 Claude Code analiza → 📊 Dashboard actualizado → 🚀 Redeploy automático
```

## 🚀 Cómo Usar

### Opción 1: Subir via API + Ejecutar Agente Manual

1. **Subir transcripción via API:**
```bash
curl -X POST https://relatorios-enelx.tnrk2n.easypanel.host/api/process-transcription \
  -H "Content-Type: application/json" \
  -H "X-API-Key: enelx_dashboard_key_2025" \
  -d '{
    "transcription": "Reunión del 17/07... los acessos SWS están al 95%...",
    "meetingDate": "2025-07-17",
    "participants": ["Pedro", "Daniela", "Carlos"]
  }'
```

2. **Ejecutar Claude Code Agent:**
```bash
cd dashboard-manager
npm run claude-agent
```

### Opción 2: Subir Archivo Directamente + Ejecutar Agente

1. **Crear archivo JSON en `/reuniones/`:**
```json
{
  "id": "reunion-uuid",
  "meetingDate": "2025-07-17T15:00:00.000Z",
  "participants": ["Pedro", "Daniela"],
  "transcription": "Texto de la reunión...",
  "status": "pending_analysis",
  "filename": "reunion_2025-07-17.json"
}
```

2. **Ejecutar agente:**
```bash
npm run agent
```

## 🧠 Capacidades del Agente

### Detección Automática:
- ✅ **Progreso**: Detecta porcentajes (95%, 100%, etc.)
- ✅ **Estados**: "completado", "finalizado", "en progreso"
- ✅ **Tareas**: Mapea palabras clave a task IDs
- ✅ **Fechas**: Extrae fechas importantes
- ✅ **Personas**: Identifica participantes
- ✅ **Prioridades**: Detecta urgencias

### Mapeo Inteligente:
```javascript
"acessos" → "rh-acessos"
"whatsapp" → "infra-whatsapp"  
"algar" → "infra-telefonia"
"treinamentos" → "rh-treinamentos"
// ... y más
```

### Análisis de Contexto:
- 🔍 Analiza 100 caracteres alrededor de cada porcentaje
- 📝 Extrae comentarios importantes automáticamente
- 🎯 Asocia información con tareas específicas

## 📋 Comandos Disponibles

```bash
# Ejecutar Claude Code Agent
npm run claude-agent
npm run agent

# Ver transcripciones pendientes
ls reuniones/

# Probar API manualmente
npm run build && npm start
# Luego ir a: http://localhost:3000/api-tester
```

## 🔧 Configuración del Agente

El agente está configurado en `claude-agent.js`:

```javascript
const CONFIG = {
  API_BASE: 'https://relatorios-enelx.tnrk2n.easypanel.host',
  API_KEY: 'enelx_dashboard_key_2025',
  REDEPLOY_ENDPOINT: 'http://38.242.207.133:3000/api/deploy/...',
  TRANSCRIPTIONS_DIR: './reuniones',
  DASHBOARD_DATA_FILE: './frontend/src/dashboard-data.json'
};
```

## 📊 Salida del Agente

```
🤖 Claude Code Agent iniciado...
📝 Buscando transcripciones pendientes...
📋 Encontradas 1 transcripciones pendientes

🔄 Procesando: reunion_test_2025-07-17.json
🔍 Analizando contenido de la transcripción...
📊 Progreso detectado: 95%
🎯 Asociado a tarea: rh-acessos
✅ Tarea completada detectada: infra-telefonia
🧠 Análisis completado: { taskUpdates: {...}, progressChanges: {...} }
📊 Dashboard actualizado
✅ Transcripción marcada como procesada
🚀 Redeploy completado

✅ Claude Code Agent finalizado exitosamente
```

## 🎯 Estados de Transcripciones

- **`pending_analysis`**: Pendiente de procesamiento por Claude Code
- **`processed_by_claude`**: Ya procesada por el agente
- **`error`**: Error en el procesamiento

## 💡 Ejemplos de Transcripciones

### Texto que el agente entiende bien:
```
"Los acessos SWS están al 95% completados"
→ Actualiza rh-acessos a 95%

"El contrato Algar está finalizado"  
→ Marca infra-telefonia como completada (100%)

"WhatsApp en desarrollo, 85% avanzado"
→ Actualiza infra-whatsapp a 85%

"Treinamentos programados para el 23 de julio"
→ Extrae fecha importante
```

## 🚀 Ventajas del Sistema

1. **Zero configuración**: Solo ejecutar `npm run agent`
2. **Análisis inteligente**: Comprende contexto en español
3. **Actualización automática**: Dashboard + redeploy
4. **Trazabilidad completa**: Logs detallados
5. **Flexible**: Funciona con API o archivos directos

## ⚠️ Notas Importantes

- El agente procesa **solo** transcripciones con status `pending_analysis`
- Después del procesamiento, marca como `processed_by_claude`
- Los comentarios generados incluyen `🤖 Claude Code Agent` para identificación
- El redeploy es automático después de actualizar el dashboard

---

**🎯 Dashboard EnelX B2C 2025 | Powered by Claude Code Agent**