'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoLockup, LogoMark } from './Logo';

const NAV = [
  { href: '/#services', id: 'services', label: 'Services' },
  { href: '/#process', id: 'process', label: 'How It Works' },
  { href: '/#about', id: 'about', label: 'About' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  // The homepage opens on the dark hero; every other agency page opens on paper.
  const [ground, setGround] = useState<'dark' | 'light'>(pathname === '/' ? 'dark' : 'light');
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Bar ink follows the section under it; the nav highlights the section in view.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const bar = barRef.current;
      if (!bar) return;
      const vh = window.innerHeight;
      const probe = bar.offsetHeight / 2;
      for (const el of document.querySelectorAll<HTMLElement>('.lym [data-ground]')) {
        if (el === bar) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setGround(el.dataset.ground === 'dark' ? 'dark' : 'light');
          break;
        }
      }
      const line = bar.offsetHeight + vh * 0.3;
      let current: string | null = null;
      for (const item of NAV) {
        const r = document.getElementById(item.id)?.getBoundingClientRect();
        if (r && r.top <= line && r.bottom > line) current = item.id;
      }
      // The footer is too short to reach the line, so the page bottom counts as Contact.
      if (window.scrollY + vh >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActive(current);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuBtnRef.current?.focus());
  }, []);

  // Full-screen menu: lock page scroll, focus the first link, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('.menu__list a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeMenu(true); return; }
      if (e.key !== 'Tab' || !menuRef.current) return;
      const f = [...menuRef.current.querySelectorAll<HTMLElement>('a, button')];
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { html.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, closeMenu]);

  return (
    <>
      <header ref={barRef} className="bar" data-ground={ground}>
        <Link className="brand" href="/#top" aria-label="Lead Your Marketing, home">
          <LogoLockup className="brand__lockup" />
          <LogoMark className="brand__mark" />
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.id} href={item.href} aria-current={active === item.id ? 'true' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn--primary btn--sm" href="/#quote">Get a Quote</Link>
        <button ref={menuBtnRef} className="menu-btn" type="button" aria-expanded={open} aria-controls="site-menu"
          aria-label="Open menu" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </header>

      {open ? (
        <div ref={menuRef} className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="menu__top">
            <Link className="brand" href="/#top" aria-label="Lead Your Marketing, home" onClick={() => closeMenu(false)}>
              <LogoLockup className="brand__lockup" />
            </Link>
            <button className="menu-btn" type="button" aria-label="Close menu" onClick={() => closeMenu(true)}>
              <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>
          <ul className="menu__list">
            {NAV.map((item) => (
              <li key={item.id}><Link className="display" href={item.href} onClick={() => closeMenu(false)}>{item.label}</Link></li>
            ))}
          </ul>
          <Link className="btn btn--primary" href="/#quote" onClick={() => closeMenu(false)}>Get a Quote</Link>
          <p className="menu__contact">
            <a href="tel:+16477041489">+1 647 704 1489</a> · <a href="mailto:hello@yourlead.io">hello@yourlead.io</a>
          </p>
        </div>
      ) : null}
    </>
  );
}
