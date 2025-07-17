@echo off
title Dashboard Manager - Deploy Script
color 0A

echo.
echo =========================================
echo 🚀 DASHBOARD MANAGER - DEPLOY SCRIPT
echo =========================================
echo.

echo ⏳ Instalando dependencias...
call npm run install:all
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias
    pause
    exit /b %errorlevel%
)

echo.
echo ⏳ Construyendo frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Error en build del frontend
    pause
    exit /b %errorlevel%
)

echo.
echo ⏳ Probando aplicación localmente...
echo 📊 Iniciando servidor en puerto 3000...
echo 🌐 Accede a: http://localhost:3000
echo 🔧 Health check: http://localhost:3000/api/health
echo.
echo ✅ Build completado exitosamente!
echo.
echo PRÓXIMOS PASOS:
echo 1. Verificar que funciona en http://localhost:3000
echo 2. Comprimir la carpeta completa en ZIP
echo 3. Subir a EasyPanel siguiendo EASYPANEL-GUIDE.md
echo.
echo ¿Quieres iniciar el servidor local ahora? (S/N)
set /p start_server=

if /i "%start_server%"=="S" (
    echo.
    echo 🚀 Iniciando servidor...
    npm start
) else (
    echo.
    echo 📁 Archivos listos para deployment
    echo 📋 Sigue la guía en EASYPANEL-GUIDE.md
)

pause