import Link from 'next/link';
import { primaryButton } from './styles';

// Links point at "/#section" so they work from the legal pages too.
const NAV = [
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'How It Works' },
  { href: '/#about', label: 'About' },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">Lead Your Marketing</Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/#quote" className={`${primaryButton} shrink-0 px-4 py-2 text-sm`}>
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
