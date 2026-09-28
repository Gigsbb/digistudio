import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const IDLE_RESET_MS = 1500
const SCROLLBAR_ZONE_PX = 16

type MagnetProps = {
  children: ReactNode
  /** Divides the cursor's distance from the element's centre; lower = follows further */
  strength?: number
  /** Maximum travel in px on each axis */
  maxOffset?: number
  className?: string
}

export default function Magnet({ children, strength = 1.6, maxOffset = 260, className }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // Stiff, lightly damped spring: reacts immediately, settles without wobble
  const springX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 })

  useEffect(() => {
    const clamp = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v))
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    const reset = () => {
      clearTimeout(idleTimer)
      x.set(0)
      y.set(0)
    }

    // Only follow the cursor while the element is on screen, so it's centred when scrolled back to
    let inView = true
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (!inView) reset()
    })
    if (ref.current) observer.observe(ref.current)

    let pointer: { x: number; y: number } | null = null
    const follow = () => {
      const el = ref.current
      if (!el || !inView || !pointer) return
      // Measure the untransformed box so the element's own movement doesn't skew the maths
      const { left, top, width, height } = el.getBoundingClientRect()
      x.set(clamp((pointer.x - (left + width / 2)) / strength))
      y.set(clamp((pointer.y - (top + height / 2)) / strength))
      // Hold the pose for a moment once the cursor and page go still, then ease back to centre
      clearTimeout(idleTimer)
      idleTimer = setTimeout(reset, IDLE_RESET_MS)
    }
    const onMove = (e: MouseEvent) => {
      // clientWidth excludes the page scrollbar; the fallback covers overlay scrollbars that take no width
      const scrollbarEdge = Math.min(document.documentElement.clientWidth, window.innerWidth - SCROLLBAR_ZONE_PX)
      if (e.clientX >= scrollbarEdge) {
        // Cursor is on the scrollbar: stop following, and don't re-aim at it while dragging to scroll
        pointer = null
        reset()
        return
      }
      pointer = { x: e.clientX, y: e.clientY }
      follow()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    // Scrolling doesn't fire mousemove, so re-aim at the last known cursor position
    window.addEventListener('scroll', follow, { passive: true })
    document.documentElement.addEventListener('mouseleave', reset)
    window.addEventListener('blur', reset)
    return () => {
      clearTimeout(idleTimer)
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', follow)
      document.documentElement.removeEventListener('mouseleave', reset)
      window.removeEventListener('blur', reset)
    }
  }, [strength, maxOffset, x, y])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x: springX, y: springY, willChange: 'transform' }}>{children}</motion.div>
    </div>
  )
}
