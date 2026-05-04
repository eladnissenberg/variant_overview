import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useViewport } from '../hooks/useViewport'

const EASING = [0.22, 1, 0.36, 1]

const brands = [
  {
    name: 'Therabody',
    images: [
      '/images/therabody-variantB.png',
      '/images/therabody-variantA.png',
      '/images/therabody-original.png',
    ],
    hypothesis: {
      trigger: '32% of users reach the comparison chart and 21% dwell on it for 5+ seconds, but only 0.3% convert afterward.',
      insight: 'The chart may be creating decision friction.',
      action: 'Simplify the comparison and highlight the recommended product to reduce cognitive load, make the choice clearer, and increase conversion rate.',
    },
    metrics: {
      probability: 78,
      traffic: 64,
      medianUplift: 12.4,
    },
  },
  {
    name: 'Terra Kaffe',
    images: [
      '/images/terrakaffe-original.png',
      '/images/terrakaffe-variantA.png',
      '/images/terrakaffe-variantB.png',
    ],
    hypothesis: {
      trigger: '16.8% of users interact with the navigation menu, but key categories are buried and hard to find.',
      insight: 'Poor menu structure is creating friction in product discovery.',
      action: 'Improve the visibility and structure of key categories in the menu to help visitors quickly find relevant products, reach product pages, and convert.',
    },
    metrics: {
      probability: 72,
      traffic: 81,
      medianUplift: 8.7,
    },
  },
  {
    name: 'DermStreet',
    images: [
      '/images/dermstreet-v1.png',
      '/images/dermstreet-v2.png',
      '/images/dermstreet-v0.png',
    ],
    hypothesis: {
      trigger: '68% of users drop off before reaching purchase options. Across comparable skincare brands, stores that pair visual shade selectors with inline bundle CTAs convert 31% better.',
      insight: 'Current layout buries bundle options and relies on text-only shade selection.',
      action: 'Pair visual shade selectors with inline bundle CTAs to match top-performing skincare benchmarks and reduce drop-off.',
    },
    metrics: {
      probability: 83,
      traffic: 55,
      medianUplift: 15.2,
    },
  },
]

function MetricBar({ label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className="space-y-1"
    >
      <div className="flex justify-between">
        <span className="text-xs text-cream/40">{label}</span>
        <span className="text-xs font-semibold text-cream/70">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-cream/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: EASING, delay: delay + 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  )
}

