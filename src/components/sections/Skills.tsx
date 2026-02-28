import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import TerminalWindow from '../ui/TerminalWindow';
import { getTechIcon, isDarkIcon } from '../../lib/techIcons';
import { cn } from '../../lib/utils';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <div>
      <TerminalWindow title="ls -la ~/skills/">
        {/* Category tabs as directory listing */}
        <div className="font-mono text-sm mb-6">
          <div className="text-neutral-500 mb-2">drwxr-xr-x  4 decatalyst vylth  4096 Feb 27 00:00 .</div>
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'neu-pill',
                  activeCategory === cat.id && 'active'
                )}
              >
                <span className="text-purple-400">d</span> {cat.label.toLowerCase()}/
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
            <div className="text-neutral-500 text-xs mb-3">
              total {current.skills.length} items
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {current.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="neu-badge neu-badge-3d text-xs justify-center py-2.5 px-3 gap-1.5"
                >
                  {getTechIcon(skill.name) && (
                    <img src={getTechIcon(skill.name)!} alt="" className={`w-4 h-4 ${isDarkIcon(skill.name) ? 'invert brightness-200' : ''}`} loading="lazy" />
                  )}
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Language breakdown */}
        <div className="mt-8 pt-6 border-t border-white/[0.04]">
          <div className="text-neutral-500 font-mono text-xs mb-4">
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
                className="neu-tile p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getTechIcon(item.lang) && (
                    <img src={getTechIcon(item.lang)!} alt="" className={`w-5 h-5 ${isDarkIcon(item.lang) ? 'invert brightness-200' : ''}`} loading="lazy" />
                  )}
                  <p className="font-mono font-bold text-white text-base">{item.lang}</p>
                </div>
                <p className="text-neutral-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
