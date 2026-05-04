import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useViewport } from '../hooks/useViewport'

const EASING = [0.22, 1, 0.36, 1]

const profiles = [
  {
    label: 'Luxury Driven',
    image: '/images/bmw-desktop.png',
    mobileVideo: '/images/bmw-mobile-sarah.mov',
    identity: { name: 'Sarah Mitchell', location: 'Manhattan, NY', photo: '/images/sarah-avatar.png' },
    signals: [
      { icon: '◉', key: 'Pages', value: 'Design, Colors, Gallery' },
      { icon: '◷', key: 'Session', value: '4m 32s' },
      { icon: '↕', key: 'Scroll', value: '94% depth' },
      { icon: '◎', key: 'Clicks', value: 'Color swatches, Interiors' },
    ],
    preferences: ['Premium finishes', 'Visual storytelling'],
    beliefs: ['Design reflects identity', 'Willing to pay for aesthetics'],
    painPoints: ['Overwhelmed by specs', 'Wants emotional connection'],
    profile: { segment: 'Luxury Driven', aov: '$2,840', convRate: '3.2%', intent: 'Aesthetics & Lifestyle', confidence: '94%' },
  },
  {
    label: 'Technical Buyer',
    image: '/images/bmw-desktop-v2.png',
    mobileVideo: '/images/bmw-mobile-james.mov',
    identity: { name: 'James Chen', location: 'Austin, TX', photo: '/images/james-avatar.png' },
    signals: [
      { icon: '◉', key: 'Pages', value: 'Specs, Engineering, Compare' },
      { icon: '◷', key: 'Session', value: '7m 18s' },
      { icon: '↕', key: 'Scroll', value: '100% depth' },
      { icon: '◎', key: 'Clicks', value: 'Drivetrain, Safety, Tech' },
    ],
    preferences: ['Data-driven decisions', 'Comparison tools'],
    beliefs: ['Performance over appearance', 'Research before purchase'],
    painPoints: ['Surface-level content', 'Missing technical details'],
    profile: { segment: 'Technical Buyer', aov: '$3,120', convRate: '4.7%', intent: 'Performance & Engineering', confidence: '97%' },
  },
]

