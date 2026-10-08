'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { getConsent, onOpenConsentSettings, setConsent, subscribeConsent, type Consent } from '@/lib/consent';

const buttonBase =
  'rounded-md border-2 border-slate-900 px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2';

export default function ConsentBanner() {
  // 'pending' on the server and during hydration, so returning visitors never see a flash.
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => 'pending' as const);
  const [reopened, setReopened] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => onOpenConsentSettings(() => setReopened(true)), []);

  useEffect(() => {
    if (reopened) regionRef.current?.focus();
  }, [reopened]);

  const visible = consent === null || reopened;
  if (consent === 'pending' || !visible) return null;

  const choose = (value: Consent) => {
    setConsent(value);
    setReopened(false);
  };

  return (
    <>
      {/* Spacer so the fixed banner never hides the end of the page */}
      <div aria-hidden="true" className="h-40 sm:h-24" />
      <div
        ref={regionRef}
        role="region"
        aria-label="Cookie consent"
        tabIndex={-1}
        className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] focus:outline-none"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-lg sm:flex-row sm:items-center sm:gap-5">
          <p className="flex-1">
            We use cookies to understand how visitors use our site and to improve our ads.{' '}
            <Link href="/privacy" className="font-medium text-slate-900 underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
          <div className="grid shrink-0 grid-cols-2 gap-2">
            <button type="button" onClick={() => choose('declined')} className={`${buttonBase} bg-white text-slate-900 hover:bg-slate-100`}>
              Decline
            </button>
            <button type="button" onClick={() => choose('accepted')} className={`${buttonBase} bg-slate-900 text-white hover:bg-slate-700`}>
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
