import { useState, useEffect, useRef, useMemo } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate as fmAnimate,
} from 'framer-motion'
import { GridCell } from '../components/GridCell'

const EASING = [0.22, 1, 0.36, 1]
const EMERALD = '#0F9568'
const ACCENT_MUTED = 'rgb(74, 141, 131)'
const NODE_INK = 'rgb(4, 18, 18)'
const NODE_STROKE = 'rgb(168, 168, 168)'
const CARD_BG = 'rgb(5, 27, 21)'
const FONT_STACK = 'Manrope, system-ui, sans-serif'

const steps = [
  {
    num: '01',
    eyebrow: 'DETECT USER SEGMENTS',
    headline: 'Understand each visitor in real time',
    body: 'Create and optimize users segments based on ads, behavior and intent.',
    label: ['Detect & optimize', 'segments'],
    subtitle: ['Cluster users around personas,', 'motivations and lifecycle stage.'],
  },
  {
    num: '02',
    eyebrow: 'ANALYZE BUYER JOURNEY',
    headline: 'Detect opportunities and drop-offs',
    body: 'Analyze each journey to understand where users dropped off, and where growth opportunities were missed.',
    label: ['Analyze journey'],
    subtitle: ['AI finds high-impact growth', "opportunities in each segment's journey."],
  },
  {
    num: '03',
    eyebrow: 'GENERATE CONVERTING RECOMMENDATIONS',
    headline: 'Generate brand-aligned experiences per segment',
    body: 'Pre-build brand-aligned experiences for each segment to adapt product offering, merchandising, copy, imagery and navigation.',
    label: ['Ship personalized', 'recommendations'],
    subtitle: ['Tailor merchandising, copy and flows', 'to each visitor in real time.'],
  },
  {
    num: '04',
    eyebrow: 'MEASURE IMPACT & COMPOUND LEARNINGS',
    headline: 'Measure performance, track successes and failures',
    body: "Every experiment shipped is tracked and analyzed. Insights are logged in your brand's memory layer.",
    label: ['Measure & compound'],
    subtitle: ['Outcomes feed the loop. Winning patterns', 'scale, failures retire.'],
  },
]

const STEP_TAGS = ['DETECT', 'ANALYZE', 'GENERATE', 'MEASURE']
const CREAM = '#FAFAF2'

/* ──────────────────────────────────────────────────────────────────
   01 / 02 — DataViz (shared)
   One pool of ~60 dots that lives across the DETECT and ANALYZE states.
   - activeIdx 0 (Detect): dots at scattered positions across the canvas
   - activeIdx 1 (Analyze): same dots converge into 4 clusters; ring+label
     overlays fade in
   framer-motion animates cx/cy between the two layouts, so the
   transition reads as dots aggregating, not a cross-fade between
   two illustrations. Per-dot ambient drift continues on a wrapper
   <g> via SMIL animateTransform, independent of the position morph.
   ────────────────────────────────────────────────────────────────── */
/* Four compact clusters, one in each quadrant of the viewBox. Labels
   sit directly above or below their cluster so the segment name and
   its dot cloud read as a single unit. */
const DATA_CLUSTERS = [
  { cx: 55,  cy: 65,  label: 'Hesitant users',  labelX: 55,  labelY: 32  },
  { cx: 185, cy: 65,  label: 'Athletes',        labelX: 185, labelY: 32  },
  { cx: 55,  cy: 135, label: 'Price aware',     labelX: 55,  labelY: 178 },
  { cx: 185, cy: 135, label: 'Luxury seekers',  labelX: 185, labelY: 178 },
]
const DATA_DOT_COUNT = 60

