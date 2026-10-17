import { useLanguage } from '@/lib/language'
import type { ComponentProps, ComponentType, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { Icons } from '@/components/ui/icons'

interface FooterLink {
  title: string
  href: string
  icon?: ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Home', href: '#' },
      { title: 'About', href: '#about' },
      { title: 'Price', href: '#price' },
      { title: 'Projects', href: '#projects' },
      { title: 'Contact', href: '#contact' },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { title: 'Facebook', href: '#', icon: Icons.facebook },
      { title: 'Instagram', href: '#', icon: Icons.instagram },
      { title: 'Youtube', href: '#', icon: Icons.youtube },
      { title: 'LinkedIn', href: '#', icon: Icons.linkedin },
    ],
  },
]

export function Footer() {
  const { t } = useLanguage()
  const navLabels: Record<string, string> = { Home: t.home, About: t.about, Price: t.price, Projects: t.projects, Contact: t.contact }
  return (
    <footer className="relative flex w-full flex-col items-center justify-center border-t border-[#D7E2EA]/10 bg-[#0C0C0C] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(215,226,234,0.06),transparent)] px-6 py-12 md:px-10 lg:py-16">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7E2EA]/30 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <span
            className="hero-heading block leading-none font-black tracking-tight uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            DigitalHub
          </span>
          <p
            className="mt-8 leading-relaxed font-light text-[#D7E2EA] md:mt-4"
            style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)', opacity: 0.6 }}
          >
            © {new Date().getFullYear()} DigitalHub. {t.rights}
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
                  {section.label === 'Navigation' ? t.navigation : t.socialLinks}
                </h3>
                <ul className="mt-5 space-y-3 font-medium tracking-wider text-[#D7E2EA] uppercase">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="inline-flex items-center transition-opacity duration-200 hover:opacity-70"
                        style={{ fontSize: 'clamp(1rem, 1.6vw, 1.4rem)' }}
                      >
                        {link.icon && <link.icon className="me-3 size-[0.9em]" />}
                        {navLabels[link.title] ?? link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
