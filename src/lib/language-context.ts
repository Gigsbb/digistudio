import { createContext, useContext } from 'react'
export type Language = 'ka' | 'en'
export const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  t: (text: string) => string
} | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage requires LanguageProvider')
  return context
}
