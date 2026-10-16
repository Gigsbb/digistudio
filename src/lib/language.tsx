import { useEffect, useState, useCallback, type ReactNode } from 'react'

import { LanguageContext, type Language } from './language-context'
const georgian: Record<string, string> = {
  "About": "ჩემ შესახებ",
  "Price": "ფასები",
  "Projects": "პროექტები",
  "Contact": "კონტაქტი",
  "Home": "მთავარი",
  "About me": "ჩემ შესახებ",
  "Services": "სერვისები",
  "Project": "პროექტები",
  "Contact Me": "დამიკავშირდი",
  "Live Project": "პროექტის ნახვა",
  "Navigation": "ნავიგაცია",
  "Social Links": "სოციალური ქსელები",
  "All rights reserved.": "ყველა უფლება დაცულია.",
  "a 3d creator driven by crafting striking and unforgettable projects": "3D არტისტი, რომელიც გამორჩეულ და დაუვიწყარ პროექტებს ქმნის",
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!": "დიზაინში ხუთ წელზე მეტი გამოცდილებით, ვმუშაობ ბრენდინგზე, ვებდიზაინსა და მომხმარებლის გამოცდილებაზე. სიამოვნებით ვთანამშრომლობ ბიზნესებთან, რომლებსაც სურთ გამოირჩეოდნენ და საკუთარი თავი საუკეთესოდ წარმოაჩინონ. ერთად შევქმნათ რაღაც დაუვიწყარი!",
  "3D Modeling": "3D მოდელირება",
  "Rendering": "რენდერინგი",
  "Motion Design": "მოუშენ დიზაინი",
  "Branding": "ბრენდინგი",
  "Web Design": "ვებდიზაინი",
  "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.": "დეტალური ობიექტების, პერსონაჟებისა და გარემოს შექმნა თქვენი საჭიროებების მიხედვით — თამაშებისთვის, პროდუქტებისა და ვიზუალიზაციებისთვის.",
  "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.": "მაღალი ხარისხის ფოტორეალისტური რენდერები — შერჩეული განათებით, ტექსტურებითა და მასალებით იდეების გასაცოცხლებლად.",
  "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.": "დინამიკური ანიმაციები და მოძრავი გრაფიკა, რომლებიც ბრენდებს, პროდუქტებსა და ციფრულ გამოცდილებას ენერგიასა და ამბავს მატებს.",
  "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.": "ერთიანი ვიზუალური იდენტობის შექმნა — ლოგოდან სრულ ბრენდსისტემამდე — მკაფიო და დასამახსოვრებელი იმიჯისთვის.",
  "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.": "თანამედროვე, დახვეწილი და შედეგზე ორიენტირებული ვებსაიტების დიზაინი, განლაგებაზე, ტიპოგრაფიასა და მომხმარებლის გამოცდილებაზე ზრუნვით.",
  "Client": "დამკვეთის პროექტი",
  "Personal": "პერსონალური პროექტი",
  "DigitalHub 3D character portrait": "DigitalHub-ის 3D პერსონაჟის პორტრეტი",
  "preview": "ხედი",
  "main preview": "მთავარი ხედი",
  "DigitalHub -- 3D Creator": "DigitalHub — 3D არტისტი",
  "DigitalHub — a 3D creator driven by crafting striking and unforgettable projects.": "DigitalHub — 3D არტისტი, რომელიც გამორჩეულ და დაუვიწყარ პროექტებს ქმნის."
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('digitalhub-language') === 'en' ? 'en' : 'ka' }
    catch { return 'ka' }
  })
  const t = useCallback((text: string) => language === 'ka' ? georgian[text] ?? text : text, [language])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t('DigitalHub -- 3D Creator')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('DigitalHub — a 3D creator driven by crafting striking and unforgettable projects.'))
    try { localStorage.setItem('digitalhub-language', language) } catch { /* Storage may be unavailable. */ }
  }, [language, t])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

