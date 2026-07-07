import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, Cpu, Compass, Sliders, Sparkles, Database, Search } from 'lucide-react';
import { holographicPages } from '@/lib/holographic-data';

export const metadata: Metadata = {
  title: 'Holographic Technical Index | holograph.cc',
  description: 'The master registry of holographic documentation nodes. Explore state-of-the-art research in wavefront reconstruction, volumetric displays, laser physics, and spatial light modulators.',
  keywords: ['holography index', 'holographic research', 'wavefront physics', 'optical engineering', '3d projection database'],
  openGraph: {
    title: 'Holographic Technical Index | holograph.cc',
    description: 'Master directory of dynamic holographic nodes, including wavefront reconstruction systems, spatial modulators, and laser optics.',
    url: 'https://www.holograph.cc/tech',
    siteName: 'holograph.cc',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.holograph.cc/tech',
  }
};

export default function TechIndexPage() {
  // Group pages by category
  const categories = Array.from(new Set(holographicPages.map(p => p.category)));
  
  // Custom descriptions for each category to enrich SEO text
  const categoryIntro: Record<string, string> = {
    'Displays': 'Advanced display arrays, light-field vectors, and glass-free volumetric interfaces.',
    'Systems': 'Dynamic projection hardware, multi-channel laser grids, and system calibrations.',
    'Physics': 'Quantum mechanics, wave interference equations, and coherence dynamics.',
    'Optics': 'wavefront diffraction patterns, refractive modulation, and holographic optical elements.',
    'Applications': 'Real-world industrial diagnostics, bio-imaging microscopy, and touch interaction modules.',
    'Materials': 'Photopolymer chemistry, standing-wave films, and physical recording substrates.'
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0715] via-[#0c0a15] to-[#04050f] text-neutral-100 font-sans antialiased overflow-x-hidden">
      
      {/* High-Tech Decorative Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1f1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Page Header */}
      <header className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex justify-between items-center z-10 border-b border-neutral-900/80">
        <Link 
          href="/" 
          className="font-mono text-xs tracking-[0.25em] text-neutral-400 hover:text-emerald-400 font-medium transition-colors"
        >
          holograph.cc
        </Link>
        <span className="font-mono text-[9px] tracking-[0.15em] text-emerald-400/90 uppercase border border-emerald-500/30 px-3 py-1 rounded bg-emerald-950/10 flex items-center gap-1.5">
          <Database className="w-3 h-3" />
          SYSTEM DIRECTORY
        </span>
      </header>

      {/* Main Grid Workspace */}
      <main className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 py-12 z-10 space-y-12">
        
        {/* Intro Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#a3a3a3] hover:text-emerald-400 uppercase transition-all duration-300 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            [ PORTAL CONSOLE ]
          </Link>
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              COHERENT SIGNAL MAPPING
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-none filter drop-shadow-[0_2px_15px_rgba(255,255,255,0.08)]">
              TECHNICAL SPEC INDEX
            </h1>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl">
            A comprehensive, high-contrast repository cataloging the physical formulas, optic setups, systems hardware, and spatial applications of dynamic wave-reconstructed holography. Fully mapped for planetary crawler optimization.
          </p>
        </div>

        {/* Categories Bento Grid Section */}
        <section className="space-y-16">
          {categories.map((cat) => {
            const catPages = holographicPages.filter(p => p.category === cat);
            
            return (
              <div key={cat} className="space-y-6 scroll-mt-24" id={`cat-${cat.toLowerCase()}`}>
                {/* Category Header */}
                <div className="border-b border-neutral-900 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h2 className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white uppercase font-bold">
                      {cat} SYSTEMS
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">
                    {categoryIntro[cat] || 'Technical documentation nodes related to ' + cat}
                  </span>
                </div>

                {/* Subgrid list of cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catPages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/tech/${page.slug}`}
                      className="group flex flex-col justify-between p-6 rounded-xl bg-[#0d0a16]/40 border border-neutral-800/80 hover:border-emerald-500/35 hover:bg-[#110e1e]/60 transition-all duration-300 shadow-lg hover:shadow-emerald-950/5 relative overflow-hidden"
                    >
                      {/* Decorative background subtle glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="space-y-3 relative z-10">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-mono text-[8px] tracking-[0.15em] text-emerald-400 uppercase font-medium bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10">
                            {page.category}
                          </span>
                          <span className="font-mono text-[8px] tracking-widest text-neutral-600 uppercase group-hover:text-emerald-400/60 transition-colors">
                            NODE SPEC
                          </span>
                        </div>
                        <h3 className="text-sm font-mono font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-wide leading-snug">
                          {page.title}
                        </h3>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                          {page.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-900 mt-4 flex items-center justify-between relative z-10">
                        {/* Keyword list */}
                        <span className="font-mono text-[8px] text-neutral-600 uppercase tracking-wider truncate max-w-[70%]">
                          {page.keywords.slice(0, 2).join(' • ')}
                        </span>
                        <span className="font-mono text-[9px] tracking-widest text-[#a3a3a3] group-hover:text-emerald-400 uppercase flex items-center gap-1 transition-all">
                          READ SPEC <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

      </main>

      {/* Footer */}
      <footer className="relative w-full text-center py-16 z-10 border-t border-neutral-900 mt-24 select-none bg-neutral-950/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span className="font-mono text-xs tracking-[0.25em] text-[#a33cdb] mix-blend-screen filter saturate-150">
            &copy; 2026 HOLOGRAPH \\ CC-09
          </span>
          <p className="font-mono text-[9px] tracking-widest text-[#525252] uppercase max-w-md text-center sm:text-right leading-relaxed">
            All dynamic sitemap pages fully mapped and structured using JSON-LD metadata formats for maximum planetary crawl efficiency.
          </p>
        </div>
      </footer>

    </div>
  );
}
