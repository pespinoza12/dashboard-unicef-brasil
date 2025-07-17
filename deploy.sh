#!/bin/bash

# Dashboard Manager - Deploy Script
# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}🚀 DASHBOARD MANAGER - DEPLOY SCRIPT${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

# Función para mostrar errores
show_error() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# Función para mostrar éxito
show_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar info
show_info() {
    echo -e "${YELLOW}⏳ $1${NC}"
}

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    show_error "Node.js no está instalado. Instálalo desde https://nodejs.org/"
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    show_error "npm no está instalado. Instálalo junto con Node.js"
fi

echo -e "${BLUE}📋 Información del sistema:${NC}"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo ""

# Instalar dependencias
show_info "Instalando dependencias..."
npm run install:all || show_error "Failed to install dependencies"
show_success "Dependencias instaladas"

# Build del frontend
show_info "Construyendo frontend..."
npm run build || show_error "Build del frontend falló"
show_success "Frontend construido exitosamente"

# Probar aplicación
show_info "Probando aplicación..."
echo ""
echo -e "${GREEN}✅ Build completado exitosamente!${NC}"
echo ""
echo -e "${BLUE}PRÓXIMOS PASOS:${NC}"
echo "1. 📊 Verificar que funciona en http://localhost:3000"
echo "2. 🔧 Health check: http://localhost:3000/api/health"
echo "3. 📁 Comprimir la carpeta completa en ZIP"
echo "4. 🌐 Subir a EasyPanel siguiendo EASYPANEL-GUIDE.md"
echo ""

# Preguntar si quiere iniciar el servidor
echo -e "${YELLOW}¿Quieres iniciar el servidor local ahora? (y/N)${NC}"
read -p "" start_server

if [[ $start_server =~ ^[Yy]$ ]]; then
    echo ""
    show_info "Iniciando servidor..."
    npm start
else
    echo ""
    show_success "Archivos listos para deployment"
    echo -e "${BLUE}📋 Sigue la guía en EASYPANEL-GUIDE.md${NC}"
fi