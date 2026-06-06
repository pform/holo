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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-[#100f13] text-neutral-100 h-full antialiased`}>
      <body className="h-full bg-[#100f13] font-sans overflow-hidden select-none" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
