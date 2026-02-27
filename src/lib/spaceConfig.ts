export interface Section {
  id: string;
  label: string;
  accent: string;
}

export const SECTIONS: Section[] = [
  { id: 'hero',          label: 'Home',           accent: '#002FA7' },
  { id: 'about',         label: 'About',          accent: '#4ADE80' },
  { id: 'skills',        label: 'Skills',         accent: '#cd7f32' },
  { id: 'projects',      label: 'Projects',       accent: '#002FA7' },
  { id: 'experience',    label: 'Experience',      accent: '#8B5CF6' },
  { id: 'transmissions', label: 'Transmissions',  accent: '#F59E0B' },
  { id: 'contact',       label: 'Contact',        accent: '#e11d48' },
];

export const SECTION_COUNT = SECTIONS.length;
