import { type ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

export default function Card3D({ children, className = '' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 400, damping: 25 });
  const scale = useSpring(1, { stiffness: 400, damping: 25 });

  function handleMouseMove(e: React.MouseEvent) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    scale.set(1.01);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? {} : { rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
