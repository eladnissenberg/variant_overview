import { useState, useEffect, useCallback } from 'react'

export function useSlideNavigation(totalSlides) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // -1 = prev, 1 = next

  const goNext = useCallback(() => {
    setCurrentSlide(prev => {
      if (prev >= totalSlides - 1) return prev
      setDirection(1)
      return prev + 1
    })
  }, [totalSlides])

  const goPrev = useCallback(() => {
    setCurrentSlide(prev => {
      if (prev <= 0) return prev
      setDirection(-1)
      return prev - 1
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          goPrev()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  useEffect(() => {
    const handleClick = (e) => {
      // Ignore clicks on interactive elements
      if (e.target.closest('a, button')) return

      const x = e.clientX
      const threshold = window.innerWidth * 0.4

      if (x < threshold) {
        goPrev()
      } else {
        goNext()
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [goNext, goPrev])

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX - touchEndX

      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext()
        else goPrev()
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev])

  return { currentSlide, direction, totalSlides }
}
