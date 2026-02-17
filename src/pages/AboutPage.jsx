import { IconAcademic, IconBriefcase, IconCheck, IconGlobe, IconHeart } from '../components/Icons'
import { useLang } from '../context/LangContext'
import { useScrollReveal } from '../hooks/useAnimations'

/* ─── Icon mapping for focus areas ─── */
const focusIcons = [IconAcademic, IconBriefcase, IconHeart, IconGlobe]

/* ─── Member photos (language-independent) ─── */
const memberImages = [
  'https://i.pravatar.cc/200?img=68',  // Dr. A. Raman
  'https://i.pravatar.cc/200?img=47',  // Priya Nair
  'https://i.pravatar.cc/200?img=53',  // Rahul Menon
  'https://i.pravatar.cc/200?img=45',  // Fatima Khan
  'https://i.pravatar.cc/200?img=59',  // Arjun Das
  'https://i.pravatar.cc/200?img=44',  // Sara Iqbal
]

/* ─── Page ─── */
export default function AboutPage() {
  const revealRef = useScrollReveal()
  const { t } = useLang()

  return (
    <div ref={revealRef}>
      {/* ═══ Page Hero ═══ */}
      <section className="bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">{t.about.tag}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{t.about.heroTitle}</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">{t.about.heroDesc}</p>
        </div>
      </section>

      {/* ═══ Mission / Vision / Values ═══ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="animate-on-scroll rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{t.about.missionHead}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{t.about.missionText}</p>
            </article>
            <article className="animate-on-scroll rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{t.about.visionHead}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{t.about.visionText}</p>
            </article>
          </div>

          <div className="animate-on-scroll mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:mt-10 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900">{t.about.valuesHead}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {t.about.values.map((v) => (
                <div key={v.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800">{v.label}</p>
                    <p className="text-sm text-slate-500">{v.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Leadership ═══ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.about.leaderTag}</p>
            <h2 className="mt-2">{t.about.leaderTitle}</h2>
            <p>{t.about.leaderDesc}</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.leadership.map((member, idx) => (
              <article
                key={member.name}
                className="animate-on-scroll group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-primary-200 sm:p-6"
              >
                {/* Photo */}
                <img
                  src={memberImages[idx]}
                  alt={member.name}
                  className="mx-auto mb-4 h-20 w-20 rounded-full object-cover ring-4 ring-white shadow"
                />
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{member.role}</p>
                  <h4 className="mt-1 text-lg font-semibold text-slate-900">{member.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{member.bio}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-3 inline-block text-xs font-medium text-primary-600 hover:underline"
                  >
                    {member.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Focus Areas ═══ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.about.focusTag}</p>
            <h2 className="mt-2">{t.about.focusTitle}</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {t.about.focusAreas.map((area, idx) => {
              const Ico = focusIcons[idx] || IconAcademic
              return (
              <article
                key={area.title}
                className="animate-on-scroll flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:gap-5 sm:p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Ico className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-900">{area.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{area.text}</p>
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Timeline ═══ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.about.timelineTag}</p>
            <h2 className="mt-2">{t.about.timelineTitle}</h2>
          </div>

          <div className="relative mt-14">
            {/* vertical line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-primary-200 sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-10">
              {t.about.milestones.map((m, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <div
                    key={m.year}
                    className={`animate-on-scroll relative flex flex-col sm:flex-row ${
                      isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* dot */}
                    <div className="absolute left-4 top-1 z-10 h-3 w-3 rounded-full border-2 border-primary-600 bg-white sm:left-1/2 sm:-translate-x-1.5" />

                    {/* content */}
                    <div className={`ml-10 sm:ml-0 sm:w-1/2 ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                      <span className="text-sm font-bold text-primary-600">{m.year}</span>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{m.event}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
