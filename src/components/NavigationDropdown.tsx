import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, CSSProperties } from 'react';
import { ChevronDown, MoreHorizontal, X } from 'lucide-react';
import type { NavigationLink } from '../data/navigation';
import { motion } from '../hooks/usePageMotion';

export default function NavigationDropdown({ links, active, mobile = false }: { links: readonly NavigationLink[]; active: string; mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const desiredOpen = useRef(false);
  const focusedItem = useRef<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const frames = useRef<number[]>([]);

  const close = useCallback((restoreFocus = false) => {
    desiredOpen.current = false;
    frames.current.forEach(cancelAnimationFrame);
    frames.current = [];
    clearTimeout(timer.current);
    setOpen(false);
    if (restoreFocus) {
      if (button.current?.getClientRects().length) button.current.focus();
      else {
        const href = document.activeElement?.getAttribute('href') ?? focusedItem.current;
        const matchingLink = href ? document.querySelector<HTMLAnchorElement>(`.desktop-nav > a[href="${href}"]`) : null;
        const alternatives = [matchingLink, document.querySelector<HTMLElement>('.desktop-overflow .overflow-toggle'), document.querySelector<HTMLElement>('.menu-toggle'), document.querySelector<HTMLElement>('.desktop-nav > a')];
        alternatives.find(element => element?.getClientRects().length)?.focus();
      }
    }
    focusedItem.current = null;
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : motion.interface;
    timer.current = window.setTimeout(() => setMounted(false), delay);
  }, []);

  const show = (focus?: 'first' | 'last') => {
    focusedItem.current = null;
    desiredOpen.current = true;
    clearTimeout(timer.current);
    setMounted(true);
    // Give the mounted panel its closed style before starting its transition.
    frames.current.push(requestAnimationFrame(() => {
      frames.current.push(requestAnimationFrame(() => {
        if (!desiredOpen.current) return;
        setOpen(true);
        if (focus) frames.current.push(requestAnimationFrame(() => {
          const items = panel.current?.querySelectorAll<HTMLAnchorElement>('a');
          items?.[focus === 'first' ? 0 : items.length - 1]?.focus();
        }));
      }));
    }));
  };

  useEffect(() => {
    close(desiredOpen.current);
  }, [links, close]);

  useEffect(() => {
    if (!mounted) return;
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) close(panel.current?.contains(document.activeElement) ?? false);
    };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(true); }
    };
    const focusOutside = (event: FocusEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) close();
    };
    const resize = () => close(desiredOpen.current);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    document.addEventListener('focusin', focusOutside);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('focusin', focusOutside);
      window.removeEventListener('resize', resize);
    };
  }, [mounted, close]);
  useEffect(() => () => { clearTimeout(timer.current); frames.current.forEach(cancelAnimationFrame); }, []);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, section: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    close();

    const target = document.getElementById(section);
    if (!target) return;

    const header = document.querySelector<HTMLElement>('.header');
    const headerOffset = (header?.getBoundingClientRect().height ?? 94) + 20;

    let top = 0;
    let curr: HTMLElement | null = target;
    while (curr) {
      top += curr.offsetTop;
      curr = curr.offsetParent as HTMLElement | null;
    }
    const targetY = Math.max(0, top - headerOffset);

    type LenisLike = { scrollTo: (target: HTMLElement | number, options?: { offset?: number; immediate?: boolean }) => void };
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;

    if (lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis.scrollTo(target, { offset: -headerOffset });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }

    try {
      history.pushState(null, '', section === 'home' ? window.location.pathname : `#${section}`);
    } catch {
      // fallback
    }
  };

  const keys = (event: KeyboardEvent<HTMLElement>) => {
    const items = [...(panel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])];
    if (!items.length) return;
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.key === 'ArrowDown' ? (index + 1) % items.length : event.key === 'ArrowUp' ? (index - 1 + items.length) % items.length : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : -1;
    if (next >= 0) { event.preventDefault(); items[next]?.focus(); }
  };

  const id = mobile ? 'mobile-nav' : 'desktop-more-nav';
  const controls = <>
    <button ref={button} className={mobile ? 'menu-toggle' : 'overflow-toggle'} aria-label={mobile ? open ? 'Close navigation' : 'Open navigation' : 'More sections'} aria-expanded={open} aria-controls={id} data-open={open} data-active={!mobile && links.some(([section]) => section === active)}
      onClick={() => desiredOpen.current ? close(true) : show()}
      onKeyDown={event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          show(event.key === 'ArrowDown' ? 'first' : 'last');
        }
      }}>
      {mobile ? <><MoreHorizontal className="menu-dots" aria-hidden="true"/><X className="menu-close" aria-hidden="true"/></> : <>More<ChevronDown size={15} aria-hidden="true"/></>}
    </button>
    <nav ref={panel} id={id} className={`mobile-nav${mobile ? '' : ' overflow-nav'}`} aria-label={mobile ? 'Mobile navigation' : 'More navigation'} hidden={!mounted} aria-hidden={!open} data-open={open} onKeyDown={keys} onFocusCapture={event => { focusedItem.current = (event.target as HTMLElement).closest('a')?.getAttribute('href') ?? null; }}>
      {links.map(([section,label],index) => (
        <a
          key={section}
          href={`#${section}`}
          style={{ '--item-index': index } as CSSProperties}
          className={active === section ? 'active' : ''}
          aria-current={active === section ? 'location' : undefined}
          onClick={(e) => handleLinkClick(e, section)}
        >
          {label}
        </a>
      ))}
    </nav>
  </>;
  return mobile ? controls : <div className="desktop-overflow" hidden={!links.length}>{controls}</div>;
}
