import { useState } from 'react'
import { IconMail, IconMapPin, IconPhone } from '../components/Icons'
import { useLang } from '../context/LangContext'
import { useScrollReveal } from '../hooks/useAnimations'

const contactIcons = [IconMail, IconPhone, IconMapPin]
const contactValues = [
  { value: 'council@graduatecouncil.org', href: 'mailto:council@graduatecouncil.org' },
  { value: '+91 98765 43210', href: 'tel:+919876543210' },
  { value: 'Graduate Affairs Block, Room 204', href: null },
]

export default function ContactPage() {
  const revealRef = useScrollReveal()
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const contactLabels = [t.contact.email, t.contact.phone, t.contact.office]

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSent(false)
    setSubmitError('')

    const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || import.meta.env.VITE_MEMBERSHIP_API_URL
    if (contactApiUrl) {
      setSubmitting(true)
      try {
        const response = await fetch(contactApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, formType: 'contact' }),
        })
        if (!response.ok) throw new Error('Request failed')
      } catch {
        setSubmitError(t.contact.errorMsg)
        setSubmitting(false)
        return
      }
      setSubmitting(false)
    }

    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100'

  return (
    <div ref={revealRef}>
      {/* ═══ Page Hero ═══ */}
      <section className="bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">{t.contact.tag}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{t.contact.heroTitle}</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">{t.contact.heroDesc}</p>
        </div>
      </section>

      {/* ═══ Info Cards ═══ */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:gap-6 sm:px-6 md:grid-cols-3 lg:px-8">
          {contactLabels.map((label, idx) => {
            const Ico = contactIcons[idx]
            const info = contactValues[idx]
            return (
            <article
              key={label}
              className="animate-on-scroll flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Ico className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                {info.href ? (
                  <a href={info.href} className="mt-1 block text-sm font-medium text-slate-800 hover:text-primary-600">
                    {info.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-medium text-slate-800">{info.value}</p>
                )}
              </div>
            </article>
            )
          })}
        </div>
      </section>

      {/* ═══ Contact Form + Map Placeholder ═══ */}
      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:gap-10 sm:px-6 md:grid-cols-2 lg:px-8">
          {/* Form */}
          <div className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{t.contact.formTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.contact.formDesc}</p>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder={t.contact.placeName} required className={inputClass} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t.contact.placeEmail} required className={inputClass} />
              </div>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder={t.contact.placeSubject} className={inputClass} />
              <textarea name="message" value={form.message} onChange={handleChange} placeholder={t.contact.placeMessage} rows={5} required className={inputClass} />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 sm:w-fit"
              >
                {submitting ? t.contact.submittingBtn : t.contact.sendBtn}
              </button>

              {sent && (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {t.contact.sentMsg}
                </p>
              )}
              {submitError && (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {submitError}
                </p>
              )}
            </form>
          </div>

          {/* Map placeholder */}
          <div className="animate-on-scroll flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-100 p-6 text-center shadow-sm sm:p-8">
            <IconMapPin className="h-12 w-12 text-primary-300" />
            <h4 className="mt-4 text-lg font-semibold text-slate-800">{t.contact.visitTitle}</h4>
            <p className="mt-2 text-sm text-slate-500">
              {t.contact.visitAddr}<br />
              {t.contact.visitAddr2}
            </p>
            <p className="mt-4 text-xs text-slate-400">{t.contact.visitHours}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
