import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import FadeIn from './FadeIn'
import { LiveProjectButton } from './Buttons'

const projects = [
  {
    name: 'Defence GE',
    category: 'Pest Control',
    image: '/img/websites/defence.svg',
    url: 'https://defence-ge.defence-ge.workers.dev/ka/',
  },
  {
    name: 'QRMenus',
    category: 'Digital Menu',
    image: '/img/websites/qrmenus.svg',
    url: 'https://qrmenus.ge/',
  },
  {
    name: 'Supra',
    category: 'Catering',
    image: '/img/websites/supra.svg',
    url: 'https://supra-web.pages.dev/',
  },
  {
    name: 'NMT Shop',
    category: 'E-commerce Demo',
    image: '/img/websites/nmtshop.svg',
    url: 'https://nmtshopdemo.netlify.app/home',
  },
]

type Project = (typeof projects)[number]

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 pb-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading mb-10 text-center leading-none font-black tracking-tight uppercase sm:mb-14 md:mb-16"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={ref} className="mx-auto max-w-7xl">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.03
          return (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={[i / projects.length, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
      <div id="contact" />
    </section>
  )
}

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: Project
  index: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])
  const imgRadius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

  return (
    <div className="sticky top-24 flex h-[85vh] items-start md:top-32">
      <motion.article
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full origin-top rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading leading-none font-black"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium text-[#D7E2EA] uppercase"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.url} projectName={project.name} />
        </div>

        <img
          src={project.image}
          alt={`${project.name} website preview`}
          loading="lazy"
          decoding="async"
          width={1440}
          height={926}
          className={`aspect-[1440/926] max-h-[55vh] w-full object-cover object-top ${imgRadius}`}
        />
      </motion.article>
    </div>
  )
}
