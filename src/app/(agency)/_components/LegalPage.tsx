import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

// Plain text of a heading's children (strings, numbers and nested elements).
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
}
const slug = (s: string) =>
  s.toLowerCase().replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Shared layout + typography for /privacy, /terms and /refund. The wording lives in
// each page; this only adds anchors to the existing <h2>s and lists them as a contents.
export default function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  const toc: { id: string; label: string }[] = [];
  const body = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === 'h2') {
      const el = child as ReactElement<{ id?: string; children?: ReactNode }>;
      const label = textOf(el.props.children);
      const id = el.props.id ?? slug(label);
      toc.push({ id, label });
      return cloneElement(el, { id });
    }
    return child;
  });

  return (
    <main className="legal" data-ground="light">
      <header className="legal__head">
        <h1>{title}</h1>
        <p className="legal__updated">Last updated: {lastUpdated}</p>
        <p className="legal__note">
          This page is provided for general information and will be reviewed by legal counsel.
        </p>
      </header>
      <div className="legal__body">
        <nav className="toc" aria-label="On this page">
          <p>On this page</p>
          <ol>
            {toc.map((t) => (
              <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>
            ))}
          </ol>
        </nav>
        <article className="prose">{body}</article>
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
