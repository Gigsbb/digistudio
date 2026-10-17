import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Language = 'en' | 'ka'
const copy = {
  en: {
    about: 'About', price: 'Price', projects: 'Projects', contact: 'Contact', home: 'Home',
    aboutTitle: 'About me',
    aboutText: "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
    contactMe: 'Contact Me', liveProject: 'Live Project', services: 'Services', projectTitle: 'Project',
    navigation: 'Navigation', socialLinks: 'Social Links', rights: 'All rights reserved.',
    selectLanguage: 'Select language', close: 'Close language menu', newTab: 'opens in a new tab',
    categories: ['Pest Control', 'Digital Menu', 'Catering', 'E-commerce Demo'],
    serviceNames: ['Branding', 'Web Design & Development', 'Social Media Management', 'Digital Advertising', 'Google Business Profile'],
    serviceDescriptions: [
      'Logo design, color palettes, and a consistent visual identity that reflects your business and helps customers recognize your brand.',
      'Modern business websites, online stores, and QR menus with custom designs tailored to your business and built for desktop and mobile.',
      'Facebook and Instagram page management, content planning, and post creation to give your business an active and consistent online presence.',
      'Planning and management of Facebook and Instagram advertising campaigns to reach relevant audiences and promote your products and services.',
      'Profile setup and management, Google Maps listings, and updates to your address, opening hours, and contact details so customers can easily find your business.',
    ],
  },
  ka: {
    about: 'ჩვენ შესახებ', price: 'სერვისები', projects: 'პროექტები', contact: 'კონტაქტი', home: 'მთავარი',
    aboutTitle: 'ჩემ შესახებ',
    aboutText: 'დიზაინში ხუთ წელზე მეტი გამოცდილებით, ვმუშაობ ბრენდინგზე, ვებდიზაინსა და მომხმარებლის გამოცდილებაზე. სიამოვნებით ვთანამშრომლობ ბიზნესებთან, რომლებსაც გამორჩევა და საკუთარი თავის საუკეთესოდ წარმოჩენა სურთ. მოდი, ერთად შევქმნათ რაღაც განსაკუთრებული!',
    contactMe: 'დამიკავშირდი', liveProject: 'საიტის ნახვა', services: 'სერვისები', projectTitle: 'პროექტები',
    navigation: 'ნავიგაცია', socialLinks: 'სოციალური ქსელები', rights: 'ყველა უფლება დაცულია.',
    selectLanguage: 'აირჩიე ენა', close: 'ენის მენიუს დახურვა', newTab: 'იხსნება ახალ ჩანართში',
    categories: ['მავნებლების კონტროლი', 'ციფრული მენიუ', 'ქეითერინგი', 'ონლაინ მაღაზიის დემო'],
    serviceNames: ['ბრენდინგი', 'ვებდიზაინი და დეველოპმენტი', 'სოციალური მედიის მართვა', 'ციფრული რეკლამა', 'Google ბიზნესპროფილი'],
    serviceDescriptions: [
      'ლოგოს დიზაინი, ფერთა პალიტრა და ერთიანი ვიზუალური სტილი, რომელიც შენს ბიზნესს ასახავს და მომხმარებლებს ბრენდის ამოცნობაში ეხმარება.',
      'თანამედროვე ბიზნესსაიტები, ონლაინ მაღაზიები და QR მენიუები — შენი ბიზნესის საჭიროებებზე მორგებული დიზაინით, კომპიუტერისა და მობილურისთვის.',
      'Facebook და Instagram გვერდების მართვა, კონტენტის დაგეგმვა და პოსტების მომზადება შენი ბიზნესის აქტიური და თანმიმდევრული ონლაინ კომუნიკაციისთვის.',
      'Facebook-ისა და Instagram-ის სარეკლამო კამპანიების დაგეგმვა და მართვა შესაბამის აუდიტორიასთან დასაკავშირებლად და შენი პროდუქტებისა და სერვისების წარმოსაჩენად.',
      'Google ბიზნესპროფილის შექმნა და მართვა, Google Maps-ზე დამატება და მისამართის, სამუშაო საათებისა და საკონტაქტო ინფორმაციის განახლება, რომ მომხმარებლებმა მარტივად გიპოვონ.',
    ],
  },
}

const LanguageContext = createContext({ language: 'en' as Language, setLanguage: (_language: Language) => {}, t: copy.en })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('digitalhub-language') === 'ka' ? 'ka' : 'en' } catch { return 'en' }
  })
  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem('digitalhub-language', language) } catch { /* Storage can be disabled. */ }
  }, [language])
  return <LanguageContext.Provider value={{ language, setLanguage, t: copy[language] }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
