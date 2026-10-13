import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Film, Images, Maximize2, Play, Sparkles, X } from 'lucide-react';
import { galleryPhotos, type GalleryPhoto } from '../data/gallery';

const galleryYears = ['2026', '2025'] as const;
type GalleryYear = typeof galleryYears[number];

export default function GallerySection() {
  const [activeYear, setActiveYear] = useState<GalleryYear>('2026');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const openedFrom = useRef<HTMLElement | null>(null);
  const photosByYear = useMemo(() => ({ '2026': galleryPhotos.slice(9), '2025': galleryPhotos.slice(0, 9) }), []);
  const visiblePhotos = photosByYear[activeYear];
  const activeIndex = activePhoto ? visiblePhotos.findIndex(photo => photo.id === activePhoto.id) : -1;

  const closeLightbox = useCallback(() => {
    setActivePhoto(null);
    requestAnimationFrame(() => openedFrom.current?.focus());
  }, []);
  const openLightbox = (photo: GalleryPhoto, trigger: HTMLElement) => {
    openedFrom.current = trigger;
    setActivePhoto(photo);
  };
  const handleNext = useCallback(() => {
    if (activeIndex < 0) return;
    setActivePhoto(visiblePhotos[(activeIndex + 1) % visiblePhotos.length]);
  }, [activeIndex, visiblePhotos]);
  const handlePrev = useCallback(() => {
    if (activeIndex < 0) return;
    setActivePhoto(visiblePhotos[(activeIndex - 1 + visiblePhotos.length) % visiblePhotos.length]);
  }, [activeIndex, visiblePhotos]);

  useEffect(() => {
    if (!activePhoto) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') handleNext();
      if (event.key === 'ArrowLeft') handlePrev();
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll<HTMLButtonElement>('.gallery-lightbox button')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto, closeLightbox, handleNext, handlePrev]);

  return (
    <section id="gallery" tabIndex={-1} className="section gallery-section">
      <div className="container">
        <div className="section-heading heading-row reveal">
          <div><span className="eyebrow"><Images size={15}/> EVENT GALLERY</span><h2>Moments that moved us.<br/><span>Explore the archive.</span></h2></div>
          <p>Choose an edition and revisit the collaboration, prototypes, keynotes, and celebrations that shaped Health Hackathon.</p>
        </div>

        <div className="gallery-browser reveal">
          <aside className="gallery-year-rail" aria-label="Choose gallery year">
            <span className="gallery-year-label">EDITIONS</span><div className="gallery-year-curve" aria-hidden="true"/>
            {galleryYears.map(year => <button type="button" key={year} className={activeYear === year ? 'active' : ''} aria-pressed={activeYear === year} onClick={() => setActiveYear(year)}><span/>{year}</button>)}
          </aside>
          <div className="gallery-scroll" tabIndex={0} aria-label={`${activeYear} event photographs`}>
            <div className="gallery-grid" data-stagger>
              {visiblePhotos.map((photo, index) => (
                <button type="button" key={photo.id} className={`gallery-card gallery-card-${index % 5}`} onClick={event => openLightbox(photo, event.currentTarget)} aria-label={`View photo: ${photo.title}`}>
                  <span className="gallery-card-inner"><img src={photo.src} alt={photo.title} className="gallery-img" loading={index < 4 ? 'eager' : 'lazy'} decoding="async"/><span className="gallery-card-hover-overlay" aria-hidden="true"><span className="gallery-expand-icon"><Maximize2 size={18}/></span></span></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="gallery-video-section reveal">
          <div className="gallery-video-heading"><span className="eyebrow"><Film size={15}/> VIDEOS</span><h3>Short stories from the floor.</h3><p>Event films will autoplay silently when they become available.</p></div>
          <div className="gallery-video-empty" role="status"><span><Play size={24} fill="currentColor"/></span><div><strong>Event films coming soon</strong><small>Highlights from Health Hackathon will appear here.</small></div></div>
        </div>
        <div className="gallery-footnote reveal"><Sparkles size={18}/><p>Real moments from previous Health Hackathon editions.</p></div>
      </div>

      {activePhoto && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activePhoto.title} onMouseDown={event => { if (event.target === event.currentTarget) closeLightbox(); }}>
        <div className="lightbox-content">
          <button ref={closeButton} type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close photo"><X size={24}/></button>
          <button type="button" className="lightbox-nav prev" onClick={handlePrev} aria-label="Previous photo"><ChevronLeft size={30}/></button>
          <button type="button" className="lightbox-nav next" onClick={handleNext} aria-label="Next photo"><ChevronRight size={30}/></button>
          <div className="lightbox-image-wrap"><img src={activePhoto.src} alt={activePhoto.title} className="lightbox-img"/></div>
          <div className="lightbox-caption-bar"><div><span className="lightbox-category">{activeYear} · {activePhoto.category}</span><h3 className="lightbox-title">{activePhoto.title}</h3><p className="lightbox-desc">{activePhoto.caption}</p></div><span className="lightbox-counter">{activeIndex + 1} / {visiblePhotos.length}</span></div>
        </div>
      </div>}
    </section>
  );
}
