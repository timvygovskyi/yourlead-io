import Link from 'next/link';
import CookieSettingsLink from './CookieSettingsLink';

export default function SiteFooter() {
  return (
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
            {' · '}
            <Link href="/refund" className="hover:text-white">Refund</Link>
            {' · '}
            <CookieSettingsLink className="hover:text-white focus:outline-none focus-visible:underline" />
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
  );
}
