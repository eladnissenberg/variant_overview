import { motion } from 'framer-motion'
import { useViewport } from '../hooks/useViewport'

const EASING = [0.22, 1, 0.36, 1]
const GREEN = '#00D97A'
const GREEN_DIM = '#00D97A66'

/* ─── Memory grid (column 05 — Measurement + Memory) ─── */
/* Larger cells, multi-tier brightness, one cream-highlight focal cell */
function MemoryGrid({ isMobile }) {
  const cols = isMobile ? 14 : 10
  const rows = isMobile ? 8 : 12
  const total = cols * rows

  const cells = []
  for (let i = 0; i < total; i++) {
    const r = Math.sin(i * 1.7 + i * i * 0.013 + 99) * 43758.5453
    const v = r - Math.floor(r)

    let tier
    if (v < 0.55) tier = 0
    else if (v < 0.78) tier = 1
    else if (v < 0.92) tier = 2
    else tier = 3

    cells.push(tier)
  }

  // Cream focal cell — placed slightly left-of-center, mid-height
  const highlightIdx =
    Math.floor(rows * 0.45) * cols + Math.floor(cols * 0.3)
  cells[highlightIdx] = 4

  const tierStyles = [
    { bg: `${GREEN}12`, shadow: 'none' },
    { bg: `${GREEN}35`, shadow: 'none' },
    { bg: `${GREEN}90`, shadow: 'none' },
    { bg: GREEN, shadow: `0 0 6px ${GREEN}55` },
    { bg: '#FAFAF2', shadow: '0 0 14px rgba(250,250,242,0.55)' },
  ]

  return (
    <div className="w-full h-full py-3">
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '3px',
        }}
      >
        {cells.map((tier, i) => {
          const s = tierStyles[tier]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.55 + i * 0.005,
                ease: EASING,
              }}
              style={{
                background: s.bg,
                boxShadow: s.shadow,
                borderRadius: 2,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

/* ─── Pixel grid visualization (Understanding panel) ─── */
function PixelGrid({ seed = 1, density = 0.18, cols = 14, rows = 16 }) {
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const r = Math.sin(seed * 9.7 + i * 1.31 + i * i * 0.013) * 43758.5453
    const v = r - Math.floor(r)
    if (v < density) return 2
    if (v < density * 2.5) return 1
    return 0
  })

  return (
    <div className="w-full h-full py-3">
      <div
        className="grid gap-[2px] w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells.map((on, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.6 + i * 0.003, ease: EASING }}
            style={{
              background:
                on === 2 ? GREEN : on === 1 ? `${GREEN}40` : 'rgba(255,255,255,0.025)',
              borderRadius: 1,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Signal list (column 01) — items + converging curves + arrow ─── */
function SignalList() {
  const signals = [
    'Behavior',
    'Intent',
    'Context',
    'Traffic source',
    'Agent requests',
    'Business rules',
    '+ more',
  ]
  const ROW_HEIGHT = 30
  const N = signals.length
  const centerIdx = (N - 1) / 2
  const TOTAL_HEIGHT = ROW_HEIGHT * N

  return (
    <div className="relative w-full" style={{ height: TOTAL_HEIGHT }}>
      <ul className="flex flex-col pr-6">
        {signals.map((s, i) => {
          // y of convergence point, in this row's local pixel coords
          const targetY = (centerIdx - i) * ROW_HEIGHT + ROW_HEIGHT / 2
          const gradId = `signalCurveGrad-${i}`

          return (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.5 + i * 0.06,
                ease: EASING,
              }}
              className="flex items-center gap-2 min-w-0"
              style={{ height: ROW_HEIGHT }}
            >
              <span className="text-[17px] text-white/85 leading-none whitespace-nowrap">
                {s}
              </span>
              <svg
                className="flex-1"
                style={{
                  height: ROW_HEIGHT,
                  overflow: 'visible',
                  minWidth: 0,
                }}
                viewBox={`0 0 100 ${ROW_HEIGHT}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={gradId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgba(255,255,255,0.32)"
                    />
                    <stop
                      offset="55%"
                      stopColor="rgba(255,255,255,0.55)"
                    />
                    <stop
                      offset="100%"
                      stopColor={GREEN}
                      stopOpacity="0.95"
                    />
                  </linearGradient>
                </defs>
                {/* Subtle origin dot — appears just after the text */}
                <circle
                  cx="1.5"
                  cy={ROW_HEIGHT / 2}
                  r="1.4"
                  fill="rgba(255,255,255,0.45)"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Curve */}
                <path
                  d={`M 1.5 ${ROW_HEIGHT / 2} C 32 ${ROW_HEIGHT / 2}, 70 ${targetY}, 100 ${targetY}`}
                  stroke={`url(#${gradId})`}
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </motion.li>
          )
        })}
      </ul>

      {/* Convergence node — terminates the converging curves; the
          inter-column FlowArrow continues the flow visually.
          SVG width=24 must match ul's pr-6 (24px) so the node sits
          exactly where the curves end. */}
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: EASING }}
        className="absolute pointer-events-none right-0"
        style={{ top: TOTAL_HEIGHT / 2 - 8 }}
      >
        <svg width="24" height="16" style={{ overflow: 'visible' }}>
          <circle cx="0" cy="8" r="5" fill={GREEN} opacity="0.18" />
          <circle cx="0" cy="8" r="2.2" fill={GREEN} />
        </svg>
      </motion.div>
    </div>
  )
}

/* ─── Inter-column flow arrow — centered in the grid gap ─── */
function FlowArrow({ delay = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASING }}
      className="absolute pointer-events-none top-1/2 -translate-y-1/2 z-10 right-[-23px] lg:right-[-27px]"
    >
      <svg width="22" height="14" style={{ overflow: 'visible' }}>
        <line
          x1="0"
          y1="7"
          x2="18"
          y2="7"
          stroke={GREEN}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 13 3 L 18 7 L 13 11"
          stroke={GREEN}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

/* ─── Deployment surface (column 04) — desktop + phone wireframes ─── */
function DeploymentStack() {
  // Darker, less-neon emerald for the wireframe (matches the design
  // system's primary emerald instead of the brighter slide GREEN).
  const DEPLOY_LINE = '#0F9568'
  return (
    <div className="relative w-full flex items-start justify-center">
      <motion.svg
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASING }}
        viewBox="0 0 200 170"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxHeight: 200 }}
        fill="none"
      >
        {/* ═══ Desktop browser ═══ */}
        <g stroke={DEPLOY_LINE} strokeWidth="1" fill="none">
          {/* Outer frame */}
          <rect x="28" y="18" width="130" height="112" rx="4" />
          {/* Header bar bottom */}
          <line x1="28" y1="32" x2="158" y2="32" />

          {/* Traffic lights */}
          <circle cx="34" cy="25" r="1.4" />
          <circle cx="40" cy="25" r="1.4" />
          <circle cx="46" cy="25" r="1.4" />

          {/* URL bar */}
          <rect x="55" y="21.5" width="68" height="7" rx="3.5" strokeWidth="0.85" />
          {/* Lens icon */}
          <circle cx="118" cy="25" r="1.2" strokeWidth="0.7" />
          <line x1="118.8" y1="25.8" x2="120.4" y2="27.4" strokeWidth="0.6" strokeLinecap="round" />

          {/* 3-dot menu */}
          <circle cx="148" cy="25" r="0.7" fill={DEPLOY_LINE} stroke="none" />
          <circle cx="151" cy="25" r="0.7" fill={DEPLOY_LINE} stroke="none" />
          <circle cx="154" cy="25" r="0.7" fill={DEPLOY_LINE} stroke="none" />

          {/* Nav strip */}
          <line x1="34" y1="38" x2="44" y2="38" strokeWidth="0.6" opacity="0.75" />
          <line x1="49" y1="38" x2="60" y2="38" strokeWidth="0.6" opacity="0.75" />
          <line x1="65" y1="38" x2="76" y2="38" strokeWidth="0.6" opacity="0.75" />
          <line x1="81" y1="38" x2="91" y2="38" strokeWidth="0.6" opacity="0.75" />
          {/* Active nav indicator */}
          <line x1="34" y1="40.5" x2="44" y2="40.5" strokeWidth="0.8" />

          {/* Hero product card (left) */}
          <rect x="34" y="46" width="62" height="46" rx="2" strokeWidth="0.85" />
          {/* Hero image */}
          <rect x="38" y="50" width="54" height="22" rx="1" strokeWidth="0.55" opacity="0.7" />
          {/* Mountain motif inside hero image */}
          <path
            d="M 44 67 L 52 56 L 58 62 L 66 53 L 75 67"
            strokeWidth="0.55"
            opacity="0.5"
            strokeLinejoin="round"
          />
          <circle cx="84" cy="55" r="1.3" strokeWidth="0.4" opacity="0.5" />
          {/* Title line */}
          <line x1="38" y1="76" x2="78" y2="76" strokeWidth="0.7" />
          {/* Description */}
          <line x1="38" y1="79.5" x2="68" y2="79.5" strokeWidth="0.5" opacity="0.5" />
          {/* CTA — filled emerald button (focal point) */}
          <rect
            x="38"
            y="83"
            width="30"
            height="6"
            rx="1.2"
            fill={DEPLOY_LINE}
            stroke="none"
          />

          {/* Side panel (right) — list with checkbox filters */}
          <line x1="100" y1="50" x2="120" y2="50" strokeWidth="0.7" />
          {/* Filter rows */}
          <rect x="100" y="55" width="2.2" height="2.2" rx="0.3" strokeWidth="0.4" opacity="0.7" />
          <line x1="104.5" y1="56.1" x2="124" y2="56.1" strokeWidth="0.5" opacity="0.7" />
          <rect x="100" y="61" width="2.2" height="2.2" rx="0.3" strokeWidth="0.4" opacity="0.7" />
          <line x1="104.5" y1="62.1" x2="120" y2="62.1" strokeWidth="0.5" opacity="0.7" />
          {/* Selected (filled) */}
          <rect
            x="100"
            y="67"
            width="2.2"
            height="2.2"
            rx="0.3"
            fill={DEPLOY_LINE}
            stroke="none"
          />
          <line x1="104.5" y1="68.1" x2="126" y2="68.1" strokeWidth="0.55" opacity="0.85" />
          <rect x="100" y="73" width="2.2" height="2.2" rx="0.3" strokeWidth="0.4" opacity="0.7" />
          <line x1="104.5" y1="74.1" x2="118" y2="74.1" strokeWidth="0.5" opacity="0.7" />

          {/* Sparkline — conversion uplift trend */}
          <path
            d="M 100 88 L 106 85 L 112 86 L 118 82 L 124 84 L 130 79 L 136 81 L 142 76"
            strokeWidth="0.65"
            opacity="0.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* End-point dot */}
          <circle cx="142" cy="76" r="1" fill={DEPLOY_LINE} stroke="none" />

          {/* Bottom: 3 product thumbnail cards */}
          <rect x="34" y="98" width="38" height="22" rx="1.5" strokeWidth="0.6" opacity="0.75" />
          <rect x="76" y="98" width="38" height="22" rx="1.5" strokeWidth="0.6" opacity="0.75" />
          <rect x="118" y="98" width="38" height="22" rx="1.5" strokeWidth="0.6" opacity="0.75" />
          {/* Tiny price tags inside thumbnails */}
          <rect
            x="38"
            y="115"
            width="10"
            height="2.5"
            rx="0.5"
            fill={DEPLOY_LINE}
            stroke="none"
            opacity="0.85"
          />
          <rect
            x="80"
            y="115"
            width="10"
            height="2.5"
            rx="0.5"
            fill={DEPLOY_LINE}
            stroke="none"
            opacity="0.85"
          />
          <rect
            x="122"
            y="115"
            width="10"
            height="2.5"
            rx="0.5"
            fill={DEPLOY_LINE}
            stroke="none"
            opacity="0.85"
          />

          {/* Footer text line */}
          <line x1="34" y1="125" x2="100" y2="125" strokeWidth="0.45" opacity="0.4" />
        </g>

        {/* ═══ Mobile phone (bottom-right, overlapping desktop) ═══ */}
        <g>
          {/* Phone fill — masks desktop behind */}
          <rect x="112" y="68" width="44" height="92" rx="7" fill="#131320" />
          {/* Phone outline */}
          <rect
            x="112"
            y="68"
            width="44"
            height="92"
            rx="7"
            stroke={DEPLOY_LINE}
            strokeWidth="1"
            fill="none"
          />

          {/* Status bar */}
          <line x1="118" y1="73.5" x2="123" y2="73.5" stroke={DEPLOY_LINE} strokeWidth="0.5" opacity="0.7" />
          {/* Signal dots */}
          <circle cx="141" cy="73.5" r="0.45" fill={DEPLOY_LINE} stroke="none" opacity="0.7" />
          <circle cx="143" cy="73.5" r="0.45" fill={DEPLOY_LINE} stroke="none" opacity="0.7" />
          <circle cx="145" cy="73.5" r="0.45" fill={DEPLOY_LINE} stroke="none" opacity="0.7" />
          {/* Battery */}
          <rect x="147.5" y="72.5" width="3.5" height="2" rx="0.3" stroke={DEPLOY_LINE} strokeWidth="0.4" fill="none" opacity="0.7" />
          <rect x="148" y="73" width="2.2" height="1" fill={DEPLOY_LINE} stroke="none" opacity="0.7" />

          {/* Speaker / notch */}
          <line x1="128" y1="79" x2="140" y2="79" stroke={DEPLOY_LINE} strokeWidth="0.85" strokeLinecap="round" />

          {/* Hero image */}
          <rect x="118" y="84" width="32" height="24" rx="1.5" stroke={DEPLOY_LINE} strokeWidth="0.7" fill="none" />
          {/* Image motif */}
          <path
            d="M 122 103 L 128 95 L 132 99 L 138 91 L 146 103"
            stroke={DEPLOY_LINE}
            strokeWidth="0.5"
            opacity="0.55"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="142" cy="91" r="1.1" stroke={DEPLOY_LINE} strokeWidth="0.4" opacity="0.55" fill="none" />

          {/* Title + description */}
          <line x1="118" y1="113" x2="146" y2="113" stroke={DEPLOY_LINE} strokeWidth="0.6" />
          <line x1="118" y1="116.5" x2="138" y2="116.5" stroke={DEPLOY_LINE} strokeWidth="0.5" opacity="0.55" />

          {/* CTA — filled emerald button */}
          <rect
            x="118"
            y="121"
            width="32"
            height="6"
            rx="1.2"
            fill={DEPLOY_LINE}
            stroke="none"
          />

          {/* Thumbnail row (4 small squares) */}
          <rect x="118" y="131" width="6.5" height="6.5" rx="0.7" stroke={DEPLOY_LINE} strokeWidth="0.45" fill="none" opacity="0.7" />
          <rect x="126.5" y="131" width="6.5" height="6.5" rx="0.7" stroke={DEPLOY_LINE} strokeWidth="0.45" fill="none" opacity="0.7" />
          <rect x="135" y="131" width="6.5" height="6.5" rx="0.7" stroke={DEPLOY_LINE} strokeWidth="0.45" fill="none" opacity="0.7" />
          <rect x="143.5" y="131" width="6.5" height="6.5" rx="0.7" stroke={DEPLOY_LINE} strokeWidth="0.45" fill="none" opacity="0.7" />

          {/* Bottom nav indicator (4 dots, first active) */}
          <circle cx="123" cy="148" r="0.85" fill={DEPLOY_LINE} stroke="none" />
          <circle cx="130" cy="148" r="0.7" fill={DEPLOY_LINE} stroke="none" opacity="0.4" />
          <circle cx="137" cy="148" r="0.7" fill={DEPLOY_LINE} stroke="none" opacity="0.4" />
          <circle cx="144" cy="148" r="0.7" fill={DEPLOY_LINE} stroke="none" opacity="0.4" />

          {/* Home indicator bar */}
          <line x1="128" y1="155" x2="140" y2="155" stroke={DEPLOY_LINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
        </g>

        {/* "Live deployment" pulsing indicator — top-right of desktop */}
        <circle cx="143" cy="25" r="1" fill={DEPLOY_LINE} stroke="none">
          <animate
            attributeName="opacity"
            values="0.35;1;0.35"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
      </motion.svg>
    </div>
  )
}

