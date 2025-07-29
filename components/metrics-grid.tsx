"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, FileText, TrendingUp, Building, Users, Activity } from "lucide-react"

interface MetricsGridProps {
  data: Array<{
    paidAmount: number
    office: string
    timestamp: string
  }>
}

export function MetricsGrid({ data }: MetricsGridProps) {
  const totalRevenue = data.reduce((sum, item) => sum + (item.paidAmount || 0), 0)
  const totalClaims = data.length
  const avgClaim = totalClaims > 0 ? totalRevenue / totalClaims : 0
  const activeOffices = Array.from(new Set(data.map((d) => d.office).filter(Boolean))).length

  const today = new Date().toISOString().split("T")[0]
  const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const thisMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  const todayClaims = data.filter((item) => item.timestamp && item.timestamp.split("T")[0] === today).length
  const weekClaims = data.filter((item) => item.timestamp && item.timestamp.split("T")[0] >= thisWeek).length
  const monthClaims = data.filter((item) => item.timestamp && item.timestamp.split("T")[0] >= thisMonth).length

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${Math.round(totalRevenue).toLocaleString()}`,
      icon: DollarSign,
      change: "+12.3%",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      title: "Claims Processed",
      value: totalClaims.toLocaleString(),
      icon: FileText,
      change: "+8.7%",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Average Claim",
      value: `$${Math.round(avgClaim).toLocaleString()}`,
      icon: TrendingUp,
      change: "+5.2%",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      title: "Active Offices",
      value: activeOffices.toString(),
      icon: Building,
      change: "+100%",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ]

  const timeMetrics = [
    { label: "Today", value: todayClaims, color: "bg-blue-500" },
    { label: "This Week", value: weekClaims, color: "bg-green-500" },
    { label: "This Month", value: monthClaims, color: "bg-purple-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon
          return (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5`} />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${metric.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${metric.textColor}`} />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                  <p className={`text-3xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Métricas temporales */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-slate-100">
              <Activity className="h-5 w-5 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Activity Timeline</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeMetrics.map((metric, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${metric.color} text-white mb-3`}
                >
                  <Users className="h-6 w-6" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-slate-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
