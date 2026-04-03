import { motion } from 'framer-motion'
import { useViewport } from '../hooks/useViewport'

const EASING = [0.22, 1, 0.36, 1]

const phases = [
  {
    label: 'AGENTIC ANALYST',
    subtitle: 'Finds what to fix',
    color: '#DDD3F0',
    borderColor: 'rgba(221,211,240,0.18)',
    bgColor: 'rgba(221,211,240,0.03)',
    steps: [
      { num: '1', title: 'Data Ingestion', desc: 'Connects to your site and analytics — behavior, traffic, intent' },
      { num: '2', title: 'Segmentation', desc: 'Clusters visitors into meaningful segments in real time' },
      { num: '3', title: 'Opportunity Detection', desc: 'Surfaces conversion gaps with data-backed hypotheses' },
    ],
  },
  {
    label: 'AGENTIC DEV',
    subtitle: 'Builds and ships it',
    color: '#5B7AFF',
    borderColor: 'rgba(59,91,255,0.18)',
    bgColor: 'rgba(59,91,255,0.03)',
    steps: [
      { num: '4', title: 'Experiment Generation', desc: 'Creates brand-aligned variants — copy, layout, design, pricing' },
      { num: '5', title: 'Deployment', desc: 'One-click launch with allocation, rendering, and tracking' },
    ],
  },
  {
    label: 'INTELLIGENCE LAYER',
    subtitle: 'Learns and compounds',
    color: '#00D9A3',
    borderColor: 'rgba(0,217,163,0.18)',
    bgColor: 'rgba(0,217,163,0.03)',
    steps: [
      { num: '6', title: 'Measurement', desc: 'Tracks conversion and revenue — attributes results to changes' },
      { num: '7', title: 'Compounding', desc: 'Builds memory of what works per segment, improves over time' },
    ],
  },
]

/* ─── Desktop: 3 side-by-side cards ─── */

function PhaseCard({ phase, index }) {
  const baseDelay = 0.4 + index * 0.2

  return (
    <div className="flex-1 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: baseDelay }}
        className="w-full h-full rounded-2xl p-6 flex flex-col relative overflow-hidden"
        style={{ background: phase.bgColor, border: `1px solid ${phase.borderColor}` }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${phase.color}30, transparent)` }}
        />
        <span
          className="text-lg font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: phase.color, opacity: 0.5 }}
        >
          {phase.label}
        </span>
        <div className="space-y-6 flex-1">
          {phase.steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASING, delay: baseDelay + 0.25 + i * 0.1 }}
              className="flex gap-3"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 mt-1"
                style={{ background: `${phase.color}10`, color: phase.color, border: `1px solid ${phase.color}20` }}
              >
                {step.num}
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-white/90 leading-snug">{step.title}</h4>
                <p className="text-xl text-text-secondary/40 leading-relaxed mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ConnectorArrow({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center flex-shrink-0 mx-1 self-center mt-10"
    >
      <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
        <motion.line x1="0" y1="6" x2="22" y2="6" stroke="white" strokeOpacity="0.1" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASING, delay }} />
        <motion.path d="M22 2 L30 6 L22 10" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.3, duration: 0.3 }} />
      </svg>
    </motion.div>
  )
}

function DesktopLayout() {
  return (
    <div className="flex items-stretch gap-0">
      <PhaseCard phase={phases[0]} index={0} />
      <ConnectorArrow delay={0.8} />
      <PhaseCard phase={phases[1]} index={1} />
      <ConnectorArrow delay={1.0} />
      <PhaseCard phase={phases[2]} index={2} />
    </div>
  )
}

/* ─── Mobile: Clean vertical timeline ─── */

function MobileLayout() {
  let stepIndex = 0

  return (
    <div className="flex-1 flex items-center overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="relative pl-8">
        {/* Vertical timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: EASING, delay: 0.3 }}
          className="absolute left-[11px] top-0 bottom-0 w-px origin-top"
          style={{ background: 'linear-gradient(180deg, #DDD3F0 0%, #5B7AFF 45%, #00D9A3 100%)', opacity: 0.15 }}
        />

        {phases.map((phase, pi) => {
          const phaseDelay = 0.3 + pi * 0.25
          return (
            <div key={phase.label} className="mb-8 last:mb-0">
              {/* Phase header */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASING, delay: phaseDelay }}
                className="flex items-center gap-3 mb-4"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 w-[23px] h-[23px] rounded-full flex items-center justify-center"
                  style={{ background: `${phase.color}15`, border: `2px solid ${phase.color}30` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: phase.color, opacity: 0.6 }} />
                </div>
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.15em]"
                    style={{ color: phase.color, opacity: 0.7 }}
                  >
                    {phase.label}
                  </span>
                  <p className="text-[13px] text-white/30 mt-0.5">{phase.subtitle}</p>
                </div>
              </motion.div>

              {/* Steps */}
              <div className="space-y-3 ml-1">
                {phase.steps.map((step) => {
                  const delay = phaseDelay + 0.15 + stepIndex * 0.08
                  stepIndex++
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASING, delay }}
                      className="flex items-center gap-2 py-1"
                    >
                      <span className="text-[11px] font-bold w-4 text-center" style={{ color: phase.color, opacity: 0.4 }}>{step.num}</span>
                      <h4 className="text-[15px] font-medium text-white/70">{step.title}</h4>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Main slide ─── */

export default function A03_HowItWorks() {
  const { isMobile } = useViewport()

  return (
    <div className="w-full h-full relative flex flex-col px-4 py-4 md:px-16 md:py-12">
      <span className="hidden md:block absolute md:top-8 md:right-10 text-base font-semibold tracking-tight text-white/20 z-20">Variant</span>

      {/* Header */}
      <div className="mb-4 md:mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight"
        >
          How it{' '}
          <span className="font-instrument italic font-normal tracking-normal text-lavender">
            works.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm md:text-2xl text-text-secondary/40 mt-1 md:mt-3"
        >
          An end-to-end system that replaces manual CRO workflows
        </motion.p>
      </div>

      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  )
}
