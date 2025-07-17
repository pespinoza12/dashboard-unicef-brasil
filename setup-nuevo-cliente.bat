@echo off
echo.
echo ===============================================
echo   🚀 SETUP NUEVO CLIENTE - WA Contact Center
echo ===============================================
echo.

REM Solicitar información del cliente
set /p CLIENTE_NOMBRE="Nombre del cliente (ej: Movistar): "
set /p CLIENTE_PROYECTO="Descripción del proyecto (ej: CRM 2025): "
set /p CLIENTE_CARPETA="Nombre de carpeta (ej: Movistar-CRM): "

echo.
echo 📁 Creando estructura para: %CLIENTE_NOMBRE%
echo.

REM Crear carpeta cliente
set CLIENTE_PATH="C:\Users\pedro\OneDrive\Documents\01-CLIENTES\%CLIENTE_CARPETA%\Projetos"
mkdir %CLIENTE_PATH%
cd %CLIENTE_PATH%

REM Copiar proyecto base
echo 📥 Copiando proyecto base de EnelX...
xcopy "C:\Users\pedro\OneDrive\Documents\01-CLIENTES\Enel-EnelX\Projetos\dashboard-manager" "dashboard-%CLIENTE_CARPETA%" /E /I /H

cd "dashboard-%CLIENTE_CARPETA%"

REM Limpiar archivos específicos
echo 🧹 Limpiando archivos específicos de EnelX...
rmdir /s /q .git 2>nul
rmdir /s /q node_modules 2>nul
rmdir /s /q frontend\node_modules 2>nul
rmdir /s /q backend\node_modules 2>nul
del reuniones\*.json 2>nul
del frontend\src\dashboard-data.json 2>nul

REM Crear configuración cliente
echo 📝 Creando configuración del cliente...
echo # 🎯 CONFIGURACIÓN - %CLIENTE_NOMBRE% > CONFIGURACION-CLIENTE.md
echo. >> CONFIGURACION-CLIENTE.md
echo ## 📊 INFORMACIÓN BÁSICA >> CONFIGURACION-CLIENTE.md
echo - **Cliente**: %CLIENTE_NOMBRE% >> CONFIGURACION-CLIENTE.md
echo - **Proyecto**: %CLIENTE_PROYECTO% >> CONFIGURACION-CLIENTE.md
echo - **Fecha inicio**: %date% >> CONFIGURACION-CLIENTE.md
echo - **Carpeta**: %CLIENTE_CARPETA% >> CONFIGURACION-CLIENTE.md
echo. >> CONFIGURACION-CLIENTE.md
echo ## 🎨 BRANDING >> CONFIGURACION-CLIENTE.md
echo - **Título dashboard**: Dashboard %CLIENTE_NOMBRE% - WA Contact Center >> CONFIGURACION-CLIENTE.md
echo. >> CONFIGURACION-CLIENTE.md
echo ## 🔑 CONFIGURACIÓN TÉCNICA >> CONFIGURACION-CLIENTE.md
echo - **URL GitHub**: https://github.com/pespinoza12/dashboard-%CLIENTE_CARPETA%.git >> CONFIGURACION-CLIENTE.md
echo - **URL EasyPanel**: https://dashboard-%CLIENTE_CARPETA%.tnrk2n.easypanel.host/ >> CONFIGURACION-CLIENTE.md
echo. >> CONFIGURACION-CLIENTE.md
echo ## 📋 PRÓXIMOS PASOS >> CONFIGURACION-CLIENTE.md
echo 1. Personalizar branding en frontend/index.html >> CONFIGURACION-CLIENTE.md
echo 2. Actualizar tareas en frontend/src/[cliente]-dashboard.tsx >> CONFIGURACION-CLIENTE.md
echo 3. Configurar logo en frontend/public/images/ >> CONFIGURACION-CLIENTE.md
echo 4. Crear repositorio GitHub >> CONFIGURACION-CLIENTE.md
echo 5. Configurar EasyPanel >> CONFIGURACION-CLIENTE.md
echo 6. Probar con Claude Code Agent >> CONFIGURACION-CLIENTE.md

REM Crear README específico
echo 📄 Creando README del cliente...
echo # 📊 Dashboard %CLIENTE_NOMBRE% - WA Contact Center > README.md
echo. >> README.md
echo **Proyecto**: %CLIENTE_PROYECTO% >> README.md
echo **Cliente**: %CLIENTE_NOMBRE% >> README.md
echo **Setup**: %date% >> README.md
echo. >> README.md
echo ## 🚀 URLs >> README.md
echo - **Dashboard**: https://dashboard-%CLIENTE_CARPETA%.tnrk2n.easypanel.host/ >> README.md
echo - **GitHub**: https://github.com/pespinoza12/dashboard-%CLIENTE_CARPETA%.git >> README.md
echo - **API Health**: https://dashboard-%CLIENTE_CARPETA%.tnrk2n.easypanel.host/api/health >> README.md
echo. >> README.md
echo ## 📝 Personalización Pendiente >> README.md
echo - [ ] Logo del cliente >> README.md
echo - [ ] Colores corporativos >> README.md
echo - [ ] Estructura de tareas >> README.md
echo - [ ] Configuración Claude Agent >> README.md
echo - [ ] Setup GitHub >> README.md
echo - [ ] Deploy EasyPanel >> README.md

echo.
echo ✅ ¡Setup completado!
echo.
echo 📁 Ubicación: %CLIENTE_PATH%\dashboard-%CLIENTE_CARPETA%
echo.
echo 📋 PRÓXIMOS PASOS:
echo 1. Revisar CONFIGURACION-CLIENTE.md
echo 2. Personalizar con Claude Code
echo 3. Configurar GitHub y EasyPanel
echo.
echo 🎯 ¡Listo para usar con Claude!
echo.
pause