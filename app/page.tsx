'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Copy, Check, Eye, Sliders, RotateCcw, Power, Zap, Radio, Mail, Lock } from 'lucide-react';
import D3Hologram from '@/components/D3Hologram';

export default function Home() {
  const [accessCode, setAccessCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'authorizing' | 'success' | 'error'>('idle');
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [mathError, setMathError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic D3Hologram interactive customization states
  const [globalColorShift, setGlobalColorShift] = useState(0);
  const [speedFactor, setSpeedFactor] = useState(1.0);
  const [particleSizeScale, setParticleSizeScale] = useState(1.0);

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;

    setStatus('authorizing');

    setTimeout(() => {
      // Deactivated validation: no words will ever grant access
      setStatus('error');
    }, 1200);
  };

  const verifyMath = (e: React.FormEvent) => {
    e.preventDefault();
    if (mathAnswer.trim() === '30') {
      setVerifiedEmail(true);
      setMathError(false);
    } else {
      setMathError(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('info@holograph.cc');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative flex flex-col justify-between items-center w-full min-h-screen bg-[#100f13] px-4 sm:px-8 text-neutral-100 overflow-hidden">
      
      {/* Dynamic Aesthetic Holographic Network */}
      <D3Hologram
        intensify={status === 'success'}
        globalColorShift={globalColorShift}
        speedFactor={speedFactor}
        particleSizeScale={particleSizeScale}
      />

      {/* Retro CRT Phosphor Vignette Shadowing */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(16,15,19,0.95)_100%)] pointer-events-none z-[1]" />

      {/* Header bar */}
      <header className="relative w-full max-w-6xl flex justify-between items-center pt-8 z-10 select-none">
        <span className="font-mono text-xs tracking-[0.25em] text-neutral-300 font-medium">
          holograph.cc
        </span>
        <button
          onClick={() => setShowAbout(true)}
          className="text-[10px] font-mono tracking-[0.25em] text-emerald-400/80 hover:text-white font-semibold uppercase transition-colors"
        >
          [ ABOUT ]
        </button>
      </header>

      {/* Center Console Portal */}
      <div className={`relative flex flex-col justify-center items-center w-full flex-1 z-10 py-12 text-center transition-all duration-700 ${status === 'success' ? 'max-w-3xl' : 'max-w-xl'}`}>
        
        {/* Crisp Monospaced Logo Statement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-10 select-none px-10 py-8 rounded-2xl bg-[#121115]/30 backdrop-blur-[3px] border border-neutral-800/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_12px_35px_rgba(0,0,0,0.6)]"
        >
          <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl tracking-[0.3em] text-white uppercase leading-none filter drop-shadow-[0_2px_15px_rgba(255,255,255,0.12)]">
            HOLOGRAPH
          </h1>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-emerald-400/90 mt-5 uppercase">
            &lt; Reality is a medium &gt;
          </p>
        </motion.div>

        {/* Dynamic Interactive Window */}
        <div className="w-full min-h-[170px] flex items-center justify-center mt-3">
          <AnimatePresence mode="wait">
            
            {status === 'success' ? (
              <motion.div
                key="granted"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full bg-black/95 border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.25)] rounded-xl p-5 sm:p-7 backdrop-blur-md text-left"
              >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-500/20 pb-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h2 className="font-mono text-xs tracking-[0.2em] text-white uppercase font-bold">
                        HOLOGRAPHIC SYS // CC-09
                      </h2>
                    </div>
                    <p className="font-mono text-[9px] tracking-[0.1em] text-neutral-400 mt-1">
                      ESTABLISHED CONNECTION VIA ACCESS_KEY: {accessCode.toUpperCase() || 'EXTERNAL'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setAccessCode('');
                      setGlobalColorShift(0);
                      setSpeedFactor(1.0);
                      setParticleSizeScale(1.0);
                    }}
                    className="mt-3 sm:mt-0 flex items-center gap-2 px-3 py-1.5 rounded border border-rose-500/30 hover:bg-rose-950/20 text-rose-400 hover:text-rose-300 font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer"
                  >
                    <Power className="w-3 h-3" />
                    DISCONNECT
                  </button>
                </div>

                {/* Spatial Preset Buttons */}
                <div className="mb-5 bg-emerald-950/10 border border-emerald-500/15 rounded-lg p-3">
                  <span className="block font-mono text-[9px] tracking-[0.15em] text-emerald-400/80 mb-2.5 uppercase font-bold">
                    SELECT INTERACTIVE GEOMETRIC DYNAMIC PRESET
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'standard', label: 'STANDARD MODE', shift: 0, speed: 1.0, scale: 1.0 },
                      { id: 'quantum', label: 'QUANTUM NOIRE', shift: 275, speed: 0.45, scale: 1.5 },
                      { id: 'hyper', label: 'WARP STREAM', shift: 190, speed: 2.2, scale: 1.9 },
                      { id: 'amber', label: 'RETRO CHRONOS', shift: 32, speed: 1.3, scale: 0.8 },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setGlobalColorShift(preset.shift);
                          setSpeedFactor(preset.speed);
                          setParticleSizeScale(preset.scale);
                        }}
                        className={`px-2.5 py-2 rounded text-[9px] font-mono tracking-wider text-center uppercase border transition-all duration-300 cursor-pointer ${
                          globalColorShift === preset.shift &&
                          speedFactor === preset.speed &&
                          particleSizeScale === preset.scale
                            ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.15)] font-bold'
                            : 'bg-black/50 border-neutral-800 hover:border-emerald-500/40 text-neutral-400 hover:text-emerald-400'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Sliders and Controls Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Slider 1: Hue Rotation */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[9px] tracking-[0.15em] text-emerald-500/80 uppercase font-bold flex items-center gap-1.5">
                        <Sliders className="w-3 h-3 text-emerald-400" />
                        SPECTRAL HUE
                      </label>
                      <span className="font-mono text-[9px] text-neutral-400 font-bold">
                        {globalColorShift}°
                      </span>
                    </div>
                    <div className="h-9 relative flex items-center px-2 bg-black/60 rounded border border-emerald-500/10">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={globalColorShift}
                        onChange={(e) => setGlobalColorShift(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-1 bg-neutral-900 rounded appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-neutral-500">
                      <span>0° (EMERALD)</span>
                      <span>180° (CYAN)</span>
                      <span>360°</span>
                    </div>
                  </div>

                  {/* Slider 2: Oscillation Speed */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[9px] tracking-[0.15em] text-emerald-500/80 uppercase font-bold flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        TEMPORAL DRIFT
                      </label>
                      <span className="font-mono text-[9px] text-neutral-400 font-bold">
                        {speedFactor.toFixed(2)}x
                      </span>
                    </div>
                    <div className="h-9 relative flex items-center px-2 bg-black/60 rounded border border-emerald-500/10">
                      <input
                        type="range"
                        min="0.1"
                        max="3.5"
                        step="0.05"
                        value={speedFactor}
                        onChange={(e) => setSpeedFactor(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-1 bg-neutral-900 rounded appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-neutral-500">
                      <span>0.10x (SLOW)</span>
                      <span>1.0x (STD)</span>
                      <span>3.5x (FAST)</span>
                    </div>
                  </div>

                  {/* Slider 3: Particle Scale */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[9px] tracking-[0.15em] text-emerald-500/80 uppercase font-bold flex items-center gap-1.5">
                        <Radio className="w-3 h-3 text-emerald-400" />
                        PARTICLE SIZE
                      </label>
                      <span className="font-mono text-[9px] text-neutral-400 font-bold">
                        {particleSizeScale.toFixed(2)}x
                      </span>
                    </div>
                    <div className="h-9 relative flex items-center px-2 bg-black/60 rounded border border-emerald-500/10">
                      <input
                        type="range"
                        min="0.4"
                        max="2.5"
                        step="0.05"
                        value={particleSizeScale}
                        onChange={(e) => setParticleSizeScale(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-1 bg-neutral-900 rounded appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-neutral-500">
                      <span>0.4x (MICRO)</span>
                      <span>1.0x (STD)</span>
                      <span>2.5x (MAX)</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Hint Interactive Footer */}
                <div className="mt-5 pt-4 border-t border-emerald-500/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <p className="font-mono text-[9px] tracking-[0.05em] text-emerald-400/80 leading-relaxed uppercase">
                    ⚡ DIRECT ACTION ARMED: CLICK ANYWHERE ON MATRIX BACKGROUND TO EMIT GRAVITY SHOCKWAVES.
                  </p>
                  <button
                    onClick={() => {
                      setGlobalColorShift(0);
                      setSpeedFactor(1.0);
                      setParticleSizeScale(1.0);
                    }}
                    className="flex items-center gap-1 text-[8px] font-mono text-neutral-400 hover:text-white bg-neutral-950 hover:bg-neutral-900 px-2.5 py-1.5 rounded transition-all cursor-pointer border border-neutral-800"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    RESET PROTOCOLS
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <form id="access-code-form" onSubmit={handleSubmitCode} className="w-full max-w-sm mx-auto px-4">
                  <div className="relative flex items-center p-1.5 bg-black/90 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] rounded-lg focus-within:border-emerald-400 transition-colors duration-300">
                    <input
                      id="passcode-input"
                      type="text"
                      required
                      disabled={status === 'authorizing'}
                      placeholder="ENTER ACCESS CODE"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-2.5 text-xs text-emerald-400 font-semibold tracking-widest font-mono focus:outline-none placeholder-emerald-800 uppercase caret-emerald-400"
                    />
                    <button
                      id="submit-code-btn"
                      type="submit"
                      disabled={status === 'authorizing'}
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2.5 rounded font-mono text-[10px] tracking-widest uppercase transition-colors"
                    >
                      {status === 'authorizing' ? 'VERIFYING...' : 'ENTER'}
                    </button>
                  </div>

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-mono tracking-widest text-[#f43f5e] mt-4.5 uppercase font-bold"
                    >
                      * ACCESS DENIED. INVALID SIGNATURE SEQUENCE.
                    </motion.p>
                  )}
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Footer Branding Citation */}
      <footer className="relative w-full text-center pb-12 z-10 select-none">
        <a
          id="evu-hyperlink"
          href="https://www.evu.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-2.5 px-10 py-5 rounded-full bg-neutral-950/95 border border-white/15 hover:border-white/35 hover:bg-neutral-900/40 text-white font-mono text-sm sm:text-base tracking-[0.25em] font-bold uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.8)] cursor-pointer"
        >
          <span className="leading-none select-none">coming soon from</span>
          <svg
            className="w-auto text-white shrink-0 align-baseline select-none"
            style={{ height: '0.72em' }}
            viewBox="5 10 138.75 39.75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5" y="10" width="38" height="9.5" rx="4.5" fill="currentColor" />
            <rect x="5" y="24" width="26" height="9.5" rx="4.5" fill="currentColor" />
            <rect x="5" y="38" width="38" height="9.5" rx="4.5" fill="currentColor" />
            <path
              d="M 55,14.75 L 75,41 L 95,14.75"
              stroke="currentColor"
              strokeWidth="9.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 111,14.75 L 111,31 A 14,14 0 0 0 139,31 L 139,14.75"
              stroke="currentColor"
              strokeWidth="9.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </a>
      </footer>

      {/* Subtle Stealth Legal Nodes in bottom left corner */}
      <div 
        id="metadata-legal-links"
        className="fixed bottom-4 left-4 sm:left-8 z-20 flex items-center gap-4 text-[9px] font-mono tracking-[0.2em] text-neutral-500/60 select-none hidden sm:flex"
      >
        <button 
          onClick={() => {
            setShowPrivacy(true);
            setShowTerms(false);
            setShowAbout(false);
          }} 
          className="hover:text-neutral-200 transition-colors duration-200 uppercase cursor-pointer text-left"
        >
          Privacy Policy
        </button>
        <span className="w-1 h-1 rounded-full bg-neutral-800" />
        <button 
          onClick={() => {
            setShowTerms(true);
            setShowPrivacy(false);
            setShowAbout(false);
          }} 
          className="hover:text-neutral-200 transition-colors duration-200 uppercase cursor-pointer text-left"
        >
          Terms of Service
        </button>
      </div>

      {/* Subtle Crawler Index / AI agent control node in bottom corner */}
      <div 
        id="metadata-crawler-links"
        className="fixed bottom-4 right-4 sm:right-8 z-20 flex items-center gap-4 text-[9px] font-mono tracking-[0.2em] text-neutral-500/60 select-none hidden sm:flex"
      >
        <a 
          href="/sitemap.xml" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-neutral-200 transition-colors duration-200 uppercase"
        >
          Sitemap
        </a>
        <span className="w-1 h-1 rounded-full bg-neutral-800" />
        <a 
          href="/robots.txt" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-neutral-200 transition-colors duration-200 uppercase"
        >
          Robots.txt
        </a>
        <span className="w-1 h-1 rounded-full bg-neutral-800" />
        <a 
          href="/robots.txt" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="AI Agent Scraping Configuration Guide"
          className="hover:text-neutral-200 transition-colors duration-200 uppercase"
        >
          AI Agents Policy
        </a>
      </div>

      {/* Privacy Policy Overlays */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            key="privacy-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="max-w-md w-full bg-[#131217] border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] rounded-xl p-8 text-left relative"
            >
              <button
                onClick={() => setShowPrivacy(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white font-mono text-[10px] tracking-widest uppercase cursor-pointer"
              >
                [ CLOSE ]
              </button>

              <h2 className="font-display font-light text-base tracking-[0.25em] text-white uppercase mb-4 font-mono shadow-sm">
                THE EVU DATA DIRECTORY
              </h2>

              <div className="space-y-4 text-xs font-light text-neutral-300 leading-relaxed tracking-wide mb-8 font-mono">
                <p className="text-emerald-400 font-semibold">[ SECTION 01: ISOLATION PROTOCOLS ]</p>
                <p>
                  We take your digital footprint seriously. All holographic configurations, experimental interface constants, and local coordinate mappings are strictly localized within your browser memory storage. No personal metrics are logged.
                </p>
                <p className="text-emerald-400 font-semibold">[ SECTION 02: SYSTEM INTERFACE INTEGRATION ]</p>
                <p>
                  EVU and HOLOGRAPH systems do not broadcast tracking signals, cookies, or analytical parameters. Your interaction with the spatial interface remains entirely private and mathematically unprofiled.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms of Service Overlays */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            key="terms-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="max-w-md w-full bg-[#131217] border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] rounded-xl p-8 text-left relative"
            >
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white font-mono text-[10px] tracking-widest uppercase cursor-pointer"
              >
                [ CLOSE ]
              </button>

              <h2 className="font-display font-light text-base tracking-[0.25em] text-white uppercase mb-4 font-mono shadow-sm">
                EVU PLATFORM PROTOCOLS
              </h2>

              <div className="space-y-4 text-xs font-light text-neutral-300 leading-relaxed tracking-wide mb-8 font-mono">
                <p className="text-emerald-400 font-semibold">[ CLAUSE A: DIMENSIONAL LIMITS ]</p>
                <p>
                  By interacting with these holographic projections, user agents acknowledge physical limits. Experimental layouts are provided on an as-is, as-available basis for exploratory research only.
                </p>
                <p className="text-emerald-400 font-semibold">[ CLAUSE B: AUTONOMOUS LOGISTICS ]</p>
                <p>
                  EVU reserves the right to shift structural coordinates, color spaces, and core math constants at will to maintain dimensional coherence across system deployments.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Drawer Overlay (Pristine, sleek matrix-mode terminal panel with superior legibility) */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            key="about-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="max-w-md w-full bg-[#131217] border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] rounded-xl p-8 text-left relative"
            >
              <button
                onClick={() => {
                  setShowAbout(false);
                  setShowVerification(false);
                }}
                className="absolute top-6 right-6 text-emerald-500/80 hover:text-white font-mono text-[10px] tracking-widest uppercase cursor-pointer"
              >
                [ CLOSE ]
              </button>

              <h2 className="font-display font-light text-base tracking-[0.25em] text-white uppercase mb-4 font-mono shadow-sm">
                THE HOLOGRAPH DIRECTIVE
              </h2>

              <div className="space-y-4 text-xs font-light text-neutral-300 leading-relaxed tracking-wide mb-8 font-mono">
                <p>
                  We believe that flat screens are physical constraints. Holograph develops spatial optical tech, mapping interactive physics to dimensional projection layers.
                </p>
                <p>
                  We operate alongside founders and agencies at the frontier of spatial computation. Simple layouts, absolute focus, spatial mediums.
                </p>
              </div>

              {/* Secure Munged Contact Verification Channel */}
              <div className="border-t border-emerald-500/30 pt-6">
                <h3 className="text-[10px] font-mono tracking-[0.2em] text-emerald-500/80 uppercase mb-3">
                  COMMUNICATION DIRECTORY
                </h3>

                <AnimatePresence mode="wait">
                  {verifiedEmail ? (
                    <motion.div
                      key="decrypted"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/90 border border-emerald-500/30 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[9px] font-mono text-emerald-500/80 uppercase tracking-widest mb-1 font-bold">
                          DIRECT TRANSMISSIONS
                        </p>
                        <a
                          href="mailto:info@holograph.cc"
                          className="text-xs font-mono text-white tracking-wider hover:underline font-semibold hover:text-emerald-400"
                        >
                          info@holograph.cc
                        </a>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="text-emerald-500/80 hover:text-white p-2 transition-colors cursor-pointer"
                        title="Copy email address"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </motion.div>
                  ) : !showVerification ? (
                    <motion.div
                      key="contact-trigger"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setShowVerification(true);
                          setMathError(false);
                          setMathAnswer('');
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 py-3 px-4 rounded-lg font-mono text-[10px] tracking-widest uppercase transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        INITIATE SECURE CONTACT
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="captcha"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      className="space-y-3 bg-black/40 border border-emerald-500/15 rounded-lg p-3.5"
                    >
                      <p className="text-[9px] font-mono text-emerald-400/95 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        REQUIRED HANDSHAKE VERIFICATION
                      </p>
                      <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-wide leading-relaxed">
                        SOLVE VERIFICATION VECTOR MAPPING TO DECRYPT SYSTEM CHANNELS:
                      </p>
                      <form onSubmit={verifyMath} className="flex gap-2 items-center pt-1">
                        <span className="font-mono text-xs text-neutral-200 bg-neutral-900 border border-neutral-800 px-2 py-1.5 rounded">
                          12 + 18 =
                        </span>
                        <input
                          type="text"
                          required
                          value={mathAnswer}
                          onChange={(e) => setMathAnswer(e.target.value)}
                          placeholder="?"
                          className="w-16 bg-black/80 border border-emerald-500/30 rounded px-2.5 py-1.5 text-xs font-mono text-center text-emerald-400 focus:outline-none focus:border-emerald-400 uppercase font-bold"
                        />
                        <button
                          type="submit"
                          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold font-mono text-[9px] tracking-widest uppercase px-4 py-1.5 rounded transition-colors cursor-pointer"
                        >
                          DECRYPT
                        </button>
                      </form>
                      {mathError && (
                        <p className="text-[9px] font-mono text-rose-500 uppercase tracking-widest font-bold">
                          * UNVERIFIED. CALCULATION HANDSHAKE TIMEOUT.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
