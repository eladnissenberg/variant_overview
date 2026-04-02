export function SlideProgress({ current, total }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-2 h-2 bg-white/60'
              : 'w-1.5 h-1.5 bg-white/20'
          }`}
        />
      ))}
    </div>
  )
}
