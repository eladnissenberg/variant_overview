import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

export default function A_End() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-semibold text-white tracking-tight"
      >
        Variant
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, ease: EASING, delay: 0.6 }}
        className="mt-6 h-px w-20 origin-center"
        style={{ background: 'linear-gradient(90deg, #3B5BFF, #00D9A3)' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.8 }}
        className="text-base md:text-xl text-white/40 mt-4 md:mt-6 font-light"
      >
        AI Personalization Engine for eCommerce
      </motion.p>
    </div>
  )
}
