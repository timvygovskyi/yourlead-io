import { LOCKUP, MARK } from './logoArt';

// Static, trusted SVG markup generated from the brand files. currentColor, so the
// logo takes the ink of whatever ground it sits on (cream on dark, ink on light).
export function LogoLockup({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOCKUP.viewBox} aria-hidden="true" focusable="false"
      dangerouslySetInnerHTML={{ __html: LOCKUP.inner }} />
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={MARK.viewBox} aria-hidden="true" focusable="false"
      dangerouslySetInnerHTML={{ __html: MARK.inner }} />
  );
}
