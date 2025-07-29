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
    
    // Datos de ejemplo realistas para Bays Dental
    const fallbackData = [
      {
        timestamp: "2024-01-15T10:30:00Z",
        insurancecarrier: "Delta Dental",
        offices: "Bays Dental - Main Office",
        patientname: "John Smith",
        paidamount: 150.00,
        claimstatus: "Paid",
        typeofinteraction: "Cleaning",
        patientdob: "1985-03-15",
        dos: "2024-01-10",
        productivityamount: 200.00,
        status: "Completed",
        timestampbyinteraction: "2024-01-15T10:30:00Z"
      },
      {
        timestamp: "2024-01-15T11:15:00Z",
        insurancecarrier: "Aetna",
        offices: "Bays Dental - Downtown",
        patientname: "Sarah Johnson",
        paidamount: 300.00,
        claimstatus: "Pending",
        typeofinteraction: "Root Canal",
        patientdob: "1990-07-22",
        dos: "2024-01-12",
        productivityamount: 450.00,
        status: "In Progress",
        timestampbyinteraction: "2024-01-15T11:15:00Z"
      },
      {
        timestamp: "2024-01-15T12:00:00Z",
        insurancecarrier: "Cigna",
        offices: "Bays Dental - Main Office",
        patientname: "Mike Davis",
        paidamount: 75.00,
        claimstatus: "Denied",
        typeofinteraction: "Checkup",
        patientdob: "1978-11-08",
        dos: "2024-01-08",
        productivityamount: 100.00,
        status: "Needs Review",
        timestampbyinteraction: "2024-01-15T12:00:00Z"
      },
      {
        timestamp: "2024-01-15T13:45:00Z",
        insurancecarrier: "Blue Cross Blue Shield",
        offices: "Bays Dental - Downtown",
        patientname: "Emily Wilson",
        paidamount: 225.00,
        claimstatus: "Paid",
        typeofinteraction: "Crown",
        patientdob: "1982-05-14",
        dos: "2024-01-14",
        productivityamount: 300.00,
        status: "Completed",
        timestampbyinteraction: "2024-01-15T13:45:00Z"
      },
      {
        timestamp: "2024-01-15T14:20:00Z",
        insurancecarrier: "MetLife",
        offices: "Bays Dental - Main Office",
        patientname: "Robert Brown",
        paidamount: 180.00,
        claimstatus: "Balance",
        typeofinteraction: "Extraction",
        patientdob: "1975-12-03",
        dos: "2024-01-13",
        productivityamount: 250.00,
        status: "In Progress",
        timestampbyinteraction: "2024-01-15T14:20:00Z"
      },
      {
        timestamp: "2024-01-15T15:10:00Z",
        insurancecarrier: "UnitedHealthcare",
        offices: "Bays Dental - Downtown",
        patientname: "Lisa Garcia",
        paidamount: 120.00,
        claimstatus: "Overpayment",
        typeofinteraction: "Filling",
        patientdob: "1988-09-20",
        dos: "2024-01-11",
        productivityamount: 150.00,
        status: "Completed",
        timestampbyinteraction: "2024-01-15T15:10:00Z"
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
} 