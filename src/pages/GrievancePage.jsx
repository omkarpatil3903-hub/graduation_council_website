import { useState } from 'react'
import { IconBuilding, IconCheck, IconHeart, IconLightBulb, IconUsers } from '../components/Icons'
import { useLang } from '../context/LangContext'
import { useScrollReveal } from '../hooks/useAnimations'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  category: '',
  details: '',
  desiredResolution: '',
}

const categoryIcons = [IconUsers, IconBuilding, IconHeart, IconLightBulb]

export default function GrievancePage() {
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
    if (!formData.fullName.trim()) next.fullName = t.grievance.errName
    if (!formData.email.trim()) next.email = t.grievance.errEmail
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = t.grievance.errEmailInvalid
    }
    if (!formData.department.trim()) next.department = t.grievance.errDept
    if (!formData.category.trim()) next.category = t.grievance.errCategory
    if (!formData.details.trim()) next.details = t.grievance.errDetails
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
        body: JSON.stringify({ ...formData, formType: 'grievance' }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || 'Request failed')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t.grievance.errorMsg)
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
      <section className="bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">{t.grievance.tag}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{t.grievance.heroTitle}</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">{t.grievance.heroDesc}</p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.grievance.categoriesTag}</p>
            <h2 className="mt-2">{t.grievance.categoriesTitle}</h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.grievance.categories.map((item, idx) => {
              const Ico = categoryIcons[idx] || IconUsers
              return (
                <article key={item.title} className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Ico className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.grievance.processTag}</p>
            <h2 className="mt-2">{t.grievance.processTitle}</h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.grievance.process.map((step, idx) => (
              <article key={step.title} className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">0{idx + 1}</p>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 md:p-10">
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{t.grievance.formTitle}</h3>
            <p className="mt-2 text-sm text-slate-600">{t.grievance.formDesc}</p>

            <form className="mt-7 grid gap-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label={t.grievance.labelName} name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required placeholder={t.grievance.placeName} />
                <FormField label={t.grievance.labelEmail} name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required placeholder={t.grievance.placeEmail} />
                <FormField label={t.grievance.labelPhone} name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder={t.grievance.placePhone} />
                <FormField label={t.grievance.labelDept} name="department" value={formData.department} onChange={handleChange} error={errors.department} required placeholder={t.grievance.placeDept} />
              </div>

              <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                <span>
                  {t.grievance.labelCategory}
                  <span className="ml-1 text-rose-500">*</span>
                </span>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition ${
                    errors.category
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                  }`}
                >
                  <option value="">{t.grievance.placeCategory}</option>
                  {t.grievance.categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.category && <span className="text-xs text-rose-600">{errors.category}</span>}
              </label>

              <FormField
                label={t.grievance.labelDetails}
                name="details"
                value={formData.details}
                onChange={handleChange}
                error={errors.details}
                required
                multiline
                placeholder={t.grievance.placeDetails}
              />

              <FormField
                label={t.grievance.labelResolution}
                name="desiredResolution"
                value={formData.desiredResolution}
                onChange={handleChange}
                error={errors.desiredResolution}
                multiline
                placeholder={t.grievance.placeResolution}
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              >
                {submitting ? t.grievance.submittingBtn : t.grievance.submitBtn}
              </button>

              {submitted && (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {t.grievance.successMsg}
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

      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.grievance.assuranceTag}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{t.grievance.assuranceTitle}</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.grievance.assurances.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

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