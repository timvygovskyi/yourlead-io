import { GA4_ID } from '@/config/tracking';
import { getConsent } from '@/lib/consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Fires only with consent and only if the scripts are loaded. Never pass personal data here.
export function trackLead(services: string[]) {
  if (getConsent() !== 'accepted') return;

  window.gtag?.('event', 'generate_lead', { services: services.join(', ') });
  window.fbq?.('track', 'Lead');
}

// Called when someone declines after having accepted earlier in the same session:
// already-loaded scripts can't be unloaded, so tell them to stop sending.
export function disableTracking() {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = true;
  window.fbq?.('consent', 'revoke');
}
