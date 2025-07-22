#!/usr/bin/env node

/**
 * Script de automatización para crear dashboard Kanban para nuevo cliente
 * 
 * Uso: node create-client-dashboard.js
 * 
 * El script solicitará la información del cliente y creará automáticamente:
 * - Estructura de archivos
 * - Archivos personalizados
 * - Documentación del cliente
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configurar interfaz para input del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para preguntar al usuario
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Función para crear directorio si no existe
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para copiar archivo con reemplazos
function copyAndReplace(sourcePath, targetPath, replacements) {
  try {
    let content = fs.readFileSync(sourcePath, 'utf8');
    
    // Aplicar reemplazos
    for (const [search, replace] of Object.entries(replacements)) {
      const regex = new RegExp(search, 'g');
      content = content.replace(regex, replace);
    }
    
    // Asegurar que el directorio existe
    ensureDir(path.dirname(targetPath));
    
    // Escribir archivo
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`✅ Creado: ${targetPath}`);
  } catch (error) {
    console.error(`❌ Error copiando ${sourcePath}:`, error.message);
  }
}

// Función para copiar archivo directamente
function copyDirect(sourcePath, targetPath) {
  try {
    const content = fs.readFileSync(sourcePath);
    ensureDir(path.dirname(targetPath));
    fs.writeFileSync(targetPath, content);
    console.log(`✅ Copiado: ${targetPath}`);
  } catch (error) {
    console.error(`❌ Error copiando ${sourcePath}:`, error.message);
  }
}

// Función principal
async function main() {
  console.log('🚀 Creador de Dashboard Kanban para Nuevo Cliente');
  console.log('================================================');
  
  // Recopilar información del cliente
  const clientInfo = {
    nombre: await askQuestion('📝 Nombre del cliente (ej: "Banco Central"): '),
    slug: await askQuestion('🔗 Slug del cliente (ej: "banco-central"): '),
    servicio: await askQuestion('🎯 Servicio (ej: "Atención al Cliente"): '),
    industria: await askQuestion('🏢 Industria (ej: "Banca"): '),
    ubicacion: await askQuestion('📍 Ubicación (ej: "São Paulo"): '),
    equipoSize: await askQuestion('👥 Tamaño del equipo (ej: "45"): '),
    gerente: await askQuestion('👨‍💼 Nombre del gerente (ej: "María González"): '),
    
    // Métricas
    metrica1: await askQuestion('📊 Métrica 1 (ej: "Llamadas Atendidas"): '),
    metrica1Valor: await askQuestion('📈 Valor Métrica 1 (ej: "85.5%"): '),
    metrica2: await askQuestion('📊 Métrica 2 (ej: "Satisfacción Cliente"): '),
    metrica2Valor: await askQuestion('📈 Valor Métrica 2 (ej: "92.3%"): '),
    metrica3: await askQuestion('📊 Métrica 3 (ej: "Tiempo Promedio"): '),
    metrica3Valor: await askQuestion('📈 Valor Métrica 3 (ej: "3.5 min"): '),
    
    // Columnas
    columna1: await askQuestion('📋 Columna 1 (ej: "🔥 URGENTE - Acción Inmediata"): '),
    columna2: await askQuestion('📋 Columna 2 (ej: "📊 EN PROCESO - Monitorear"): '),
    columna3: await askQuestion('📋 Columna 3 (ej: "✅ COMPLETADO - Verificar"): '),
  };
  
  rl.close();
  
  console.log('\n🔧 Creando estructura de archivos...');
  
  // Crear directorio principal
  const projectDir = `../dashboard-${clientInfo.slug}`;
  ensureDir(projectDir);
  
  // Rutas de origen (template actual)
  const templateDir = '.';
  
  // Definir reemplazos globales
  const replacements = {
    'UNICEF Brasil': clientInfo.nombre,
    'unicef': clientInfo.slug,
    'Deisilany Santos': clientInfo.gerente,
    'Supporter Service': clientInfo.servicio,
    'Brasília': clientInfo.ubicacion,
    'dashboard-Controle-Unicef': `dashboard-${clientInfo.slug}`,
    'Dashboard Manager para EnelX B2C 2025': `Dashboard Kanban para ${clientInfo.nombre} - ${clientInfo.servicio}`,
    'Dashboard de gestión UNICEF Brasil': `Dashboard de gestión ${clientInfo.nombre}`,
    'PAINEL KANBAN UNICEF BRASIL': `PAINEL KANBAN ${clientInfo.nombre.toUpperCase()}`,
    '37': clientInfo.equipoSize,
    '42\\.53%': clientInfo.metrica1Valor,
    '39\\.06%': clientInfo.metrica2Valor,
    'Colaboradores Ativos': clientInfo.metrica1,
    'Receptivo \\(atual\\)': clientInfo.metrica2,
    'Digital \\(recuperando\\)': clientInfo.metrica3,
    'unicef-kanban-data': `${clientInfo.slug}-kanban-data`,
    'UnicefKanbanDashboard': `${clientInfo.nombre.replace(/\s+/g, '')}KanbanDashboard`,
    'unicef-kanban-dashboard': `${clientInfo.slug}-kanban-dashboard`,
  };
  
  // Copiar archivos que no necesitan personalización
  const directCopyFiles = [
    '.gitignore',
    'backend/package.json',
    'backend/index.js',
    'frontend/package.json',
    'frontend/vite.config.js',
    'frontend/tailwind.config.js',
    'frontend/src/main.tsx',
  ];
  
  for (const file of directCopyFiles) {
    const sourcePath = path.join(templateDir, file);
    const targetPath = path.join(projectDir, file);
    
    if (fs.existsSync(sourcePath)) {
      copyDirect(sourcePath, targetPath);
    }
  }
  
  // Copiar archivos que necesitan personalización
  const customFiles = [
    {
      source: 'package.json',
      target: 'package.json'
    },
    {
      source: 'frontend/index.html',
      target: 'frontend/index.html'
    },
    {
      source: 'frontend/src/App.tsx',
      target: 'frontend/src/App.tsx'
    },
    {
      source: 'frontend/src/unicef-kanban-dashboard.tsx',
      target: `frontend/src/${clientInfo.slug}-kanban-dashboard.tsx`
    }
  ];
  
  for (const file of customFiles) {
    const sourcePath = path.join(templateDir, file.source);
    const targetPath = path.join(projectDir, file.target);
    
    if (fs.existsSync(sourcePath)) {
      copyAndReplace(sourcePath, targetPath, replacements);
    }
  }
  
  // Crear documentación del cliente
  const clientDoc = `# Dashboard Kanban - ${clientInfo.nombre}

## 📊 Información del Cliente
- **Nombre:** ${clientInfo.nombre}
- **Servicio:** ${clientInfo.servicio}
- **Industria:** ${clientInfo.industria}
- **Equipo:** ${clientInfo.equipoSize} personas
- **Ubicación:** ${clientInfo.ubicacion}
- **Gerente:** ${clientInfo.gerente}

## 🔗 URLs y Configuración
- **URL Dashboard:** https://dashboard-${clientInfo.slug}.tnrk2n.easypanel.host/
- **GitHub:** https://github.com/pespinoza12/dashboard-${clientInfo.slug}
- **Deploy Token:** [PENDIENTE - Obtener de EasyPanel]

## 📈 Métricas del Dashboard
- **${clientInfo.metrica1}:** ${clientInfo.metrica1Valor}
- **${clientInfo.metrica2}:** ${clientInfo.metrica2Valor}
- **${clientInfo.metrica3}:** ${clientInfo.metrica3Valor}

## 🎯 Configuración de Columnas
1. **${clientInfo.columna1}**
2. **${clientInfo.columna2}**
3. **${clientInfo.columna3}**

## 📞 Contacto
- **CEO:** Pedro Espinoza
- **Cliente:** ${clientInfo.nombre}
- **Gerente Proyecto:** ${clientInfo.gerente}
- **Equipo:** ${clientInfo.equipoSize} personas

## 🚀 Próximos Pasos
1. [ ] Crear repositorio en GitHub
2. [ ] Configurar EasyPanel
3. [ ] Obtener deploy token
4. [ ] Realizar primer deploy
5. [ ] Personalizar datos iniciales
6. [ ] Verificar funcionalidades

---
**Creado:** ${new Date().toLocaleDateString()}
**Estado:** 🔄 EN CONFIGURACIÓN
`;
  
  fs.writeFileSync(
    path.join(projectDir, 'CONFIGURACION-CLIENTE.md'),
    clientDoc,
    'utf8'
  );
  
  console.log('✅ Creado: CONFIGURACION-CLIENTE.md');
  
  // Crear README con instrucciones
  const readme = `# Dashboard Kanban - ${clientInfo.nombre}

## 🚀 Próximos Pasos

### 1. Configurar Git
\`\`\`bash
cd dashboard-${clientInfo.slug}
git init
git add .
git commit -m "Initial setup Dashboard ${clientInfo.nombre}"
\`\`\`

### 2. Crear repositorio GitHub
1. Ir a https://github.com/pespinoza12
2. Crear nuevo repositorio: \`dashboard-${clientInfo.slug}\`
3. Ejecutar:
\`\`\`bash
git remote add origin https://github.com/pespinoza12/dashboard-${clientInfo.slug}.git
git push -u origin main
\`\`\`

### 3. Configurar EasyPanel
1. Crear nueva aplicación: \`dashboard-${clientInfo.slug}\`
2. Conectar repositorio GitHub
3. Configurar build y deploy
4. Obtener token de deploy

### 4. Primer Deploy
\`\`\`bash
npm run build:local
git add .
git commit -m "Add build files"
git push
\`\`\`

### 5. Personalizar Datos
- Editar \`frontend/src/${clientInfo.slug}-kanban-dashboard.tsx\`
- Actualizar \`initialKanbanData\` con datos reales del cliente
- Agregar cards específicos del proyecto

## 📋 Información del Cliente
- **Nombre:** ${clientInfo.nombre}
- **Servicio:** ${clientInfo.servicio}
- **Gerente:** ${clientInfo.gerente}
- **Equipo:** ${clientInfo.equipoSize} personas

## 🔗 URLs (Actualizar después del deploy)
- **Dashboard:** https://dashboard-${clientInfo.slug}.tnrk2n.easypanel.host/
- **GitHub:** https://github.com/pespinoza12/dashboard-${clientInfo.slug}
`;
  
  fs.writeFileSync(
    path.join(projectDir, 'README.md'),
    readme,
    'utf8'
  );
  
  console.log('✅ Creado: README.md');
  
  // Resumen final
  console.log('\n🎉 ¡Dashboard creado exitosamente!');
  console.log('=======================================');
  console.log(`📁 Directorio: dashboard-${clientInfo.slug}`);
  console.log(`🎯 Cliente: ${clientInfo.nombre}`);
  console.log(`🔗 Slug: ${clientInfo.slug}`);
  console.log(`👨‍💼 Gerente: ${clientInfo.gerente}`);
  console.log('\n📋 Próximos pasos:');
  console.log(`1. cd dashboard-${clientInfo.slug}`);
  console.log('2. Revisar CONFIGURACION-CLIENTE.md');
  console.log('3. Seguir instrucciones en README.md');
  console.log('4. Configurar GitHub y EasyPanel');
  console.log('5. Realizar primer deploy');
  console.log('\n✅ ¡Listo para usar!');
}

// Ejecutar script
main().catch(console.error);