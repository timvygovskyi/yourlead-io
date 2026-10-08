import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { ContactBlock } from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Refund Policy — Lead Your Marketing',
  description: 'Free trial, cancellation and refund terms for the Lead Your Marketing lead tool.',
};

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy" lastUpdated="October 8, 2026">
      <p>
        This policy applies to the lead tool subscription at <Link href="/leadgentool">/leadgentool</Link>.
      </p>

      <h2>1. 7-day free trial</h2>
      <p>
        New subscriptions start with a 7-day free trial. If you cancel at any time before the trial ends, you
        won&apos;t be charged.
      </p>

      <h2>2. Billing after the trial</h2>
      <p>
        If you don&apos;t cancel before the trial ends, your subscription starts and you&apos;re billed at the
        price shown at sign-up. Subscription fees are non-refundable once billed, including for partial months.
      </p>

      <h2>3. Billing errors</h2>
      <p>
        If you&apos;ve been charged in error (for example, charged twice or charged after you cancelled), tell us
        within 7 days of the charge and we&apos;ll refund the incorrect amount.
      </p>

      <h2>4. How to cancel</h2>
      <p>
        Email <a href="mailto:hello@yourlead.io">hello@yourlead.io</a> from the email address you signed up with
        and ask us to cancel. You can cancel anytime; your access continues until the end of the period you&apos;ve
        already paid for, and you won&apos;t be billed again.
      </p>

      <h2>5. Agency services</h2>
      <p>
        Content production, social media, advertising, email and automation services are governed by each
        client&apos;s written agreement, including its payment and cancellation terms. This refund policy does not
        apply to them.
      </p>

      <h2>6. Contact us</h2>
      <ContactBlock />
    </LegalPage>
  );
}
