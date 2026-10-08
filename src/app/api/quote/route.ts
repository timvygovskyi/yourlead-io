import { NextRequest, NextResponse } from 'next/server';
import { QUOTE_SERVICE_LABELS } from '@/data/quoteServices';

const MAX_FIELD = 200;
const MAX_COMMENT = 2000;
const MIN_FILL_MS = 3000;

type QuoteBody = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
  services?: unknown;
  comment?: unknown;
  page?: unknown;
  lym_hp_field?: unknown;
  elapsed_ms?: unknown;
};

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export async function POST(request: NextRequest) {
  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "lym_hp_field" field. Pretend success, do nothing.
  if (str(body.lym_hp_field)) {
    return NextResponse.json({ ok: true });
  }

  // Timing check: the form reports how long after page load it was submitted.
  // Under 3 seconds is treated as a bot the same way.
  if (typeof body.elapsed_ms === 'number' && body.elapsed_ms < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const company = str(body.company);
  const phone = str(body.phone);
  const email = str(body.email);
  const comment = str(body.comment);
  const page = str(body.page).slice(0, MAX_FIELD);
  const services = Array.isArray(body.services)
    ? body.services.filter((s): s is string => typeof s === 'string' && QUOTE_SERVICE_LABELS.includes(s))
    : [];

  const errors: string[] = [];
  if (!name) errors.push('name');
  if (!company) errors.push('company');
  if (phone.replace(/\D/g, '').length < 10) errors.push('phone');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email');
  if ([name, company, phone, email].some((v) => v.length > MAX_FIELD)) errors.push('length');
  if (comment.length > MAX_COMMENT) errors.push('comment');

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: 'Invalid fields.', fields: errors }, { status: 400 });
  }

  const makeQuoteWebhookUrl = process.env.MAKE_QUOTE_WEBHOOK_URL;
  if (!makeQuoteWebhookUrl) {
    console.error('MAKE_QUOTE_WEBHOOK_URL is not configured.');
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const response = await fetch(makeQuoteWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        company,
        phone,
        email,
        services: [...new Set(services)].join(', '),
        comment,
        page,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error('Make quote webhook responded with', response.status);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  } catch (error) {
    console.error('Forward quote to Make failed:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
