'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PRESELECT_EVENT, QUOTE_SERVICES, type QuoteServiceSlug } from '@/data/quoteServices';
import { trackLead } from '@/lib/tracking';

type Fields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  comment: string;
};

type RequiredField = Exclude<keyof Fields, 'comment'>;

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: Fields = { name: '', company: '', phone: '', email: '', comment: '' };

// Real people take longer than this to fill the form; faster submits are treated as bots.
const MIN_FILL_MS = 3000;

function validate(f: Fields): Partial<Record<RequiredField, string>> {
  const errors: Partial<Record<RequiredField, string>> = {};
  if (!f.name.trim()) errors.name = 'Please enter your name.';
  if (!f.company.trim()) errors.company = 'Please enter your company name.';
  if (f.phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = 'Please enter a valid email.';
  return errors;
}

const isServiceSlug = (value: string | null): value is QuoteServiceSlug =>
  QUOTE_SERVICES.some((s) => s.slug === value);

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900';

export default function QuoteForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [services, setServices] = useState<QuoteServiceSlug[]>([]);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const sending = useRef(false);

  // Pre-select a chip from ?service=<slug> on load, or from a service card click.
  useEffect(() => {
    const preselect = (slug: string | null) => {
      if (isServiceSlug(slug)) {
        setServices((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
      }
    };

    preselect(new URLSearchParams(window.location.search).get('service'));

    const onPreselect = (e: Event) => preselect((e as CustomEvent<string>).detail);
    window.addEventListener(PRESELECT_EVENT, onPreselect);
    return () => window.removeEventListener(PRESELECT_EVENT, onPreselect);
  }, []);

  const update = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (key !== 'comment' && errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleService = (slug: QuoteServiceSlug) => {
    setServices((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending.current) return;

    // Bots fill the hidden field; pretend success and drop the submission.
    if (honeypot) {
      setStatus('success');
      return;
    }

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Submitted too soon after page load: treat as a bot the same way.
    const elapsedMs = Math.round(performance.now());
    if (elapsedMs < MIN_FILL_MS) {
      setStatus('success');
      return;
    }

    sending.current = true;
    setStatus('sending');

    const serviceLabels = QUOTE_SERVICES.filter((s) => services.includes(s.slug)).map((s) => s.label);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...fields,
          services: serviceLabels,
          page: window.location.pathname,
          lym_hp_field: honeypot,
          elapsed_ms: elapsedMs,
        }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;

      if (!response.ok || !data?.ok) {
        throw new Error(`Quote request failed with status ${response.status}`);
      }

      // TRACKING: GA4 generate_lead + Meta Lead (success only; no-op without consent). No personal data.
      trackLead(serviceLabels);

      setStatus('success');
    } catch (error) {
      console.error('Quote submit failed:', error);
      setStatus('error');
    } finally {
      sending.current = false;
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center" role="status">
        <p className="text-xl font-semibold text-slate-900">Thanks, we&apos;ll be in touch.</p>
      </div>
    );
  }

  const aria = (key: RequiredField) => ({
    id: `quote-${key}`,
    name: key,
    maxLength: 200,
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `quote-${key}-error` : undefined,
  });

  const field = (key: RequiredField, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`quote-${key}`} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} <span className="text-red-600">*</span>
      </label>
      {input}
      {errors[key] ? (
        <p id={`quote-${key}-error`} className="mt-1.5 text-sm text-red-600">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Your name', (
          <input type="text" autoComplete="name" value={fields.name} onChange={update('name')} className={inputClass} {...aria('name')} />
        ))}
        {field('company', 'Company name', (
          <input type="text" autoComplete="organization" value={fields.company} onChange={update('company')} className={inputClass} {...aria('company')} />
        ))}
        {field('phone', 'Phone', (
          <input type="tel" autoComplete="tel" inputMode="tel" value={fields.phone} onChange={update('phone')} className={inputClass} {...aria('phone')} />
        ))}
        {field('email', 'Email', (
          <input type="email" autoComplete="email" value={fields.email} onChange={update('email')} className={inputClass} {...aria('email')} />
        ))}
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-slate-700">What do you need help with?</legend>
        <div className="flex flex-wrap gap-2">
          {QUOTE_SERVICES.map((s) => {
            const selected = services.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleService(s.slug)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1 ${
                  selected
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="quote-comment" className="mb-1.5 block text-sm font-medium text-slate-700">
          Leave a comment
        </label>
        <textarea
          id="quote-comment"
          name="comment"
          rows={4}
          maxLength={2000}
          value={fields.comment}
          onChange={update('comment')}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, visible to bots. Name and label are deliberately
          meaningless so browser autofill and password managers leave it empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lym_hp_field">Leave this field empty</label>
        <input
          id="lym_hp_field"
          name="lym_hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' ? (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong — email us at hello@yourlead.io or call +1 647 704 1489.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-md bg-amber-500 px-6 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending...' : 'Get My Quote'}
      </button>
      <p className="text-center text-sm text-slate-500">
        By submitting, you agree we can contact you about your request. See our{' '}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-slate-900">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
