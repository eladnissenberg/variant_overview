import { motion } from 'framer-motion'
import { GridCell } from '../components/GridCell'

const EASING = [0.22, 1, 0.36, 1]
const EMERALD = '#0F9568'

const testimonials = [
  {
    quote: 'Variant gave us in weeks what our team had been trying to do for years. The lift was immediate and it keeps compounding.',
    name: 'VP, Growth',
    company: 'Enterprise eCommerce',
  },
  {
    quote: 'It feels like having an always-on CRO team. We launch experiences faster than we used to brief them.',
    name: 'Director of eComm',
    company: 'Global Beauty Brand',
  },
  {
    quote: 'The compounding effect is real. Every test makes the next one smarter, and the platform handles it end-to-end.',
    name: 'Head of Digital',
    company: 'DTC Apparel',
  },
]

export default function Testimonials() {
  return (
    <GridCell as="section" borders={['t', 'l', 'r']} className="w-full px-8 md:px-16 py-20 md:py-32">
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
            What teams say
          </span>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-cream">
            Trusted by teams who <span style={{ color: EMERALD }}>ship every day.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASING }}
              className="rounded p-7 md:p-8 flex flex-col h-full"
              style={{
                background: 'rgba(15, 149, 104, 0.06)',
                border: `1px solid rgba(15, 149, 104, 0.4)`,
                boxShadow: 'inset 0 0 0 3px #061D15',
              }}
            >
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="mb-5 opacity-70">
                <path d="M0 22V13C0 5.5 4 0 11 0V5C7 5 5 7 5 11H11V22H0ZM17 22V13C17 5.5 21 0 28 0V5C24 5 22 7 22 11H28V22H17Z" fill={EMERALD} />
              </svg>
              <blockquote className="text-base md:text-lg text-cream/85 leading-[1.55] flex-1 mb-6">
                "{t.quote}"
              </blockquote>
              <figcaption className="text-sm">
                <div className="font-semibold text-cream">{t.name}</div>
                <div className="text-white/45 mt-0.5">{t.company}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </GridCell>
  )
}
