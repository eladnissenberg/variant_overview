import { useState } from 'react'
import { DeckShell } from './components/DeckShell'
import { SlideTransition } from './components/SlideTransition'
import { SlideProgress } from './components/SlideProgress'
import { EmailGate } from './components/EmailGate'
import { useSlideNavigation } from './hooks/useSlideNavigation'
import { slides } from './slides'

export default function App() {
  const [hasAccess, setHasAccess] = useState(false)
  const { currentSlide, direction, totalSlides } = useSlideNavigation(slides.length)

  if (!hasAccess) {
    return <EmailGate onAccess={() => setHasAccess(true)} />
  }

  const SlideComponent = slides[currentSlide]

  return (
    <DeckShell>
      <SlideTransition slideKey={currentSlide} direction={direction}>
        <SlideComponent />
      </SlideTransition>
      <SlideProgress current={currentSlide} total={totalSlides} />
    </DeckShell>
  )
}
