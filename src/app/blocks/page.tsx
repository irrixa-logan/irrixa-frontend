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
  crop?: string
  crop_stage?: string
}

const cropTypes = ['beans', 'broccoli', 'citrus', 'almonds', 'grapes', 'unknown']
const cropStages = ['seeding', 'vegetative', 'flowering', 'fruiting', 'maturity', 'unspecified']

export default function BlocksPage() {
  const [irrigation, setIrrigation] = useState<IrrigationResult[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://irrixa-backend-2g4t.onrender.com/api/irrigation-results')
        const data = await res.json()
        setIrrigation(data)
      } catch (err) {
        console.error('Failed to fetch irrigation data', err)
      }
    }
    fetchData()
  }, [])

  const updateField = (index: number, field: keyof IrrigationResult, value: string) => {
    const newData = [...irrigation]
    newData[index][field] = value
    setIrrigation(newData)
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Irrigation Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {irrigation.map((block, i) => (
          <div key={i} className="border p-4 rounded shadow space-y-2">
            <input
              className="font-bold text-lg w-full border rounded p-1"
              value={block.block}
              onChange={(e) => updateField(i, 'block', e.target.value)}
            />
            <div>
              <label className="text-sm text-gray-600">Crop:</label>
              <select
                className="w-full border rounded p-1"
                value={block.crop || 'unknown'}
                onChange={(e) => updateField(i, 'crop', e.target.value)}
              >
                {cropTypes.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Crop Stage:</label>
              <select
                className="w-full border rounded p-1"
                value={block.crop_stage || 'unspecified'}
                onChange={(e) => updateField(i, 'crop_stage', e.target.value)}
              >
                {cropStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
            <p><strong>ETc:</strong> {block.etc} mm</p>
            <p><strong>Rain:</strong> {block.rain_mm} mm</p>
            <p><strong>Irrigation:</strong> {block.irrigation_mm} mm</p>
            <p><strong>Confidence:</strong> {block.confidence_score}%</p>
            <p><strong>Stress:</strong> {block.stress_flag ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
