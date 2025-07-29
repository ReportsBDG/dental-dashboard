<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server'

// API route para hacer proxy de las peticiones a Google Apps Script
export async function GET(request: NextRequest) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-hSsHHk5lcYtRc_XLC20hV24XneVFSLbrm-MuYnaJYqWHJZ75JjU1E6GtCe6oF6yQ/exec";

  try {
    console.log('Proxy: Haciendo petición a Google Apps Script...');
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Proxy: Datos recibidos exitosamente');
    
    // Configurar headers CORS para el cliente
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    return NextResponse.json(data, { headers });
    
  } catch (error) {
    console.error('Proxy: Error:', error instanceof Error ? error.message : 'Error desconocido');
    
    // Devolver datos de ejemplo en caso de error
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
      }
    ];
    
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: fallbackData,
      message: "Usando datos de ejemplo debido a error de conexión"
    }, { headers });
  }
}

// Manejar peticiones OPTIONS para CORS
export async function OPTIONS(request: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  return new NextResponse(null, { headers });
=======
import { NextRequest, NextResponse } from 'next/server'

// API route para hacer proxy de las peticiones a Google Apps Script
export async function GET(request: NextRequest) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-hSsHHk5lcYtRc_XLC20hV24XneVFSLbrm-MuYnaJYqWHJZ75JjU1E6GtCe6oF6yQ/exec";

  try {
    console.log('Proxy: Haciendo petición a Google Apps Script...');
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Proxy: Datos recibidos exitosamente');
    
    // Configurar headers CORS para el cliente
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    return NextResponse.json(data, { headers });
    
  } catch (error) {
    console.error('Proxy: Error:', error instanceof Error ? error.message : 'Error desconocido');
    
    // Devolver datos de ejemplo en caso de error
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
      }
    ];
    
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: fallbackData,
      message: "Usando datos de ejemplo debido a error de conexión"
    }, { headers });
  }
}

// Manejar peticiones OPTIONS para CORS
export async function OPTIONS(request: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  return new NextResponse(null, { headers });
>>>>>>> becca72358969d5b4d324a29dd5a2c42b9a6fe69
} 