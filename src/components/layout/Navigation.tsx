import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SECTIONS } from '../../lib/spaceConfig';

const navItems = SECTIONS.slice(1).map((s) => ({
  id: s.id,
  label: s.label === 'Signal Tower' ? 'Transmissions' : s.id.charAt(0).toUpperCase() + s.id.slice(1),
  accent: s.accent,
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
          scrolled ? 'bg-neu-base/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono font-bold text-lg tracking-widest text-white hover:text-copper transition-colors"
          >
            DC
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn('neu-nav-item', active === item.id && 'active')}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Planet dot indicators — right side vertical */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              if (i === 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                scrollTo(s.id);
              }
            }}
            className="group relative flex items-center justify-end"
            title={s.label}
          >
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-neutral-400 whitespace-nowrap">
              {s.label}
            </span>
            <div
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                active === s.id || (i === 0 && active === '')
                  ? 'scale-125'
                  : 'scale-100 opacity-40 hover:opacity-80'
              )}
              style={{
                background: active === s.id || (i === 0 && active === '') ? s.accent : '#666',
                boxShadow: active === s.id || (i === 0 && active === '') ? `0 0 8px ${s.accent}` : 'none',
              }}
            />
          </button>
        ))}
      </div>

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
                  'text-2xl font-mono font-medium tracking-wider',
                  active === item.id ? 'text-white' : 'text-neutral-500 hover:text-white'
                )}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
