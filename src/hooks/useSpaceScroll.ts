import { useEffect, useCallback, useSyncExternalStore } from 'react';
import { SECTION_COUNT } from '../lib/spaceConfig';

// Module-level state — avoids React re-renders in the Three.js render loop
export const spaceState = {
  scrollProgress: 0,      // 0-1 across entire page
  currentSection: 0,      // index of current/nearest section
  sectionProgress: 0,     // 0-1 within current section
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

  const rawSection = scrollProgress * (SECTION_COUNT - 1);
  spaceState.currentSection = Math.min(Math.round(rawSection), SECTION_COUNT - 1);
  spaceState.sectionProgress = rawSection - Math.floor(rawSection);

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
