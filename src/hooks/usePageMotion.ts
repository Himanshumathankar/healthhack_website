import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useSectionNavigation } from './useSectionNavigation';

export const motion = { interface: 260, entrance: 600, stagger: 65, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Enhance visible content and drive Lenis smooth scrolling. */
export function usePageMotion() {
  const active = useSectionNavigation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const bursts = new WeakMap<Element, { started: number; count: number }>();
    const header = document.querySelector<HTMLElement>('.header');
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    // Initialize Lenis smooth scroll if reduced-motion is not preferred
    let lenis: Lenis | undefined;
    if (!preference.matches) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      window.__lenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const update = () => {
      const height = header?.getBoundingClientRect().height ?? 94;
      document.documentElement.style.setProperty('--header-offset', `${height + 20}px`);
      const max = document.documentElement.scrollHeight - innerHeight;
      const currentScroll = lenis ? lenis.scroll : scrollY;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? currentScroll / max : 0})`;
      setShowBackToTop(currentScroll > innerHeight * 0.7);
    };

    if (lenis) {
      lenis.on('scroll', update);
    } else {
      window.addEventListener('scroll', update, { passive: true });
    }
    window.addEventListener('resize', update);

    const stopMotion = () => {
      if (preference.matches) {
        if (lenis) {
          lenis.destroy();
          lenis = undefined;
          delete window.__lenis;
        }
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    preference.addEventListener('change', stopMotion);

    update();
    const headerResize = typeof ResizeObserver === 'function' && header ? new ResizeObserver(update) : undefined;
    if (headerResize && header) headerResize.observe(header);

    if (typeof IntersectionObserver === 'function') {
      try {
        observer = new IntersectionObserver(entries => {
          const now = performance.now();
          for (const entry of entries) {
            if (!entry.isIntersecting || seen.has(entry.target)) continue;
            seen.add(entry.target);
            observer?.unobserve(entry.target);
            const element = entry.target as HTMLElement;
            element.dataset.revealed = 'true';
            const group = element.closest('[data-stagger]');
            const previous = group ? bursts.get(group) : undefined;
            const burst = previous && now - previous.started < motion.interface
              ? previous : { started: now, count: 0 };
            const position = group ? burst.count++ : 0;
            if (group) bursts.set(group, burst);
            if (preference.matches || typeof element.animate !== 'function') continue;
            try {
              const animation = element.animate([
                { opacity: 0, translate: '0 16px' },
                { opacity: 1, translate: '0 0' },
              ], { duration: motion.entrance, delay: Math.min(position, 3) * motion.stagger, easing: motion.easing, fill: 'both' });
              animations.add(animation);
              animation.finished.then(() => {
                animations.delete(animation);
                animation.cancel();
              }, () => animations.delete(animation));
            } catch { /* Default styles keep content readable */ }
          }
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(element => observer?.observe(element));
      } catch { observer?.disconnect(); }
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (lenis) {
        lenis.destroy();
        delete window.__lenis;
      }
      observer?.disconnect();
      headerResize?.disconnect();
      animations.forEach(animation => animation.cancel());
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      preference.removeEventListener('change', stopMotion);
    };
  }, []);

  return { active, progressRef, showBackToTop };
}
