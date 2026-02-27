import { useEffect, useCallback, useSyncExternalStore } from 'react';
import { SECTIONS, SECTION_COUNT, WARP_ZONE, CAMERA_START_Z } from '../lib/spaceConfig';

// Module-level state — avoids React re-renders in the Three.js render loop
export const spaceState = {
  scrollProgress: 0,      // 0-1 across entire page
  currentSection: 0,      // index of current/nearest section
  sectionProgress: 0,     // 0-1 within current section
  isWarping: false,        // true during warp zones
  warpIntensity: 0,        // 0-1, how deep in warp
  cameraZ: CAMERA_START_Z, // current camera Z target
  landedOpacity: 1,        // content opacity (0 during warp, 1 when landed)
  mouseX: 0,
  mouseY: 0,
};

// Snapshot counter to trigger React re-renders when needed
let snapshotVersion = 0;
const listeners = new Set<() => void>();

function notifyListeners() {
  snapshotVersion++;
  listeners.forEach((l) => l());
}

function computeState() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;

  const scrollProgress = Math.min(1, Math.max(0, scrollTop / docHeight));
  spaceState.scrollProgress = scrollProgress;

  // Map scroll to section index and local progress
  const totalSections = SECTION_COUNT;
  const rawSection = scrollProgress * (totalSections - 1);
  const currentSection = Math.round(rawSection);
  const sectionProgress = rawSection - Math.floor(rawSection);

  spaceState.currentSection = Math.min(currentSection, totalSections - 1);
  spaceState.sectionProgress = sectionProgress;

  // Determine warp state
  // Warping happens when transitioning between sections
  const fractional = rawSection - Math.floor(rawSection);
  const isInDepartureZone = fractional > (1 - WARP_ZONE) && currentSection < totalSections - 1;
  const isInArrivalZone = fractional < WARP_ZONE && fractional > 0;
  const isWarping = isInDepartureZone || isInArrivalZone;

  spaceState.isWarping = isWarping;

  if (isInDepartureZone) {
    spaceState.warpIntensity = (fractional - (1 - WARP_ZONE)) / WARP_ZONE;
  } else if (isInArrivalZone) {
    spaceState.warpIntensity = 1 - fractional / WARP_ZONE;
  } else {
    spaceState.warpIntensity = 0;
  }

  // Camera Z interpolation
  const sectionA = Math.floor(rawSection);
  const sectionB = Math.min(sectionA + 1, totalSections - 1);
  const zA = SECTIONS[sectionA].zDepth;
  const zB = SECTIONS[sectionB].zDepth;
  const t = rawSection - sectionA;
  // Smooth interpolation
  const smoothT = t * t * (3 - 2 * t);
  spaceState.cameraZ = CAMERA_START_Z + (zA + (zB - zA) * smoothT);

  // Content opacity: fully visible when not warping, fades during warp
  spaceState.landedOpacity = 1 - spaceState.warpIntensity;

  notifyListeners();
}

function handleMouse(e: MouseEvent) {
  spaceState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  spaceState.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

// Singleton event setup
let initialized = false;
function ensureListeners() {
  if (initialized) return;
  initialized = true;
  window.addEventListener('scroll', computeState, { passive: true });
  window.addEventListener('mousemove', handleMouse, { passive: true });
  window.addEventListener('resize', computeState, { passive: true });
  computeState();
}

// React hook for components that need to re-render on scroll
export function useSpaceScroll() {
  useEffect(() => {
    ensureListeners();
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    listeners.add(callback);
    return () => { listeners.delete(callback); };
  }, []);

  const getSnapshot = useCallback(() => snapshotVersion, []);

  useSyncExternalStore(subscribe, getSnapshot);

  return spaceState;
}

// For Three.js components that read spaceState directly in useFrame
export function initSpaceScroll() {
  ensureListeners();
}
