// Options for the "What do you need help with?" chips on the quote form.
// `slug` is used to pre-select a chip from a service card (and ?service=<slug> in the URL).
export const QUOTE_SERVICES = [
  { slug: 'content-production', label: 'Content Production' },
  { slug: 'organic-social', label: 'Organic Social' },
  { slug: 'paid-ads', label: 'Paid Advertising' },
  { slug: 'email-marketing', label: 'Email Marketing' },
  { slug: 'automation', label: 'Automation' },
  { slug: 'not-sure', label: 'Not sure yet' },
] as const;

export type QuoteServiceSlug = (typeof QUOTE_SERVICES)[number]['slug'];

export const QUOTE_SERVICE_LABELS: readonly string[] = QUOTE_SERVICES.map((s) => s.label);

// Event fired by a service card's CTA so the form can pre-select that chip.
export const PRESELECT_EVENT = 'quote:preselect';
