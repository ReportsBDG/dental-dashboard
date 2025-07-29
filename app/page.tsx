"use client"

// 🚀 FORCE DEPLOYMENT - Bays Dental Analytics Dashboard v2.0
// Dashboard Application - Bays Dental Analytics
// Resolved merge conflicts - Ready for deployment

import React from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { ChartsSection } from '@/components/charts-section'
import { fetchFromGoogleScript, validatePatientData } from '@/lib/google-script'

// Data types
interface PatientRecord {
  timestamp: string
  insurancecarrier: string
  offices: string
  patientname: string
  paidamount: number
  claimstatus: string
  typeofinteraction?: string
  patientdob?: string
  dos?: string
  productivityamount?: number
  missingdocsorinformation?: string
  howweproceeded?: string
  escalatedto?: string
  commentsreasons?: string
  emailaddress?: string
  status?: string
  timestampbyinteraction?: string
}

interface FilterState {
  dateRange: { from: string; to: string }
  selectedOffices: string[]
  selectedCarriers: string[]
  selectedStatuses: string[]
  selectedTypes: string[]
  selectedEmails: string[]
  selectedHowProceeded: string[]
  selectedEscalatedTo: string[]
  selectedComments: string[]
  searchTerm: string
  activeFilters: string[]
}

interface ChartConfig {
  id: string
  title: string
  type: "line" | "bar" | "doughnut" | "polarArea"
  visible: boolean
  showLegend: boolean
  showDataLabels: boolean
  animated: boolean
}

// Sample data for demonstration
const sampleData: PatientRecord[] = [
  {
    timestamp: "2024-01-15T10:30:00Z",
    insurancecarrier: "Delta Dental",
    offices: "Downtown Office",
    patientname: "John Smith",
    paidamount: 150.00,
    claimstatus: "Paid",
    typeofinteraction: "Cleaning",
    patientdob: "1985-03-15",
    dos: "2024-01-10",
    productivityamount: 200.00,
    status: "Completed"
  },
  {
    timestamp: "2024-01-15T11:15:00Z",
    insurancecarrier: "Aetna",
    offices: "Uptown Office",
    patientname: "Sarah Johnson",
    paidamount: 300.00,
    claimstatus: "Pending",
    typeofinteraction: "Root Canal",
    patientdob: "1990-07-22",
    dos: "2024-01-12",
    productivityamount: 450.00,
    status: "In Progress"
  },
  {
    timestamp: "2024-01-15T12:00:00Z",
    insurancecarrier: "Cigna",
    offices: "Downtown Office",
    patientname: "Mike Davis",
    paidamount: 75.00,
    claimstatus: "Denied",
    typeofinteraction: "Checkup",
    patientdob: "1978-11-08",
    dos: "2024-01-08",
    productivityamount: 100.00,
    status: "Needs Review"
  }
]

// Available filters configuration with premium icons
const AVAILABLE_FILTERS = {
  offices: { 
    label: "Offices", 
    column: "offices", 
    icon: "🏢", 
    color: "from-blue-500 to-cyan-500",
    premiumIcon: "🏥"
  },
  insurancecarrier: { 
    label: "Insurance Carriers", 
    column: "insurancecarrier", 
    icon: "🏦", 
    color: "from-emerald-500 to-teal-500",
    premiumIcon: "🛡️"
  },
  claimstatus: { 
    label: "Claim Status", 
    column: "claimstatus", 
    icon: "📊", 
    color: "from-purple-500 to-pink-500",
    premiumIcon: "📋"
  },
  typeofinteraction: { 
    label: "Interaction Type", 
    column: "typeofinteraction", 
    icon: "🔄", 
    color: "from-orange-500 to-red-500",
    premiumIcon: "⚡"
  },
  emailaddress: { 
    label: "Email", 
    column: "emailaddress", 
    icon: "📧", 
    color: "from-indigo-500 to-blue-500",
    premiumIcon: "✉️"
  },
  howweproceeded: { 
    label: "How We Proceeded", 
    column: "howweproceeded", 
    icon: "⚡", 
    color: "from-yellow-500 to-orange-500",
    premiumIcon: "🎯"
  },
  escalatedto: { 
    label: "Escalated To", 
    column: "escalatedto", 
    icon: "📈", 
    color: "from-green-500 to-emerald-500",
    premiumIcon: "📤"
  },
  commentsreasons: { 
    label: "Comments/Reasons", 
    column: "commentsreasons", 
    icon: "💬", 
    color: "from-pink-500 to-rose-500",
    premiumIcon: "💭"
  }
}

