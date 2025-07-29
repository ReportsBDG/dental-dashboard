<<<<<<< HEAD
"use client"

import React from 'react'

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

interface ChartConfig {
  id: string
  title: string
  type: "line" | "bar" | "doughnut" | "polarArea"
  visible: boolean
  showLegend: boolean
  showDataLabels: boolean
  animated: boolean
}

interface ChartsSectionProps {
  data: PatientRecord[]
  filters: any
}

export function ChartsSection({ data, filters }: ChartsSectionProps) {
  const [chartConfigs, setChartConfigs] = React.useState<ChartConfig[]>([
    {
      id: "claim-status-distribution",
      title: "📊 Claim Status Distribution",
      type: "doughnut",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "offices-revenue",
      title: "💰 Revenue by Office",
      type: "bar",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "carriers-performance",
      title: "🏦 Performance by Insurance Carrier",
      type: "bar",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "monthly-revenue-trends",
      title: "📈 Monthly Revenue Trends",
      type: "line",
      visible: true,
      showLegend: true,
      showDataLabels: false,
      animated: true
    },
    {
      id: "interaction-types",
      title: "🔄 Interaction Types",
      type: "doughnut",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "average-payment-by-status",
      title: "💵 Average Payment by Status",
      type: "bar",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    }
  ])

  // Calculate chart data with coherent metrics
  const chartData = React.useMemo(() => {
    // Claim status distribution
    const claimStatusDistribution = data.reduce((acc, record) => {
      const status = record.claimstatus || 'No Status'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Revenue by office
    const officesRevenue = data.reduce((acc, record) => {
      const office = record.offices || 'No Office'
      if (!acc[office]) {
        acc[office] = { count: 0, total: 0, average: 0 }
      }
      acc[office].count += 1
      acc[office].total += record.paidamount || 0
      acc[office].average = acc[office].total / acc[office].count
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    // Performance by insurance carrier
    const carriersPerformance = data.reduce((acc, record) => {
      const carrier = record.insurancecarrier || 'No Carrier'
      if (!acc[carrier]) {
        acc[carrier] = { count: 0, total: 0, average: 0 }
      }
      acc[carrier].count += 1
      acc[carrier].total += record.paidamount || 0
      acc[carrier].average = acc[carrier].total / acc[carrier].count
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    // Monthly revenue trends
    const monthlyRevenueTrends = data.reduce((acc, record) => {
      if (record.timestampbyinteraction) {
        const date = new Date(record.timestampbyinteraction)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (!acc[monthKey]) {
          acc[monthKey] = { count: 0, total: 0, average: 0 }
        }
        acc[monthKey].count += 1
        acc[monthKey].total += record.paidamount || 0
        acc[monthKey].average = acc[monthKey].total / acc[monthKey].count
      }
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    // Interaction types
    const interactionTypes = data.reduce((acc, record) => {
      const interaction = record.typeofinteraction || 'No Type'
      acc[interaction] = (acc[interaction] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Average payment by status
    const averagePaymentByStatus = data.reduce((acc, record) => {
      const status = record.claimstatus || 'No Status'
      if (!acc[status]) {
        acc[status] = { count: 0, total: 0, average: 0 }
      }
      acc[status].count += 1
      acc[status].total += record.paidamount || 0
      acc[status].average = acc[status].total / acc[status].count
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    return {
      claimStatusDistribution,
      officesRevenue,
      carriersPerformance,
      monthlyRevenueTrends,
      interactionTypes,
      averagePaymentByStatus
    }
  }, [data])

  const toggleChartVisibility = (chartId: string) => {
    setChartConfigs(prev => prev.map(chart => 
      chart.id === chartId ? { ...chart, visible: !chart.visible } : chart
    ))
  }

  const changeChartType = (chartId: string, newType: ChartConfig['type']) => {
    setChartConfigs(prev => prev.map(chart => 
      chart.id === chartId ? { ...chart, type: newType } : chart
    ))
  }

  const renderChart = (config: ChartConfig) => {
    if (!config.visible) return null

    const getChartData = () => {
      switch (config.id) {
        case "claim-status-distribution":
          return Object.entries(chartData.claimStatusDistribution)
            .sort(([,a], [,b]) => b - a)
            .map(([status, count]) => ({
              label: status,
              value: count,
              color: getStatusColor(status)
            }))
        case "offices-revenue":
          return Object.entries(chartData.officesRevenue)
            .sort(([,a], [,b]) => b.total - a.total)
            .map(([office, data]) => ({
              label: office,
              value: data.total,
              count: data.count,
              color: getRandomColor(office)
            }))
        case "carriers-performance":
          return Object.entries(chartData.carriersPerformance)
            .sort(([,a], [,b]) => b.total - a.total)
            .map(([carrier, data]) => ({
              label: carrier,
              value: data.total,
              count: data.count,
              color: getRandomColor(carrier)
            }))
        case "monthly-revenue-trends":
          return Object.entries(chartData.monthlyRevenueTrends)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, data]) => ({
              label: formatMonth(month),
              value: data.total,
              count: data.count,
              color: '#3B82F6'
            }))
        case "interaction-types":
          return Object.entries(chartData.interactionTypes)
            .sort(([,a], [,b]) => b - a)
            .map(([interaction, count]) => ({
              label: interaction,
              value: count,
              color: getRandomColor(interaction)
            }))
        case "average-payment-by-status":
          return Object.entries(chartData.averagePaymentByStatus)
            .sort(([,a], [,b]) => b.average - a.average)
            .map(([status, data]) => ({
              label: status,
              value: data.average,
              count: data.count,
              color: getStatusColor(status)
            }))
        default:
          return []
      }
    }

    const chartDataPoints = getChartData()

    return (
      <div key={config.id} className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">{config.title}</h3>
          <div className="flex items-center space-x-2">
            <select
              value={config.type}
              onChange={(e) => changeChartType(config.id, e.target.value as ChartConfig['type'])}
              className="px-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              <option value="bar">📊 Bars</option>
              <option value="line">📈 Lines</option>
              <option value="doughnut">🍩 Doughnut</option>
              <option value="polarArea">🎯 Polar Area</option>
            </select>
            <button
              onClick={() => toggleChartVisibility(config.id)}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {chartDataPoints.length > 0 ? (
          <div className="h-64 flex items-center justify-center">
            {renderChartContent(config, chartDataPoints)}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No data available</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderChartContent = (config: ChartConfig, data: any[]) => {
    switch (config.type) {
      case "doughnut":
        return renderDoughnutChart(data)
      case "bar":
        return renderBarChart(data)
      case "line":
        return renderLineChart(data)
      case "polarArea":
        return renderPolarAreaChart(data)
      default:
        return null
    }
  }

  const renderDoughnutChart = (data: any[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    const radius = 80
    const strokeWidth = 20

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const circumference = 2 * Math.PI * radius
            const strokeDasharray = circumference
            const strokeDashoffset = circumference - (percentage / 100) * circumference
            const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0)
            
            return (
              <circle
                key={item.label}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  transformOrigin: 'center',
                  transform: `rotate(${startAngle}deg)`
                }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{total}</div>
            <div className="text-sm text-slate-600">Total</div>
          </div>
        </div>
      </div>
    )
  }

  const renderBarChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(item => item.value))
    
    return (
      <div className="w-full h-full flex items-end justify-center space-x-2">
        {data.slice(0, 8).map((item, index) => (
          <div key={item.label} className="flex flex-col items-center space-y-2">
            <div className="text-xs text-slate-600 text-center font-medium">
              ${item.value.toLocaleString()}
            </div>
            <div 
              className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
              style={{ 
                height: `${(item.value / maxValue) * 200}px`,
                minHeight: '20px'
              }}
            ></div>
            <div className="text-xs text-slate-500 text-center max-w-16 truncate">
              {item.label}
            </div>
            {item.count && (
              <div className="text-xs text-slate-400">
                ({item.count})
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderLineChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(item => item.value))
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 300
      const y = 200 - ((item.value / maxValue) * 180)
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg width="350" height="220" className="overflow-visible">
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            points={points}
            className="transition-all duration-1000 ease-out"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300
            const y = 200 - ((item.value / maxValue) * 180)
            return (
              <circle
                key={item.label}
                cx={x}
                cy={y}
                r="4"
                fill="#3B82F6"
                className="transition-all duration-1000 ease-out"
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const renderPolarAreaChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(item => item.value))
    
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
          {data.slice(0, 6).map((item, index) => {
            const size = (item.value / maxValue) * 120 + 40
            const angle = (index / data.length) * 360
            const x = Math.cos((angle - 90) * Math.PI / 180) * (size / 2)
            const y = Math.sin((angle - 90) * Math.PI / 180) * (size / 2)
            
            return (
              <div
                key={item.label}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: item.color,
                    opacity: 0.8
                  }}
                >
                  {item.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Paid': '#10B981',
      'Pending': '#F59E0B',
      'Denied': '#EF4444',
      'Balance': '#3B82F6',
      'Overpayment': '#8B5CF6',
      'Credit': '#6366F1',
      'No Status': '#6B7280'
    }
    return colors[status] || getRandomColor(status)
  }

  const getRandomColor = (seed: string) => {
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ]
    const index = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[index]
  }

  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">📊 Visual Analysis</h2>
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm">Active charts: {chartConfigs.filter(c => c.visible).length}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chartConfigs.map(renderChart)}
      </div>
    </div>
  )
}
=======
"use client"

import React from 'react'

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

interface ChartConfig {
  id: string
  title: string
  type: "line" | "bar" | "doughnut" | "polarArea"
  visible: boolean
  showLegend: boolean
  showDataLabels: boolean
  animated: boolean
}

interface ChartsSectionProps {
  data: PatientRecord[]
  filters: any
}

export function ChartsSection({ data, filters }: ChartsSectionProps) {
  const [chartConfigs, setChartConfigs] = React.useState<ChartConfig[]>([
    {
      id: "claim-status-distribution",
      title: "📊 Claim Status Distribution",
      type: "doughnut",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "offices-revenue",
      title: "💰 Revenue by Office",
      type: "bar",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "carriers-performance",
      title: "🏦 Performance by Insurance Carrier",
      type: "bar",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "monthly-revenue-trends",
      title: "📈 Monthly Revenue Trends",
      type: "line",
      visible: true,
      showLegend: true,
      showDataLabels: false,
      animated: true
    },
    {
      id: "interaction-types",
      title: "🔄 Interaction Types",
      type: "doughnut",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    },
    {
      id: "average-payment-by-status",
      title: "💵 Average Payment by Status",
      type: "bar",
      visible: true,
      showLegend: true,
      showDataLabels: true,
      animated: true
    }
  ])

  // Calculate chart data with coherent metrics
  const chartData = React.useMemo(() => {
    // Claim status distribution
    const claimStatusDistribution = data.reduce((acc, record) => {
      const status = record.claimstatus || 'No Status'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Revenue by office
    const officesRevenue = data.reduce((acc, record) => {
      const office = record.offices || 'No Office'
      if (!acc[office]) {
        acc[office] = { count: 0, total: 0, average: 0 }
      }
      acc[office].count += 1
      acc[office].total += record.paidamount || 0
      acc[office].average = acc[office].total / acc[office].count
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    // Performance by insurance carrier
    const carriersPerformance = data.reduce((acc, record) => {
      const carrier = record.insurancecarrier || 'No Carrier'
      if (!acc[carrier]) {
        acc[carrier] = { count: 0, total: 0, average: 0 }
      }
      acc[carrier].count += 1
      acc[carrier].total += record.paidamount || 0
      acc[carrier].average = acc[carrier].total / acc[carrier].count
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    // Monthly revenue trends
    const monthlyRevenueTrends = data.reduce((acc, record) => {
      if (record.timestampbyinteraction) {
        const date = new Date(record.timestampbyinteraction)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (!acc[monthKey]) {
          acc[monthKey] = { count: 0, total: 0, average: 0 }
        }
        acc[monthKey].count += 1
        acc[monthKey].total += record.paidamount || 0
        acc[monthKey].average = acc[monthKey].total / acc[monthKey].count
      }
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    // Interaction types
    const interactionTypes = data.reduce((acc, record) => {
      const interaction = record.typeofinteraction || 'No Type'
      acc[interaction] = (acc[interaction] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Average payment by status
    const averagePaymentByStatus = data.reduce((acc, record) => {
      const status = record.claimstatus || 'No Status'
      if (!acc[status]) {
        acc[status] = { count: 0, total: 0, average: 0 }
      }
      acc[status].count += 1
      acc[status].total += record.paidamount || 0
      acc[status].average = acc[status].total / acc[status].count
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    return {
      claimStatusDistribution,
      officesRevenue,
      carriersPerformance,
      monthlyRevenueTrends,
      interactionTypes,
      averagePaymentByStatus
    }
  }, [data])

  const toggleChartVisibility = (chartId: string) => {
    setChartConfigs(prev => prev.map(chart => 
      chart.id === chartId ? { ...chart, visible: !chart.visible } : chart
    ))
  }

  const changeChartType = (chartId: string, newType: ChartConfig['type']) => {
    setChartConfigs(prev => prev.map(chart => 
      chart.id === chartId ? { ...chart, type: newType } : chart
    ))
  }

  const renderChart = (config: ChartConfig) => {
    if (!config.visible) return null

    const getChartData = () => {
      switch (config.id) {
        case "claim-status-distribution":
          return Object.entries(chartData.claimStatusDistribution)
            .sort(([,a], [,b]) => b - a)
            .map(([status, count]) => ({
              label: status,
              value: count,
              color: getStatusColor(status)
            }))
        case "offices-revenue":
          return Object.entries(chartData.officesRevenue)
            .sort(([,a], [,b]) => b.total - a.total)
            .map(([office, data]) => ({
              label: office,
              value: data.total,
              count: data.count,
              color: getRandomColor(office)
            }))
        case "carriers-performance":
          return Object.entries(chartData.carriersPerformance)
            .sort(([,a], [,b]) => b.total - a.total)
            .map(([carrier, data]) => ({
              label: carrier,
              value: data.total,
              count: data.count,
              color: getRandomColor(carrier)
            }))
        case "monthly-revenue-trends":
          return Object.entries(chartData.monthlyRevenueTrends)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, data]) => ({
              label: formatMonth(month),
              value: data.total,
              count: data.count,
              color: '#3B82F6'
            }))
        case "interaction-types":
          return Object.entries(chartData.interactionTypes)
            .sort(([,a], [,b]) => b - a)
            .map(([interaction, count]) => ({
              label: interaction,
              value: count,
              color: getRandomColor(interaction)
            }))
        case "average-payment-by-status":
          return Object.entries(chartData.averagePaymentByStatus)
            .sort(([,a], [,b]) => b.average - a.average)
            .map(([status, data]) => ({
              label: status,
              value: data.average,
              count: data.count,
              color: getStatusColor(status)
            }))
        default:
          return []
      }
    }

    const chartDataPoints = getChartData()

    return (
      <div key={config.id} className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">{config.title}</h3>
          <div className="flex items-center space-x-2">
            <select
              value={config.type}
              onChange={(e) => changeChartType(config.id, e.target.value as ChartConfig['type'])}
              className="px-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              <option value="bar">📊 Bars</option>
              <option value="line">📈 Lines</option>
              <option value="doughnut">🍩 Doughnut</option>
              <option value="polarArea">🎯 Polar Area</option>
            </select>
            <button
              onClick={() => toggleChartVisibility(config.id)}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {chartDataPoints.length > 0 ? (
          <div className="h-64 flex items-center justify-center">
            {renderChartContent(config, chartDataPoints)}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No data available</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderChartContent = (config: ChartConfig, data: any[]) => {
    switch (config.type) {
      case "doughnut":
        return renderDoughnutChart(data)
      case "bar":
        return renderBarChart(data)
      case "line":
        return renderLineChart(data)
      case "polarArea":
        return renderPolarAreaChart(data)
      default:
        return null
    }
  }

  const renderDoughnutChart = (data: any[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    const radius = 80
    const strokeWidth = 20

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const circumference = 2 * Math.PI * radius
            const strokeDasharray = circumference
            const strokeDashoffset = circumference - (percentage / 100) * circumference
            const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0)
            
            return (
              <circle
                key={item.label}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  transformOrigin: 'center',
                  transform: `rotate(${startAngle}deg)`
                }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{total}</div>
            <div className="text-sm text-slate-600">Total</div>
          </div>
        </div>
      </div>
    )
  }

  const renderBarChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(item => item.value))
    
    return (
      <div className="w-full h-full flex items-end justify-center space-x-2">
        {data.slice(0, 8).map((item, index) => (
          <div key={item.label} className="flex flex-col items-center space-y-2">
            <div className="text-xs text-slate-600 text-center font-medium">
              ${item.value.toLocaleString()}
            </div>
            <div 
              className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
              style={{ 
                height: `${(item.value / maxValue) * 200}px`,
                minHeight: '20px'
              }}
            ></div>
            <div className="text-xs text-slate-500 text-center max-w-16 truncate">
              {item.label}
            </div>
            {item.count && (
              <div className="text-xs text-slate-400">
                ({item.count})
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderLineChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(item => item.value))
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 300
      const y = 200 - ((item.value / maxValue) * 180)
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg width="350" height="220" className="overflow-visible">
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            points={points}
            className="transition-all duration-1000 ease-out"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300
            const y = 200 - ((item.value / maxValue) * 180)
            return (
              <circle
                key={item.label}
                cx={x}
                cy={y}
                r="4"
                fill="#3B82F6"
                className="transition-all duration-1000 ease-out"
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const renderPolarAreaChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(item => item.value))
    
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
          {data.slice(0, 6).map((item, index) => {
            const size = (item.value / maxValue) * 120 + 40
            const angle = (index / data.length) * 360
            const x = Math.cos((angle - 90) * Math.PI / 180) * (size / 2)
            const y = Math.sin((angle - 90) * Math.PI / 180) * (size / 2)
            
            return (
              <div
                key={item.label}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: item.color,
                    opacity: 0.8
                  }}
                >
                  {item.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Paid': '#10B981',
      'Pending': '#F59E0B',
      'Denied': '#EF4444',
      'Balance': '#3B82F6',
      'Overpayment': '#8B5CF6',
      'Credit': '#6366F1',
      'No Status': '#6B7280'
    }
    return colors[status] || getRandomColor(status)
  }

  const getRandomColor = (seed: string) => {
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ]
    const index = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[index]
  }

  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">📊 Visual Analysis</h2>
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm">Active charts: {chartConfigs.filter(c => c.visible).length}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chartConfigs.map(renderChart)}
      </div>
    </div>
  )
}
>>>>>>> becca72358969d5b4d324a29dd5a2c42b9a6fe69
