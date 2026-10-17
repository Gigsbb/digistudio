import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const projects = [
  { name: 'DigiStudio', url: 'https://digistudio.pages.dev/#about', image: '/img/websites/digistudio.svg' },
  { name: 'Defence GE', url: 'https://defence-ge.defence-ge.workers.dev/ka/', image: '/img/websites/defence.svg' },
  { name: 'QRMenus', url: 'https://qrmenus.ge/', image: '/img/websites/qrmenus.svg' },
  { name: 'Supra', url: 'https://supra-web.pages.dev/', image: '/img/websites/supra.svg' },
  { name: 'NMT Shop', url: 'https://nmtshopdemo.netlify.app/home', image: '/img/websites/nmtshop.svg' },
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
        <a
          key={`${copy}-${project.name}`}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — open website (new tab)`}
          aria-hidden={copy > 0 ? true : undefined}
          tabIndex={copy > 0 ? -1 : undefined}
          className="group relative block aspect-[14/9] w-[var(--preview-width)] shrink-0 overflow-hidden rounded-2xl bg-[#1a1a1a] outline-offset-[-3px] focus-visible:outline-2 focus-visible:outline-white"
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
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-5 pt-12 pb-4 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
            <span>{project.name}</span>
            <span aria-hidden="true">↗</span>
          </span>
        </a>
      )))}
    </div>
  )
}
