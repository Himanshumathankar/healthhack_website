import { useEffect, useState } from 'react';

const positionKey = 'healthHackScroll';
const scrollKeys = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

/** One controller for anchor navigation, history restoration, and passive scroll tracking. */
export function useSectionNavigation() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const getSections = () => [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const header = document.querySelector<HTMLElement>('.header');
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const restoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    let activeId = 'home';
    let frame = 0;
    let idleTimer = 0;
    let initialFrame = 0;
    let disposed = false;
    let initialPending = true;
    let retained: { id: string; y: number } | undefined;
    let pending: { id: string; y: number; lastY: number; stable: number; started: number } | undefined;

    const height = () => header?.getBoundingClientRect().height ?? 94;
    const limit = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const show = (id: string) => {
      activeId = id;
      setActive(previous => previous === id ? previous : id);
    };
    const hashFor = (id: string) => id === 'home' ? '' : `#${encodeURIComponent(id)}`;
    const urlFor = (hash: string) => `${location.pathname}${location.search}${hash}`;
    const stateAt = (hash: string, y: number) => ({
      ...(history.state && typeof history.state === 'object' ? history.state : {}),
      [positionKey]: { hash, y },
    });
    const save = (hash = location.hash) => history.replaceState(stateAt(hash, scrollY), '', urlFor(hash));
    const sync = (id: string) => {
      show(id);
      const hash = hashFor(id);
      // replaceState changes only the address bar, never dispatching hashchange or scrolling.
      if (location.hash !== hash) save(hash);
    };
    const targetFor = (hash: string) => {
      let id = hash.slice(1) || 'home';
      try { id = decodeURIComponent(id); } catch { return undefined; }
      if (id === 'main') id = 'home';
      return document.getElementById(id) ?? getSections().find(section => section.id === id);
    };
    const topFor = (target: HTMLElement) => {
      if (target.id === 'home') return 0;
      const rect = target.getBoundingClientRect();
      const currentScroll = window.scrollY;
      const targetTop = currentScroll + rect.top;
      const headerOffset = height() + 20;
      return Math.min(limit(), Math.max(0, targetTop - headerOffset));
    };
    const viewed = () => {
      const sections = getSections();
      if (scrollY <= 8) return 'home';
      const max = limit();
      if (max > 0 && (scrollY >= max - 8 || (activeId === 'contact' && scrollY >= max - 30))) {
        return sections.at(-1)?.id ?? 'home';
      }
      const line = height() + 30;
      let index = 0;
      sections.forEach((section, i) => {
        if (section.getBoundingClientRect().top <= line) index = i;
      });
      return sections[index]?.id ?? 'home';
    };
    const finish = () => {
      if (!pending) return;
      const id = pending.id;
      pending = undefined;
      retained = { id, y: scrollY };
      sync(id);
      save();
    };
    const update = () => {
      frame = 0;
      if (initialPending) return;
      if (pending) {
        const diff = Math.abs(scrollY - pending.y);
        const reached = diff <= 3;
        const elapsed = performance.now() - pending.started;
        
        if (Math.abs(scrollY - pending.lastY) < 1) {
          pending.stable++;
        } else {
          pending.stable = 0;
        }
        pending.lastY = scrollY;
        
        if (reached || (pending.stable >= 6 && elapsed > 600) || elapsed > 3000) {
          finish();
        } else {
          frame = requestAnimationFrame(update);
        }
        return;
      }
      if (retained && Math.abs(scrollY - retained.y) <= 1) return;
      retained = undefined;
      sync(viewed());
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const navigate = (target: HTMLElement, y = topFor(target), instant = false) => {
      initialPending = false;
      retained = undefined;
      clearTimeout(idleTimer);
      const targetY = Math.min(limit(), Math.max(0, y));
      pending = { id: target.id, y: targetY, lastY: scrollY, stable: 0, started: performance.now() };
      show(target.id);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | number, options?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis && !preference.matches) {
        lenis.scrollTo(targetY, { immediate: instant });
      } else {
        window.scrollTo({ top: targetY, behavior: instant || preference.matches ? 'instant' : 'smooth' });
      }
      schedule();
    };
    const interrupt = () => {
      initialPending = false;
      retained = undefined;
      cancelAnimationFrame(initialFrame);
      if (pending) {
        pending = undefined;
        window.scrollTo({ top: scrollY, left: scrollX, behavior: 'instant' });
      }
      schedule();
    };
    const userInterrupt = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('header, nav, a, button')) return;
      interrupt();
    };
    const key = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (!event.defaultPrevented && scrollKeys.has(event.key) && !target.closest('input, textarea, select, [contenteditable="true"]')) interrupt();
    };
    const clicked = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.hasAttribute('download') || anchor.target && anchor.target !== '_self') return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      const target = targetFor(url.hash);
      if (!target) return;
      event.preventDefault();
      save();
      if (location.hash !== url.hash) history.pushState(stateAt(url.hash, topFor(target)), '', urlFor(url.hash));
      navigate(target);
    };
    const scrolled = () => {
      schedule();
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => { if (!initialPending && !pending) save(); }, 160);
    };
    const scrollEnded = () => {
      if (!initialPending && !pending) save();
      schedule();
    };
    const historyChanged = () => {
      const target = targetFor(location.hash);
      if (!target) { interrupt(); return; }
      const saved = history.state?.[positionKey];
      const y = saved?.hash === location.hash && Number.isFinite(saved.y) ? saved.y : topFor(target);
      navigate(target, y, true);
    };
    const reduced = () => {
      if (preference.matches && pending) { window.scrollTo({ top: pending.y, behavior: 'instant' }); schedule(); }
    };
    const initialHash = location.hash;
    const alignInitial = () => {
      document.fonts.ready.then(() => {
        if (disposed || !initialPending) return;
        initialFrame = requestAnimationFrame(() => {
          initialFrame = requestAnimationFrame(() => {
            if (disposed || !initialPending) return;
            const target = targetFor(initialHash);
            if (target) navigate(target, topFor(target), true);
            else { initialPending = false; schedule(); }
          });
        });
      });
    };

    document.addEventListener('click', clicked);
    window.addEventListener('scroll', scrolled, { passive: true });
    window.addEventListener('scrollend', scrollEnded);
    window.addEventListener('resize', schedule);
    window.addEventListener('wheel', userInterrupt, { passive: true });
    window.addEventListener('touchstart', userInterrupt, { passive: true });
    window.addEventListener('pointerdown', userInterrupt, { passive: true });
    window.addEventListener('keydown', key);
    window.addEventListener('popstate', historyChanged);
    window.addEventListener('hashchange', historyChanged);
    preference.addEventListener('change', reduced);
    const resize = typeof ResizeObserver === 'function' && header ? new ResizeObserver(schedule) : undefined;
    if (resize && header) resize.observe(header);
    if (document.readyState === 'complete') alignInitial();
    else window.addEventListener('load', alignInitial, { once: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initialFrame);
      clearTimeout(idleTimer);
      resize?.disconnect();
      history.scrollRestoration = restoration;
      document.removeEventListener('click', clicked);
      window.removeEventListener('scroll', scrolled);
      window.removeEventListener('scrollend', scrollEnded);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('touchstart', interrupt);
      window.removeEventListener('pointerdown', interrupt);
      window.removeEventListener('keydown', key);
      window.removeEventListener('popstate', historyChanged);
      window.removeEventListener('hashchange', historyChanged);
      window.removeEventListener('load', alignInitial);
      preference.removeEventListener('change', reduced);
    };
  }, []);

  return active;
}