function DataViz({ activeIdx }) {
  const dots = useMemo(() => {
    return Array.from({ length: DATA_DOT_COUNT }, (_, i) => {
      const r1 = Math.sin(i * 1.7 + 13) * 43758.5453
      const r2 = Math.sin(i * 2.9 + 47) * 43758.5453
      const r3 = Math.sin(i * 3.7 + 71) * 43758.5453
      const r4 = Math.sin(i * 4.3 + 89) * 43758.5453
      const r5 = Math.sin(i * 5.1 + 107) * 43758.5453
      const v1 = r1 - Math.floor(r1)
      const v2 = r2 - Math.floor(r2)
      const v3 = r3 - Math.floor(r3)
      const v4 = r4 - Math.floor(r4)
      const v5 = r5 - Math.floor(r5)

      // Scatter position — full canvas
      const scatter = {
        x: 10 + v1 * 220,
        y: 10 + v2 * 180,
      }

      // Cluster position — 15 dots per cluster, distributed in a disc.
      // Smaller disc radius keeps each cluster compact so adjacent
      // clusters can pack tightly without dots from one bleeding into
      // another's centre.
      const ci = i % 4
      const cluster = DATA_CLUSTERS[ci]
      const angle = v3 * Math.PI * 2
      const dist = Math.sqrt(v4) * 20
      const clustered = {
        x: cluster.cx + Math.cos(angle) * dist,
        y: cluster.cy + Math.sin(angle) * dist,
      }

      return {
        scatter,
        clustered,
        ci,
        brightness: 0.45 + v3 * 0.5,
        size: 1.8 + v3 * 1.0,
        focal: i === 11,
        // Ambient drift — modest amplitude. Tightened slightly so dots
        // stay clearly inside their compact cluster when grouped, and
        // still read as gentle motion when scattered.
        driftX: 1.2 + v5 * 1.3,
        driftY: 1.2 + v4 * 1.3,
        dur: 3.5 + v3 * 2.5,
        phase: v1 * 5,
      }
    })
  }, [])

  return (
    <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Cluster labels — centered above/below their cluster, fade in
          only when clustered */}
      {DATA_CLUSTERS.map((c, ci) => (
        <motion.g
          key={`cluster-${ci}`}
          initial={false}
          animate={{ opacity: activeIdx === 1 ? 1 : 0 }}
          transition={{ duration: 0.55, ease: EASING }}
        >
          <text
            x={c.labelX}
            y={c.labelY}
            textAnchor="middle"
            fontFamily={FONT_STACK}
            fontSize="8.5"
            fontWeight="600"
            fill={EMERALD}
            letterSpacing="0.14em"
          >
            {c.label}
          </text>
        </motion.g>
      ))}

      {/* Dots — same pool, position morphs between scatter and clustered */}
      {dots.map((d, i) => {
        const target = activeIdx === 1 ? d.clustered : d.scatter
        return (
          <g key={i}>
            {/* Ambient drift: continuous SMIL translate on the wrapper
                group, independent of the cx/cy morph below. */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`${-d.driftX},${-d.driftY};${d.driftX},${d.driftY};${-d.driftX},${-d.driftY}`}
              dur={`${d.dur}s`}
              begin={`-${d.phase}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
            <motion.circle
              initial={false}
              animate={{ cx: target.x, cy: target.y }}
              transition={{ duration: 0.85, ease: EASING }}
              r={d.focal ? 2.8 : d.size}
              fill={d.focal ? CREAM : EMERALD}
              opacity={d.focal ? 1 : d.brightness}
            >
              {d.focal && (
                <animate
                  attributeName="r"
                  values="2.8;3.4;2.8"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              )}
            </motion.circle>
          </g>
        )
      })}
    </svg>
  )
}


/* ──────────────────────────────────────────────────────────────────
   03 — GenerateViz
   Four wireframe "experience" mockups, each with its own LAYOUT to
   express that personalization produces different structures per
   segment — not just different text in the same template. Line
   widths breathe gently to suggest the system actively reshaping
   content in real time.
   ────────────────────────────────────────────────────────────────── */
const SPLINE = '0.42 0 0.58 1; 0.42 0 0.58 1'

/* A line whose endpoint x2 oscillates between two values (line length
   "breathes"). Used everywhere we want the wireframe to feel live. */
function FlexLine({ x1, y1, x2Min, x2Max, y2, stroke, opacity, width, dur, phase }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2Min}
      y2={y2}
      stroke={stroke}
      strokeOpacity={opacity}
      strokeWidth={width}
    >
      <animate
        attributeName="x2"
        values={`${x2Min};${x2Max};${x2Min}`}
        dur={`${dur}s`}
        begin={`-${phase}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines={SPLINE}
      />
    </line>
  )
}

function GenerateViz() {
  const CARD_W = 110
  const CARD_H = 74

  // Each card has its own layout shape so the "generated experience"
  // looks personalized per segment, not just a recolored template.
  const cards = [
    { x: 6,   y: 6,  focal: false, layout: 'hero',     tag: 'S1' },
    { x: 124, y: 6,  focal: true,  layout: 'standard', tag: 'S2' },
    { x: 6,   y: 90, focal: false, layout: 'split',    tag: 'S3' },
    { x: 124, y: 90, focal: false, layout: 'list',     tag: 'S4' },
  ]

  function HeroLayout({ x, y }) {
    return (
      <g>
        {/* Small eyebrow */}
        <rect x={x + 6} y={y + 7} width="22" height="2.5" fill={EMERALD} opacity="0.6" rx="0.5" />
        {/* Hero image block (left) */}
        <rect x={x + 6} y={y + 14} width="44" height="24" fill={EMERALD} opacity="0.16" rx="1" />
        {/* Title + body lines (right of hero) */}
        <FlexLine x1={x + 54} y1={y + 18} x2Min={x + CARD_W - 10} x2Max={x + CARD_W - 6} y2={y + 18}
          stroke={CREAM} opacity="0.35" width="1" dur="3.5" phase="1.0" />
        <FlexLine x1={x + 54} y1={y + 26} x2Min={x + CARD_W - 22} x2Max={x + CARD_W - 14} y2={y + 26}
          stroke={CREAM} opacity="0.24" width="0.85" dur="4.2" phase="2.5" />
        <FlexLine x1={x + 54} y1={y + 34} x2Min={x + CARD_W - 26} x2Max={x + CARD_W - 18} y2={y + 34}
          stroke={CREAM} opacity="0.24" width="0.85" dur="3.8" phase="0.5" />
        {/* Bottom body lines (full width) */}
        <FlexLine x1={x + 6} y1={y + 46} x2Min={x + CARD_W - 12} x2Max={x + CARD_W - 6} y2={y + 46}
          stroke={CREAM} opacity="0.2" width="0.7" dur="4.6" phase="3.2" />
        <FlexLine x1={x + 6} y1={y + 52} x2Min={x + CARD_W - 34} x2Max={x + CARD_W - 26} y2={y + 52}
          stroke={CREAM} opacity="0.2" width="0.7" dur="3.6" phase="1.8" />
        {/* Small CTA bottom-left */}
        <rect x={x + 6} y={y + CARD_H - 14} width="28" height="9" fill={EMERALD} opacity="0.85" rx="1.5" />
      </g>
    )
  }

  function StandardLayout({ x, y, focal }) {
    return (
      <g>
        {/* Bigger header (focal: cream, others: emerald) */}
        <rect x={x + 6} y={y + 8} width="60" height="3"
          fill={focal ? CREAM : EMERALD} opacity={focal ? 0.95 : 0.75} rx="0.5" />
        {/* 4 stacked body lines */}
        <FlexLine x1={x + 6} y1={y + 22} x2Min={x + CARD_W - 12} x2Max={x + CARD_W - 6} y2={y + 22}
          stroke={CREAM} opacity="0.36" width="1" dur="3.8" phase="0.8" />
        <FlexLine x1={x + 6} y1={y + 30} x2Min={x + CARD_W - 22} x2Max={x + CARD_W - 12} y2={y + 30}
          stroke={CREAM} opacity="0.26" width="0.85" dur="4.5" phase="2.1" />
        <FlexLine x1={x + 6} y1={y + 38} x2Min={x + CARD_W - 28} x2Max={x + CARD_W - 18} y2={y + 38}
          stroke={CREAM} opacity="0.26" width="0.85" dur="3.5" phase="1.5" />
        <FlexLine x1={x + 6} y1={y + 46} x2Min={x + CARD_W - 22} x2Max={x + CARD_W - 14} y2={y + 46}
          stroke={CREAM} opacity="0.22" width="0.85" dur="4.0" phase="3.0" />
        {/* Full-width CTA */}
        <rect x={x + 6} y={y + CARD_H - 16} width={CARD_W - 12} height="10"
          fill={EMERALD} opacity={focal ? 1 : 0.85} rx="1.5" />
      </g>
    )
  }

  function SplitLayout({ x, y }) {
    const colW = (CARD_W - 16) / 2
    return (
      <g>
        {/* Left: image */}
        <rect x={x + 6} y={y + 8} width={colW} height={CARD_H - 28} fill={EMERALD} opacity="0.14" rx="1" />
        {/* Right: header + lines */}
        <rect x={x + 10 + colW} y={y + 10} width="32" height="2.5" fill={EMERALD} opacity="0.7" rx="0.5" />
        <FlexLine x1={x + 10 + colW} y1={y + 20} x2Min={x + CARD_W - 10} x2Max={x + CARD_W - 6} y2={y + 20}
          stroke={CREAM} opacity="0.3" width="0.85" dur="3.6" phase="1.2" />
        <FlexLine x1={x + 10 + colW} y1={y + 26} x2Min={x + CARD_W - 14} x2Max={x + CARD_W - 8} y2={y + 26}
          stroke={CREAM} opacity="0.22" width="0.7" dur="4.2" phase="2.2" />
        <FlexLine x1={x + 10 + colW} y1={y + 32} x2Min={x + CARD_W - 22} x2Max={x + CARD_W - 16} y2={y + 32}
          stroke={CREAM} opacity="0.22" width="0.7" dur="3.7" phase="0.6" />
        {/* Price-ish badge */}
        <rect x={x + 10 + colW} y={y + 40} width="22" height="6" fill={EMERALD} opacity="0.55" rx="1" />
        {/* Full-width CTA bottom */}
        <rect x={x + 6} y={y + CARD_H - 14} width={CARD_W - 12} height="8"
          fill={EMERALD} opacity="0.85" rx="1.5" />
      </g>
    )
  }

  function ListLayout({ x, y }) {
    // Vertical accent + 4 bulleted list items + small CTA bottom-right
    const rows = [20, 28, 36, 44]
    return (
      <g>
        {/* Vertical accent bar on the left */}
        <rect x={x + 6} y={y + 8} width="2" height={CARD_H - 26} fill={EMERALD} opacity="0.7" rx="0.5" />
        {/* Header */}
        <rect x={x + 12} y={y + 8} width="38" height="3" fill={EMERALD} opacity="0.7" rx="0.5" />
        {/* List items */}
        {rows.map((row, ri) => (
          <g key={ri}>
            <circle cx={x + 14} cy={y + row + 0.5} r="1" fill={EMERALD} opacity="0.6" />
            <FlexLine
              x1={x + 18}
              y1={y + row + 0.5}
              x2Min={x + CARD_W - 8 - ri * 3}
              x2Max={x + CARD_W - 14 - ri * 3}
              y2={y + row + 0.5}
              stroke={CREAM}
              opacity={0.26 - ri * 0.02}
              width="0.85"
              dur={3.6 + ri * 0.4}
              phase={0.4 + ri * 0.7}
            />
          </g>
        ))}
        {/* Small CTA bottom-right */}
        <rect x={x + CARD_W - 34} y={y + CARD_H - 14} width="28" height="9"
          fill={EMERALD} opacity="0.85" rx="1.5" />
      </g>
    )
  }

  const LAYOUTS = { hero: HeroLayout, standard: StandardLayout, split: SplitLayout, list: ListLayout }

  return (
    <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%', display: 'block' }}>
      {cards.map((c, i) => {
        const Layout = LAYOUTS[c.layout]
        return (
          <g key={i}>
            {/* Card outline */}
            <rect
              x={c.x}
              y={c.y}
              width={CARD_W}
              height={CARD_H}
              fill="rgba(15,149,104,0.05)"
              stroke={EMERALD}
              strokeOpacity={c.focal ? 0.9 : 0.45}
              strokeWidth="0.85"
              rx="1.5"
            />
            {/* Layout-specific content */}
            <Layout x={c.x} y={c.y} focal={c.focal} />
            {/* Segment tag in top-right corner */}
            <text
              x={c.x + CARD_W - 5}
              y={c.y + 9}
              textAnchor="end"
              fontFamily={FONT_STACK}
              fontSize="6.5"
              fill={EMERALD}
              opacity="0.55"
              letterSpacing="0.14em"
            >
              {c.tag}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────
   04 — MeasureViz
   Four ascending bars (one per segment) each with a lift % above.
   The top bar is the cream focal — the winning experience.
   ────────────────────────────────────────────────────────────────── */
function MeasureViz() {
  const bars = [
    { label: 'S1', pct: '+12%', height: 56 },
    { label: 'S2', pct: '+17%', height: 80 },
    { label: 'S3', pct: '+22%', height: 100 },
    { label: 'S4', pct: '+27%', height: 122, focal: true },
  ]
  const baseY = 160
  const barW = 32
  const xs = [22, 78, 134, 190]

  return (
    <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Baseline */}
      <line
        x1="6"
        y1={baseY}
        x2="234"
        y2={baseY}
        stroke={CREAM}
        strokeOpacity="0.18"
        strokeWidth="0.85"
      />

      {/* Subtle gridline (above baseline) */}
      <line
        x1="6"
        y1={baseY - 60}
        x2="234"
        y2={baseY - 60}
        stroke={CREAM}
        strokeOpacity="0.06"
        strokeWidth="0.6"
        strokeDasharray="1.5 3"
      />

      {bars.map((b, i) => {
        const x = xs[i]
        const h = b.height
        return (
          <g key={i}>
            {/* Bar */}
            <rect
              x={x}
              y={baseY - h}
              width={barW}
              height={h}
              fill={b.focal ? CREAM : EMERALD}
              opacity={b.focal ? 1 : 0.5 + i * 0.12}
            />
            {/* Bar top accent */}
            {b.focal && (
              <rect
                x={x - 1}
                y={baseY - h - 1.5}
                width={barW + 2}
                height="1.5"
                fill={CREAM}
                opacity="0.9"
              />
            )}
            {/* Percent label */}
            <text
              x={x + barW / 2}
              y={baseY - h - 6}
              textAnchor="middle"
              fontFamily={FONT_STACK}
              fontSize="9"
              fontWeight="600"
              fill={b.focal ? CREAM : EMERALD}
              letterSpacing="-0.01em"
            >
              {b.pct}
            </text>
            {/* Segment tag below baseline */}
            <text
              x={x + barW / 2}
              y={baseY + 11}
              textAnchor="middle"
              fontFamily={FONT_STACK}
              fontSize="7.5"
              fill="rgba(250,250,242,0.55)"
              letterSpacing="0.12em"
            >
              {b.label}
            </text>
          </g>
        )
      })}

    </svg>
  )
}

/* Steps 0 + 1 share a single Viz (DataViz) so the dots can morph from
   scatter → cluster without unmounting. Steps 2 + 3 each have their
   own Viz. The key passed to AnimatePresence is this state name, so
   crossing 0↔1 doesn't trigger an enter/exit. */
const STATE_KEYS = ['data', 'data', 'generate', 'measure']
const VIZ_FOR_STATE = {
  data: DataViz,
  generate: GenerateViz,
  measure: MeasureViz,
}

const ORBITAL_RADIUS = 200
const LABEL_RADIUS = 320

const RAD = Math.PI / 180

function AdaptiveMesh({ activeIdx = 0 }) {
  const active = steps[activeIdx]
  const stateKey = STATE_KEYS[activeIdx]
  const Viz = VIZ_FOR_STATE[stateKey]

  /* The circle "turns" rather than the dot moving. A single rotation
     motion value drives all step marker + label positions: step i sits
     at angle (i * 90° + rotation). When activeIdx changes, rotation
     animates to -activeIdx * 90° so the active step's marker arrives
     at the top (angle 0°). */
  const rotation = useMotionValue(0)
  useEffect(() => {
    const controls = fmAnimate(rotation, -activeIdx * 90, {
      duration: 0.8,
      ease: EASING,
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx])

  // Per-step positions on the orbit (markers) and just outside (labels)
  const dot0X = useTransform(rotation, (r) => Math.sin((0 + r) * RAD) * ORBITAL_RADIUS)
  const dot0Y = useTransform(rotation, (r) => -Math.cos((0 + r) * RAD) * ORBITAL_RADIUS)
  const dot1X = useTransform(rotation, (r) => Math.sin((90 + r) * RAD) * ORBITAL_RADIUS)
  const dot1Y = useTransform(rotation, (r) => -Math.cos((90 + r) * RAD) * ORBITAL_RADIUS)
  const dot2X = useTransform(rotation, (r) => Math.sin((180 + r) * RAD) * ORBITAL_RADIUS)
  const dot2Y = useTransform(rotation, (r) => -Math.cos((180 + r) * RAD) * ORBITAL_RADIUS)
  const dot3X = useTransform(rotation, (r) => Math.sin((270 + r) * RAD) * ORBITAL_RADIUS)
  const dot3Y = useTransform(rotation, (r) => -Math.cos((270 + r) * RAD) * ORBITAL_RADIUS)

  const lbl0X = useTransform(rotation, (r) => Math.sin((0 + r) * RAD) * LABEL_RADIUS)
  const lbl0Y = useTransform(rotation, (r) => -Math.cos((0 + r) * RAD) * LABEL_RADIUS)
  const lbl1X = useTransform(rotation, (r) => Math.sin((90 + r) * RAD) * LABEL_RADIUS)
  const lbl1Y = useTransform(rotation, (r) => -Math.cos((90 + r) * RAD) * LABEL_RADIUS)
  const lbl2X = useTransform(rotation, (r) => Math.sin((180 + r) * RAD) * LABEL_RADIUS)
  const lbl2Y = useTransform(rotation, (r) => -Math.cos((180 + r) * RAD) * LABEL_RADIUS)
  const lbl3X = useTransform(rotation, (r) => Math.sin((270 + r) * RAD) * LABEL_RADIUS)
  const lbl3Y = useTransform(rotation, (r) => -Math.cos((270 + r) * RAD) * LABEL_RADIUS)

  const dotXs = [dot0X, dot1X, dot2X, dot3X]
  const dotYs = [dot0Y, dot1Y, dot2Y, dot3Y]
  const lblXs = [lbl0X, lbl1X, lbl2X, lbl3X]
  const lblYs = [lbl0Y, lbl1Y, lbl2Y, lbl3Y]

  return (
    <div className="w-full flex flex-col gap-6 md:gap-7">
      {/* Active step description ABOVE the orbital */}
      <div className="text-center px-2 min-h-[64px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASING }}
          >
            <p
              className="text-[13px] md:text-[15px] font-semibold mb-2"
              style={{ color: EMERALD, fontFamily: FONT_STACK, letterSpacing: '-0.01em' }}
            >
              {active.label.join(' ')}
            </p>
            <p
              className="text-[12.5px] md:text-[13px] text-white/55 leading-snug max-w-[44ch] mx-auto"
              style={{ fontFamily: FONT_STACK }}
            >
              {active.subtitle.join(' ')}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Centered orbital indicator with the viz inside it */}
      <div
        className="relative w-full max-w-[440px] mx-auto"
        style={{ aspectRatio: '1 / 1' }}
      >
        <svg
          viewBox="-240 -240 480 480"
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Orbital ring */}
          <circle
            cx="0"
            cy="0"
            r={ORBITAL_RADIUS}
            fill="none"
            stroke={NODE_STROKE}
            strokeOpacity="0.5"
            strokeWidth="1.1"
            strokeDasharray="3 4"
          />

          {/* Static triangle pointer above the active (top) marker.
              Apex up — points away from the orbit. */}
          <path d="M -8 -262 L 0 -274 L 8 -262 Z" fill={EMERALD} opacity="0.9" />

          {/* 4 step markers — prominent circles with their step number
              inside. Each marker rotates around the orbit; whichever is
              at the top is rendered "active" (emerald-filled, larger,
              with a soft outer glow). Others are dark with a gray ring. */}
          {steps.map((step, i) => {
            const isActive = i === activeIdx
            return (
              <g key={`marker-${i}`}>
                {/* Outer glow — visible only for active marker */}
                <motion.circle
                  cx={dotXs[i]}
                  cy={dotYs[i]}
                  r="58"
                  fill={EMERALD}
                  initial={false}
                  animate={{ opacity: isActive ? 0.16 : 0 }}
                  transition={{ duration: 0.6, ease: EASING }}
                />
                {/* Main marker circle — all markers same size; active
                    is only differentiated by emerald fill + glow. */}
                <motion.circle
                  cx={dotXs[i]}
                  cy={dotYs[i]}
                  r="36"
                  initial={false}
                  animate={{
                    fill: isActive ? EMERALD : NODE_INK,
                    stroke: isActive ? EMERALD : NODE_STROKE,
                    strokeWidth: isActive ? 1.5 : 1.25,
                  }}
                  transition={{ duration: 0.6, ease: EASING }}
                />
                {/* Step number inside marker */}
                <motion.text
                  x={dotXs[i]}
                  y={dotYs[i]}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily={FONT_STACK}
                  fontSize="22"
                  fontWeight="500"
                  initial={false}
                  animate={{
                    fill: isActive ? NODE_INK : 'rgba(255,255,255,0.72)',
                  }}
                  transition={{ duration: 0.6, ease: EASING }}
                >
                  {step.num}
                </motion.text>
              </g>
            )
          })}

          {/* 4 step labels — full step names, positioned well outside
              the orbit. The active step's label is hidden (the
              description above the orbit already shows it), so the
              top position only shows the description + marker. */}
          {steps.map((step, i) => {
            const lineCount = step.label.length
            const isActive = i === activeIdx
            return (
              <motion.g
                key={`label-${i}`}
                style={{ x: lblXs[i], y: lblYs[i] }}
                initial={false}
                animate={{ opacity: isActive ? 0 : 0.72 }}
                transition={{ duration: 0.4, ease: EASING }}
              >
                {step.label.map((line, li) => {
                  const yOffset = (li - (lineCount - 1) / 2) * 14
                  return (
                    <text
                      key={li}
                      x="0"
                      y={yOffset}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily={FONT_STACK}
                      fontSize="11"
                      fontWeight={500}
                      fill={CREAM}
                      letterSpacing="0.01em"
                    >
                      {line}
                    </text>
                  )
                })}
              </motion.g>
            )
          })}
        </svg>

        {/* Inner viz — positioned inside the orbit, cross-fades on stateKey */}
        <div
          className="absolute"
          style={{
            top: '28%',
            left: '25%',
            right: '25%',
            bottom: '28%',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stateKey}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="w-full h-full"
            >
              <Viz activeIdx={activeIdx} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Backwards-compatible alias — section markup still says <Flywheel />.
const Flywheel = AdaptiveMesh

/* Sticky stack: when each card scrolls up to STICKY_TOP_BASE + idx*STICKY_BAND
   it pins, leaving only its top STICKY_BAND visible. Subsequent cards
   slide up on top, accumulating a visible header stack above. */
const STICKY_TOP_BASE = 96
const STICKY_BAND = 64

function StepCard({ step, total, withTopBorder, cardRef, idx }) {
  return (
    <motion.article
      ref={cardRef}
      data-idx={idx}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: idx * 0.06, ease: EASING }}
      className={`lg:sticky aspect-[5/3] flex flex-col justify-between px-8 md:px-10 py-7 md:py-10 ${withTopBorder ? 'border-t' : ''}`}
      style={{
        borderColor: 'var(--grid-line)',
        background: CARD_BG,
        top: `${STICKY_TOP_BASE + idx * STICKY_BAND}px`,
        zIndex: idx + 1,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-cream/60">
          {step.eyebrow}
        </span>
        <span className="text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-cream/60 whitespace-nowrap">
          {step.num} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div>
        <h3
          className="text-cream"
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 500,
            fontSize: 'clamp(22px, 2.1vw, 32px)',
            lineHeight: 1,
            letterSpacing: '-0.025em',
          }}
        >
          {step.headline}
        </h3>

        <p
          className="text-white/80 mt-5 md:mt-6"
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
          }}
        >
          {step.body}
        </p>
      </div>
    </motion.article>
  )
}

export default function AdaptiveLoop() {
  const [activeIdx, setActiveIdx] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        // Among entries currently in the trigger band, pick the one
        // closest to the band's center.
        let bestIdx = null
        let bestRatio = -1
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestIdx = parseInt(entry.target.dataset.idx, 10)
          }
        })
        if (bestIdx !== null) setActiveIdx(bestIdx)
      },
      {
        // Trigger band = middle ~20% of viewport
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <GridCell as="section" borders={['t', 'l', 'r']} id="how" className="w-full">
      <div className="w-full">
        {/* Header */}
        <header className="px-8 md:px-16 py-5 md:py-8">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: EASING }}
            className="text-[12px] uppercase mb-2 md:mb-3"
            style={{ color: ACCENT_MUTED, letterSpacing: '0.16em', lineHeight: 1.5 }}
          >
            The Adaptive Loop
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
            className="text-cream whitespace-nowrap"
            style={{
              fontFamily: FONT_STACK,
              fontWeight: 500,
              fontSize: 'clamp(20px, 2.4vw, 30px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            A flywheel that gets smarter with every visit.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASING }}
            className="mt-1.5 md:mt-2 text-sm text-white/55"
            style={{ fontFamily: FONT_STACK, lineHeight: 1.5, letterSpacing: '-0.01em' }}
          >
            Every interaction sharpens the next. Personalization compounds.
          </motion.p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
          {/* Left visual — sticky on desktop, fills viewport height while stuck */}
          <div
            className="self-start lg:sticky lg:min-h-[calc(100vh-96px)] flex flex-col"
            style={{
              top: 96,
              borderTop: '1px solid var(--grid-line)',
              borderBottom: '1px solid var(--grid-line)',
              background: 'rgba(15, 149, 104, 0.02)',
            }}
          >
            <div className="flex-1 px-6 md:px-10 py-12 md:py-16 flex items-center justify-center">
              <div className="w-full max-w-[440px]">
                <Flywheel activeIdx={activeIdx} />
              </div>
            </div>
          </div>

          {/* Right column — stacked cards */}
          <div className="lg:border-l" style={{ borderColor: 'var(--grid-line)' }}>
            {steps.map((step, i) => (
              <StepCard
                key={step.num}
                step={step}
                idx={i}
                total={steps.length}
                withTopBorder={i > 0}
                cardRef={(el) => {
                  cardRefs.current[i] = el
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </GridCell>
  )
}
