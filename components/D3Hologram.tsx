'use client';

import React, { useEffect, useRef, useState } from 'react';

// Color conversion structure
interface RGB {
  r: number;
  g: number;
  b: number;
}

// Convert HSV spectrum to raw RGB components for advanced color mapping and chromatic splitting
function hsvToRgb(h: number, s: number, v: number): RGB {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;
  const hueSegment = Math.floor(h / 60) % 6;

  switch (hueSegment) {
    case 0: r = c; g = x; b = 0; break;
    case 1: r = x; g = c; b = 0; break;
    case 2: r = 0; g = c; b = x; break;
    case 3: r = 0; g = x; b = c; break;
    case 4: r = x; g = 0; b = c; break;
    case 5: r = c; g = 0; b = x; break;
    default: r = 0; g = 0; b = 0;
  }

  return {
    r: Math.floor((r + m) * 255),
    g: Math.floor((g + m) * 255),
    b: Math.floor((b + m) * 255),
  };
}

// Particle interface supporting procedural alien geometry & sacred orbits
interface ChromaticParticle {
  x: number;          // Base local 3D coordinates
  y: number;
  z: number;
  angle: number;      // Rotational index for spectrum mapping
  type: 'head' | 'eye' | 'halo_crown' | 'equator_ring' | 'sine_orbital' | 'singularity_core';
  char: string;       // Custom cyber glyph
  phase: number;      // Oscillating offset
  frequency: number;  // Warp wave frequency
  brightness: number; // Max potential luminance
  
  // Scene dynamic morphing backups
  scene0X?: number;
  scene0Y?: number;
  scene0Z?: number;
  scene0Type?: 'head' | 'eye' | 'halo_crown' | 'equator_ring' | 'sine_orbital' | 'singularity_core';
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  type: 'head' | 'eye' | 'halo_crown' | 'equator_ring' | 'sine_orbital' | 'singularity_core';
}

function getHypercubeCoordinate(idx: number, total: number, clock: number): Point3D {
  const edgeParticlesCount = 2000;
  
  // Continuous dimension morphing based on asynchronous clocks
  const tA = 45 + Math.sin(clock * 1.6) * 15;  // Inner cube breathes
  const tB = 105 + Math.cos(clock * 1.2) * 25; // Outer cube expands/shrinks
  
  // Continuous torsional twisting around Y-axis based on position and time
  const rotationStrength = Math.sin(clock * 0.8) * 0.45;
  const twist = (ptPos: { x: number; y: number; z: number }) => {
    const angle = ptPos.y * (rotationStrength / 100);
    const cosR = Math.cos(angle);
    const sinR = Math.sin(angle);
    return {
      x: ptPos.x * cosR - ptPos.z * sinR,
      y: ptPos.y,
      z: ptPos.x * sinR + ptPos.z * cosR
    };
  };

  if (idx < edgeParticlesCount) {
    const edgeIndex = idx % 32;
    const t = ((idx / 32) % 1); // interpolator along the edge [0, 1]
    const val = -1 + t * 2; // goes from -1 to 1
    
    let x = 0, y = 0, z = 0;
    
    if (edgeIndex < 12) {
      // Inner cube edges
      const subEdge = edgeIndex % 4;
      const c1 = subEdge % 2 === 0 ? -tA : tA;
      const c2 = subEdge < 2 ? -tA : tA;
      if (edgeIndex < 4) {
        x = val * tA; y = c1; z = c2;
      } else if (edgeIndex < 8) {
        x = c1; y = val * tA; z = c2;
      } else {
        x = c1; y = c2; z = val * tA;
      }
    } else if (edgeIndex < 24) {
      // Outer cube edges
      const subEdge = (edgeIndex - 12) % 4;
      const c1 = subEdge % 2 === 0 ? -tB : tB;
      const c2 = subEdge < 2 ? -tB : tB;
      if (edgeIndex < 16) {
        x = val * tB; y = c1; z = c2;
      } else if (edgeIndex < 20) {
        x = c1; y = val * tB; z = c2;
      } else {
        x = c1; y = c2; z = val * tB;
      }
    } else {
      // Connecting struts (8 struts)
      const strutIndex = edgeIndex - 24;
      const sx = (strutIndex % 2 === 0 ? -1 : 1);
      const sy = ((Math.floor(strutIndex / 2) % 2) === 0 ? -1 : 1);
      const sz = ((Math.floor(strutIndex / 4) % 2) === 0 ? -1 : 1);
      
      const currScale = tA + (t * (tB - tA));
      x = sx * currScale;
      y = sy * currScale;
      z = sz * currScale;
    }
    
    const twisted = twist({ x, y, z });
    return { 
      x: twisted.x, 
      y: twisted.y, 
      z: twisted.z, 
      type: edgeIndex % 2 === 0 ? 'head' : 'sine_orbital' 
    };
  } else {
    // Remaining particles form dual orbital protective shields
    const ringIdx = idx - edgeParticlesCount;
    const remainingCount = total - edgeParticlesCount;
    const angle = (ringIdx / remainingCount) * Math.PI * 2 + clock * 0.4;
    const radius = 175 + Math.sin(clock * 1.5 + angle * 3) * 15;
    
    if (ringIdx % 2 === 0) {
      return {
        x: radius * Math.cos(angle),
        y: Math.sin(angle * 4 + clock * 3.5) * 18,
        z: radius * Math.sin(angle),
        type: 'equator_ring',
      };
    } else {
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: Math.cos(angle * 4 + clock * 3.5) * 18,
        type: 'halo_crown',
      };
    }
  }
}

function getTorusKnotCoordinate(idx: number, total: number, clock: number): Point3D {
  // Constant wobble cycles - winds and unwinds ribbon structures
  const angle = (idx / total) * Math.PI * 2 * (3 + Math.sin(clock * 0.4) * 0.8);
  const p = 3 + Math.sin(clock * 0.7) * 0.5;
  const q = 7 + Math.cos(clock * 0.5) * 1.1;
  
  const tubeRadius = (16 + Math.sin(idx * 0.05 + clock * 3.0) * 8) * (1.0 + 0.25 * Math.sin(clock * 1.8));
  const tubeAngle = idx * 0.15 + clock * 2.5;
  
  const radiusScale = 55 + 24 * Math.cos(q * angle + clock * 1.5);
  const baseX = radiusScale * Math.cos(p * angle);
  const baseY = radiusScale * Math.sin(p * angle);
  const baseZ = -40 * Math.sin(q * angle + clock * 2.0);
  
  const x = baseX + tubeRadius * Math.cos(tubeAngle);
  const y = baseY + tubeRadius * Math.sin(tubeAngle);
  const z = baseZ + tubeRadius * Math.cos(tubeAngle + Math.PI/2);
  
  return {
    x: x * 1.35,
    y: y * 1.35,
    z: z * 1.35,
    type: idx % 12 === 0 ? 'eye' : idx % 3 === 0 ? 'halo_crown' : idx % 3 === 1 ? 'equator_ring' : 'sine_orbital',
  };
}

