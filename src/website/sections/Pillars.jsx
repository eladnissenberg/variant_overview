import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useViewport } from '../../hooks/useViewport'
import { GridCell } from '../components/GridCell'

const EASING = [0.22, 1, 0.36, 1]
const EMERALD = '#0F9568'
const GREEN = '#00D97A'

/* ════════════════════════════════════════════════════════════════
   PRIMITIVE 1 — SignalsViz
   Left half: 5 signal labels with gradient curves converging on an
   emerald node. Right half: 4×4 "resolved profile" cluster.
   ════════════════════════════════════════════════════════════════ */
function SignalsViz({ baseDelay = 0.3 }) {
  const signals = ['Behavior', 'Intent', 'Context', 'Source', 'Device']
  const ROW_HEIGHT = 30
  const N = signals.length
  const centerIdx = (N - 1) / 2
  const TOTAL_HEIGHT = ROW_HEIGHT * N

  const profile = [
    [0, 1, 1, 0],
    [1, 2, 2, 1],
    [1, 2, 3, 2],
    [0, 1, 2, 1],
  ]
  const tierBg = ['transparent', `${EMERALD}40`, EMERALD, '#FAFAF2']

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1" style={{ height: TOTAL_HEIGHT }}>
          <ul className="flex flex-col pr-4">
            {signals.map((s, i) => {
              const targetY = (centerIdx - i) * ROW_HEIGHT + ROW_HEIGHT / 2
              const gradId = `sigGrad-${i}`
              return (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: baseDelay + i * 0.06, ease: EASING }}
                  className="flex items-center gap-2 min-w-0"
                  style={{ height: ROW_HEIGHT }}
                >
                  <span className="text-[14px] md:text-[15px] text-white/85 leading-none whitespace-nowrap">
                    {s}
                  </span>
                  <svg
                    className="flex-1"
                    style={{ height: ROW_HEIGHT, overflow: 'visible', minWidth: 0 }}
                    viewBox={`0 0 100 ${ROW_HEIGHT}`}
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id={gradId}
                        gradientUnits="userSpaceOnUse"
                        x1="1.5"
                        y1="0"
                        x2="100"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
                        <stop offset="55%" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="100%" stopColor={GREEN} stopOpacity="0.95" />
                      </linearGradient>
                    </defs>
                    <circle cx="1.5" cy={ROW_HEIGHT / 2} r="1.6" fill="rgba(255,255,255,0.45)" />
                    <path
                      d={`M 1.5 ${ROW_HEIGHT / 2} C 32 ${ROW_HEIGHT / 2}, 70 ${targetY}, 100 ${targetY}`}
                      stroke={`url(#${gradId})`}
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </motion.li>
              )
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.4, ease: EASING }}
            className="absolute pointer-events-none right-0"
            style={{ top: TOTAL_HEIGHT / 2 - 10 }}
          >
            <svg width="26" height="20" style={{ overflow: 'visible' }}>
              <circle cx="0" cy="10" r="7" fill={GREEN} opacity="0.18">
                <animate attributeName="r" values="7;9;7" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.18;0.05;0.18" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="10" r="3" fill={GREEN} />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: baseDelay + 0.65, ease: EASING }}
          className="grid gap-[4px] flex-shrink-0"
          style={{
            gridTemplateColumns: 'repeat(4, 16px)',
            gridTemplateRows: 'repeat(4, 16px)',
          }}
        >
          {profile.flat().map((tier, i) => (
            <div
              key={i}
              style={{
                background: tierBg[tier],
                borderRadius: 1.5,
                boxShadow: tier === 3 ? '0 0 10px rgba(250,250,242,0.5)' : 'none',
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PRIMITIVE 2 — DeploymentViz
   Desktop browser with content + overlapping phone wireframe.
   ════════════════════════════════════════════════════════════════ */
function DeploymentViz({ baseDelay = 0.3 }) {
  const INK = '#061D15'
  const CREAM = '#FAFAF2'

  // Personas: same two surfaces (desktop + phone) regenerate around
  // the active persona. Hero gradient, title line lengths, and price
  // all morph together to reflect "this experience built for this person."
  const personas = [
    {
      name: 'SARAH',
      avatarFill: 'rgba(250, 250, 242, 0.78)',
      heroId: 'heroSarah',
      price: '$129',
      desktopT1: 124,
      desktopT2: 110,
      phoneT1: 168,
      phoneT2: 156,
    },
    {
      name: 'JAMES',
      avatarFill: 'rgba(15, 149, 104, 0.88)',
      heroId: 'heroJames',
      price: '$89',
      desktopT1: 116,
      desktopT2: 100,
      phoneT1: 160,
      phoneT2: 148,
    },
  ]

  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % personas.length)
    }, 4200)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const p = personas[activeIdx]

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: baseDelay, ease: EASING }}
        viewBox="0 0 200 170"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', maxHeight: '100%' }}
      >
        <defs>
          {/* Sarah — cream-leaning */}
          <linearGradient id="heroSarah" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={CREAM} stopOpacity="0.18" />
            <stop offset="100%" stopColor={EMERALD} stopOpacity="0.22" />
          </linearGradient>
          {/* James — emerald-leaning */}
          <linearGradient id="heroJames" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={CREAM} stopOpacity="0.06" />
            <stop offset="100%" stopColor={EMERALD} stopOpacity="0.42" />
          </linearGradient>
        </defs>

        {/* ═══════ Persona indicator (top-left, above desktop) ═══════ */}
        <motion.circle
          cx="14"
          cy="10"
          r="4"
          animate={{ fill: p.avatarFill }}
          transition={{ duration: 0.6, ease: EASING }}
          stroke={EMERALD}
          strokeOpacity="0.35"
          strokeWidth="0.4"
        />
        <AnimatePresence mode="wait">
          <motion.text
            key={p.name}
            x="20"
            y="12.5"
            fontSize="6"
            fontFamily="Manrope, system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="1.2"
            fill={CREAM}
            fillOpacity="0.82"
            initial={{ opacity: 0, x: 17 }}
            animate={{ opacity: 0.82, x: 20 }}
            exit={{ opacity: 0, x: 23 }}
            transition={{ duration: 0.45, ease: EASING }}
          >
            {p.name}
          </motion.text>
        </AnimatePresence>

        {/* ═══════ Desktop surface (in back) ═══════ */}
        <g>
          <rect
            x="10" y="22" width="130" height="100" rx="5"
            fill={EMERALD}
            fillOpacity="0.05"
            stroke={EMERALD}
            strokeOpacity="0.45"
            strokeWidth="0.85"
          />

          {/* Two stacked hero images — crossfade between personas */}
          <motion.rect
            x="18" y="30" width="58" height="68" rx="3.5"
            fill="url(#heroSarah)"
            stroke="none"
            animate={{ opacity: activeIdx === 0 ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASING }}
          />
          <motion.rect
            x="18" y="30" width="58" height="68" rx="3.5"
            fill="url(#heroJames)"
            stroke="none"
            animate={{ opacity: activeIdx === 1 ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASING }}
          />

          {/* Wishlist heart */}
          <path
            d="M 70 37 C 69 35.8, 67.2 36.2, 67.2 37.5 C 67.2 39.2, 70 41, 70 41 C 70 41, 72.8 39.2, 72.8 37.5 C 72.8 36.2, 71 35.8, 70 37 Z"
            fill="none"
            stroke={CREAM}
            strokeOpacity="0.45"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Title — animated widths */}
          <motion.line
            x1="84"
            y1="40"
            y2="40"
            animate={{ x2: p.desktopT1 }}
            transition={{ duration: 0.7, ease: EASING }}
            stroke={CREAM}
            strokeOpacity="0.7"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <motion.line
            x1="84"
            y1="46"
            y2="46"
            animate={{ x2: p.desktopT2 }}
            transition={{ duration: 0.7, ease: EASING }}
            stroke={CREAM}
            strokeOpacity="0.3"
            strokeWidth="0.9"
            strokeLinecap="round"
          />

          {/* Price — crossfades on persona change */}
          <AnimatePresence mode="wait">
            <motion.text
              key={`d-price-${activeIdx}`}
              x="84"
              y="60"
              fontSize="7"
              fontFamily="Manrope, system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="-0.2"
              fill={CREAM}
              fillOpacity="0.9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASING }}
            >
              {p.price}
            </motion.text>
          </AnimatePresence>

          {/* CTA */}
          <rect x="84" y="67" width="40" height="12" rx="4.5" fill={EMERALD} stroke="none" />
          <g transform="translate(91, 73)" stroke={INK} strokeWidth="1" strokeLinecap="round">
            <line x1="-2" y1="0" x2="2" y2="0" />
            <line x1="0" y1="-2" x2="0" y2="2" />
          </g>
          <line x1="98" y1="71.6" x2="118" y2="71.6" stroke={INK} strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
          <line x1="98" y1="75" x2="113" y2="75" stroke={INK} strokeWidth="0.75" strokeLinecap="round" opacity="0.55" />
        </g>

        {/* ═══════ Phone surface (in front) ═══════ */}
        <g>
          <rect x="130" y="48" width="46" height="98" rx="9" fill="#061D15" />
          <rect
            x="130" y="48" width="46" height="98" rx="9"
            fill={EMERALD}
            fillOpacity="0.05"
            stroke={EMERALD}
            strokeOpacity="0.55"
            strokeWidth="0.9"
          />

          {/* Dynamic Island / notch — top center */}
          <rect x="146" y="50.5" width="14" height="2.6" rx="1.3" fill="#061D15" stroke={EMERALD} strokeOpacity="0.35" strokeWidth="0.3" />

          {/* Two stacked hero images — crossfade between personas */}
          <motion.rect
            x="135" y="56" width="36" height="44" rx="3.5"
            fill="url(#heroSarah)"
            stroke="none"
            animate={{ opacity: activeIdx === 0 ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASING }}
          />
          <motion.rect
            x="135" y="56" width="36" height="44" rx="3.5"
            fill="url(#heroJames)"
            stroke="none"
            animate={{ opacity: activeIdx === 1 ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASING }}
          />

          {/* Wishlist heart */}
          <path
            d="M 166 60 C 165 58.8, 163.2 59.2, 163.2 60.5 C 163.2 62.2, 166 64, 166 64 C 166 64, 168.8 62.2, 168.8 60.5 C 168.8 59.2, 167 58.8, 166 60 Z"
            fill="none"
            stroke={CREAM}
            strokeOpacity="0.45"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Title — animated widths */}
          <motion.line
            x1="135"
            y1="108"
            y2="108"
            animate={{ x2: p.phoneT1 }}
            transition={{ duration: 0.7, ease: EASING }}
            stroke={CREAM}
            strokeOpacity="0.72"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <motion.line
            x1="135"
            y1="114"
            y2="114"
            animate={{ x2: p.phoneT2 }}
            transition={{ duration: 0.7, ease: EASING }}
            stroke={CREAM}
            strokeOpacity="0.32"
            strokeWidth="0.9"
            strokeLinecap="round"
          />

          {/* Price — crossfade */}
          <AnimatePresence mode="wait">
            <motion.text
              key={`p-price-${activeIdx}`}
              x="135"
              y="127"
              fontSize="7"
              fontFamily="Manrope, system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="-0.2"
              fill={CREAM}
              fillOpacity="0.92"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASING }}
            >
              {p.price}
            </motion.text>
          </AnimatePresence>

          {/* CTA */}
          <rect x="135" y="131" width="36" height="11" rx="4.5" fill={EMERALD} stroke="none" />
          <g transform="translate(142, 136.5)" stroke={INK} strokeWidth="1" strokeLinecap="round">
            <line x1="-1.8" y1="0" x2="1.8" y2="0" />
            <line x1="0" y1="-1.8" x2="0" y2="1.8" />
          </g>
          <line x1="148" y1="135.2" x2="168" y2="135.2" stroke={INK} strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
          <line x1="148" y1="138.4" x2="164" y2="138.4" stroke={INK} strokeWidth="0.75" strokeLinecap="round" opacity="0.55" />

          {/* Home indicator — bottom center */}
          <rect x="148" y="143.3" width="10" height="0.85" rx="0.42" fill={CREAM} fillOpacity="0.4" />
        </g>
      </motion.svg>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PRIMITIVE 3 — MemoryViz
   Pixel mosaic with periodic "learning pulse" cell upgrades.
   ════════════════════════════════════════════════════════════════ */
