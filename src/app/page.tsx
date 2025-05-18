'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setMessage(error ? error.message : 'Check your email to confirm.')
    setLoading(false)
  }

  const signIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      router.push('/blocks')
    }
    setLoading(false)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Irrixa Login</h1>
      <input className="border p-2 mb-2 w-full max-w-sm" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 mb-2 w-full max-w-sm" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <div className="flex gap-4">
        <button onClick={signIn} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button onClick={signUp} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </main>
  )
}
