const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const iconMap: Record<string, string> = {
  // Languages
  'Go': `${BASE}/go/go-original-wordmark.svg`,
  'Python': `${BASE}/python/python-original.svg`,
  'Rust': `${BASE}/rust/rust-original.svg`,
  'C++': `${BASE}/cplusplus/cplusplus-original.svg`,
  'TypeScript': `${BASE}/typescript/typescript-original.svg`,
  'JavaScript': `${BASE}/javascript/javascript-original.svg`,
  'Kotlin': `${BASE}/kotlin/kotlin-original.svg`,
  'Bash': `${BASE}/bash/bash-original.svg`,
  'SQL': `${BASE}/azuresqldatabase/azuresqldatabase-original.svg`,
  'HTML/CSS': `${BASE}/html5/html5-original.svg`,

  // Frameworks & Libraries
  'React': `${BASE}/react/react-original.svg`,
  'FastAPI': `${BASE}/fastapi/fastapi-original.svg`,
  'Node.js': `${BASE}/nodejs/nodejs-original.svg`,
  'Express': `${BASE}/express/express-original.svg`,
  'Fiber': `${BASE}/go/go-original.svg`,
  'SQLAlchemy': `${BASE}/sqlalchemy/sqlalchemy-original.svg`,

  // Databases & Infra
  'PostgreSQL': `${BASE}/postgresql/postgresql-original.svg`,
  'Redis': `${BASE}/redis/redis-original.svg`,
  'Docker': `${BASE}/docker/docker-original.svg`,
  'gRPC': `${BASE}/grpc/grpc-original.svg`,

  // Tools & Platforms
  'Groq': `${BASE}/python/python-original.svg`,
  'Telegram Bot API': `${BASE}/nodejs/nodejs-original.svg`,
  'OpenSSL': `${BASE}/linux/linux-original.svg`,
  'libcurl': `${BASE}/c/c-original.svg`,
  'yaml-cpp': `${BASE}/cplusplus/cplusplus-original.svg`,
  'PowerShell': `${BASE}/powershell/powershell-original.svg`,
};

// Icons that are dark/black and need inversion on dark backgrounds
const darkIcons = new Set(['Rust', 'Express', 'Bash']);

export function getTechIcon(name: string): string | null {
  return iconMap[name] || null;
}

export function isDarkIcon(name: string): boolean {
  return darkIcons.has(name);
}
