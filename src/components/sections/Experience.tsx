import { motion } from 'framer-motion';
import { experience } from '../../data/experience';


export default function Experience() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mb-12">
        <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
          Timeline
        </h2>
        <p className="text-neutral-500 text-sm">
          The journey so far.
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-neu-border" />

        {experience.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`relative mb-12 lg:mb-16 ${
              i % 2 === 0
                ? 'lg:pr-[calc(50%+2rem)] pl-12 lg:pl-0'
                : 'lg:pl-[calc(50%+2rem)] pl-12'
            }`}
          >
            {/* Dot on timeline */}
            <div
              className={`absolute left-4 lg:left-1/2 top-1 w-3 h-3 rounded-full -translate-x-1/2 ${
                entry.current
                  ? 'bg-klein shadow-[0_0_12px_rgba(0,47,167,0.6)] animate-glow-pulse'
                  : 'bg-neutral-600'
              }`}
            />

            <div className="neu-card-flat neu-card-3d p-6">
              <span className="font-mono text-copper text-sm font-medium">
                {entry.year}
              </span>
              <h3 className="font-mono font-bold text-white text-lg mt-1">
                {entry.title}
              </h3>
              <p className="font-sans text-neutral-400 text-sm mt-0.5 mb-3">
                {entry.company}
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {entry.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
