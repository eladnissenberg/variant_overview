import { DeckShell } from './components/DeckShell'
import { SlideTransition } from './components/SlideTransition'
import { SlideProgress } from './components/SlideProgress'
import { useSlideNavigation } from './hooks/useSlideNavigation'
import { slides } from './slides'

export default function App() {
  const { currentSlide, direction, totalSlides } = useSlideNavigation(slides.length)

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