export default function S_ProductDemo_v2() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [ready, setReady] = useState(false)
  const { isMobile } = useViewport()

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 600)
    const autoSwitch = setTimeout(() => setActiveIdx(1), 3000)
    return () => { clearTimeout(timer); clearTimeout(autoSwitch) }
  }, [])

  const switchTo = (idx) => {
    if (idx === activeIdx) return
    setActiveIdx(idx)
  }

  const active = profiles[activeIdx]
  const showCard = ready
  const showSignals = ready
  const showProfile = ready
  const showImage = ready
  const isTransitioning = !ready

  return (
    <div className="w-full h-full relative flex flex-col px-6 pt-6 pb-8 md:pl-16 md:pr-24 md:pt-10 md:pb-16">
      <span className="hidden md:block absolute md:top-8 md:right-10 text-base font-semibold tracking-tight text-cream/20 z-20">Variant</span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
        className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-cream tracking-tight leading-tight mb-3 md:mb-6"
      >
        Real-time personalization that adapts to{' '}
        <span className="text-emerald">every visitor.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="hidden md:block text-2xl text-cream/50 mb-5"
      >
        Variant analyzes real user data to automatically design, build, and deploy better experiences
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASING, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-2 mb-3 md:mb-5"
      >
        {profiles.map((p, i) => (
          <button
            key={p.label}
            onClick={(e) => { e.stopPropagation(); switchTo(i) }}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded text-xs md:text-sm font-medium transition-all duration-300"
            style={{
              background: activeIdx === i ? 'rgba(15, 149, 104, 0.12)' : 'rgba(250, 250, 242, 0.04)',
              border: `1px solid ${activeIdx === i ? '#0F9568' : 'rgba(250, 250, 242, 0.08)'}`,
              color: activeIdx === i ? '#FAFAF2' : 'rgba(250, 250, 242, 0.4)',
            }}
          >
            {p.identity.photo && (
              <img src={p.identity.photo} alt="" className="w-4 h-4 md:w-5 md:h-5 rounded-full object-cover" />
            )}
            {p.identity.name}
            <span className="text-[10px] md:text-xs opacity-60">· {p.label}</span>
          </button>
        ))}
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-5 min-h-0">
        <div className="hidden md:block md:h-full md:w-[380px] flex-shrink-0 relative">
          <AnimatePresence mode="wait">
            {showCard && (
              <motion.div
                key={`card-${activeIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: 0.6, ease: EASING }}
                className="absolute inset-0 rounded overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(15, 149, 104, 0.08)',
                  border: '1px solid #0F9568',
                  boxShadow: 'inset 0 0 0 3px #061D15',
                }}
              >
                <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(250,250,242,0.06)' }}>
                  <div className="flex items-center gap-3">
                    <img
                      src={active.identity.photo}
                      alt={active.identity.name}
                      className="w-10 h-10 rounded-full object-cover"
                      style={{ border: '1px solid rgba(15,149,104,0.4)' }}
                    />
                    <div>
                      <p className="text-base font-semibold text-cream">{active.identity.name}</p>
                      <p className="text-xs text-cream/40">{active.identity.location}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald"
                      />
                      <span className="text-[9px] text-cream/40 uppercase tracking-widest">Live</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: 'none' }}>
                  <div>
                    <p className="text-[11px] font-semibold text-cream/40 uppercase tracking-[0.15em] mb-3">Behavioral Signals</p>
                    <div className="space-y-2.5">
                      {active.signals.map((s, i) => (
                        <motion.div
                          key={s.key}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.45 }}
                          className="flex items-center gap-2.5"
                        >
                          <span className="text-xs w-4 text-center text-emerald/70">{s.icon}</span>
                          <span className="text-sm text-cream/40 w-14 flex-shrink-0">{s.key}</span>
                          <span className="text-sm text-cream/70 font-medium">{s.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {showSignals && !showProfile && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-2 pt-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald/60" />
                      <span className="text-[10px] text-emerald/70">Building profile...</span>
                    </motion.div>
                  )}

                  {showProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASING }}
                        style={{ borderTop: '1px solid rgba(250,250,242,0.06)', paddingTop: '12px' }}
                      >
                        <p className="text-[11px] font-semibold text-cream/40 uppercase tracking-[0.15em] mb-2">Preferences</p>
                        <div className="flex flex-wrap gap-1.5">
                          {active.preferences.map((p, i) => (
                            <motion.span
                              key={p}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.15 }}
                              className="text-xs text-cream/60 px-3 py-1.5 rounded"
                              style={{
                                background: 'rgba(250,250,242,0.04)',
                                border: '1px solid rgba(250,250,242,0.08)',
                              }}
                            >
                              {p}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASING, delay: 0.2 }}
                      >
                        <p className="text-[11px] font-semibold text-cream/40 uppercase tracking-[0.15em] mb-2">Beliefs</p>
                        <div className="space-y-1.5">
                          {active.beliefs.map((b, i) => (
                            <motion.p
                              key={b}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                              className="text-sm text-cream/50 leading-relaxed"
                            >
                              "{b}"
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASING, delay: 0.4 }}
                      >
                        <p className="text-[11px] font-semibold text-cream/40 uppercase tracking-[0.15em] mb-2">Pain Points</p>
                        <div className="space-y-1.5">
                          {active.painPoints.map((pp, i) => (
                            <motion.div
                              key={pp}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
                              className="flex items-start gap-2"
                            >
                              <span className="text-xs text-cream/30 mt-px">—</span>
                              <span className="text-sm text-cream/50 leading-relaxed">{pp}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="flex-1 relative rounded overflow-hidden md:shadow-2xl"
          style={{ border: !isMobile ? '1px solid #0F9568' : 'none' }}
        >
          <AnimatePresence mode="wait">
            {showImage && isMobile && active.mobileVideo ? (
              <motion.video
                key={`vid-${activeIdx}`}
                src={active.mobileVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                transition={{ duration: 0.8, ease: EASING }}
              />
            ) : showImage ? (
              <motion.img
                key={`img-${activeIdx}`}
                src={active.image}
                alt={active.label}
                className="w-full h-full object-cover object-top"
                initial={{ opacity: 0, filter: 'blur(12px) brightness(0.5)' }}
                animate={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                exit={{ opacity: 0, filter: 'blur(12px) brightness(0.3)', transition: { duration: 0.6 } }}
                transition={{ duration: 0.8, ease: EASING }}
              />
            ) : null}
          </AnimatePresence>

          {!showImage && (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-sm text-cream/30 tracking-wide"
              >
                {isTransitioning ? 'Rebuilding experience...' : 'Awaiting segment...'}
              </motion.div>
            </div>
          )}

          {showImage && !isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASING }}
              className="absolute top-[10%] right-5 flex flex-col items-end gap-3"
            >
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3">
                <img src={active.identity.photo} alt="" className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <p
                    className="text-xs font-bold leading-tight flex items-center gap-1.5"
                    style={{ color: '#061D15', textShadow: '0 0 8px rgba(250,250,242,0.85)' }}
                  >
                    <span style={{ fontSize: '14px', filter: 'drop-shadow(0 0 4px rgba(15,149,104,0.6))' }}>✦</span>
                    {active.identity.name.split(' ')[0]}'s Experience
                  </p>
                  <p
                    className="text-[10px] font-semibold leading-tight mt-0.5"
                    style={{ color: '#061D15', textShadow: '0 0 8px rgba(250,250,242,0.85)' }}
                  >
                    {active.profile.segment}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
