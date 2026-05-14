import { motion } from 'framer-motion'
import { GridCell } from '../components/GridCell'

const EASING = [0.22, 1, 0.36, 1]
const EMERALD = '#0F9568'

const logos = [
  { name: "L'Occitane", src: '/images/loccitane-logo.svg' },
  { name: 'Foot Locker', src: '/images/footlocker-logo.svg' },
  { name: 'Modibodi', src: '/images/modibodi-logo.png' },
  { name: 'Summer Fridays', src: '/images/summerfridays-logo.svg' },
  { name: 'Cadence', src: '/images/cadence-logo.svg' },
  { name: 'Wonderskin', src: '/images/wonderskin-logo.svg' },
  { name: 'BlazePod', src: '/images/blazepod-logo.svg' },
  { name: 'Dermstreet', src: '/images/dermstreet-logo.svg' },
  { name: 'Mayven', src: '/images/mayven-logo.png' },
  { name: 'MotherRoot', src: '/images/motheroot-logo.svg' },
  { name: 'Allermi', src: '/images/allermi-logo.png' },
  { name: 'Terra Kaffe', src: '/images/terrakaffa-logo.svg' },
]

const BACKDROP_VIDEO = 'https://framerusercontent.com/assets/tVHUSSi8a9gwR9iTnnetCRl4.webm'

function VideoBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        src={BACKDROP_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'rotate(180deg)', zIndex: 1 }}
      />
      {/* Vertical fade: transparent top → solid forest bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(rgba(6,29,21,0) 0%, #061D15 100%)',
          zIndex: 2,
        }}
      />
      {/* Horizontal band: solid forest middle column (38.6%–67%), video bleeds at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,29,21,0) 0%, #061D15 38.6%, #061D15 67%, rgba(6,29,21,0) 100%)',
          zIndex: 2,
        }}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <GridCell as="section" borders={['l', 'r']} className="w-full min-h-screen flex flex-col overflow-hidden">
      <VideoBackdrop />

      {/* Top region: centered hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-16 pt-32 md:pt-36 pb-12">
        <div className="w-full max-w-[1100px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASING }}
            className="text-[12px] uppercase tracking-[0.18em] font-medium text-cream mb-6 md:mb-8"
            style={{ letterSpacing: '0.16em' }}
          >
            The infrastructure for the Adaptive Web
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASING }}
            className="text-cream mx-auto"
            style={{
              fontFamily: 'Manrope, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              maxWidth: '22ch',
            }}
          >
            Your website shouldn't be static. It should adapt to{' '}
            <span style={{ color: EMERALD }}>every&nbsp;user.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASING }}
            className="mx-auto text-white mt-7 md:mt-9"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(14px, 1.05vw, 16px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.5,
              maxWidth: '52ch',
            }}
          >
            Real-time decisioning that generates the right experience for every visitor — automatically.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASING }}
            className="mt-10 md:mt-12 flex justify-center"
          >
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-medium text-sm transition-opacity hover:opacity-90"
              style={{
                background: EMERALD,
                color: '#FAFAF2',
                borderRadius: 4,
                letterSpacing: '-0.02em',
              }}
            >
              <span>Get in Touch</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M4 3l5 4-5 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom of first viewport: trusted-by carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease: EASING }}
        className="relative z-10 pt-7 md:pt-8 pb-7 md:pb-8"
        style={{ borderTop: '1px solid var(--grid-line)' }}
      >
        <div className="relative overflow-hidden mx-6 md:mx-12">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #061D15 0%, transparent 100%)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #061D15 0%, transparent 100%)' }}
          />

          <div className="flex items-center animate-scroll" style={{ width: 'max-content' }}>
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center mx-5 md:mx-8 w-[120px] md:w-[160px] h-5 md:h-6"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.55 }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </GridCell>
  )
}
