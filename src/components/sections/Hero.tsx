import { motion } from 'framer-motion';
import TypeWriter from '../ui/TypeWriter';
import { ChevronDown } from 'lucide-react';

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.8 + i * 0.04,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
});

function AnimatedText({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  return (
    <span className="inline-flex overflow-hidden" style={{ perspective: '400px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <div className="text-center">
      <h1 className="font-mono font-bold tracking-[0.2em] uppercase mb-2">
        <span className="block text-5xl sm:text-6xl lg:text-8xl text-white">
          <AnimatedText text="ISAAC" />
          <span className="inline-block w-4" />
          <AnimatedText text="WISDOM" startIndex={6} />
        </span>
      </h1>

      <motion.p
        variants={fadeIn(1.6)}
        initial="hidden"
        animate="visible"
        className="font-serif italic text-lg sm:text-xl lg:text-2xl text-neutral-400 mb-6"
      >
        De Catalyst
      </motion.p>

      <motion.div
        variants={fadeIn(2.0)}
        initial="hidden"
        animate="visible"
        className="space-y-2 mb-10"
      >
        <p className="font-mono text-xs sm:text-sm tracking-wider text-neutral-500 uppercase">
          CEO & Solo Founder, VYLTH Strategies
        </p>
        <p className="font-sans text-sm text-neutral-500">
          DevOps / Backend / Software Engineer
        </p>
      </motion.div>

      <motion.div variants={fadeIn(2.5)} initial="hidden" animate="visible">
        <TypeWriter />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="mt-16"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-neutral-600 mx-auto" size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}
