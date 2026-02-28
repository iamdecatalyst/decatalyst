import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TerminalSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalSection({ id, children, className = '' }: TerminalSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Scroll-based zoom: scale up as section enters, scale down as it leaves
  // 0 = section bottom is at viewport bottom (entering)
  // 0.5 = section is centered in viewport
  // 1 = section top is at viewport top (leaving)
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.92, 1, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);

  return (
    <section id={id} ref={ref} className="min-h-screen flex items-center py-24 lg:py-32">
      <motion.div
        style={{ scale, opacity }}
        className={`max-w-7xl mx-auto px-6 w-full ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
