import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useSectionInView } from '../../hooks/useSectionInView';
import { cn } from '../../lib/utils';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const { ref, isInView } = useSectionInView(0.15);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={sectionVariants}
      className={cn('max-w-7xl mx-auto px-6 py-24 lg:py-32', className)}
    >
      {children}
    </motion.section>
  );
}
