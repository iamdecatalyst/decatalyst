import { motion } from 'framer-motion';
import { socials } from '../../data/socials';

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
    <div className="py-24 lg:py-32 relative">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
          Establish Connection
        </h2>
        <p className="text-neutral-500 text-sm mb-12">
          Let's build something that matters.
        </p>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socials.map((social, i) => {
            const Icon = iconMap[social.icon];
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 neu-card-flat neu-card-3d flex items-center justify-center text-neutral-500 hover:text-white hover:shadow-[0_0_20px_rgba(0,47,167,0.15)] transition-all duration-200 rounded-2xl"
                title={social.label}
              >
                {Icon && <Icon size={20} />}
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.a
          href="mailto:robert5560newton@gmail.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neu-base font-mono font-semibold text-sm tracking-wider uppercase rounded-2xl neu-button-3d shadow-[3px_3px_6px_rgba(0,0,0,0.6),-3px_-3px_6px_rgba(40,40,40,0.12),0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.6),-3px_-3px_6px_rgba(40,40,40,0.12),0_0_30px_rgba(255,255,255,0.12)] transition-shadow"
        >
          <Mail size={16} />
          Get in Touch
        </motion.a>

        <p className="mt-16 font-serif italic text-neutral-600 text-sm">
          "Ad astra per aspera"
        </p>
      </div>
    </div>
  );
}
