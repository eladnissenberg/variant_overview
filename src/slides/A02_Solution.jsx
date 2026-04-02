import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

export default function A02_Solution() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-20">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
        className="text-4xl lg:text-5xl font-semibold text-white leading-tight text-center mb-16"
      >
        Your AI{' '}
        <span className="font-instrument italic font-normal tracking-normal text-lavender">
          experimentation team.
        </span>
      </motion.h2>

      {/* Stack — top to bottom */}
      <div className="w-full max-w-3xl space-y-3">
        {/* Research */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASING, delay: 0.2 }}
          className="flex items-center justify-between rounded-2xl px-8 py-6 border border-lavender/15"
          style={{ background: 'rgba(221,211,240,0.04)' }}
        >
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-full border border-lavender/30 flex items-center justify-center text-sm font-bold text-lavender">1</div>
            <div>
              <h3 className="text-lg font-semibold text-white">Research</h3>
              <p className="text-sm text-text-secondary/60">Surfaces what to test from behavioral data</p>
            </div>
          </div>
        </motion.div>

        {/* Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASING, delay: 0.35 }}
          className="flex items-center justify-between rounded-2xl px-8 py-6 border border-blue-electric/15"
          style={{ background: 'rgba(59,91,255,0.04)' }}
        >
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-full border border-blue-electric/30 flex items-center justify-center text-sm font-bold text-blue-bright">2</div>
            <div>
              <h3 className="text-lg font-semibold text-white">Design</h3>
              <p className="text-sm text-text-secondary/60">Creates brand-aligned variants — copy, layout, visuals</p>
            </div>
          </div>
        </motion.div>

        {/* Deployment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASING, delay: 0.5 }}
          className="flex items-center justify-between rounded-2xl px-8 py-6 border border-teal-bright/15"
          style={{ background: 'rgba(0,217,163,0.04)' }}
        >
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-full border border-teal-bright/30 flex items-center justify-center text-sm font-bold text-teal-bright">3</div>
            <div>
              <h3 className="text-lg font-semibold text-white">Deployment</h3>
              <p className="text-sm text-text-secondary/60">Launches A/B tests in hours — safe, fast, code-ready</p>
            </div>
          </div>
        </motion.div>

        {/* Infrastructure — wider, sits beneath as the foundation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASING, delay: 0.7 }}
          className="rounded-2xl px-8 py-5 flex items-center justify-between mt-1"
          style={{
            background: 'linear-gradient(90deg, rgba(59,91,255,0.06), rgba(0,217,163,0.06))',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span className="text-base font-semibold text-white/70">Experimentation Infrastructure</span>
          <div className="flex gap-8">
            <span className="text-sm text-text-secondary/40">A/B testing</span>
            <span className="text-sm text-text-secondary/40">Traffic allocation</span>
            <span className="text-sm text-text-secondary/40">Revenue measurement</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.9 }}
        className="flex gap-20 mt-16"
      >
        {[
          { value: '10x', label: 'Faster experimentation' },
          { value: '+18%', label: 'Conversion lift' },
          { value: '$0', label: 'Additional headcount' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASING, delay: 1.0 + i * 0.1 }}
            className="text-center"
          >
            <span
              className="text-4xl font-bold leading-none"
              style={{
                background: 'linear-gradient(135deg, #3B5BFF 0%, #00D9A3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {metric.value}
            </span>
            <p className="text-xs text-text-secondary/50 uppercase tracking-wider mt-2">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
