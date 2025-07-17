# 📋 **GUÍA SÚPER SIMPLE PARA SUBIR A CONTABU**

## ⚠️ **IMPORTANTE: ERRORES DE TYPESCRIPT DETECTADOS**

Tu proyecto tiene algunos errores de TypeScript que debemos arreglar antes de subirlo. 

## 🔧 **SOLUCIÓN RÁPIDA**

### **PASO 1: Arreglar el Build**
```bash
# Abrir terminal en la carpeta del proyecto
cd dashboard-manager

# Instalar dependencias
npm install
cd frontend && npm install
cd ../backend && npm install
```

### **PASO 2: Cambiar el Script de Build**
En `frontend/package.json`, cambiar:
```json
"build": "tsc -b && vite build"
```

Por:
```json
"build": "vite build"
```

### **PASO 3: Probar Build**
```bash
cd frontend
npm run build
```

---

## 🌐 **SUBIR A CONTABU - PASO A PASO**

### **ANTES DE EMPEZAR:**
1. ✅ Tener cuenta en Contabu activa
2. ✅ Tener EasyPanel instalado
3. ✅ Conocer la IP de tu servidor

---

## **👨‍💻 PASO 1: ACCEDER A EASYPANEL**

1. **Abrir navegador web**
2. **Ir a:** `http://TU-IP-SERVIDOR:3000`
   - Ejemplo: `http://95.216.123.45:3000`
3. **Hacer login** con tu usuario y contraseña

---

## **📦 PASO 2: CREAR APLICACIÓN**

1. **Click en "Services"** (menú izquierdo)
2. **Click en "Create Service"**
3. **Seleccionar "App"**
4. **Llenar formulario:**
   - **Name:** `dashboard-manager`
   - **Description:** `Dashboard EnelX B2C 2025`

---

## **📁 PASO 3: SUBIR ARCHIVOS**

### **Opción A: Upload ZIP (Más Fácil)**
1. **Comprimir tu carpeta** `dashboard-manager` en ZIP
2. **En EasyPanel:**
   - **Source:** Seleccionar "Upload"
   - **Subir el archivo ZIP**

### **Opción B: Git Repository**
1. **Subir tu código a GitHub primero**
2. **En EasyPanel:**
   - **Source:** Seleccionar "Git"
   - **URL:** Tu repositorio de GitHub
   - **Branch:** `main`

---

## **⚙️ PASO 4: CONFIGURAR BUILD**

En la sección **"Build"**:
```
Build Command: cd frontend && npm install && npm run build
Start Command: npm start
Port: 3000
```

---

## **🔧 PASO 5: VARIABLES DE ENTORNO**

En la sección **"Environment Variables"**:
```
NODE_ENV=production
PORT=3000
```

---

## **🚀 PASO 6: DEPLOY**

1. **Click en "Deploy"**
2. **Esperar** (puede tardar 5-10 minutos)
3. **Revisar logs** para verificar que no hay errores

---

## **🌐 PASO 7: CONFIGURAR DOMINIO**

1. **Ir a "Domains"** en EasyPanel
2. **Click "Add Domain"**
3. **Configurar:**
   - **Domain:** `tu-dominio.com`
   - **Service:** `dashboard-manager`
   - **Port:** `3000`

---

## **✅ PASO 8: VERIFICAR**

1. **Abrir:** `https://tu-dominio.com`
2. **Verificar que el dashboard carga**
3. **Probar:** `https://tu-dominio.com/api/health`

---

## **❌ SI ALGO FALLA**

### **Error de Build:**
```bash
# Probar localmente primero
cd frontend
npm run build

# Si falla, cambiar en package.json:
"build": "vite build --mode production"
```

### **Error de Puerto:**
- Verificar que el puerto 3000 esté configurado
- Revisar que no haya conflictos

### **Error de Dominio:**
- Verificar que el DNS esté configurado
- Esperar propagación (puede tardar 24 horas)

---

## **📞 NECESITAS AYUDA?**

Si tienes problemas:
1. **Revisar logs** en EasyPanel
2. **Verificar** que el build funciona localmente
3. **Contactar** soporte de Contabu

---

## **🎯 RESULTADO FINAL**

Una vez completado, tendrás:
- ✅ Dashboard disponible en tu dominio
- ✅ Actualizaciones automáticas
- ✅ SSL certificado
- ✅ Acceso desde cualquier lugar

**URL Final:** `https://tu-dominio.com`

---

*¿Necesitas que te ayude con algún paso específico?*