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
  const [irrigation, setIrrigation] = useState<IrrigationResult[]>([])


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


  <main className="p-6">
  <h1 className="text-3xl font-bold mb-4">Irrigation Results</h1>
  {irrigation.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {irrigation.map((block, i) => (
        <div key={i} className="border p-4 rounded shadow">
          <p><strong>Block:</strong> {block.block}</p>
          <p><strong>ETc:</strong> {block.etc} mm</p>
          <p><strong>Rain:</strong> {block.rain_mm} mm</p>
          <p><strong>Irrigation:</strong> {block.irrigation_mm} mm</p>
          <p><strong>Confidence:</strong> {block.confidence_score}%</p>
          <p><strong>Stress:</strong> {block.stress_flag ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>Loading irrigation data...</p>
  )}
</main>
