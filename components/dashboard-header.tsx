"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Users, Building } from "lucide-react"

interface DashboardHeaderProps {
  totalRecords: number
  filteredRecords: number
}

export function DashboardHeader({ totalRecords, filteredRecords }: DashboardHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 p-8 text-white shadow-2xl">
      {/* Elementos decorativos animados */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 animate-pulse" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 animate-bounce" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white hover:bg-white/20" />
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Activity className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">🦷 Dental Analytics Dashboard</h1>
                <p className="text-xl font-medium text-white/90 mt-1">
                  THE ULTIMATE TITAN - Real-time insights for your dental practice
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-semibold"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Live Data
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white px-4 py-2 text-sm font-semibold">
              <Users className="h-4 w-4 mr-2" />
              {filteredRecords} / {totalRecords} Records
            </Badge>
            <button
              onClick={() => window.location.reload()}
              className="bg-white/20 text-white border border-white/30 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Recargar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Building className="h-6 w-6 text-white/80" />
              <span className="text-white/80 font-medium">Data Status</span>
            </div>
            <div className="text-2xl font-bold">{((filteredRecords / totalRecords) * 100).toFixed(1)}% Filtered</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-6 w-6 text-white/80" />
              <span className="text-white/80 font-medium">Performance</span>
            </div>
            <div className="text-2xl font-bold">Excellent</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-6 w-6 text-white/80" />
              <span className="text-white/80 font-medium">Trend</span>
            </div>
            <div className="text-2xl font-bold text-green-300">+12.3%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
