import { motion } from 'framer-motion';
import TerminalWindow from '../ui/TerminalWindow';

const transmissions = [
  {
    id: '1',
    date: '2026-02-27',
    title: 'On Building Alone',
    excerpt: 'The solo founder path isn\'t about working alone. It\'s about owning every decision, every failure, every system. 16 projects deep, and the architecture only gets cleaner.',
    level: 'INFO',
  },
  {
    id: '2',
    date: '2025-08-14',
    title: 'The RPG Stack',
    excerpt: 'Why Rust, Python, and Go? Each language chosen for its strength. Rust for cryptography that can\'t afford mistakes. Python for rapid iteration. Go for concurrent services that just work.',
    level: 'LOG',
  },
  {
    id: '3',
    date: '2025-03-21',
    title: 'Architecture as Philosophy',
    excerpt: 'API never touches the database. Every read goes through the Data Service. Every mutation through the Gateway. Clean separation isn\'t just pattern — it\'s discipline.',
    level: 'LOG',
  },
];

export default function Blog() {
  return (
    <div>
      <TerminalWindow title="tail -f ~/transmissions.log">
        <div className="font-mono text-sm">
          <div className="text-neutral-500 text-xs mb-4">
            <span className="text-white/80">$</span> tail -f transmissions.log
          </div>

          <div className="space-y-6">
            {transmissions.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-neutral-500 text-xs">[{post.date}]</span>
                  <span className={`text-xs ${post.level === 'INFO' ? 'text-white/80' : 'text-neutral-400'}`}>
                    {post.level}
                  </span>
                </div>
                <h3 className="font-mono font-bold text-white text-base mb-2 group-hover:text-neutral-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed pl-4 border-l border-neutral-700">
                  {post.excerpt}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-white/30 animate-blink">_</div>
        </div>
      </TerminalWindow>
    </div>
  );
}
