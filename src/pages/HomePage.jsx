import { Link } from 'react-router-dom'
import { IconAcademic, IconArrowRight, IconBriefcase, IconGlobe, IconHeart, IconLightBulb, IconUsers } from '../components/Icons'
import { useLang } from '../context/LangContext'
import { useCountUp, useScrollReveal } from '../hooks/useAnimations'

/* ─── Icon mapping for features ─── */
const featureIcons = [IconUsers, IconAcademic, IconBriefcase, IconHeart, IconGlobe, IconLightBulb]

/* ─── Stat counter card ─── */
function StatCard({ end, suffix = '', label }) {
  const { ref, count } = useCountUp(end)
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-xs text-primary-200 sm:text-sm">{label}</p>
    </div>
  )
}

/* ─── Page ─── */
export default function HomePage() {
  const revealRef = useScrollReveal()
  const { t } = useLang()

  return (
    <div ref={revealRef}>
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900">
        {/* decorative blobs */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-700/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8 lg:py-44">
          <p className="mx-auto inline-block rounded-full border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-300 backdrop-blur">
            {t.home.heroBadge}
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            {t.home.heroDesc}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/about"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-500 sm:w-auto">
              {t.home.learnAbout}
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/be-a-part"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto">
              {t.home.bePart}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Stats bar ═══ */}
      <section className="bg-primary-700">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-4 lg:px-8">
          <StatCard end={500} suffix="+" label={t.home.statMembers} />
          <StatCard end={30} suffix="+" label={t.home.statDepts} />
          <StatCard end={50} suffix="+" label={t.home.statEvents} />
          <StatCard end={6} label={t.home.statCommittees} />
        </div>
      </section>

      {/* ═══ Mission & Vision ═══ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.home.missionTag}</p>
            <h2 className="mt-2">{t.home.missionTitle}</h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article className="animate-on-scroll rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <h3 className="text-xl font-bold text-slate-900">{t.home.missionHead}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{t.home.missionText}</p>
            </article>
            <article className="animate-on-scroll rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <h3 className="text-xl font-bold text-slate-900">{t.home.visionHead}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{t.home.visionText}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ═══ What We Do ═══ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.home.focusTag}</p>
            <h2 className="mt-2">{t.home.focusTitle}</h2>
            <p>{t.home.focusDesc}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.home.features.map((feature, idx) => {
              const Ico = featureIcons[idx] || IconUsers
              return (
              <article
                key={feature.title}
                className="animate-on-scroll group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-md hover:border-primary-200"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                  <Ico className="h-5 w-5" />
                </div>
                <h4 className="text-base font-semibold text-slate-900">{feature.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ News / Updates ═══ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.home.newsTag}</p>
            <h2 className="mt-2">{t.home.newsTitle}</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.home.news.map((item) => (
              <article
                key={item.title}
                className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="text-xs font-medium text-primary-600">{item.date}</p>
                <h4 className="mt-2 text-base font-semibold text-slate-900 leading-snug">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.excerpt}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:text-primary-700"
            >
              {t.home.newsViewAll}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{t.home.ctaTitle}</h2>
          <p className="mt-4 text-sm text-primary-200 sm:text-base">{t.home.ctaDesc}</p>
          <Link
            to="/be-a-part"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition hover:bg-primary-50"
          >
            {t.home.ctaBtn}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
