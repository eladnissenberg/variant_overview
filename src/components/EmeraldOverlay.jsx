import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

const VARIANTS = {
  title: {
    viewBox: '0 0 1920 1080',
    paths: [
      'M1920 1080H1092V866H1920V1080Z',
      'M1552 754H1092V642H1552V754Z',
      'M1160 214H1920V642H1552V428H300V214H0V0H1160V214Z',
    ],
  },
  secondary: {
    viewBox: '0 0 767 432',
    paths: [
      'M767 432H435.8V346.4H767V432Z',
      'M619.8 356.5H435.8V256.8H619.8V356.5Z',
      'M463 85.6H767V256.8H619.8V171.445H119V85.6H-1V0H463V85.6Z',
    ],
  },
}

export function EmeraldOverlay({ variant = 'title', delay = 0, className = '' }) {
  const v = VARIANTS[variant]
  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: EASING }}
      className={`absolute inset-0 w-full h-full pointer-events-none hidden md:block ${className}`}
      viewBox={v.viewBox}
      preserveAspectRatio="none"
      fill="#0F9568"
    >
      {v.paths.map((d, i) => <path key={i} d={d} />)}
    </motion.svg>
  )
}
