export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Go' },
      { name: 'Python' },
      { name: 'Rust' },
      { name: 'C++' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Kotlin' },
      { name: 'Bash' },
      { name: 'SQL' },
      { name: 'HTML/CSS' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    skills: [
      { name: 'Fiber' },
      { name: 'FastAPI' },
      { name: 'Django' },
      { name: 'React' },
      { name: 'Vite' },
      { name: 'gRPC' },
      { name: 'SQLAlchemy' },
      { name: 'Jetpack Compose' },
      { name: 'Node.js' },
      { name: 'Express' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    skills: [
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'systemd' },
      { name: 'Nginx' },
      { name: 'CI/CD' },
      { name: 'Linux' },
      { name: 'Cloudflare' },
      { name: 'Certbot' },
      { name: 'Git' },
      { name: 'Turborepo' },
    ],
  },
  {
    id: 'databases',
    label: 'Data & Infra',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'Redis' },
      { name: 'pgvector' },
      { name: 'NATS' },
      { name: 'Protocol Buffers' },
      { name: 'Alembic' },
      { name: 'WebSocket' },
      { name: 'REST' },
    ],
  },
];
