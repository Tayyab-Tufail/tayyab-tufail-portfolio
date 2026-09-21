'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel.tsx';
import type { Project } from '@/lib/projects';

export function ProjectSpotlight({ projects, onOpen }: { projects: Project[]; onOpen: (project: Project) => void }) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update(); api.on('select', update); api.on('reInit', update);
    return () => { api.off('select', update); api.off('reInit', update); };
  }, [api]);
  return <div className="spotlight-wrap">
    <Carousel setApi={setApi} opts={{ loop: true, align: 'start' }} className="hero-showcase" aria-label="Project spotlight. Drag or use the arrows to browse projects.">
      <div className="showcase-top"><span><i /> PROJECT SPOTLIGHT</span><span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span></div>
      <CarouselContent className="spotlight-track">{projects.map((p, index) => <CarouselItem className="spotlight-slide" key={p.id} aria-label={`${index + 1} of ${projects.length}: ${p.title}`}>
        <button className="spotlight-open" onClick={() => onOpen(p)} tabIndex={index === active ? 0 : -1} aria-label={`Open ${p.title} project`}>
          <div className={'showcase-image spotlight-image spotlight-image-' + p.id}><img src={'/images/' + p.images[0].file} alt={p.images[0].caption} draggable={false} loading={index === 0 ? 'eager' : 'lazy'} /></div>
          <div className="showcase-caption"><div><span className="eyebrow">{p.category}</span><h2>{p.title}</h2><p>{p.description}</p></div><span className="circle-link"><ArrowUpRight /></span></div>
          <div className="showcase-footer">{p.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
        </button>
      </CarouselItem>)}</CarouselContent>
      <div className="spotlight-controls"><span><MoveHorizontal size={17} /> Drag to explore · Click to open</span><div><button aria-label="Previous project" onClick={() => api?.scrollPrev()}><ArrowLeft size={18} /></button><button aria-label="Next project" onClick={() => api?.scrollNext()}><ArrowRight size={18} /></button></div></div>
    </Carousel>
    <div className="spotlight-pagination" aria-label="Choose a spotlight project">{projects.map((p, i) => <button key={p.id} onClick={() => api?.scrollTo(i)} aria-label={`Show ${p.title}`} aria-current={active === i ? 'true' : undefined}><span /></button>)}</div>
  </div>;
}
