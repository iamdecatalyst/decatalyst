import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from '../ui/TerminalWindow';

const terminalLines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'divider', text: '─'.repeat(40) },
  { type: 'text', text: 'Isaac Wisdom (De Catalyst / Wisyle)' },
  { type: 'text', text: 'CEO & Solo Founder, VYLTH Strategies' },
  { type: 'text', text: '' },
  { type: 'text', text: 'Previously: TAR Global Strategies' },
  { type: 'text', text: 'Building institutional-grade fintech' },
  { type: 'text', text: 'infrastructure from backend to blockchain.' },
  { type: 'text', text: '' },
  { type: 'text', text: 'Designing automation pipelines, backend' },
  { type: 'text', text: 'infrastructures, and distributed systems' },
  { type: 'text', text: 'that don\'t break under pressure.' },
  { type: 'text', text: '' },
  { type: 'text', text: '16+ interconnected systems. One founder.' },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="font-mono text-3xl font-bold text-white">
      {count}{suffix}
    </div>
  );
}

const stats = [
  { value: 16, suffix: '+', label: 'Systems Built' },
  { value: 12, suffix: '+', label: 'Blockchain Networks' },
  { value: 6, suffix: '', label: 'Trading Algorithms' },
  { value: 1, suffix: '', label: 'Founder' },
];

export default function About() {
  const [visibleLines, setVisibleLines] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= terminalLines.length) return;
    const timer = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 300 : 60
    );
    return () => clearTimeout(timer);
  }, [started, visibleLines]);

  return (
    <div ref={sectionRef} className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Terminal card */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <TerminalWindow title="cat ~/about.md">
          <div className="font-mono text-sm leading-relaxed min-h-[320px]">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="mb-0.5">
                {line.type === 'prompt' ? (
                  <span>
                    <span className="text-green-400">$</span>{' '}
                    <span className="text-white">{line.text.slice(2)}</span>
                  </span>
                ) : line.type === 'divider' ? (
                  <span className="text-neutral-600">{line.text}</span>
                ) : (
                  <span className="text-neutral-300">{line.text}</span>
                )}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className="animate-blink text-white/80">_</span>
            )}
          </div>
        </TerminalWindow>
      </motion.div>

      {/* Stats grid */}
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
            About
          </h2>
          <p className="text-neutral-400 text-sm">
            Building an empire, one system at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="neu-tile p-5"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
