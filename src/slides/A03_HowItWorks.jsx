import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

const phases = [
  {
    agent: 'AI Growth Analyst',
    label: 'AGENTIC ANALYST',
    color: '#DDD3F0',
    borderColor: 'rgba(221,211,240,0.18)',
    bgColor: 'rgba(221,211,240,0.03)',
    glowColor: 'rgba(221,211,240,0.06)',
    steps: [
      { num: '1', title: 'Data Ingestion', desc: 'Connects to your site and analytics — behavior, traffic, intent' },
      { num: '2', title: 'Segmentation', desc: 'Clusters visitors into meaningful segments in real time' },
      { num: '3', title: 'Opportunity Detection', desc: 'Surfaces conversion gaps with data-backed hypotheses' },
    ],
  },
  {
    agent: 'Developer',
    label: 'AGENTIC DEV',
    color: '#5B7AFF',
    borderColor: 'rgba(59,91,255,0.18)',
    bgColor: 'rgba(59,91,255,0.03)',
    glowColor: 'rgba(59,91,255,0.06)',
    steps: [
      { num: '4', title: 'Experiment Generation', desc: 'Creates brand-aligned variants — copy, layout, design, pricing' },
      { num: '5', title: 'Deployment', desc: 'One-click launch with allocation, rendering, and tracking' },
    ],
  },
  {
    agent: 'Memory & Analytics',
    label: 'INTELLIGENCE LAYER',
    color: '#00D9A3',
    borderColor: 'rgba(0,217,163,0.18)',
    bgColor: 'rgba(0,217,163,0.03)',
    glowColor: 'rgba(0,217,163,0.06)',
    steps: [
      { num: '6', title: 'Measurement', desc: 'Tracks conversion and revenue — attributes results to changes' },
      { num: '7', title: 'Compounding', desc: 'Builds memory of what works per segment, improves over time' },
    ],
  },
]

function AgentBadge({ phase, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: EASING, delay }}
      className="flex flex-col items-center mb-4"
    >
      <span
        className="text-lg font-semibold tracking-[0.1em]"
        style={{ color: phase.color, opacity: 0.8 }}
      >
        {phase.agent}
      </span>
    </motion.div>
  )
}

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
        {/* Subtle top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${phase.color}30, transparent)` }}
        />

        {/* Phase label */}
        <span
          className="text-lg font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: phase.color, opacity: 0.5 }}
        >
          {phase.label}
        </span>

        {/* Steps */}
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
        <motion.line
          x1="0" y1="6" x2="22" y2="6"
          stroke="white" strokeOpacity="0.1" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASING, delay }}
        />
        <motion.path
          d="M22 2 L30 6 L22 10"
          stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.3 }}
        />
      </svg>
    </motion.div>
  )
}

export default function A03_HowItWorks() {
  return (
    <div className="w-full h-full relative flex flex-col px-16 py-12">
      <span className="absolute top-8 right-10 text-base font-semibold tracking-tight text-white/20 z-20">Variant</span>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-semibold text-white leading-tight"
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
            className="text-2xl text-text-secondary/40 mt-3"
          >
            An end-to-end system that replaces manual CRO workflows
          </motion.p>
        </div>

      </div>

      {/* 3 phase cards with agents + arrows */}
      <div className="flex items-stretch gap-0">
        <PhaseCard phase={phases[0]} index={0} />
        <ConnectorArrow delay={0.8} />
        <PhaseCard phase={phases[1]} index={1} />
        <ConnectorArrow delay={1.0} />
        <PhaseCard phase={phases[2]} index={2} />
      </div>

    </div>
  )
}
