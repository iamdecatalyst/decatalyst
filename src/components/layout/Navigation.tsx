import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SECTIONS } from '../../lib/spaceConfig';

const navItems = SECTIONS.slice(1).map((s, i) => ({
  id: s.id,
  label: s.label,
  index: i,
}));

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = navItems.map((item) => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActive(navItems[i].id);
            return;
          }
        }
      }
      setActive('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-neu-base/95 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-sm text-white/80 hover:text-white transition-colors"
          >
            <span className="text-neutral-600">[</span>isaac<span className="text-neutral-600">@</span>vylth<span className="text-neutral-600">]</span>
          </button>

          {/* Desktop tmux-style tabs */}
          <div className="hidden md:flex items-center gap-0.5 font-mono text-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'px-3 py-1.5 transition-all duration-200 rounded',
                  active === item.id
                    ? 'text-white bg-white/[0.08]'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03]'
                )}
              >
                <span className="text-neutral-600">{item.index}:</span>{item.label.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-neutral-400"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-neu-base/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-4"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'font-mono text-lg tracking-wider',
                  active === item.id ? 'text-white' : 'text-neutral-500 hover:text-white'
                )}
              >
                <span className="text-neutral-600 mr-2">{item.index}:</span>
                {item.label.toLowerCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
