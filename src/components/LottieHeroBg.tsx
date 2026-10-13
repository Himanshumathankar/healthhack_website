import { useEffect, useRef } from 'react';

export const SLIDES = [
  { src: '/lottie/IMG_2056.webp', alt: 'Health Hackathon grand opening and inauguration' },
  { src: '/lottie/IMG_2091.webp', alt: 'Interdisciplinary student teams collaborating' },
  { src: '/lottie/IMG_3176.webp', alt: 'Hardware and AI diagnostics prototyping sprint' },
  { src: '/lottie/IMG_3228.webp', alt: 'Clinical and technical mentorship sessions' },
  { src: '/lottie/IMG_3300.webp', alt: 'Late-night coding and prototyping build' },
  { src: '/lottie/IMG_3352.webp', alt: 'Faculty and jury reviewing prototypes' },
];

export default function LottieHeroBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = () => window.innerWidth <= 980;
    const container = containerRef.current;
    if (!container) return;

    const hero = container.closest('.hero') as HTMLElement | null;
    const slides = Array.from(container.querySelectorAll<HTMLElement>('.hero-slide-item'));
    const total = slides.length;
    if (!hero || total === 0) return;

    let ticking = false;

    const updateSlides = () => {
      if (isMobile()) return;
      const heroRect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const windowH = window.innerHeight;

      // Scrollable distance within the hero pinned runway
      const scrollableDist = Math.max(1, heroHeight - windowH);
      // How much the user has scrolled into the hero runway
      const scrolled = Math.max(0, -heroRect.top);
      // Progress strictly between 0 and 1
      const progress = Math.min(1, Math.max(0, scrolled / scrollableDist));

      // Calculate which slide we are on
      const exactPos = progress * (total - 1);
      const activeIdx = Math.min(total - 1, Math.max(0, Math.floor(exactPos)));
      const blend = exactPos - activeIdx; // 0 to 1 crossfade to next slide

      slides.forEach((slide, i) => {
        if (i === activeIdx) {
          slide.style.opacity = `${(1 - blend).toFixed(3)}`;
          slide.style.transform = `scale(${(1 + (1 - blend) * 0.03).toFixed(3)})`;
          slide.style.zIndex = '2';
        } else if (i === activeIdx + 1) {
          slide.style.opacity = `${blend.toFixed(3)}`;
          slide.style.transform = `scale(${(1 + blend * 0.03).toFixed(3)})`;
          slide.style.zIndex = '3';
        } else {
          slide.style.opacity = '0';
          slide.style.transform = 'scale(1)';
          slide.style.zIndex = '1';
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateSlides);
        ticking = true;
      }
    };

    // Use Lenis if available, otherwise native scroll
    type LenisLike = { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void };
    const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
    if (lenis) {
      lenis.on('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Initial positioning
    updateSlides();

    return () => {
      if (lenis) {
        lenis.off('scroll', onScroll);
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-slideshow-wrap" aria-hidden="true">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="hero-slide-item"
          style={{
            opacity: i === 0 ? 1 : 0,
            transform: i === 0 ? 'scale(1.03)' : 'scale(1)',
            zIndex: i === 0 ? 2 : 1,
          }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="hero-slide-img"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        </div>
      ))}
    </div>
  );
}
