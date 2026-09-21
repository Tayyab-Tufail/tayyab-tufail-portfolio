import type { Metadata } from 'next';
import './globals.css';
import './extended.css';
export const metadata: Metadata = {
title: 'Tayyab Tufail | Apps, Web, AI & Robotics',
description: 'Explore Tayyab Tufail’s work in apps, websites, AI, machine learning, computer vision, and robotics. Project case studies, screenshots, and real outputs.',
icons: { icon: '/favicon.svg' }
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
return <html lang="en"><body>{children}</body></html>;
}
