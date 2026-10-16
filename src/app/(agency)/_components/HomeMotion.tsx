'use client';

import { useEffect } from 'react';

type ScrollCraftInstance = { destroy: () => void };
declare global {
  interface Window {
    ScrollCraft?: { mount: (root: Element, opts?: unknown) => ScrollCraftInstance };
  }
}

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Homepage-only motion layer. Loads the scrollcraft engine (code-split, client-only),
// then runs the page's own choreography on the server-rendered markup:
//  - "darkroom develop" on the why-us and founder prints as they arrive
//  - the services peak: five prints develop together (150ms apart), scroll draws the line
//  - the process step indicator
// Everything is torn down on unmount, so client navigation away leaves nothing running.
export default function HomeMotion() {
  useEffect(() => {
    const main = document.getElementById('top');
    const root = main?.closest('.lym');
    if (!main || !root) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = matchMedia('(min-width: 1100px)').matches;
    let cancelled = false;
    let engine: ScrollCraftInstance | null = null;
    let raf = 0;
    const cleanups: (() => void)[] = [];

    // Structure decisions must be made before the engine reads the markup.
    const hero = main.querySelector<HTMLElement>('[data-sc-span="1.6"]');
    if (reduce && hero) hero.setAttribute('data-sc-act', 'flow'); // no pinned hold without motion
    const peak = main.querySelector<HTMLElement>('[data-peak]');
    const peakInner = peak?.querySelector<HTMLElement>('[data-sc-stage-slot]');
    if (peak && peakInner && wide && !reduce) {
      peak.setAttribute('data-sc-act', 'pin');
      peak.setAttribute('data-sc-span', '1.8');
      peakInner.setAttribute('data-sc-stage', '');
    }

    root.classList.add('sc-live');

    import('@/lib/scrollcraft/scrollcraft.js').then(() => {
      if (cancelled || !window.ScrollCraft) return;
      engine = window.ScrollCraft.mount(main);
      start();
    });

    function start() {
      if (!peak) return;
      // ---- flow prints: develop on entry, latch once developed
      const flowPrints = [...main!.querySelectorAll<HTMLElement>('[data-develop]')].map((el) => ({ el, d: reduce ? 1 : 0 }));

      // ---- peak prints
      const prints = [...peak.querySelectorAll<HTMLElement>('[data-print]')];
      const tray = peak.querySelector<HTMLElement>('.tray')!;
      const pathEl = peak.querySelector<SVGPathElement>('.tray__thread path')!;
      const railLine = peak.querySelector<HTMLElement>('.rail-line')!;
      const scatter = [[-38, 70, -7], [26, -46, 5], [-18, 92, -4], [44, 34, 6], [-30, -52, -5]];
      const nodes = prints.map(() => {
        const n = document.createElement('span');
        n.className = 'node'; n.setAttribute('aria-hidden', 'true'); tray.appendChild(n); return n;
      });
      cleanups.push(() => nodes.forEach((n) => n.remove()));
      const STAGGER = 150, DEVELOP = 750;
      let pathLen = 0, devStart: number | null = reduce ? -1e9 : null, devDone = reduce;

      const layoutThread = () => {
        const pts = prints.map((card) => {
          const li = card.parentElement!;
          return wide ? [li.offsetLeft + li.offsetWidth / 2, li.offsetTop - 12] : [12, li.offsetTop + 26];
        });
        pts.forEach(([x, y], i) => { nodes[i].style.left = x + 'px'; nodes[i].style.top = y + 'px'; });
        if (wide) {
          let d = `M ${pts[0][0]} ${pts[0][1]}`;
          for (let i = 1; i < pts.length; i++) {
            const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2;
            d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
          }
          pathEl.setAttribute('d', d);
          pathLen = pathEl.getTotalLength();
          pathEl.style.strokeDasharray = String(pathLen);
        }
      };
      layoutThread();
      window.addEventListener('resize', layoutThread);
      cleanups.push(() => window.removeEventListener('resize', layoutThread));
      document.fonts?.ready.then(() => { if (!cancelled) layoutThread(); });

      // Keyboard or a jump straight into the peak: never show a half-developed card.
      const onFocus = () => { if (!devDone) devStart = -1e9; };
      peak.addEventListener('focusin', onFocus);
      cleanups.push(() => peak.removeEventListener('focusin', onFocus));

      const steps = [...main!.querySelectorAll<HTMLElement>('[data-steps] > li')];
      const progress = main!.querySelector<HTMLElement>('.progress');
      const progressItems = progress ? [...progress.querySelectorAll<HTMLElement>('li')] : [];

      const frame = (now: number) => {
        const vh = window.innerHeight;

        for (const fp of flowPrints) {
          if (fp.d >= 1) continue;
          const r = fp.el.getBoundingClientRect();
          fp.d = Math.max(fp.d, clamp((vh * 0.92 - r.top) / (vh * 0.5)));
          fp.el.style.setProperty('--dev', fp.d.toFixed(3));
        }

        if (devStart === null && peak.getBoundingClientRect().top < vh * 0.45) devStart = now;
        if (!devDone) {
          const t = devStart === null ? 0 : now - devStart;
          let all = true;
          prints.forEach((card, i) => {
            const k = devStart === null ? 0 : easeOut(clamp((t - i * STAGGER) / DEVELOP));
            if (k < 1) all = false;
            const m = wide ? 1 - k : 0, [sx, sy, sr] = scatter[i];
            card.style.setProperty('--tx', (sx * m).toFixed(1) + 'px');
            card.style.setProperty('--ty', (sy * m).toFixed(1) + 'px');
            card.style.setProperty('--rot', (sr * m).toFixed(2) + 'deg');
            card.style.setProperty('--dev', k >= 1 ? '1' : k.toFixed(3));
          });
          devDone = all;
        }

        if (wide) {
          const p = parseFloat(peak.style.getPropertyValue('--sc-p')) || 0;
          const thread = reduce ? 1 : clamp((p - 0.12) / 0.6);
          if (pathLen) pathEl.style.strokeDashoffset = (pathLen * (1 - thread)).toFixed(1);
          nodes.forEach((n, i) => n.style.setProperty('--lit', thread >= i / (nodes.length - 1) - 0.001 ? '1' : '0'));
        } else {
          const grow = reduce ? 1 : clamp((vh * 0.75 - tray.getBoundingClientRect().top) / tray.offsetHeight);
          railLine.style.setProperty('--thread', grow.toFixed(3));
          nodes.forEach((n, i) => n.style.setProperty('--lit', grow >= (i + 0.2) / prints.length ? '1' : '0'));
        }

        if (progress && progress.offsetParent) {
          let cur = 0;
          steps.forEach((li, i) => { if (li.getBoundingClientRect().top < vh * 0.55) cur = i; });
          progressItems.forEach((li, i) => {
            if ((i === cur) !== li.hasAttribute('aria-current')) {
              if (i === cur) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
            }
          });
          progress.style.setProperty('--fill', (cur / (steps.length - 1)).toFixed(3));
        }

        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      engine?.destroy();
      root.classList.remove('sc-live');
    };
  }, []);

  return null;
}
