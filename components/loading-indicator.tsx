"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Activity } from "lucide-react"

export function LoadingIndicator() {
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-blue-100">
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
          </div>
          <div className="p-3 rounded-full bg-purple-100">
            <Activity className="h-6 w-6 text-purple-600 animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">Processing Data</h3>
        <p className="text-slate-600 mb-6">Applying filters and generating insights...</p>

        <div className="max-w-md mx-auto">
          <Progress value={75} className="h-2 bg-slate-200" />
          <p className="text-sm text-slate-500 mt-2">Almost there...</p>
        </div>
      </CardContent>
    </Card>
  )
}
