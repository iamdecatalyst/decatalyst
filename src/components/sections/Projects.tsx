import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../../data/projects';

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
    <motion.div
      layout
      layoutId={project.id}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="neu-card neu-card-3d p-6 cursor-pointer group"
    >
      <div
        className="h-1 w-12 rounded-full mb-4"
        style={{ background: project.accent }}
      />
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-mono font-bold text-lg tracking-wider uppercase text-white">
          {project.codename || project.name}
        </h3>
        <div
          className={cn(
            'neu-status-dot',
            project.status === 'live' && 'online',
            project.status === 'building' && 'building'
          )}
        />
      </div>
      <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
        {project.tagline}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="neu-badge text-xs">
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="neu-badge text-xs">+{project.stack.length - 4}</span>
        )}
      </div>
    </motion.div>
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
          <div>
            <div
              className="h-1 w-16 rounded-full mb-4"
              style={{ background: project.accent }}
            />
            <h3 className="font-mono font-bold text-2xl tracking-wider uppercase text-white">
              {project.name}
            </h3>
            {project.codename && project.codename !== project.name && (
              <p className="font-mono text-sm text-neutral-500 mt-1">
                Codename: {project.codename}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-neutral-300 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
            Highlights
          </p>
          <div className="space-y-2">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
                <span className="text-neutral-400 text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="neu-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
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
    <div className="py-24 lg:py-32">
      <div className="mb-12">
        <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
          The Ecosystem
        </h2>
        <p className="text-neutral-500 text-sm">
          16+ interconnected systems. Click to explore.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn('neu-nav-item', filter === cat.id && 'active')}
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
