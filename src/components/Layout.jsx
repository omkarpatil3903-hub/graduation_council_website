import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { IconClose, IconMail, IconMenu } from './Icons'

const navKeys = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
  { to: '/be-a-part', key: 'bePart' },
]

const footerKeys = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
  { to: '/be-a-part', key: 'bePart' },
]

function desktopNavClass({ isActive }) {
  return isActive
    ? 'relative py-2 text-sm font-semibold text-primary-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-600'
    : 'relative py-2 text-sm font-medium text-slate-600 transition hover:text-primary-700'
}

function mobileNavClass({ isActive }) {
  return isActive
    ? 'block rounded-lg bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-700'
    : 'block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-gray-100'
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t, toggleLang } = useLang()

  // Close mobile nav on route change
  const pathnameRef = location.pathname
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathnameRef])

  // Reset mobile menu when route changes
  useEffect(() => {
    return () => setMobileOpen(false)
  }, [pathnameRef])

  // Track scroll for sticky header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ─── Header ─── */}
      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-md border-gray-200' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / brand */}
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
              GC
            </span>
            <div className="hidden sm:block">
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                {t.nav.brandTag}
              </p>
              <p className="text-sm font-semibold leading-tight text-slate-900">{t.nav.brandShort}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navKeys.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={desktopNavClass}>
                {t.nav[item.key]}
              </NavLink>
            ))}
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary-400 hover:text-primary-700"
              aria-label="Toggle language"
            >
              {t.nav.langToggle}
            </button>
            <Link
              to="/be-a-part"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
            >
              {t.nav.joinNow}
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-gray-100 active:bg-gray-200 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-100 bg-white px-4 pb-6 pt-2 md:hidden" aria-label="Mobile navigation">
            <div className="space-y-1">
              {navKeys.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className={mobileNavClass}>
                  {t.nav[item.key]}
                </NavLink>
              ))}
              {/* Mobile language toggle */}
              <button
                onClick={toggleLang}
                className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-primary-600 hover:bg-gray-100"
              >
                {t.nav.langToggle}
              </button>
              {/* Mobile Join Now */}
              <Link
                to="/be-a-part"
                className="mt-2 block w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
              >
                {t.nav.joinNow}
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* ─── Main ─── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-200 bg-navy-900 text-gray-300">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-3 lg:px-8">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
                GC
              </span>
              <span className="text-base font-semibold text-white sm:text-lg">{t.nav.brandTag}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:mt-4">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {footerKeys.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-gray-400 transition hover:text-white">
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                council@graduatecouncil.org
              </li>
              <li>Graduate Affairs Block, Room 204</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} {t.nav.brandTag}. {t.footer.rights}</p>
            <p>
              <Link to="/contact" className="hover:text-gray-300">{t.footer.privacy}</Link>
              <span className="mx-2">·</span>
              <Link to="/contact" className="hover:text-gray-300">{t.footer.terms}</Link>
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Scroll-to-top FAB ─── */}
      <ScrollToTop />
    </div>
  )
}

function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition hover:bg-primary-700 active:scale-95 sm:bottom-6 sm:right-6 sm:h-10 sm:w-10"
      aria-label="Scroll to top"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  )
}
