import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from '../hooks/usePageMotion';

/** Retain native details/summary semantics, including Enter and Space support. */
export default function AnimatedAccordion({ summary, children, defaultOpen = false }: { summary: ReactNode; children: ReactNode; defaultOpen?: boolean }) {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation>(null);
  const desired = useRef(defaultOpen);
  const [expanded, setExpanded] = useState(defaultOpen);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      if (!preference.matches || !animation.current) return;
      animation.current.cancel();
      animation.current = null;
      if (details.current) details.current.open = desired.current;
      if (body.current) body.current.style.overflow = '';
    };
    preference.addEventListener('change', settle);
    return () => { animation.current?.cancel(); preference.removeEventListener('change', settle); };
  }, []);
  const toggle = () => {
    const element = details.current, content = body.current;
    if (!element || !content) return;
    const opening = !desired.current;
    desired.current = opening;
    setExpanded(opening);
    const start = element.open ? content.getBoundingClientRect().height : 0;
    const startOpacity = animation.current ? Number(getComputedStyle(content).opacity) : opening ? 0.4 : 1;
    animation.current?.cancel();
    animation.current = null;
    element.open = true;
    content.inert = !opening;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || typeof content.animate !== 'function') {
      element.open = opening;
      content.style.overflow = '';
      return;
    }
    const end = opening ? content.scrollHeight : 0;
    content.style.overflow = 'hidden';
    let current: Animation;
    try {
      current = content.animate([{ height: `${start}px`, opacity: startOpacity }, { height: `${end}px`, opacity: opening ? 1 : 0 }], { duration: motion.interface, easing: motion.easing, fill: 'both' });
    } catch {
      element.open = opening;
      content.style.overflow = '';
      return;
    }
    animation.current = current;
    current.finished.then(() => {
      if (animation.current !== current) return;
      element.open = opening;
      current.cancel();
      animation.current = null;
      content.style.overflow = '';
    }, () => {});
  };
  return <details ref={details} className="accordion reveal" open={defaultOpen} data-expanded={expanded}>
    <summary aria-expanded={expanded} onClick={event => { event.preventDefault(); toggle(); }}>{summary}</summary>
    <div ref={body} className="accordion-body" inert={!expanded}>{children}</div>
  </details>;
}