function GainDistribution({ medianUplift, delay }) {
  const w = 260
  const h = 48
  const points = 50
  const mean = medianUplift
  const sigma = mean * 0.4
  const minX = -5
  const maxX = mean * 2 + 5

  const pathPoints = []
  let maxY = 0
  for (let i = 0; i <= points; i++) {
    const x = minX + (maxX - minX) * (i / points)
    const y = Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2))
    if (y > maxY) maxY = y
    pathPoints.push({ x, y })
  }

  const toSvgX = (x) => ((x - minX) / (maxX - minX)) * w
  const toSvgY = (y) => h - 14 - (y / maxY) * (h - 22)

  const linePath = pathPoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${toSvgX(p.x).toFixed(1)} ${toSvgY(p.y).toFixed(1)}`
  ).join(' ')

  const areaPath = linePath + ` L ${toSvgX(pathPoints[points].x).toFixed(1)} ${h - 14} L ${toSvgX(pathPoints[0].x).toFixed(1)} ${h - 14} Z`

  const medianSvgX = toSvgX(mean)
  const zeroSvgX = toSvgX(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-1"
    >
      <div className="flex justify-between">
        <span className="text-xs text-cream/40">Estimated CVR Uplift</span>
        <span className="text-xs font-semibold text-cream/70">+{medianUplift}% median</span>
      </div>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
        <motion.path d={areaPath} fill="url(#distGrad)" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.8, delay: delay + 0.3 }} />
        <motion.path d={linePath} fill="none" stroke="rgba(250,250,242,0.4)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASING, delay: delay + 0.2 }} />
        <line x1={zeroSvgX} y1="4" x2={zeroSvgX} y2={h - 14} stroke="rgba(250,250,242,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
        <motion.line x1={medianSvgX} y1="4" x2={medianSvgX} y2={h - 14} stroke="#0F9568" strokeOpacity="0.8" strokeWidth="1" strokeDasharray="3 3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.6, duration: 0.3 }} />
        <line x1="0" y1={h - 14} x2={w} y2={h - 14} stroke="rgba(250,250,242,0.06)" strokeWidth="0.5" />
        <motion.text x={medianSvgX} y={h - 2} textAnchor="middle" fill="#0F9568" fontSize="9" fontWeight="600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.8, duration: 0.3 }}>+{medianUplift}%</motion.text>
        <text x={zeroSvgX} y={h - 2} textAnchor="middle" fill="rgba(250,250,242,0.2)" fontSize="8">0%</text>
        <defs>
          <linearGradient id="distGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F9568" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0F9568" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

function HypothesisCard({ hypothesis, metrics }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASING, delay: 0.5 }}
      className="w-full md:w-[320px] flex-shrink-0 rounded p-4 md:p-6 flex flex-col gap-3 md:gap-5 md:self-stretch"
      style={{
        background: 'rgba(15, 149, 104, 0.08)',
        border: '1px solid #0F9568',
        boxShadow: 'inset 0 0 0 3px #061D15',
      }}
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald/70" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/40">Data Trigger</span>
        </div>
        <p className="text-sm md:text-base text-cream/60 leading-relaxed">{hypothesis.trigger}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald/70" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/40">Insight</span>
        </div>
        <p className="text-sm md:text-base text-cream/80 leading-relaxed font-medium">{hypothesis.insight}</p>
      </div>

      <div style={{ borderTop: '1px solid rgba(250,250,242,0.06)', paddingTop: '12px' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald/70" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/40">Hypothesis</span>
        </div>
        <p className="text-sm md:text-base text-cream/60 leading-relaxed">{hypothesis.action}</p>
      </div>

      <div className="hidden md:block space-y-6 mt-auto" style={{ borderTop: '1px solid rgba(250,250,242,0.06)', paddingTop: '16px' }}>
        <MetricBar label="Probability of Success" value={metrics.probability} color="rgba(15,149,104,0.7)" delay={0.7} />
        <MetricBar label="Traffic Affected" value={metrics.traffic} color="rgba(15,149,104,0.45)" delay={0.85} />
        <GainDistribution medianUplift={metrics.medianUplift} delay={1.0} />
      </div>
    </motion.div>
  )
}

/* Desktop: 3-phone fan-out */
function PhoneSetDesktop({ images }) {
  const PHONE_W = 312
  const PHONE_H = 624
  const GAP = 32
  const hasVariants = images.length > 1
  const hasThree = images.length > 2

  return (
    <div className="relative flex items-end justify-center" style={{ height: PHONE_H + 30, width: '100%' }}>
      {hasVariants && (
        <motion.div
          className="absolute flex flex-col items-center gap-2"
          initial={{ opacity: 0, x: 0, scale: 0.95 }}
          animate={{ opacity: 1, x: -(PHONE_W + GAP), scale: 1 }}
          transition={{ duration: 0.9, ease: EASING, delay: 0.4 }}
        >
          <div className="rounded-[20px] overflow-hidden border border-cream/10 shadow-2xl" style={{ width: PHONE_W, height: PHONE_H, background: '#061D15' }}>
            <img src={images[1]} alt="Version 0" className="w-full h-full object-cover object-top" />
          </div>
          <span className="text-sm font-medium tracking-wider text-cream/70">Version 0</span>
        </motion.div>
      )}
      <motion.div
        className="relative flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASING }}
      >
        <div className="rounded-[20px] overflow-hidden border border-cream/15 shadow-2xl" style={{ width: PHONE_W, height: PHONE_H, background: '#061D15' }}>
          <img src={images[0]} alt="Version 1" className="w-full h-full object-cover object-top" />
        </div>
        <span className="text-sm font-medium tracking-wider text-cream/85">{hasVariants ? 'Version 1' : 'Live Experience'}</span>
      </motion.div>
      {hasVariants && (
        <motion.div
          className="absolute flex flex-col items-center gap-2"
          initial={{ opacity: 0, x: 0, scale: 0.95 }}
          animate={{ opacity: 1, x: (PHONE_W + GAP), scale: 1 }}
          transition={{ duration: 0.9, ease: EASING, delay: 0.4 }}
        >
          <div className="rounded-[20px] overflow-hidden border border-cream/10 shadow-2xl" style={{ width: PHONE_W, height: PHONE_H, background: '#061D15' }}>
            <img src={hasThree ? images[2] : images[1]} alt="Version 2" className="w-full h-full object-cover object-top" />
          </div>
          <span className="text-sm font-medium tracking-wider text-cream/70">Version 2</span>
        </motion.div>
      )}
    </div>
  )
}

/* Mobile: horizontal scroll carousel */
function PhoneSetMobile({ images, viewportWidth, hypothesis }) {
  const [activePhone, setActivePhone] = useState(0)
  const phoneW = Math.min(viewportWidth - 64, 200)
  const phoneH = phoneW * 1.8

  const imageOrder = images.length > 1 ? [1, 0, 2] : [0]
  const labels = images.length > 1
    ? ['Version 0', 'Version 1', 'Version 2']
    : ['Live Experience']

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft
    const itemWidth = phoneW + 12
    const idx = Math.round(scrollLeft / itemWidth)
    setActivePhone(Math.min(idx, labels.length - 1))
  }

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <div
        data-phone-scroll
        className="w-full overflow-x-auto flex gap-3 snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
        onScroll={handleScroll}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {imageOrder.map((imgIdx, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-center flex flex-col items-center gap-1.5"
            style={{ width: phoneW }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-[14px] overflow-hidden border border-cream/10 shadow-xl"
              style={{ width: phoneW, height: phoneH, background: '#061D15' }}
            >
              <img
                src={images[imgIdx]}
                alt={labels[i]}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="text-[10px] font-medium tracking-wider text-cream/60">{labels[i]}</span>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="flex gap-1.5">
          {labels.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === activePhone ? 'rgba(250,250,242,0.7)' : 'rgba(250,250,242,0.18)',
              }}
            />
          ))}
        </div>
      )}

      <div className="mt-2 rounded px-3 py-1.5 w-full overflow-hidden" style={{ background: 'rgba(250,250,242,0.04)', border: '1px solid rgba(250,250,242,0.08)' }}>
        <p className="text-[10px] text-cream/55 text-center leading-snug line-clamp-2">
          <span className="text-cream/75 font-medium">Trigger:</span> {hypothesis.insight}
        </p>
      </div>
    </div>
  )
}

export default function S_ProductDemo() {
  const [activeIdx, setActiveIdx] = useState(0)
  const { width, isMobile } = useViewport()
  const active = brands[activeIdx]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        if (activeIdx < brands.length - 1) {
          e.preventDefault()
          e.stopPropagation()
          setActiveIdx((prev) => prev + 1)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [activeIdx])

  return (
    <div
      className="w-full h-full relative flex flex-col px-6 py-4 md:px-12 md:py-8"
      onClick={(e) => {
        if (!e.target.closest('button') && !e.target.closest('[data-phone-scroll]')) {
          e.stopPropagation()
          setActiveIdx((prev) => (prev + 1) % brands.length)
        }
      }}
    >
      <span className="hidden md:block absolute md:top-8 md:right-10 text-base font-semibold tracking-tight text-cream/20 z-20">Variant</span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
        className="text-lg sm:text-xl md:text-4xl lg:text-5xl font-semibold text-cream tracking-tight leading-tight mb-2 md:mb-2"
      >
        Launch brand-aligned experiments{' '}
        <span className="text-emerald">in a click.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="hidden md:block text-2xl text-cream/50 mb-3"
      >
        Variant identifies and builds high-impact experiments — ready to launch in one click
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASING, delay: 0.3 }}
        className="hidden md:flex flex-wrap gap-2 mb-4 justify-start"
      >
        {brands.map((b, i) => (
          <button
            key={b.name}
            onClick={(e) => { e.stopPropagation(); setActiveIdx(i) }}
            className="px-4 py-2 rounded text-sm font-medium transition-all duration-300"
            style={{
              background: activeIdx === i ? 'rgba(15, 149, 104, 0.12)' : 'rgba(250, 250, 242, 0.04)',
              border: `1px solid ${activeIdx === i ? '#0F9568' : 'rgba(250, 250, 242, 0.08)'}`,
              color: activeIdx === i ? '#FAFAF2' : 'rgba(250, 250, 242, 0.4)',
            }}
          >
            {b.name}
          </button>
        ))}
      </motion.div>

      <div className="flex-1 flex flex-col items-center min-h-0">
        <div className="flex md:hidden flex-wrap gap-1.5 mb-2 justify-center">
          {brands.map((b, i) => (
            <button
              key={b.name}
              onClick={(e) => { e.stopPropagation(); setActiveIdx(i) }}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all duration-300"
              style={{
                background: activeIdx === i ? 'rgba(15, 149, 104, 0.12)' : 'rgba(250, 250, 242, 0.04)',
                border: `1px solid ${activeIdx === i ? '#0F9568' : 'rgba(250, 250, 242, 0.08)'}`,
                color: activeIdx === i ? '#FAFAF2' : 'rgba(250, 250, 242, 0.4)',
              }}
            >
              {b.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full h-full"
          >
            {!isMobile && <HypothesisCard hypothesis={active.hypothesis} metrics={active.metrics} />}
            <div className="flex-1 flex items-center justify-center">
              {isMobile ? (
                <PhoneSetMobile images={active.images} viewportWidth={width} hypothesis={active.hypothesis} />
              ) : (
                <PhoneSetDesktop images={active.images} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
