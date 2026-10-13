import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { navigationLinks } from '../data/navigation';
import NavigationDropdown from './NavigationDropdown';
import ThemeToggle from './ThemeToggle';
import './Navigation.css';

export default function Navigation({ active, registerHref, completed }: { active: string; registerHref: string; completed: boolean }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [indicator, setIndicator] = useState({ x: 0, width: 0, visible: false });
  const available = useRef<HTMLDivElement>(null);
  const desktop = useRef<HTMLElement>(null);
  const measurements = useRef<HTMLDivElement>(null);
  const overflowLinks = useMemo(() => navigationLinks.slice(visibleCount), [visibleCount]);

  useEffect(() => {
    let disposed = false;
    let focusFrame = 0;
    const fit = () => {
      if (disposed || !available.current || !measurements.current || !desktop.current || !available.current.clientWidth) return;
      const widths = [...measurements.current.querySelectorAll<HTMLElement>('[data-link-width]')].map(element => element.getBoundingClientRect().width);
      const moreWidth = measurements.current.querySelector<HTMLElement>('button')?.getBoundingClientRect().width ?? 80;
      const gap = parseFloat(getComputedStyle(desktop.current).columnGap) || 0;
      const space = available.current.clientWidth - 8;
      const allWidth = widths.reduce((sum, width) => sum + width, 0) + gap * (widths.length - 1);
      let count = widths.length;
      if (allWidth > space) {
        count = 0;
        let used = moreWidth;
        while (count < widths.length - 1 && used + widths[count] + gap <= space) {
          used += widths[count] + gap;
          count++;
        }
      }
      // When More disappears, restore keyboard focus after the new links render.
      const focused = document.activeElement as HTMLElement | null;
      if (count === widths.length && desktop.current.contains(focused) && focused?.closest('.desktop-overflow')) {
        const href = focused.getAttribute('href') ?? `#${navigationLinks[0][0]}`;
        cancelAnimationFrame(focusFrame);
        focusFrame = requestAnimationFrame(() => desktop.current?.querySelector<HTMLAnchorElement>(`:scope > a[href="${href}"]`)?.focus());
      }
      setVisibleCount(previous => previous === count ? previous : count);
    };
    fit();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(fit) : undefined;
    if (available.current) observer?.observe(available.current);
    if (measurements.current) observer?.observe(measurements.current);
    window.addEventListener('resize', fit);
    document.fonts.ready.then(fit);
    return () => { disposed = true; cancelAnimationFrame(focusFrame); observer?.disconnect(); window.removeEventListener('resize', fit); };
  }, []);

  useEffect(() => {
    const update = () => {
      const nav = desktop.current;
      const current = nav?.querySelector<HTMLElement>(`:scope > a[href="#${active}"]`) ?? nav?.querySelector<HTMLElement>('.overflow-toggle[data-active="true"]');
      if (!nav || !current) { setIndicator(previous => ({ ...previous, visible: false })); return; }
      setIndicator({ x: current.getBoundingClientRect().left - nav.getBoundingClientRect().left, width: current.offsetWidth, visible: true });
    };
    update();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : undefined;
    if (desktop.current) observer?.observe(desktop.current);
    window.addEventListener('resize', update);
    return () => { observer?.disconnect(); window.removeEventListener('resize', update); };
  }, [active, visibleCount]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const target = document.getElementById(id);
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
      history.pushState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
    } catch {}
  };

  return <>
    <div ref={available} className="desktop-navigation">
      <nav ref={desktop} className="desktop-nav" aria-label="Main navigation">
        {navigationLinks.slice(0, visibleCount).map(([id,label]) => (
          <a
            className={active === id ? 'active' : ''}
            aria-current={active === id ? 'location' : undefined}
            key={id}
            href={`#${id}`}
            onClick={(e) => handleNavClick(e, id)}
          >
            {label}
          </a>
        ))}
        <NavigationDropdown links={overflowLinks} active={active}/>
        <span className="nav-indicator" aria-hidden="true" style={{ transform: `translateX(${indicator.x}px) scaleX(${indicator.width})`, opacity: indicator.visible ? 1 : 0 }}/>
        <div ref={measurements} className="nav-measure" aria-hidden="true" inert>
          {navigationLinks.map(([id,label]) => <span data-link-width key={id}>{label}</span>)}
          <button className="overflow-toggle" tabIndex={-1}>More<ChevronDown size={15}/></button>
        </div>
      </nav>
    </div>
    <a className="button header-register" href={registerHref} target="_blank" rel="noopener noreferrer">{completed ? 'Brochure' : 'Register now'}</a>
    <div className="header-theme-wrapper">
      <ThemeToggle />
    </div>
    <NavigationDropdown links={navigationLinks} active={active} mobile/>
  </>;
}
