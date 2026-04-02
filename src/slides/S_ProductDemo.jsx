import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const EASING = [0.22, 1, 0.36, 1]

const PHONE_W = 312
const PHONE_H = 624
const GAP = 32

const brands = [
  {
    name: 'Therabody',
    color: '#DDD3F0',
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
    color: '#5B7AFF',
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
    color: '#00D9A3',
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
        <span className="text-xs text-white/35">{label}</span>
        <span className="text-xs font-semibold text-white/50">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
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
  // Bell curve centered at median, range roughly -5% to +25%
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
        <span className="text-xs text-white/35">Estimated CVR Uplift</span>
        <span className="text-xs font-semibold text-white/50">+{medianUplift}% median</span>
      </div>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#distGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
        {/* Curve line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: EASING, delay: delay + 0.2 }}
        />
        {/* Zero line */}
        <line x1={zeroSvgX} y1="4" x2={zeroSvgX} y2={h - 14} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
        {/* Median line */}
        <motion.line
          x1={medianSvgX} y1="4" x2={medianSvgX} y2={h - 14}
          stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6, duration: 0.3 }}
        />
        {/* X-axis line */}
        <line x1="0" y1={h - 14} x2={w} y2={h - 14} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        {/* Median label on x-axis */}
        <motion.text
          x={medianSvgX} y={h - 2}
          textAnchor="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize="9"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.8, duration: 0.3 }}
        >
          +{medianUplift}%
        </motion.text>
        {/* 0% label on x-axis */}
        <text x={zeroSvgX} y={h - 2} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="8">0%</text>
        <defs>
          <linearGradient id="distGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

function HypothesisCard({ hypothesis, color, metrics }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASING, delay: 0.5 }}
      className="w-[320px] flex-shrink-0 rounded-2xl p-6 flex flex-col gap-5 self-stretch"
      style={{
        background: 'rgba(26,26,38,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, opacity: 0.6 }} />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Data Trigger</span>
        </div>
        <p className="text-base text-white/50 leading-relaxed">{hypothesis.trigger}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Insight</span>
        </div>
        <p className="text-base text-white/60 leading-relaxed font-medium">{hypothesis.insight}</p>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-bright/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Hypothesis</span>
        </div>
        <p className="text-base text-white/50 leading-relaxed">{hypothesis.action}</p>
      </div>

      {/* Metric bars */}
      <div className="space-y-6 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
        <MetricBar label="Probability of Success" value={metrics.probability} color="rgba(255,255,255,0.35)" delay={0.7} />
        <MetricBar label="Traffic Affected" value={metrics.traffic} color="rgba(255,255,255,0.25)" delay={0.85} />
        <GainDistribution medianUplift={metrics.medianUplift} delay={1.0} />
      </div>
    </motion.div>
  )
}

function PhoneSet({ images }) {
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
          <div
            className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl"
            style={{ width: PHONE_W, height: PHONE_H, background: '#1A1A26' }}
          >
            <img src={images[1]} alt="Variant 1" className="w-full h-full object-cover object-top" />
          </div>
          <span className="text-sm font-medium tracking-wider text-white/80">Version 0</span>
        </motion.div>
      )}

      <motion.div
        className="relative flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASING }}
      >
        <div
          className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl"
          style={{ width: PHONE_W, height: PHONE_H, background: '#1A1A26' }}
        >
          <img src={images[0]} alt="Control" className="w-full h-full object-cover object-top" />
        </div>
        <span className="text-sm font-medium tracking-wider text-white/80">
          {hasVariants ? 'Version 1' : 'Live Experience'}
        </span>
      </motion.div>

      {hasVariants && (
        <motion.div
          className="absolute flex flex-col items-center gap-2"
          initial={{ opacity: 0, x: 0, scale: 0.95 }}
          animate={{ opacity: 1, x: (PHONE_W + GAP), scale: 1 }}
          transition={{ duration: 0.9, ease: EASING, delay: 0.4 }}
        >
          <div
            className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl"
            style={{ width: PHONE_W, height: PHONE_H, background: '#1A1A26' }}
          >
            <img src={hasThree ? images[2] : images[1]} alt="Variant 2" className="w-full h-full object-cover object-top" />
          </div>
          <span className="text-sm font-medium tracking-wider text-white/80">Version 2</span>

        </motion.div>
      )}
    </div>
  )
}

export default function S_ProductDemo() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = brands[activeIdx]

  return (
    <div className="w-full h-full relative flex flex-col px-12 py-8">
      <span className="absolute top-8 right-10 text-base font-semibold tracking-tight text-white/20 z-20">Variant</span>
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-left leading-tight mb-2"
      >
        Launch brand-aligned experiments{' '}
        <span className="font-instrument italic font-normal tracking-normal text-lavender">
          in a click.
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-2xl text-text-secondary/40 mb-3"
      >
        Variant identifies and builds high-impact experiments — ready to launch in one click
      </motion.p>

      {/* Toggle buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASING, delay: 0.3 }}
        className="flex gap-2 mb-4"
      >
        {brands.map((b, i) => (
          <button
            key={b.name}
            onClick={(e) => { e.stopPropagation(); setActiveIdx(i) }}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: activeIdx === i ? `${b.color}12` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${activeIdx === i ? `${b.color}30` : 'rgba(255,255,255,0.06)'}`,
              color: activeIdx === i ? b.color : 'rgba(255,255,255,0.3)',
            }}
          >
            {b.name}
          </button>
        ))}
      </motion.div>

      {/* Content: Hypothesis card + Phone display */}
      <div className="flex-1 flex items-center gap-6 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-6 w-full"
          >
            <HypothesisCard hypothesis={active.hypothesis} color={active.color} metrics={active.metrics} />
            <div className="flex-1">
              <PhoneSet images={active.images} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
