'use client';
import { useEffect, useRef, type ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add('reveal-in'); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element); return () => observer.disconnect();
  }, []);
  return <div className={'reveal ' + className} ref={ref}>{children}</div>;
}
