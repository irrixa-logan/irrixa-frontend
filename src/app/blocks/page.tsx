'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type IrrigationResult = {
  block: string
  etc: number
  rain_mm: number
  irrigation_mm: number
  confidence_score: number
  stress_flag: boolean
}

export default function BlocksPage() {
  const [irrigation, setIrrigation] = useState<IrrigationResult | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://irrixa-backend-2g4t.onrender.com/api/irrigation-results")
        const data = await res.json()
        setIrrigation(data)
      } catch (err) {
        console.error("Failed to fetch irrigation data", err)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Irrigation Results</h1>
      {irrigation ? (
        <div className="border p-4 rounded shadow max-w-md">
          <p><strong>Block:</strong> {irrigation.block}</p>
          <p><strong>ETc:</strong> {irrigation.etc} mm</p>
          <p><strong>Rain:</strong> {irrigation.rain_mm} mm</p>
          <p><strong>Irrigation:</strong> {irrigation.irrigation_mm} mm</p>
          <p><strong>Confidence:</strong> {irrigation.confidence_score}%</p>
          <p><strong>Stress:</strong> {irrigation.stress_flag ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading irrigation data...</p>
      )}
    </main>
  )
}
