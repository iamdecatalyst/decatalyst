import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import SectionWrapper from '../layout/SectionWrapper';
import { cn } from '../../lib/utils';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <SectionWrapper id="skills">
      <div className="mb-12">
        <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
          Systems & Tools
        </h2>
        <p className="text-neutral-500 text-sm">
          The instruments of construction.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn('neu-nav-item', activeCategory === cat.id && 'active')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {current.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="neu-badge justify-center py-3 px-4 text-sm cursor-default hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Language breakdown */}
      <div className="mt-12 grid sm:grid-cols-3 gap-4">
        {[
          { lang: 'Go', desc: 'Primary backend, APIs, microservices' },
          { lang: 'Python', desc: 'Trading engines, data services, ML' },
          { lang: 'Rust', desc: 'Cryptography, HD wallets, signing' },
        ].map((item, i) => (
          <motion.div
            key={item.lang}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="neu-card-flat p-5"
          >
            <p className="font-mono font-bold text-copper text-lg mb-1">{item.lang}</p>
            <p className="text-neutral-500 text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
