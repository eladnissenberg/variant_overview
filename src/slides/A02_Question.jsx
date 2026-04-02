import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

export default function A02_Question() {
  return (
    <div className="w-full h-full relative flex items-center justify-center px-20">
      <span className="absolute top-8 right-10 text-base font-semibold tracking-tight text-white/20 z-20">Variant</span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.2 }}
        className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.15] tracking-tight text-center max-w-5xl"
      >
        How does the optimal version of your website look{' '}
        <span className="font-instrument italic text-lavender">for each user?</span>
      </motion.h1>
    </div>
  )
}