function getGeodesicSphereCoordinate(idx: number, total: number, clock: number): Point3D {
  const baseRadius = 135;
  
  if (idx < 1800) {
    const ringCount = 10;
    const ringIndex = idx % ringCount;
    const theta = ((ringIndex + 0.5) / ringCount) * Math.PI;
    
    const inRingIdx = Math.floor(idx / ringCount);
    const phi = (inRingIdx / (1800 / ringCount)) * Math.PI * 2 + clock * 0.8;
    
    // Liquid spherical harmonics ripple
    const currentRadius = baseRadius + 18 * Math.sin(theta * 5 + clock * 3.2) * Math.cos(phi * 4 + clock * 2.0);
    
    const py = currentRadius * Math.cos(theta);
    const sliceRadius = currentRadius * Math.sin(theta);
    const px = sliceRadius * Math.cos(phi);
    const pz = sliceRadius * Math.sin(phi);
    
    return {
      x: px,
      y: py,
      z: pz,
      type: 'equator_ring'
    };
  } else if (idx < 2800) {
    const loopCount = 8;
    const loopIdx = idx % loopCount;
    const phi = (loopIdx / loopCount) * Math.PI + clock * 0.3;
    
    const inLoopIdx = idx - 1800;
    const theta = (inLoopIdx / 1000) * Math.PI * 2 + clock * 1.2;
    
    // Asymmetric ripple waves
    const currentRadius = baseRadius + 22 * Math.sin(theta * 4 - clock * 2.5) * Math.sin(phi * 3 + clock * 1.8);
    
    const px = currentRadius * Math.sin(theta) * Math.cos(phi);
    const py = currentRadius * Math.cos(theta);
    const pz = currentRadius * Math.sin(theta) * Math.sin(phi);
    
    return {
      x: px,
      y: py,
      z: pz,
      type: 'sine_orbital'
    };
  } else {
    const coreIdx = idx - 2800;
    const maxCore = total - 2800;
    const isSatellite = coreIdx < maxCore * 0.4;
    
    if (isSatellite) {
      const angle = (coreIdx / (maxCore * 0.4)) * Math.PI * 2 + clock * 1.8;
      const satRadius = 45 + Math.sin(clock * 2.0 + angle * 4) * 8;
      return {
        x: satRadius * Math.cos(angle),
        y: Math.sin(angle * 3 + clock * 4.0) * 16,
        z: satRadius * Math.sin(angle),
        type: 'halo_crown'
      };
    } else {
      const sphereIdx = coreIdx - Math.floor(maxCore * 0.4);
      const sphereTotal = maxCore - Math.floor(maxCore * 0.4);
      const theta = Math.acos(-1 + (2 * sphereIdx) / sphereTotal);
      const phi = Math.PI * 2 * sphereIdx * 0.618033 + clock * 2.2;
      
      const coreR = 25 + 8 * Math.sin(clock * 5.0 + sphereIdx * 0.15);
      
      return {
        x: coreR * Math.sin(theta) * Math.cos(phi),
        y: coreR * Math.cos(theta),
        z: coreR * Math.sin(theta) * Math.sin(phi),
        type: 'singularity_core'
      };
    }
  }
}

// Interactive shockwave expansion definition triggered by click/tap events
interface ClickShockwave {
  x3d: number;
  y3d: number;
  z3d: number;
  radius: number;
  maxRadius: number;
  speed: number;
  intensity: number;
}

interface SparkParticle {
  x3d: number;
  y3d: number;
  z3d: number;
  vx3d: number;
  vy3d: number;
  vz3d: number;
  char: string;
  hue: number;
  life: number;
  decay: number;
  scale: number;
}

