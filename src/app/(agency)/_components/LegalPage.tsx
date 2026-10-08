// Shared layout + typography for /privacy, /terms and /refund.
export default function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        This page is provided for general information and will be reviewed by legal counsel.
      </p>
      <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>
      <div className="mt-8 text-base leading-relaxed text-slate-700 [&_a]:font-medium [&_a]:text-slate-900 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-slate-900 [&_li]:mt-1.5 [&_p]:mt-4 [&_strong]:text-slate-900 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </main>
  );
}

export function ContactBlock() {
  return (
    <p>
      Lead Your Marketing, Ontario, Canada
      <br />
      Email: <a href="mailto:hello@yourlead.io">hello@yourlead.io</a>
      <br />
      Phone: <a href="tel:+16477041489">+1 647 704 1489</a>
    </p>
  );
}
