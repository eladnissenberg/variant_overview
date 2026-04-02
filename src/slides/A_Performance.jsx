import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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

const metrics = [
  { value: 17, suffix: '%', label: 'Higher AOV' },
  { value: 15, suffix: '%', label: 'Higher Conversion Rate' },
  { value: 27, suffix: '%', label: 'Higher Revenue Per Visitor' },
]

function AnimatedMetric({ target, suffix, delay }) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    const duration = 1200
    const start = Date.now()
    function tick() {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    tick()
  }, [started, target])

  return <span>{val}{suffix}</span>
}

export default function A_Performance() {
  return (
    <div className="w-full h-full relative flex flex-col">
      <span className="absolute top-8 right-10 text-base font-semibold tracking-tight text-white/20 z-20">Variant</span>
      <div className="flex-1 flex flex-col items-center justify-center px-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
        className="text-4xl lg:text-5xl font-semibold text-white leading-tight text-center mb-24"
      >
        Brands using Variant see{' '}
        <span className="font-instrument italic font-normal tracking-normal text-lavender">
          measurable lift.
        </span>
      </motion.h2>

      <div className="flex items-start justify-center w-full max-w-5xl">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASING, delay: 0.3 + i * 0.12 }}
            className="flex-1 flex flex-col items-center text-center"
          >
            <div
              className="text-8xl lg:text-9xl font-extrabold tabular-nums tracking-tighter"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0.4) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <AnimatedMetric target={m.value} suffix={m.suffix} delay={400 + i * 150} />
            </div>
            <p className="text-lg text-white/30 mt-4 font-medium">{m.label}</p>
          </motion.div>
        ))}
      </div>
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
