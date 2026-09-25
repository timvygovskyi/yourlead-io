import Image from 'next/image';
import Link from 'next/link';
import QuoteForm from './_components/QuoteForm';

const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How It Works' },
  { href: '#about', label: 'About' },
];

const WHY_US = [
  {
    title: 'We research before we shoot.',
    body: 'We study your market, your competitors, and what your audience already responds to — before a camera turns on. Every piece of content has a reason behind it.',
  },
  {
    title: 'One team, every channel.',
    body: 'Content, organic social, paid ads, email, and automation — run as one connected system instead of five disconnected vendors who don’t talk to each other.',
  },
  {
    title: 'Built on real budgets, not a portfolio reel.',
    body: 'I’ve managed hundreds of thousands of dollars a month in marketing spend for companies like Zoom and fast-scaling startups. That’s the standard applied here — proven systems, not learning on your dime.',
  },
];

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6',
  'aria-hidden': true,
};

const SERVICES = [
  {
    name: 'Content Production',
    body: 'Professional, channel-specific video and photo, shot for how people actually watch on Instagram, YouTube, and TikTok.',
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="6" width="13" height="12" rx="2" />
        <path d="M15.5 10.5 21.5 7v10l-6-3.5" />
      </svg>
    ),
  },
  {
    name: 'Organic Social',
    body: 'Consistent posting and channel management so your business looks active and credible every week, not just after a shoot.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4.5" width="18" height="16" rx="2" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" />
      </svg>
    ),
  },
  {
    name: 'Paid Advertising',
    body: 'Meta, Google, LinkedIn, and Reddit campaigns built on the research, not guesses — targeting the people most likely to convert.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.25" />
      </svg>
    ),
  },
  {
    name: 'Email Marketing',
    body: 'Turning first-time visitors and past customers into repeat revenue, not one-time transactions.',
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="m3 6.5 9 6.5 9-6.5" />
      </svg>
    ),
  },
  {
    name: 'Automation',
    body: 'Custom workflows (n8n, Make) that handle lead routing, follow-up, and reporting so nothing falls through the cracks.',
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="3" width="6" height="6" rx="1.5" />
        <rect x="15.5" y="3" width="6" height="6" rx="1.5" />
        <rect x="9" y="15" width="6" height="6" rx="1.5" />
        <path d="M8.5 6h7M18.5 9v2.5a1.5 1.5 0 0 1-1.5 1.5H13.5v2M5.5 9v2.5A1.5 1.5 0 0 0 7 13h3.5v2" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    title: 'Discovery & Research',
    body: 'We study your business, your competitors, and your audience to find what’s already working in your market.',
  },
  {
    title: 'Strategy',
    body: 'We map a content and channel plan built on that research, with a clear reason behind every piece.',
  },
  {
    title: 'Production',
    body: 'On-site shoots, edited into content built for each specific channel, not one video reused everywhere.',
  },
  {
    title: 'Launch & Scale',
    body: 'We post organically, run paid campaigns, and set up email and automation — then report monthly on what it’s producing.',
  },
];

const primaryButton =
  'inline-block rounded-md bg-amber-500 text-center font-semibold text-slate-900 shadow-sm transition-colors hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2';

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-lg text-slate-600">{intro}</p> : null}
    </div>
  );
}

export default function AgencyHome() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="text-lg font-bold tracking-tight">Lead Your Marketing</a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#quote" className={`${primaryButton} shrink-0 px-4 py-2 text-sm`}>
            Get a Quote
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-600">
              Content &amp; Growth Marketing
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              We Turn Your Business Into a Brand People Trust — and Buy From
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
              We research what actually convinces your customers, produce the content that proves it, then run it
              across the channels that turn attention into revenue.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className={`${primaryButton} px-6 py-3.5 text-base`}>
                Get a Quote
              </a>
              <a
                href="#process"
                className="rounded-md border border-slate-300 bg-white px-6 py-3.5 text-center text-base font-semibold text-slate-900 transition-colors hover:border-slate-900"
              >
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading eyebrow="Why us" title="Not just video. A system built on research." />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-200">
              <Image
                src="/images/why-us.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              {WHY_US.map((p) => (
                <div key={p.title} className="border-l-2 border-amber-500 pl-5">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-slate-600">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-20 border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading
              eyebrow="What we do"
              title="A complete system, not a single service."
              intro="Start with what you need most, add the rest as you grow."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div key={s.name} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-amber-100 text-amber-700">
                    {s.icon}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{s.name}</h3>
                  <p className="mt-3 flex-1 text-slate-600">{s.body}</p>
                  <a href="#quote" className="mt-6 font-semibold text-slate-900 underline-offset-4 hover:underline">
                    Get a quote →
                  </a>
                </div>
              ))}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-200 sm:col-span-2 sm:aspect-[2/1] lg:col-span-1 lg:aspect-auto lg:min-h-64">
                <Image
                  src="/images/services.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="process" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading eyebrow="Process" title="From research to results." />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 border-y border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[2fr_3fr]">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg bg-slate-200">
              <Image
                src="/images/founder.jpg"
                alt="Tim Vygovskyi, founder of Lead Your Marketing"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-600">About</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tim Vygovskyi — Founder</h2>
              <div className="mt-5 space-y-4 text-lg text-slate-600">
                <p>
                  I’ve spent over 8 years in corporate and agency marketing — including roles at Zoom and STIHL, and
                  helping scale startups like Aucto and 3dEYE. Along the way I’ve managed hundreds of thousands of
                  dollars a month in marketing budgets that weren’t mine to experiment with.
                </p>
                <p>
                  That’s the standard I bring to Lead Your Marketing: instead of using your budget to learn, we apply
                  systems that are already proven to work — research-backed, channel-specific, and built to convert
                  views into customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote form */}
        <section id="quote" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">Tell us about your business.</h2>
          <QuoteForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm sm:px-6 md:grid-cols-3">
          <div>
            <p className="text-base font-bold text-white">Lead Your Marketing</p>
            <p className="mt-2">Serving the GTA</p>
          </div>
          <div className="space-y-1.5">
            <p>
              <a href="tel:+16477041489" className="hover:text-white">+1 647 704 1489</a>
            </p>
            <p>
              <a href="mailto:hello@yourlead.io" className="hover:text-white">hello@yourlead.io</a>
            </p>
            <p className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/yourlead.io" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
              <a href="https://www.youtube.com/@LeadYourMarketing" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                YouTube
              </a>
            </p>
          </div>
          <div className="space-y-1.5 md:text-right">
            <p>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              {' · '}
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </p>
            <p>
              <Link href="/leadgentool" className="text-slate-400 hover:text-white">
                Looking for the lead tool? →
              </Link>
            </p>
            <p className="text-slate-500">© 2026 Lead Your Marketing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
