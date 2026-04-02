import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EASING = [0.22, 1, 0.36, 1]

const steps = [
  {
    num: '1',
    title: 'Find What\'s Costing You Sales',
    desc: 'Analyzes visitor behavior across your storefront to surface the exact pages, layouts, and flows that are losing you revenue.',
    color: '#DDD3F0',
    annotations: [
      'Detects patterns that humans often overlook',
      'Prioritize changes based on impact',
    ],
  },
  {
    num: '2',
    title: 'Track Competitors for Proven Ideas',
    desc: 'Indexes hundreds of high-performing websites across industries. Generate test ideas based on what top brands in your category are doing.',
    color: '#5B7AFF',
    annotations: [
      'Identifies proven patterns across top-performing stores',
      'Extracts winning patterns from category leaders',
    ],
  },
  {
    num: '3',
    title: 'Automate Testing',
    desc: 'Insights are turned into revenue-generating tests for you. Get peace of mind knowing that your site is always improving.',
    color: '#00D9A3',
    annotations: [
      'Automatically tests changes across your storefront',
      'Track revenue uplift in real time',
    ],
  },
]

function ProductCard({ step, index, isActive }) {
  const yOffset = index * 18
  const scale = 1 - index * 0.03
  const zIndex = 3 - index

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isActive ? 1 : 0.3 + (0.2 * (2 - index)),
        y: yOffset,
        scale,
      }}
      transition={{ duration: 0.6, ease: EASING, delay: 0.5 + index * 0.15 }}
      className="absolute w-full"
      style={{ zIndex, top: 0 }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(26,26,38,0.8)',
          border: `1px solid ${step.color}${isActive ? '30' : '10'}`,
          boxShadow: isActive ? `0 8px 40px ${step.color}15` : 'none',
          transition: 'border-color 0.5s, box-shadow 0.5s',
        }}
      >
        {/* Card content — mock UI */}
        <div className="px-5 py-4">
          {/* Top bar */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: step.color, opacity: 0.6 }} />
            <div className="h-2 rounded-full bg-white/5" style={{ width: '40%' }} />
            <div className="ml-auto h-2 w-12 rounded-full bg-white/5" />
          </div>
          {/* Mock chart/data area */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1 space-y-2">
              <div className="h-16 rounded-lg bg-white/[0.03]" />
              <div className="flex gap-2">
                <div className="h-8 flex-1 rounded bg-white/[0.02]" />
                <div className="h-8 flex-1 rounded bg-white/[0.02]" />
              </div>
            </div>
            <div className="w-24 space-y-2">
              <div className="h-6 rounded bg-white/[0.03]" />
              <div className="h-6 rounded bg-white/[0.03]" />
              <div className="h-6 rounded bg-white/[0.03]" />
              <div className="h-6 rounded" style={{ background: `${step.color}08` }} />
            </div>
          </div>
          {/* Bottom row */}
          <div className="flex gap-2">
            <div className="h-3 rounded-full bg-white/[0.04]" style={{ width: '30%' }} />
            <div className="h-3 rounded-full bg-white/[0.03]" style={{ width: '20%' }} />
          </div>
        </div>

        {/* Annotation lines — left and right */}
        {isActive && (
          <>
            {/* Left annotation */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -left-[10px] top-[30%] flex items-center gap-2"
              style={{ transform: 'translateX(-100%)' }}
            >
              <span className="text-[11px] text-white/30 leading-tight text-right max-w-[140px]">
                {step.annotations[0]}
              </span>
              <svg width="24" height="2" viewBox="0 0 24 2">
                <line x1="0" y1="1" x2="24" y2="1" stroke={step.color} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </motion.div>

            {/* Right annotation */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -right-[10px] top-[60%] flex items-center gap-2"
              style={{ transform: 'translateX(100%)' }}
            >
              <svg width="24" height="2" viewBox="0 0 24 2">
                <line x1="0" y1="1" x2="24" y2="1" stroke={step.color} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="text-[11px] text-white/30 leading-tight max-w-[140px]">
                {step.annotations[1]}
              </span>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default function A04_System() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex px-20 py-14">
      {/* Left — Text content */}
      <div className="w-[45%] flex flex-col justify-center pr-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 text-lavender"
        >
          How it works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASING, delay: 0.15 }}
          className="text-3xl lg:text-4xl font-semibold text-white leading-tight mb-12"
        >
          The system that improves your store{' '}
          <span className="font-instrument italic font-normal tracking-normal text-lavender">
            automatically.
          </span>
        </motion.h2>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASING, delay: 0.3 + i * 0.12 }}
              className="flex gap-4 cursor-pointer group"
              onClick={() => setActiveStep(i)}
            >
              {/* Number */}
              <div
                className="w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 transition-all duration-500"
                style={{
                  borderColor: activeStep === i ? step.color : 'rgba(255,255,255,0.08)',
                  color: activeStep === i ? step.color : 'rgba(255,255,255,0.2)',
                  background: activeStep === i ? `${step.color}08` : 'transparent',
                }}
              >
                {step.num}
              </div>

              <div>
                <h3
                  className="text-base font-semibold leading-snug transition-colors duration-500"
                  style={{ color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.35)' }}
                >
                  {step.title}
                </h3>
                <motion.p
                  animate={{
                    height: activeStep === i ? 'auto' : 0,
                    opacity: activeStep === i ? 1 : 0,
                    marginTop: activeStep === i ? 6 : 0,
                  }}
                  transition={{ duration: 0.4, ease: EASING }}
                  className="text-sm text-text-secondary/50 leading-relaxed overflow-hidden"
                >
                  {step.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right — Stacked product cards */}
      <div className="w-[55%] flex items-center justify-center">
        <div className="relative w-full max-w-[480px]" style={{ height: 280 }}>
          {/* Reorder: active card on top */}
          {[...steps].map((step, i) => {
            // Calculate display order: active=0 (top), then next, then prev
            const order = (i - activeStep + 3) % 3
            return (
              <ProductCard
                key={step.num}
                step={step}
                index={order}
                isActive={order === 0}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
