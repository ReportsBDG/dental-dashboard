"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Filter,
  Calendar,
  Building,
  Shield,
  Activity,
  Search,
  X,
  ChevronDown,
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react"

interface FilterSidebarProps {
  filters: {
    dateRange: { from: string; to: string }
    selectedOffices: string[]
    selectedCarriers: string[]
    selectedStatuses: string[]
    searchTerm: string
  }
  onFiltersChange: (filters: any) => void
  uniqueValues: {
    offices: string[]
    carriers: string[]
    statuses: string[]
  }
  onApplyFilters: () => void
  onClearFilters: () => void
  chartConfigs: Array<{
    id: string
    title: string
    type: "line" | "bar" | "doughnut" | "polarArea"
    visible: boolean
    showLegend: boolean
    showDataLabels: boolean
    animated: boolean
  }>
  onUpdateChartConfig: (chartId: string, updates: any) => void
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  uniqueValues,
  onApplyFilters,
  onClearFilters,
  chartConfigs,
  onUpdateChartConfig,
}: FilterSidebarProps) {
  const [searchTerms, setSearchTerms] = useState({
    offices: "",
    carriers: "",
    statuses: "",
  })
  const [expandedSections, setExpandedSections] = useState({
    offices: true,
    carriers: true,
    statuses: true,
    charts: false,
  })

  const handleCheckboxChange = (
    category: "selectedOffices" | "selectedCarriers" | "selectedStatuses",
    value: string,
    checked: boolean,
  ) => {
    const currentValues = filters[category]
    const newValues = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value)

    onFiltersChange({
      ...filters,
      [category]: newValues,
    })
  }

  const getFilteredValues = (category: "offices" | "carriers" | "statuses") => {
    const searchTerm = searchTerms[category].toLowerCase()
    return uniqueValues[category].filter((value) => value.toLowerCase().includes(searchTerm))
  }

  const getActiveFiltersCount = () => {
    return (
      filters.selectedOffices.length +
      filters.selectedCarriers.length +
      filters.selectedStatuses.length +
      (filters.dateRange.from ? 1 : 0) +
      (filters.dateRange.to ? 1 : 0) +
      (filters.searchTerm ? 1 : 0)
    )
  }

  const chartTypeIcons = {
    line: LineChart,
    bar: BarChart3,
    doughnut: PieChart,
    polarArea: PieChart,
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="w-80 border-r-2 border-slate-200/60 bg-white/80 backdrop-blur-xl h-screen overflow-y-auto">
      {/* Header */}
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white">
            <Filter className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Smart Filters</h2>
            <p className="text-sm text-slate-600">Advanced data filtering & visualization</p>
          </div>
        </div>

        {getActiveFiltersCount() > 0 && (
          <Badge variant="secondary" className="mt-3 w-fit bg-blue-100 text-blue-800">
            {getActiveFiltersCount()} Active Filters
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Global Search */}
        <div>
          <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
            <Search className="h-4 w-4" />
            Global Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search patients, offices, carriers..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
              className="pl-10 bg-white/60 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
            />
            {filters.searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => onFiltersChange({ ...filters, searchTerm: "" })}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
            <Calendar className="h-4 w-4" />
            Date Range
          </label>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">
                From Date
              </label>
              <Input
                type="date"
                value={filters.dateRange.from}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    dateRange: { ...filters.dateRange, from: e.target.value },
                  })
                }
                className="bg-white/60 border-slate-200 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">
                To Date
              </label>
              <Input
                type="date"
                value={filters.dateRange.to}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    dateRange: { ...filters.dateRange, to: e.target.value },
                  })
                }
                className="bg-white/60 border-slate-200 focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Offices Filter */}
        <div>
          <button
            onClick={() => toggleSection('offices')}
            className="flex items-center justify-between w-full text-slate-700 font-semibold hover:bg-slate-50 rounded-lg p-2 -m-2"
          >
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Offices
              {filters.selectedOffices.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 text-xs">
                  {filters.selectedOffices.length}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.offices ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.offices && (
            <div className="mt-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                <Input
                  placeholder="Search offices..."
                  value={searchTerms.offices}
                  onChange={(e) => setSearchTerms({ ...searchTerms, offices: e.target.value })}
                  className="pl-9 h-8 text-sm bg-white/60 border-slate-200"
                />
              </div>
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {getFilteredValues("offices").map((office) => (
                    <div key={office} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg">
                      <input
                        type="checkbox"
                        id={`office-${office}`}
                        checked={filters.selectedOffices.includes(office)}
                        onChange={(e) => handleCheckboxChange("selectedOffices", office, e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`office-${office}`} className="text-sm font-medium cursor-pointer flex-1">
                        {office}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Carriers Filter */}
        <div>
          <button
            onClick={() => toggleSection('carriers')}
            className="flex items-center justify-between w-full text-slate-700 font-semibold hover:bg-slate-50 rounded-lg p-2 -m-2"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Carriers
              {filters.selectedCarriers.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 text-xs">
                  {filters.selectedCarriers.length}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.carriers ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.carriers && (
            <div className="mt-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                <Input
                  placeholder="Search carriers..."
                  value={searchTerms.carriers}
                  onChange={(e) => setSearchTerms({ ...searchTerms, carriers: e.target.value })}
                  className="pl-9 h-8 text-sm bg-white/60 border-slate-200"
                />
              </div>
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {getFilteredValues("carriers").map((carrier) => (
                    <div key={carrier} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg">
                      <input
                        type="checkbox"
                        id={`carrier-${carrier}`}
                        checked={filters.selectedCarriers.includes(carrier)}
                        onChange={(e) => handleCheckboxChange("selectedCarriers", carrier, e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`carrier-${carrier}`} className="text-sm font-medium cursor-pointer flex-1">
                        {carrier}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div>
          <button
            onClick={() => toggleSection('statuses')}
            className="flex items-center justify-between w-full text-slate-700 font-semibold hover:bg-slate-50 rounded-lg p-2 -m-2"
          >
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Status
              {filters.selectedStatuses.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-800 text-xs">
                  {filters.selectedStatuses.length}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.statuses ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.statuses && (
            <div className="mt-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                <Input
                  placeholder="Search status..."
                  value={searchTerms.statuses}
                  onChange={(e) => setSearchTerms({ ...searchTerms, statuses: e.target.value })}
                  className="pl-9 h-8 text-sm bg-white/60 border-slate-200"
                />
              </div>
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {getFilteredValues("statuses").map((status) => (
                    <div key={status} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg">
                      <input
                        type="checkbox"
                        id={`status-${status}`}
                        checked={filters.selectedStatuses.includes(status)}
                        onChange={(e) => handleCheckboxChange("selectedStatuses", status, e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`status-${status}`} className="text-sm font-medium cursor-pointer flex-1">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Chart Settings */}
        <div>
          <button
            onClick={() => toggleSection('charts')}
            className="flex items-center justify-between w-full text-slate-700 font-semibold hover:bg-slate-50 rounded-lg p-2 -m-2"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Chart Settings
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.charts ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.charts && (
            <div className="mt-3 space-y-4">
              {chartConfigs.map((config) => {
                const IconComponent = chartTypeIcons[config.type]
                return (
                  <div key={config.id} className="p-3 border border-slate-200 rounded-lg bg-white/40">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-medium">{config.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUpdateChartConfig(config.id, { visible: !config.visible })}
                        className="h-6 w-6 p-0"
                      >
                        {config.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                    </div>

                    {config.visible && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-slate-600 block mb-1">Chart Type</label>
                          <select
                            value={config.type}
                            onChange={(e) => onUpdateChartConfig(config.id, { type: e.target.value })}
                            className="w-full h-8 text-sm border border-slate-200 rounded-md px-2 bg-white"
                          >
                            <option value="line">Line Chart</option>
                            <option value="bar">Bar Chart</option>
                            <option value="doughnut">Doughnut Chart</option>
                            <option value="polarArea">Polar Area</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-slate-600">Show Legend</label>
                          <input
                            type="checkbox"
                            checked={config.showLegend}
                            onChange={(e) => onUpdateChartConfig(config.id, { showLegend: e.target.checked })}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-slate-600">Data Labels</label>
                          <input
                            type="checkbox"
                            checked={config.showDataLabels}
                            onChange={(e) => onUpdateChartConfig(config.id, { showDataLabels: e.target.checked })}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-slate-600">Animation</label>
                          <input
                            type="checkbox"
                            checked={config.animated}
                            onChange={(e) => onUpdateChartConfig(config.id, { animated: e.target.checked })}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <Button
            onClick={onApplyFilters}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
          >
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="w-full border-slate-300 hover:bg-slate-50 bg-transparent"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>
    </div>
  )
}
