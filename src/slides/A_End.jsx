import { motion } from 'framer-motion'
import { EmeraldOverlay } from '../components/EmeraldOverlay'

const EASING = [0.22, 1, 0.36, 1]

export default function A_End() {
  return (
    <div className="w-full h-full relative">
      <EmeraldOverlay variant="title" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASING, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-9xl lg:text-[180px] font-bold tracking-tighter text-cream leading-none"
        >
          Variant
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASING, delay: 0.5 }}
          className="mt-8 md:mt-10 h-[2px] w-16 md:w-24 origin-center bg-cream"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASING, delay: 0.8 }}
          className="text-xs md:text-sm uppercase tracking-[0.2em] text-cream/50 mt-6 md:mt-8 text-center"
        >
          AI Personalization Engine for eCommerce
        </motion.p>
      </div>
    </div>
  )
}
