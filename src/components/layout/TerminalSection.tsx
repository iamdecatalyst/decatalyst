import { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TerminalSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalSection({ id, children, className = '' }: TerminalSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id={id} className="min-h-screen flex items-center py-24 lg:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-7xl mx-auto px-6 w-full ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