export default function DashboardPage() {
  const [data, setData] = React.useState<PatientRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [showFilters, setShowFilters] = React.useState(false)
  const [showCharts, setShowCharts] = React.useState(true)
  const [selectedFilterTypes, setSelectedFilterTypes] = React.useState<string[]>(["offices", "insurancecarrier", "claimstatus", "typeofinteraction"])
  const [openDropdowns, setOpenDropdowns] = React.useState<Record<string, boolean>>({})
  const [filterButtonOpen, setFilterButtonOpen] = React.useState(false)
  
  // Set initial date (first day of current month)
  const getFirstDayOfMonth = () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  }
  
  const [filters, setFilters] = React.useState<FilterState>({
    dateRange: { 
      from: getFirstDayOfMonth(), 
      to: new Date().toISOString().split('T')[0] 
    },
    selectedOffices: [],
    selectedCarriers: [],
    selectedStatuses: [],
    selectedTypes: [],
    selectedEmails: [],
    selectedHowProceeded: [],
    selectedEscalatedTo: [],
    selectedComments: [],
    searchTerm: "",
    activeFilters: ["offices", "insurancecarrier", "claimstatus", "typeofinteraction"]
  })

  // Function to load data from Google Apps Script
  const loadDataFromGoogleScript = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Starting data load...')
      
      const result = await fetchFromGoogleScript()
      
      if (validatePatientData(result)) {
        console.log('Valid data received:', result.length, 'records')
        setData(result)
      } else {
        console.warn('Received data does not have expected format')
        setData(sampleData) // Use sample data as fallback
      }
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setData(sampleData) // Use sample data as fallback
    } finally {
      setLoading(false)
    }
  }, [])

  // Load data when component mounts
  React.useEffect(() => {
    loadDataFromGoogleScript()
  }, [loadDataFromGoogleScript])

  const filteredData = React.useMemo(() => {
    return data.filter((record: PatientRecord) => {
      // Date range filter (timestampbyinteraction)
      if (record.timestampbyinteraction) {
        const recordDate = new Date(record.timestampbyinteraction)
        const fromDate = new Date(filters.dateRange.from)
        const toDate = new Date(filters.dateRange.to + 'T23:59:59')
        
        if (recordDate < fromDate || recordDate > toDate) {
          return false
        }
      }
      
      // Search filter
      if (filters.searchTerm && !record.patientname.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false
      }
      
      // Dynamic filters
      if (filters.selectedOffices.length > 0 && !filters.selectedOffices.includes(record.offices)) {
        return false
      }
      if (filters.selectedCarriers.length > 0 && !filters.selectedCarriers.includes(record.insurancecarrier)) {
        return false
      }
      if (filters.selectedStatuses.length > 0 && !filters.selectedStatuses.includes(record.claimstatus)) {
        return false
      }
      if (filters.selectedTypes.length > 0 && !filters.selectedTypes.includes(record.typeofinteraction || '')) {
        return false
      }
      if (filters.selectedEmails.length > 0 && !filters.selectedEmails.includes(record.emailaddress || '')) {
        return false
      }
      if (filters.selectedHowProceeded.length > 0 && !filters.selectedHowProceeded.includes(record.howweproceeded || '')) {
        return false
      }
      if (filters.selectedEscalatedTo.length > 0 && !filters.selectedEscalatedTo.includes(record.escalatedto || '')) {
        return false
      }
      if (filters.selectedComments.length > 0 && !filters.selectedComments.includes(record.commentsreasons || '')) {
        return false
      }
      
      return true
    })
  }, [data, filters])

  // Get unique values for each filter
  const getUniqueValues = (column: string) => {
    return Array.from(new Set(data.map(record => {
      const value = record[column as keyof PatientRecord]
      return value !== undefined && value !== null ? String(value) : ''
    }).filter(value => value !== '')))
  }

  // Toggle active filter
  const toggleFilter = (filterKey: string) => {
    setSelectedFilterTypes(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    )
    setFilters(prev => ({
      ...prev,
      activeFilters: prev.activeFilters.includes(filterKey)
        ? prev.activeFilters.filter(f => f !== filterKey)
        : [...prev.activeFilters, filterKey]
    }))
  }

  // Update filter values
  const updateFilterValues = (filterKey: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: values
    }))
  }

  // Toggle individual dropdown
  const toggleDropdown = (filterKey: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }))
  }

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns({})
  }

  // Close filter dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (filterButtonOpen && !target.closest('.filter-dropdown-container')) {
        setFilterButtonOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [filterButtonOpen])

  // Function to download data as CSV (Excel)
  const downloadExcel = () => {
    const headers = ['Patient', 'Office', 'Insurance Carrier', 'Paid Amount', 'Status', 'Interaction Type', 'Email', 'Date']
    const csvContent = [
      headers.join(','),
      ...filteredData.map(record => [
        `"${record.patientname}"`,
        `"${record.offices}"`,
        `"${record.insurancecarrier}"`,
        record.paidamount,
        `"${record.claimstatus}"`,
        `"${record.typeofinteraction || ''}"`,
        `"${record.emailaddress || ''}"`,
        `"${record.timestampbyinteraction || record.timestamp}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Function to download data as PDF
  const downloadPDF = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Patient Report - Bays Dental</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1e40af; text-align: center; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .header { text-align: center; margin-bottom: 20px; }
            .stats { display: flex; justify-content: space-around; margin: 20px 0; }
            .stat { text-align: center; }
            .stat-value { font-size: 24px; font-weight: bold; color: #1e40af; }
            .stat-label { color: #64748b; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🦷 Bays Dental Analytics</h1>
            <p>Patient Report - ${new Date().toLocaleDateString('en-US')}</p>
          </div>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${filteredData.length}</div>
              <div class="stat-label">Total Records</div>
            </div>
            <div class="stat">
              <div class="stat-value">$${filteredData.reduce((sum, record) => sum + (record.paidamount || 0), 0).toLocaleString()}</div>
              <div class="stat-label">Total Revenue</div>
            </div>
            <div class="stat">
              <div class="stat-value">$${filteredData.length > 0 ? (filteredData.reduce((sum, record) => sum + (record.paidamount || 0), 0) / filteredData.length).toFixed(2) : '0.00'}</div>
              <div class="stat-label">Average</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Office</th>
                <th>Insurance Carrier</th>
                <th>Paid Amount</th>
                <th>Status</th>
                <th>Interaction Type</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(record => `
                <tr>
                  <td>${record.patientname}</td>
                  <td>${record.offices}</td>
                  <td>${record.insurancecarrier}</td>
                  <td>$${record.paidamount.toFixed(2)}</td>
                  <td>${record.claimstatus}</td>
                  <td>${record.typeofinteraction || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    
    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* EPIC Header */}
      <header className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Particle effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo and title */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-2xl">🦷</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Bays Dental Analytics
                </h1>
                <p className="text-blue-200 text-sm font-medium">Intelligent Dashboard</p>
              </div>
            </div>

            {/* Main controls */}
            <div className="flex items-center space-x-6">
              {/* Quick stats */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{filteredData.length}</div>
                  <div className="text-blue-200 text-xs">Records</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    ${filteredData.reduce((sum, record) => sum + (record.paidamount || 0), 0).toFixed(0)}
                  </div>
                  <div className="text-blue-200 text-xs">Total</div>
                </div>
              </div>

              {/* Premium filter button */}
              <div className="relative">
                <button
                  onClick={() => setFilterButtonOpen(!filterButtonOpen)}
                  className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="text-xl">🎛️</span>
                  <span className="font-semibold">Filters</span>
                  <span className="bg-white/20 rounded-full px-2 py-1 text-xs font-bold">
                    {selectedFilterTypes.length}
                  </span>
                  <svg className={`w-5 h-5 transition-transform duration-300 ${filterButtonOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Premium filter dropdown */}
                <div className="relative filter-dropdown-container">
                  {filterButtonOpen && (
                    <div className="fixed top-24 right-4 w-80 md:w-96 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-[99999] overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100">
                      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-slate-50 to-blue-50">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">🎯 Advanced Filters</h3>
                        <p className="text-sm text-slate-600">Select the filter types you need</p>
                      </div>
                      <div className="p-6 max-h-96 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-3">
                          {Object.entries(AVAILABLE_FILTERS).map(([key, config]) => (
                            <label key={key} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-all duration-300 border border-slate-100 hover:border-slate-200">
                              <input
                                type="checkbox"
                                checked={selectedFilterTypes.includes(key)}
                                onChange={() => toggleFilter(key)}
                                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                              />
                              <div className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                                {config.premiumIcon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-800">{config.label}</div>
                                <div className="text-sm text-slate-500">
                                  {getUniqueValues(config.column).length} options available
                                </div>
                              </div>
                              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                selectedFilterTypes.includes(key) 
                                  ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                                  : 'bg-slate-300'
                              }`}></div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 border-t border-white/10 bg-gradient-to-r from-slate-50 to-blue-50">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-slate-700">
                            {selectedFilterTypes.length} of {Object.keys(AVAILABLE_FILTERS).length} filters selected
                          </span>
                          <button
                            onClick={() => setSelectedFilterTypes(Object.keys(AVAILABLE_FILTERS))}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Select All
                          </button>
                        </div>
                        <button
                          onClick={() => setFilterButtonOpen(false)}
                          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                        >
                          Apply Filters ({selectedFilterTypes.length})
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    showFilters 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-lg">🔍</span>
                </button>
                <button
                  onClick={() => setShowCharts(!showCharts)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    showCharts 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-lg">📊</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collapsible filter panel */}
        {showFilters && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 mb-8 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">🎯 Advanced Filters</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, searchTerm: "" }))}
                    className="px-4 py-2 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all duration-300"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      selectedOffices: [],
                      selectedCarriers: [],
                      selectedStatuses: [],
                      selectedTypes: [],
                      selectedEmails: [],
                      selectedHowProceeded: [],
                      selectedEscalatedTo: [],
                      selectedComments: []
                    }))}
                    className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Main search */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">🔍 Search Patient</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Patient name..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                    👤
                  </div>
                </div>
              </div>

              {/* Date range */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">📅 Date Range (Timestamp by Interaction)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">From</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      value={filters.dateRange.from}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, from: e.target.value } 
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">To</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      value={filters.dateRange.to}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        dateRange: { ...prev.dateRange, to: e.target.value } 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Active filters with dropdowns */}
              {selectedFilterTypes.length > 0 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">⚡ Selected Filters</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedFilterTypes.map(filterKey => {
                      const config = AVAILABLE_FILTERS[filterKey as keyof typeof AVAILABLE_FILTERS]
                      const uniqueValues = getUniqueValues(config.column)
                      const isOpen = openDropdowns[filterKey] || false
                      const selectedValues = (filters[`selected${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}` as keyof FilterState] as string[]) || []
                      
                      return (
                        <div key={filterKey} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center justify-between mb-3">
                            <label className="flex items-center space-x-2">
                              <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center text-white text-sm shadow-lg`}>
                                {config.premiumIcon}
                              </div>
                              <span className="font-medium text-slate-700">{config.label}</span>
                            </label>
                            <button
                              onClick={() => toggleDropdown(filterKey)}
                              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Dropdown content */}
                          {isOpen && (
                            <div className="mt-3 space-y-2">
                              <div className="max-h-40 overflow-y-auto bg-white rounded-lg border border-slate-200 p-2">
                                {uniqueValues.map(value => (
                                  <label key={value} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={selectedValues.includes(value)}
                                      onChange={(e) => {
                                        const newValues = e.target.checked
                                          ? [...selectedValues, value]
                                          : selectedValues.filter(v => v !== value)
                                        updateFilterValues(`selected${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`, newValues)
                                      }}
                                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-slate-700">{value}</span>
                                  </label>
                                ))}
                              </div>
                              {selectedValues.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {selectedValues.map(value => (
                                    <span key={value} className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                      {value}
                                      <button
                                        onClick={() => {
                                          const newValues = selectedValues.filter(v => v !== value)
                                          updateFilterValues(`selected${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`, newValues)
                                        }}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Selected summary */}
                          {!isOpen && selectedValues.length > 0 && (
                            <div className="text-sm text-slate-600">
                              {selectedValues.length} selected
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Total Records</p>
                <p className="text-2xl font-bold text-slate-900">{data.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Filtered Records</p>
                <p className="text-2xl font-bold text-slate-900">{filteredData.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${filteredData.reduce((sum, record) => sum + (record.paidamount || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <span className="text-2xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Average</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${filteredData.length > 0 ? (filteredData.reduce((sum, record) => sum + (record.paidamount || 0), 0) / filteredData.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/20">
            <div className="inline-flex items-center px-6 py-3 font-semibold text-blue-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
              Loading data from Google Apps Script...
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50/95 backdrop-blur-xl border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading data
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-2">Showing sample data. Please verify the Google Apps Script URL.</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={loadDataFromGoogleScript}
                    className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-all duration-300"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Charts Section */}
        {showCharts && (
          <div className="mb-8">
            <ChartsSection data={filteredData} filters={filters} />
          </div>
        )}
        
        {/* Data table */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-slate-50 to-blue-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">📋 Patient Records</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-600">
                  {filteredData.length} records
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadExcel}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="text-lg">📊</span>
                    <span className="font-medium">Excel</span>
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="text-lg">📄</span>
                    <span className="font-medium">PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Office
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Insurance Carrier
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Paid Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredData.map((record: PatientRecord, index: number) => (
                  <tr key={index} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{record.patientname}</div>
                      <div className="text-sm text-slate-500">{record.typeofinteraction}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {record.offices}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {record.insurancecarrier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      ${record.paidamount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        record.claimstatus === 'Paid' ? 'bg-green-100 text-green-800' :
                        record.claimstatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        record.claimstatus === 'Balance' ? 'bg-blue-100 text-blue-800' :
                        record.claimstatus === 'Overpayment' ? 'bg-purple-100 text-purple-800' :
                        record.claimstatus === 'Credit' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.claimstatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
