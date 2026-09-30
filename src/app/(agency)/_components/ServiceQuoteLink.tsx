'use client';

import { PRESELECT_EVENT, type QuoteServiceSlug } from '@/data/quoteServices';

// Scrolls to #quote (native anchor, no reload) and tells the form to pre-select this service.
export default function ServiceQuoteLink({
  slug,
  children,
  className,
}: {
  slug: QuoteServiceSlug;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#quote"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(PRESELECT_EVENT, { detail: slug }))}
    >
      {children}
    </a>
  );
}
