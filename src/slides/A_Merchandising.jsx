import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useViewport } from '../hooks/useViewport'

const EASING = [0.22, 1, 0.36, 1]
const GREEN = '#00D97A'

/* ─── Column 01 — Goal selector (converging curves to the engine) ─── */
function GoalSelector() {
  const goals = [
    { label: 'Conversion Rate', selected: true },
    { label: 'AOV', selected: false },
    { label: 'Margin', selected: false },
    { label: 'Sell-through', selected: false },
  ]
  const ROW_HEIGHT = 42
  const N = goals.length
  const centerIdx = (N - 1) / 2
  const TOTAL_HEIGHT = ROW_HEIGHT * N

  return (
    <div className="relative w-full" style={{ height: TOTAL_HEIGHT }}>
      <ul className="flex flex-col pr-6">
        {goals.map((g, i) => {
          const targetY = (centerIdx - i) * ROW_HEIGHT + ROW_HEIGHT / 2
          const gradId = `goalCurveGrad-${i}`
          const isSelected = g.selected

          return (
            <motion.li
              key={g.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.06, ease: EASING }}
              className="flex items-center gap-2 min-w-0"
              style={{ height: ROW_HEIGHT }}
            >
              <div className="flex items-center gap-2.5 whitespace-nowrap">
                <span
                  className="inline-block rounded-full flex-shrink-0"
                  style={{
                    width: 9,
                    height: 9,
                    background: isSelected ? GREEN : 'transparent',
                    border: isSelected ? 'none' : '1.5px solid rgba(255,255,255,0.28)',
                    boxShadow: isSelected ? `0 0 10px ${GREEN}80` : 'none',
                  }}
                />
                <span
                  className="text-[16px] leading-none"
                  style={{
                    color: isSelected ? '#FAFAF2' : 'rgba(255,255,255,0.5)',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {g.label}
                </span>
              </div>
              <svg
                className="flex-1"
                style={{ height: ROW_HEIGHT, overflow: 'visible', minWidth: 0 }}
                viewBox={`0 0 100 ${ROW_HEIGHT}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                      offset="0%"
                      stopColor={isSelected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)'}
                    />
                    <stop offset="55%" stopColor={isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'} />
                    <stop offset="100%" stopColor={GREEN} stopOpacity={isSelected ? '0.95' : '0.35'} />
                  </linearGradient>
                </defs>
                <path
                  d={`M 1.5 ${ROW_HEIGHT / 2} C 32 ${ROW_HEIGHT / 2}, 70 ${targetY}, 100 ${targetY}`}
                  stroke={`url(#${gradId})`}
                  strokeWidth={isSelected ? '1.6' : '1'}
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </motion.li>
          )
        })}
      </ul>

      {/* Convergence node */}
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

/* ─── Column 03 — PLP wireframe with badges, boost, bundle strip, and live reorder ─── */

const PLP_LINE = '#0F9568'
const PLP_CREAM = '#FAFAF2'

/* Card geometry: 38 × 48, origin at top-left. Draw all variants at (0,0); the
   parent <motion.g> translates to the current slot. */
function ProductCard({ variant }) {
  const stroke = variant === 'boosted' ? PLP_CREAM : PLP_LINE
  const strokeW = variant === 'boosted' ? 1.4 : 0.7

  return (
    <g>
      <rect
        x="0"
        y="0"
        width="38"
        height="48"
        rx="2"
        stroke={stroke}
        strokeWidth={strokeW}
        fill="none"
      />
      <rect
        x="4"
        y="4"
        width="30"
        height="24"
        rx="1"
        stroke={PLP_LINE}
        strokeWidth="0.45"
        opacity="0.55"
        fill="none"
      />
      <line x1="4" y1="32" x2="28" y2="32" stroke={PLP_LINE} strokeWidth="0.55" />

      {variant === 'normal' && (
        <>
          <line x1="4" y1="36" x2="20" y2="36" stroke={PLP_LINE} strokeWidth="0.45" opacity="0.6" />
          <rect x="4" y="40" width="11" height="3" rx="0.5" fill={PLP_LINE} opacity="0.85" />
        </>
      )}

      {variant === 'boosted' && (
        <>
          {/* Bestseller badge */}
          <rect x="4" y="36" width="20" height="4" rx="0.8" fill={PLP_LINE} />
          <rect x="4" y="42" width="11" height="3" rx="0.5" fill={PLP_LINE} opacity="0.85" />
          {/* Cream "boosted" indicator dot above the card */}
          <line x1="19" y1="-2" x2="19" y2="-0.2" stroke={PLP_CREAM} strokeWidth="0.9" strokeLinecap="round" />
          <circle cx="19" cy="-4" r="1.2" fill={PLP_CREAM} />
        </>
      )}

      {variant === 'lowstock' && (
        <>
          <circle cx="5" cy="39" r="0.95" fill={PLP_LINE} />
          <line x1="7" y1="39" x2="24" y2="39" stroke={PLP_LINE} strokeWidth="0.45" opacity="0.7" />
          <rect x="4" y="43" width="11" height="3" rx="0.5" fill={PLP_LINE} opacity="0.5" />
        </>
      )}
    </g>
  )
}

/* Six fixed grid slots (2 rows × 3 cols). Cards move between these. */
const SLOTS = [
  { x: 56, y: 38 },
  { x: 100, y: 38 },
  { x: 144, y: 38 },
  { x: 56, y: 92 },
  { x: 100, y: 92 },
  { x: 144, y: 92 },
]

/* Stable card identities. order[] permutes which card occupies which slot. */
const CARDS = [
  { id: 'a', variant: 'normal' },
  { id: 'b', variant: 'boosted' },
  { id: 'c', variant: 'normal' },
  { id: 'd', variant: 'lowstock' },
  { id: 'e', variant: 'normal' },
  { id: 'f', variant: 'normal' },
]

function PLPWireframe() {
  const [order, setOrder] = useState(['a', 'b', 'c', 'd', 'e', 'f'])

  useEffect(() => {
    let intervalId
    // Wait for entrance animation, then continuously swap one random pair.
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setOrder((prev) => {
          const next = [...prev]
          const i = Math.floor(Math.random() * next.length)
          let j = Math.floor(Math.random() * next.length)
          while (j === i) j = Math.floor(Math.random() * next.length)
          ;[next[i], next[j]] = [next[j], next[i]]
          return next
        })
      }, 2500)
    }, 2500)

    return () => {
      clearTimeout(startTimeout)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="relative w-full flex items-start justify-center">
      <motion.svg
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASING }}
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', maxHeight: 230 }}
        fill="none"
      >
        <g stroke={PLP_LINE} strokeWidth="1" fill="none">
          {/* Page frame */}
          <rect x="14" y="14" width="172" height="172" rx="4" />

          {/* Header: collection title + sort dropdown */}
          <line x1="22" y1="26" x2="76" y2="26" strokeWidth="1.3" />
          <rect x="146" y="22" width="34" height="8" rx="2" strokeWidth="0.7" />
          <path
            d="M 174 25 L 177 28 L 180 25"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Facet rail (left) */}
          <line x1="22" y1="40" x2="42" y2="40" strokeWidth="0.55" opacity="0.6" />
          <line x1="22" y1="46" x2="38" y2="46" strokeWidth="0.55" opacity="0.6" />
          <line x1="22" y1="52" x2="44" y2="52" strokeWidth="0.55" opacity="0.6" />
          <line x1="22" y1="58" x2="36" y2="58" strokeWidth="0.55" opacity="0.6" />

          {/* Bundle strip */}
          <rect x="22" y="150" width="156" height="28" rx="2" strokeWidth="0.7" />
          <line x1="28" y1="158" x2="62" y2="158" strokeWidth="0.7" />
          <line x1="28" y1="162.5" x2="56" y2="162.5" strokeWidth="0.5" opacity="0.6" />
          <rect x="28" y="167" width="20" height="5" rx="1.2" fill={PLP_LINE} stroke="none" />
          <rect x="120" y="154" width="16" height="20" rx="1.2" strokeWidth="0.5" opacity="0.75" />
          <rect x="140" y="154" width="16" height="20" rx="1.2" strokeWidth="0.5" opacity="0.75" />
          <rect x="160" y="154" width="16" height="20" rx="1.2" strokeWidth="0.5" opacity="0.75" />
        </g>

        {/* Cards — each animates its translate as the order permutes */}
        {CARDS.map((card) => {
          const slotIdx = order.indexOf(card.id)
          const slot = SLOTS[slotIdx]
          return (
            <motion.g
              key={card.id}
              initial={false}
              animate={{ x: slot.x, y: slot.y }}
              transition={{ duration: 1.8, ease: EASING }}
            >
              <ProductCard variant={card.variant} />
            </motion.g>
          )
        })}

        {/* Live indicator */}
        <circle cx="178" cy="26" r="1.2" fill={PLP_LINE} stroke="none">
          <animate attributeName="opacity" values="0.35;1;0.35" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </motion.svg>
    </div>
  )
}