function MemoryViz({ baseDelay = 0.3, isMobile }) {
  const cols = isMobile ? 14 : 12
  const rows = isMobile ? 8 : 9
  const total = cols * rows

  const baseCells = []
  for (let i = 0; i < total; i++) {
    const r = Math.sin(i * 1.7 + i * i * 0.013 + 99) * 43758.5453
    const v = r - Math.floor(r)
    let tier
    if (v < 0.55) tier = 0
    else if (v < 0.78) tier = 1
    else if (v < 0.92) tier = 2
    else tier = 3
    baseCells.push(tier)
  }

  const highlightIdx = Math.floor(rows * 0.45) * cols + Math.floor(cols * 0.3)
  baseCells[highlightIdx] = 4

  const [pulseIdx, setPulseIdx] = useState(-1)
  useEffect(() => {
    const candidates = baseCells
      .map((t, i) => (t <= 1 && i !== highlightIdx ? i : -1))
      .filter((i) => i >= 0)
    let cancelled = false
    function loop() {
      if (cancelled) return
      const next = candidates[Math.floor(Math.random() * candidates.length)]
      setPulseIdx(next)
      const fadeT = setTimeout(() => !cancelled && setPulseIdx(-1), 700)
      const nextT = setTimeout(loop, 1800 + Math.random() * 1400)
      return () => {
        clearTimeout(fadeT)
        clearTimeout(nextT)
      }
    }
    const startT = setTimeout(loop, baseDelay * 1000 + 800)
    return () => {
      cancelled = true
      clearTimeout(startT)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tierStyles = [
    { bg: `${GREEN}12`, shadow: 'none' },
    { bg: `${GREEN}35`, shadow: 'none' },
    { bg: `${GREEN}90`, shadow: 'none' },
    { bg: GREEN, shadow: `0 0 6px ${GREEN}55` },
    { bg: '#FAFAF2', shadow: '0 0 14px rgba(250,250,242,0.55)' },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-1 py-1">
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '3px',
          aspectRatio: `${cols} / ${rows}`,
          maxHeight: '90%',
        }}
      >
        {baseCells.map((tier, i) => {
          const isPulse = i === pulseIdx
          const s = isPulse ? tierStyles[3] : tierStyles[tier]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                background: s.bg,
                boxShadow: s.shadow,
              }}
              transition={{
                duration: isPulse ? 0.25 : 0.3,
                delay: isPulse ? 0 : baseDelay + i * 0.005,
                ease: EASING,
              }}
              style={{ borderRadius: 2 }}
            />
          )
        })}
      </div>
    </div>
  )
}

