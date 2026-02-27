export interface SpaceSection {
  id: string;
  label: string;
  zDepth: number;
  accent: string;
  theme: string;
}

export const SECTIONS: SpaceSection[] = [
  { id: 'hero',          label: 'Origin',         zDepth: 0,    accent: '#002FA7', theme: 'launch' },
  { id: 'about',         label: 'Home World',     zDepth: -100, accent: '#4ADE80', theme: 'homeworld' },
  { id: 'skills',        label: 'The Forge',      zDepth: -200, accent: '#cd7f32', theme: 'forge' },
  { id: 'projects',      label: 'The System',     zDepth: -300, accent: '#002FA7', theme: 'system' },
  { id: 'experience',    label: 'Timeline Nebula', zDepth: -400, accent: '#8B5CF6', theme: 'nebula' },
  { id: 'transmissions', label: 'Signal Tower',   zDepth: -500, accent: '#F59E0B', theme: 'signal' },
  { id: 'contact',       label: 'Destination',    zDepth: -600, accent: '#e11d48', theme: 'destination' },
];

export const SECTION_COUNT = SECTIONS.length;
export const Z_SPACING = 100;

// Each section occupies 150vh of scroll height
export const SCROLL_HEIGHT_VH = 150;

// Warp zone is first/last 17% of each section's scroll range
export const WARP_ZONE = 0.17;

// Camera settings
export const CAMERA_FOV = 60;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 1000;
export const CAMERA_START_Z = 20;
