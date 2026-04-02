import { motion } from 'framer-motion'

const EASING = [0.22, 1, 0.36, 1]

const team = [
  {
    name: 'Elad Nissenberg',
    role: 'CEO',
    email: 'elad@variantnow.com',
    bullets: [
      'Served under the Head of IDF Intelligence',
      '2nd-time founder',
      'Former CorpDev at NICE (NASDAQ: NICE)',
    ],
  },
  {
    name: 'Ben Segal',
    role: 'COO',
    email: 'ben@variantnow.com',
    bullets: [
      'Former Director of BizOps at Workiz',
      'Founded a nationwide non-profit organization',
    ],
  },
  {
    name: 'Ilan Kogan',
    role: 'CTO',
    email: 'ilan@variantnow.com',
    bullets: [
      'Former Unit 8200',
      'Former Director of R&D at Workiz',
      'Former founding engineer at a YC startup',
    ],
  },
]

const brands = ['Foot Locker', "L'Occitane", 'Modibodi', 'Summer Fridays', 'Wonderskin', 'Terra Kaffe']

export default function A05_Close() {
  return (
    <div className="w-full h-full flex">
      {/* Left — large closing statement (55%) */}
      <div className="w-[55%] flex flex-col justify-between px-20 py-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
          className="text-3xl font-semibold tracking-tight text-white"
        >
          Variant
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASING, delay: 0.2 }}
        >
          <h2 className="text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight">
            Let's grow your brands'{' '}
            <span className="font-instrument italic text-lavender">revenue.</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASING, delay: 0.6 }}
            className="mt-6 h-px w-20 origin-left"
            style={{ background: 'linear-gradient(90deg, #3B5BFF, #00D9A3)' }}
          />
          <p className="text-lg text-text-secondary mt-5">
            elad@variantnow.com · ben@variantnow.com
          </p>
        </motion.div>

        {/* Brand strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASING, delay: 0.8 }}
          className="text-text-secondary/25 text-xs uppercase tracking-wider flex items-center gap-2 flex-wrap"
        >
          {brands.map((brand, i) => (
            <span key={brand}>
              {brand}
              {i < brands.length - 1 && <span className="ml-2 opacity-50">·</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right — team bios (45%) with subtle background */}
      <div
        className="w-[45%] flex flex-col justify-center px-14 py-16"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASING, delay: 0.15 }}
          className="text-xs font-medium text-text-secondary/40 uppercase tracking-widest mb-10"
        >
          The Team
        </motion.span>

        <div className="space-y-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASING, delay: 0.25 + i * 0.12 }}
            >
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <span className="text-sm text-teal-bright font-medium">{member.role}</span>
              </div>
              <ul className="mt-2 space-y-0.5">
                {member.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm text-text-secondary leading-relaxed">
                    · {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
