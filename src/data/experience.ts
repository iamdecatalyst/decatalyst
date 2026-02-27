export interface ExperienceEntry {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'vylth',
    year: '2024 - Present',
    title: 'CEO & Solo Founder',
    company: 'VYLTH Strategies',
    description: 'Rebranded from TAR Global. Building institutional-grade fintech infrastructure solo. 16+ interconnected systems spanning payments, trading, AI, security, and analytics. Managing everything from architecture to deployment.',
    current: true,
  },
  {
    id: 'targlobal',
    year: '2023 - 2024',
    title: 'Founder & Lead Engineer',
    company: 'TAR Global Strategies',
    description: 'Built the original investment platform and trading algorithms. Launched TarPay crypto payment rail. Designed the Medusa trading framework with 6 autonomous strategies.',
  },
  {
    id: 'early',
    year: '2021 - 2023',
    title: 'Software Engineer',
    company: 'Independent',
    description: 'Started the journey. Built early projects, learned backend architecture, developed automation tools. Laid the groundwork for what would become an entire ecosystem.',
  },
];
