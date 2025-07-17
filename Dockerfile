# Dockerfile para Dashboard Manager - EnelX B2C 2025

# Usar imagen base de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json principal
COPY package*.json ./

# Instalar dependencias principales
RUN npm install

# Copiar código fuente
COPY . .

# Instalar dependencias del frontend y backend
RUN npm run install:all

# Build del frontend para producción
RUN npm run build

# Crear directorio para datos persistentes
RUN mkdir -p /app/data

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["npm", "start"]

# Metadata
LABEL version="1.0.0"
LABEL description="Dashboard Manager para EnelX B2C 2025"
LABEL maintainer="WA Contact Center"