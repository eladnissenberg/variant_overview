import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

export default function A03_WhatWeDo() {
  return (
    <div className="w-full h-full relative flex items-center justify-center px-24">
      <span className="absolute top-8 right-10 text-base font-semibold tracking-tight text-white/20 z-20">Variant</span>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASING, delay: 0.1 }}
        className="absolute top-16 left-20"
      >
        <div className="inline-flex items-center backdrop-blur-md bg-bg-card border border-white/10 rounded-full px-5 py-2 shadow-lg">
          <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">What we do</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-light text-white/60 leading-[1.25] tracking-tight text-center max-w-5xl"
      >
        <span className="text-white font-semibold">AI Personalization Engine</span>
        {' '}that turns every visit into{' '}
        <span className="text-white font-semibold">a tailored experience.</span>
      </motion.h1>
    </div>
  )
}
