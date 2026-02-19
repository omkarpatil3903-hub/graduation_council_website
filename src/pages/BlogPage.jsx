import { useState } from 'react'
import { IconArrowRight } from '../components/Icons'
import { useScrollReveal } from '../hooks/useAnimations'
import { useLang } from '../context/LangContext'

/* ─── Authors (language-independent) ─── */
const authors = {
  council: { name: 'GSC Editorial', avatar: 'https://i.pravatar.cc/80?img=12', role: { en: 'Council Communications', mr: 'परिषद संपर्क' } },
  priya: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/80?img=47', role: { en: 'Council President', mr: 'परिषद अध्यक्ष' } },
  rahul: { name: 'Rahul Menon', avatar: 'https://i.pravatar.cc/80?img=53', role: { en: 'Vice President', mr: 'उपाध्यक्ष' } },
  sara: { name: 'Sara Iqbal', avatar: 'https://i.pravatar.cc/80?img=44', role: { en: 'Outreach Coordinator', mr: 'पोहोच समन्वयक' } },
  fatima: { name: 'Fatima Khan', avatar: 'https://i.pravatar.cc/80?img=45', role: { en: 'Secretary', mr: 'सचिव' } },
}

/* ─── Article data ─── */
const articles = [
  {
    id: 1,
    category: 'News',
    featured: true,
    date: { en: 'Feb 10, 2026', mr: '१० फेब्रु, २०२६' },
    readTime: { en: '5 min read', mr: '५ मिनिटे वाचन' },
    author: 'priya',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    title: {
      en: 'Graduate Research Symposium 2026 — Call for Papers',
      mr: 'पदव्युत्तर संशोधन परिसंवाद २०२६ — शोधनिबंध आवाहन',
    },
    excerpt: {
      en: 'Submit your abstracts by March 15 for the annual interdisciplinary research symposium hosted by the council.',
      mr: 'परिषदेने आयोजित केलेल्या वार्षिक आंतरविषय संशोधन परिसंवादासाठी १५ मार्चपर्यंत तुमचे सारांश सादर करा.',
    },
    body: {
      en: 'The Graduate Student Council is proud to announce the 2026 Graduate Research Symposium, our flagship annual event showcasing interdisciplinary scholarship. This year\'s theme, "Innovation for Impact," invites submissions spanning all graduate disciplines. Accepted papers will be featured in a published proceedings volume. Keynote speakers from leading institutions will headline the event. Early-bird registration opens February 20.',
      mr: 'पदव्युत्तर विद्यार्थी परिषद २०२६ पदव्युत्तर संशोधन परिसंवादाची घोषणा करताना अभिमान वाटतो, हा आमचा प्रमुख वार्षिक कार्यक्रम आंतरविषय शिष्यवृत्तीचे प्रदर्शन करतो. यंदाची संकल्पना "प्रभावासाठी नवोन्मेष" सर्व पदव्युत्तर विषयांमधून सबमिशन आमंत्रित करते. स्वीकृत शोधनिबंध प्रकाशित कार्यवाही खंडात वैशिष्ट्यीकृत केले जातील. अग्रगण्य संस्थांमधील मुख्य वक्ते कार्यक्रमाचे प्रमुख आकर्षण असतील.',
    },
  },
  {
    id: 2,
    category: 'Community',
    date: { en: 'Jan 28, 2026', mr: '२८ जाने, २०२६' },
    readTime: { en: '4 min read', mr: '४ मिनिटे वाचन' },
    author: 'sara',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    title: {
      en: 'New Mentorship Program Launching This Spring',
      mr: 'या वसंतात नवीन मार्गदर्शन कार्यक्रम सुरू',
    },
    excerpt: {
      en: 'Pairing first-year graduate scholars with senior mentors across 12 departments — registration now open.',
      mr: '१२ विभागांमध्ये प्रथम वर्षाच्या पदव्युत्तर विद्वानांना वरिष्ठ मार्गदर्शकांसह जोडणे — नोंदणी सुरू.',
    },
    body: {
      en: 'Our new structured mentorship initiative matches incoming graduate students with experienced scholars in their field. Each pair meets bi-weekly for academic guidance, career discussions, and personal support. Mentors receive leadership training and a certificate of service. The program runs from March through November 2026 with a mid-year check-in workshop.',
      mr: 'आमचा नवीन संरचित मार्गदर्शन उपक्रम नवीन पदव्युत्तर विद्यार्थ्यांना त्यांच्या क्षेत्रातील अनुभवी विद्वानांसह जोडतो. प्रत्येक जोडी शैक्षणिक मार्गदर्शन, करिअर चर्चा आणि वैयक्तिक सहाय्यासाठी दर दोन आठवड्यांनी भेटते. मार्गदर्शकांना नेतृत्व प्रशिक्षण आणि सेवा प्रमाणपत्र मिळते. कार्यक्रम मार्च ते नोव्हेंबर २०२६ पर्यंत चालतो.',
    },
  },
  {
    id: 3,
    category: 'News',
    date: { en: 'Jan 15, 2026', mr: '१५ जाने, २०२६' },
    readTime: { en: '3 min read', mr: '३ मिनिटे वाचन' },
    author: 'council',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    title: {
      en: 'Council Elections: Nominations Open',
      mr: 'परिषद निवडणुका: नामांकने खुली',
    },
    excerpt: {
      en: 'Interested in leading? Nominate yourself for council positions before February 28.',
      mr: 'नेतृत्व करण्यात रुचि आहे? २८ फेब्रुवारीपूर्वी परिषद पदांसाठी स्वतःला नामांकित करा.',
    },
    body: {
      en: 'The council opens nominations for all executive positions for the 2026-27 academic year including President, Vice President, Secretary, Treasurer, and Committee Chairs. Candidates must be currently enrolled graduate students with at least one semester of council participation. Campaign week begins March 10 and elections will be held March 21.',
      mr: 'परिषद २०२६-२७ शैक्षणिक वर्षासाठी अध्यक्ष, उपाध्यक्ष, सचिव, कोषाध्यक्ष आणि समिती अध्यक्ष यासह सर्व कार्यकारी पदांसाठी नामांकने खुली करते. उमेदवार सध्या नोंदणीकृत पदव्युत्तर विद्यार्थी असणे आवश्यक आहे ज्यांचा किमान एक सत्राचा परिषद सहभाग आहे. प्रचार सप्ताह १० मार्चपासून सुरू होतो आणि निवडणुका २१ मार्चला होतील.',
    },
  },
  {
    id: 4,
    category: 'Events',
    date: { en: 'Dec 20, 2025', mr: '२० डिसें, २०२५' },
    readTime: { en: '3 min read', mr: '३ मिनिटे वाचन' },
    author: 'fatima',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    title: {
      en: 'Annual Graduate Gala — Save the Date',
      mr: 'वार्षिक पदव्युत्तर गाला — तारीख लक्षात ठेवा',
    },
    excerpt: {
      en: 'Celebrate graduate achievements at the annual gala on April 12, featuring networking, awards, and keynote talks.',
      mr: 'एप्रिल १२ रोजी वार्षिक गालात नेटवर्किंग, पुरस्कार आणि मुख्य भाषणांसह पदव्युत्तर उपलब्धी साजरी करा.',
    },
    body: {
      en: 'The Annual Graduate Gala brings together 300+ scholars, faculty, alumni, and industry partners for an evening of recognition and celebration. This year, we introduce three new award categories: Research Impact, Community Service, and Innovation Leadership. Formal attire is encouraged. Tickets go on sale February 1.',
      mr: 'वार्षिक पदव्युत्तर गाला ३००+ विद्वान, प्राध्यापक, माजी विद्यार्थी आणि उद्योग भागीदारांना ओळख आणि उत्सवाच्या संध्याकाळासाठी एकत्र आणतो. यंदा आम्ही तीन नवीन पुरस्कार श्रेणी सादर करत आहोत: संशोधन प्रभाव, समुदाय सेवा आणि नवोन्मेष नेतृत्व. तिकिटे १ फेब्रुवारीपासून विक्रीसाठी उपलब्ध आहेत.',
    },
  },
  {
    id: 5,
    category: 'Research',
    date: { en: 'Dec 5, 2025', mr: '५ डिसें, २०२५' },
    readTime: { en: '4 min read', mr: '४ मिनिटे वाचन' },
    author: 'rahul',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    title: {
      en: 'Interdisciplinary Research Grant — Applications Open',
      mr: 'आंतरविषय संशोधन अनुदान — अर्ज खुले',
    },
    excerpt: {
      en: 'The council is funding 10 interdisciplinary research projects. Apply by January 31.',
      mr: 'परिषद १० आंतरविषय संशोधन प्रकल्पांना निधी देत आहे. ३१ जानेवारीपूर्वी अर्ज करा.',
    },
    body: {
      en: 'In partnership with the Office of Graduate Studies, the council announces seed funding of up to ₹50,000 per project for interdisciplinary research collaborations. Teams must include at least two graduate scholars from different departments. Priority will be given to projects with clear societal impact. Results announced by March 1.',
      mr: 'पदव्युत्तर अभ्यास कार्यालयाच्या भागीदारीत, परिषद आंतरविषय संशोधन सहकार्यासाठी प्रति प्रकल्प ₹५०,००० पर्यंत बीज निधीची घोषणा करते. संघांमध्ये वेगवेगळ्या विभागांमधील किमान दोन पदव्युत्तर विद्वान असणे आवश्यक आहे. स्पष्ट सामाजिक प्रभाव असलेल्या प्रकल्पांना प्राधान्य दिले जाईल. निकाल १ मार्चपर्यंत जाहीर.',
    },
  },
  {
    id: 6,
    category: 'Community',
    date: { en: 'Nov 18, 2025', mr: '१८ नोव्हें, २०२५' },
    readTime: { en: '3 min read', mr: '३ मिनिटे वाचन' },
    author: 'sara',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
    title: {
      en: 'Graduate Wellness Week Recap',
      mr: 'पदव्युत्तर कल्याण सप्ताह सारांश',
    },
    excerpt: {
      en: 'A look back at five days of wellness workshops, mindfulness sessions, and community conversations.',
      mr: 'पाच दिवसांच्या कल्याण कार्यशाळा, माइंडफुलनेस सत्रे आणि समुदाय संवादांचा आढावा.',
    },
    body: {
      en: 'Graduate Wellness Week 2025 featured daily yoga sessions, mental health panels with licensed counselors, peer support circles, and a closing community dinner. Over 200 graduate students participated across the five days. The Wellbeing & Inclusion Committee plans to make this a biannual tradition beginning 2026.',
      mr: 'पदव्युत्तर कल्याण सप्ताह २०२५ मध्ये दररोज योग सत्रे, परवानाधारक समुपदेशकांसह मानसिक आरोग्य चर्चासत्रे, सहकारी सहाय्य मंडळे आणि समारोपीय समुदाय रात्रीभोजन यांचा समावेश होता. पाच दिवसांत २०० हून अधिक पदव्युत्तर विद्यार्थ्यांनी सहभाग घेतला. कल्याण आणि समावेशन समिती २०२६ पासून हे द्विवार्षिक परंपरा बनवण्याची योजना आखत आहे.',
    },
  },
  {
    id: 7,
    category: 'Events',
    date: { en: 'Nov 2, 2025', mr: '२ नोव्हें, २०२५' },
    readTime: { en: '4 min read', mr: '४ मिनिटे वाचन' },
    author: 'rahul',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    title: {
      en: 'Hackathon for Social Good — Winners Announced',
      mr: 'सामाजिक भल्यासाठी हॅकाथॉन — विजेते जाहीर',
    },
    excerpt: {
      en: 'Three teams won prizes for innovative solutions tackling campus sustainability and accessibility challenges.',
      mr: 'कॅम्पस शाश्वतता आणि सुलभता आव्हानांना तोंड देणाऱ्या नवोन्मेषी उपायांसाठी तीन संघांनी पारितोषिके जिंकली.',
    },
    body: {
      en: 'The council\'s first Hackathon for Social Good attracted 25 teams. The grand prize went to Team GreenPath for their accessible campus navigation app. Runner-up Team EcoTrack built a carbon footprint tracker for university operations. The People\'s Choice Award went to MindBridge, a peer wellness chatbot. Plans for a 2026 edition are already underway.',
      mr: 'परिषदेच्या पहिल्या सामाजिक भल्यासाठी हॅकाथॉनने २५ संघांना आकर्षित केले. ग्रँड प्राइझ टीम ग्रीनपाथला त्यांच्या सुलभ कॅम्पस नेव्हिगेशन अॅपसाठी मिळाले. उपविजेता टीम इकोट्रॅकने विद्यापीठ कामकाजासाठी कार्बन फूटप्रिंट ट्रॅकर बनवला. पीपल्स चॉइस अवॉर्ड माइंडब्रिजला, एक सहकारी कल्याण चॅटबॉटला मिळाला.',
    },
  },
  {
    id: 8,
    category: 'Research',
    date: { en: 'Oct 15, 2025', mr: '१५ ऑक्टो, २०२५' },
    readTime: { en: '5 min read', mr: '५ मिनिटे वाचन' },
    author: 'council',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    title: {
      en: 'Publication Workshop Series: From Draft to Journal',
      mr: 'प्रकाशन कार्यशाळा मालिका: मसुद्यापासून जर्नलपर्यंत',
    },
    excerpt: {
      en: 'A four-part workshop guiding scholars through manuscript preparation, peer review, and journal submission.',
      mr: 'हस्तलिखित तयारी, समकक्ष पुनरावलोकन आणि जर्नल सबमिशनद्वारे विद्वानांना मार्गदर्शन करणारी चार-भागी कार्यशाळा.',
    },
    body: {
      en: 'Led by published faculty and journal editors, this series covers choosing the right journal, structuring your manuscript, navigating peer review, and handling revisions. Each session includes hands-on exercises with real manuscript samples. Open to all graduate researchers. Sessions run every Saturday in November.',
      mr: 'प्रकाशित प्राध्यापक आणि जर्नल संपादकांच्या नेतृत्वाखाली, ही मालिका योग्य जर्नल निवडणे, तुमचा हस्तलिखित रचणे, समकक्ष पुनरावलोकन नेव्हिगेट करणे आणि सुधारणा हाताळणे यांचा समावेश करते. प्रत्येक सत्रात वास्तविक हस्तलिखित नमुन्यांसह हँड्स-ऑन व्यायाम समाविष्ट आहेत. सर्व पदव्युत्तर संशोधकांसाठी खुले. सत्रे नोव्हेंबरमधील प्रत्येक शनिवारी चालतात.',
    },
  },
]

