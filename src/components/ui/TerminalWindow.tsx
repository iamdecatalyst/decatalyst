import { type ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 400, damping: 25 });

  function handleMouseMove(e: React.MouseEvent) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`neu-terminal ${className}`}
    >
      {/* Title bar */}
      <div className="neu-terminal-titlebar">
        <div className="neu-terminal-dot neu-terminal-dot--close" />
        <div className="neu-terminal-dot neu-terminal-dot--minimize" />
        <div className="neu-terminal-dot neu-terminal-dot--maximize" />
        <span className="ml-3 text-xs text-neutral-500 font-mono truncate">{title}</span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
}
