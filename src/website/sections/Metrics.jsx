import { motion } from 'framer-motion'
import { GridCell } from '../components/GridCell'

const EASING = [0.22, 1, 0.36, 1]
const EMERALD = '#0F9568'

const metrics = [
  { value: '+27%', label: 'Revenue per visitor', sub: 'Average uplift across deployments' },
  { value: '+17%', label: 'Average order value', sub: 'Tailored merchandising and offers' },
  { value: '+15%', label: 'Conversion rate', sub: 'Right experience, right moment' },
  { value: '10x', label: 'Faster than manual CRO', sub: 'Generate, deploy, learn — in hours' },
]

export default function Metrics() {
  return (
    <GridCell as="section" borders={['t', 'l', 'r']} id="outcomes" className="w-full px-8 md:px-16 py-20 md:py-32">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="mb-12 md:mb-20 max-w-3xl"
        >
          <span
            className="inline-block text-xs md:text-sm uppercase tracking-[0.22em] font-semibold mb-4"
            style={{ color: EMERALD, opacity: 0.85 }}
          >
            Outcomes
          </span>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-cream">
            Real personalization, <span style={{ color: EMERALD }}>real results.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASING }}
              className="rounded p-7 md:p-8"
              style={{
                background: 'rgba(15, 149, 104, 0.08)',
                border: `1px solid ${EMERALD}`,
                boxShadow: 'inset 0 0 0 3px #061D15',
              }}
            >
              <div
                className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-none mb-4"
                style={{ color: EMERALD }}
              >
                {m.value}
              </div>
              <div className="text-base md:text-lg font-semibold text-cream mb-2 tracking-[-0.01em]">
                {m.label}
              </div>
              <div className="text-sm text-white/45 leading-[1.5]">
                {m.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GridCell>
  )
}
