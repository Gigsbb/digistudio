import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage, type Language } from '@/lib/language'

const languages = [
  { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
  { code: 'ka' as Language, label: 'ქართული', flag: '🇬🇪' },
]

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const selected = languages.find(item => item.code === language)!
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const options = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()
  const reduceMotion = useReducedMotion()

  const close = (restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) trigger.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    const onFocus = (event: FocusEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('focusin', onFocus)
    options.current[languages.findIndex(item => item.code === language)]?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('focusin', onFocus)
    }
  }, [open, language])

  return (
    <div ref={ref} className="relative z-50 inline-block" onKeyDown={event => {
      if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); close(true) }
    }}>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={`${t.selectLanguage}: ${selected.label}`}
        onClick={() => setOpen(value => !value)}
        onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true) }
        }}
        className="flex min-h-11 items-center gap-2 rounded-full border border-[#D7E2EA]/25 bg-[#171717]/90 px-3 py-2 text-sm font-medium text-[#D7E2EA] shadow-lg backdrop-blur-xl transition-colors hover:border-[#D7E2EA]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] sm:px-4 sm:text-base"
      >
        <span aria-hidden="true">{selected.flag}</span>
        <span lang={language}>{selected.label}</span>
        <ChevronDown aria-hidden="true" className={cn('h-4 w-4 text-[#D7E2EA]/60 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute bottom-full left-0 mb-3 w-56 max-w-[calc(100vw-3rem)] origin-bottom-left overflow-hidden rounded-2xl border border-neutral-700/80 bg-neutral-900/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            <div className="mb-1 flex items-center justify-between border-b border-neutral-800 px-3 py-1.5 text-xs font-semibold tracking-wide text-neutral-400">
              <span>{t.selectLanguage}</span>
              <button type="button" aria-label={t.close} onClick={() => close(true)} className="flex size-8 items-center justify-center rounded-lg hover:text-white focus-visible:outline-2 focus-visible:outline-white">
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div id={id} role="listbox" aria-label={t.selectLanguage}>
              {languages.map((item, index) => (
                <button
                  key={item.code}
                  ref={element => { options.current[index] = element }}
                  type="button"
                  role="option"
                  aria-selected={language === item.code}
                  lang={item.code}
                  onClick={() => { setLanguage(item.code); close(true) }}
                  onKeyDown={event => {
                    let next = index
                    if (event.key === 'ArrowDown') next = (index + 1) % languages.length
                    else if (event.key === 'ArrowUp') next = (index - 1 + languages.length) % languages.length
                    else if (event.key === 'Home') next = 0
                    else if (event.key === 'End') next = languages.length - 1
                    else return
                    event.preventDefault()
                    options.current[next]?.focus()
                  }}
                  className={cn('relative flex min-h-11 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#D7E2EA]', language === item.code ? 'bg-[#D7E2EA]/10 font-medium text-white' : 'text-neutral-300 hover:bg-white/5')}
                >
                  <span aria-hidden="true" className="text-base">{item.flag}</span>
                  <span className="flex-1">{item.label}</span>
                  {language === item.code && <Check aria-hidden="true" className="size-4 text-[#D7E2EA]" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
