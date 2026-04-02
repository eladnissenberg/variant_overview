import { Starfield } from './Starfield'
import { GrainOverlay } from './GrainOverlay'

export function DeckShell({ children }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: '#131320' }}>
      {/* Starfield particles — same as website */}
      <Starfield starCount={80} />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Grain overlay — same as website */}
      <GrainOverlay opacity={0.035} />
    </div>
  )
}
