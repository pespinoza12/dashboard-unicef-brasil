# 🚀 API Dashboard EnelX - Guía de Uso

## 🔐 Autenticación

Todas las requests necesitan API Key en headers:
```
X-API-Key: enelx_dashboard_key_2025
```

**API Keys disponibles:**
- `enelx_dashboard_key_2025` - Clave principal
- `wa_contact_center_key` - Clave del equipo WA
- `pedro_admin_key` - Clave administrativa

## 📝 1. Procesar Transcripción de Reunión

**Endpoint:** `POST /api/process-transcription`

```bash
curl -X POST https://relatorios-enelx.tnrk2n.easypanel.host/api/process-transcription \
  -H "Content-Type: application/json" \
  -H "X-API-Key: enelx_dashboard_key_2025" \
  -d '{
    "transcription": "Reunión del 17/07/2025. Participantes: Pedro, Daniela, Carlos. Temas discutidos: avance del 85% en acessos SWS, próxima reunión presencial confirmada...",
    "meetingDate": "2025-07-17",
    "participants": ["Pedro Espinoza", "Daniela Belmock", "Carlos Junior"],
    "metadata": {
      "duration": "45 minutes",
      "type": "weekly_status",
      "priority": "high"
    }
  }'
```

**Respuesta:**
```json
{
  "message": "Transcripción procesada correctamente",
  "transcriptionId": "uuid-generated",
  "filename": "reunion_2025-07-17_1705123456789.json",
  "status": "saved",
  "nextStep": "pending_ai_analysis",
  "timestamp": "2025-07-17T15:30:00.000Z"
}
```

## 📊 2. Actualizar Dashboard Directamente

**Endpoint:** `POST /api/update-dashboard`

```bash
curl -X POST https://relatorios-enelx.tnrk2n.easypanel.host/api/update-dashboard \
  -H "Content-Type: application/json" \
  -H "X-API-Key: enelx_dashboard_key_2025" \
  -d '{
    "tasks": {
      "rh-acessos": {
        "progress": 90,
        "completed": false
      }
    },
    "comments": [
      {
        "taskId": "rh-acessos",
        "text": "✅ Carlos confirmó creación de acessos SWS completada al 90%",
        "author": "Pedro Espinoza",
        "timestamp": "17/07/2025"
      }
    ],
    "metadata": {
      "lastMeeting": "2025-07-17",
      "nextMeeting": "2025-07-24"
    }
  }'
```

## 📋 3. Listar Transcripciones

**Endpoint:** `GET /api/transcriptions`

```bash
curl -X GET https://relatorios-enelx.tnrk2n.easypanel.host/api/transcriptions \
  -H "X-API-Key: enelx_dashboard_key_2025"
```

**Respuesta:**
```json
{
  "transcriptions": [
    {
      "id": "uuid-1",
      "filename": "reunion_2025-07-17_1705123456789.json",
      "meetingDate": "2025-07-17T15:00:00.000Z",
      "participants": ["Pedro Espinoza", "Daniela Belmock"],
      "status": "pending_analysis",
      "processedAt": "2025-07-17T15:30:00.000Z"
    }
  ],
  "count": 1
}
```

## 🏥 4. Health Check

**Endpoint:** `GET /api/health`

```bash
curl https://relatorios-enelx.tnrk2n.easypanel.host/api/health
```

## 🔮 Próximos Pasos

### Integración con Claude API (En desarrollo)
1. **Análisis automático** de transcripciones
2. **Extracción de tareas** y actualizaciones
3. **Deploy automático** a GitHub + EasyPanel

### Flujo automatizado completo:
```
Subir transcripción → Claude procesa → Dashboard actualizado → Deploy automático
```

## 📖 Estructura de Datos

### Transcripción
```json
{
  "transcription": "string (requerido)",
  "meetingDate": "YYYY-MM-DD (opcional)",
  "participants": ["array de strings (opcional)"],
  "metadata": {
    "duration": "string",
    "type": "string",
    "priority": "high|medium|low"
  }
}
```

### Actualización Dashboard
```json
{
  "tasks": {
    "taskId": {
      "progress": 0-100,
      "completed": boolean
    }
  },
  "comments": [
    {
      "taskId": "string",
      "text": "string", 
      "author": "string",
      "timestamp": "DD/MM/YYYY"
    }
  ],
  "metadata": {}
}
```

---
**🎯 Dashboard EnelX B2C 2025 | WA Contact Center**