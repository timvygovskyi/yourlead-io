// First-party cookie consent store, shared by the banner, the tracking loader and the quote form.

export type Consent = 'accepted' | 'declined';

const COOKIE = 'lym_consent';
const MAX_AGE = 60 * 60 * 24 * 365; // 12 months
const CHANGE_EVENT = 'lym:consent-change';
const OPEN_EVENT = 'lym:consent-open';

export function getConsent(): Consent | null {
  const match = document.cookie.match(/(?:^|;\s*)lym_consent=(accepted|declined)/);
  return match ? (match[1] as Consent) : null;
}

export function setConsent(value: Consent) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// For useSyncExternalStore.
export function subscribeConsent(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export const getServerConsent = () => null;

// "Cookie settings" link → reopen the banner.
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}
