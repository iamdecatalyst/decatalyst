import { motion } from 'framer-motion';
import { socials } from '../../data/socials';
import TerminalWindow from '../ui/TerminalWindow';
import Card3D from '../ui/Card3D';
import {
  Github,
  Twitter,
  Instagram,
  Send,
  MessageCircle,
  Mail,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  send: Send,
  'message-circle': MessageCircle,
  mail: Mail,
};

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <TerminalWindow title="ssh connect@decatalyst">
        <div className="text-center">
          <div className="font-mono text-sm text-neutral-500 mb-6">
            <span className="text-green-400">$</span> ssh connect@decatalyst.com
            <br />
            <span className="text-neutral-400">Connection established.</span>
          </div>

          <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
            Establish Connection
          </h2>
          <p className="text-neutral-400 text-sm mb-10">
            Let's build something that matters.
          </p>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {socials.map((social, i) => {
              const Icon = iconMap[social.icon];
              return (
                <Card3D key={social.id}>
                  <motion.a
                    href={social.url}
                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="neu-tile w-14 h-14 flex items-center justify-center text-neutral-400 hover:text-white !rounded-2xl"
                    title={social.label}
                  >
                    {Icon && <Icon size={20} />}
                  </motion.a>
                </Card3D>
              );
            })}
          </div>

          {/* CTA */}
          <motion.a
            href="mailto:iamdecatalyst24@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neu-base font-mono font-semibold text-sm tracking-wider uppercase rounded-xl shadow-[3px_3px_6px_rgba(0,0,0,0.6),-3px_-3px_6px_rgba(40,40,40,0.12),0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.6),-3px_-3px_6px_rgba(40,40,40,0.12),0_0_30px_rgba(255,255,255,0.12)] transition-shadow"
          >
            <Mail size={16} />
            Get in Touch
          </motion.a>

          <p className="mt-12 font-serif italic text-neutral-500 text-sm">
            "Ad astra per aspera"
          </p>

          <div className="mt-6 font-mono text-xs text-neutral-700">
            <span className="text-white/30">$</span> <span className="animate-blink text-white/30">_</span>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