/* ─── Hero column (02 — Generation) ─── */
function HeroPanel({ isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.55, ease: EASING }}
      className="rounded-md flex flex-col justify-center h-full p-5 md:p-6 relative overflow-hidden"
      style={{
        background: '#0F9568',
        color: '#FAFAF2',
        boxShadow: '0 0 60px #0F956825',
      }}
    >
      {/* Notched corner — same language as A03 HeroPanel */}
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
        the right
        <br />
        merchandise
        <br />
        per visit.
      </h3>
    </motion.div>
  )
}

/* ─── Inter-column flow arrow ─── */
function FlowArrow({ delay = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASING }}
      className="absolute pointer-events-none top-1/2 -translate-y-1/2 z-10 right-[-23px] lg:right-[-27px]"
    >
      <svg width="22" height="14" style={{ overflow: 'visible' }}>
        <line x1="0" y1="7" x2="18" y2="7" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
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

/* ─── Decorative pixel cluster (top-right) — copied to keep slides standalone ─── */
function DecorativeGrid() {
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
      <span
        className="text-[13px] font-semibold tracking-[0.2em] mb-1.5"
        style={{ color: GREEN, opacity: 0.65 }}
      >
        {col.num}
      </span>

      <span
        className="text-[14px] md:text-sm font-semibold uppercase tracking-[0.16em] mb-4 md:mb-5"
        style={{ color: GREEN, opacity: 0.85 }}
      >
        {col.label}
      </span>

      {col.isHero ? (
        <div className="flex-1 min-h-[160px] relative md:px-3">
          <HeroPanel isMobile={isMobile} />
          {showArrow && <FlowArrow delay={0.6 + index * 0.1} />}
        </div>
      ) : (
        <>
          <div
            className={`flex-1 min-h-0 w-full relative md:px-3 ${
              hideCaption ? '' : 'mb-4'
            }`}
          >
            {col.body}
            {showArrow && <FlowArrow delay={0.6 + index * 0.1} />}
          </div>
          {!hideCaption && (
            <p className="text-xs md:text-[13px] text-white/40 leading-snug">{col.caption}</p>
          )}
        </>
      )}
    </motion.div>
  )
}

