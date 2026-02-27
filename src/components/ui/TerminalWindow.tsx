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
      className={`relative rounded-xl overflow-hidden border border-white/[0.06] bg-neu-card/80 backdrop-blur-sm shadow-[6px_6px_12px_rgba(0,0,0,0.7),-6px_-6px_12px_rgba(40,40,40,0.15)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.7),-6px_-6px_12px_rgba(40,40,40,0.15),0_0_30px_rgba(0,47,167,0.08)] transition-shadow duration-300 ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04] bg-neu-base/50">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-neutral-500 font-mono truncate">{title}</span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
}
