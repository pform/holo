import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Layers, Cpu, Compass, HelpCircle } from 'lucide-react';
import { getHolographicPage, holographicPages } from '@/lib/holographic-data';

// Support both Next.js 14 and Next.js 15+ async params
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return holographicPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getHolographicPage(slug);

  if (!page) {
    return {
      title: 'Holograph Technology Not Found | holograph.cc',
      description: 'The requested holographic documentation node could not be localized.',
    };
  }

  return {
    title: `${page.title} - Holographic Science & Optics | holograph.cc`,
    description: page.summary,
    keywords: [...page.keywords, 'holography', 'holograph', '3d holograms', 'wavefront reconstruction', 'spatial computing'],
    openGraph: {
      title: `${page.title} | holograph.cc`,
      description: page.summary,
      url: `https://www.holograph.cc/tech/${page.slug}`,
      siteName: 'holograph.cc',
      images: [
        {
          url: page.imageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      type: 'article',
    },
    alternates: {
      canonical: `https://www.holograph.cc/tech/${page.slug}`,
    }
  };
}

export default async function HolographicTechPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getHolographicPage(slug);

  if (!page) {
    notFound();
  }

  // Build JSON-LD structured schema data for TechArticle
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': page.title,
    'description': page.schemaDescription,
    'image': page.imageUrl,
    'category': page.category,
    'keywords': page.keywords.join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': 'Holograph',
      'url': 'https://www.holograph.cc',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.holograph.cc/assets/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.holograph.cc/tech/${page.slug}`
    },
    'articleBody': page.fullContent.join(' '),
    'datePublished': '2026-06-20T04:43:56Z',
    'dateModified': '2026-06-20T04:43:56Z',
    'author': {
      '@type': 'Organization',
      'name': 'Holograph Engineering'
    }
  };

  // Find related articles in the sitemap for maximum internal linking
  const relatedArticles = page.relatedSlugs
    .map(relatedSlug => getHolographicPage(relatedSlug))
    .filter((p): p is NonNullable<ReturnType<typeof getHolographicPage>> => !!p);

  // Browse category list (cross-linking all 40 pages in the sidebar of each page!)
  const otherPagesInSameCategory = holographicPages
    .filter(p => p.slug !== page.slug && p.category === page.category)
    .slice(0, 4);

  const allCategories = Array.from(new Set(holographicPages.map(p => p.category)));

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0715] via-[#0c0a15] to-[#04050f] text-neutral-100 font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative High-Tech Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1f1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Page Header */}
      <header className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex justify-between items-center z-10 border-b border-neutral-900/80">
        <Link 
          href="/" 
          className="font-mono text-xs tracking-[0.25em] text-neutral-400 hover:text-emerald-400 font-medium transition-colors"
        >
          holograph.cc
        </Link>
        <span className="font-mono text-[9px] tracking-[0.15em] text-emerald-400/90 uppercase border border-emerald-500/30 px-3 py-1 rounded bg-emerald-950/10">
          INDEX NODE: {page.slug.toUpperCase()}
        </span>
      </header>

      {/* Main Grid Workspace */}
      <main className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 py-10 z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Semantic Technical Article */}
        <article id="seo-hologram-article" className="lg:col-span-8 space-y-8">
          
          {/* Back Navigation Trigger */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#a3a3a3] hover:text-emerald-400 uppercase transition-all duration-300 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            [ BACK TO PORTAL CONSOLE ]
          </Link>

          {/* Article Header Metadata */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 uppercase mb-4 shadow-[0_0_10px_rgba(16,185,129,0.05)]">
              <Layers className="w-3 h-3" />
              {page.category}
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-5xl tracking-tight text-white uppercase leading-none filter drop-shadow-[0_2px_15px_rgba(255,255,255,0.08)]">
              {page.title}
            </h1>
            <p className="font-mono text-xs tracking-widest text-emerald-400/85 mt-4 uppercase leading-relaxed">
              &lt; SCIENTIFIC DOCUMENTATION &amp; FIELD STUDY &gt;
            </p>
          </div>

          {/* Premium Abstract Graphic Mockup */}
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/50 shadow-2xl">
            {/* Semantic Image tag for Googlebot indexing */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={page.imageUrl} 
              alt={`${page.title} - Optical Wavefront Path Schematics`} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-40 mix-blend-screen filter saturate-150 contrast-125"
            />
            {/* High Tech HUD Grid Overlay lines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_100%)] pointer-events-none" />
            <div className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.2em] text-neutral-500 uppercase">
              RAY PATH VECTOR SIMULATION
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[8px] tracking-[0.2em] text-emerald-400 uppercase flex items-center gap-1.5 px-2.5 py-1 bg-black/80 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ACTIVE WAVE RECONSTRUCTION
            </div>
          </div>

          {/* Core Technical Content (The absolute meat of SEO ranking) */}
          <section className="space-y-6 text-sm sm:text-base text-neutral-300 leading-relaxed font-light tracking-wide">
            
            {/* Bullet Summary */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#14121a]/50 border border-neutral-800/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] space-y-3">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-emerald-400 font-bold uppercase">
                EXECUTIVE CORE METHODOLOGY
              </h3>
              <p className="font-mono text-xs text-neutral-400 leading-relaxed uppercase">
                {page.summary}
              </p>
            </div>

            {/* Dynamic Article Paragraphs */}
            {page.fullContent.map((paragraph, index) => (
              <p key={index} className="indent-4 leading-loose text-neutral-200">
                {paragraph}
              </p>
            ))}

          </section>

          {/* Keyword Metatags cloud */}
          <div className="pt-6 border-t border-neutral-900">
            <h4 className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase mb-3">
              SEMANTIC METATAGGED CLASSIFICATIONS
            </h4>
            <div className="flex flex-wrap gap-2">
              {page.keywords.map((kw, i) => (
                <span 
                  key={i}
                  className="font-mono text-[9px] tracking-wider text-neutral-400 bg-neutral-950 px-2.5 py-1.5 rounded border border-neutral-900 hover:border-emerald-500/20 hover:text-emerald-400 transition-colors uppercase"
                >
                  #{kw.replace(/\s+/g, '-')}
                </span>
              ))}
            </div>
          </div>

          {/* Internal Mesh Linking between articles (Powerful SEO booster) */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-neutral-900 space-y-4">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase font-bold flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                COHERENT ASSOCIATED WAVE NODES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/tech/${rel.slug}`}
                    className="group flex flex-col justify-between p-4 rounded-lg bg-[#0e0c14]/40 border border-neutral-800/80 hover:border-emerald-500/30 hover:bg-[#12101a]/80 transition-all duration-300"
                  >
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.15em] text-[#8c8c8c] uppercase mb-1.5 block">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 uppercase tracking-wide leading-snug transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[8px] tracking-widest text-[#a3a3a3] uppercase mt-4 block group-hover:translate-x-1 transition-transform">
                      [ ACCESS SPEC ] &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>

        {/* Right Column: Holographic SEO Hub Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Quick-Search Category Mesh Network */}
          <div className="p-6 rounded-xl bg-[#110f18]/30 border border-neutral-800/60 shadow-lg space-y-4">
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-white uppercase font-bold flex items-center gap-2 border-b border-neutral-900 pb-3">
              <Compass className="w-4 h-4 text-emerald-400" />
              SYSTEM MAP NODES
            </h3>
            
            <div className="space-y-4 pt-1">
              {allCategories.map((cat) => {
                const totalInCat = holographicPages.filter(p => p.category === cat).length;
                return (
                  <div key={cat} className="space-y-2">
                    <span className="font-mono text-[9px] tracking-wider text-emerald-400 uppercase font-medium">
                      \\ {cat} SYSTEMS ({totalInCat})
                    </span>
                    <ul className="space-y-1.5 pl-2.5 border-l border-neutral-900">
                      {holographicPages
                        .filter(p => p.category === cat)
                        .map((p) => (
                          <li key={p.slug}>
                            <Link 
                              href={`/tech/${p.slug}`}
                              className={`block font-mono text-[10px] uppercase tracking-wider transition-colors ${
                                p.slug === page.slug 
                                  ? 'text-emerald-400 font-bold pointer-events-none' 
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              - {p.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High-Tech Technical Glossary / Meta specifications card */}
          <div className="p-6 rounded-xl bg-black/60 border border-neutral-800/70 space-y-4">
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 uppercase font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              WAVE CONSTANTS
            </h3>
            <div className="space-y-3 font-mono text-[9px] text-[#7c7c7c] leading-relaxed uppercase">
              <p>
                <strong className="text-neutral-300">Phase tracking:</strong> Dynamic spatial phase arrays calibrated to 532nm (Emerald line) and 632nm (Neon reference) in compliance with spatial coherence algorithms.
              </p>
              <p>
                <strong className="text-neutral-300">Wavefront scale:</strong> Sub-micron pitch matching holographic diffraction grating limits.
              </p>
              <p>
                <strong className="text-neutral-300">SEO parameters:</strong> Indexable HTML structures compiled with full static site generation (SSG) for ultra-fast planetary crawling nodes.
              </p>
            </div>
          </div>

          {/* Quick Contact Handy node */}
          <div className="p-6 rounded-xl bg-gradient-to-tr from-emerald-950/20 to-transparent border border-emerald-500/20 text-center space-y-3">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-white uppercase font-bold">
              HOLOGRAPHIC FRONTIER
            </h4>
            <p className="font-mono text-[9px] tracking-wide text-neutral-400 leading-relaxed uppercase">
              Pioneering high-contrast spatial visual systems alongside founders at the edge of dimensional mediums.
            </p>
            <Link 
              href="/"
              className="inline-block mt-2 font-mono text-[9px] tracking-widest text-emerald-400 hover:text-white uppercase font-semibold border border-emerald-500/30 px-3 py-1.5 rounded hover:bg-emerald-500/10 transition-colors"
            >
              [ CONNECT SYSTEM ]
            </Link>
          </div>

        </aside>

      </main>

      {/* Footer Branded Layout with deep semantic crawler markers */}
      <footer className="relative w-full text-center py-12 z-10 border-t border-neutral-900 mt-16 select-none bg-neutral-950/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span className="font-mono text-xs tracking-[0.25em] text-[#a33cdb] mix-blend-screen filter saturate-150 saturate-200">
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
