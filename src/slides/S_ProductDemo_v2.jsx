import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useViewport } from '../hooks/useViewport'

const EASING = [0.22, 1, 0.36, 1]

const profiles = [
  {
    label: 'Luxury Driven',
    color: '#DDD3F0',
    image: '/images/bmw-desktop.png',
    mobileVideo: '/images/bmw-mobile-sarah.mov',
    identity: { name: 'Sarah Mitchell', location: 'Manhattan, NY', avatar: null, photo: '/images/sarah-avatar.png' },
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
    color: '#5B7AFF',
    image: '/images/bmw-desktop-v2.png',
    mobileVideo: '/images/bmw-mobile-james.mov',
    identity: { name: 'James Chen', location: 'Austin, TX', avatar: null, photo: '/images/james-avatar.png' },
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

  // Initial animation: show first profile after a short delay, then switch after 5s
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
    <div className="w-full h-full relative flex flex-col px-4 pt-6 pb-8 md:pl-16 md:pr-24 md:pt-10 md:pb-16">
      <span className="hidden md:block absolute md:top-8 md:right-10 text-base font-semibold tracking-tight text-white/20 z-20">Variant</span>
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASING, delay: 0.1 }}
        className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-white text-left leading-tight mb-3 md:mb-6"
      >
        Real-time personalization that adapts to{' '}
        <span className="font-instrument italic font-normal tracking-normal text-lavender">
          every visitor.
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="hidden md:block text-2xl text-text-secondary/40 mb-5"
      >
        Variant analyzes real user data to automatically design, build, and deploy better experiences
      </motion.p>

      {/* Toggle buttons */}
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
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300"
            style={{
              background: activeIdx === i ? `${p.color}12` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${activeIdx === i ? `${p.color}30` : 'rgba(255,255,255,0.06)'}`,
              color: activeIdx === i ? p.color : 'rgba(255,255,255,0.3)',
            }}
          >
            {p.identity.photo && (
              <img src={p.identity.photo} alt="" className="w-4 h-4 md:w-5 md:h-5 rounded-full object-cover" />
            )}
            {p.identity.name}
            <span className="text-[10px] md:text-xs opacity-50">· {p.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Content area */}
      <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-5 min-h-0">
        {/* Left — Data card (hidden on mobile) */}
        <div className="hidden md:block md:h-full md:w-[380px] flex-shrink-0 relative">
          <AnimatePresence mode="wait">
            {showCard && (
              <motion.div
                key={`card-${activeIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: 0.6, ease: EASING }}
                className="absolute inset-0 rounded-[16px] overflow-hidden flex flex-col"
                style={{
                  background: 'linear-gradient(180deg, rgba(26,26,38,0.9) 0%, rgba(26,26,38,0.7) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
              {/* Card header */}
              <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-3">
                  {active.identity.photo ? (
                    <img
                      src={active.identity.photo}
                      alt={active.identity.name}
                      className="w-10 h-10 rounded-full object-cover"
                      style={{ border: `1px solid ${active.color}25` }}
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: `${active.color}15`, color: active.color, border: `1px solid ${active.color}25` }}
                    >
                      {active.identity.avatar}
                    </div>
                  )}
                  <div>
                    <p className="text-base font-semibold text-white">{active.identity.name}</p>
                    <p className="text-xs text-text-secondary/40">{active.identity.location}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: showProfile ? active.color : '#00D9A3' }}
                    />
                    <span className="text-[9px] text-text-secondary/30 uppercase tracking-widest">Live</span>
                  </div>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: 'none' }}>
                {/* Behavioral signals */}
                <div>
                  <p className="text-[11px] font-semibold text-text-secondary/30 uppercase tracking-[0.15em] mb-3">Behavioral Signals</p>
                  <div className="space-y-2.5">
                    {active.signals.map((s, i) => (
                      <motion.div
                        key={s.key}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.45 }}
                        className="flex items-center gap-2.5"
                      >
                        <span className="text-xs w-4 text-center" style={{ color: active.color, opacity: 0.6 }}>{s.icon}</span>
                        <span className="text-sm text-text-secondary/40 w-14 flex-shrink-0">{s.key}</span>
                        <span className="text-sm text-white/60 font-medium">{s.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Processing indicator */}
                {showSignals && !showProfile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-2 pt-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-bright/60" />
                    <span className="text-[10px] text-teal-bright/50">Building profile...</span>
                  </motion.div>
                )}

                {/* Preferences, Beliefs, Pain Points — appear with profile */}
                {showProfile && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASING }}
                      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}
                    >
                      <p className="text-[11px] font-semibold text-text-secondary/30 uppercase tracking-[0.15em] mb-2">Preferences</p>
                      <div className="flex flex-wrap gap-1.5">
                        {active.preferences.map((p, i) => (
                          <motion.span
                            key={p}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.15 }}
                            className="text-xs text-white/50 px-3 py-1.5 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
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
                      <p className="text-[11px] font-semibold text-text-secondary/30 uppercase tracking-[0.15em] mb-2">Beliefs</p>
                      <div className="space-y-1.5">
                        {active.beliefs.map((b, i) => (
                          <motion.p
                            key={b}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                            className="text-sm text-white/40 leading-relaxed"
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
                      <p className="text-[11px] font-semibold text-text-secondary/30 uppercase tracking-[0.15em] mb-2">Pain Points</p>
                      <div className="space-y-1.5">
                        {active.painPoints.map((pp, i) => (
                          <motion.div
                            key={pp}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-xs text-red-400/50 mt-px">▲</span>
                            <span className="text-sm text-white/40 leading-relaxed">{pp}</span>
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

        {/* Right — Website render */}
        <div className="flex-1 relative rounded-[16px] overflow-hidden md:border md:border-white/10 md:shadow-2xl">
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
                className="text-sm text-text-secondary/20 tracking-wide"
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
              {/* Avatar + name */}
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ border: 'none' }}
              >
                {active.identity.photo ? (
                  <img src={active.identity.photo} alt="" className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${active.color}20`, color: active.color }}>
                    {active.identity.avatar}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold leading-tight flex items-center gap-1.5" style={{ color: '#1a1a26', textShadow: '0 0 8px rgba(255,255,255,0.8)' }}>
                    <span style={{ fontSize: '14px', filter: 'drop-shadow(0 0 4px rgba(59,91,255,0.5))' }}>✦</span>
                    {active.identity.name.split(' ')[0]}'s Experience
                  </p>
                  <p className="text-[10px] font-semibold leading-tight mt-0.5" style={{ color: '#1a1a26', textShadow: '0 0 8px rgba(255,255,255,0.8)' }}>
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
