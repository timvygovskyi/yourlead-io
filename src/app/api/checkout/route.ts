import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-05-27.dahlia',
});

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      firstName,
      lastName,
      businessName,
      service,
      location,
      businessDescription,
    } = (await request.json()) as {
      email: string;
      firstName: string;
      lastName: string;
      businessName: string;
      service: string;
      location: string;
      businessDescription: string;
    };

    if (!email || !firstName || !lastName || !businessName || !service || !location) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'Stripe price ID is not configured.' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 7,
      },
      customer_email: email,
      metadata: {
        firstName,
        lastName,
        businessName,
        service,
        location,
        businessDescription,
      },
      success_url: 'https://www.yourlead.io/leadgentool/success',
      cancel_url: 'https://www.yourlead.io/leadgentool',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 500 });
  }
}
