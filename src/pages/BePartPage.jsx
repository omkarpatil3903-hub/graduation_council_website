import { useState } from 'react'
import { IconCheck, IconChevronDown } from '../components/Icons'
import { useLang } from '../context/LangContext'
import { useScrollReveal } from '../hooks/useAnimations'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  degreeProgram: '',
  yearOfStudy: '',
  interests: '',
  contribution: '',
}

export default function BePartPage() {
  const revealRef = useScrollReveal()
  const { t } = useLang()
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validateForm() {
    const next = {}
    if (!formData.fullName.trim()) next.fullName = t.bePart.errName
    if (!formData.email.trim()) next.email = t.bePart.errEmail
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = t.bePart.errEmailInvalid
    }
    if (!formData.department.trim()) next.department = t.bePart.errDept
    if (!formData.degreeProgram.trim()) next.degreeProgram = t.bePart.errDegree
    if (!formData.interests.trim()) next.interests = t.bePart.errInterests
    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const next = validateForm()

    if (Object.keys(next).length > 0) {
      setErrors(next)
      setSubmitted(false)
      setSubmitError('')
      return
    }

    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'membership' }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || 'Request failed')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t.bePart.errorMsg)
      setSubmitted(false)
      setSubmitting(false)
      return
    }

    setErrors({})
    setSubmitted(true)
    setFormData(initialForm)
    setSubmitting(false)
  }

  return (
    <div ref={revealRef}>
      {/* ═══ Page Hero ═══ */}
      <section className="bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">{t.bePart.tag}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{t.bePart.heroTitle}</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">{t.bePart.heroDesc}</p>
        </div>
      </section>

      {/* ═══ Benefits ═══ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.bePart.benefitsTag}</p>
            <h2 className="mt-2">{t.bePart.benefitsTitle}</h2>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
            {t.bePart.benefits.map((b) => (
              <div key={b} className="animate-on-scroll flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <IconCheck className="h-3 w-3" />
                </span>
                <p className="text-sm leading-relaxed text-slate-600">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Registration Form ═══ */}
      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{t.bePart.formTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {t.bePart.formRequired} <span className="text-rose-500">*</span> {t.bePart.formRequiredEnd}
            </p>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label={t.bePart.labelName} name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
                <FormField label={t.bePart.labelEmail} name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
                <FormField label={t.bePart.labelPhone} name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} />
                <FormField label={t.bePart.labelDept} name="department" value={formData.department} onChange={handleChange} error={errors.department} required />
                <FormField label={t.bePart.labelDegree} name="degreeProgram" value={formData.degreeProgram} onChange={handleChange} error={errors.degreeProgram} required placeholder={t.bePart.placeDegree} />
                <FormField label={t.bePart.labelYear} name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} error={errors.yearOfStudy} placeholder={t.bePart.placeYear} />
              </div>

              <FormField
                label={t.bePart.labelInterests}
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                error={errors.interests}
                required
                multiline
                placeholder={t.bePart.placeInterests}
              />

              <FormField
                label={t.bePart.labelContrib}
                name="contribution"
                value={formData.contribution}
                onChange={handleChange}
                error={errors.contribution}
                multiline
                placeholder={t.bePart.placeContrib}
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              >
                {submitting ? t.bePart.submittingBtn : t.bePart.submitBtn}
              </button>

              {submitted && (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {t.bePart.successMsg}
                </p>
              )}
              {submitError && (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {submitError}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.bePart.faqTag}</p>
            <h2 className="mt-2">{t.bePart.faqTitle}</h2>
          </div>

          <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-gray-50">
            {t.bePart.faqs.map((faq) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-800 transition hover:bg-gray-100 active:bg-gray-200 sm:px-6 sm:py-5"
      >
        {question}
        <IconChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
          {answer}
        </div>
      )}
    </div>
  )
}

/* ─── Form Field ─── */
function FormField({ label, name, value, onChange, error, type = 'text', required = false, multiline = false, placeholder = '' }) {
  const base =
    'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition'
  const borderClass = error
    ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
    : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'

  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
      <span>
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>
      {multiline ? (
        <textarea name={name} value={value} onChange={onChange} className={`${base} ${borderClass}`} rows={4} placeholder={placeholder} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} className={`${base} ${borderClass}`} placeholder={placeholder} />
      )}
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </label>
  )
}
