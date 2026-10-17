import { useLanguage } from '@/lib/language'
import FadeIn from './FadeIn'

export default function ServicesSection() {
  const { t } = useLanguage()
  const services = t.serviceNames.map((name, i) => ({ name, description: t.serviceDescriptions[i] }))
  return (
    <section
      id="price"
      className="rounded-t-[40px] bg-[#FFFFFF] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="mb-16 text-center leading-none font-black tracking-tight text-[#0C0C0C] uppercase sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {t.services}
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, i) => (
          <FadeIn
            key={service.name}
            delay={i * 0.1}
            className="flex items-center gap-6 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="shrink-0 leading-none font-black text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2 text-[#0C0C0C]">
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {service.name}
              </h3>
              <p
                className="max-w-2xl leading-relaxed font-light"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
