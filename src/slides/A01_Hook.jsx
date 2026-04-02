import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

const logos = [
  { name: "L'Occitane", src: '/images/loccitane-logo.svg' },
  { name: 'Foot Locker', src: '/images/footlocker-logo.svg' },
  { name: 'Modibodi', src: '/images/modibodi-logo.png' },
  { name: 'Summer Fridays', src: '/images/summerfridays-logo.svg' },
  { name: 'Cadence', src: '/images/cadence-logo.svg' },
  { name: 'Wonderskin', src: '/images/wonderskin-logo.svg' },
  { name: 'BlazePod', src: '/images/blazepod-logo.svg' },
  { name: 'Renuar', src: 'https://renuar.co.il/cdn/shop/files/Logo_black_3f4a3793-1b44-46c6-89a8-7171f81cc6ba.svg?v=1757415054&width=200' },
  { name: 'Dermstreet', src: '/images/dermstreet-logo.svg' },
  { name: 'DailySale', src: 'https://dailysale.com/cdn/shop/files/White_DS_Logo_185x@2x.png?v=1662923433' },
  { name: 'Karma and Luck', src: 'https://cdn.shopify.com/s/files/1/2318/2543/files/Karma_and_Luck_Logo_ea6c8ce7-fe9b-431e-b999-3986dffd4d38.svg?v=1738863544&width=200&height=20&crop=center' },
  { name: 'Yon-Ka', src: 'https://us.yonka.com/cdn/shop/files/logo_yonka_svg.svg?v=1677647543&width=60' },
  { name: 'Lumineux', src: 'https://lumineuxhealth.com/cdn/shop/files/2023_Lumineux_Logo_TealGold_RGB_1200x568_b7a725c5-48db-40cb-992f-499329164991.png?v=1678305053&width=350' },
  { name: 'Letifly', src: 'https://www.letifly.com/cdn/shop/files/Letifly_Logo_Black_TM_new_york.png?v=1744039321&width=360' },
  { name: 'Mayven', src: '/images/mayven-logo.png' },
  { name: 'MotherRoot', src: '/images/motheroot-logo.svg' },
  { name: 'Allermi', src: '/images/allermi-logo.png' },
  { name: 'Terra Kaffa', src: '/images/terrakaffa-logo.svg' },
]

export default function A01_Hook() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center px-20">
        {/* Left — headline area */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASING, delay: 0.1 }}
          >
            <div className="inline-flex items-center backdrop-blur-md bg-bg-card border border-white/10 rounded-full px-5 py-2 shadow-lg mb-8">
              <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">AI-Powered CRO</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASING, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] tracking-tight"
          >
            What if
            <br />
            experimentation
            <br />
            just...{' '}
            <span className="font-instrument italic text-lavender">worked?</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: EASING, delay: 0.6 }}
            className="mt-8 h-px w-24 origin-left"
            style={{ background: 'linear-gradient(90deg, #3B5BFF, #00D9A3)' }}
          />
        </div>

        {/* Right — Variant wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASING, delay: 0.5 }}
          className="flex-shrink-0 ml-16"
        >
          <span
            className="text-[140px] font-bold tracking-tighter text-white/[0.04] leading-none select-none"
            style={{ writingMode: 'vertical-rl' }}
          >
            Variant
          </span>
        </motion.div>
      </div>

      {/* Logo banner — infinite scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.9 }}
        className="pb-10 overflow-hidden"
      >
        <div className="flex animate-scroll" style={{ width: 'max-content' }}>
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              className="object-contain flex-shrink-0 mx-6"
              style={{ filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.4, height: 30, width: 120 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
