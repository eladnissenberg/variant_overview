import { GrainOverlay } from './GrainOverlay'

export function DeckShell({ children }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-forest">
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px z-30"
        style={{ left: 24, background: 'var(--rule)' }}
      />
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px z-30"
        style={{ right: 24, background: 'var(--rule)' }}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      <GrainOverlay opacity={0.025} />
    </div>
  )
}
