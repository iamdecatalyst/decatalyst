import { type ReactNode } from 'react';
import { useSpaceScroll } from '../../hooks/useSpaceScroll';
import { SECTIONS } from '../../lib/spaceConfig';

interface PlanetSectionProps {
  planetIndex: number;
  id: string;
  children: ReactNode;
  className?: string;
}

export default function PlanetSection({ planetIndex, id, children, className = '' }: PlanetSectionProps) {
  const state = useSpaceScroll();

  // Calculate opacity and interactivity for this section
  const section = SECTIONS[planetIndex];
  const totalSections = SECTIONS.length;
  const rawSection = state.scrollProgress * (totalSections - 1);
  const distance = Math.abs(rawSection - planetIndex);

  // Content visible when we're within ~0.5 sections of this planet
  const isActive = distance < 0.6;
  const opacity = isActive ? Math.max(0, 1 - distance * 2) * state.landedOpacity : 0;
  const isInteractive = isActive && !state.isWarping;

  return (
    <section
      id={id}
      style={{ minHeight: '150vh' }}
      data-planet={section.theme}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{
          opacity,
          perspective: '1200px',
          pointerEvents: isInteractive ? 'auto' : 'none',
          transition: 'opacity 0.15s ease-out',
        }}
      >
        <div className={`max-w-7xl mx-auto px-6 w-full ${className}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