export default function D3Hologram({
  intensify,
  globalColorShift = 0,
  speedFactor = 1.0,
  particleSizeScale = 1.0,
}: {
  intensify: boolean;
  globalColorShift?: number;
  speedFactor?: number;
  particleSizeScale?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [calibratingProgress, setCalibratingProgress] = useState(0);
  const [systemOnline, setSystemOnline] = useState(false);

  // Sync references to props for lag-free performance inside requestAnimationFrame render loop
  const globalColorShiftRef = useRef(globalColorShift);
  const speedFactorRef = useRef(speedFactor);
  const particleSizeScaleRef = useRef(particleSizeScale);

  useEffect(() => {
    globalColorShiftRef.current = globalColorShift;
  }, [globalColorShift]);

  useEffect(() => {
    speedFactorRef.current = speedFactor;
  }, [speedFactor]);

  useEffect(() => {
    particleSizeScaleRef.current = particleSizeScale;
  }, [particleSizeScale]);

  // Mouse / Pointer positional tracking for fluid spring inertia with swift physical velocity calculations
  const pointerRef = useRef({
    currentRangeX: 0.15,
    currentRangeY: -0.15,
    targetRangeX: 0.15,
    targetRangeY: -0.15,
    // Pixel coordinates for interactive cursor gravity fields
    clientX: -1000,
    clientY: -1000,
    targetClientX: -1000,
    targetClientY: -1000,
    isHovered: false,
    velocityX: 0,
    velocityY: 0,
    speed: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  // Array storing active click-induced gravity shockwaves
  const shockwavesRef = useRef<ClickShockwave[]>([]);

  // Array of glowing floating sparks created dynamically by cursor sweeps
  const sparkParticlesRef = useRef<SparkParticle[]>([]);

  // Scene timing & dynamic morph transitions
  const currentSceneRef = useRef(0);
  const nextSceneRef = useRef(0);
  const transitionProgressRef = useRef(1.0);
  const sceneTimerRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(container);

    // Track mouse coordinates and calculate normalized parameters with direct kinetic equations
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const relativeX = currentX - width / 2;
      const relativeY = currentY - height / 2;

      // Clean parallax ranges
      pointerRef.current.targetRangeX = (relativeX / (width / 2)) * 1.15;
      pointerRef.current.targetRangeY = -(relativeY / (height / 2)) * 1.15;

      // Smoothly initialize positions on first entry instead of sliding from -1000 or stale previous positions
      if (pointerRef.current.clientX < -500 || !pointerRef.current.isHovered) {
        pointerRef.current.clientX = currentX;
        pointerRef.current.clientY = currentY;
        pointerRef.current.lastX = currentX;
        pointerRef.current.lastY = currentY;
      }

      pointerRef.current.targetClientX = currentX;
      pointerRef.current.targetClientY = currentY;
      pointerRef.current.isHovered = true;

      const dx = currentX - pointerRef.current.lastX;
      const dy = currentY - pointerRef.current.lastY;
      const movementDist = Math.hypot(dx, dy);

      // Spawn dynamic colorful stellar tail sparks on motion
      if (Math.random() < 0.35 && movementDist > 3) {
        const clickX3d = (relativeX / (Math.min(width, height) * 0.42)) * 140;
        const clickY3d = (relativeY / (Math.min(width, height) * 0.42)) * 140;

        sparkParticlesRef.current.push({
          x3d: clickX3d + (Math.random() - 0.5) * 10,
          y3d: clickY3d + (Math.random() - 0.5) * 10,
          z3d: (Math.random() - 0.5) * 20,
          vx3d: (Math.random() - 0.5) * 2 + (dx * 0.15),
          vy3d: (Math.random() - 0.5) * 2 + (dy * 0.15),
          vz3d: (Math.random() - 0.5) * 4,
          char: cyberGlyphs.charAt(Math.floor(Math.random() * cyberGlyphs.length)),
          hue: Math.random() * 360,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.025,
          scale: 0.8 + Math.random() * 1.2,
        });
      }

      pointerRef.current.lastX = currentX;
      pointerRef.current.lastY = currentY;
    };

    const handleMouseLeave = () => {
      pointerRef.current.isHovered = false;
      pointerRef.current.targetRangeX = 0.15;
      pointerRef.current.targetRangeY = -0.15;
      pointerRef.current.clientX = -1000;
      pointerRef.current.clientY = -1000;
      pointerRef.current.targetClientX = -1000;
      pointerRef.current.targetClientY = -1000;
      pointerRef.current.lastX = -1000;
      pointerRef.current.lastY = -1000;
      pointerRef.current.velocityX = 0;
      pointerRef.current.velocityY = 0;
      pointerRef.current.speed = 0;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;

        const relativeX = currentX - width / 2;
        const relativeY = currentY - height / 2;

        pointerRef.current.targetRangeX = (relativeX / (width / 2)) * 1.15;
        pointerRef.current.targetRangeY = -(relativeY / (height / 2)) * 1.15;

        pointerRef.current.clientX = currentX;
        pointerRef.current.clientY = currentY;
        pointerRef.current.lastX = currentX;
        pointerRef.current.lastY = currentY;
        pointerRef.current.targetClientX = currentX;
        pointerRef.current.targetClientY = currentY;
        pointerRef.current.isHovered = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;

        const relativeX = currentX - width / 2;
        const relativeY = currentY - height / 2;

        pointerRef.current.targetRangeX = (relativeX / (width / 2)) * 1.15;
        pointerRef.current.targetRangeY = -(relativeY / (height / 2)) * 1.15;

        // Smoothly initialize positions on first entry instead of sliding from -1000 or stale previous positions
        if (pointerRef.current.clientX < -500 || !pointerRef.current.isHovered) {
          pointerRef.current.clientX = currentX;
          pointerRef.current.clientY = currentY;
          pointerRef.current.lastX = currentX;
          pointerRef.current.lastY = currentY;
        }

        pointerRef.current.targetClientX = currentX;
        pointerRef.current.targetClientY = currentY;
        pointerRef.current.isHovered = true;

        const dx = currentX - pointerRef.current.lastX;
        const dy = currentY - pointerRef.current.lastY;
        const movementDist = Math.hypot(dx, dy);

        if (Math.random() < 0.35 && movementDist > 3) {
          const clickX3d = (relativeX / (Math.min(width, height) * 0.42)) * 140;
          const clickY3d = (relativeY / (Math.min(width, height) * 0.42)) * 140;

          sparkParticlesRef.current.push({
            x3d: clickX3d + (Math.random() - 0.5) * 10,
            y3d: clickY3d + (Math.random() - 0.5) * 10,
            z3d: (Math.random() - 0.5) * 20,
            vx3d: (Math.random() - 0.5) * 2 + (dx * 0.15),
            vy3d: (Math.random() - 0.5) * 2 + (dy * 0.15),
            vz3d: (Math.random() - 0.5) * 4,
            char: cyberGlyphs.charAt(Math.floor(Math.random() * cyberGlyphs.length)),
            hue: Math.random() * 360,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.025,
            scale: 0.8 + Math.random() * 1.2,
          });
        }

        pointerRef.current.lastX = currentX;
        pointerRef.current.lastY = currentY;
      }
    };

    // Click handler to trigger physical cosmic expansion wave
    const handleContainerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Reverse engineer an estimated 3D focus origin at Z ~ 0
      const x3d = ((clickX - width / 2) / (Math.min(width, height) * 0.40)) * 140;
      const y3d = ((clickY - height / 2) / (Math.min(width, height) * 0.40)) * 140;

      // Spawn active shockwave
      shockwavesRef.current.push({
        x3d,
        y3d,
        z3d: 0,
        radius: 0,
        maxRadius: 380,
        speed: 8.5,
        intensity: 1.0,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleMouseLeave);
    container.addEventListener('click', handleContainerClick);

    // --- PROCEDURAL RECONSTRUCTION OF ORNATE ALIEN ENTITY ---
    const particlesPool: ChromaticParticle[] = [];
    const cyberGlyphs = '018XΦΨΩ🛸👁✦⚡︎👽☄✴⚛';

    // 1. MODEL THE 3D ALIEN SKULL (Biomechanical alien face structure)
    const slicesCount = 52;
    const angularSteps = 44;

    for (let s = 0; s < slicesCount; s++) {
      const ratioY = s / (slicesCount - 1);
      const rawY = -120 + ratioY * 240; // Vertical height from -120 to +120

      // Dynamic radial dimensions along vertical slices mapping the iconic bulbous head and narrow chin
      let rx = 0;
      let rz = 0;
      let depthSweepOffset = 0;

      if (rawY > 0) {
        // Upper Cranium: bulbous dome extending backward
        const factor = rawY / 120;
        const shape = Math.sqrt(Math.max(0, 1 - factor * factor));
        rx = 76 * shape + 14;
        rz = 86 * shape + 10;
        depthSweepOffset = -28 * (1 - shape) + 5; // Alien occipital sweep
      } else {
        // Lower Maxilla/Chin: sharp tapering pointed narrow jaw
        const factor = Math.abs(rawY) / 120;
        rx = 90 * Math.pow(1 - factor, 0.85) + 5;
        rz = 74 * Math.pow(1 - factor, 1.1) + 5;
        depthSweepOffset = 5 - 12 * factor;
      }

      for (let a = 0; a < angularSteps; a++) {
        const phiAngle = (a / angularSteps) * Math.PI * 2;
        const cosPhi = Math.cos(phiAngle);
        const sinPhi = Math.sin(phiAngle);

        let isEyeSocket = false;
        let alteredRx = rx;
        let alteredRz = rz;

        // Symmetric Almond-Socket Voids modeling (sinPhi > 0 is front side of face)
        if (rawY > -15 && rawY < 35 && sinPhi > 0.38) {
          // Angle alignment check: Left Eye ~ 1.15 rad, Right Eye ~ 1.99 rad
          const leftEyeCenter = Math.PI / 2 - 0.44;
          const rightEyeCenter = Math.PI / 2 + 0.44;
          const centerDistLeft = Math.hypot(phiAngle - leftEyeCenter, (rawY - 12) / 38);
          const centerDistRight = Math.hypot(phiAngle - rightEyeCenter, (rawY - 12) / 38);

          const eyeRadiusThreshold = 0.23;
          if (centerDistLeft < eyeRadiusThreshold || centerDistRight < eyeRadiusThreshold) {
            isEyeSocket = true;
            // Carve orbital cavity structures inward
            alteredRx = rx * 0.70;
            alteredRz = rz * 0.62;
          }
        }

        // Apply spatial ridges and grooves on cranial lobes
        let fineNoise = Math.sin(phiAngle * 7) * Math.cos(rawY * 0.08) * 3.2;
        if (isEyeSocket) {
          fineNoise -= 7.5; // Accentuate eye indent depth
        } else if (rawY > 40 && Math.abs(cosPhi) < 0.15) {
          // Add sagittal crest ridge
          fineNoise += 4.5;
        }

        const finalLocalX = (alteredRx + fineNoise) * cosPhi;
        const finalLocalY = rawY;
        const finalLocalZ = (alteredRz + fineNoise) * sinPhi + depthSweepOffset;

        particlesPool.push({
          x: finalLocalX,
          y: finalLocalY,
          z: finalLocalZ,
          angle: phiAngle,
          type: isEyeSocket ? 'eye' : 'head',
          char: cyberGlyphs.charAt(Math.floor(Math.random() * cyberGlyphs.length)),
          phase: Math.random() * Math.PI * 2,
          frequency: 0.9 + Math.random() * 0.8,
          brightness: isEyeSocket ? 255 : (120 + Math.floor(Math.random() * 115)),
        });
      }
    }

    // 2. MODEL INTERLOCKING SACRED GEOMETRY ORBITS
    // Halo Crown - Shimmering floating coronal circle above head
    const crownNodesCount = 180;
    for (let i = 0; i < crownNodesCount; i++) {
      const angle = (i / crownNodesCount) * Math.PI * 2;
      particlesPool.push({
        x: 105 * Math.cos(angle),
        y: 135,
        z: 105 * Math.sin(angle),
        angle,
        type: 'halo_crown',
        char: cyberGlyphs.charAt(Math.floor(Math.random() * cyberGlyphs.length)),
        phase: Math.random() * Math.PI * 2,
        frequency: 1.2,
        brightness: 200 + Math.floor(Math.random() * 55),
      });
    }

    // Horizontal Equatorial Platters - Double concentric orbital gears surrounding skull width
    const equatorNodesCount = 280;
    for (let i = 0; i < equatorNodesCount; i++) {
      const angle = (i / equatorNodesCount) * Math.PI * 2;
      const levelY = -25;
      const doubleOffset = i % 2 === 0 ? 1.0 : 1.25;
      particlesPool.push({
        x: 165 * doubleOffset * Math.cos(angle),
        y: levelY,
        z: 165 * doubleOffset * Math.sin(angle),
        angle,
        type: 'equator_ring',
        char: cyberGlyphs.charAt(Math.floor(Math.random() * cyberGlyphs.length)),
        phase: Math.random() * Math.PI * 2,
        frequency: 0.5,
        brightness: 160 + Math.floor(Math.random() * 95),
      });
    }

    // Sinusoidal Wave Orbit - An inclined celestial particle accelerator ring with waveform nodes
    const sineNodesCount = 380;
    for (let i = 0; i < sineNodesCount; i++) {
      const angle = (i / sineNodesCount) * Math.PI * 2;
      const ringRadius = 210;

      // Base circle
      const bx = ringRadius * Math.cos(angle);
      const bz = ringRadius * Math.sin(angle);
      const by = 0;

      // Angle of ring tilt (40 degrees) around Z axis
      const tiltVal = 0.70;
      const tx = bx * Math.cos(tiltVal) - by * Math.sin(tiltVal);
      const ty = bx * Math.sin(tiltVal) + by * Math.cos(tiltVal);
      const tz = bz;

      particlesPool.push({
        x: tx,
        y: ty,
        z: tz,
        angle,
        type: 'sine_orbital',
        char: i % 18 === 0 ? '✦' : '·',
        phase: Math.random() * Math.PI * 2,
        frequency: 2.5,
        brightness: 140 + Math.floor(Math.random() * 115),
      });
    }

    // 3. CENTRAL QUANTUM SINGULARITY KERNEL (Pulsating portal center inside face)
    const singularityNodesCount = 160;
    for (let i = 0; i < singularityNodesCount; i++) {
      const theta = Math.acos(-1 + (2 * i) / singularityNodesCount);
      const phi = Math.PI * 2 * i * 0.618033;
      particlesPool.push({
        x: 0,
        y: 10,
        z: 0,
        angle: phi,
        type: 'singularity_core',
        char: cyberGlyphs.charAt(Math.floor(Math.random() * cyberGlyphs.length)),
        phase: Math.random() * Math.PI * 2,
        frequency: 3.5,
        brightness: 230 + Math.floor(Math.random() * 25),
      });
    }

    // Populate scene0 backups for morphing
    particlesPool.forEach((pt) => {
      pt.scene0X = pt.x;
      pt.scene0Y = pt.y;
      pt.scene0Z = pt.z;
      pt.scene0Type = pt.type;
    });

    // --- SYSTEM INITIALIZATION HANDSHAKE TIMER ---
    let startupCounter = 0;
    const calibratingTimer = setInterval(() => {
      startupCounter += 4;
      if (startupCounter >= 100) {
        startupCounter = 100;
        clearInterval(calibratingTimer);
        setSystemOnline(true);
      }
      setCalibratingProgress(startupCounter);
    }, 28);

    // --- RAINBOW GLITCH COLUMN CHANNELS DESIGNS ---
    const streamSymbols = '018$#@%+!:=-<>[]{};+*';
    interface RainbowStreamLine {
      colRatioX: number;
      yPos: number;
      speed: number;
      streamHue: number;
      glyphs: string[];
      transparency: number;
    }

    const digitalColumns: RainbowStreamLine[] = [];
    const absoluteLinesCount = 55;

    for (let i = 0; i < absoluteLinesCount; i++) {
      const length = 12 + Math.floor(Math.random() * 18);
      const glyphs: string[] = [];
      for (let k = 0; k < length; k++) {
        glyphs.push(streamSymbols.charAt(Math.floor(Math.random() * streamSymbols.length)));
      }

      digitalColumns.push({
        colRatioX: Math.random() * 2.2 - 1.1,
        yPos: Math.random() * -650,
        speed: 1.8 + Math.random() * 3.5,
        streamHue: Math.random() * 360,
        glyphs,
        transparency: 0.05 + Math.random() * 0.12,
      });
    }

    // Live variables
    let clock = 0;
    let frameId: number;
    let sweepLineY = -230;

    // Glitch framework trigger values
    let glitchFrameTimer = 0;
    let glitchActive = false;
    let glitchVerticalSliceStart = 0;
    let glitchVerticalSliceEnd = 0;
    let glitchOffsetH = 0;

    const render = () => {
      // Atmospheric outer space backdrop clearance
      ctx.fillStyle = '#060509';
      ctx.fillRect(0, 0, width, height);

      clock += 0.016 * speedFactorRef.current;

      // Update scene cycling and transition factor
      sceneTimerRef.current += 0.016 * speedFactorRef.current;
      const SCENE_DURATION = 10.0; // Show each shape for 10 seconds
      const TRANSITION_DURATION = 3.0; // Morph transition over 3 seconds
      
      if (sceneTimerRef.current >= SCENE_DURATION && transitionProgressRef.current >= 1.0) {
        sceneTimerRef.current = 0;
        nextSceneRef.current = (currentSceneRef.current + 1) % 4;
        transitionProgressRef.current = 0.0;
      }
      
      if (transitionProgressRef.current < 1.0) {
        transitionProgressRef.current += (0.016 / TRANSITION_DURATION) * speedFactorRef.current;
        if (transitionProgressRef.current >= 1.0) {
          transitionProgressRef.current = 1.0;
          currentSceneRef.current = nextSceneRef.current;
        }
      }

      // Vertical scanner line movement
      sweepLineY += 3.8 * (intensify ? 2.0 : 1.0);
      if (sweepLineY > 230) {
        sweepLineY = -230;
      }

      // Smooth pointer positions interpolation
      const prevClientX = pointerRef.current.clientX;
      const prevClientY = pointerRef.current.clientY;

      pointerRef.current.currentRangeX += (pointerRef.current.targetRangeX - pointerRef.current.currentRangeX) * 0.08;
      pointerRef.current.currentRangeY += (pointerRef.current.targetRangeY - pointerRef.current.currentRangeY) * 0.08;

      if (pointerRef.current.isHovered) {
        pointerRef.current.clientX += (pointerRef.current.targetClientX - pointerRef.current.clientX) * 0.12;
        pointerRef.current.clientY += (pointerRef.current.targetClientY - pointerRef.current.clientY) * 0.12;
      }

      // Calculate smooth velocity and speed from clean frame changes
      let smoothVX = 0;
      let smoothVY = 0;
      let smoothSpeed = 0;

      if (pointerRef.current.isHovered && prevClientX > -500) {
        smoothVX = pointerRef.current.clientX - prevClientX;
        smoothVY = pointerRef.current.clientY - prevClientY;
        smoothSpeed = Math.min(15, Math.hypot(smoothVX, smoothVY));
      }

      pointerRef.current.velocityX = smoothVX;
      pointerRef.current.velocityY = smoothVY;
      pointerRef.current.speed = pointerRef.current.speed * 0.85 + smoothSpeed * 0.15;

      const rotY = pointerRef.current.currentRangeX;
      const rotX = pointerRef.current.currentRangeY;

      // Physics update and filtering of dynamic cursor-trail sparks
      const sparks = sparkParticlesRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x3d += sp.vx3d;
        sp.y3d += sp.vy3d;
        sp.z3d += sp.vz3d;

        // Apply friction and atmospheric drag
        sp.vx3d *= 0.94;
        sp.vy3d *= 0.94;
        sp.vz3d *= 0.94;

        sp.life -= sp.decay;
        if (sp.life <= 0) {
          sparks.splice(i, 1);
        }
      }

      // Base coordinates viewport scale multiplier
      const scaleBase = Math.min(width, height) * 0.42;

      // Handle active click physical shockwaves progress
      const shockwaves = shockwavesRef.current;
      for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
        const wave = shockwaves[sIdx];
        wave.radius += wave.speed;
        wave.intensity -= 0.012; // slowly decays out

        if (wave.radius > wave.maxRadius || wave.intensity <= 0) {
          shockwaves.splice(sIdx, 1);
        }
      }

      // Dynamic glitch triggering loop
      glitchFrameTimer++;
      if (!glitchActive && Math.random() < 0.01) {
        // Trigger a random temporal coordinate-split glitch frame!
        glitchActive = true;
        glitchOffsetH = (Math.random() - 0.5) * 35;
        glitchVerticalSliceStart = (Math.random() - 0.5) * 160;
        glitchVerticalSliceEnd = glitchVerticalSliceStart + 35 + Math.random() * 50;
        glitchFrameTimer = 0;
      } else if (glitchActive && glitchFrameTimer > 3) {
        // Close glitch cycle
        glitchActive = false;
      }

      // Heighten glitch levels if authorization is achieved or user hovers cursor closely
      const cursorDistanceToCenter = pointerRef.current.isHovered
        ? Math.hypot(pointerRef.current.clientX - width / 2, pointerRef.current.clientY - height / 2)
        : 9999;
      
      const insideWarpProximity = cursorDistanceToCenter < 180;
      const hyperGlitchTrigger = glitchActive || (intensify && Math.random() < 0.04) || (insideWarpProximity && Math.random() < 0.03);

      // HSV-aware 3D coordinate mapping to standard screen viewport
      const project3DCoords = (px: number, py: number, pz: number) => {
        // Constant automatic slow stellar orbit sweep + mouse tilt Yaw
        const combinedYaw = rotY + clock * 0.12;
        const cy = Math.cos(combinedYaw);
        const sy = Math.sin(combinedYaw);
        const cx = Math.cos(rotX);
        const sx = Math.sin(rotX);

        // Yaw Y rotation mapping
        let rx1 = px * cy - pz * sy;
        let rz1 = px * sy + pz * cy;

        // Pitch X rotation mapping
        let ry2 = py * cx - rz1 * sx;
        let rz2 = py * sx + rz1 * cx;

        const cameraDist = 620;
        const scaleFactor = cameraDist / (cameraDist + rz2);

        // Centered screen mapping
        let projectedX = width / 2 + rx1 * scaleFactor * (scaleBase / 140);
        let projectedY = height / 2 + ry2 * scaleFactor * (scaleBase / 140);

        return { x: projectedX, y: projectedY, depth: rz2, scale: scaleFactor };
      };

      // --- 1. RENDER DIGITAL MATRIX STREAM RAIN IN COLOUR SHIFTING SPECTRA ---
      digitalColumns.forEach((line) => {
        // Shifting Hue based on temporal clock
        const dynamicHue = (line.streamHue + clock * 25) % 360;
        line.yPos += line.speed * (intensify ? 2.5 : 1.0) * speedFactorRef.current;
        
        if (line.yPos > height) {
          line.yPos = Math.random() * -350;
          line.colRatioX = Math.random() * 2.2 - 1.1;
          line.streamHue = Math.random() * 360;
        }

        const size = Math.floor(8.5 + Math.random() * 4);
        ctx.font = `bold ${size}px monospace`;
        ctx.textAlign = 'center';

        const screenX = width / 2 + line.colRatioX * (width / 2);

        line.glyphs.forEach((rune, gi) => {
          const depthAlpha = 1.0 - gi / line.glyphs.length;
          const streamAlpha = line.transparency * depthAlpha * (intensify ? 2.4 : 1.0);

          if (streamAlpha <= 0) return;

          // Each rune gets a cascading color in the spectrum sequence for custom rainbow stream visuals
          const cascadeHue = (dynamicHue - gi * 8) % 360;
          const rgb = hsvToRgb(cascadeHue, 0.95, 0.95);

          if (gi === 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.95, streamAlpha * 6.0)})`;
          } else {
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${streamAlpha})`;
          }

          ctx.fillText(rune, screenX, line.yPos - gi * (size * 0.93));
        });

        if (Math.random() < 0.04) {
          line.glyphs.unshift(streamSymbols.charAt(Math.floor(Math.random() * streamSymbols.length)));
          line.glyphs.pop();
        }
      });

      // --- 2. COMPILE & RENDER ALL PARTICLES INDIVIDUALLY WITH DEFORMATION SYSTEMS ---
      const activeFramePoints = particlesPool.map((pt, index) => {
        // Local inline helper functions inside the map iterator
        const getScenePosition = (sceneIndex: number, idx: number, total: number, p: ChromaticParticle): Point3D => {
          switch (sceneIndex) {
            case 0: {
              // Apply organic fluid ripples directly to the skull coordinates so it is never statically resting
              const waveY = Math.sin((p.scene0Y ?? p.y) * 0.05 + clock * 2.2) * 10;
              const swingX = Math.cos((p.scene0Z ?? p.z) * 0.06 + clock * 1.5) * 6;
              const swingZ = Math.sin((p.scene0X ?? p.x) * 0.06 + clock * 1.8) * 6;
              const breathe = 1.0 + Math.sin(clock * 1.4) * 0.04;
              return {
                x: (p.scene0X ?? p.x) * breathe + swingX,
                y: (p.scene0Y ?? p.y) + waveY,
                z: (p.scene0Z ?? p.z) * breathe + swingZ,
                type: p.scene0Type ?? p.type,
              };
            }
            case 1:
              return getHypercubeCoordinate(idx, total, clock);
            case 2:
              return getTorusKnotCoordinate(idx, total, clock);
            case 3:
              return getGeodesicSphereCoordinate(idx, total, clock);
            default:
              return {
                x: p.scene0X ?? p.x,
                y: p.scene0Y ?? p.y,
                z: p.scene0Z ?? p.z,
                type: p.scene0Type ?? p.type,
              };
          }
        };

        const posCurrent = getScenePosition(currentSceneRef.current, index, particlesPool.length, pt);
        const posNext = getScenePosition(nextSceneRef.current, index, particlesPool.length, pt);
        
        const lerp = (start: number, end: number, f: number) => start + (end - start) * f;
        const t = transitionProgressRef.current;
        const smoothT = t * t * (3 - 2 * t); // Smoothstep
        
        const baseX = lerp(posCurrent.x, posNext.x, smoothT);
        const baseY = lerp(posCurrent.y, posNext.y, smoothT);
        const baseZ = lerp(posCurrent.z, posNext.z, smoothT);
        
        const activeType = t < 0.5 ? posCurrent.type : posNext.type;
        
        let lx = baseX;
        let ly = baseY;
        let lz = baseZ;

        // Biological pulsating breathing shifts
        const pulsationWave = Math.sin(clock * 2.5 + pt.phase) * 3.5;

        // Custom motion based on active morphed element type
        if (activeType === 'head' || activeType === 'eye') {
          // Subtle breathing expansions
          const expFactor = 1.0 + Math.sin(clock * 1.5 + pt.phase * 0.5) * 0.025;
          lx *= expFactor;
          ly += pulsationWave * 0.3;
          lz *= expFactor;
        } 
        else if (activeType === 'halo_crown') {
          // Symmetrical crown waviness & tilting orbits
          const localAng = pt.angle + clock * 0.6;
          // Scale from dynamic base coordinates with additional oscillation waves
          lx = baseX * 1.1 + Math.sin(clock * 3.2 + localAng * 5) * 4;
          lz = baseZ * 1.1 + Math.cos(clock * 3.2 + localAng * 5) * 4;
          ly = baseY + Math.sin(clock * 3.2 + localAng * 5) * 8;
        } 
        else if (activeType === 'equator_ring') {
          // Concentric spinning disks
          const spinspeed = index % 2 === 0 ? 0.35 : -0.22;
          const activeAng = pt.angle + clock * spinspeed;
          
          // Re-calculate orbital coordinates around dynamic base bounds
          const baseRadius = Math.hypot(baseX, baseZ);
          lx = baseRadius * Math.cos(activeAng);
          lz = baseRadius * Math.sin(activeAng);
          ly = baseY;
        } 
        else if (activeType === 'sine_orbital') {
          // Sine acceleration waves
          const runAng = pt.angle + clock * 0.15;
          const baseRadius = Math.hypot(baseX, baseZ);
          const waveformAmplitude = 25 + Math.sin(clock * 3.8 + pt.angle * 12) * 12;

          const currentRadius = baseRadius + (waveformAmplitude * (baseRadius > 100 ? 1.0 : 0.4));
          const bx = currentRadius * Math.cos(runAng);
          const bz = currentRadius * Math.sin(runAng);
          const by = Math.sin(clock * 2.0 + pt.angle * 6) * 15;

          // Align inclined coordinates
          const tiltFactor = 0.70;
          lx = bx * Math.cos(tiltFactor) - by * Math.sin(tiltFactor);
          ly = bx * Math.sin(tiltFactor) + by * Math.cos(tiltFactor);
          lz = bz;
        }
        else if (activeType === 'singularity_core') {
          // Intense core orbit around central system singularity focus
          const orbitalExpansion = 18 + Math.cos(clock * 5.5 + pt.phase) * 7.5;
          lx = baseX + orbitalExpansion * Math.sin(pt.angle) * Math.cos(pt.phase);
          ly = baseY + orbitalExpansion * Math.sin(pt.angle) * Math.sin(pt.phase);
          lz = baseZ + orbitalExpansion * Math.cos(pt.angle);
        }

        // --- PHYSICAL SHOCKWAVE DISPLACEMENT ENGINE (Click reactive singularity pop) ---
        let shockwaveOffsetMag = 0;
        let shockwaveTriggered = false;

        shockwaves.forEach((wave) => {
          // Distance in 3D scale
          const dist3D = Math.hypot(lx - wave.x3d, ly - wave.y3d, lz - wave.z3d);
          const tolerance = 24.0;
          
          if (Math.abs(dist3D - wave.radius) < tolerance) {
            const proximityFactor = 1.0 - Math.abs(dist3D - wave.radius) / tolerance;
            
            // Outward blast vector
            const dx = lx - wave.x3d;
            const dy = ly - wave.y3d;
            const dz = lz - wave.z3d;
            const distUnit = Math.max(1, dist3D);

            // Accelerate and displace coordinates outward relative to spatial blast radius
            const kineticShockPower = proximityFactor * 45 * wave.intensity;
            lx += (dx / distUnit) * kineticShockPower;
            ly += (dy / distUnit) * kineticShockPower;
            lz += (dz / distUnit) * kineticShockPower;

            shockwaveOffsetMag = kineticShockPower;
            shockwaveTriggered = true;
          }
        });

        // --- COGNITIVE CURSOR MAGNETIC FLUID WARPING (Vortex Swirl and Spring Drag) ---
        let initialProj = project3DCoords(lx, ly, lz);
        let cursorDistSq = 999999;
        
        if (pointerRef.current.isHovered) {
          cursorDistSq = Math.hypot(initialProj.x - pointerRef.current.clientX, initialProj.y - pointerRef.current.clientY);
          
          const maxInfluenceDist = 200; // Refined active warp range
          if (cursorDistSq < maxInfluenceDist) {
            const influenceStrength = (1.0 - cursorDistSq / maxInfluenceDist);
            
            // A. Whirlwind Sw swirl vortex force around core center:
            const spinFactor = (0.015 + pointerRef.current.speed * 0.005) * influenceStrength;
            const cosS = Math.cos(spinFactor);
            const sinS = Math.sin(spinFactor);
            
            // Twist local coordinates slightly
            const tempX = lx * cosS - ly * sinS;
            const tempY = lx * sinS + ly * cosS;
            lx = tempX;
            ly = tempY;

            // B. Directional push trail matching mouse swipe path and velocity:
            const pushScale = influenceStrength * 1.5;
            lx += pointerRef.current.velocityX * pushScale;
            ly += pointerRef.current.velocityY * pushScale;

            // C. Inward physical magnetic compression:
            const magneticCompression = (1.0 - influenceStrength * 0.15);
            lx *= magneticCompression;
            ly *= magneticCompression;

            // D. Gentle lift up towards focal camera depth:
            lz += influenceStrength * 25 * (1.0 + Math.min(2.0, pointerRef.current.speed * 0.2));
          }
        }

        // --- SCANNING GLITCH SCANLINE DEFORMATION SWEEPS ---
        const activeInScanSweep = Math.abs(ly - sweepLineY) < 13;
        if (activeInScanSweep) {
          const intensityPercent = 1.0 - Math.abs(ly - sweepLineY) / 13;
          // Displace coordinate in depth dimension, causing scan bulge
          lz += intensityPercent * 20;
          lx += Math.sin(clock * 18 + index) * intensityPercent * 6;
        }

        // Final Projection of altered metrics
        const projectedCoords = project3DCoords(lx, ly, lz);

        // Map colors smoothly with speed-adaptive high frequency cycles
        let baseOrbitHue = 0;
        const speedMultiplier = 1.0 + pointerRef.current.speed * 3.2; // Colors move much faster during rapid mouse sweeps!
        if (activeType === 'head') {
          baseOrbitHue = (Math.abs(pt.angle) * 360 / (Math.PI * 2) + clock * 25 * speedMultiplier) % 360;
        } else if (activeType === 'eye') {
          baseOrbitHue = (180 + clock * 75 * speedMultiplier) % 360;
        } else if (activeType === 'halo_crown') {
          baseOrbitHue = (index * 2 + clock * 40 * speedMultiplier) % 360;
        } else if (activeType === 'equator_ring') {
          baseOrbitHue = (pt.angle * 180 / Math.PI - clock * 30 * speedMultiplier) % 360;
        } else if (activeType === 'sine_orbital') {
          baseOrbitHue = (pt.angle * 180 / Math.PI + clock * 60 * speedMultiplier) % 360;
        } else {
          baseOrbitHue = (clock * 110 * speedMultiplier) % 360;
        }

        return {
          pt,
          proj: projectedCoords,
          hue: (baseOrbitHue + globalColorShiftRef.current) % 360,
          idx: index,
          cursorDistSq,
          activeInScanSweep,
          shockwaveTriggered,
          shockwaveOffsetMag,
          activeType,
        };
      });

      // Inject active cursor tail sparks into sorted activeFramePoints rendering queue
      sparks.forEach((sp, sIdx) => {
        const projectedCoords = project3DCoords(sp.x3d, sp.y3d, sp.z3d);
        // Map spark hue to speed and index
        const sparkHue = (sp.hue + clock * 120) % 360;

        activeFramePoints.push({
          pt: {
            x: sp.x3d,
            y: sp.y3d,
            z: sp.z3d,
            angle: 0,
            type: 'singularity_core',
            char: sp.char,
            phase: 0,
            frequency: 1,
            brightness: Math.floor(sp.life * 255),
          },
          proj: projectedCoords,
          hue: (sparkHue + globalColorShiftRef.current) % 360,
          idx: 88888 + sIdx,
          cursorDistSq: 0,
          activeInScanSweep: false,
          shockwaveTriggered: false,
          shockwaveOffsetMag: 0,
          activeType: 'singularity_core',
        });
      });

      // Z-depth volumetric sorting to render further points behind beautiful front-shined details
      const maxDrawDistance = 650;
      activeFramePoints.sort((a, b) => b.proj.depth - a.proj.depth);

      // --- RENDERING LOOP WITH CHROMATIC ABERRATION SPLITS AND ORNATE STYLES ---
      activeFramePoints.forEach(({ pt, proj, hue, idx, cursorDistSq, activeInScanSweep, shockwaveTriggered, shockwaveOffsetMag, activeType }) => {
        if (proj.depth <= -maxDrawDistance) return;

        // Depth-dependent focal alpha
        const depthAlphaScalar = Math.max(0.12, (maxDrawDistance - proj.depth) / maxDrawDistance);
        let alpha = (pt.brightness / 255) * depthAlphaScalar;

        // Visual modifiers based on spatial states
        let pointSize = Math.max(1.0, (pt.brightness / 255) * 2.8 * proj.scale) * particleSizeScaleRef.current;
        let saturation = 0.95;
        let value = 0.95;

        // Increase size and luminosity if affected by shockwave blast or scan sweepers
        if (shockwaveTriggered) {
          alpha = 1.0;
          pointSize *= (1.5 + shockwaveOffsetMag * 0.05);
          value = 1.0;
        } else if (activeInScanSweep) {
          alpha = Math.min(1.0, alpha * 2.6);
          pointSize *= 1.4;
          value = 1.0;
        }

        // Intensify parameters when activated
        if (intensify) {
          alpha = Math.min(1.0, alpha * 1.8);
          pointSize *= 1.25;
        }

        // Hover proximity brightness boost across the wide active warp range
        if (cursorDistSq < 220) {
          const proximityRatio = (1.0 - cursorDistSq / 220);
          alpha = Math.min(1.0, alpha * (1.1 + proximityRatio * 2.2));
          pointSize *= (1.0 + proximityRatio * 0.6 + pointerRef.current.speed * 0.2);
        }

        // Get spectrum RGB components
        const spectrum = hsvToRgb(hue, saturation, value);

        // Absolute Chromatic Glitch Aberration Split offset magnitude calculation
        let chromaticShiftX = 0;
        let chromaticShiftY = 0;

        // Coherency check: instead of a pure per-particle independent random roll, we use a stable deterministic sine trigger
        // combined with key speed triggers to prevent high-frequency white noise jumping.
        const speedEnvelope = Math.min(1.0, pointerRef.current.speed * 0.10);
        const localGlitchFactor = hyperGlitchTrigger ? 1.0 : (speedEnvelope * 0.45);
        
        // Coherent glitch trigger active for this specific particle
        const isGlitchActiveForNode = localGlitchFactor > 0.12 && (Math.sin(idx * 0.17 + clock * 22) * 0.5 + 0.5) < localGlitchFactor;

        if (isGlitchActiveForNode) {
          // Visual displacement
          const velocityImpact = 1.0 + pointerRef.current.speed * 0.15;
          chromaticShiftX = (Math.sin(clock * 18 + idx) * 8.0 * velocityImpact) + (glitchActive ? glitchOffsetH : 0) + (pointerRef.current.velocityX * 0.3);
          chromaticShiftY = (Math.cos(clock * 15 + idx) * 2.5 * velocityImpact) + (pointerRef.current.velocityY * 0.3);
        } else if (cursorDistSq < 200) {
          // Smooth mouse pull relative to proximity
          const strength = (1.0 - cursorDistSq / 200);
          chromaticShiftX = (pointerRef.current.targetRangeX * 12 * strength) + (Math.sin(clock * 6 + idx) * 2 * strength) + (pointerRef.current.velocityX * 0.15 * strength);
          chromaticShiftY = (-pointerRef.current.targetRangeY * 12 * strength) + (pointerRef.current.velocityY * 0.15 * strength);
        }

        // Determine if rendering style is text glyph or simple structural pixel
        // Eye Sockets, Halos, Singularity and Glitched sweep lines choose high frequency text symbols
        const selectTextSymbol = (activeType === 'eye' && idx % 2 === 0) ||
                                 (activeType === 'halo_crown' && idx % 4 === 0) ||
                                 (activeType === 'singularity_core') ||
                                 (cursorDistSq < 110 && Math.sin(clock * 5 + idx) > 0.4) ||
                                 activeInScanSweep ||
                                 shockwaveTriggered;

        // --- DRAWING WITH FULL REAL-TIME CHROMATIC ABERRATION CHROMATIC SPLITTING ---
        if (Math.abs(chromaticShiftX) > 0.4 || Math.abs(chromaticShiftY) > 0.4) {
          // Color channel 1: RED (shifted left/up)
          ctx.fillStyle = `rgba(${spectrum.r}, 0, 0, ${alpha})`;
          if (selectTextSymbol && systemOnline) {
            const fontScale = Math.max(5.5, Math.floor(9.0 * proj.scale));
            ctx.font = `bold ${fontScale}px monospace`;
            ctx.fillText(pt.char, proj.x - chromaticShiftX, proj.y - chromaticShiftY);
          } else {
            ctx.fillRect(proj.x - pointSize / 2 - chromaticShiftX, proj.y - pointSize / 2 - chromaticShiftY, pointSize, pointSize);
          }

          // Color channel 2: GREEN + BLUE = CYAN (shifted right/down)
          ctx.fillStyle = `rgba(0, ${spectrum.g}, ${spectrum.b}, ${alpha})`;
          if (selectTextSymbol && systemOnline) {
            const fontScale = Math.max(5.5, Math.floor(9.0 * proj.scale));
            ctx.font = `bold ${fontScale}px monospace`;
            ctx.fillText(pt.char, proj.x + chromaticShiftX, proj.y + chromaticShiftY);
          } else {
            ctx.fillRect(proj.x - pointSize / 2 + chromaticShiftX, proj.y - pointSize / 2 + chromaticShiftY, pointSize, pointSize);
          }
        } 
        else {
          // Normal seamless rendering fallback when stable (Unified Spectrum RGB)
          // Eye sockets glow intensely with spectrum backlights
          if (activeType === 'eye') {
            ctx.shadowColor = `rgba(${spectrum.r}, ${spectrum.g}, ${spectrum.b}, ${alpha * 0.7})`;
            ctx.shadowBlur = 8;
          }

          ctx.fillStyle = `rgba(${spectrum.r}, ${spectrum.g}, ${spectrum.b}, ${alpha})`;

          if (selectTextSymbol && systemOnline) {
            const fontScale = Math.max(5.5, Math.floor(9.5 * proj.scale));
            ctx.font = `bold ${fontScale}px monospace`;
            ctx.fillText(pt.char, proj.x, proj.y);
          } else {
            ctx.fillRect(proj.x - pointSize / 2, proj.y - pointSize / 2, pointSize, pointSize);
          }

          ctx.shadowBlur = 0; // Clear blur shadow instantly for flawless framerates
        }
      });

      // --- 3. DYNAMIC VECTOR DIAGNOSTIC SCIFI HUD OVERLAYS ---
      const dynamicNeonHue = (clock * 30) % 360;
      const rgbLine = hsvToRgb(dynamicNeonHue, 0.90, 0.90);

      // Crud scanline raster overlay grid
      ctx.strokeStyle = `rgba(${rgbLine.r}, ${rgbLine.g}, ${rgbLine.b}, 0.024)`;
      ctx.lineWidth = 1.0;
      const lineStepSpacing = 8;
      for (let x = 0; x < height; x += lineStepSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, x);
        ctx.lineTo(width, x);
        ctx.stroke();
      }

      // Sleek target overlay corner outline braces
      const paddingEdge = 20;
      ctx.strokeStyle = `rgba(${rgbLine.r}, ${rgbLine.g}, ${rgbLine.b}, 0.28)`;
      ctx.lineWidth = 1.2;

      // Top Left Corner
      ctx.beginPath();
      ctx.moveTo(paddingEdge + 15, paddingEdge);
      ctx.lineTo(paddingEdge, paddingEdge);
      ctx.lineTo(paddingEdge, paddingEdge + 15);
      ctx.stroke();

      // Top Right Corner
      ctx.beginPath();
      ctx.moveTo(width - paddingEdge - 15, paddingEdge);
      ctx.lineTo(width - paddingEdge, paddingEdge);
      ctx.lineTo(width - paddingEdge, paddingEdge + 15);
      ctx.stroke();

      // Bottom Left Corner
      ctx.beginPath();
      ctx.moveTo(paddingEdge + 15, height - paddingEdge);
      ctx.lineTo(paddingEdge, height - paddingEdge);
      ctx.lineTo(paddingEdge, height - paddingEdge - 15);
      ctx.stroke();

      // Bottom Right Corner
      ctx.beginPath();
      ctx.moveTo(width - paddingEdge - 15, height - paddingEdge);
      ctx.lineTo(width - paddingEdge, height - paddingEdge);
      ctx.lineTo(width - paddingEdge, height - paddingEdge - 15);
      ctx.stroke();

      // Draw Hologram Active Mode Monospaced text underneath top left corner marker
      ctx.fillStyle = `rgba(${rgbLine.r}, ${rgbLine.g}, ${rgbLine.b}, 0.28)`;
      ctx.font = '7px monospace';
      ctx.textAlign = 'left';
      const sceneNames = [
        'HOLOMETRIC SCENE PROJECTION: ACTIVE_MATRIX_SKULL // CC-09',
        'HOLOMETRIC SCENE PROJECTION: HYPERDIMENSIONAL_TESSERACT // CC-10',
        'HOLOMETRIC SCENE PROJECTION: CELESTIAL_TORUS_KNOT // CC-11',
        'HOLOMETRIC SCENE PROJECTION: QUANTUM_MATRIX_GLOBE // CC-12'
      ];
      const activeName = sceneNames[currentSceneRef.current];
      ctx.fillText(activeName, paddingEdge + 25, paddingEdge + 10);

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(calibratingTimer);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleMouseLeave);
      container.removeEventListener('click', handleContainerClick);
    };
  }, [intensify, systemOnline]);

  return (
    <div
      id="martian-matrix-hologram-wrapper"
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0 bg-[#060509] cursor-crosshair select-none"
    >
      {/* Prime 3D Projection Canvas */}
      <canvas
        id="matrix-holo-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none z-[1]"
      />

      {/* Cyber Calibration Decryption handshake */}
      {!systemOnline && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-[2] font-mono text-center">
          <div className="bg-black/95 border border-purple-500/20 rounded-xl p-8 max-w-xs space-y-4 shadow-[0_0_25px_rgba(168,85,247,0.12)] backdrop-blur-sm animate-pulse">
            <div className="text-purple-400 font-bold text-[10px] tracking-[0.3em] uppercase">
              DECRYPTING_HOLOMETRIC_VECTORS
            </div>
            
            <div className="h-1 bg-purple-950 rounded-full overflow-hidden w-full relative">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${calibratingProgress}%` }}
              />
            </div>

            <div className="text-cyan-400 text-[9px] tracking-widest uppercase">
              INTERCEPTION_GRID: {calibratingProgress}%_CALIBRATED
            </div>
          </div>
        </div>
      )}



      {/* Subtle colorful neon blur emitter elements representing atmospheric auras */}
      <div className="absolute top-[28%] left-[24%] w-[38vw] h-[38vw] max-w-[250px] max-h-[250px] rounded-full bg-purple-600/5 filter blur-[115px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-[34%] left-[20%] w-[32vw] h-[32vw] max-w-[200px] max-h-[200px] rounded-full bg-cyan-500/5 filter blur-[95px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-[40%] left-[28%] w-[28vw] h-[28vw] max-w-[180px] max-h-[180px] rounded-full bg-rose-500/5 filter blur-[105px] pointer-events-none z-0 animate-pulse" />
    </div>
  );
}
