'use client';
import { ArrowDown, ArrowUpRight, Check, Images, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog.tsx';
import { projectDetails } from '@/lib/project-details.ts';
import type { Project } from '@/lib/projects';
const videos: Record<string, { file: string; caption: string }> = {
  medbot: { file: 'medbot-demo.mp4', caption: 'Recorded multi-task mission in the simulated hospital.' },
  'gesture-robot': { file: 'gesture-robot-demo.mp4', caption: 'Recorded gesture-controlled demonstration. The participant’s face is blurred in the original presentation copy.' },
  'autonomous-robot': { file: 'autonomous-robot-demo.mp4', caption: 'Recorded demonstration in the retained proposal validation world.' },
};
export function ProjectDialog({ project: p, onClose }: { project: Project | null; onClose: () => void }) {
  const detail = p ? projectDetails[p.id] : null;
  return <Dialog open={Boolean(p)} onOpenChange={open => { if (!open) onClose(); }}><DialogContent className={`project-dialog ${p?.id === 'asaan-mazdoor' ? 'gallery-has-borders' : ''}`}>
    {p && <>
      <p className="eyebrow">{p.category}</p><DialogTitle className="case-title">{p.title}</DialogTitle><DialogDescription className="case-description">{p.description}</DialogDescription>
      <div className="case-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <a className="case-gallery-jump" href="#case-gallery"><Images size={17} /> Explore {p.images.length} project images <ArrowDown size={16} /></a>
      <div className="case-overview"><div><h4>Project overview</h4><p>{p.summary}</p><h4>Key capabilities</h4><ul>{p.features.map(f => <li key={f}><Check size={16} /><span>{f}</span></li>)}</ul></div><aside><p className="eyebrow">OUTCOME & EVIDENCE</p><p className="result-copy">{p.result}</p><p className="context-copy">{p.context}</p></aside></div>
      {detail && <><div className="case-deep-dive"><section><span className="detail-number">01</span><h4>The problem</h4><p>{detail.challenge}</p></section><section><span className="detail-number">02</span><h4>The approach</h4><p>{detail.approach}</p></section></div><section className="case-workflow"><p className="eyebrow">HOW IT FITS TOGETHER</p><ol>{detail.workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></section></>}
      <div className="gallery-heading" id="case-gallery"><h4>Inside the project</h4><span>{p.images.length} images · Select any image to see it full size</span></div>
      <div className="output-gallery">{p.images.map((im, index) => <figure key={im.file}><a href={'/images/' + im.file} target="_blank" rel="noreferrer" aria-label={'Open full-size image: ' + im.caption}><img src={'/images/' + im.file} alt={im.caption} loading="lazy" decoding="async" /><span className="gallery-image-number">{String(index + 1).padStart(2, '0')}</span><span className="expand-image"><Maximize2 size={17} /></span></a><figcaption>{im.caption}</figcaption></figure>)}</div>
      {videos[p.id] && <figure className="project-video"><h4>Watch the demonstration</h4><video controls preload="none" poster={'/images/' + p.images[0].file} aria-label={p.title + ' recorded demonstration'}><source src={'/videos/' + videos[p.id].file} type="video/mp4" />Your browser does not support video playback.</video><figcaption>{videos[p.id].caption}</figcaption></figure>}
      <div style={{display:'flex', gap:'16px', flexWrap:'wrap', marginTop:'24px'}}>{p.githubUrl && <a className="case-contact" href={p.githubUrl} target="_blank" rel="noreferrer" style={{background:'#0f172a', color:'#ffffff', borderColor:'#334155'}}>View GitHub Repository <ArrowUpRight size={18} /></a>}<a className="case-contact" href={'mailto:tayyabmalik1655@gmail.com?subject=' + encodeURIComponent('Project enquiry: ' + p.title)}>Have a similar idea? Let’s talk <ArrowUpRight size={18} /></a></div>
    </>}
  </DialogContent></Dialog>;
}
