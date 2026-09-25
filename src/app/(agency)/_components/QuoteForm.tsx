'use client';

import { useState } from 'react';

type Fields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  comment: string;
};

type RequiredField = Exclude<keyof Fields, 'comment'>;

const EMPTY: Fields = { name: '', company: '', phone: '', email: '', comment: '' };

function validate(f: Fields): Partial<Record<RequiredField, string>> {
  const errors: Partial<Record<RequiredField, string>> = {};
  if (!f.name.trim()) errors.name = 'Please enter your name.';
  if (!f.company.trim()) errors.company = 'Please enter your company name.';
  if (f.phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = 'Please enter a valid email.';
  return errors;
}

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900';

export default function QuoteForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (key !== 'comment' && errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bots fill the hidden field; pretend success and drop the submission.
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // TODO: send to backend (not built yet).
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center" role="status">
        <p className="text-xl font-semibold text-slate-900">Thanks, we&apos;ll be in touch.</p>
      </div>
    );
  }

  const aria = (key: RequiredField) => ({
    id: `quote-${key}`,
    name: key,
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

      <div>
        <label htmlFor="quote-comment" className="mb-1.5 block text-sm font-medium text-slate-700">
          Leave a comment
        </label>
        <textarea
          id="quote-comment"
          name="comment"
          rows={4}
          value={fields.comment}
          onChange={update('comment')}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, visible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="quote-website">Website</label>
        <input
          id="quote-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-amber-500 px-6 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        Get My Quote
      </button>
    </form>
  );
}
