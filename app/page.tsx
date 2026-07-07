'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  const [speedFactor, setSpeedFactor] = useState(0.5);
  const [particleSizeScale, setParticleSizeScale] = useState(1.0);

  // Volumetric 3D interaction state for the large word logo
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Logo glitch effect states
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchShiftX, setGlitchShiftX] = useState(0);
  const [glitchShiftY, setGlitchShiftY] = useState(0);
  const [glitchAlpha, setGlitchAlpha] = useState(1.0);
  const [glitchedText, setGlitchedText] = useState('holograph');

  useEffect(() => {
    // Periodically trigger a super cybernetic glitch flourish!
    const triggerGlitch = () => {
      setGlitchActive(true);
      
      let frame = 0;
      const originalText = 'holograph';
      const glitchChars = '01#_/[?]\\$%&@xXOo';
      
      const interval = setInterval(() => {
        frame++;
        
        // Randomly split slices, apply horizontal/vertical offsets, shift alpha, and alter text characters
        setGlitchShiftX((Math.random() - 0.5) * 16);
        setGlitchShiftY((Math.random() - 0.5) * 6);
        setGlitchAlpha(0.35 + Math.random() * 0.65);
        
        // Character swapping
        if (Math.random() < 0.45) {
          const charsArr = originalText.split('');
          const numSwaps = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < numSwaps; i++) {
            const idxToSwap = Math.floor(Math.random() * charsArr.length);
            charsArr[idxToSwap] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          setGlitchedText(charsArr.join(''));
        } else {
          setGlitchedText(originalText);
        }

        if (frame > 7) {
          clearInterval(interval);
          setGlitchActive(false);
          setGlitchShiftX(0);
          setGlitchShiftY(0);
          setGlitchAlpha(1.0);
          setGlitchedText(originalText);
        }
      }, 45);
    };

    // Trigger glitch every 2.5 to 5 seconds randomly
    const scheduler = () => {
      const delay = 2200 + Math.random() * 3500;
      return setTimeout(() => {
        triggerGlitch();
        timerId = scheduler();
      }, delay);
    };

    let timerId = scheduler();
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // Range [-1, 1]
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // Range [-1, 1]
      setMousePosition({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth - 0.5) * 2;
        const y = (touch.clientY / window.innerHeight - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;

    setStatus('authorizing');

    setTimeout(() => {
      const code = accessCode.trim().toUpperCase();
      const isAccepted = [
        'HOLO-BETA-2026',
        'EVU-INVITE-2026',
        'WAVEFRONT',
        'HOLOGRAPH',
        'EVU',
        'INVITE',
        'BETA'
      ].includes(code) || code.startsWith('HOLO-') || code.startsWith('EVU-');

      if (isAccepted) {
        setStatus('success');
      } else {
        setStatus('error');
      }
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
    <main className="relative flex flex-col justify-between items-center w-full min-h-screen bg-gradient-to-tr from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] px-4 sm:px-8 text-neutral-100 overflow-hidden">
      
      {/* Dynamic Aesthetic Holographic Network */}
      <D3Hologram
        intensify={status === 'success'}
        globalColorShift={globalColorShift}
        speedFactor={speedFactor}
        particleSizeScale={particleSizeScale}
      />

      {/* Retro CRT Phosphor Vignette Shadowing */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(28,24,42,0.45)_100%)] pointer-events-none z-[1]" />

      {/* Header bar */}
      <header className="relative w-full max-w-6xl flex justify-between items-center pt-8 z-10 select-none">
        <span className="font-mono text-xs tracking-[0.25em] text-neutral-300 font-medium">
          holograph.cc
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/tech"
            className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 hover:text-emerald-400 font-semibold uppercase transition-colors"
          >
            [ TECH INDEX ]
          </Link>
          <button
            onClick={() => setShowAbout(true)}
            className="text-[10px] font-mono tracking-[0.25em] text-emerald-400/80 hover:text-white font-semibold uppercase transition-colors"
          >
            [ ABOUT ]
          </button>
        </div>
      </header>

      {/* Center Console Portal */}
      <div className="relative flex flex-col justify-start items-center w-full flex-1 z-10 pt-2 md:pt-4 lg:pt-6 pb-6 text-center pointer-events-none">
        
        {/* Crisp Monospaced Logo Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="select-none pointer-events-auto flex items-center justify-center"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.5)) drop-shadow(0 30px 75px rgba(16,185,129,0.02))',
            }}
            animate={{
              rotateX: -mousePosition.y * 18, // slightly tighter spring tilt for premium feel
              rotateY: mousePosition.x * 22,
              z: 140, // separates glass float plate in 3D perspective
            }}
            transition={{ type: 'spring', stiffness: 95, damping: 24, mass: 0.5 }}
            className="relative px-12 py-12 flex items-center justify-center"
          >
            {/* Ambient Glass Scanning Lights & Cyber Scanlines clipped near the text */}
            <div 
              className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-70"
              style={{
                top: glitchActive ? `${glitchShiftY * 10 + 50}%` : '35%',
                transition: glitchActive ? 'none' : 'top 4.5s ease-in-out',
                animation: glitchActive ? 'none' : 'pulse 2.5s infinite',
              }}
            />
            
            {/* 1. Glass Shadow Layer - Depth backing via light edge shadow */}
            <span
              className="absolute inset-0 flex items-center justify-center font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none select-none text-transparent filter blur-[0.6px]"
              style={{
                transform: 'translateZ(-12px) translateY(2.5px)',
                pointerEvents: 'none',
                WebkitTextStroke: '1px rgba(0, 0, 0, 0.4)',
              }}
            >
              {glitchedText}
            </span>

            {/* 2. Pristine Emerald Soft Backglow halo (edge-glow) */}
            <span
              className="absolute inset-0 flex items-center justify-center font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none select-none text-transparent filter blur-md"
              style={{
                transform: 'translateZ(-10px) translateY(1px)',
                pointerEvents: 'none',
                WebkitTextStroke: '1.5px rgba(16, 185, 129, 0.15)',
              }}
            >
              {glitchedText}
            </span>

            {/* 3. Refracted Prism Channel - Cyan Channel (Chroma Shift) */}
            <span
              className="absolute inset-0 flex items-center justify-center font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none select-none text-transparent filter blur-[0.4px]"
              style={{
                transform: `translateZ(2px) translateX(${glitchShiftX + (mousePosition.x * 2.5)}px) translateY(${glitchShiftY + (mousePosition.y * 1)}px)`,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
                WebkitTextStroke: '0.6px rgba(34, 211, 238, 0.45)',
              }}
            >
              {glitchedText}
            </span>

            {/* 4. Refracted Prism Channel - Red Channel (Opposing Chroma Shift) */}
            <span
              className="absolute inset-0 flex items-center justify-center font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none select-none text-transparent filter blur-[0.4px]"
              style={{
                transform: `translateZ(3px) translateX(${glitchShiftX - (mousePosition.x * 2.5) - 0.5}px) translateY(${glitchShiftY - (mousePosition.y * 1) - 0.2}px)`,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
                WebkitTextStroke: '0.6px rgba(244, 63, 94, 0.45)',
              }}
            >
              {glitchedText}
            </span>

            {/* 5. Crystalline Facet Outer Boundary Stroke (Fine Edge highlight) */}
            <span
              className="absolute inset-0 flex items-center justify-center font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none select-none text-transparent"
              style={{
                transform: 'translateZ(6px)',
                pointerEvents: 'none',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.25)',
              }}
            >
              {glitchedText}
            </span>

            {/* 6. Primary Translucent Frost Glass Core plate (Glows and blurs internally) */}
            <h1
              className="font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none bg-clip-text text-transparent bg-gradient-to-b from-white/15 via-white/3 to-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.05)]"
              style={{
                transform: `translateZ(10px) translateX(${glitchShiftX * 0.1}px) translateY(${glitchShiftY * 0.1}px)`,
                opacity: glitchAlpha,
                WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.65)',
              }}
            >
              {glitchedText}
            </h1>

            {/* 7. Glass Face Specular Glare (Light Reflection Sweep that drifts on mouse move) */}
            <span
              className="absolute inset-0 flex items-center justify-center font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none select-none text-transparent bg-gradient-to-tr from-transparent via-transparent via-white/10 via-white/45 via-transparent to-transparent bg-clip-text opacity-90"
              style={{
                transform: `translateZ(14px) translateX(${mousePosition.x * 4}px) translateY(${mousePosition.y * 4}px)`,
                pointerEvents: 'none',
                WebkitTextStroke: '0.4px rgba(255, 255, 255, 0.45)',
              }}
            >
              {glitchedText}
            </span>

            {/* 8. Extra Fine Crystal Polishing Highlight Stroke */}
            <span
              className="absolute inset-0 flex items-center justify-center font-mono font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] lowercase leading-none select-none text-transparent"
              style={{
                transform: 'translateZ(17px)',
                pointerEvents: 'none',
                WebkitTextStroke: '0.4px rgba(255, 255, 255, 0.7)',
              }}
            >
              {glitchedText}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Interface Control Space */}
      <div className="relative w-full max-w-3xl mx-auto px-4 pb-12 z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          
          {status === 'success' ? (
            <motion.div
              key="granted"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-black/90 border border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.15)] rounded-xl p-5 sm:p-6 backdrop-blur-md text-left mb-6"
            >
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="font-mono text-[10px] tracking-[0.2em] text-white uppercase font-bold">
                      SYSTEM CALIBRATION
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setAccessCode('');
                    setGlobalColorShift(0);
                    setSpeedFactor(1.0);
                    setParticleSizeScale(1.0);
                  }}
                  className="mt-2 sm:mt-0 flex items-center gap-1.5 px-2 py-1 rounded border border-rose-500/20 hover:bg-rose-950/20 text-rose-400 font-mono text-[8px] tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer"
                >
                  <Power className="w-2.5 h-2.5" />
                  DISCONNECT
                </button>
              </div>

              {/* Spatial Preset Buttons */}
              <div className="mb-4 bg-neutral-950/50 border border-neutral-900 rounded-lg p-2.5">
                <span className="block font-mono text-[8px] tracking-[0.15em] text-emerald-400 mb-2 uppercase font-medium">
                  SPECTRAL GEOMETRIC PRESET
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: 'standard', label: 'STANDARD MODE', shift: 0, speed: 0.5, scale: 1.0 },
                    { id: 'quantum', label: 'QUANTUM NOIRE', shift: 275, speed: 0.22, scale: 1.5 },
                    { id: 'warp', label: 'WARP STREAM', shift: 190, speed: 1.1, scale: 1.9 },
                    { id: 'amber', label: 'RETRO CHRONOS', shift: 32, speed: 0.65, scale: 0.8 },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setGlobalColorShift(preset.shift);
                        setSpeedFactor(preset.speed);
                        setParticleSizeScale(preset.scale);
                      }}
                      className={`px-2 py-1.5 rounded text-[8px] font-mono tracking-wider text-center uppercase border transition-all duration-300 cursor-pointer ${
                        globalColorShift === preset.shift &&
                        speedFactor === preset.speed &&
                        particleSizeScale === preset.scale
                          ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400 font-bold'
                          : 'bg-black/45 border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Sliders and Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Slider 1: Hue Rotation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[8px] tracking-[0.15em] text-neutral-400 uppercase font-bold flex items-center gap-1">
                      <Sliders className="w-2.5 h-2.5 text-emerald-400" />
                      SPECTRAL HUE
                    </label>
                    <span className="font-mono text-[8px] text-neutral-400">
                      {globalColorShift}°
                    </span>
                  </div>
                  <div className="h-7 relative flex items-center px-2 bg-black/50 rounded border border-neutral-900">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={globalColorShift}
                      onChange={(e) => setGlobalColorShift(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1 bg-neutral-950 rounded appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Slider 2: Oscillation Speed */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[8px] tracking-[0.15em] text-neutral-400 uppercase font-bold flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 text-emerald-500" />
                      TEMPORAL DRIFT
                    </label>
                    <span className="font-mono text-[8px] text-neutral-400">
                      {speedFactor.toFixed(2)}x
                    </span>
                  </div>
                  <div className="h-7 relative flex items-center px-2 bg-black/50 rounded border border-neutral-900">
                    <input
                      type="range"
                      min="0.1"
                      max="3.5"
                      step="0.05"
                      value={speedFactor}
                      onChange={(e) => setSpeedFactor(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1 bg-neutral-950 rounded appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Slider 3: Particle Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[8px] tracking-[0.15em] text-neutral-400 uppercase font-bold flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 text-emerald-500" />
                      PARTICLE SIZE
                    </label>
                    <span className="font-mono text-[8px] text-neutral-400">
                      {particleSizeScale.toFixed(2)}x
                    </span>
                  </div>
                  <div className="h-7 relative flex items-center px-2 bg-black/50 rounded border border-neutral-900">
                    <input
                      type="range"
                      min="0.4"
                      max="2.5"
                      step="0.05"
                      value={particleSizeScale}
                      onChange={(e) => setParticleSizeScale(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1 bg-neutral-950 rounded appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Reset trigger */}
              <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-[8px]">
                <span className="font-mono text-neutral-500 uppercase tracking-widest leading-none select-none">
                  interactive spatial parameters active
                </span>
                <button
                  onClick={() => {
                    setGlobalColorShift(0);
                    setSpeedFactor(1.0);
                    setParticleSizeScale(1.0);
                  }}
                  className="flex items-center gap-1 font-mono text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-2 h-2" />
                  RESET SYSTEM
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unauthorized"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xs mb-6 px-4"
            >
              <form id="access-code-form" onSubmit={handleSubmitCode} className="w-full">
                <div className="relative flex items-center p-1 bg-black/85 border border-neutral-800 rounded focus-within:border-emerald-500/40 transition-colors duration-300">
                  <input
                    id="passcode-input"
                    type="text"
                    required
                    disabled={status === 'authorizing'}
                    placeholder="ENTER INVITE CODE"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 text-[10px] text-emerald-400 font-semibold tracking-widest font-mono focus:outline-none placeholder-neutral-700 uppercase caret-emerald-400"
                  />
                  <button
                    id="submit-code-btn"
                    type="submit"
                    disabled={status === 'authorizing'}
                    className="bg-neutral-900 hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 font-semibold px-4 py-2 rounded font-mono text-[9px] tracking-widest uppercase transition-colors"
                  >
                    {status === 'authorizing' ? 'CONNECTING...' : 'ENTER'}
                  </button>
                </div>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] font-mono tracking-widest text-[#f43f5e] mt-2.5 text-center uppercase font-bold"
                  >
                    * INVALID CODE SEQUENCE. ACCESS DENIED.
                  </motion.p>
                )}
              </form>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer Link / EVU logo */}
        <footer className="w-full text-center select-none pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase">
              PRIVATE BETA VIA
            </span>
            <a
              id="evu-hyperlink"
              href="https://www.holograph.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-auto text-emerald-400 shrink-0 select-none"
                style={{ height: '0.68em' }}
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
          </div>
        </footer>
      </div>

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