/* ─── Decorative pixel cluster (top-right) ─── */
function DecorativeGrid() {
  // Asymmetric pattern: 0=off, 1=dim, 2=bright
  const pattern = [
    [0, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 2, 2, 0, 0, 0, 1],
    [2, 2, 1, 0, 0, 1, 2, 2],
    [2, 1, 0, 0, 0, 1, 2, 1],
    [0, 0, 0, 0, 1, 1, 0, 0],
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: EASING }}
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${pattern[0].length}, 10px)` }}
    >
      {pattern.flat().map((cell, i) => (
        <div
          key={i}
          className="w-[10px] h-[10px]"
          style={{
            background: cell === 2 ? GREEN : cell === 1 ? `${GREEN}55` : 'transparent',
            borderRadius: 1,
          }}
        />
      ))}
    </motion.div>
  )
}

/* ─── Hero column (03 — Generation Engine) ─── */
function HeroPanel({ isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.55, ease: EASING }}
      className="rounded-md flex flex-col justify-between h-full p-5 md:p-6 relative overflow-hidden"
      style={{
        background: '#0F9568',
        color: '#FAFAF2',
        boxShadow: '0 0 60px #0F956825',
      }}
    >
      {/* Notched corner — diagonal cut in top-right, revealing the
          forest slide background behind */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: '22%',
          aspectRatio: '1 / 1',
          background: '#061D15',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
        }}
      />

      <h3
        className={`relative font-bold leading-[1.02] tracking-tight ${
          isMobile ? 'text-3xl' : 'text-3xl lg:text-[36px]'
        }`}
      >
        Generates
        <br />
        adaptive
        <br />
        experiences
        <br />
        in real time.
      </h3>
      <p className="relative text-[13px] md:text-[14px] uppercase tracking-[0.22em] font-semibold opacity-75 mt-4">
        copy · layout · merchandising · flows
      </p>
    </motion.div>
  )
}

/* ─── Column wrapper ─── */
function Column({ col, index, isMobile, isLast, hideCaption = false }) {
  const delay = 0.3 + index * 0.08
  const showArrow = !isLast && !isMobile

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASING }}
      className="flex flex-col h-full min-w-0"
    >
      {/* Number */}
      <span
        className="text-[13px] font-semibold tracking-[0.2em] mb-1.5"
        style={{ color: GREEN, opacity: 0.65 }}
      >
        {col.num}
      </span>

      {/* Label — green, matches image */}
      <span
        className="text-[14px] md:text-sm font-semibold uppercase tracking-[0.16em] mb-4 md:mb-5"
        style={{ color: GREEN, opacity: 0.85 }}
      >
        {col.label}
      </span>

      {col.isHero ? (
        <div className="flex-1 min-h-[140px] relative md:px-3">
          <HeroPanel isMobile={isMobile} />
          {showArrow && <FlowArrow delay={0.6 + index * 0.1} />}
        </div>
      ) : (
        <>
          {/* Body — md:px-3 shrinks the illustration width on desktop,
              giving the visualizations breathing room within each column. */}
          <div
            className={`flex-1 min-h-0 w-full relative md:px-3 ${
              hideCaption ? '' : 'mb-4'
            }`}
          >
            {col.body}
            {showArrow && <FlowArrow delay={0.6 + index * 0.1} />}
          </div>
          {/* Caption (hidden on desktop — moved to the loop region) */}
          {!hideCaption && (
            <p className="text-xs md:text-[13px] text-white/40 leading-snug">
              {col.caption}
            </p>
          )}
        </>
      )}
    </motion.div>
  )
}

/* ─── Slide ─── */
export default function A03_HowItWorks_v2() {
  const { isMobile } = useViewport()

  const columns = [
    {
      num: '01',
      label: 'SIGNALS',
      body: <SignalList />,
      caption: 'Ingests data from every touchpoint in real time.',
    },
    {
      num: '02',
      label: 'UNDERSTANDING',
      body: <PixelGrid seed={2} density={0.18} cols={isMobile ? 18 : 14} rows={isMobile ? 10 : 16} />,
      caption: 'Segments users and detects opportunities dynamically.',
    },
    {
      num: '03',
      label: 'GENERATION ENGINE',
      isHero: true,
    },
    {
      num: '04',
      label: 'DEPLOYMENT',
      body: <DeploymentStack />,
      caption: 'Launches instantly across the storefront.',
    },
    {
      num: '05',
      label: 'MEASUREMENT + MEMORY',
      body: <MemoryGrid isMobile={isMobile} />,
      caption:
        'Tracks outcomes and compounds learning across sessions, segments, and brands.',
    },
  ]

  return (
    <div className="w-full h-full relative flex flex-col px-5 py-6 md:px-14 md:py-12">
      {/* Top-right decoration + wordmark */}
      <div className="hidden md:flex absolute top-10 right-10 z-20 items-start gap-5">
        <DecorativeGrid />
        <span className="text-base font-semibold tracking-tight text-white">
          variant
        </span>
      </div>

      {/* Header */}
      <div className="mb-6 md:mb-10 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight"
        >
          How it <span style={{ color: GREEN }}>works.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASING }}
          className="text-base md:text-xl text-white/40 mt-2 md:mt-3"
        >
          An end-to-end system that replaces manual CRO workflows.
        </motion.p>
      </div>

      {/* Desktop: vertically-center the entire illustrations + captions
          + loop group between header and footer. Mobile: keep the
          existing flex-1 grid that fills available space. */}
      {isMobile ? (
        <div className="min-h-0 flex-1 grid grid-cols-1 gap-7">
          {columns.map((col, i) => (
            <Column
              key={col.num}
              col={col}
              index={i}
              isMobile={isMobile}
              isLast={i === columns.length - 1}
              hideCaption={!isMobile}
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col justify-center">
          {/* Columns — illustrations only (captions moved into loop region).
              h-[300px] = ~12% reduction from prior 340px (smaller, but
              gives the hero panel enough room for the bigger text). */}
          <div className="grid grid-cols-5 gap-6 lg:gap-8 flex-shrink-0 h-[300px]">
            {columns.map((col, i) => (
              <Column
                key={col.num}
                col={col}
                index={i}
                isMobile={isMobile}
                isLast={i === columns.length - 1}
                hideCaption={!isMobile}
              />
            ))}
          </div>

          {/* Captions + Loop U-shape — sits directly below the
              illustrations and is part of the centered group.
              Captions row, then the U-shape with verticals at ~col 1 /
              col 5 centers (10% / 90%). */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASING }}
            className="mt-8"
          >
            {/* Captions row */}
            <div className="grid grid-cols-5 gap-6 lg:gap-8 mb-2">
              {columns.map((col) => (
                <p
                  key={col.num}
                  className="text-sm md:text-[17px] text-white/40 leading-snug md:px-3"
                >
                  {col.caption || ''}
                </p>
              ))}
            </div>

            {/* Loop U-shape */}
            <div className="relative" style={{ height: 36 }}>
              <div
                className="absolute pointer-events-none"
                style={{
                  left: '10%',
                  right: '10%',
                  top: 0,
                  bottom: 0,
                  border: `1.5px solid ${GREEN}80`,
                  borderTop: 'none',
                  borderRadius: '0 0 14px 14px',
                }}
              />

              <span
                className="absolute left-1/2 px-4 text-[13px] md:text-[14px] uppercase tracking-[0.3em] font-semibold whitespace-nowrap"
                style={{
                  bottom: 0,
                  transform: 'translate(-50%, 50%)',
                  color: GREEN,
                  background: '#061D15',
                  opacity: 0.95,
                }}
              >
                Continuous Learning Loop
              </span>

              <svg
                className="absolute pointer-events-none"
                style={{ top: -14, left: 'calc(10% - 7px)' }}
                width="14"
                height="14"
              >
                <line
                  x1="7"
                  y1="14"
                  x2="7"
                  y2="4"
                  stroke={GREEN}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 3 7 L 7 3 L 11 7"
                  stroke={GREEN}
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      )}

      {/* "Every interaction" text — bottom-left.
          On desktop, the centered wrapper above is `flex-1`, which
          fills the middle of the slide and pushes this text to the
          bottom naturally. */}
      <p className="text-[14px] md:text-sm text-white/35 pt-4 text-left">
        Every interaction improves future decisions.
      </p>

      {/* Mobile: simple loop label (vertical layout doesn't accommodate
          a U-shape, so just show the label) */}
      {isMobile && (
        <div className="text-center mt-2">
          <span
            className="text-[13px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: GREEN, opacity: 0.9 }}
          >
            Continuous Learning Loop
          </span>
        </div>
      )}
    </div>
  )
}
