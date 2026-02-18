import { useEffect, useRef, useState } from 'react'

/**
 * Adds the `is-visible` class to `.animate-on-scroll` elements
 * inside the observed root when they enter the viewport.
 */
export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const observed = new WeakSet()

    function observeElement(element, observer) {
      if (observed.has(element) || element.classList.contains('is-visible')) return
      element.classList.add('reveal-pending')
      observed.add(element)
      observer.observe(element)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            entry.target.classList.remove('reveal-pending')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = root.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observeElement(el, observer))

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return

          if (node.classList.contains('animate-on-scroll')) {
            observeElement(node, observer)
          }

          const nested = node.querySelectorAll?.('.animate-on-scroll')
          nested?.forEach((el) => observeElement(el, observer))
        })
      })
    })

    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return ref
}

/**
 * Animates a number from 0 to `end` over `duration` ms when section is visible.
 */
export function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now()

          function step(currentTime) {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) {
              requestAnimationFrame(step)
            }
          }

          requestAnimationFrame(step)
          observer.unobserve(node)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration])

  return { ref, count }
}