function Card({ delay, viz, title, accent, body, eyebrow }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASING, delay }}
      className="flex flex-col h-full px-7 md:px-10 py-6 md:py-9"
    >
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <span
          className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: EMERALD, opacity: 0.85 }}
        >
          {eyebrow}
        </span>
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: GREEN }}
          />
          <span className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Live</span>
        </div>
      </div>

      <div className="flex-1 min-h-[128px] md:min-h-[160px] flex items-center justify-center mb-5 md:mb-7">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}
        >
          {viz}
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-[28px] font-semibold leading-[1.08] tracking-[-0.025em] text-cream mb-2 md:mb-3">
          {title} <span style={{ color: EMERALD }}>{accent}</span>
        </h2>
        <p className="text-[13px] md:text-[14px] leading-[1.55] text-white/55">
          {body}
        </p>
      </div>
    </motion.article>
  )
}

export default function Pillars() {
  const { isMobile } = useViewport()

  const cellDivider = { borderColor: 'var(--grid-line)' }

  return (
    <>
      {/* Cards row */}
      <GridCell as="section" borders={['t', 'l', 'r']} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full">
          <div>
            <Card
              delay={0.15}
              eyebrow="01 / Understanding"
              viz={<SignalsViz baseDelay={0.4} />}
              title="Know your"
              accent="customers"
              body="Every interaction is a signal. Variant builds real-time understanding of what each customer wants and what drives them to buy."
            />
          </div>
          <div className="border-t md:border-t-0 md:border-l" style={cellDivider}>
            <Card
              delay={0.3}
              eyebrow="02 / Deployment"
              viz={<DeploymentViz baseDelay={0.55} />}
              title="Launch in"
              accent="minutes"
              body="AI generates and deploys experiences tuned to real behavior — not best-practice templates — so each one feels custom to your brand and the visitor."
            />
          </div>
          <div className="border-t md:border-t-0 md:border-l" style={cellDivider}>
            <Card
              delay={0.45}
              eyebrow="03 / Compounding"
              viz={<MemoryViz baseDelay={0.7} isMobile={isMobile} />}
              title="Learnings"
              accent="compound"
              body="Every experiment feeds your store's memory. Winning patterns scale, failed ones are avoided — so your store gets smarter with every visitor."
            />
          </div>
        </div>
      </GridCell>

      {/* Header band (empty container) */}
      <GridCell as="section" borders={['t', 'l', 'r']} className="w-full px-8 md:px-16 py-10 md:py-14" />
    </>
  )
}
