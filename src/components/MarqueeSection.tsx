import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const projects = [
  { name: 'DigiStudio', image: '/img/websites/digistudio.svg' },
  { name: 'Defence GE', image: '/img/websites/defence.svg' },
  { name: 'QRMenus', image: '/img/websites/qrmenus.svg' },
  { name: 'Supra', image: '/img/websites/supra.svg' },
  { name: 'NMT Shop', image: '/img/websites/nmtshop.svg' },
]
const secondRow = [...projects.slice(3), ...projects.slice(0, 3)]

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      setOffset(Math.max(0, Math.min(800, (window.innerHeight - el.getBoundingClientRect().top) * 0.3)))
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduceMotion])

  const movement = reduceMotion ? 0 : offset
  return (
    <section ref={ref} aria-label="Our websites" className="overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3 [--preview-width:clamp(280px,78vw,420px)]">
        <Row projects={projects} transform={`translateX(${-movement}px)`} />
        <Row projects={secondRow} transform={`translateX(calc(-5 * (var(--preview-width) + 12px) + ${movement}px))`} />
      </div>
    </section>
  )
}

function Row({ projects, transform }: { projects: typeof secondRow; transform: string }) {
  return (
    <div className="flex w-max gap-3" style={{ transform, willChange: 'transform' }}>
      {[0, 1, 2, 3].flatMap(copy => projects.map(project => (
        <div
          key={`${copy}-${project.name}`}
          aria-hidden={copy > 0 ? true : undefined}
          className="block aspect-[14/9] w-[var(--preview-width)] shrink-0 overflow-hidden rounded-2xl bg-[#1a1a1a]"
        >
          <img
            src={project.image}
            alt={`${project.name} website preview`}
            loading="lazy"
            decoding="async"
            width={1440}
            height={926}
            className="h-full w-full object-cover object-top"
          />
        </div>
      )))}
    </div>
  )
}
