import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { ContactBlock } from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service — Lead Your Marketing',
  description: 'Terms for using the Lead Your Marketing website and lead tool.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="October 8, 2026">
      <p>
        These terms apply to your use of the yourlead.io website and the lead tool at{' '}
        <Link href="/leadgentool">/leadgentool</Link>, both operated by Lead Your Marketing, Ontario, Canada
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the website or the lead tool, you agree to these terms. If
        you don&apos;t agree, please don&apos;t use them.
      </p>
      <p>
        Agency services (content production, social media, ads, email and automation) are governed by the written
        agreement we sign with each client. If that agreement conflicts with these terms, the agreement wins.
      </p>

      <h2>1. Using the website</h2>
      <ul>
        <li>Use the site only for lawful purposes.</li>
        <li>Don&apos;t try to break, overload, scrape or gain unauthorized access to the site or its systems.</li>
        <li>Information you send us (for example, through the quote form) must be accurate and yours to share.</li>
      </ul>

      <h2>2. The lead tool</h2>
      <ul>
        <li>
          The lead tool is a subscription service with a 7-day free trial. Pricing is shown at sign-up. Billing,
          cancellation and refunds are covered by our <Link href="/refund">Refund Policy</Link>.
        </li>
        <li>You&apos;re responsible for how you use the leads and suggested messages, including following the rules of any platform you reply on and any laws that apply to your outreach.</li>
        <li>We may change, pause or discontinue features of the lead tool. If we discontinue it entirely, we&apos;ll give reasonable notice.</li>
      </ul>

      <h2>3. No guarantee of results</h2>
      <p>
        Marketing results depend on many things outside our control — your market, competition, pricing, budget,
        and how quickly you follow up. We do our best work, but we don&apos;t guarantee any specific number of
        leads, sales, views, rankings or return on ad spend, from the website, the lead tool or our services.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        The website, its content, design and the lead tool belong to Lead Your Marketing or our licensors. You may
        view and use them for your own business purposes, but you may not copy, resell or redistribute them
        without our written permission. Ownership of content we create for clients is set out in each
        client&apos;s agreement.
      </p>

      <h2>5. Third-party services and links</h2>
      <p>
        The site and lead tool rely on and link to third-party services (such as Stripe, Google and social media
        platforms). We aren&apos;t responsible for their content, availability or practices.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        The website and lead tool are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the fullest
        extent allowed by law, we aren&apos;t liable for indirect, incidental, special or consequential losses, or
        for lost profits, revenue or data. Our total liability for any claim relating to the website or the lead
        tool is limited to the amount you paid us for the lead tool in the 3 months before the claim arose (or
        CAD $100 if you haven&apos;t paid us anything). Nothing in these terms limits liability that can&apos;t be
        limited by law.
      </p>

      <h2>7. Governing law</h2>
      <p>
        These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply
        there. Any dispute will be handled by the courts of Ontario.
      </p>

      <h2>8. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at the top shows when they
        last changed. If you keep using the website or the lead tool after a change, you accept the updated terms.
      </p>

      <h2>9. Contact us</h2>
      <ContactBlock />
    </LegalPage>
  );
}
