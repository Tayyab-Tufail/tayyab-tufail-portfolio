'use client';
import { ArrowUpRight, Images } from 'lucide-react';
import type { Project } from '@/lib/projects';
export function ProjectCard({ project: p, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return <article className="project-card" id={'project-' + p.id}>
    <button className="project-visual" onClick={() => onOpen(p)} aria-label={`Explore ${p.title}`}><img src={'/images/' + p.images[0].file} alt={p.images[0].caption} loading="lazy" decoding="async" /><span className="project-number">{String(index + 1).padStart(2, '0')}</span><span className="image-count"><Images size={14} />{p.images.length} images</span><span className="visual-open"><ArrowUpRight size={23} /></span></button>
    <div className="project-body"><p className="eyebrow">{p.category}</p><h3>{p.title}</h3><p>{p.description}</p><div className="tech-tags">{p.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><div style={{display:'flex', gap:'12px', alignItems:'center', marginTop:'12px'}}><button onClick={() => onOpen(p)} className="case-study-trigger">Explore the project <ArrowUpRight size={18} /><span className="sr-only">: {p.title}</span></button>{p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-link" style={{fontSize:'13px', fontWeight:'700'}} onClick={e => e.stopPropagation()}>GitHub Repo <ArrowUpRight size={15} /></a>}</div></div>
  </article>;
}
