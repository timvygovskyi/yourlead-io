'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Script from 'next/script';
import { GA4_ID, META_PIXEL_ID } from '@/config/tracking';
import { getConsent, getServerConsent, subscribeConsent } from '@/lib/consent';
import { disableTracking } from '@/lib/tracking';

// Renders GA4 and the Meta Pixel only once consent is "accepted".
// Accepting mid-session renders the scripts immediately, no reload needed.
export default function TrackingScripts() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  const wasAccepted = useRef(false);

  useEffect(() => {
    if (consent === 'accepted') {
      // Undo an earlier decline in the same session.
      if (wasAccepted.current) {
        (window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = false;
        window.fbq?.('consent', 'grant');
      }
      wasAccepted.current = true;
    } else if (consent === 'declined' && wasAccepted.current) {
      disableTracking();
    }
  }, [consent]);

  // Unmounting does not unload scripts that already ran; disableTracking() stops them sending.
  if (consent !== 'accepted') return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
      </Script>

      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}
