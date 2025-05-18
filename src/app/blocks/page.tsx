'use client'
import { useEffect, useState } from 'react'

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

  const updateField = (index: number, field: keyof IrrigationResult, value: string) => {
    const newData = [...irrigation]
    // Convert value to correct type if needed
    if (field === 'confidence_score' || field === 'etc' || field === 'rain_mm' || field === 'irrigation_mm') {
      // @ts-ignore
      newData[index][field] = parseFloat(value)
    } else if (field === 'stress_flag') {
      // @ts-ignore
      newData[index][field] = value === 'true'
    } else {
      // @ts-ignore
      newData[index][field] = value
    }
    setIrrigation(newData)
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Irrigation Results</h1>
      {irrigation.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {irrigation.map((block, i) => (
            <div key={i} className="border p-4 rounded shadow space-y-2">
              <label className="block font-semibold">Block Name</label>
              <input
                className="border p-2 w-full"
                value={block.block}
                onChange={(e) => updateField(i, 'block', e.target.value)}
              />
              <div><strong>ETc:</strong> {block.etc} mm</div>
              <div><strong>Rain:</strong> {block.rain_mm} mm</div>
              <div><strong>Irrigation:</strong> {block.irrigation_mm} mm</div>
              <div><strong>Confidence:</strong> {block.confidence_score}%</div>
              <div><strong>Stress:</strong> {block.stress_flag ? 'Yes' : 'No'}</div>

              <label className="block font-semibold">Crop</label>
              <select
                className="border p-2 w-full"
                value={block.crop || ''}
                onChange={(e) => updateField(i, 'crop', e.target.value)}
              >
                <option value="">Select crop</option>
                <option value="green beans">Green Beans</option>
                <option value="broccoli">Broccoli</option>
                <option value="citrus">Citrus</option>
                <option value="almonds">Almonds</option>
                <option value="grapes">Grapes</option>
              </select>

              <label className="block font-semibold">Crop Stage</label>
              <select
                className="border p-2 w-full"
                value={block.crop_stage || ''}
                onChange={(e) => updateField(i, 'crop_stage', e.target.value)}
              >
                <option value="">Select stage</option>
                <option value="emergence">Emergence</option>
                <option value="flowering">Flowering</option>
                <option value="pod fill">Pod Fill</option>
                <option value="maturity">Maturity</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading irrigation data...</p>
      )}
    </main>
  )
}
