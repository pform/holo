import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HOLOGRAPH | Reality is a medium.',
  description: 'A stealth-mode spatial technology enterprise interface.',
  metadataBase: new URL('https://www.evu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HOLOGRAPH | Reality is a medium.',
    description: 'A stealth-mode spatial technology enterprise interface.',
    url: 'https://www.evu.com',
    siteName: 'EVU HOLOGRAPH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOLOGRAPH | Reality is a medium.',
    description: 'A stealth-mode spatial technology enterprise interface.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkup = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'EVU',
      'url': 'https://www.evu.com',
      'logo': 'https://www.evu.com/logo.png',
      'description': 'EVU is a stealth-mode spatial technology enterprise constructing holographic interfaces and next-generation interactive systems.',
      'knowsAbout': ['Spatial Computing', 'Holographic Interfaces', 'Interactive Systems', 'Quantum Hardware', 'Human-Computer Interaction'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'EVU HOLOGRAPH',
      'alternateName': ['EVU', 'HOLOGRAPH'],
      'url': 'https://www.evu.com',
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-[#100f13] text-neutral-100 h-full antialiased`}>
      <head>
        <script
          id="seo-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="h-full bg-[#100f13] font-sans overflow-hidden select-none" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
