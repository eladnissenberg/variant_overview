import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

export function EmailGate({ onAccess }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error('Failed')
    } catch {
      // Still grant access even if notification fails — don't block the viewer
    }

    setLoading(false)
    onAccess(email)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: '#0A0A0F' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING }}
        className="flex flex-col items-center text-center px-6 max-w-md w-full"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3"
        >
          Variant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-white/30 mb-10"
        >
          Enter your email to view the deck
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full space-y-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoFocus
            className="w-full px-5 py-3.5 rounded-xl text-base text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-white/20"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />

          {error && (
            <p className="text-sm text-red-400/70">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-300"
            style={{
              background: loading ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)',
              color: loading ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {loading ? 'Loading...' : 'View Deck'}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs text-white/15 mt-8"
        >
          Your email is only used to notify our team
        </motion.p>
      </motion.div>
    </div>
  )
}
