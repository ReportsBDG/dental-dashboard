// Script de prueba para verificar la conexión con Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzTg6wQCsc_sIMBKSk_4vpGcbhrS1kuUiNyPyvtzLsoVktqAhZC-XsLaC-TaGX_rW4d/exec";

async function testGoogleScriptConnection() {
  console.log('🔍 Probando conexión con Google Apps Script...');
  console.log('URL:', GOOGLE_SCRIPT_URL);
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Respuesta HTTP:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Datos recibidos:', result);
    
    if (Array.isArray(result)) {
      console.log(`📊 Se recibieron ${result.length} registros`);
      if (result.length > 0) {
        console.log('📋 Primer registro:', result[0]);
      }
    } else if (result && Array.isArray(result.data)) {
      console.log(`📊 Se recibieron ${result.data.length} registros en propiedad 'data'`);
      if (result.data.length > 0) {
        console.log('📋 Primer registro:', result.data[0]);
      }
    } else {
      console.log('⚠️ Formato de datos inesperado:', typeof result);
    }
    
  } catch (error) {
    console.error('❌ Error en la conexión:', error.message);
    
    if (error.message.includes('CORS')) {
      console.log('💡 Sugerencia: Verifica la configuración CORS en tu Google Apps Script');
    } else if (error.message.includes('403')) {
      console.log('💡 Sugerencia: Verifica que el script esté publicado como aplicación web');
    } else if (error.message.includes('404')) {
      console.log('💡 Sugerencia: Verifica que la URL sea correcta');
    }
  }
}

// Ejecutar la prueba
testGoogleScriptConnection(); 