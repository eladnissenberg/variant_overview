import { motion } from 'framer-motion'
import { EmeraldOverlay } from '../../components/EmeraldOverlay'
import { GridCell } from '../components/GridCell'

const EASING = [0.22, 1, 0.36, 1]
const EMERALD = '#0F9568'

export default function CTA() {
  return (
    <GridCell as="section" borders={['t', 'l', 'r']} id="cta" className="w-full px-8 md:px-16 py-24 md:py-40 overflow-hidden">
      <EmeraldOverlay variant="secondary" delay={0.1} />

      <div className="relative z-10 w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASING }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.03em] leading-[1.02] text-cream max-w-[18ch] mx-auto"
        >
          See it on <span style={{ color: EMERALD }}>your store.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASING }}
          className="mt-8 text-lg md:text-xl text-white/55 leading-[1.45] max-w-[52ch] mx-auto"
        >
          Book a demo and we'll show you what Variant would do for your visitors — on your actual site, with your actual data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASING }}
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@variantnow.com"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base transition-all"
            style={{ background: EMERALD, color: '#061D15' }}
          >
            Book a demo
          </a>
          <a
            href="https://app.variantnow.com"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base transition-all text-cream"
            style={{ border: '1px solid rgba(250,250,242,0.18)' }}
          >
            Log in
          </a>
        </motion.div>
      </div>
    </GridCell>
  )
}
