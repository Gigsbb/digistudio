import { useLanguage } from '@/lib/language'
import { LanguageSelector } from '@/components/ui/language-selector'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import { ContactButton } from './Buttons'

const navLinks = ['about', 'price', 'projects', 'contact'] as const

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" delay={0} y={-20} className="relative z-30 flex justify-between px-6 pt-6 md:px-10 md:pt-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-xs font-medium tracking-wide sm:text-sm sm:tracking-wider text-[#D7E2EA] uppercase transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {t[link]}
          </a>
        ))}
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full text-center text-[13vw] leading-none font-black tracking-tight whitespace-nowrap uppercase sm:mt-4 sm:text-[14vw] md:-mt-5 md:text-[15vw] lg:text-[15.5vw]">
            DigitalHub
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-center justify-between gap-2 px-5 pb-7 sm:gap-4 sm:px-6 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <LanguageSelector />
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="[&_a]:px-4 sm:[&_a]:px-10 md:[&_a]:px-12">
          <ContactButton />
        </FadeIn>
      </div>

      <div className="absolute top-1/2 left-1/2 z-10 w-[min(300px,80vw)] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[min(66vh,80vw)] sm:translate-y-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet strength={1.6} maxOffset={200}>
            <img src="/img/head.webp" alt="DigitalHub 3D character portrait" className="block w-full" />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}
