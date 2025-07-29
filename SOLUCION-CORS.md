<<<<<<< HEAD
# 🔧 Solución al Problema de CORS

## ❌ **Problema Actual**
```
Access to fetch at 'https://script.google.com/macros/s/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

## ✅ **Solución Inmediata (Ya implementada)**

He creado un **proxy local** que evita el problema de CORS. Tu dashboard ahora usa:
```
http://localhost:3000/api/proxy
```

En lugar de la URL directa de Google Apps Script.

## 🔧 **Solución Permanente: Configurar CORS en Google Apps Script**

### **Paso 1: Actualizar tu Google Apps Script**

Reemplaza tu código actual con este:

```javascript
function doGet(e) {
  // Configurar headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // Obtener datos de tu hoja de cálculo
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Datos');
    const data = sheet.getDataRange().getValues();
    
    // Convertir a formato JSON
    const headers_row = data[0];
    const rows = data.slice(1);
    
    const jsonData = rows.map(row => {
      const obj = {};
      headers_row.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    // Devolver respuesta con headers CORS
    return ContentService
      .createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

// Función para manejar peticiones OPTIONS (preflight)
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
```

### **Paso 2: Volver a publicar el script**

1. Guarda los cambios en tu Google Apps Script
2. Ve a "Deploy" → "New deployment"
3. Selecciona "Web app"
4. Configura:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Haz clic en "Deploy"

### **Paso 3: Probar la conexión directa**

Una vez configurado CORS, puedes cambiar de vuelta a la URL directa:

1. Abre `lib/google-script.ts`
2. Cambia la línea:
   ```typescript
   url: "/api/proxy",
   ```
   Por:
   ```typescript
   url: "https://script.google.com/macros/s/AKfycbzTg6wQCsc_sIMBKSk_4vpGcbhrS1kuUiNyPyvtzLsoVktqAhZC-XsLaC-TaGX_rW4d/exec",
   ```

## 🧪 **Pruebas**

### **Probar el proxy actual:**
```
http://localhost:3000/api/proxy
```

### **Probar Google Apps Script directamente:**
```
https://script.google.com/macros/s/AKfycbzTg6wQCsc_sIMBKSk_4vpGcbhrS1kuUiNyPyvtzLsoVktqAhZC-XsLaC-TaGX_rW4d/exec
```

## 📊 **Estado Actual**

- ✅ **Dashboard funcionando** con proxy local
- ✅ **Datos de ejemplo** como respaldo
- ⏳ **Pendiente:** Configurar CORS en Google Apps Script

## 🎯 **Resultado Esperado**

Después de configurar CORS correctamente:
- El dashboard se conectará directamente a tu Google Apps Script
- No habrá errores de CORS
- Los datos reales se cargarán automáticamente

## 📞 **Soporte**

Si necesitas ayuda para configurar el Google Apps Script:
1. Verifica que el código tenga los headers CORS
2. Asegúrate de volver a publicar el script
3. Prueba la URL directamente en el navegador
=======
# 🔧 Solución al Problema de CORS

## ❌ **Problema Actual**
```
Access to fetch at 'https://script.google.com/macros/s/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

## ✅ **Solución Inmediata (Ya implementada)**

He creado un **proxy local** que evita el problema de CORS. Tu dashboard ahora usa:
```
http://localhost:3000/api/proxy
```

En lugar de la URL directa de Google Apps Script.

## 🔧 **Solución Permanente: Configurar CORS en Google Apps Script**

### **Paso 1: Actualizar tu Google Apps Script**

Reemplaza tu código actual con este:

```javascript
function doGet(e) {
  // Configurar headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // Obtener datos de tu hoja de cálculo
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Datos');
    const data = sheet.getDataRange().getValues();
    
    // Convertir a formato JSON
    const headers_row = data[0];
    const rows = data.slice(1);
    
    const jsonData = rows.map(row => {
      const obj = {};
      headers_row.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    // Devolver respuesta con headers CORS
    return ContentService
      .createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

// Función para manejar peticiones OPTIONS (preflight)
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
```

### **Paso 2: Volver a publicar el script**

1. Guarda los cambios en tu Google Apps Script
2. Ve a "Deploy" → "New deployment"
3. Selecciona "Web app"
4. Configura:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Haz clic en "Deploy"

### **Paso 3: Probar la conexión directa**

Una vez configurado CORS, puedes cambiar de vuelta a la URL directa:

1. Abre `lib/google-script.ts`
2. Cambia la línea:
   ```typescript
   url: "/api/proxy",
   ```
   Por:
   ```typescript
   url: "https://script.google.com/macros/s/AKfycbzTg6wQCsc_sIMBKSk_4vpGcbhrS1kuUiNyPyvtzLsoVktqAhZC-XsLaC-TaGX_rW4d/exec",
   ```

## 🧪 **Pruebas**

### **Probar el proxy actual:**
```
http://localhost:3000/api/proxy
```

### **Probar Google Apps Script directamente:**
```
https://script.google.com/macros/s/AKfycbzTg6wQCsc_sIMBKSk_4vpGcbhrS1kuUiNyPyvtzLsoVktqAhZC-XsLaC-TaGX_rW4d/exec
```

## 📊 **Estado Actual**

- ✅ **Dashboard funcionando** con proxy local
- ✅ **Datos de ejemplo** como respaldo
- ⏳ **Pendiente:** Configurar CORS en Google Apps Script

## 🎯 **Resultado Esperado**

Después de configurar CORS correctamente:
- El dashboard se conectará directamente a tu Google Apps Script
- No habrá errores de CORS
- Los datos reales se cargarán automáticamente

## 📞 **Soporte**

Si necesitas ayuda para configurar el Google Apps Script:
1. Verifica que el código tenga los headers CORS
2. Asegúrate de volver a publicar el script
3. Prueba la URL directamente en el navegador
>>>>>>> becca72358969d5b4d324a29dd5a2c42b9a6fe69
4. Revisa la consola del dashboard para confirmar la conexión 