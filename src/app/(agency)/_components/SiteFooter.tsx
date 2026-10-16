import Link from 'next/link';
import CookieSettingsLink from './CookieSettingsLink';
import { LogoMark } from './Logo';

export default function SiteFooter() {
  return (
    <footer id="contact" className="ground-dark colophon" data-ground="dark">
      <p className="colophon__mark display"><LogoMark />Lead Your Marketing</p>
      <div className="colophon__grid">
        <div>
          <p>Serving the GTA</p>
          <p className="soft">Content &amp; growth marketing</p>
        </div>
        <div>
          <p><a href="tel:+16477041489">+1 647 704 1489</a></p>
          <p><a href="mailto:hello@yourlead.io">hello@yourlead.io</a></p>
          <p>
            <a href="https://www.instagram.com/yourlead.io" target="_blank" rel="noopener noreferrer">Instagram</a>
            {' · '}
            <a href="https://www.youtube.com/@LeadYourMarketing" target="_blank" rel="noopener noreferrer">YouTube</a>
          </p>
        </div>
        <div>
          <p>
            <Link href="/privacy">Privacy</Link>
            {' · '}
            <Link href="/terms">Terms</Link>
            {' · '}
            <Link href="/refund">Refund</Link>
            {' · '}
            <CookieSettingsLink />
          </p>
          <p><Link href="/leadgentool" className="soft">Looking for the lead tool? →</Link></p>
        </div>
      </div>
      <p className="colophon__end">© 2026 Lead Your Marketing</p>
    </footer>
  );
}
