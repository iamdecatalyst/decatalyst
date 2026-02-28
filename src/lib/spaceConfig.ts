export interface Section {
  id: string;
  label: string;
}

export const SECTIONS: Section[] = [
  { id: 'hero',          label: 'Home' },
  { id: 'about',         label: 'About' },
  { id: 'skills',        label: 'Skills' },
  { id: 'projects',      label: 'Projects' },
  { id: 'experience',    label: 'Experience' },
  { id: 'transmissions', label: 'Transmissions' },
  { id: 'contact',       label: 'Contact' },
];

export const SECTION_COUNT = SECTIONS.length;
