import { useLanguage } from '@/lib/language-context'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import { ContactButton } from './Buttons'

const navLinks = ['About', 'Price', 'Projects', 'Contact']

export default function HeroSection() {
  const { t, language, setLanguage } = useLanguage()
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" delay={0} y={-20} className="relative z-30 flex flex-wrap items-center justify-between gap-x-3 gap-y-4 px-6 pt-6 md:px-10 md:pt-8">
        {navLinks.map((link) => (
          <a
            key={t(link)}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-medium tracking-wider text-[#D7E2EA] uppercase transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {t(link)}
          </a>
        ))}
        <div role="group" aria-label={language === 'ka' ? 'ენის არჩევა' : 'Choose language'} className="flex gap-1 rounded-full border border-[#D7E2EA]/40 p-1">
          {(['ka', 'en'] as const).map((code) => (
            <button key={code} type="button" lang={code} aria-label={code === 'ka' ? 'ქართული' : 'English'} aria-pressed={language === code} onClick={() => setLanguage(code)} className={`rounded-full px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${language === code ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'text-[#D7E2EA] hover:bg-white/10'}`}>
              {code === 'ka' ? 'ქარ' : 'EN'}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full text-center text-[13vw] leading-none font-black tracking-tight whitespace-nowrap uppercase sm:mt-4 sm:text-[14vw] md:-mt-5 md:text-[15vw] lg:text-[15.5vw]">
            DigitalHub
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] leading-snug font-light tracking-wide text-[#D7E2EA] uppercase sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {t('a 3d creator driven by crafting striking and unforgettable projects')}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="absolute top-1/2 left-1/2 z-10 w-[min(300px,80vw)] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[min(66vh,80vw)] sm:translate-y-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet strength={1.6} maxOffset={200}>
            <img src="/img/head.webp" alt={t('DigitalHub 3D character portrait')} className="block w-full" />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}
