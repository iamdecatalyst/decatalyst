import { motion } from 'framer-motion';
import { RotatingTypewriter } from '../ui/Typewriter';
import TerminalWindow from '../ui/TerminalWindow';
import { ChevronDown } from 'lucide-react';

const ISAAC_ART = [
  '╦ ╔═╗ ╔═╗ ╔═╗ ╔═╗',
  '║ ╚═╗ ╠═╣ ╠═╣ ║  ',
  '╩ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝',
];

const DIVIDER = '· E ·';

const WISDOM_ART = [
  '╦ ╦ ╦ ╔═╗ ╔╦╗ ╔═╗ ╔╦╗',
  '║║║ ║ ╚═╗  ║║ ║ ║ ║║║',
  '╚╩╝ ╩ ╚═╝ ═╩╝ ╚═╝ ╩ ╩',
];

const ALL_LINES = [...ISAAC_ART, DIVIDER, ...WISDOM_ART];

const lineDelay = (i: number) => 0.6 + i * 0.12;

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
});

const phrases = [
  'Ad astra per aspera',
  'Through hardship to the stars',
  'The empire rises',
  'My hypothesis is death ain\'t shit',
  'Refactoring chaos into clean logic',
];

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <TerminalWindow title="isaac@vylth:~$" className="max-w-2xl w-full">
        <div className="text-center">
          {/* Command prompt */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-mono text-xs text-neutral-600 mb-6 text-left"
          >
            $ cat /etc/motd
          </motion.p>

          {/* ASCII Art Banner */}
          <div className="inline-block text-left mb-6">
            {ALL_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: lineDelay(i),
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  line === DIVIDER
                    ? 'font-mono text-sm sm:text-base text-neutral-500 text-center my-1 tracking-[0.5em]'
                    : 'font-mono text-[0.55rem] leading-[1.1] sm:text-xs sm:leading-[1.2] md:text-sm md:leading-[1.3] text-white whitespace-pre'
                }
                style={
                  line !== DIVIDER
                    ? { textShadow: '0 0 20px rgba(255,255,255,0.08)' }
                    : undefined
                }
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn(lineDelay(ALL_LINES.length) + 0.2)}
            initial="hidden"
            animate="visible"
            className="font-serif italic text-lg sm:text-xl text-neutral-400 mb-4"
          >
            De Catalyst
          </motion.p>

          <motion.div
            variants={fadeIn(lineDelay(ALL_LINES.length) + 0.5)}
            initial="hidden"
            animate="visible"
            className="space-y-1 mb-8"
          >
            <p className="font-mono text-xs sm:text-sm tracking-wider text-neutral-500 uppercase">
              CEO & Solo Founder, VYLTH Strategies
            </p>
            <p className="font-sans text-sm text-neutral-500">
              DevOps / Backend / Software Engineer
            </p>
          </motion.div>

          {/* Rotating prompt */}
          <motion.div
            variants={fadeIn(lineDelay(ALL_LINES.length) + 0.8)}
            initial="hidden"
            animate="visible"
          >
            <div className="font-mono text-sm text-neutral-500">
              <span className="text-white/60">$</span>{' '}
              <RotatingTypewriter phrases={phrases} />
            </div>
          </motion.div>
        </div>
      </TerminalWindow>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: lineDelay(ALL_LINES.length) + 1.5 }}
        className="mt-12"
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
