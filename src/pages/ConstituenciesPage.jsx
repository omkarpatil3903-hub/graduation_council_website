import {
  IconAcademic,
  IconBriefcase,
  IconBuilding,
  IconCheck,
  IconGlobe,
  IconHeart,
  IconUsers,
} from '../components/Icons'
import { useLang } from '../context/LangContext'
import { useScrollReveal } from '../hooks/useAnimations'

const constituencyIcons = [IconAcademic, IconBuilding, IconGlobe, IconUsers, IconHeart, IconBriefcase]
const channelIcons = [IconUsers, IconAcademic, IconBuilding]

export default function ConstituenciesPage() {
  const revealRef = useScrollReveal()
  const { t } = useLang()

  return (
    <div ref={revealRef}>
      <section className="bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">{t.constituencies.tag}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{t.constituencies.heroTitle}</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">{t.constituencies.heroDesc}</p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.constituencies.groupsTag}</p>
            <h2 className="mt-2">{t.constituencies.groupsTitle}</h2>
            <p>{t.constituencies.groupsDesc}</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.constituencies.groups.map((group, idx) => {
              const Ico = constituencyIcons[idx] || IconUsers
              return (
                <article key={group.title} className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Ico className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{group.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.constituencies.channelTag}</p>
            <h2 className="mt-2">{t.constituencies.channelTitle}</h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {t.constituencies.channels.map((channel, idx) => {
              const Ico = channelIcons[idx] || IconUsers
              return (
                <article key={channel.title} className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Ico className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{channel.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{channel.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{t.constituencies.prioritiesTag}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{t.constituencies.prioritiesTitle}</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.constituencies.priorities.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3">
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