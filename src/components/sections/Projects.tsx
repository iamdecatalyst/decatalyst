import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../../data/projects';
import Card3D from '../ui/Card3D';
import TechBadge from '../ui/TechBadge';
import { cn } from '../../lib/utils';
import { ExternalLink, Github, X } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'platform', label: 'Platform' },
  { id: 'trading', label: 'Trading' },
  { id: 'payments', label: 'Payments' },
  { id: 'ai', label: 'AI' },
  { id: 'security', label: 'Security' },
  { id: 'devops', label: 'DevOps' },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <Card3D>
      <motion.div
        layout
        layoutId={project.id}
        onClick={onClick}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="neu-terminal cursor-pointer group h-full"
      >
        {/* Terminal title bar */}
        <div className="neu-terminal-titlebar">
          <div className="neu-terminal-dot neu-terminal-dot--close" />
          <div className="neu-terminal-dot neu-terminal-dot--minimize" />
          <div className="neu-terminal-dot neu-terminal-dot--maximize" />
          <span className="ml-3 text-xs text-neutral-500 font-mono truncate">
            ~/{(project.codename || project.name).toLowerCase()}
          </span>
          <div
            className={cn(
              'neu-status-dot ml-auto',
              project.status === 'live' && 'online',
              project.status === 'building' && 'building'
            )}
          />
        </div>

        {/* Card content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            {project.logo && (
              <img src={project.logo} alt={project.name} className="w-8 h-8 rounded object-contain" />
            )}
            <h3 className="font-mono font-bold text-lg tracking-wider uppercase text-white">
              {project.codename || project.name}
            </h3>
          </div>
          <p className="text-neutral-300 text-sm mb-4 line-clamp-2">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 4).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
            {project.stack.length > 4 && (
              <span className="neu-badge text-xs">+{project.stack.length - 4}</span>
            )}
          </div>
          <div className="font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
            <span className="text-green-400">$</span> click to explore <span className="animate-pulse">_</span>
          </div>
        </div>
      </motion.div>
    </Card3D>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={project.id}
        onClick={(e) => e.stopPropagation()}
        className="neu-card p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {project.logo && (
              <img src={project.logo} alt={project.name} className="w-12 h-12 rounded-lg object-contain" />
            )}
            <div>
            <h3 className="font-mono font-bold text-2xl tracking-wider uppercase text-white">
              {project.name}
            </h3>
            {project.codename && project.codename !== project.name && (
              <p className="font-mono text-sm text-neutral-400 mt-1">
                Codename: {project.codename}
              </p>
            )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-neutral-300 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
            Highlights
          </p>
          <div className="space-y-2">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="text-neutral-300 text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-badge hover:text-white transition-colors gap-1.5"
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-badge hover:text-white transition-colors gap-1.5"
            >
              <Github size={12} /> Source
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-sm text-neutral-500 mb-4">
          <span className="text-green-400">$</span> tree ~/projects/
        </div>
        <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
          The Ecosystem
        </h2>
        <p className="text-neutral-400 text-sm">
          16+ interconnected systems. Click to explore.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              'neu-pill',
              filter === cat.id && 'active'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div layout className="grid md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail overlay */}
      <AnimatePresence>
        {selected && (
          <ProjectDetail
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
