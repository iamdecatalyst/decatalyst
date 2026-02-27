import { motion } from 'framer-motion';


const transmissions = [
  {
    id: '1',
    date: '2026',
    title: 'On Building Alone',
    excerpt: 'The solo founder path isn\'t about working alone. It\'s about owning every decision, every failure, every system. 16 projects deep, and the architecture only gets cleaner.',
  },
  {
    id: '2',
    date: '2025',
    title: 'The RPG Stack',
    excerpt: 'Why Rust, Python, and Go? Each language chosen for its strength. Rust for cryptography that can\'t afford mistakes. Python for rapid iteration. Go for concurrent services that just work.',
  },
  {
    id: '3',
    date: '2025',
    title: 'Architecture as Philosophy',
    excerpt: 'API never touches the database. Every read goes through the Data Service. Every mutation through the Gateway. Clean separation isn\'t just pattern — it\'s discipline.',
  },
];

export default function Blog() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mb-12">
        <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
          Transmissions
        </h2>
        <p className="text-neutral-500 text-sm">
          Thoughts from the command center.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {transmissions.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="neu-card neu-card-3d p-6 group"
          >
            <div className="h-1 w-8 rounded-full bg-copper mb-4" />
            <span className="font-mono text-xs text-neutral-600">{post.date}</span>
            <h3 className="font-mono font-bold text-white text-base mt-2 mb-3 group-hover:text-copper transition-colors">
              {post.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
