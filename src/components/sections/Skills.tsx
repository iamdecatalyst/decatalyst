import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import TerminalWindow from '../ui/TerminalWindow';
import { cn } from '../../lib/utils';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <div>
      <TerminalWindow title="ls -la ~/skills/">
        {/* Category tabs as directory listing */}
        <div className="font-mono text-sm mb-6">
          <div className="text-neutral-600 mb-2">drwxr-xr-x  4 isaac vylth  4096 Feb 27 00:00 .</div>
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-3 py-1 rounded font-mono text-xs transition-all duration-200',
                  activeCategory === cat.id
                    ? 'text-green-400 bg-white/[0.06]'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03]'
                )}
              >
                <span className="text-copper">d</span> {cat.label.toLowerCase()}/
              </button>
            ))}
          </div>
        </div>

        {/* Skills as file listing */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-sm"
          >
            <div className="text-neutral-600 text-xs mb-3">
              total {current.skills.length} items
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {current.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="px-3 py-2 rounded bg-white/[0.03] border border-white/[0.04] text-neutral-400 hover:text-white hover:border-white/[0.08] transition-all duration-200 text-xs"
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Language breakdown */}
        <div className="mt-8 pt-6 border-t border-white/[0.04]">
          <div className="text-neutral-600 font-mono text-xs mb-4">
            <span className="text-green-400">$</span> cat primary_languages.conf
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { lang: 'Go', desc: 'Primary backend, APIs, microservices' },
              { lang: 'Python', desc: 'Trading engines, data services, ML' },
              { lang: 'Rust', desc: 'Cryptography, HD wallets, signing' },
            ].map((item) => (
              <div
                key={item.lang}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                <p className="font-mono font-bold text-copper text-base mb-1">{item.lang}</p>
                <p className="text-neutral-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
