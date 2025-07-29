# 🚀 Instrucciones de Instalación - Dental Analytics Dashboard

## ❌ Problema Actual
- Node.js no está instalado en tu sistema
- npm no está disponible
- El proyecto no puede ejecutarse

## ✅ Solución Paso a Paso

### 1. 📥 Instalar Node.js
1. **Abre tu navegador** y ve a: https://nodejs.org/
2. **Descarga la versión LTS** (botón verde grande)
3. **Ejecuta el instalador** descargado
4. **Sigue todos los pasos** del instalador (Next, Next, Install)
5. **Reinicia tu PowerShell/Terminal** completamente

### 2. 🔍 Verificar la instalación
Después de reiniciar PowerShell, ejecuta:
```bash
node --version
npm --version
```

Deberías ver algo como:
```
v18.17.0
9.6.7
```

### 3. 🏃‍♂️ Ejecutar el proyecto
Una vez que Node.js esté instalado:

```bash
# Navegar al directorio del proyecto
cd "C:\Users\Bays Dental Group\Desktop\Overview"

# Instalar dependencias
npm install

# Ejecutar el servidor de desarrollo
npm run dev
```

### 4. 🌐 Acceder al dashboard
Abre tu navegador y ve a:
```
http://localhost:3000
```

## 🆘 Si tienes problemas

### Error: "npm no se reconoce"
- **Solución:** Reinicia completamente PowerShell
- **Alternativa:** Reinicia tu computadora

### Error: "Puerto 3000 en uso"
- **Solución:** El servidor se ejecutará en otro puerto automáticamente
- **Busca en la terminal:** `Local: http://localhost:3001` (o similar)

### Error: "Cannot find module"
- **Solución:** Ejecuta `npm install` nuevamente

## 📞 Soporte
Si sigues teniendo problemas después de instalar Node.js, avísame y te ayudo con el siguiente paso.

## 🎯 Resultado esperado
Después de seguir estos pasos, deberías ver:
- Un dashboard moderno con gradiente azul-púrpura
- Tabla de registros de pacientes
- Filtros funcionales
- Diseño responsivo 