/* ─── Category badge color ─── */
function categoryColor(cat) {
  switch (cat) {
    case 'News':
      return 'bg-blue-100 text-blue-700'
    case 'Events':
      return 'bg-amber-100 text-amber-700'
    case 'Research':
      return 'bg-emerald-100 text-emerald-700'
    case 'Community':
      return 'bg-violet-100 text-violet-700'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

/* ─── Trending articles (static picks) ─── */
const trendingIds = [1, 5, 7]

/* ─── Search icon SVG ─── */
function IconSearch({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}

/* ─── Filter buttons builder ─── */
function filterButtons(t) {
  return [
    { key: 'All', label: t.blog.filterAll },
    { key: 'News', label: t.blog.filterNews },
    { key: 'Events', label: t.blog.filterEvents },
    { key: 'Research', label: t.blog.filterResearch },
    { key: 'Community', label: t.blog.filterCommunity },
  ]
}

/* ═══════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════ */
export default function BlogPage() {
  const revealRef = useScrollReveal()
  const { lang, t } = useLang()
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')

  /* Filter + search */
  const filtered = articles.filter((a) => {
    const matchCat = activeFilter === 'All' || a.category === activeFilter
    const matchSearch =
      !search.trim() ||
      a.title[lang].toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt[lang].toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featuredArticle = filtered.find((a) => a.featured) || null
  const restArticles = featuredArticle ? filtered.filter((a) => a.id !== featuredArticle.id) : filtered
  const trending = articles.filter((a) => trendingIds.includes(a.id))

  return (
    <div ref={revealRef}>
      {/* ═══ Hero ═══ */}
      <section className="bg-gradient-to-br from-navy-950 via-primary-900 to-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">{t.blog.tag}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{t.blog.heroTitle}</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">{t.blog.heroDesc}</p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur">
            <IconSearch className="h-5 w-5 shrink-0 text-primary-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              className="w-full bg-transparent text-sm text-white placeholder-gray-400 outline-none"
            />
          </div>
        </div>
      </section>

      {/* ═══ Filter bar ═══ */}
      <section className="sticky top-16 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide sm:justify-center sm:px-6 lg:px-8">
          {filterButtons(t).map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeFilter === f.key
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-gray-100 hover:text-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ Content ═══ */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-sm text-slate-500">{t.blog.noPosts}</p>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
              {/* ── Main column ── */}
              <div>
                {/* Featured article (full-width hero card) */}
                {featuredArticle && (
                  <FeaturedCard
                    article={featuredArticle}
                    lang={lang}
                    t={t}
                    expanded={expandedId === featuredArticle.id}
                    onToggle={() => setExpandedId(expandedId === featuredArticle.id ? null : featuredArticle.id)}
                  />
                )}

                {/* Article grid */}
                {restArticles.length > 0 && (
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    {restArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        lang={lang}
                        t={t}
                        expanded={expandedId === article.id}
                        onToggle={() => setExpandedId(expandedId === article.id ? null : article.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <aside className="hidden lg:block">
                {/* Trending */}
                <div className="animate-on-scroll rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800">
                    <span className="inline-block h-3 w-3 rounded-full bg-amber-400" />
                    {t.blog.trending}
                  </h3>
                  <div className="mt-5 space-y-5">
                    {trending.map((a, idx) => (
                      <div key={a.id} className="flex gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-slate-500">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${categoryColor(a.category)}`}>
                            {a.category}
                          </span>
                          <p className="mt-1 text-sm font-medium leading-snug text-slate-800">{a.title[lang]}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{a.date[lang]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category links */}
                <div className="animate-on-scroll mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">{t.blog.categories}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {filterButtons(t).slice(1).map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                          activeFilter === f.key
                            ? 'border-primary-300 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-slate-500 hover:border-primary-200 hover:text-primary-600'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

/* ─────────────────────────────────────
   Featured Card  (Stripe / HubSpot style)
   ───────────────────────────────────── */
function FeaturedCard({ article, lang, t, expanded, onToggle }) {
  const author = authors[article.author]
  return (
    <article className="animate-on-scroll overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative h-48 sm:h-56 md:h-auto">
          <img src={article.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${categoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{article.date[lang]}</span>
            <span className="text-slate-300">|</span>
            <span>{article.readTime[lang]}</span>
          </div>
          <h2 className="mt-2 text-lg font-bold leading-tight text-slate-900 sm:text-xl md:text-2xl">{article.title[lang]}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">{article.excerpt[lang]}</p>
          {expanded && <p className="mt-3 text-sm leading-relaxed text-slate-600">{article.body[lang]}</p>}

          {/* Author + read more */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src={author.avatar} alt={author.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white" />
              <div>
                <p className="text-sm font-semibold text-slate-800">{author.name}</p>
                <p className="text-xs text-slate-400">{author.role[lang]}</p>
              </div>
            </div>
            <button onClick={onToggle} className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition hover:text-primary-700">
              {expanded ? t.blog.readLess : t.blog.readMore}
              <IconArrowRight className={`h-3.5 w-3.5 transition ${expanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────
   Article Card  (Medium / CSS-Tricks style)
   ───────────────────────────────────── */
function ArticleCard({ article, lang, t, expanded, onToggle }) {
  const author = authors[article.author]
  return (
    <article className="animate-on-scroll flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:border-primary-200">
      {/* Cover image */}
      <div className="relative h-40 overflow-hidden sm:h-44">
        <img src={article.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm ${categoryColor(article.category)}`}>
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{article.date[lang]}</span>
          <span className="text-slate-300">|</span>
          <span>{article.readTime[lang]}</span>
        </div>
        <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900">{article.title[lang]}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{article.excerpt[lang]}</p>
        {expanded && <p className="mt-2 text-sm leading-relaxed text-slate-600">{article.body[lang]}</p>}

        {/* Author row */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2.5">
            <img src={author.avatar} alt={author.name} className="h-7 w-7 rounded-full object-cover" loading="lazy" />
            <span className="text-xs font-medium text-slate-600">{author.name}</span>
          </div>
          <button onClick={onToggle} className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 transition hover:text-primary-700">
            {expanded ? t.blog.readLess : t.blog.readMore}
            <IconArrowRight className={`h-3 w-3 transition ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  )
}
