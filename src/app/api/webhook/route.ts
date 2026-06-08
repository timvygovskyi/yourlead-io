import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-05-27.dahlia',
});

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
  const signature = request.headers.get('stripe-signature');

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Webhook secret or signature missing.' }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    if (!makeWebhookUrl) {
      return NextResponse.json({ error: 'Make webhook URL not configured.' }, { status: 500 });
    }

    const payloadBody = {
      email: session.customer_email || '',
      first_name: metadata.firstName || '',
      last_name: metadata.lastName || '',
      business_name: metadata.businessName || '',
      service: metadata.service || '',
      location: metadata.location || '',
      business_description: metadata.businessDescription || '',
      trial_start: new Date().toISOString().slice(0, 10),
      status: 'active',
    };

    try {
      await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadBody),
      });
    } catch (error) {
      console.error('Forward webhook to Make failed:', error);
      return NextResponse.json({ error: 'Failed to forward webhook.' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
