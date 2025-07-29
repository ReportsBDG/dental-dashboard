// Configuración para Google Apps Script
export const GOOGLE_SCRIPT_CONFIG = {
  // URL directa (para cuando se configure CORS correctamente)
  url: "https://script.google.com/macros/s/AKfycbz-hSsHHk5lcYtRc_XLC20hV24XneVFSLbrm-MuYnaJYqWHJZ75JjU1E6GtCe6oF6yQ/exec",
  timeout: 10000, // 10 segundos
  retries: 3,
  // Usar proxy local para evitar CORS
  useProxy: true,
  // Usar datos reales ahora que el script funciona
  useFallbackData: false
}

// Tipos de respuesta esperados
export interface GoogleScriptResponse {
  success: boolean
  data?: any[]
  error?: string
  message?: string
}

// Datos de ejemplo para usar cuando hay problemas de conexión
const fallbackData = [
  {
    timestamp: "2024-01-15T10:30:00Z",
    carrier: "Delta Dental",
    office: "Downtown Office",
    patient: "John Smith",
    paidAmount: 150.00,
    claimStatus: "Paid",
    type: "Cleaning",
    dob: "1985-03-15",
    dos: "2024-01-10",
    productivityAmount: 200.00,
    status: "Completed"
  },
  {
    timestamp: "2024-01-15T11:15:00Z",
    carrier: "Aetna",
    office: "Uptown Office",
    patient: "Sarah Johnson",
    paidAmount: 300.00,
    claimStatus: "Pending",
    type: "Root Canal",
    dob: "1990-07-22",
    dos: "2024-01-12",
    productivityAmount: 450.00,
    status: "In Progress"
  },
  {
    timestamp: "2024-01-15T12:00:00Z",
    carrier: "Cigna",
    office: "Downtown Office",
    patient: "Mike Davis",
    paidAmount: 75.00,
    claimStatus: "Denied",
    type: "Checkup",
    dob: "1978-11-08",
    dos: "2024-01-08",
    productivityAmount: 100.00,
    status: "Needs Review"
  },
  {
    timestamp: "2024-01-15T13:45:00Z",
    carrier: "Blue Cross",
    office: "Downtown Office",
    patient: "Emily Wilson",
    paidAmount: 225.00,
    claimStatus: "Paid",
    type: "Crown",
    dob: "1982-05-14",
    dos: "2024-01-14",
    productivityAmount: 300.00,
    status: "Completed"
  },
  {
    timestamp: "2024-01-15T14:20:00Z",
    carrier: "MetLife",
    office: "Uptown Office",
    patient: "Robert Brown",
    paidAmount: 180.00,
    claimStatus: "Pending",
    type: "Extraction",
    dob: "1975-12-03",
    dos: "2024-01-13",
    productivityAmount: 250.00,
    status: "In Progress"
  }
]

// Función para hacer peticiones a Google Apps Script
export async function fetchFromGoogleScript(): Promise<any[]> {
  const { url, timeout, retries, useFallbackData, useProxy } = GOOGLE_SCRIPT_CONFIG
  
  // Si está configurado para usar datos de ejemplo, devolver directamente
  if (useFallbackData) {
    console.log('Usando datos de ejemplo (modo de desarrollo)')
    return fallbackData
  }
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Intento ${attempt}/${retries} - Cargando datos desde Google Apps Script`)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      // Usar proxy si está configurado
      const fetchUrl = useProxy ? '/api/proxy' : url
      
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('Respuesta de Google Apps Script:', result)
      
      // Manejar diferentes formatos de respuesta
      if (result && Array.isArray(result)) {
        return processData(result)
      } else if (result && Array.isArray(result.data)) {
        return processData(result.data)
      } else if (result && result.success && Array.isArray(result.data)) {
        return processData(result.data)
      } else {
        console.warn('Formato de respuesta inesperado:', result)
        throw new Error('Formato de datos no reconocido')
      }
      
    } catch (error) {
      console.error(`Error en intento ${attempt}:`, error)
      
      if (attempt === retries) {
        throw error
      }
      
      // Esperar antes del siguiente intento
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
  
  throw new Error('Todos los intentos fallaron')
}

// Función para procesar y limpiar datos
function processData(data: any[]): any[] {
  return data.map(item => ({
    ...item,
    // Convertir campos numéricos
    paidamount: typeof item.paidamount === 'string' ? parseFloat(item.paidamount) || 0 : item.paidamount || 0,
    productivityamount: typeof item.productivityamount === 'string' ? parseFloat(item.productivityamount) || 0 : item.productivityamount || 0
  }))
}

// Función para validar datos
export function validatePatientData(data: any[]): boolean {
  if (!Array.isArray(data)) return false
  
  return data.every(item => 
    item && 
    typeof item === 'object' &&
    typeof item.patientname === 'string' &&
    typeof item.insurancecarrier === 'string' &&
    typeof item.offices === 'string' &&
    (typeof item.paidamount === 'number' || typeof item.paidamount === 'string')
  )
} 