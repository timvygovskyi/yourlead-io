'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { getConsent, onOpenConsentSettings, setConsent, subscribeConsent, type Consent } from '@/lib/consent';

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
      <div aria-hidden="true" className="cookie-spacer" />
      <div
        ref={regionRef}
        role="region"
        aria-label="Cookie consent"
        tabIndex={-1}
        className="cookie"
      >
        <div className="cookie__card">
          <p>
            We use cookies to understand how visitors use our site and to improve our ads.{' '}
            <Link href="/privacy">
              Privacy Policy
            </Link>
          </p>
          <div className="cookie__actions">
            <button type="button" onClick={() => choose('declined')} className="btn btn--outline">
              Decline
            </button>
            <button type="button" onClick={() => choose('accepted')} className="btn btn--dark">
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
