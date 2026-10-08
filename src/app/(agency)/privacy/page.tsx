import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { ContactBlock } from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Lead Your Marketing',
  description: 'How Lead Your Marketing collects, uses and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="October 8, 2026">
      <p>
        This policy explains what personal information Lead Your Marketing (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
        collects through yourlead.io, why we collect it, who helps us process it, and the choices you have. We
        follow Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA).
      </p>

      <h2>1. What we collect</h2>
      <h3>Quote requests</h3>
      <p>When you fill in the quote form on our website, we collect:</p>
      <ul>
        <li>your name, company name, phone number and email address;</li>
        <li>the services you&apos;re interested in and any comment you add;</li>
        <li>the page you sent the form from.</li>
      </ul>
      <h3>Lead tool sign-ups</h3>
      <p>
        When you sign up for our lead tool at <Link href="/leadgentool">/leadgentool</Link>, we collect your name,
        email address and business details (business name, service, location and the description you provide).
        Payments are handled by Stripe; we do not see or store your full card details.
      </p>
      <h3>Analytics and cookies — only with your consent</h3>
      <p>
        If you click &ldquo;Accept&rdquo; on our cookie banner, we collect information about how you use the site
        (for example, pages visited, device and browser type, and approximate location) through Google Analytics
        and, where enabled, the Meta Pixel. If you decline, these tools are not loaded.
      </p>

      <h2>2. Why we use it</h2>
      <ul>
        <li>To reply to your quote request and talk with you about your project.</li>
        <li>To provide the lead tool, manage your subscription and send you service emails.</li>
        <li>With your consent, to understand how the site is used, improve it, and measure and improve our ads.</li>
      </ul>
      <p>We only use your information for these purposes, or as required by law.</p>

      <h2>3. Emails from us</h2>
      <p>
        If you request a quote, we will reply about your request. We will not add you to any newsletter or
        marketing list unless you separately agree to it, and every marketing email will include an unsubscribe
        link.
      </p>

      <h2>4. Where your information is stored</h2>
      <p>
        We use service providers that store or process information outside Quebec and outside Canada, mainly in
        the United States: Vercel (hosting), Make.com (form automation), Google (Sheets, Analytics), Resend (email
        delivery), Meta (advertising, only with your consent) and Stripe (payments). Information stored outside
        Canada may be accessible to authorities there under local law. We choose providers with recognized
        security practices.
      </p>

      <h2>5. Cookies</h2>
      <ul>
        <li>
          <strong>lym_consent</strong> — remembers whether you accepted or declined cookies, so we don&apos;t ask
          again. Kept for 12 months.
        </li>
        <li>
          <strong>Google Analytics cookies</strong> (such as <code>_ga</code> and <code>_ga_*</code>) — tell visits
          apart so we can count visitors and see how the site is used. Set only after you accept.
        </li>
        <li>
          <strong>Meta Pixel cookies</strong> (such as <code>_fbp</code>) — help us measure and improve our ads on
          Facebook and Instagram. Set only after you accept, and only if the pixel is enabled.
        </li>
      </ul>
      <p>
        You can change your choice at any time with the &ldquo;Cookie settings&rdquo; link in the footer of our
        website. You can also delete cookies in your browser settings.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep quote requests and other enquiries for up to 24 months, unless you become a client — in that case
        we keep your information for as long as we work together and as needed for our legal and accounting
        obligations. Lead tool account and billing records are kept while your subscription is active and
        afterwards as required by law.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You can ask to access the personal information we hold about you, correct it, or delete it. You can also
        withdraw your consent to analytics and advertising cookies at any time. Send access, correction and
        deletion requests to our Privacy Officer, Tim Vygovskyi, at{' '}
        <a href="mailto:hello@yourlead.io">hello@yourlead.io</a> and we&apos;ll respond within 30 days.
      </p>
      <p>
        If you&apos;re not satisfied with our response, you can contact the Office of the Privacy Commissioner of
        Canada.
      </p>

      <h2>8. Things we don&apos;t do</h2>
      <ul>
        <li>We do not sell your personal information.</li>
        <li>Our website and services are not directed at children under 16, and we don&apos;t knowingly collect their information.</li>
      </ul>

      <h2>9. Safeguards</h2>
      <p>
        We use reasonable technical and organizational measures to protect your information, and we only give
        access to people and providers who need it.
      </p>

      <h2>10. If something goes wrong</h2>
      <p>
        If a privacy incident creates a risk of serious harm, we will notify the affected people and report it to
        the Office of the Privacy Commissioner of Canada (and Quebec&apos;s Commission d&apos;accès à
        l&apos;information where required), and keep a record of the incident.
      </p>

      <h2>11. Privacy Officer</h2>
      <p>
        Tim Vygovskyi, Founder, is responsible for this policy and for how Lead Your Marketing handles personal
        information. Contact: <a href="mailto:hello@yourlead.io">hello@yourlead.io</a>,{' '}
        <a href="tel:+16477041489">+1 647 704 1489</a>.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top shows when it
        last changed.
      </p>

      <h2>13. Contact us</h2>
      <ContactBlock />
    </LegalPage>
  );
}
