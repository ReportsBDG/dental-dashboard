"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, Users, Filter } from "lucide-react"

interface DataTableProps {
  data: Array<{
    patient: string
    office: string
    carrier: string
    paidAmount: number
    claimStatus: string
    timestamp: string
  }>
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function DataTable({ data, searchTerm, onSearchChange }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  // Filtrar datos por búsqueda
  const filteredData = data.filter(
    (item) =>
      (item.patient && item.patient.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.office && item.office.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.carrier && item.carrier.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Función para exportar CSV
  const exportToCSV = () => {
    const headers = ["Patient", "Office", "Carrier", "Paid Amount", "Status", "Date"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((item) =>
        [
          `"${item.patient || ""}"`,
          `"${item.office || ""}"`,
          `"${item.carrier || ""}"`,
          (item.paidAmount || 0).toFixed(2),
          `"${item.claimStatus || ""}"`,
          item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dental_analytics_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { color: string; bg: string } } = {
      Balance: { color: "text-red-700", bg: "bg-red-100 border-red-200" },
      None: { color: "text-gray-700", bg: "bg-gray-100 border-gray-200" },
      Overpayment: { color: "text-green-700", bg: "bg-green-100 border-green-200" },
      Credit: { color: "text-blue-700", bg: "bg-blue-100 border-blue-200" },
    }

    const config = statusConfig[status] || statusConfig["None"]

    return (
      <Badge variant="outline" className={`${config.bg} ${config.color} border font-semibold`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${config.color.replace("text-", "bg-")}`} />
        {status}
      </Badge>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">Patient Records</CardTitle>
              <p className="text-slate-600 mt-1">Complete view of {filteredData.length} records</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-lg font-bold text-blue-700">
                  {
                    data.filter(
                      (item) => item.timestamp && new Date(item.timestamp).toDateString() === new Date().toDateString(),
                    ).length
                  }
                </div>
                <div className="text-xs font-medium text-blue-600">Today</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-green-50 border border-green-200">
                <div className="text-lg font-bold text-green-700">
                  {
                    data.filter(
                      (item) =>
                        item.timestamp && new Date(item.timestamp) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    ).length
                  }
                </div>
                <div className="text-xs font-medium text-green-600">Week</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-purple-50 border border-purple-200">
                <div className="text-lg font-bold text-purple-700">
                  {
                    data.filter(
                      (item) =>
                        item.timestamp && new Date(item.timestamp) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    ).length
                  }
                </div>
                <div className="text-xs font-medium text-purple-600">Month</div>
              </div>
            </div>

            <Button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search patients, offices, carriers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/60 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => onSearchChange("")}
            >
              <Filter className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[600px] rounded-lg border border-slate-200 bg-white/40">
          <Table>
            <TableHeader className="sticky top-0 bg-gradient-to-r from-slate-50 to-slate-100 z-10">
              <TableRow className="border-slate-200">
                <TableHead className="font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Patient
                  </div>
                </TableHead>
                <TableHead className="font-bold text-slate-700">Office</TableHead>
                <TableHead className="font-bold text-slate-700">Carrier</TableHead>
                <TableHead className="font-bold text-slate-700 text-right">Amount</TableHead>
                <TableHead className="font-bold text-slate-700">Status</TableHead>
                <TableHead className="font-bold text-slate-700">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 border-slate-100"
                >
                  <TableCell className="font-semibold text-slate-800">{item.patient || "N/A"}</TableCell>
                  <TableCell className="text-slate-600">{item.office || "N/A"}</TableCell>
                  <TableCell className="text-slate-600">{item.carrier || "N/A"}</TableCell>
                  <TableCell className="text-right font-bold text-slate-800">
                    ${(item.paidAmount || 0).toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.claimStatus || "None")}</TableCell>
                  <TableCell className="text-slate-600">
                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} results
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-slate-300"
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? "bg-blue-600 text-white" : "border-slate-300"}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-slate-300"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
