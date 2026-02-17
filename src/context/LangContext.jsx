/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { en } from '../i18n/en'
import { mr } from '../i18n/mr'

const translations = { en, mr }

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  function toggleLang() {
    setLang((prev) => (prev === 'en' ? 'mr' : 'en'))
  }

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
