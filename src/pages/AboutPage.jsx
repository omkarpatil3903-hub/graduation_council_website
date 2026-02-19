import { useState } from "react";
import {
  IconAcademic,
  IconBriefcase,
  IconCheck,
  IconGlobe,
  IconHeart,
} from "../components/Icons";
import { useLang } from "../context/LangContext";
import { useScrollReveal } from "../hooks/useAnimations";

/* ─── Icon mapping for focus areas ─── */
const focusIcons = [IconAcademic, IconBriefcase, IconHeart, IconGlobe];

/* ─── Page ─── */
export default function AboutPage() {
  const revealRef = useScrollReveal();
  const { t } = useLang();
  const [imageErrors, setImageErrors] = useState({});

  function getInitials(name = "") {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  return (
    <div ref={revealRef}>
      {/* ═══ Page Hero ═══ */}
      <section className="bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">
            {t.about.tag}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            {t.about.heroTitle}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">
            {t.about.heroDesc}
          </p>
        </div>
      </section>

      {/* ═══ Mission / Vision / Values ═══ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="animate-on-scroll rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                {t.about.missionHead}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {t.about.missionText}
              </p>
            </article>
            <article className="animate-on-scroll rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                {t.about.visionHead}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {t.about.visionText}
              </p>
            </article>
          </div>

          <div className="animate-on-scroll mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:mt-10 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900">
              {t.about.valuesHead}
            </h3>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
              {t.about.leaderTag}
            </p>
            <h2 className="mt-2">{t.about.leaderTitle}</h2>
            <p>{t.about.leaderDesc}</p>
          </div>

          <div className="mt-14 flex justify-center">
            {t.about.leadership.map((member) => (
              <article
                key={member.name}
                className="animate-on-scroll w-full max-w-4xl rounded-2xl border border-primary-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
              >
                <div className="grid gap-6 md:grid-cols-[220px,1fr] md:gap-8">
                  <div className="mx-auto w-full max-w-[220px]">
                    <div className="overflow-hidden rounded-2xl border border-primary-100 bg-primary-50 shadow-sm">
                      {imageErrors[member.name] ? (
                        <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-4xl font-bold text-primary-700">
                          {getInitials(member.name)}
                        </div>
                      ) : (
                        <img
                          src={member.image || "/founder-sankalp.jpeg"}
                          alt={member.name}
                          className="aspect-[3/4] w-full object-cover"
                          onError={() =>
                            setImageErrors((prev) => ({ ...prev, [member.name]: true }))
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                      {member.role}
                    </p>
                    <h4 className="mt-1 text-2xl font-bold text-slate-900">
                      {member.name}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {member.bio}
                    </p>
                  {Array.isArray(member.highlights) &&
                    member.highlights.length > 0 && (
                      <ul className="mt-5 space-y-2 text-left text-sm text-slate-700">
                        {member.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-6 inline-block text-sm font-semibold text-primary-600 hover:underline"
                    >
                      {member.email}
                    </a>

                    {member.profileUrl && (
                      <a
                        href={member.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-4 inline-block text-sm font-semibold text-primary-600 hover:underline"
                      >
                        {t.about.readJourney}
                      </a>
                    )}
                  </div>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
              {t.about.focusTag}
            </p>
            <h2 className="mt-2">{t.about.focusTitle}</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {t.about.focusAreas.map((area, idx) => {
              const Ico = focusIcons[idx] || IconAcademic;
              return (
                <article
                  key={area.title}
                  className="animate-on-scroll flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:gap-5 sm:p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Ico className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      {area.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      {area.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Timeline ═══ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll section-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
              {t.about.timelineTag}
            </p>
            <h2 className="mt-2">{t.about.timelineTitle}</h2>
          </div>

          <div className="relative mt-14">
            {/* vertical line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-primary-200 sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-10">
              {t.about.milestones.map((m, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={m.year}
                    className={`animate-on-scroll relative flex flex-col sm:flex-row ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* dot */}
                    <div className="absolute left-4 top-1 z-10 h-3 w-3 rounded-full border-2 border-primary-600 bg-white sm:left-1/2 sm:-translate-x-1.5" />

                    {/* content */}
                    <div
                      className={`ml-10 sm:ml-0 sm:w-1/2 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}
                    >
                      <span className="text-sm font-bold text-primary-600">
                        {m.year}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {m.event}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
