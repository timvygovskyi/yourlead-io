import Image from 'next/image';
import QuoteForm from './_components/QuoteForm';
import ServiceQuoteLink from './_components/ServiceQuoteLink';
import HomeMotion from './_components/HomeMotion';
import type { QuoteServiceSlug } from '@/data/quoteServices';

const WHY_US = [
  {
    title: 'We research before we shoot.',
    body: 'We study your market, your competitors, and what your audience already responds to, before a camera turns on. Every piece of content has a reason behind it.',
  },
  {
    title: 'One team, every channel.',
    body: 'Content, organic social, paid ads, email, and automation, run as one connected system instead of five disconnected vendors who don’t talk to each other.',
  },
  {
    title: 'Built on real budgets, not a portfolio reel.',
    body: 'I’ve managed paid marketing budgets for Zoom and fast-scaling startups. That’s the standard applied here. Proven systems, not learning on your dime.',
  },
];

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const SERVICES: { name: string; slug: QuoteServiceSlug; cta: string; body: string; icon: React.ReactNode }[] = [
  {
    name: 'Content Production',
    slug: 'content-production',
    cta: 'Get a Content Production quote',
    body: 'Professional, channel-specific video and photo, shot for how people actually watch on Instagram, YouTube, and TikTok.',
    icon: <svg {...iconProps}><rect x="2.5" y="6" width="13" height="12" rx="2" /><path d="M15.5 10.5 21.5 7v10l-6-3.5" /></svg>,
  },
  {
    name: 'Organic Social',
    slug: 'organic-social',
    cta: 'Get an Organic Social quote',
    body: 'Consistent posting and channel management so your business looks active and credible every week, not just after a shoot.',
    icon: <svg {...iconProps}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" /></svg>,
  },
  {
    name: 'Paid Advertising',
    slug: 'paid-ads',
    cta: 'Get a Paid Advertising quote',
    body: 'Meta, Google, LinkedIn, and Reddit campaigns built on the research, not guesses, targeting the people most likely to convert.',
    icon: <svg {...iconProps}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.25" /></svg>,
  },
  {
    name: 'Email Marketing',
    slug: 'email-marketing',
    cta: 'Get an Email Marketing quote',
    body: 'Turning first-time visitors and past customers into repeat revenue, not one-time transactions.',
    icon: <svg {...iconProps}><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m3 6.5 9 6.5 9-6.5" /></svg>,
  },
  {
    name: 'Automation',
    slug: 'automation',
    cta: 'Get an Automation quote',
    body: 'Custom workflows (n8n, Make) that handle lead routing, follow-up, and reporting so nothing falls through the cracks.',
    icon: <svg {...iconProps}><rect x="2.5" y="3" width="6" height="6" rx="1.5" /><rect x="15.5" y="3" width="6" height="6" rx="1.5" /><rect x="9" y="15" width="6" height="6" rx="1.5" /><path d="M8.5 6h7M18.5 9v2.5a1.5 1.5 0 0 1-1.5 1.5H13.5v2M5.5 9v2.5A1.5 1.5 0 0 0 7 13h3.5v2" /></svg>,
  },
];

const STEPS = [
  { title: 'Discovery & Research', body: 'We study your business, your competitors, and your audience to find what’s already working in your market.' },
  { title: 'Strategy', body: 'We map a content and channel plan built on that research, with a clear reason behind every piece.' },
  { title: 'Production', body: 'On-site shoots, edited into content built for each specific channel, not one video reused everywhere.' },
  { title: 'Launch & Scale', body: 'We post organically, run paid campaigns, and set up email and automation, then report monthly on what it’s producing.' },
];

