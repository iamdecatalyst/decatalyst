import { motion } from 'framer-motion';
import { experience } from '../../data/experience';
import TerminalWindow from '../ui/TerminalWindow';

export default function Experience() {
  return (
    <div>
      <TerminalWindow title="git log --oneline">
        <div className="font-mono text-sm">
          {/* Git log header */}
          <div className="text-neutral-500 text-xs mb-4">
            <span className="text-green-400">$</span> git log --oneline --graph career
          </div>

          <div className="space-y-6">
            {experience.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-4"
              >
                {/* Git graph */}
                <div className="flex flex-col items-center flex-shrink-0 pt-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      entry.current
                        ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                        : 'bg-neutral-500'
                    }`}
                  />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-neutral-800 mt-2" />
                  )}
                </div>

                {/* Commit info */}
                <div className="pb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white/80 text-xs">{entry.current ? 'HEAD ->' : `~${i}`}</span>
                    <span className="text-neutral-400 text-xs font-mono">
                      {entry.year}
                    </span>
                  </div>
                  <h3 className="font-mono font-bold text-white text-base">
                    {entry.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-0.5">
                    {entry.company}
                  </p>
                  <p className="text-neutral-400 text-sm leading-relaxed mt-2">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
