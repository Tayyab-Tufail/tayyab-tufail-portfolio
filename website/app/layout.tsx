import type { Metadata } from 'next';
import './globals.css';
import './extended.css';

export const metadata: Metadata = {
  title: 'Tayyab Tufail | Apps, Web, AI & Robotics',
  description: "Explore Tayyab Tufail's work in apps, websites, AI, machine learning, computer vision, and robotics. Project case studies, screenshots, and real outputs.",
  icons: { icon: '/favicon.svg' }
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme') || 'dark';
                if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