/* ─── Slide ─── */
export default function A_Merchandising() {
  const { isMobile } = useViewport()

  const columns = [
    {
      num: '01',
      label: 'GOAL',
      body: <GoalSelector />,
      caption: 'Choose what to optimize for. Variant decides how to merchandise to hit it.',
    },
    {
      num: '02',
      label: 'GENERATION',
      isHero: true,
    },
    {
      num: '03',
      label: 'OUTPUT',
      body: <PLPWireframe />,
      caption: 'Sort order, badges, bundles, and cross-sells — rebuilt per visitor on every page-load.',
    },
  ]

  return (
    <div className="w-full h-full relative flex flex-col px-5 py-6 md:px-14 md:py-12">
      {/* Top-right decoration + wordmark */}
      <div className="hidden md:flex absolute top-10 right-10 z-20 items-start gap-5">
        <DecorativeGrid />
        <span className="text-base font-semibold tracking-tight text-white">variant</span>
      </div>

      {/* Header */}
      <div className="mb-6 md:mb-10 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight"
        >
          A merchandiser for{' '}
          <span style={{ color: GREEN }}>every visitor.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASING }}
          className="text-base md:text-xl text-white/40 mt-2 md:mt-3"
        >
          Ingests vast volumes of behavioral, contextual, and catalog data — ensuring the optimal results for each person.
        </motion.p>
      </div>

      {/* Columns */}
      {isMobile ? (
        <div className="min-h-0 flex-1 grid grid-cols-1 gap-7">
          {columns.map((col, i) => (
            <Column
              key={col.num}
              col={col}
              index={i}
              isMobile={isMobile}
              isLast={i === columns.length - 1}
              hideCaption={false}
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-10 lg:gap-14 flex-shrink-0 h-[320px]">
            {columns.map((col, i) => (
              <Column
                key={col.num}
                col={col}
                index={i}
                isMobile={isMobile}
                isLast={i === columns.length - 1}
                hideCaption={true}
              />
            ))}
          </div>

          {/* Captions row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASING }}
            className="mt-8"
          >
            <div className="grid grid-cols-3 gap-10 lg:gap-14">
              {columns.map((col) => (
                <p
                  key={col.num}
                  className="text-sm md:text-[17px] text-white/40 leading-snug md:px-3"
                >
                  {col.caption || ''}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <p className="text-[14px] md:text-sm text-white/35 pt-4 text-left">
        Honors inventory, margin, and brand constraints — no rule-writing required.
      </p>
    </div>
  )
}
