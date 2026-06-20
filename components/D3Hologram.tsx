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

function getEvuLogoCoordinate(idx: number, total: number, clock: number): Point3D {
  const segment = Math.floor((idx / total) * 3);
  const segmentSize = Math.ceil(total / 3);
  const localIdx = idx - segment * segmentSize;

  // Stable pseudo-random generators
  const random = (s: number) => {
    const val = Math.sin(s * 12.9898 + 0.123) * 43758.5453;
    return val - Math.floor(val);
  };

  const r1 = random(localIdx * 1.37 + 0.1);
  const r2 = random(localIdx * 3.14 + 0.2);
  const r3 = random(localIdx * 7.82 + 0.3);

  let xVal = 0;
  let yVal = 0;
  let type: 'head' | 'eye' | 'halo_crown' | 'equator_ring' | 'sine_orbital' | 'singularity_core' = 'sine_orbital';

  if (segment === 0) {
    // E
    type = 'halo_crown';
    const totalE = segmentSize; 
    const topCount = Math.floor(totalE * (361 / 969));
    const midCount = Math.floor(totalE * (247 / 969));

    const sampleRoundedRect = (xmin: number, ymin: number, W: number, H: number, R: number, ra: number, rb: number) => {
      let px = xmin + ra * W;
      let py = ymin + rb * H;
      const xmax = xmin + W;
      const ymax = ymin + H;
      if (px < xmin + R && py < ymin + R) {
        const cx = xmin + R, cy = ymin + R;
        const dx = px - cx, dy = py - cy;
        if (Math.hypot(dx, dy) > R) {
          const angle = Math.atan2(dy, dx);
          px = cx + Math.cos(angle) * R;
          py = cy + Math.sin(angle) * R;
        }
      } else if (px > xmax - R && py < ymin + R) {
        const cx = xmax - R, cy = ymin + R;
        const dx = px - cx, dy = py - cy;
        if (Math.hypot(dx, dy) > R) {
          const angle = Math.atan2(dy, dx);
          px = cx + Math.cos(angle) * R;
          py = cy + Math.sin(angle) * R;
        }
      } else if (px < xmin + R && py > ymax - R) {
        const cx = xmin + R, cy = ymax - R;
        const dx = px - cx, dy = py - cy;
        if (Math.hypot(dx, dy) > R) {
          const angle = Math.atan2(dy, dx);
          px = cx + Math.cos(angle) * R;
          py = cy + Math.sin(angle) * R;
        }
      } else if (px > xmax - R && py > ymax - R) {
        const cx = xmax - R, cy = ymax - R;
        const dx = px - cx, dy = py - cy;
        if (Math.hypot(dx, dy) > R) {
          const angle = Math.atan2(dy, dx);
          px = cx + Math.cos(angle) * R;
          py = cy + Math.sin(angle) * R;
        }
      }
      return { x: px, y: py };
    };

    if (localIdx < topCount) {
      // Top bar: x in [-70, -30], y in [10, 20] (thickness 10)
      const pt = sampleRoundedRect(-70, 10, 40, 10, 5, r1, r2);
      xVal = pt.x;
      yVal = pt.y;
    } else if (localIdx < topCount + midCount) {
      // Middle bar: x in [-70, -40], y in [-5, 5] (narrower 30 wide, left-aligned)
      const pt = sampleRoundedRect(-70, -5, 30, 10, 5, r1, r2);
      xVal = pt.x;
      yVal = pt.y;
    } else {
      // Bottom bar: x in [-70, -30], y in [-20, -10]
      const pt = sampleRoundedRect(-70, -20, 40, 10, 5, r1, r2);
      xVal = pt.x;
      yVal = pt.y;
    }
  }
  else if (segment === 1) {
    // V
    type = 'singularity_core';
    const isLeft = localIdx < (segmentSize / 2);
    
    let ax = 0, ay = 0, bx = 0, by = 0;
    if (isLeft) {
      ax = -15; ay = 20;
      bx = 0; by = -20;
    } else {
      ax = 0; ay = -20;
      bx = 15; by = 20;
    }

    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const px = -uy;
    const py = ux;

    const offset = (r2 - 0.5) * 10.0;
    xVal = ax + r1 * dx + offset * px;
    yVal = ay + r1 * dy + offset * py;
  }
  else {
    // U
    type = 'head';
    const totalU = segmentSize;
    const leftCount = Math.floor(totalU * (25 / 97.12));
    const arcCount = Math.floor(totalU * (47.12 / 97.12));

    if (localIdx < leftCount) {
      // Left vertical stem: from (35, -5) to (35, 20) with width 10
      xVal = 35.0 + (r2 - 0.5) * 10.0;
      yVal = -5.0 + r1 * 25.0;
    } else if (localIdx < leftCount + arcCount) {
      // Bottom-most semi-circular arc: centered at (50, -5), radius 15
      const angle = Math.PI + r1 * Math.PI;
      const radialDist = 15.0 + (r2 - 0.5) * 10.0;
      xVal = 50.0 + Math.cos(angle) * radialDist;
      yVal = -5.0 + Math.sin(angle) * radialDist;
    } else {
      // Right vertical stem: from (65, -5) to (65, 20) with width 10
      xVal = 65.0 + (r2 - 0.5) * 10.0;
      yVal = -5.0 + r1 * 25.0;
    }
  }

  // Scale and center mapping from local space to 3D coordinate space centered perfectly
  const xMapped = xVal * 1.8;
  const yMapped = -yVal * 1.8; // Negative makes positive 3D yVal map to negative Canvas 2D Y (top of screen)
  // Add volumetric thickness depth
  const zMapped = (r3 - 0.5) * 12.0;

  return {
    x: xMapped,
    y: yMapped,
    z: zMapped,
    type: type
  };
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
  const intensifyRef = useRef(intensify);

  useEffect(() => {
    globalColorShiftRef.current = globalColorShift;
  }, [globalColorShift]);

  useEffect(() => {
    speedFactorRef.current = speedFactor;
  }, [speedFactor]);

  useEffect(() => {
    particleSizeScaleRef.current = particleSizeScale;
  }, [particleSizeScale]);

  useEffect(() => {
    intensifyRef.current = intensify;
  }, [intensify]);

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

      // Spawn a dramatic storm of highly energetic, multi-colored rainbow sparks on fast motion
      if (movementDist > 2) {
        const spawnCount = Math.max(2, Math.min(8, Math.floor(movementDist / 1.5)));
        for (let s = 0; s < spawnCount; s++) {
          const clickX3d = (relativeX / (Math.min(width, height) * 0.42)) * 140;
          const clickY3d = (relativeY / (Math.min(width, height) * 0.42)) * 140;
          const sparkGlyphList = '✦✧★⭐⚡︎☄✴✨🌈🛸✴⚛';
          const sparkChar = sparkGlyphList.charAt(Math.floor(Math.random() * sparkGlyphList.length));

          sparkParticlesRef.current.push({
            x3d: clickX3d + (Math.random() - 0.5) * 16,
            y3d: clickY3d + (Math.random() - 0.5) * 16,
            z3d: (Math.random() - 0.5) * 25,
            vx3d: (Math.random() - 0.5) * 4 + (dx * 0.18),
            vy3d: (Math.random() - 0.5) * 4 + (dy * 0.18),
            vz3d: (Math.random() - 0.5) * 6,
            char: sparkChar,
            hue: Math.random() * 360,
            life: 1.0,
            decay: 0.015 + Math.random() * 0.02,
            scale: 1.0 + Math.random() * 1.6,
          });
        }
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

        if (movementDist > 2) {
          const spawnCount = Math.max(2, Math.min(8, Math.floor(movementDist / 1.5)));
          for (let s = 0; s < spawnCount; s++) {
            const clickX3d = (relativeX / (Math.min(width, height) * 0.42)) * 140;
            const clickY3d = (relativeY / (Math.min(width, height) * 0.42)) * 140;
            const sparkGlyphList = '✦✧★⭐⚡︎☄✴✨🌈🛸✴⚛';
            const sparkChar = sparkGlyphList.charAt(Math.floor(Math.random() * sparkGlyphList.length));

            sparkParticlesRef.current.push({
              x3d: clickX3d + (Math.random() - 0.5) * 16,
              y3d: clickY3d + (Math.random() - 0.5) * 16,
              z3d: (Math.random() - 0.5) * 25,
              vx3d: (Math.random() - 0.5) * 4 + (dx * 0.18),
              vy3d: (Math.random() - 0.5) * 4 + (dy * 0.18),
              vz3d: (Math.random() - 0.5) * 6,
              char: sparkChar,
              hue: Math.random() * 360,
              life: 1.0,
              decay: 0.015 + Math.random() * 0.02,
              scale: 1.0 + Math.random() * 1.6,
            });
          }
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

      // Spawn a massive, high-velocity physical burst of beautiful multi-colored rainbow sparks on click
      for (let i = 0; i < 48; i++) {
        const speed = 2.5 + Math.random() * 8.5;
        const angle = (i / 48) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const sparkGlyphList = '✦✧★⭐⚡︎☄✴✨🌈🛸✴⚛';
        const sparkChar = sparkGlyphList.charAt(Math.floor(Math.random() * sparkGlyphList.length));

        sparkParticlesRef.current.push({
          x3d: x3d,
          y3d: y3d,
          z3d: (Math.random() - 0.5) * 15,
          vx3d: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
          vy3d: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
          vz3d: (Math.random() - 0.5) * 6,
          char: sparkChar,
          hue: Math.random() * 360,
          life: 1.0,
          decay: 0.012 + Math.random() * 0.018,
          scale: 1.2 + Math.random() * 1.5,
        });
      }

      // Trigger a bright flashing surge of light on interactive click
      screenFlashIntensity = Math.min(1.0, screenFlashIntensity + 0.85);
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
    let screenFlashIntensity = 0.0; // Dynamic bright flashes of light across the screen
    let evuFactor = 0.0; // Transition factor for the EVU brand scene

    // Glitch framework trigger values
    let glitchFrameTimer = 0;
    let glitchActive = false;
    let glitchVerticalSliceStart = 0;
    let glitchVerticalSliceEnd = 0;
    let glitchOffsetH = 0;

    const render = () => {
      // Atmospheric outer space backdrop clearance
      ctx.clearRect(0, 0, width, height);

      // Draw horizontal dynamic light glitches (music video aesthetic tear-lines)
      if (glitchActive || Math.random() < 0.12) {
        const linesCount = glitchActive ? 8 : 2;
        ctx.lineWidth = glitchActive ? 2.2 : 0.8;
        for (let i = 0; i < linesCount; i++) {
          const sliceY = Math.random() * height;
          
          // Fast spectrum dynamic line coloring
          const lineHue = (clock * 180 + Math.random() * 60) % 360;
          const rgbL = hsvToRgb(lineHue, 0.95, 0.95);
          
          ctx.strokeStyle = `rgba(${rgbL.r}, ${rgbL.g}, ${rgbL.b}, ${glitchActive ? 0.38 : 0.12})`;
          ctx.beginPath();
          ctx.moveTo(0, sliceY);
          ctx.lineTo(width, sliceY + (Math.random() - 0.5) * 8);
          ctx.stroke();
        }
      }

      clock += 0.016 * speedFactorRef.current;

      // Decay screen flash brightness over time (fits fast-paced music video cuts)
      if (screenFlashIntensity > 0) {
        screenFlashIntensity -= 0.035 * speedFactorRef.current;
        if (screenFlashIntensity < 0) screenFlashIntensity = 0;
      }

      // Random sporadic bright electricity/matrix energy discharges (music video beat style)
      if (Math.random() < 0.009) {
        screenFlashIntensity = Math.max(screenFlashIntensity, 0.45 + Math.random() * 0.45);
      }

      // Update scene cycling and transition factor
      sceneTimerRef.current += 0.016 * speedFactorRef.current;
      const SCENE_DURATION = 4.0; // Stay static on a shape for 4.0 seconds (readable!)
      const TRANSITION_DURATION = 1.6; // Energetic, snappy transitions (1.6 seconds)
      
      if (currentSceneRef.current === nextSceneRef.current) {
        if (sceneTimerRef.current >= SCENE_DURATION) {
          sceneTimerRef.current = 0;
          nextSceneRef.current = (currentSceneRef.current + 1) % 8;
          transitionProgressRef.current = 0.0;
          screenFlashIntensity = 1.0; // TRIGGER ENERGETIC FULL SCREEN FLASH
        }
      } else {
        if (transitionProgressRef.current < 1.0) {
          transitionProgressRef.current += (0.016 / TRANSITION_DURATION) * speedFactorRef.current;
          if (transitionProgressRef.current >= 1.0) {
            transitionProgressRef.current = 1.0;
            currentSceneRef.current = nextSceneRef.current;
            sceneTimerRef.current = 0; // Reset timer so we rest on the new scene for SCENE_DURATION!
          }
        }
      }

      // Compute general evuFactor for other sub-generators
      const curIsEvuTmp = currentSceneRef.current % 2 === 1;
      const nxtIsEvuTmp = nextSceneRef.current % 2 === 1;
      const tSceneTmp = transitionProgressRef.current;
      evuFactor = curIsEvuTmp 
        ? (nxtIsEvuTmp ? 1.0 : 1.0 - tSceneTmp)
        : (nxtIsEvuTmp ? tSceneTmp : 0.0);

      // Vertical scanner line movement
      sweepLineY += 4.5 * (intensifyRef.current ? 2.5 : 1.0) * speedFactorRef.current;
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

      // Spontaneous background micro-nova / atmospheric plasma burst generator
      // Emits violent concentric arcs of glowing neon sparks matching the active theme
      // DISABLED during EVU logo scene to prevent fireworks and keep focus on pristine circuit glitch visuals!
      if (evuFactor < 0.02 && Math.random() < 0.038) {
        // Explode anywhere in a neat bounding sphere around the alien head
        const randX3d = (Math.random() - 0.5) * 190;
        const randY3d = (Math.random() - 0.5) * 230;
        const randZ3d = (Math.random() - 0.5) * 85;
        
        // Randomly choose a small crackle vs a massive solar flare
        const burstCount = Math.random() < 0.15 ? 16 + Math.floor(Math.random() * 20) : 6 + Math.floor(Math.random() * 8);
        const randBaseHue = Math.random() * 360;

        for (let b = 0; b < burstCount; b++) {
          const speed = 1.8 + Math.random() * 5.2;
          const angle = Math.random() * Math.PI * 2;
          const sparkGlyphList = '✦✧★⭐⚡︎☄✴✨🌈🛸✴⚛';
          const sparkChar = sparkGlyphList.charAt(Math.floor(Math.random() * sparkGlyphList.length));

          sparks.push({
            x3d: randX3d,
            y3d: randY3d,
            z3d: randZ3d,
            vx3d: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
            vy3d: Math.sin(angle) * speed + (Math.random() - 0.5) * 1.5,
            vz3d: (Math.random() - 0.5) * 4.5,
            char: sparkChar,
            // Blend sparks between a single intense base burst color and random spectrum hsv gradients
            hue: (randBaseHue + (Math.random() - 0.5) * 60) % 360,
            life: 1.0,
            decay: 0.016 + Math.random() * 0.022,
            scale: 0.9 + Math.random() * 1.4,
          });
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        const spDtStr = speedFactorRef.current;
        sp.x3d += sp.vx3d * spDtStr;
        sp.y3d += sp.vy3d * spDtStr;
        sp.z3d += sp.vz3d * spDtStr;

        // Apply friction and atmospheric drag scaled by speedFactor
        sp.vx3d *= Math.pow(0.94, spDtStr);
        sp.vy3d *= Math.pow(0.94, spDtStr);
        sp.vz3d *= Math.pow(0.94, spDtStr);

        sp.life -= sp.decay * spDtStr;
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
        const waveDtStr = speedFactorRef.current;
        wave.radius += wave.speed * waveDtStr;
        wave.intensity -= 0.012 * waveDtStr; // slowly decays out

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
      const hyperGlitchTrigger = glitchActive || (intensifyRef.current && Math.random() < 0.04) || (insideWarpProximity && Math.random() < 0.03);

      // Calculate smooth cinematic locking to front-facing coordinates for EVU scenes
      const currentIsEvu = currentSceneRef.current % 2 === 1;
      const nextIsEvu = nextSceneRef.current % 2 === 1;
      const tScene = transitionProgressRef.current;
      evuFactor = currentIsEvu 
        ? (nextIsEvu ? 1.0 : 1.0 - tScene)
        : (nextIsEvu ? tScene : 0.0); // Simple factor
      
      const smoothEvuFactor = currentIsEvu 
        ? (nextIsEvu ? 1.0 : 1.0 - tScene)
        : (nextIsEvu ? tScene * tScene * (3 - 2 * tScene) : 0.0);

      // HSV-aware 3D coordinate mapping to standard screen viewport
      const project3DCoords = (px: number, py: number, pz: number) => {
        // Continuous orbit yaw and pitch scale down to zero as smoothEvuFactor goes to 1.0
        const viewYaw = (rotY + clock * 0.12) * (1.0 - smoothEvuFactor);
        const viewPitch = rotX * (1.0 - smoothEvuFactor);

        const cy = Math.cos(viewYaw);
        const sy = Math.sin(viewYaw);
        const cx = Math.cos(viewPitch);
        const sx = Math.sin(viewPitch);

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
        line.yPos += line.speed * (intensifyRef.current ? 2.5 : 1.0) * speedFactorRef.current;
        
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
          const streamAlpha = line.transparency * depthAlpha * (intensifyRef.current ? 2.4 : 1.0);

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
          // Odd indices map to the EVU logo transition scene
          if (sceneIndex % 2 === 1) {
            return getEvuLogoCoordinate(idx, total, clock);
          }
          
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
            case 2:
              return getHypercubeCoordinate(idx, total, clock);
            case 4:
              return getTorusKnotCoordinate(idx, total, clock);
            case 6:
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

        const getAnimatedPosition = (sceneIndex: number, idx: number, total: number, p: ChromaticParticle): Point3D => {
          const basePos = getScenePosition(sceneIndex, idx, total, p);
          
          // If it's an EVU logo scene, keep it perfectly flat, crisp and motionless
          if (sceneIndex % 2 === 1) {
            return basePos;
          }
          
          let lx = basePos.x;
          let ly = basePos.y;
          let lz = basePos.z;
          
          const pulsationWave = Math.sin(clock * 2.5 + p.phase) * 3.5;
          const activeType = basePos.type;
          
          if (activeType === 'head' || activeType === 'eye') {
            const expFactor = 1.0 + Math.sin(clock * 1.5 + p.phase * 0.5) * 0.025;
            lx *= expFactor;
            ly += pulsationWave * 0.3;
            lz *= expFactor;
          } 
          else if (activeType === 'halo_crown') {
            const localAng = p.angle + clock * 0.6;
            lx = basePos.x * 1.1 + Math.sin(clock * 3.2 + localAng * 5) * 4;
            lz = basePos.z * 1.1 + Math.cos(clock * 3.2 + localAng * 5) * 4;
            ly = basePos.y + Math.sin(clock * 3.2 + localAng * 5) * 8;
          } 
          else if (activeType === 'equator_ring') {
            const spinspeed = idx % 2 === 0 ? 0.35 : -0.22;
            const activeAng = p.angle + clock * spinspeed;
            const baseRadius = Math.hypot(basePos.x, basePos.z);
            lx = baseRadius * Math.cos(activeAng);
            lz = baseRadius * Math.sin(activeAng);
            ly = basePos.y;
          } 
          else if (activeType === 'sine_orbital') {
            const runAng = p.angle + clock * 0.15;
            const baseRadius = Math.hypot(basePos.x, basePos.z);
            const waveformAmplitude = 25 + Math.sin(clock * 3.8 + p.angle * 12) * 12;
            const currentRadius = baseRadius + (waveformAmplitude * (baseRadius > 100 ? 1.0 : 0.4));
            const bx = currentRadius * Math.cos(runAng);
            const bz = currentRadius * Math.sin(runAng);
            const by = Math.sin(clock * 2.0 + p.angle * 6) * 15;
            const tiltFactor = 0.70;
            lx = bx * Math.cos(tiltFactor) - by * Math.sin(tiltFactor);
            ly = bx * Math.sin(tiltFactor) + by * Math.cos(tiltFactor);
            lz = bz;
          }
          else if (activeType === 'singularity_core') {
            const orbitalExpansion = 18 + Math.cos(clock * 5.5 + p.phase) * 7.5;
            lx = basePos.x + orbitalExpansion * Math.sin(p.angle) * Math.cos(p.phase);
            ly = basePos.y + orbitalExpansion * Math.sin(p.angle) * Math.sin(p.phase);
            lz = basePos.z + orbitalExpansion * Math.cos(p.angle);
          }
          
          return { x: lx, y: ly, z: lz, type: activeType };
        };

        const posCurrent = getAnimatedPosition(currentSceneRef.current, index, particlesPool.length, pt);
        const posNext = getAnimatedPosition(nextSceneRef.current, index, particlesPool.length, pt);
        
        const lerp = (start: number, end: number, f: number) => start + (end - start) * f;
        const t = transitionProgressRef.current;
        const smoothT = t * t * (3 - 2 * t); // Smoothstep
        
        let lx = lerp(posCurrent.x, posNext.x, smoothT);
        let ly = lerp(posCurrent.y, posNext.y, smoothT);
        let lz = lerp(posCurrent.z, posNext.z, smoothT);
        
        const activeType = t < 0.5 ? posCurrent.type : posNext.type;

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

        // Apply screen flash burst overlay parameters to individual nodes
        if (screenFlashIntensity > 0.01) {
          alpha = Math.min(1.0, alpha + screenFlashIntensity * 0.65);
          pointSize *= (1.0 + screenFlashIntensity * 1.3);
          value = 1.0;
        }

        // Intensify parameters when activated
        if (intensifyRef.current) {
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

        // Seamless beautiful transition to glowing radiant white brand color for the main EVU logo scene
        // We stable-sample a small fraction of the pixels to represent "underlying circuitry glitch holes"
        const isEvuGlitchedNode = evuFactor > 0.05 && (Math.sin(idx * 0.43 + clock * 9.5) > 0.81);

        if (evuFactor > 0.05 && !isEvuGlitchedNode) {
          const tLogo = evuFactor;
          spectrum.r = Math.round(spectrum.r * (1 - tLogo) + 255 * tLogo);
          spectrum.g = Math.round(spectrum.g * (1 - tLogo) + 255 * tLogo);
          spectrum.b = Math.round(spectrum.b * (1 - tLogo) + 255 * tLogo);
          pointSize *= (1.0 + evuFactor * 0.5); // make the strokes bolder and cleaner
        } else if (evuFactor > 0.05 && isEvuGlitchedNode) {
          // Glistening rainbow state! Keep original spectrum or spin color rapidly
          const glitchHue = (hue + clock * 220) % 360;
          const rgbGlitch = hsvToRgb(glitchHue, 1.0, 1.0);
          spectrum.r = rgbGlitch.r;
          spectrum.g = rgbGlitch.g;
          spectrum.b = rgbGlitch.b;
          pointSize *= 1.25;
          alpha = alpha * (0.45 + Math.random() * 0.55); // high frequency electric flickering/shimmering
        }

        // Absolute Chromatic Glitch Aberration Split offset magnitude calculation
        let chromaticShiftX = 0;
        let chromaticShiftY = 0;

        // Coherency check: instead of a pure per-particle independent random roll, we use a stable deterministic sine trigger
        // combined with key speed triggers to prevent high-frequency white noise jumping.
        const speedEnvelope = Math.min(1.0, pointerRef.current.speed * 0.10);
        const localGlitchFactor = hyperGlitchTrigger ? 1.0 : (speedEnvelope * 0.45);
        
        // Coherent glitch trigger active for this specific particle
        const isGlitchActiveForNode = localGlitchFactor > 0.12 && (Math.sin(idx * 0.17 + clock * 22) * 0.5 + 0.5) < localGlitchFactor;

        if (isEvuGlitchedNode) {
          // Circuit glitched nodes undergo massive chromatic displacement
          chromaticShiftX = (Math.sin(clock * 22 + idx) * 11.5) + (pointerRef.current.velocityX * 0.25);
          chromaticShiftY = (Math.cos(clock * 18 + idx) * 3.5) + (pointerRef.current.velocityY * 0.25);
        } else if (isGlitchActiveForNode) {
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
        // For the EVU logo scene, we force all points to render as solid, beautiful square pixels to maximize legibility and boldness!
        const selectTextSymbol = evuFactor > 0.05 
          ? false 
          : ((activeType === 'eye' && idx % 2 === 0) ||
             (activeType === 'halo_crown' && idx % 4 === 0) ||
             (activeType === 'singularity_core') ||
             (cursorDistSq < 110 && Math.sin(clock * 5 + idx) > 0.4) ||
             activeInScanSweep ||
             shockwaveTriggered);

        // --- DRAWING WITH FULL REAL-TIME CHROMATIC ABERRATION CHROMATIC SPLITTING ---
        if (Math.abs(chromaticShiftX) > 0.4 || Math.abs(chromaticShiftY) > 0.4) {
          if (isEvuGlitchedNode) {
            // Draw hollow stroking outlines (showing inner circuit board pathways)
            ctx.strokeStyle = `rgba(${spectrum.r}, 0, 0, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.strokeRect(proj.x - pointSize / 2 - chromaticShiftX, proj.y - pointSize / 2 - chromaticShiftY, pointSize, pointSize);

            ctx.strokeStyle = `rgba(0, ${spectrum.g}, ${spectrum.b}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.strokeRect(proj.x - pointSize / 2 + chromaticShiftX, proj.y - pointSize / 2 + chromaticShiftY, pointSize, pointSize);
          } else {
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
        'HOLOMETRIC ENTERPRISE INTEGRATION: EVU_SYMBOLIC_CORE // CC-EVU',
        'HOLOMETRIC SCENE PROJECTION: HYPERDIMENSIONAL_TESSERACT // CC-10',
        'HOLOMETRIC ENTERPRISE INTEGRATION: EVU_SYMBOLIC_CORE // CC-EVU',
        'HOLOMETRIC SCENE PROJECTION: CELESTIAL_TORUS_KNOT // CC-11',
        'HOLOMETRIC ENTERPRISE INTEGRATION: EVU_SYMBOLIC_CORE // CC-EVU',
        'HOLOMETRIC SCENE PROJECTION: QUANTUM_MATRIX_GLOBE // CC-12',
        'HOLOMETRIC ENTERPRISE INTEGRATION: EVU_SYMBOLIC_CORE // CC-EVU'
      ];
      const activeName = sceneNames[currentSceneRef.current];
      ctx.fillText(activeName, paddingEdge + 25, paddingEdge + 10);

      // COMPOSITING ENERGETIC CHROMATIC ATMO-FLASH (Full screen camera strobe)
      if (screenFlashIntensity > 0.015) {
        const strobeTints = [
          'rgba(255, 255, 255, ',  // White blinding lightning
          'rgba(168, 85, 247, ',  // Neon purple surge
          'rgba(34, 211, 238, ',  // Cyber cyan discharge
          'rgba(244, 63, 94, '    // Crimson shockflash
        ];
        const selectedStrobe = strobeTints[Math.floor(clock * 14) % strobeTints.length];
        
        ctx.fillStyle = selectedStrobe + `${screenFlashIntensity * 0.38})`;
        ctx.fillRect(0, 0, width, height);

        // Drawing dynamic glitch scanlines on top of the flash
        ctx.fillStyle = `rgba(255, 255, 255, ${screenFlashIntensity * 0.28})`;
        for (let s = 0; s < 4; s++) {
          const sliceH = 4 + Math.random() * 20;
          const sliceY = Math.random() * height;
          ctx.fillRect(0, sliceY, width, sliceH);
        }
      }

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
  }, [systemOnline]);

  return (
    <div
      id="martian-matrix-hologram-wrapper"
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0 bg-gradient-to-tr from-[#1d1645] via-[#110d29] to-[#14285c] cursor-crosshair select-none"
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



      {/* Enhanced vibrant colorful neon ambient glows to support active matrix styling */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/22 filter blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-indigo-500/24 filter blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '11s' }} />
      <div className="absolute top-[25%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/20 filter blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '14s' }} />
      <div className="absolute top-[35%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-emerald-500/18 filter blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute bottom-[-15%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-rose-500/20 filter blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '12s' }} />
    </div>
  );
}