export default function AgencyHome() {
  return (
    <main id="top">
      {/* 1 · Hero: a print on the easel. Copy is plain HTML, readable before any script runs. */}
      <section className="ground-dark" data-sc-act="pin" data-sc-span="1.6" data-ground="dark">
        <div data-sc-stage>
          <div className="hero">
            <div className="hero__copy">
              <p className="eyebrow">Content &amp; Growth Marketing</p>
              <h1>We Turn Your Business Into a Brand People <em>Trust</em>, and Buy From</h1>
              <p className="hero__sub">
                We research what actually convinces your customers, produce the content that proves it, then run it
                across the channels that turn attention into revenue.
              </p>
              <div className="hero__ctas">
                <a className="btn btn--primary" href="#quote">Get a Quote</a>
                <a className="btn btn--ghost" href="#process">See How It Works</a>
              </div>
            </div>
            <figure className="easel">
              <div className="print dev">
                {/* LCP element: 1600px WebP source (63KB), preloaded in <head>, high fetch priority. */}
                <Image
                  className="print__plate"
                  src="/images/hero.webp"
                  alt="Camera and field monitor on a client shoot"
                  fill
                  preload
                  fetchPriority="high"
                  loading="eager"
                  quality={70}
                  sizes="(min-width: 900px) 50vw, calc(100vw - 2.5rem)"
                />
                <div className="dev__paper" aria-hidden="true" />
              </div>
              <div className="blade blade--a" data-sc-parallax="-0.9" aria-hidden="true" />
              <div className="blade blade--b" data-sc-parallax="0.9" aria-hidden="true" />
            </figure>
          </div>
        </div>
      </section>

      {/* 2 · Why us: the quiet act before the peak. */}
      <section className="ground-light sec sec--after-pin" data-ground="light">
        <div className="wrap why">
          <div className="why__photo dev" data-develop style={{ position: 'relative' }}>
            <Image
              src="/images/why-us.jpg"
              alt="Interview being filmed in a lit hangar: subject on a stool, camera and softbox in the foreground"
              fill
              sizes="(min-width: 900px) 52vw, 100vw"
            />
            <div className="dev__paper" aria-hidden="true" />
          </div>
          <div data-sc-in data-sc-stagger="70">
            <h2>Not just video. A system built on <em>research</em>.</h2>
            <ul className="points">
              {WHY_US.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · Services: the peak. Pinned for one screen on desktop (set by HomeMotion), flow on phones. */}
      <section id="services" className="ground-dark" data-sc-act="flow" data-peak data-ground="dark">
        <div data-sc-stage-slot className="peak">
          <div className="peak__head">
            <h2>A complete system, <em>not a single service.</em></h2>
            <p className="peak__intro">Start with what you need most, add the rest as you grow.</p>
          </div>
          <div className="tray">
            <svg className="tray__thread" aria-hidden="true"><path d="" /></svg>
            <span className="rail-line" aria-hidden="true" />
            <ul className="tray__list">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <article className="pr" data-print>
                    <div className="pr__row">
                      <span className="pr__icon" aria-hidden="true">{s.icon}</span>
                      <h3>{s.name}</h3>
                    </div>
                    <p>{s.body}</p>
                    <ServiceQuoteLink slug={s.slug}>{s.cta}&nbsp;→</ServiceQuoteLink>
                    <span className="pr__paper" aria-hidden="true" />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 · Process: sticky column with a step indicator while the steps pass. */}
      <section id="process" className="ground-light sec sec--after-pin" data-ground="light">
        <div className="wrap process">
          <div className="process__head">
            <h2>From research to <em>results</em>.</h2>
            <p className="process__line">Four steps, in the same order every time, so nothing is left to guesswork.</p>
            <ol className="progress" aria-label="Where you are in the process">
              {STEPS.map((s, i) => (
                <li key={s.title}><span className="progress__dot" aria-hidden="true">{i + 1}</span>{s.title}</li>
              ))}
            </ol>
            <a className="textlink" href="#quote">Get a Quote →</a>
          </div>
          <ol className="steps" data-steps data-sc-in data-sc-stagger="70">
            {STEPS.map((s) => (
              <li key={s.title}>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · About */}
      <section id="about" className="ground-light sec" data-sc-act="flow" data-ground="light">
        <div className="wrap about">
          <div data-sc-reveal="up" data-sc-reveal-at="0.04 0.42">
            <div className="about__photo dev" data-develop>
              <Image
                src="/images/founder.jpg"
                alt="Tim Vygovskyi, founder of Lead Your Marketing, speaking into a microphone on stage"
                fill
                sizes="(min-width: 900px) 30vw, 100vw"
              />
              <div className="dev__paper" aria-hidden="true" />
            </div>
          </div>
          <div className="about__text" data-sc-in data-sc-stagger="70">
            <h2>Tim Vygovskyi, <em>Founder</em></h2>
            <p>
              I’ve worked in corporate and agency marketing, including roles at Zoom and STIHL, and helping scale
              startups like Aucto and 3dEYE, managing budgets that weren’t mine to experiment with.
            </p>
            <p>
              That’s the standard I bring to Lead Your Marketing: instead of using your budget to learn, we apply
              systems that are already proven to work, research-backed, channel-specific, and built to convert views
              into customers.
            </p>
          </div>
        </div>
      </section>

      {/* 6 · Quote */}
      <section id="quote" className="ground-light sec" data-ground="light" style={{ paddingTop: 0 }}>
        <div className="wrap quote">
          <h2>Tell us about your <em>business</em>.</h2>
          <QuoteForm />
        </div>
      </section>

      <HomeMotion />
    </main>
  );
}
