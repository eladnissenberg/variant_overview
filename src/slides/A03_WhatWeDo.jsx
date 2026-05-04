import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

export default function A03_WhatWeDo() {
  return (
    <div className="w-full h-full relative flex items-center justify-center px-6 md:px-24">
      <span className="hidden md:block absolute md:top-8 md:right-10 text-base font-semibold tracking-tight text-cream/20 z-20">Variant</span>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASING, delay: 0.1 }}
        className="absolute top-10 left-6 md:top-16 md:left-20"
      >
        <div
          className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded"
          style={{
            background: 'rgba(15, 149, 104, 0.08)',
            border: '1px solid #0F9568',
          }}
        >
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-cream">What we do</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.2 }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-cream/60 leading-[1.25] tracking-tight text-center max-w-full md:max-w-5xl"
      >
        <span className="text-cream font-semibold">AI Personalization Engine</span>
        {' '}that turns every visit into{' '}
        <span className="text-cream font-semibold">a tailored experience.</span>
      </motion.h1>
    </div>
  )
}
