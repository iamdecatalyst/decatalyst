import { motion } from 'framer-motion';
import { RotatingTypewriter } from '../ui/Typewriter';
import TerminalWindow from '../ui/TerminalWindow';
import { ChevronDown, Github } from 'lucide-react';

const NAME_ART = [
  '╦ ╔═╗ ╔═╗ ╔═╗ ╔═╗       ╦ ╦ ╦ ╔═╗ ╔╦╗ ╔═╗ ╔╦╗',
  '║ ╚═╗ ╠═╣ ╠═╣ ║    · E · ║║║ ║ ╚═╗  ║║ ║ ║ ║║║',
  '╩ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝       ╚╩╝ ╩ ╚═╝ ═╩╝ ╚═╝ ╩ ╩',
];

const lineDelay = (i: number) => 0.6 + i * 0.15;

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
      <TerminalWindow title="decatalyst@vylth:~$" className="max-w-3xl w-full">
        <div className="text-center">
          {/* Command prompt */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-mono text-xs text-neutral-500 mb-6 text-left"
          >
            <span className="text-green-400">$</span> cat /etc/motd
          </motion.p>

          {/* ASCII Art Banner — single line */}
          <div className="inline-block text-left mb-6">
            {NAME_ART.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: lineDelay(i),
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-mono text-[0.45rem] leading-[1.15] sm:text-[0.65rem] md:text-xs lg:text-sm lg:leading-[1.3] text-white whitespace-pre"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn(lineDelay(NAME_ART.length) + 0.2)}
            initial="hidden"
            animate="visible"
            className="font-serif italic text-lg sm:text-xl text-neutral-300 mb-4"
          >
            De Catalyst
          </motion.p>

          <motion.div
            variants={fadeIn(lineDelay(NAME_ART.length) + 0.5)}
            initial="hidden"
            animate="visible"
            className="space-y-1 mb-8"
          >
            <p className="font-mono text-xs sm:text-sm tracking-wider text-neutral-400 uppercase">
              CEO & Solo Founder, VYLTH Strategies
            </p>
            <p className="font-sans text-sm text-neutral-400">
              DevOps / Backend / Software Engineer
            </p>
          </motion.div>

          {/* GitHub link */}
          <motion.div
            variants={fadeIn(lineDelay(NAME_ART.length) + 0.8)}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <a
              href="https://github.com/Wisyle"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-badge inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Github size={16} />
              <span className="font-mono">@Wisyle</span>
            </a>
          </motion.div>

          {/* Rotating prompt */}
          <motion.div
            variants={fadeIn(lineDelay(NAME_ART.length) + 1.1)}
            initial="hidden"
            animate="visible"
          >
            <div className="font-mono text-sm text-neutral-400">
              <span className="text-green-400">$</span>{' '}
              <RotatingTypewriter phrases={phrases} />
            </div>
          </motion.div>
        </div>
      </TerminalWindow>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: lineDelay(NAME_ART.length) + 1.5 }}
        className="mt-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-neutral-500 mx-auto" size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}
